"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import {
  DEFAULT_CHALETS,
  DEFAULT_SECTIONS,
  SECTION_LABELS,
  type ChaletListing,
  type GalleryMediaItem,
  type FaqItem,
  type FlatCopy,
  type LocalizedString,
  type SectionKey,
  type SiteContent,
  type TestimonialItem,
} from "@/lib/content/types";
import { buttonClass } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { vipCars } from "@/content/cars";
import { SITE_PAGES } from "@/lib/admin/placements";
import {
  ABOUT_COPY_FIELDS,
  CARS_COPY_FIELDS,
  CHALETS_COPY_FIELDS,
  DIRECTORY_COPY_FIELDS,
  EXCLUSIVE_COPY_FIELDS,
  EXCLUSIVE_VENUE_IDS,
  FORM_COPY_FIELDS,
  FOOTER_COPY_FIELDS,
  GALLERY_HOME_FIELDS,
  GALLERY_PAGE_FIELDS,
  HOME_CARD_HREFS,
  HOME_COPY_FIELDS,
  REELS_COPY_FIELDS,
  SECTION_HEADER_FIELDS,
  SOCIAL_COPY_FIELDS,
  TRUST_META_FIELDS,
} from "@/lib/content/page-copy";
import { FlatCopyFields, LocaleLinesEditor, LocalizedPairFields } from "@/components/admin/FlatCopyFields";

type Tab =
  | "sections"
  | "hero"
  | "home"
  | "ticker"
  | "coverage"
  | "venues"
  | "nightclubs"
  | "beaches"
  | "galleryPage"
  | "testimonials"
  | "gallery"
  | "chalets"
  | "cars"
  | "about"
  | "trustPage"
  | "form"
  | "footer"
  | "pages";

const TABS: { id: Tab; label: string }[] = [
  { id: "sections", label: "الأقسام" },
  { id: "hero", label: "الهيرو والهيدر" },
  { id: "home", label: "الرئيسية" },
  { id: "ticker", label: "الشريط المتحرك" },
  { id: "coverage", label: "دليل السهر والأسئلة" },
  { id: "venues", label: "سهرات" },
  { id: "nightclubs", label: "نايت كلوب" },
  { id: "beaches", label: "الشواطئ" },
  { id: "galleryPage", label: "نصوص المعرض" },
  { id: "chalets", label: "الشاليهات" },
  { id: "cars", label: "عربيات VIP" },
  { id: "about", label: "عن سهرة" },
  { id: "trustPage", label: "ليه تختارنا" },
  { id: "form", label: "نموذج الحجز" },
  { id: "footer", label: "الفوتر" },
  { id: "testimonials", label: "آراء العملاء" },
  { id: "gallery", label: "صور المعرض" },
  { id: "pages", label: "خريطة الصفحات" },
];

function fieldClass(extra = "") {
  return `w-full rounded-sm border border-gold/25 bg-ink px-3.5 py-2.5 text-[0.9rem] text-sand placeholder:text-sand-dim/50 focus:border-gold focus:outline-none ${extra}`;
}

function newId() {
  return crypto.randomUUID();
}

function LocalizedFields({
  label,
  value,
  onChange,
  multiline,
  locale,
}: {
  label: string;
  value: LocalizedString | undefined;
  onChange: (next: LocalizedString) => void;
  multiline?: boolean;
  locale: Locale;
}) {
  const current = value?.[locale] ?? "";
  const Tag = multiline ? "textarea" : "input";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.75rem] tracking-wide text-sand-dim uppercase">
        {label} · {locale === "ar" ? "عربي" : "English"}
      </span>
      <Tag
        className={fieldClass(multiline ? "min-h-[96px] resize-y" : "")}
        value={current}
        onChange={(e) => onChange({ ...value, [locale]: e.target.value })}
        {...(multiline ? {} : { type: "text" })}
      />
    </label>
  );
}

