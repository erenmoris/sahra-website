"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import {
  DEFAULT_SECTIONS,
  SECTION_LABELS,
  type GalleryMediaItem,
  type FaqItem,
  type LocalizedString,
  type SectionKey,
  type SiteContent,
  type TestimonialItem,
} from "@/lib/content/types";
import { buttonClass } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Tab = "sections" | "hero" | "ticker" | "coverage" | "testimonials" | "gallery";

const TABS: { id: Tab; label: string }[] = [
  { id: "sections", label: "الأقسام" },
  { id: "hero", label: "الهيرو والهيدر" },
  { id: "ticker", label: "الشريط المتحرك" },
  { id: "coverage", label: "دليل السهر والأسئلة" },
  { id: "testimonials", label: "آراء العملاء" },
  { id: "gallery", label: "معرض الصور" },
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

  const testimonials: TestimonialItem[] = useMemo(() => {
    if (content.testimonialItems?.length) return content.testimonialItems;
    const ar = getDictionary("ar").testimonials.items;
    const en = getDictionary("en").testimonials.items;
    return ar.map((item, index) => ({
      id: `default-${index}`,
      text: { ar: item.text, en: en[index]?.text ?? "" },
      who: { ar: item.who, en: en[index]?.who ?? "" },
      name:
        item.name || en[index]?.name
          ? { ar: item.name ?? "", en: en[index]?.name ?? "" }
          : undefined,
      visible: true,
    }));
  }, [content.testimonialItems]);

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
    purpose: "gallery" | "video" | "poster" | "logo",
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
              الأقسام المخفية بتختفي من الصفحة الرئيسية فور الحفظ.
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
                الأسماء دي بتظهر في الهيدر وقائمة الموبايل.
              </p>
              <div className="grid gap-4">
                {(
                  [
                    ["how", "تاب طريقة الحجز"],
                    ["venues", "تاب أنواع السهرات"],
                    ["trust", "تاب ليه تختارنا"],
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
                <p className="text-[0.85rem] text-sand-dim">
                  أول تعديل بينسخ الافتراضي. بعد كده القائمة دي هي المصدر.
                </p>
              </div>
              <button
                type="button"
                className={buttonClass("ghost", "px-4 py-2 text-[0.82rem]")}
                onClick={() => {
                  const items = [
                    ...testimonials,
                    {
                      id: newId(),
                      text: { ar: "", en: "" },
                      who: { ar: "", en: "" },
                      visible: true,
                    },
                  ];
                  update({ testimonialItems: items });
                }}
              >
                إضافة رأي
              </button>
            </div>
            <ul className="space-y-4">
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
                            const items = testimonials.map((t) =>
                              t.id === item.id ? { ...t, visible: e.target.checked } : t,
                            );
                            update({ testimonialItems: items });
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
                  <div className="grid gap-3">
                    <LocalizedFields
                      label="النص"
                      locale={locale}
                      multiline
                      value={item.text}
                      onChange={(next) =>
                        update({
                          testimonialItems: testimonials.map((t) =>
                            t.id === item.id ? { ...t, text: next } : t,
                          ),
                        })
                      }
                    />
                    <LocalizedFields
                      label="مين / المدينة"
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
                      label="الاسم (اختياري)"
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
            {!content.testimonialItems?.length ? (
              <button
                type="button"
                className={buttonClass("primary", "mt-4 px-4 py-2 text-[0.82rem]")}
                onClick={() => update({ testimonialItems: testimonials })}
              >
                ابدأ التعديل (نسخ الافتراضي)
              </button>
            ) : null}
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
