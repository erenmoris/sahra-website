"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import {
  DEFAULT_SECTIONS,
  SECTION_LABELS,
  type GalleryMediaItem,
  type LocalizedString,
  type SectionKey,
  type SiteContent,
  type TestimonialItem,
} from "@/lib/content/types";
import { buttonClass } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Tab = "sections" | "hero" | "ticker" | "testimonials" | "gallery";

const TABS: { id: Tab; label: string }[] = [
  { id: "sections", label: "Sections" },
  { id: "hero", label: "Hero + Video" },
  { id: "ticker", label: "Ticker" },
  { id: "testimonials", label: "Testimonials" },
  { id: "gallery", label: "Gallery" },
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
        {label} · {locale.toUpperCase()}
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
      if (!response.ok) throw new Error(data.error ?? "Save failed");
      if (data.content) setContent(data.content);
      setMessage("Saved. Changes are live on the site.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const update = useCallback((patch: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...patch }));
  }, []);

  async function uploadFile(
    file: File,
    purpose: "gallery" | "video" | "poster",
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
            "Video is too large for server upload. Add BLOB_READ_WRITE_TOKEN (Vercel Blob) to upload large files.",
          );
        }
        throw new Error(data.error ?? "Upload failed");
      }
      if (data.content) setContent(data.content);
      setMessage("Upload complete.");
      router.refresh();
      return data.url ?? null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
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
    <div dir="ltr" className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-gold/20 bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <div className="font-display text-xl font-bold text-sand">
              Sahra <span className="text-gold-soft">·</span> Content
            </div>
            <p className="text-[0.78rem] text-sand-dim">Signed in as {username}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
            >
              Reservations
            </Link>
            <Link
              href="/ar"
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={() => save()}
              disabled={saving}
              className={buttonClass("primary", "px-4 py-2 text-[0.82rem] disabled:opacity-60")}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="cursor-pointer border border-[#c9646f]/40 px-3 py-2 text-[0.78rem] text-[#e2857f]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 py-8">
        {!blobReady ? (
          <div className="mb-6 border border-gold/30 bg-gold/10 px-5 py-4 text-[0.85rem] leading-[1.7] text-gold-soft">
            Vercel Blob is not configured. Small images/videos save to{" "}
            <code>public/uploads</code> in local development. For production uploads (especially
            large videos), create a Blob store and set <code>BLOB_READ_WRITE_TOKEN</code>.
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
                className={`cursor-pointer border px-3 py-1.5 text-[0.78rem] uppercase ${
                  locale === code
                    ? "border-gold bg-gold/15 text-gold-soft"
                    : "border-gold/25 text-sand-dim"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {tab === "sections" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <h2 className="mb-2 font-display text-lg text-sand">Show / hide sections</h2>
            <p className="mb-6 text-[0.85rem] text-sand-dim">
              Hidden sections disappear from the public homepage immediately after save.
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
              <h2 className="mb-4 font-display text-lg text-sand">Hero copy</h2>
              <div className="grid gap-4">
                {(
                  [
                    ["eyebrow", "Eyebrow"],
                    ["titleTop", "Title (top)"],
                    ["titleAccent", "Title accent"],
                    ["titleBottom", "Title (bottom)"],
                    ["lede", "Lede"],
                    ["ctaPrimary", "Primary CTA"],
                    ["ctaSecondary", "Secondary CTA"],
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
                Leave a field empty to keep the default from the site dictionary.
              </p>
            </div>

            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-4 font-display text-lg text-sand">Promo video</h2>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[0.75rem] text-sand-dim uppercase">
                    Placement
                  </span>
                  <select
                    className={fieldClass()}
                    value={content.promoVideo?.placement ?? "section"}
                    onChange={(e) =>
                      update({
                        promoVideo: {
                          ...content.promoVideo,
                          placement: e.target.value as "hero" | "section",
                        },
                      })
                    }
                  >
                    <option value="hero">Inside Hero (replaces chat card)</option>
                    <option value="section">Standalone section after Hero</option>
                  </select>
                </label>
                <label className="flex items-end gap-3 pb-2">
                  <input
                    type="checkbox"
                    checked={content.promoVideo?.visible ?? false}
                    onChange={(e) =>
                      update({
                        promoVideo: { ...content.promoVideo, visible: e.target.checked },
                        sections: {
                          ...content.sections,
                          promoVideo: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 accent-[var(--color-gold,#c9a24b)]"
                  />
                  <span className="text-[0.9rem] text-sand">Video visible on site</span>
                </label>
              </div>

              {content.promoVideo?.src ? (
                <div className="mb-4 overflow-hidden border border-gold/20">
                  <video
                    src={content.promoVideo.src}
                    poster={content.promoVideo.poster}
                    controls
                    className="max-h-[280px] w-full bg-black"
                  />
                  <div className="flex flex-wrap gap-2 border-t border-gold/15 p-3">
                    <button
                      type="button"
                      className="cursor-pointer text-[0.8rem] text-[#e2857f] hover:underline"
                      onClick={async () => {
                        await fetch("/api/admin/media", {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ clearVideo: true }),
                        });
                        const next = {
                          ...content,
                          promoVideo: { ...content.promoVideo, src: undefined },
                        };
                        setContent(next);
                      }}
                    >
                      Remove video
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <label className={buttonClass("ghost", "cursor-pointer px-4 py-2 text-[0.82rem]")}>
                  {uploading ? "Uploading…" : "Upload video (MP4/WebM)"}
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void uploadFile(file, "video");
                      e.target.value = "";
                    }}
                  />
                </label>
                <label className={buttonClass("ghost", "cursor-pointer px-4 py-2 text-[0.82rem]")}>
                  Upload poster image
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void uploadFile(file, "poster");
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-gold/15 pt-6">
              <h2 className="mb-4 font-display text-lg text-sand">Section headings</h2>
              <div className="space-y-6">
                {(
                  [
                    ["how", "How it works"],
                    ["trust", "Trust"],
                    ["gallery", "Gallery"],
                    ["testimonials", "Testimonials"],
                  ] as const
                ).map(([key, title]) => (
                  <div key={key} className="border border-gold/15 bg-ink p-4">
                    <h3 className="mb-3 text-[0.9rem] font-semibold text-gold-soft">{title}</h3>
                    <div className="grid gap-3">
                      {(
                        [
                          ["eyebrow", "Eyebrow"],
                          ["title", "Title"],
                          ["titleAccent", "Title accent"],
                          ["lede", "Lede"],
                        ] as const
                      ).map(([field, label]) =>
                        field === "lede" && key !== "how" && key !== "trust" && key !== "gallery" && key !== "testimonials" ? null : (
                          <LocalizedFields
                            key={field}
                            label={label}
                            locale={locale}
                            multiline={field === "lede"}
                            value={content[key]?.[field]}
                            onChange={(next) =>
                              update({ [key]: { ...content[key], [field]: next } })
                            }
                          />
                        ),
                      )}
                      {key === "testimonials" ? (
                        <LocalizedFields
                          label="Title end"
                          locale={locale}
                          value={content.testimonials?.titleEnd}
                          onChange={(next) =>
                            update({
                              testimonials: { ...content.testimonials, titleEnd: next },
                            })
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {tab === "ticker" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <h2 className="mb-2 font-display text-lg text-sand">Promo ticker lines</h2>
            <p className="mb-6 text-[0.85rem] text-sand-dim">
              Editing {locale.toUpperCase()}. Saving replaces the default ticker for this language.
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
                    Remove
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
              Add line
            </button>
          </section>
        ) : null}

        {tab === "testimonials" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg text-sand">Testimonials</h2>
                <p className="text-[0.85rem] text-sand-dim">
                  First edit seeds from defaults. After that, this list is the source of truth.
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
                Add testimonial
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
                        Visible
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
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <LocalizedFields
                      label="Quote"
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
                      label="Who / city"
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
                      label="Name (optional)"
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
                Start editing (copy defaults)
              </button>
            ) : null}
          </section>
        ) : null}

        {tab === "gallery" ? (
          <section className="border border-gold/20 bg-ink-2/40 p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg text-sand">Gallery</h2>
                <p className="text-[0.85rem] text-sand-dim">
                  CMS gallery images override the empty/default folder listing when present.
                </p>
              </div>
              <label className={buttonClass("primary", "cursor-pointer px-4 py-2 text-[0.82rem]")}>
                {uploading ? "Uploading…" : "Upload image"}
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
              <p className="text-[0.9rem] text-sand-dim">No CMS gallery images yet.</p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {(content.galleryItems ?? []).map((item) => (
                  <li key={item.id} className="border border-gold/15 bg-ink overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt="" className="aspect-video w-full object-cover" />
                    <div className="space-y-3 p-3">
                      <LocalizedFields
                        label="Caption"
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
                          Visible
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
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => save()}
            disabled={saving}
            className={buttonClass("primary", "px-6 py-3 text-[0.9rem] disabled:opacity-60")}
          >
            {saving ? "Saving…" : "Save all changes"}
          </button>
        </div>
      </main>
    </div>
  );
}