export default function ContentEditor({
  username,
  initialContent,
  blobReady,
}: {
  username: string;
  initialContent: SiteContent;
  blobReady: boolean;
}) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [tab, setTab] = useState<Tab>("sections");
  const [locale, setLocale] = useState<Locale>("ar");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const sections = useMemo(
    () => ({ ...DEFAULT_SECTIONS, ...content.sections }),
    [content.sections],
  );

  const testimonials: TestimonialItem[] = useMemo(
    () => content.testimonialItems ?? [],
    [content.testimonialItems],
  );

  const tickerLines =
    content.ticker?.[locale] ??
    ([...getDictionary(locale).ticker] as string[]);

  const seoParagraphs =
    content.seo?.paragraphs?.[locale] ??
    ([...getDictionary(locale).seo.paragraphs] as string[]);

  const faqItems: FaqItem[] = useMemo(() => {
    if (content.faqItems?.length) return content.faqItems;
    const ar = getDictionary("ar").seo.faq;
    const en = getDictionary("en").seo.faq;
    return ar.map((item, index) => ({
      id: `default-faq-${index}`,
      q: { ar: item.q, en: en[index]?.q ?? "" },
      a: { ar: item.a, en: en[index]?.a ?? "" },
      visible: true,
    }));
  }, [content.faqItems]);

  const chalets: ChaletListing[] = useMemo(() => {
    if (content.chalets?.length) return content.chalets;
    return DEFAULT_CHALETS.map((item) => ({ ...item, features: [...item.features] }));
  }, [content.chalets]);

  function setChalets(next: ChaletListing[]) {
    update({ chalets: next });
  }

  async function save(next: SiteContent = content) {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = (await response.json()) as { content?: SiteContent; error?: string };
      if (!response.ok) throw new Error(data.error ?? "فشل الحفظ");
      if (data.content) setContent(data.content);
      setMessage("تم الحفظ. التغييرات ظهرت على الموقع.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الحفظ");
    } finally {
      setSaving(false);
    }
  }

  const update = useCallback((patch: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...patch }));
  }, []);

  async function uploadFile(
    file: File,
    purpose: "gallery" | "video" | "poster" | "logo" | "chalet" | "testimonial",
  ): Promise<string | null> {
    setUploading(true);
    setError(null);
    try {
      const isVideo = file.type.startsWith("video/");
      const useClient = blobReady && (isVideo || file.size > 3.5 * 1024 * 1024);

      if (useClient) {
        const result = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload-token",
          multipart: isVideo,
        });

        if (purpose === "chalet" || purpose === "testimonial") {
          setMessage("تم الرفع");
          return result.url;
        }

        if (purpose === "gallery") {
          const item: GalleryMediaItem = {
            id: newId(),
            src: result.url,
            caption: { ar: "", en: "" },
            visible: true,
            sortOrder: (content.galleryItems?.length ?? 0) + 1,
          };
          const galleryItems = [...(content.galleryItems ?? []), item];
          const next = { ...content, galleryItems };
          setContent(next);
          await save(next);
          return result.url;
        }

        if (purpose === "logo") {
          const next: SiteContent = { ...content, logoUrl: result.url };
          setContent(next);
          await save(next);
          return result.url;
        }

        if (purpose === "video") {
          const next: SiteContent = {
            ...content,
            promoVideo: {
              ...content.promoVideo,
              src: result.url,
              visible: true,
              placement: content.promoVideo?.placement ?? "section",
            },
            sections: { ...content.sections, promoVideo: true },
          };
          setContent(next);
          await save(next);
          return result.url;
        }

        const next: SiteContent = {
          ...content,
          promoVideo: { ...content.promoVideo, poster: result.url },
        };
        setContent(next);
        await save(next);
        return result.url;
      }

      const form = new FormData();
      form.set("file", file);
      form.set("kind", isVideo ? "video" : "image");
      form.set("purpose", purpose);
      const response = await fetch("/api/admin/media", { method: "POST", body: form });
      const data = (await response.json()) as {
        url?: string;
        content?: SiteContent;
        error?: string;
        useClientUpload?: boolean;
      };
      if (!response.ok) {
        if (data.useClientUpload) {
          throw new Error(
            "الفيديو كبير أوي للرفع من السيرفر. حط BLOB_READ_WRITE_TOKEN (Vercel Blob) لرفع الملفات الكبيرة.",
          );
        }
        throw new Error(data.error ?? "فشل الرفع");
      }
      if (data.content) setContent(data.content);
      setMessage("تم الرفع");
      router.refresh();
      return data.url ?? null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الرفع");
      return null;
    } finally {
      setUploading(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div dir="rtl" className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-gold/20 bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <div className="font-display text-xl font-bold text-sand">
              سهرة <span className="text-gold-soft">·</span> إدارة المحتوى
            </div>
            <p className="text-[0.78rem] text-sand-dim">مسجّل دخول: {username}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
            >
              الحجوزات
            </Link>
            <Link
              href="/admin/whatsapp"
              className="border border-gold/40 bg-gold/10 px-3 py-2 text-[0.78rem] text-gold-soft transition-colors hover:border-gold hover:bg-gold/15"
            >
              إرسال واتساب
            </Link>
            <Link
              href="/ar"
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
            >
              عرض الموقع
            </Link>
            <button
              type="button"
              onClick={() => save()}
              disabled={saving}
              className={buttonClass("primary", "px-4 py-2 text-[0.82rem] disabled:opacity-60")}
            >
              {saving ? "جاري الحفظ…" : "حفظ التغييرات"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="cursor-pointer border border-[#c9646f]/40 px-3 py-2 text-[0.78rem] text-[#e2857f]"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 py-8">
        {!blobReady ? (
          <div className="mb-6 border border-gold/30 bg-gold/10 px-5 py-4 text-[0.85rem] leading-[1.7] text-gold-soft">
            تخزين Vercel Blob مش متظبط. الصور الصغيرة بتحفظ في{" "}
            <code>public/uploads</code> محليًا. للرفع على الإنتاج (خصوصًا الفيديوهات الكبيرة) اعمل
            Blob store وحط <code>BLOB_READ_WRITE_TOKEN</code>.
          </div>
        ) : null}

        {message ? (
          <div className="mb-4 border border-[#63c2a3]/40 bg-[#63c2a3]/10 px-4 py-3 text-[0.85rem] text-[#8fdcc2]">
            {message}
          </div>
        ) : null}
        {error ? (
          <div className="mb-4 border border-[#c9646f]/40 bg-[#c9646f]/10 px-4 py-3 text-[0.85rem] text-[#e2857f]">
            {error}
          </div>
        ) : null}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`cursor-pointer border px-3.5 py-2 text-[0.82rem] transition-colors ${
                  tab === item.id
                    ? "border-gold bg-gold/15 text-gold-soft"
                    : "border-gold/25 text-sand-dim hover:border-gold/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(["ar", "en"] as Locale[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={`cursor-pointer border px-3 py-1.5 text-[0.78rem] ${
                  locale === code
                    ? "border-gold bg-gold/15 text-gold-soft"
                    : "border-gold/25 text-sand-dim"
                }`}
              >
                {code === "ar" ? "عربي" : "English"}
              </button>
            ))}
          </div>
        </div>

        {tab === "sections" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <h2 className="mb-2 font-display text-lg text-sand">إظهار / إخفاء الأقسام</h2>
            <p className="mb-6 text-[0.85rem] text-sand-dim">
              الأقسام المخفية بتختفي من الصفحة الرئيسية فور الحفظ. كمان تقدر تتحكم في
              بطاقات الأقسام، الدخول الحصري، والريلز.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {(Object.keys(DEFAULT_SECTIONS) as SectionKey[]).map((key) => (
                <li
                  key={key}
                  className="flex items-center justify-between border border-gold/15 bg-ink px-4 py-3"
                >
                  <span className="text-[0.92rem] text-sand">{SECTION_LABELS[key]}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={sections[key]}
                    onClick={() =>
                      update({
                        sections: { ...content.sections, [key]: !sections[key] },
                      })
                    }
                    className={`relative h-7 w-12 cursor-pointer rounded-full transition-colors ${
                      sections[key] ? "bg-gold" : "bg-ink-3 border border-gold/30"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-6 w-6 rounded-full bg-ink transition-transform ${
                        sections[key] ? "start-5" : "start-0.5"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {tab === "hero" ? (
          <section className="space-y-8 border border-gold/20 bg-ink-2/40 p-6">
            <div>
              <h2 className="mb-2 font-display text-lg text-sand">اللوجو</h2>
              <p className="mb-4 text-[0.85rem] text-sand-dim">
                بيظهر في الهيدر والفوتر. لو فاضي هيتستخدم اللوجو الافتراضي.
              </p>
              {content.logoUrl ? (
                <div className="mb-4 flex items-center gap-4 border border-gold/15 bg-ink p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={content.logoUrl} alt="" className="h-14 w-auto object-contain" />
                  <button
                    type="button"
                    className="cursor-pointer text-[0.8rem] text-[#e2857f] hover:underline"
                    onClick={async () => {
                      await fetch("/api/admin/media", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ clearLogo: true }),
                      });
                      const next = { ...content, logoUrl: undefined };
                      setContent(next);
                      setMessage("تم إرجاع اللوجو الافتراضي");
                    }}
                  >
                    رجّع اللوجو الافتراضي
                  </button>
                </div>
              ) : null}
              <label className={buttonClass("ghost", "cursor-pointer px-4 py-2 text-[0.82rem]")}>
                {uploading ? "جاري الرفع…" : "رفع لوجو (PNG/WebP)"}
                <input
                  type="file"
                  accept="image/png,image/webp,image/jpeg"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadFile(file, "logo");
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-2 font-display text-lg text-sand">تابات الهيدر</h2>
              <p className="mb-4 text-[0.85rem] text-sand-dim">
                الأسماء دي بتظهر في الهيدر وقائمة الموبايل — بنفس ترتيب الموقع الحالي.
              </p>
              <div className="grid gap-4">
                {(
                  [
                    ["home", "الرئيسية"],
                    ["venues", "سهرات"],
                    ["nightclubs", "نايت كلوب"],
                    ["beaches", "الشواطئ"],
                    ["gallery", "المعرض"],
                    ["chalets", "الشاليهات"],
                    ["cars", "السيارات"],
                    ["about", "عن سهرة"],
                    ["trust", "ليه تختارنا"],
                    ["reserve", "زر احجز مكانك"],
                  ] as const
                ).map(([key, label]) => (
                  <LocalizedFields
                    key={key}
                    label={label}
                    locale={locale}
                    value={content.nav?.[key]}
                    onChange={(next) =>
                      update({ nav: { ...content.nav, [key]: next } })
                    }
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-4 font-display text-lg text-sand">نصوص الهيرو</h2>
              <div className="grid gap-4">
                {(
                  [
                    ["eyebrow", "سطر فوق العنوان"],
                    ["titleTop", "العنوان (أول سطر)"],
                    ["titleAccent", "الكلمة المميزة في العنوان"],
                    ["titleBottom", "العنوان (آخر سطر)"],
                    ["lede", "الوصف"],
                    ["ctaPrimary", "الزر الأساسي"],
                    ["ctaSecondary", "الزر الثانوي"],
                  ] as const
                ).map(([key, label]) => (
                  <LocalizedFields
                    key={key}
                    label={label}
                    locale={locale}
                    multiline={key === "lede"}
                    value={content.hero?.[key]}
                    onChange={(next) =>
                      update({ hero: { ...content.hero, [key]: next } })
                    }
                  />
                ))}
              </div>
              <p className="mt-3 text-[0.75rem] text-sand-dim">
                سيب الحقل فاضي عشان يفضل النص الافتراضي. على اليمين في الموقع بيظهر محادثة الواتساب — مش بيتعدّل من هنا.
              </p>
            </div>
          </section>
        ) : null}

        {tab === "home" ? (
          <section className="space-y-8 border border-gold/20 bg-ink-2/40 p-6">
            <div>
              <h2 className="mb-2 font-display text-lg text-sand">بطاقات الأقسام</h2>
              <FlatCopyFields
                fields={HOME_COPY_FIELDS}
                value={content.homeCopy}
                locale={locale}
                onChange={(homeCopy) => update({ homeCopy })}
              />
            </div>

            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-4 font-display text-lg text-sand">نصوص كل كارت</h2>
              <div className="space-y-6">
                {HOME_CARD_HREFS.map((href) => {
                  const card =
                    content.homeCards?.find((item) => item.href === href) ?? { href };
                  return (
                    <div key={href} className="border border-gold/15 bg-ink p-4">
                      <p className="mb-3 text-[0.82rem] font-semibold text-gold">{href}</p>
                      <div className="grid gap-3">
                        {(
                          [
                            ["tag", "الوسم"],
                            ["title", "العنوان"],
                            ["body", "الوصف"],
                            ["cta", "الزر"],
                          ] as const
                        ).map(([key, label]) => (
                          <LocalizedPairFields
                            key={key}
                            label={label}
                            locale={locale}
                            multiline={key === "body"}
                            value={card[key]}
                            onChange={(next) => {
                              const list = [...(content.homeCards ?? [])];
                              const index = list.findIndex((item) => item.href === href);
                              const merged = { ...(index >= 0 ? list[index] : { href }), [key]: next };
                              if (index >= 0) list[index] = merged;
                              else list.push(merged);
                              update({ homeCards: list });
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-4 font-display text-lg text-sand">الدخول الحصري</h2>
              <FlatCopyFields
                fields={EXCLUSIVE_COPY_FIELDS}
                value={content.exclusiveCopy}
                locale={locale}
                onChange={(exclusiveCopy) => update({ exclusiveCopy })}
              />
              <div className="mt-6 space-y-4">
                {EXCLUSIVE_VENUE_IDS.map((id) => {
                  const venue =
                    content.exclusiveVenues?.find((item) => item.id === id) ?? { id };
                  return (
                    <div key={id} className="border border-gold/15 bg-ink p-4">
                      <p className="mb-3 text-[0.82rem] font-semibold text-gold">{id}</p>
                      <div className="grid gap-3">
                        <LocalizedPairFields
                          label="الاسم"
                          locale={locale}
                          value={venue.name}
                          onChange={(name) => {
                            const list = [...(content.exclusiveVenues ?? [])];
                            const index = list.findIndex((item) => item.id === id);
                            const merged = { ...(index >= 0 ? list[index] : { id }), name };
                            if (index >= 0) list[index] = merged;
                            else list.push(merged);
                            update({ exclusiveVenues: list });
                          }}
                        />
                        <LocalizedPairFields
                          label="الوصف"
                          locale={locale}
                          multiline
                          value={venue.body}
                          onChange={(body) => {
                            const list = [...(content.exclusiveVenues ?? [])];
                            const index = list.findIndex((item) => item.id === id);
                            const merged = { ...(index >= 0 ? list[index] : { id }), body };
                            if (index >= 0) list[index] = merged;
                            else list.push(merged);
                            update({ exclusiveVenues: list });
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-4 font-display text-lg text-sand">الريلز</h2>
              <FlatCopyFields
                fields={REELS_COPY_FIELDS}
                value={content.reelsCopy}
                locale={locale}
                onChange={(reelsCopy) => update({ reelsCopy })}
              />
            </div>

            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-4 font-display text-lg text-sand">معاينة المعرض في الرئيسية</h2>
              <FlatCopyFields
                fields={GALLERY_HOME_FIELDS}
                value={content.galleryCopy}
                locale={locale}
                onChange={(galleryCopy) => update({ galleryCopy })}
              />
            </div>

            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-4 font-display text-lg text-sand">عناوين أقسام إضافية</h2>
              {(
                [
                  ["how", "طريقة الحجز"],
                  ["trust", "ليه تختارنا"],
                  ["testimonials", "آراء العملاء"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="mb-6 border border-gold/15 bg-ink p-4">
                  <p className="mb-3 text-[0.82rem] font-semibold text-gold">{label}</p>
                  <FlatCopyFields
                    fields={SECTION_HEADER_FIELDS}
                    value={content[key] as FlatCopy | undefined}
                    locale={locale}
                    onChange={(next) => update({ [key]: next })}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {tab === "venues" || tab === "nightclubs" || tab === "beaches" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <h2 className="mb-2 font-display text-lg text-sand">
              {tab === "venues" ? "نصوص صفحة السهرات" : tab === "nightclubs" ? "نصوص النايت كلوب" : "نصوص الشواطئ"}
            </h2>
            <p className="mb-6 text-[0.85rem] text-sand-dim">
              ده نص الصفحة والعناوين والأزرار — مش قائمة الأماكن نفسها.
            </p>
            <FlatCopyFields
              fields={DIRECTORY_COPY_FIELDS}
              value={
                tab === "venues"
                  ? content.venuesCopy
                  : tab === "nightclubs"
                    ? content.nightclubsCopy
                    : content.beachesCopy
              }
              locale={locale}
              onChange={(next) =>
                update(
                  tab === "venues"
                    ? { venuesCopy: next }
                    : tab === "nightclubs"
                      ? { nightclubsCopy: next }
                      : { beachesCopy: next },
                )
              }
            />
          </section>
        ) : null}

        {tab === "galleryPage" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <h2 className="mb-2 font-display text-lg text-sand">نصوص صفحة المعرض</h2>
            <FlatCopyFields
              fields={GALLERY_PAGE_FIELDS}
              value={content.galleryPageCopy}
              locale={locale}
              onChange={(galleryPageCopy) => update({ galleryPageCopy })}
            />
          </section>
        ) : null}

        {tab === "about" ? (
          <section className="space-y-8 border border-gold/20 bg-ink-2/40 p-6">
            <div>
              <h2 className="mb-4 font-display text-lg text-sand">نصوص صفحة عن سهرة</h2>
              <FlatCopyFields
                fields={ABOUT_COPY_FIELDS}
                value={content.aboutCopy}
                locale={locale}
                onChange={(aboutCopy) => update({ aboutCopy })}
              />
            </div>
            <div className="border-t border-gold/15 pt-6">
              <LocaleLinesEditor
                label="فقرات القصة"
                lines={content.aboutStoryBody?.[locale] ?? []}
                onChange={(lines) =>
                  update({
                    aboutStoryBody: { ...content.aboutStoryBody, [locale]: lines },
                  })
                }
              />
            </div>
            <div className="border-t border-gold/15 pt-6">
              <LocaleLinesEditor
                label="فقرات الخبرة"
                lines={content.aboutExperienceBody?.[locale] ?? []}
                onChange={(lines) =>
                  update({
                    aboutExperienceBody: {
                      ...content.aboutExperienceBody,
                      [locale]: lines,
                    },
                  })
                }
              />
            </div>
            <div className="border-t border-gold/15 pt-6">
              <LocaleLinesEditor
                label="نقاط الخبرة"
                lines={content.aboutExperienceHighlights?.[locale] ?? []}
                onChange={(lines) =>
                  update({
                    aboutExperienceHighlights: {
                      ...content.aboutExperienceHighlights,
                      [locale]: lines,
                    },
                  })
                }
              />
            </div>
          </section>
        ) : null}

        {tab === "trustPage" ? (
          <section className="space-y-8 border border-gold/20 bg-ink-2/40 p-6">
            <div>
              <h2 className="mb-4 font-display text-lg text-sand">نصوص ليه تختارنا</h2>
              <FlatCopyFields
                fields={[...SECTION_HEADER_FIELDS, ...TRUST_META_FIELDS]}
                value={{ ...(content.trust ?? {}), ...(content.trustMeta ?? {}) }}
                locale={locale}
                onChange={(next) => {
                  const trust: FlatCopy = {};
                  const trustMeta: FlatCopy = {};
                  for (const field of SECTION_HEADER_FIELDS) {
                    if (next[field.key]) trust[field.key] = next[field.key];
                  }
                  for (const field of TRUST_META_FIELDS) {
                    if (next[field.key]) trustMeta[field.key] = next[field.key];
                  }
                  update({ trust, trustMeta });
                }}
              />
            </div>
          </section>
        ) : null}

        {tab === "form" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <h2 className="mb-2 font-display text-lg text-sand">نموذج الحجز</h2>
            <FlatCopyFields
              fields={FORM_COPY_FIELDS}
              value={content.formCopy}
              locale={locale}
              onChange={(formCopy) => update({ formCopy })}
            />
          </section>
        ) : null}

        {tab === "footer" ? (
          <section className="space-y-8 border border-gold/20 bg-ink-2/40 p-6">
            <div>
              <h2 className="mb-4 font-display text-lg text-sand">الفوتر</h2>
              <FlatCopyFields
                fields={FOOTER_COPY_FIELDS}
                value={content.footerCopy}
                locale={locale}
                onChange={(footerCopy) => update({ footerCopy })}
              />
            </div>
            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-4 font-display text-lg text-sand">سوشيال</h2>
              <FlatCopyFields
                fields={SOCIAL_COPY_FIELDS}
                value={content.socialCopy}
                locale={locale}
                onChange={(socialCopy) => update({ socialCopy })}
              />
            </div>
          </section>
        ) : null}

        {tab === "coverage" ? (
          <section className="space-y-8 border border-gold/20 bg-ink-2/40 p-6">
            <div>
              <h2 className="mb-2 font-display text-lg text-sand">قسم دليل السهر (SEO)</h2>
              <p className="mb-4 text-[0.85rem] text-sand-dim">
                العنوان والفقرات اللي فوق الأسئلة الشائعة في الصفحة.
              </p>
              <div className="grid gap-4">
                {(
                  [
                    ["eyebrow", "السطر العلوي"],
                    ["title", "العنوان"],
                    ["titleAccent", "الكلمة المميزة في العنوان"],
                  ] as const
                ).map(([key, label]) => (
                  <LocalizedFields
                    key={key}
                    label={label}
                    locale={locale}
                    value={content.seo?.[key]}
                    onChange={(next) => update({ seo: { ...content.seo, [key]: next } })}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-2 font-display text-lg text-sand">فقرات القسم</h2>
              <p className="mb-4 text-[0.85rem] text-sand-dim">
                بتعدّل لغة {locale === "ar" ? "عربي" : "English"}. الحفظ بيستبدل الفقرات الافتراضية للغة دي.
              </p>
              <ul className="space-y-3">
                {seoParagraphs.map((line, index) => (
                  <li key={`${index}-${line.slice(0, 12)}`} className="flex gap-2">
                    <textarea
                      className={fieldClass("min-h-[88px] resize-y")}
                      value={line}
                      onChange={(e) => {
                        const lines = [...seoParagraphs];
                        lines[index] = e.target.value;
                        update({
                          seo: {
                            ...content.seo,
                            paragraphs: { ...content.seo?.paragraphs, [locale]: lines },
                          },
                        });
                      }}
                    />
                    <button
                      type="button"
                      className="shrink-0 cursor-pointer border border-[#c9646f]/40 px-3 text-[#e2857f]"
                      onClick={() => {
                        const lines = seoParagraphs.filter((_, i) => i !== index);
                        update({
                          seo: {
                            ...content.seo,
                            paragraphs: { ...content.seo?.paragraphs, [locale]: lines },
                          },
                        });
                      }}
                    >
                      حذف
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={buttonClass("ghost", "mt-4 px-4 py-2 text-[0.82rem]")}
                onClick={() =>
                  update({
                    seo: {
                      ...content.seo,
                      paragraphs: {
                        ...content.seo?.paragraphs,
                        [locale]: [...seoParagraphs, ""],
                      },
                    },
                  })
                }
              >
                إضافة فقرة
              </button>
            </div>

            <div className="border-t border-gold/15 pt-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg text-sand">الأسئلة الشائعة</h2>
                  <LocalizedFields
                    label="عنوان قسم الأسئلة"
                    locale={locale}
                    value={content.seo?.faqTitle}
                    onChange={(next) => update({ seo: { ...content.seo, faqTitle: next } })}
                  />
                  <p className="mt-2 text-[0.85rem] text-sand-dim">
                    أول تعديل على الأسئلة بينسخ الافتراضي. بعد كده القائمة دي هي المصدر.
                  </p>
                </div>
                <button
                  type="button"
                  className={buttonClass("ghost", "px-4 py-2 text-[0.82rem]")}
                  onClick={() => {
                    update({
                      faqItems: [
                        ...faqItems,
                        {
                          id: newId(),
                          q: { ar: "", en: "" },
                          a: { ar: "", en: "" },
                          visible: true,
                        },
                      ],
                    });
                  }}
                >
                  إضافة سؤال
                </button>
              </div>
              <ul className="space-y-4">
                {faqItems.map((item, index) => (
                  <li key={item.id} className="border border-gold/15 bg-ink p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-[0.78rem] text-sand-dim">#{index + 1}</span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-[0.8rem] text-sand-dim">
                          <input
                            type="checkbox"
                            checked={item.visible !== false}
                            onChange={(e) => {
                              update({
                                faqItems: faqItems.map((entry) =>
                                  entry.id === item.id
                                    ? { ...entry, visible: e.target.checked }
                                    : entry,
                                ),
                              });
                            }}
                          />
                          ظاهر
                        </label>
                        <button
                          type="button"
                          className="cursor-pointer text-[0.8rem] text-[#e2857f] hover:underline"
                          onClick={() =>
                            update({
                              faqItems: faqItems.filter((entry) => entry.id !== item.id),
                            })
                          }
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <LocalizedFields
                        label="السؤال"
                        locale={locale}
                        value={item.q}
                        onChange={(next) =>
                          update({
                            faqItems: faqItems.map((entry) =>
                              entry.id === item.id ? { ...entry, q: next } : entry,
                            ),
                          })
                        }
                      />
                      <LocalizedFields
                        label="الإجابة"
                        locale={locale}
                        multiline
                        value={item.a}
                        onChange={(next) =>
                          update({
                            faqItems: faqItems.map((entry) =>
                              entry.id === item.id ? { ...entry, a: next } : entry,
                            ),
                          })
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {tab === "ticker" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <h2 className="mb-2 font-display text-lg text-sand">أسطر الشريط المتحرك</h2>
            <p className="mb-6 text-[0.85rem] text-sand-dim">
              بتعدّل لغة {locale === "ar" ? "AR" : "EN"}. الحفظ بيستبدل الشريط الافتراضي للغة دي.
            </p>
            <ul className="space-y-3">
              {tickerLines.map((line, index) => (
                <li key={`${index}-${line.slice(0, 12)}`} className="flex gap-2">
                  <input
                    className={fieldClass()}
                    value={line}
                    onChange={(e) => {
                      const lines = [...tickerLines];
                      lines[index] = e.target.value;
                      update({
                        ticker: { ...content.ticker, [locale]: lines },
                      });
                    }}
                  />
                  <button
                    type="button"
                    className="shrink-0 cursor-pointer border border-[#c9646f]/40 px-3 text-[#e2857f]"
                    onClick={() => {
                      const lines = tickerLines.filter((_, i) => i !== index);
                      update({ ticker: { ...content.ticker, [locale]: lines } });
                    }}
                  >
                    حذف
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={buttonClass("ghost", "mt-4 px-4 py-2 text-[0.82rem]")}
              onClick={() =>
                update({
                  ticker: {
                    ...content.ticker,
                    [locale]: [...tickerLines, ""],
                  },
                })
              }
            >
              إضافة سطر
            </button>
          </section>
        ) : null}

        {tab === "testimonials" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg text-sand">آراء العملاء</h2>
                <p className="mt-1 max-w-xl text-[0.85rem] leading-[1.7] text-sand-dim">
                  ارفع سكرينات حقيقية من شات العملاء (بعد إذنهم). الصفحة بتعرض الصور زي ما هي —
                  من غير رسائل مكتوبة يدوي.
                </p>
              </div>
              <label className={buttonClass("primary", "cursor-pointer px-4 py-2 text-[0.82rem]")}>
                {uploading ? "جاري الرفع…" : "رفع سكرين واتساب"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (!file) return;
                    const url = await uploadFile(file, "testimonial");
                    if (!url) return;
                    update({
                      testimonialItems: [
                        ...testimonials,
                        {
                          id: newId(),
                          image: url,
                          who: { ar: "", en: "" },
                          visible: true,
                        },
                      ],
                    });
                  }}
                />
              </label>
            </div>
            {testimonials.length === 0 ? (
              <p className="border border-dashed border-gold/25 px-5 py-10 text-center text-[0.9rem] text-sand-dim">
                لسة مفيش سكرينات — ارفع أول صورة من واتساب.
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {testimonials.map((item, index) => (
                  <li key={item.id} className="border border-gold/15 bg-ink p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-[0.78rem] text-sand-dim">#{index + 1}</span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-[0.8rem] text-sand-dim">
                          <input
                            type="checkbox"
                            checked={item.visible !== false}
                            onChange={(e) => {
                              update({
                                testimonialItems: testimonials.map((t) =>
                                  t.id === item.id ? { ...t, visible: e.target.checked } : t,
                                ),
                              });
                            }}
                          />
                          ظاهر
                        </label>
                        <button
                          type="button"
                          className="cursor-pointer text-[0.8rem] text-[#e2857f] hover:underline"
                          onClick={() =>
                            update({
                              testimonialItems: testimonials.filter((t) => t.id !== item.id),
                            })
                          }
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt=""
                        className="mb-3 aspect-9/16 max-h-72 w-full object-cover object-top"
                      />
                    ) : (
                      <p className="mb-3 text-[0.8rem] text-[#e2857f]">مفيش صورة — ارفع سكرين</p>
                    )}
                    <label className={buttonClass("ghost", "mb-3 inline-flex cursor-pointer px-3 py-1.5 text-[0.78rem]")}>
                      تغيير الصورة
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        disabled={uploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          e.target.value = "";
                          if (!file) return;
                          const url = await uploadFile(file, "testimonial");
                          if (!url) return;
                          update({
                            testimonialItems: testimonials.map((t) =>
                              t.id === item.id ? { ...t, image: url } : t,
                            ),
                          });
                        }}
                      />
                    </label>
                    <div className="grid gap-3">
                      <LocalizedFields
                        label="المدينة / الوصف (اختياري)"
                        locale={locale}
                        value={item.who}
                        onChange={(next) =>
                          update({
                            testimonialItems: testimonials.map((t) =>
                              t.id === item.id ? { ...t, who: next } : t,
                            ),
                          })
                        }
                      />
                      <LocalizedFields
                        label="الاسم (اختياري — بعد إذن العميل)"
                        locale={locale}
                        value={item.name}
                        onChange={(next) =>
                          update({
                            testimonialItems: testimonials.map((t) =>
                              t.id === item.id ? { ...t, name: next } : t,
                            ),
                          })
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        {tab === "chalets" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <div className="mb-8 border-b border-gold/15 pb-8">
              <h2 className="mb-2 font-display text-lg text-sand">نصوص صفحة الشاليهات</h2>
              <FlatCopyFields
                fields={CHALETS_COPY_FIELDS}
                value={content.chaletsCopy}
                locale={locale}
                onChange={(chaletsCopy) => update({ chaletsCopy })}
              />
            </div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg text-sand">الشاليهات للإيجار</h2>
                <p className="text-[0.85rem] text-sand-dim">
                  أول تعديل بينسخ الشاليه الافتراضي. بعد كده القائمة دي هي المصدر. الحجز عبر واتساب فقط.
                </p>
              </div>
              <button
                type="button"
                className={buttonClass("ghost", "px-4 py-2 text-[0.82rem]")}
                onClick={() => {
                  const id = newId();
                  setChalets([
                    ...chalets,
                    {
                      id,
                      slug: `chalet-${id.slice(0, 8)}`,
                      visible: true,
                      title: { ar: "", en: "" },
                      location: { ar: "", en: "" },
                      summary: { ar: "", en: "" },
                      bedrooms: 1,
                      bathrooms: 1,
                      familyOnly: true,
                      fromOwner: true,
                      features: [],
                      coverImage: "",
                      gallery: [],
                      whatsappMessage: { ar: "", en: "" },
                      sortOrder: chalets.length + 1,
                    },
                  ]);
                }}
              >
                إضافة شاليه
              </button>
            </div>

            <ul className="space-y-6">
              {chalets.map((item, index) => (
                <li key={item.id} className="border border-gold/15 bg-ink p-4">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[0.78rem] text-sand-dim">
                      #{index + 1} · {item.slug}
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="flex items-center gap-2 text-[0.8rem] text-sand-dim">
                        <input
                          type="checkbox"
                          checked={item.visible !== false}
                          onChange={(e) =>
                            setChalets(
                              chalets.map((c) =>
                                c.id === item.id ? { ...c, visible: e.target.checked } : c,
                              ),
                            )
                          }
                        />
                        ظاهر
                      </label>
                      <label className="flex items-center gap-2 text-[0.8rem] text-sand-dim">
                        <input
                          type="checkbox"
                          checked={Boolean(item.fromOwner)}
                          onChange={(e) =>
                            setChalets(
                              chalets.map((c) =>
                                c.id === item.id ? { ...c, fromOwner: e.target.checked } : c,
                              ),
                            )
                          }
                        />
                        من المالك
                      </label>
                      <label className="flex items-center gap-2 text-[0.8rem] text-sand-dim">
                        <input
                          type="checkbox"
                          checked={Boolean(item.familyOnly)}
                          onChange={(e) =>
                            setChalets(
                              chalets.map((c) =>
                                c.id === item.id ? { ...c, familyOnly: e.target.checked } : c,
                              ),
                            )
                          }
                        />
                        عائلات فقط
                      </label>
                      <button
                        type="button"
                        className="cursor-pointer text-[0.8rem] text-[#e2857f] hover:underline"
                        onClick={() => setChalets(chalets.filter((c) => c.id !== item.id))}
                      >
                        حذف
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <label className="block">
                      <span className="mb-1.5 block text-[0.75rem] text-sand-dim">Slug (رابط الصفحة)</span>
                      <input
                        className={fieldClass()}
                        value={item.slug}
                        onChange={(e) =>
                          setChalets(
                            chalets.map((c) =>
                              c.id === item.id
                                ? {
                                    ...c,
                                    slug: e.target.value
                                      .toLowerCase()
                                      .replace(/[^a-z0-9-]+/g, "-")
                                      .replace(/^-|-$/g, ""),
                                  }
                                : c,
                            ),
                          )
                        }
                      />
                    </label>
                    <LocalizedFields
                      label="العنوان"
                      locale={locale}
                      value={item.title}
                      onChange={(next) =>
                        setChalets(chalets.map((c) => (c.id === item.id ? { ...c, title: next } : c)))
                      }
                    />
                    <LocalizedFields
                      label="الموقع"
                      locale={locale}
                      value={item.location}
                      onChange={(next) =>
                        setChalets(
                          chalets.map((c) => (c.id === item.id ? { ...c, location: next } : c)),
                        )
                      }
                    />
                    <LocalizedFields
                      label="الوصف القصير"
                      locale={locale}
                      multiline
                      value={item.summary}
                      onChange={(next) =>
                        setChalets(
                          chalets.map((c) => (c.id === item.id ? { ...c, summary: next } : c)),
                        )
                      }
                    />
                    <LocalizedFields
                      label="رسالة واتساب"
                      locale={locale}
                      value={item.whatsappMessage}
                      onChange={(next) =>
                        setChalets(
                          chalets.map((c) =>
                            c.id === item.id ? { ...c, whatsappMessage: next } : c,
                          ),
                        )
                      }
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <label className="block">
                        <span className="mb-1.5 block text-[0.75rem] text-sand-dim">غرف نوم</span>
                        <input
                          type="number"
                          min={0}
                          className={fieldClass()}
                          value={item.bedrooms}
                          onChange={(e) =>
                            setChalets(
                              chalets.map((c) =>
                                c.id === item.id
                                  ? { ...c, bedrooms: Number(e.target.value) || 0 }
                                  : c,
                              ),
                            )
                          }
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-[0.75rem] text-sand-dim">حمامات</span>
                        <input
                          type="number"
                          min={0}
                          className={fieldClass()}
                          value={item.bathrooms}
                          onChange={(e) =>
                            setChalets(
                              chalets.map((c) =>
                                c.id === item.id
                                  ? { ...c, bathrooms: Number(e.target.value) || 0 }
                                  : c,
                              ),
                            )
                          }
                        />
                      </label>
                    </div>

                    <div>
                      <span className="mb-1.5 block text-[0.75rem] text-sand-dim">
                        المميزات · {locale === "ar" ? "عربي" : "English"} (سطر لكل ميزة)
                      </span>
                      <textarea
                        className={fieldClass("min-h-[120px] resize-y")}
                        value={(item.features ?? [])
                          .map((f) => f[locale] ?? "")
                          .join("\n")}
                        onChange={(e) => {
                          const lines = e.target.value.split("\n");
                          const features = lines.map((line, i) => ({
                            ...(item.features?.[i] ?? {}),
                            [locale]: line,
                          }));
                          setChalets(
                            chalets.map((c) => (c.id === item.id ? { ...c, features } : c)),
                          );
                        }}
                      />
                    </div>

                    <div className="border-t border-gold/10 pt-4">
                      <p className="mb-2 text-[0.8rem] text-sand-dim">صورة الغلاف</p>
                      {item.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.coverImage}
                          alt=""
                          className="mb-3 h-28 w-auto max-w-full object-cover border border-gold/15"
                        />
                      ) : null}
                      <label className={buttonClass("ghost", "cursor-pointer px-3 py-2 text-[0.8rem]")}>
                        {uploading ? "جاري الرفع…" : "رفع غلاف"}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          disabled={uploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            e.target.value = "";
                            if (!file) return;
                            const url = await uploadFile(file, "chalet");
                            if (!url) return;
                            setChalets(
                              chalets.map((c) => {
                                if (c.id !== item.id) return c;
                                const gallery = c.gallery.includes(url)
                                  ? c.gallery
                                  : [url, ...c.gallery.filter((g) => g !== c.coverImage)];
                                return { ...c, coverImage: url, gallery };
                              }),
                            );
                          }}
                        />
                      </label>
                    </div>

                    <div className="border-t border-gold/10 pt-4">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[0.8rem] text-sand-dim">صور الجاليري</p>
                        <label className={buttonClass("ghost", "cursor-pointer px-3 py-2 text-[0.8rem]")}>
                          {uploading ? "جاري الرفع…" : "إضافة صورة"}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            disabled={uploading}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              e.target.value = "";
                              if (!file) return;
                              const url = await uploadFile(file, "chalet");
                              if (!url) return;
                              setChalets(
                                chalets.map((c) =>
                                  c.id === item.id
                                    ? {
                                        ...c,
                                        gallery: [...c.gallery, url],
                                        coverImage: c.coverImage || url,
                                      }
                                    : c,
                                ),
                              );
                            }}
                          />
                        </label>
                      </div>
                      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {item.gallery.map((src) => (
                          <li key={src} className="relative border border-gold/15">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="" className="aspect-square w-full object-cover" />
                            <button
                              type="button"
                              className="absolute top-1 end-1 bg-ink/80 px-1.5 text-[0.7rem] text-[#e2857f]"
                              onClick={() =>
                                setChalets(
                                  chalets.map((c) =>
                                    c.id === item.id
                                      ? {
                                          ...c,
                                          gallery: c.gallery.filter((g) => g !== src),
                                          coverImage:
                                            c.coverImage === src
                                              ? c.gallery.find((g) => g !== src) ?? ""
                                              : c.coverImage,
                                        }
                                      : c,
                                  ),
                                )
                              }
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {!content.chalets?.length ? (
              <button
                type="button"
                className={buttonClass("ghost", "mt-4 px-4 py-2 text-[0.82rem]")}
                onClick={() => setChalets(chalets)}
              >
                ابدأ التعديل (نسخ الافتراضي)
              </button>
            ) : null}
          </section>
        ) : null}

        {tab === "cars" ? (
          <section className="space-y-8 border border-gold/20 bg-ink-2/40 p-6">
            <div>
              <h2 className="font-display text-lg text-sand">نصوص صفحة العربيات</h2>
              <p className="mt-1 mb-4 text-[0.85rem] leading-[1.7] text-sand-dim">
                عدّل عناوين ووصف صفحة الأسطول من هنا.
              </p>
              <FlatCopyFields
                fields={CARS_COPY_FIELDS}
                value={content.carsCopy}
                locale={locale}
                onChange={(carsCopy) => update({ carsCopy })}
              />
            </div>
            <div className="border-t border-gold/15 pt-6">
              <h2 className="font-display text-lg text-sand">أسطول عربيات VIP</h2>
              <p className="mt-1 text-[0.85rem] leading-[1.7] text-sand-dim">
                العربيات ظاهرة على{" "}
                <Link href="/ar/cars" className="text-gold-soft underline underline-offset-2">
                  /ar/cars
                </Link>
                . مواصفات كل عربية لسه من الكود — القائمة دي للمتابعة.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {vipCars.map((car) => (
                <li
                  key={car.slug}
                  className="flex items-center gap-4 border border-gold/15 bg-ink p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={car.image}
                    alt=""
                    className="h-16 w-20 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1 text-start">
                    <p className="truncate text-[0.95rem] font-semibold text-sand">
                      {car.nameAr}
                    </p>
                    <p className="mt-0.5 text-[0.78rem] text-sand-dim">
                      {car.categoryAr} · {car.passengers} ركاب
                    </p>
                    <Link
                      href={`/ar/cars/${car.slug}`}
                      className="mt-1 inline-block text-[0.78rem] text-gold-soft hover:underline"
                    >
                      فتح الصفحة ←
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {tab === "pages" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <h2 className="mb-2 font-display text-lg text-sand">خريطة صفحات الموقع</h2>
            <p className="mb-6 text-[0.85rem] leading-[1.7] text-sand-dim">
              كل الصفحات العامة الحالية — افتح أي صفحة للمراجعة أو راجع الضغطات من لوحة الحجوزات.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SITE_PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="flex items-center justify-between border border-gold/15 bg-ink px-4 py-3 text-[0.92rem] text-sand transition-colors hover:border-gold/40 hover:text-gold-soft"
                  >
                    <span>{page.label}</span>
                    <span className="font-mono text-[0.72rem] text-sand-dim" dir="ltr">
                      {page.href}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {tab === "gallery" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg text-sand">معرض الصور</h2>
                <p className="text-[0.85rem] text-sand-dim">
                  صور الأدمن بتظهر بدل مجلد public/gallery لما يكون فيه صور.
                </p>
              </div>
              <label className={buttonClass("primary", "cursor-pointer px-4 py-2 text-[0.82rem]")}>
                {uploading ? "جاري الرفع…" : "رفع صورة"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadFile(file, "gallery");
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            {(content.galleryItems ?? []).length === 0 ? (
              <p className="text-[0.9rem] text-sand-dim">مفيش صور في المعرض لسه.</p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {(content.galleryItems ?? []).map((item) => (
                  <li key={item.id} className="border border-gold/15 bg-ink overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt="" className="aspect-video w-full object-cover" />
                    <div className="space-y-3 p-3">
                      <LocalizedFields
                        label="التعليق"
                        locale={locale}
                        value={item.caption}
                        onChange={(next) =>
                          update({
                            galleryItems: (content.galleryItems ?? []).map((g) =>
                              g.id === item.id ? { ...g, caption: next } : g,
                            ),
                          })
                        }
                      />
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-[0.8rem] text-sand-dim">
                          <input
                            type="checkbox"
                            checked={item.visible !== false}
                            onChange={(e) =>
                              update({
                                galleryItems: (content.galleryItems ?? []).map((g) =>
                                  g.id === item.id ? { ...g, visible: e.target.checked } : g,
                                ),
                              })
                            }
                          />
                          ظاهرة
                        </label>
                        <button
                          type="button"
                          className="cursor-pointer text-[0.8rem] text-[#e2857f] hover:underline"
                          onClick={async () => {
                            const response = await fetch("/api/admin/media", {
                              method: "DELETE",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ galleryId: item.id }),
                            });
                            const data = (await response.json()) as { content?: SiteContent };
                            if (data.content) setContent(data.content);
                          }}
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        <div className="mt-8 flex justify-start">
          <button
            type="button"
            onClick={() => save()}
            disabled={saving}
            className={buttonClass("primary", "px-6 py-3 text-[0.9rem] disabled:opacity-60")}
          >
            {saving ? "جاري الحفظ…" : "حفظ كل التغييرات"}
          </button>
        </div>
      </main>
    </div>
  );
}
