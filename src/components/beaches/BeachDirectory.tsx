"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import { beaches, beachArea, beachName, type Beach } from "@/content/beaches";
import TrackedLink from "@/components/TrackedLink";
import { Wrap } from "@/components/ui";

type AreaFilterId = keyof Dictionary["beaches"]["areaFilters"];

const AREA_MATCHERS: Record<AreaFilterId, RegExp> = {
  marassi: /marassi|مراسي/i,
  marina: /marina\s*el\s*alamein|مارينا/i,
  bianchi: /bianchi|بيانكي/i,
  haciendaWhite: /hacienda\s*white|هاسيندا\s*وايت/i,
  haciendaBay: /hacienda\s*bay|هاسيندا\s*باي/i,
  sidi: /sidi\s*abd|سيدي\s*عبد/i,
  sidiHeneish: /heneish|هنيش/i,
  alamein: /^(?:new\s+)?el\s+alamein|^new\s+alamein|العلمين الجديدة|^العلمين\s*·/i,
  ladies: /ladies|ليديز|femme|gitana|yashmak/i,
};

const AREA_ORDER: AreaFilterId[] = [
  "marassi",
  "marina",
  "bianchi",
  "haciendaWhite",
  "haciendaBay",
  "sidi",
  "sidiHeneish",
  "alamein",
  "ladies",
];

type Props = {
  locale: Locale;
  t: Dictionary;
  beachCovers: Record<string, string>;
};

