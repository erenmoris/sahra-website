import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import ListingGallery from "@/components/ListingGallery";
import TrackedLink from "@/components/TrackedLink";
import Reveal from "@/components/Reveal";
import { Wrap } from "@/components/ui";
import { WhatsAppIcon } from "@/components/Icons";

function isMostlyLatin(text: string): boolean {
  const letters = text.replace(/[^\p{L}]/gu, "");
  if (!letters) return false;
  const latin = (letters.match(/[A-Za-z]/g) ?? []).length;
  return latin / letters.length >= 0.55;
}

export type ListingDetailLayoutProps = {
  locale: Locale;
  t: Dictionary;
  backHref: string;
  backLabel: string;
  category?: string;
  title: string;
  location: string;
  aboutTitle: string;
  about: string;
  locationTitle?: string;
  openMapsLabel?: string;
  mapsUrl?: string | null;
  gallery: string[];
  ctaHref: string;
  ctaLabel: string;
  ctaPlacement: string;
  note?: string;
  /** Extra blocks under about (specs, features, price, badges) */
  children?: ReactNode;
};

/** Master luxury detail template — venues, beaches, chalets. */
export default function ListingDetailLayout({
  locale,
  t,
  backHref,
  backLabel,
  category,
  title,
  location,
  aboutTitle,
  about,
  locationTitle,
  openMapsLabel,
  mapsUrl,
  gallery,
  ctaHref,
  ctaLabel,
  ctaPlacement,
  note,
  children,
}: ListingDetailLayoutProps) {
  const aboutLtr = isMostlyLatin(about);

  return (
    <>
      <section className="relative overflow-hidden pb-28 pt-8 md:pt-12 lg:pb-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.07),transparent_50%)]"
          aria-hidden
        />

        <Wrap className="relative max-w-[1180px]">
          <Reveal>
            <Link
              href={backHref}
              className="mb-8 inline-flex items-center gap-2 text-[0.88rem] text-sand-dim transition-colors hover:text-gold-soft"
            >
              <span aria-hidden className="text-gold-soft">
                {locale === "ar" ? "→" : "←"}
              </span>
              {backLabel}
            </Link>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-12 xl:gap-14">
            <Reveal>
              <ListingGallery images={gallery} title={title} variant="split" />
            </Reveal>

            <Reveal delay={80}>
              <div className="lg:sticky lg:top-10">
                {category ? (
                  <p className="text-[0.75rem] font-medium tracking-[0.18em] text-gold-soft uppercase">
                    {category}
                  </p>
                ) : null}

                <h1 className="mt-2 font-display text-[clamp(2.1rem,5vw,3.35rem)] font-bold leading-[1.15] text-sand">
                  {title}
                </h1>

                <p className="mt-3 flex items-center gap-2 text-[1rem] text-sand-dim">
                  <span aria-hidden className="text-ruby/90">
                    📍
                  </span>
                  {location}
                </p>

                <div className="lux-panel mt-9 rounded-2xl border border-gold/20 bg-ink-2/90 p-5 backdrop-blur-md md:p-6">
                  <h2 className="mb-3 font-display text-lg font-semibold text-sand">{aboutTitle}</h2>
                  <p
                    dir={aboutLtr ? "ltr" : undefined}
                    lang={aboutLtr ? "en" : undefined}
                    className={`text-[1.02rem] leading-[1.9] text-sand-dim ${
                      aboutLtr ? "text-start font-[family-name:var(--font-cairo)]" : ""
                    }`}
                  >
                    {about}
                  </p>
                </div>

                {children}

                {mapsUrl && locationTitle && openMapsLabel ? (
                  <div className="mt-7">
                    <h2 className="mb-3 font-display text-lg font-semibold text-sand">
                      {locationTitle}
                    </h2>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-2.5 text-[0.92rem] font-medium text-gold-soft transition-all duration-300 hover:border-gold hover:bg-gold/15"
                    >
                      <span aria-hidden>📍</span>
                      {openMapsLabel}
                    </a>
                  </div>
                ) : null}

                {/* Desktop floating booking card */}
                <div className="lux-dark-chrome mt-9 hidden rounded-2xl border border-gold/25 p-4 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:block">
                  <TrackedLink
                    href={ctaHref}
                    placement={ctaPlacement}
                    locale={locale}
                    t={t}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-[0.95rem] font-bold text-night shadow-[0_0_0_0_rgba(201,162,75,0)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#d4ae55] hover:shadow-[0_0_36px_-2px_rgba(201,162,75,0.75)] active:scale-[0.99]"
                  >
                    <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    {ctaLabel}
                  </TrackedLink>
                </div>

                {note ? (
                  <p className="mt-6 text-[0.78rem] leading-[1.8] text-sand-dim">{note}</p>
                ) : null}
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* Mobile / tablet sticky glass CTA */}
      <div className="lux-dark-chrome fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
        <TrackedLink
          href={ctaHref}
          placement={`${ctaPlacement}-sticky`}
          locale={locale}
          t={t}
          className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-3.5 text-[0.95rem] font-bold text-night shadow-[0_8px_28px_-8px_rgba(201,162,75,0.85)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#d4ae55] hover:shadow-[0_0_32px_-2px_rgba(201,162,75,0.75)]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {ctaLabel}
        </TrackedLink>
      </div>
    </>
  );
}
