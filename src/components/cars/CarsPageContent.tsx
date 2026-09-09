import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import {
  carCategory,
  carFeature,
  carLuggage,
  carName,
  vipCars,
} from "@/content/cars";
import Reveal from "@/components/Reveal";
import TrackedLink from "@/components/TrackedLink";
import { Wrap, buttonClass } from "@/components/ui";

function PassengersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 11a3 3 0 1 0-2.83-4M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4.5 19c.5-2.2 2.4-3.5 4.5-3.5h1.2M19.5 19c-.4-2-1.9-3.3-3.8-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 15.5c1.7 0 3.2 1 3.8 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LuggageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="7" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M8 19v1.5M16 19v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5 13.2 9 18.5 10.2 13.2 11.4 12 16.5 10.8 11.4 5.5 10.2 10.8 9 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M18 4.5v3M19.5 6h-3M6.5 15v2.5M7.75 16.25h-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CtaArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CarsPageContent({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
}) {
  const c = t.cars;

  return (
    <>
      <section
        data-testid="cars-hero"
        className="relative overflow-hidden bg-ink py-16 md:py-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.12),transparent_55%)]"
        />
        <Wrap className="relative text-start">
          <Reveal>
            <p className="mb-4 text-[0.75rem] font-semibold tracking-[0.2em] text-gold uppercase">
              {c.eyebrow}
            </p>
            <h1 className="max-w-[16ch] font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.2] font-bold text-gold">
              {c.heroTitle}
            </h1>
            <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-[1.9] text-sand-dim md:text-[1.12rem]">
              {c.heroLede}
            </p>
          </Reveal>
        </Wrap>
      </section>

      <section
        id="fleet"
        data-testid="cars-fleet"
        className="relative bg-ink pb-16 md:pb-24"
        aria-labelledby="cars-fleet-title"
      >
        <Wrap>
          <Reveal>
            <div className="mb-9 max-w-[40rem] text-start md:mb-12">
              <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.18em] text-gold uppercase">
                {c.fleetEyebrow}
              </p>
              <h2
                id="cars-fleet-title"
                className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] leading-[1.25] font-bold text-sand"
              >
                {c.fleetTitle}
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {vipCars.map((car, index) => {
              const name = carName(car, locale);
              const category = carCategory(car, locale);
              const luggage = carLuggage(car, locale);
              const feature = carFeature(car, locale);
              const wa = whatsappLink(
                `${c.whatsappPrefix} ${name} (${category})`,
              );

              return (
                <Reveal key={car.slug} delay={(index % 3) * 70} className="h-full">
                  <article
                    data-testid={`car-card-${car.slug}`}
                    className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/20 bg-ink-2 shadow-[0_28px_60px_-40px_rgba(0,0,0,0.75)] sm:aspect-square md:aspect-[4/5]"
                  >
                    <Link
                      href={`/${locale}/cars/${car.slug}`}
                      className="absolute inset-0 z-[1]"
                      aria-label={name}
                    />

                    <Image
                      src={car.image}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div
                      aria-hidden
                      className="theme-scrim absolute inset-0 bg-gradient-to-t from-night via-night/85 to-transparent/10"
                    />

                    <div className="pointer-events-none relative z-10 flex h-full flex-col items-start justify-end p-6 text-start md:p-8">
                      <p className="theme-scrim-muted mb-2 text-start text-sm font-bold tracking-widest text-gold uppercase">
                        {category}
                      </p>
                      <h3 className="theme-scrim-text mb-4 text-start font-display text-3xl leading-[1.2] font-bold text-on-dark drop-shadow-lg">
                        {name}
                      </h3>

                      <div className="mb-6 flex w-full flex-row justify-between gap-3 rounded-lg border border-white/15 bg-night/35 p-4 text-start backdrop-blur-sm">
                        <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 text-start">
                          <PassengersIcon className="h-3.5 w-3.5 text-gold/80" />
                          <p className="theme-scrim-muted text-xs text-on-dark-muted">
                            {c.passengersLabel}
                          </p>
                          <p className="theme-scrim-text text-sm font-semibold text-on-dark">
                            {car.passengers}
                          </p>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 text-start">
                          <LuggageIcon className="h-3.5 w-3.5 text-gold/80" />
                          <p className="theme-scrim-muted text-xs text-on-dark-muted">
                            {c.luggageLabel}
                          </p>
                          <p className="theme-scrim-text text-sm leading-snug font-semibold text-on-dark">
                            {luggage}
                          </p>
                        </div>
                        <div className="flex min-w-0 flex-[1.2] flex-col items-start gap-1.5 text-start">
                          <SparkleIcon className="h-3.5 w-3.5 text-gold/80" />
                          <p className="theme-scrim-muted text-xs text-on-dark-muted">
                            {c.featureLabel}
                          </p>
                          <p className="theme-scrim-text text-sm leading-snug font-semibold text-on-dark">
                            {feature}
                          </p>
                        </div>
                      </div>

                      <TrackedLink
                        href={wa}
                        placement={`cars-book-${car.slug}`}
                        locale={locale}
                        t={t}
                        testId={`car-book-${car.slug}`}
                        className="pointer-events-auto relative z-20 inline-flex w-full items-center justify-center gap-2.5 rounded-md border border-[#e4c878]/40 bg-gold px-5 py-3.5 text-[0.92rem] font-bold tracking-[0.01em] text-night shadow-[0_10px_28px_-12px_rgba(201,162,75,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4ae55] hover:shadow-[0_0_40px_-6px_rgba(201,162,75,0.95)]"
                      >
                        <CtaArrow className="h-3.5 w-3.5 shrink-0 ltr:rotate-180" />
                        <span>{c.bookButton}</span>
                      </TrackedLink>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Wrap>
      </section>

      <section
        data-testid="cars-airport"
        className="relative bg-ink pb-20 md:pb-28"
      >
        <Wrap>
          <Reveal>
            <div className="lux-panel relative overflow-hidden rounded-[1.5rem] border border-gold/30 bg-gradient-to-br from-ink-2 via-ink-2 to-gold/[0.08] px-6 py-10 backdrop-blur-xl md:px-10 md:py-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -end-16 top-0 h-48 w-48 rounded-full bg-gold/15 blur-[80px]"
              />
              <div className="relative flex flex-col gap-7 text-start md:flex-row md:items-end md:justify-between md:gap-12">
                <div className="min-w-0 flex-1 max-w-[42rem]">
                  <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.18em] text-gold uppercase">
                    {c.airportEyebrow}
                  </p>
                  <h2 className="font-display text-[clamp(1.45rem,2.8vw,2.1rem)] leading-[1.35] font-bold text-sand">
                    {c.airportTitle}
                  </h2>
                  <p className="mt-4 text-[1rem] leading-[1.85] text-sand-dim">
                    {c.airportBody}
                  </p>
                </div>
                <TrackedLink
                  href={whatsappLink(c.airportWhatsapp)}
                  placement="cars-airport-cta"
                  locale={locale}
                  t={t}
                  testId="cars-airport-whatsapp"
                  className={`${buttonClass(
                    "primary",
                    "relative inline-flex shrink-0 items-center gap-2 !rounded-md px-7 py-3.5 text-[0.95rem] shadow-[0_0_36px_-8px_rgba(201,162,75,0.8)] hover:-translate-y-0.5 hover:shadow-[0_0_44px_-6px_rgba(201,162,75,0.95)]",
                  )}`}
                >
                  {c.airportButton}
                </TrackedLink>
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
