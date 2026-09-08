"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { sahelVenues, venueLogoKey, venueName, type Venue } from "@/content/venues";

type Props = {
  locale: Locale;
  venueLogos: Record<string, string>;
  labels: {
    sahel: string;
  };
};

function LogoMark({ venue, locale, src }: { venue: Venue; locale: Locale; src?: string }) {
  const [failed, setFailed] = useState(!src);
  const label = venueName(venue, locale);

  if (!src || failed) {
    return (
      <span className="font-display text-[1rem] whitespace-nowrap text-sand-dim">{label}</span>
    );
  }

  return (
    <Image
      src={src}
      alt={label}
      width={140}
      height={48}
      className="h-10 w-auto max-w-[140px] object-contain opacity-75 transition-opacity duration-200 hover:opacity-100"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function Row({
  items,
  reverse,
  speed,
  locale,
  venueLogos,
}: {
  items: Venue[];
  reverse?: boolean;
  speed: number;
  locale: Locale;
  venueLogos: Record<string, string>;
}) {
  const hasLogos = items.some((v) => venueLogos[venueLogoKey(v)]);

  return (
    <div className="marquee relative overflow-hidden py-4">
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((venue) => (
              <span
                key={`${copy}-${venue.slug}`}
                className="flex items-center gap-8 px-8"
              >
                <LogoMark venue={venue} locale={locale} src={venueLogos[venueLogoKey(venue)]} />
                {!hasLogos ? (
                  <span className="spin-slow text-[0.8rem] text-gold">✦</span>
                ) : null}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TickerStrip({
  items,
  reverse,
  locale,
  venueLogos,
}: {
  items: Venue[];
  reverse?: boolean;
  locale: Locale;
  venueLogos: Record<string, string>;
}) {
  const logoCount = items.length;
  const speed = logoCount > 0 ? Math.max(50, logoCount * 4.5) : 42;

  return (
    <div className="relative overflow-hidden border-y border-gold/15 bg-ink-2/40">
      <Row items={items} speed={speed} reverse={reverse} locale={locale} venueLogos={venueLogos} />
      <div className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

function withLogos(venues: Venue[], venueLogos: Record<string, string>) {
  return venues.filter((v) => venueLogos[venueLogoKey(v)]);
}

/** Scrolling strip of North Coast venue logos. */
export default function VenueTicker({ locale, venueLogos, labels }: Props) {
  const sahelItems = withLogos(sahelVenues, venueLogos);

  if (sahelItems.length === 0) return null;

  return (
    <div className="space-y-6" dir="ltr">
      <div>
        <p className="mb-3 text-[0.72rem] font-semibold tracking-[0.12em] text-gold/80 uppercase">
          {labels.sahel}
        </p>
        <TickerStrip items={sahelItems} locale={locale} venueLogos={venueLogos} />
      </div>
    </div>
  );
}
