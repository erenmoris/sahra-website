"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import { venues, venueArea, venueLogoKey, venueName, type Venue, type VenueRegion } from "@/content/venues";
import TrackedLink from "@/components/TrackedLink";
import { Wrap } from "@/components/ui";

type AreaFilterId = keyof Dictionary["venues"]["areaFilters"];

const AREA_MATCHERS: Record<AreaFilterId, RegExp> = {
  marassi: /marassi/i,
  sidi: /sidi\s*abd/i,
  haciendaWhite: /hacienda\s*white/i,
  haciendaRed: /hacienda\s*red/i,
  bianchi: /bianchi/i,
  haciendaBay: /hacienda\s*bay/i,
  ghazala: /ghazal+a/i,
  almaza: /almaza/i,
  cairo: /cairo|القاهرة/i,
};

const AREA_ORDER: AreaFilterId[] = [
  "marassi",
  "sidi",
  "haciendaWhite",
  "haciendaRed",
  "bianchi",
  "haciendaBay",
  "ghazala",
  "almaza",
  "cairo",
];

type Props = {
  locale: Locale;
  t: Dictionary;
  venueLogos: Record<string, string>;
  venueCovers: Record<string, string>;
};

function venueTags(regions: VenueRegion[], t: Dictionary): string[] {
  const tags: string[] = [t.venues.tags.vip, t.venues.tags.dj, t.venues.tags.late];
  if (regions.includes("sahel")) {
    tags.splice(1, 0, t.venues.tags.beach, t.venues.tags.seaView);
  } else {
    tags.splice(1, 0, t.venues.tags.rooftop);
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

function matchesQuery(venue: Venue, q: string, locale: Locale, t: Dictionary): boolean {
  if (!q) return true;
  const hay = [
    venue.name,
    venue.nameAr,
    venue.area,
    venue.areaAr,
    ...(venue.aliases ?? []),
    ...venue.regions.map((r) => (r === "sahel" ? t.venues.tickerSahel : t.venues.tickerCairo)),
    locale === "ar" ? "سهرات" : "nightlife",
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function matchesArea(venue: Venue, areaId: AreaFilterId | null): boolean {
  if (!areaId) return true;
  return AREA_MATCHERS[areaId].test(`${venue.area} ${venue.areaAr}`);
}

export default function VenueDirectory({ locale, t, venueLogos, venueCovers }: Props) {
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState<AreaFilterId | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return venues.filter((v) => matchesQuery(v, q, locale, t) && matchesArea(v, areaFilter));
  }, [query, areaFilter, locale, t]);

  function toggleArea(id: AreaFilterId) {
    setAreaFilter((prev) => (prev === id ? null : id));
  }

  return (
    <section id="venues" className="relative scroll-mt-24 overflow-hidden pb-24 pt-8 md:pt-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.07),transparent_55%)]"
        aria-hidden
      />

      <Wrap className="relative max-w-[1040px]">
        <label className="group relative mb-6 block">
          <span className="sr-only">{t.venues.searchPlaceholder}</span>
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
            placeholder={t.venues.searchPlaceholder}
            className="w-full rounded-2xl border border-gold/25 bg-ink-2/90 py-4 pe-4 ps-12 text-[0.95rem] text-sand shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl placeholder:text-sand-dim transition-[border-color,box-shadow] duration-300 focus:border-gold/70 focus:outline-none focus:shadow-[0_0_0_1px_rgba(201,162,75,0.35),0_0_28px_-4px_rgba(201,162,75,0.55)]"
          />
        </label>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="shrink-0 text-[0.82rem] font-semibold tracking-wide text-gold-soft">
            {t.venues.popularAreas}
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
                  {t.venues.areaFilters[id]}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mb-7 text-[0.84rem] text-sand-dim">
          {t.venues.resultsCount.replace("{n}", String(filtered.length))}
        </p>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-[0.95rem] text-sand-dim">{t.venues.emptySearch}</p>
        ) : (
          <ul className="flex flex-col gap-6">
            {filtered.map((venue) => {
              const name = venueName(venue, locale);
              const cover = venueCovers[venue.slug];
              const logo = venueLogos[venueLogoKey(venue)];
              const image = cover ?? logo;
              const isCover = Boolean(cover);
              const tags = venueTags(venue.regions, t);
              const location = venueArea(venue, locale);
              const waMessage = `${t.venues.whatsappBookPrefix} ${name}`;
              const detailHref = `/${locale}/venues/${venue.slug}`;

              return (
                <li key={venue.slug}>
                  <article className="lux-panel group relative overflow-hidden rounded-[1.35rem] border border-gold/20 bg-ink-2/90 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-lg transition-all duration-500 hover:border-gold/35 hover:bg-ink-3 hover:shadow-[0_28px_70px_-32px_rgba(201,162,75,0.25)]">
                    <div className="flex flex-col sm:flex-row sm:items-stretch">
                      <div className="relative isolate shrink-0 overflow-hidden sm:w-[240px] md:w-[280px]">
                        <Link
                          href={detailHref}
                          className="relative block aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[220px]"
                          aria-label={name}
                        >
                          {image ? (
                            <Image
                              src={image}
                              alt={name}
                              fill
                              sizes="(max-width: 640px) 100vw, 280px"
                              className={`${
                                isCover ? "object-cover" : "object-contain bg-ink p-6"
                              } transition-transform duration-500 ease-out group-hover:scale-105`}
                            />
                          ) : (
                            <div className="flex h-full min-h-[200px] w-full items-center justify-center bg-gradient-to-br from-ink-3 to-ink transition-transform duration-500 group-hover:scale-105">
                              <span className="font-display text-4xl font-semibold text-gold-soft">
                                {initials(venue.name)}
                              </span>
                            </div>
                          )}
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10"
                            aria-hidden
                          />
                        </Link>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-5 sm:p-6 md:p-7">
                        <Link href={detailHref} className="block text-start outline-none">
                          <p className="text-[0.72rem] font-medium tracking-[0.16em] text-gold-soft uppercase">
                            {t.venues.categoryNightlife}
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
                            placement={`venue-book-${venue.slug}`}
                            locale={locale}
                            t={t}
                            className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-2.5 text-[0.92rem] font-bold text-night shadow-[0_0_0_0_rgba(201,162,75,0)] transition-all duration-300 hover:scale-105 hover:bg-[#d4ae55] hover:shadow-[0_0_28px_-2px_rgba(201,162,75,0.75)] active:scale-100"
                          >
                            {t.venues.book}
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

        <p className="mt-12 text-center text-[0.78rem] leading-[1.8] text-sand-dim">{t.venues.namesNote}</p>
      </Wrap>
    </section>
  );
}