function beachTags(beach: Beach, t: Dictionary): string[] {
  if (beach.kind === "aqua") {
    return [t.beaches.tags.aqua, t.beaches.tags.family, t.beaches.tags.dayPass];
  }
  const tags: string[] = [t.beaches.tags.dayPass, t.beaches.tags.cabana, t.beaches.tags.pool];
  if (/ladies|ليديز|femme|gitana|yashmak/i.test(`${beach.name} ${beach.nameAr} ${beach.slug}`)) {
    tags.unshift(t.beaches.tags.ladies);
  }
  return tags.slice(0, 4);
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function matchesQuery(beach: Beach, q: string, t: Dictionary): boolean {
  if (!q) return true;
  const hay = [
    beach.name,
    beach.nameAr,
    beach.area,
    beach.areaAr,
    ...(beach.aliases ?? []),
    beach.kind === "aqua" ? t.beaches.tags.aqua : t.beaches.categoryBeach,
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function matchesArea(beach: Beach, areaId: AreaFilterId | null): boolean {
  if (!areaId) return true;
  const hay = `${beach.area} ${beach.areaAr} ${beach.name} ${beach.nameAr} ${beach.slug}`;
  return AREA_MATCHERS[areaId].test(hay);
}

export default function BeachDirectory({ locale, t, beachCovers }: Props) {
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState<AreaFilterId | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return beaches.filter((b) => matchesQuery(b, q, t) && matchesArea(b, areaFilter));
  }, [query, areaFilter, t]);

  function toggleArea(id: AreaFilterId) {
    setAreaFilter((prev) => (prev === id ? null : id));
  }

  return (
    <section id="beaches" className="relative scroll-mt-24 overflow-hidden pb-24 pt-8 md:pt-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.06),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(56,120,140,0.08),transparent_45%)]"
        aria-hidden
      />

      <Wrap className="relative max-w-[1040px]">
        <label className="group relative mb-6 block">
          <span className="sr-only">{t.beaches.searchPlaceholder}</span>
          <span className="pointer-events-none absolute inset-y-0 start-4 z-10 flex items-center text-gold-soft/80 transition-colors group-focus-within:text-gold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.beaches.searchPlaceholder}
            className="w-full rounded-2xl border border-gold/20 bg-ink-2/90 py-4 pe-4 ps-12 text-[0.95rem] text-sand shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md placeholder:text-sand-dim transition-[border-color,box-shadow] duration-300 focus:border-gold/70 focus:outline-none focus:shadow-[0_0_0_1px_rgba(201,162,75,0.35),0_0_28px_-4px_rgba(201,162,75,0.55)]"
          />
        </label>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="shrink-0 text-[0.82rem] font-semibold tracking-wide text-gold-soft">
            {t.beaches.popularAreas}
          </p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {AREA_ORDER.map((id) => {
              const active = areaFilter === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleArea(id)}
                  aria-pressed={active}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[0.8rem] font-semibold tracking-wide transition-all duration-300 ${
                    active
                      ? "border-gold/60 bg-gold/20 text-gold-soft shadow-[0_0_20px_-8px_rgba(201,162,75,0.7)]"
                      : "border-gold/20 bg-ink-2/90 text-sand hover:border-gold/55 hover:bg-ink-3 hover:text-gold-soft"
                  }`}
                >
                  <span aria-hidden className="text-[0.75rem] opacity-80">
                    📍
                  </span>
                  {t.beaches.areaFilters[id]}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mb-7 text-[0.84rem] text-sand-dim">
          {t.beaches.resultsCount.replace("{n}", String(filtered.length))}
        </p>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-[0.95rem] text-sand-dim">{t.beaches.emptySearch}</p>
        ) : (
          <ul className="flex flex-col gap-6">
            {filtered.map((beach) => {
              const name = beachName(beach, locale);
              const cover = beachCovers[beach.slug];
              const tags = beachTags(beach, t);
              const location = beachArea(beach, locale);
              const waMessage = `${t.beaches.whatsappBookPrefix} ${name}`;
              const category =
                beach.kind === "aqua" ? t.beaches.categoryAqua : t.beaches.categoryBeach;
              const detailHref = `/${locale}/beaches/${beach.slug}`;

              return (
                <li key={beach.slug}>
                  <article className="lux-panel group relative overflow-hidden rounded-[1.35rem] border border-gold/20 bg-ink-2/90 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-lg transition-all duration-700 hover:border-gold/35 hover:bg-ink-3 hover:shadow-[0_28px_70px_-32px_rgba(201,162,75,0.22)]">
                    <div className="flex flex-col sm:flex-row sm:items-stretch">
                      <div className="relative isolate shrink-0 overflow-hidden sm:w-[260px] md:w-[300px]">
                        <Link
                          href={detailHref}
                          className="relative block aspect-[16/11] sm:aspect-auto sm:h-full sm:min-h-[230px]"
                          aria-label={name}
                        >
                          {cover ? (
                            <Image
                              src={cover}
                              alt={name}
                              fill
                              sizes="(max-width: 640px) 100vw, 300px"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full min-h-[210px] w-full items-center justify-center bg-gradient-to-br from-[#1a2a36] via-ink-3 to-ink transition-transform duration-700 group-hover:scale-105">
                              <span className="font-display text-4xl font-semibold text-gold-soft">
                                {initials(beach.name)}
                              </span>
                            </div>
                          )}
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5 sm:bg-gradient-to-l sm:from-transparent sm:via-black/15 sm:to-black/45"
                            aria-hidden
                          />
                        </Link>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-5 sm:p-6 md:p-7">
                        <Link href={detailHref} className="block text-start outline-none">
                          <p className="text-[0.72rem] font-medium tracking-[0.16em] text-gold-soft uppercase">
                            {category}
                          </p>
                          <h3 className="mt-1.5 font-display text-[clamp(1.35rem,2.8vw,1.85rem)] font-bold leading-snug text-sand transition-colors duration-300 group-hover:text-gold-soft">
                            {name}
                          </h3>
                          <p className="mt-2 flex items-center gap-1.5 text-[0.88rem] text-sand-dim">
                            <span aria-hidden className="text-ruby/90">
                              📍
                            </span>
                            {location}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md border border-gold/15 bg-gold/[0.08] px-2.5 py-1 text-[0.68rem] font-medium tracking-wide text-gold-soft/90"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </Link>

                        <div className="flex items-center justify-end">
                          <TrackedLink
                            href={whatsappLink(waMessage)}
                            placement={`beach-book-${beach.slug}`}
                            locale={locale}
                            t={t}
                            className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-2.5 text-[0.92rem] font-bold text-night shadow-[0_0_0_0_rgba(201,162,75,0)] transition-all duration-300 hover:scale-105 hover:bg-[#d4ae55] hover:shadow-[0_0_28px_-2px_rgba(201,162,75,0.75)] active:scale-100"
                          >
                            {t.beaches.book}
                          </TrackedLink>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-12 text-center text-[0.78rem] leading-[1.8] text-sand-dim">{t.beaches.namesNote}</p>
      </Wrap>
    </section>
  );
}
