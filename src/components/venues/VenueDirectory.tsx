"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import { venues, venueArea, venueLogoKey, venueName, type Venue, type VenueRegion } from "@/content/venues";
import TrackedLink from "@/components/TrackedLink";
import { Wrap } from "@/components/ui";

const FAVORITES_KEY = "sahra:venue-favorites";

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

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? new Set(parsed.filter((x) => typeof x === "string")) : new Set();
  } catch {
    return new Set();
  }
}

function saveFavorites(slugs: Set<string>) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...slugs]));
  } catch {
    // ignore quota / private mode
  }
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
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return venues.filter(
      (v) => matchesQuery(v, q, locale, t) && matchesArea(v, areaFilter),
    );
  }, [query, areaFilter, locale, t]);

  function toggleFavorite(slug: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      saveFavorites(next);
      return next;
    });
  }

  function toggleArea(id: AreaFilterId) {
    setAreaFilter((prev) => (prev === id ? null : id));
  }

  return (
    <section id="venues" className="scroll-mt-24 pb-20 pt-6 md:pt-8">
      <Wrap className="max-w-[960px]">
        <h1 className="mb-5 text-center font-display text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-sand">
          {t.venues.directoryTitle}
        </h1>

        <label className="relative mb-5 block">
          <span className="sr-only">{t.venues.searchPlaceholder}</span>
          <span className="pointer-events-none absolute inset-y-0 start-3.5 flex items-center text-gold-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.venues.searchPlaceholder}
            className="w-full rounded-2xl border border-gold/25 bg-ink-2 py-3.5 pe-4 ps-11 text-[0.95rem] text-sand placeholder:text-sand-dim/70 focus:border-gold focus:outline-none"
          />
        </label>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="shrink-0 text-[0.85rem] font-semibold text-gold-soft">
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
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.8rem] transition-colors ${
                    active
                      ? "border-gold bg-gold/20 text-gold-soft"
                      : "border-gold/25 bg-ink-2 text-sand-dim hover:border-gold/50 hover:text-sand"
                  }`}
                >
                  <span aria-hidden className="text-[0.85rem] text-ruby">
                    📍
                  </span>
                  {t.venues.areaFilters[id]}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mb-6 text-[0.82rem] text-sand-dim">
          {t.venues.resultsCount.replace("{n}", String(filtered.length))}
        </p>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-[0.95rem] text-sand-dim">{t.venues.emptySearch}</p>
        ) : (
          <ul className="flex flex-col gap-5">
            {filtered.map((venue) => {
              const name = venueName(venue, locale);
              const cover = venueCovers[venue.slug];
              const logo = venueLogos[venueLogoKey(venue)];
              const image = cover ?? logo;
              const isCover = Boolean(cover);
              const saved = favorites.has(venue.slug);
              const tags = venueTags(venue.regions, t);
              const location = venueArea(venue, locale);
              const waMessage = `${t.venues.whatsappBookPrefix} ${name}`;

              return (
                <li key={venue.slug}>
                  <article className="overflow-hidden rounded-2xl border border-gold/20 bg-ink-2/80 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.85)]">
                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5">
                      <div className="relative mx-auto aspect-square w-full max-w-[200px] shrink-0 overflow-hidden rounded-xl border border-gold/15 bg-ink sm:mx-0 sm:w-[160px] sm:max-w-none">
                        {image ? (
                          <Image
                            src={image}
                            alt={name}
                            fill
                            sizes="200px"
                            className={isCover ? "object-cover" : "object-contain p-3"}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-3 to-ink">
                            <span className="font-display text-3xl font-semibold text-gold-soft">
                              {initials(venue.name)}
                            </span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleFavorite(venue.slug)}
                          aria-label={t.venues.savePlace}
                          aria-pressed={saved}
                          className={`absolute end-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 bg-ink/85 text-[1.05rem] shadow-md backdrop-blur-sm transition-colors hover:border-gold/50 ${
                            saved ? "text-[#e85d6a]" : "text-sand-dim"
                          }`}
                        >
                          {saved ? "♥" : "♡"}
                        </button>
                      </div>

                      <div className="min-w-0 flex-1 text-center sm:text-start">
                        <p className="text-[0.78rem] tracking-[0.04em] text-gold-soft">
                          {t.venues.categoryNightlife}
                        </p>
                        <h2 className="mt-1 font-display text-[1.35rem] font-semibold leading-snug text-sand">
                          {name}
                        </h2>
                        <p className="mt-1.5 flex items-center justify-center gap-1.5 text-[0.86rem] text-sand-dim sm:justify-start">
                          <span aria-hidden className="text-ruby">
                            📍
                          </span>
                          {location}
                        </p>
                        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-gold/20 bg-gold/10 px-2.5 py-1 text-[0.72rem] text-gold-soft"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gold/10 px-4 pb-4 pt-3 sm:px-5">
                      <TrackedLink
                        href={whatsappLink(waMessage)}
                        placement={`venue-book-${venue.slug}`}
                        locale={locale}
                        t={t}
                        className="mx-auto flex w-full max-w-[220px] items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-soft px-6 py-3 text-[0.95rem] font-bold text-night shadow-[0_10px_24px_-12px_rgba(201,162,75,0.9)] transition-transform hover:-translate-y-px"
                      >
                        {t.venues.book}
                      </TrackedLink>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-10 text-center text-[0.78rem] leading-[1.8] text-[#6b6455]">
          {t.venues.namesNote}
        </p>
      </Wrap>
    </section>
  );
}
