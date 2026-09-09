import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import {
  carAbout,
  carAmenities,
  carCategory,
  carEntertainment,
  carLede,
  carLuggage,
  carName,
  carPrivacy,
  type VipCar,
} from "@/content/cars";
import Reveal from "@/components/Reveal";
import TrackedLink from "@/components/TrackedLink";
import { Wrap } from "@/components/ui";

function CapacityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 11a3 3 0 1 0-2.83-4M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4.5 19c.5-2.2 2.4-3.5 4.5-3.5h1.2M19.5 19c-.4-2-1.9-3.3-3.8-3.5"
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
      <path
        d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PrivacyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 5 6.5v5.2c0 4.2 2.9 7.9 7 8.8 4.1-.9 7-4.6 7-8.8V6.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.5 12.2 11.2 14l3.4-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EntertainmentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 19h8M12 17v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

export default function CarDetailContent({
  car,
  t,
  locale,
}: {
  car: VipCar;
  t: Dictionary;
  locale: Locale;
}) {
  const c = t.cars;
  const name = carName(car, locale);
  const category = carCategory(car, locale);
  const luggage = carLuggage(car, locale);
  const privacy = carPrivacy(car, locale);
  const entertainment = carEntertainment(car, locale);
  const about = carAbout(car, locale);
  const lede = carLede(car, locale);
  const amenities = carAmenities(car, locale);
  const wa = whatsappLink(`${c.whatsappPrefix} ${name} (${category})`);

  const specs = [
    {
      id: "capacity",
      label: c.specCapacity,
      value:
        locale === "ar"
          ? `${car.passengers} ركاب`
          : `${car.passengers} Passengers`,
      icon: CapacityIcon,
    },
    {
      id: "luggage",
      label: c.specLuggage,
      value: luggage,
      icon: LuggageIcon,
    },
    {
      id: "privacy",
      label: c.specPrivacy,
      value: privacy,
      icon: PrivacyIcon,
    },
    {
      id: "entertainment",
      label: c.specEntertainment,
      value: entertainment,
      icon: EntertainmentIcon,
    },
  ];

  return (
    <>
      <section
        data-testid="car-detail-hero"
        className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-ink"
      >
        <Image
          src={car.heroImage}
          alt={name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div
          aria-hidden
          className="theme-scrim absolute inset-0 bg-gradient-to-t from-night via-night/55 to-transparent/20"
        />

        <div className="absolute inset-0 flex flex-col justify-end">
          <Wrap className="relative z-10 pb-10 text-start md:pb-14">
            <Link
              href={`/${locale}/cars`}
              className="theme-scrim-muted mb-6 inline-flex text-[0.82rem] font-semibold tracking-[0.08em] text-gold/85 transition-colors hover:text-gold"
            >
              {c.backToFleet}
            </Link>
            <p className="theme-scrim-muted mb-3 text-sm font-bold tracking-widest text-gold uppercase drop-shadow-lg">
              {category}
            </p>
            <h1 className="theme-scrim-text max-w-[16ch] font-display text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.15] font-bold text-on-dark drop-shadow-lg">
              {name}
            </h1>
            <p className="theme-scrim-muted mt-4 max-w-[36rem] text-[1.05rem] leading-[1.85] text-on-dark-muted drop-shadow-lg md:text-[1.12rem]">
              {lede}
            </p>
          </Wrap>
        </div>
      </section>

      <section
        data-testid="car-detail-specs"
        className="relative bg-ink py-14 md:py-20"
        aria-labelledby="car-specs-title"
      >
        <Wrap>
          <Reveal>
            <div className="mb-8 max-w-[36rem] text-start md:mb-10">
              <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.18em] text-gold uppercase">
                {c.specsEyebrow}
              </p>
              <h2
                id="car-specs-title"
                className="font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.25] font-bold text-sand"
              >
                {c.specsTitle}
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {specs.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <Reveal key={spec.id} delay={index * 60}>
                  <div
                    data-testid={`car-spec-${spec.id}`}
                    className="lux-panel flex h-full flex-col items-start rounded-2xl border border-gold/20 bg-ink-2/90 p-6 text-start backdrop-blur-xl sm:p-7"
                  >
                    <Icon className="mb-4 h-5 w-5 text-gold" />
                    <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-gold/85 uppercase">
                      {spec.label}
                    </p>
                    <p className="mt-2 text-[1.02rem] leading-[1.55] font-semibold text-sand">
                      {spec.value}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Wrap>
      </section>

      <section
        data-testid="car-detail-amenities"
        className="relative bg-ink pb-14 md:pb-16"
        aria-labelledby="car-amenities-title"
      >
        <Wrap>
          <Reveal>
            <div className="mb-8 max-w-[36rem] text-start md:mb-10">
              <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.18em] text-gold uppercase">
                {c.amenitiesEyebrow}
              </p>
              <h2
                id="car-amenities-title"
                className="font-display text-[clamp(1.55rem,3vw,2.2rem)] leading-[1.25] font-bold text-sand"
              >
                {c.amenitiesTitle}
              </h2>
            </div>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((item, index) => (
              <Reveal key={`${car.slug}-amenity-${index}`} delay={(index % 6) * 40}>
                <li className="lux-panel flex items-start gap-3 rounded-xl border border-gold/20 bg-ink-2/80 px-4 py-3.5 text-start backdrop-blur-md">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(201,162,75,0.7)]"
                  />
                  <span className="text-[0.95rem] leading-[1.7] text-sand-dim">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Wrap>
      </section>

      <section
        data-testid="car-detail-chauffeur"
        className="relative bg-ink pb-14 md:pb-20"
        aria-labelledby="car-chauffeur-title"
      >
        <Wrap>
          <Reveal>
            <div className="lux-panel rounded-2xl border border-gold/25 bg-gradient-to-br from-ink-2 via-ink-2 to-gold/[0.06] p-7 text-start backdrop-blur-xl md:p-10">
              <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.18em] text-gold uppercase">
                {c.chauffeurEyebrow}
              </p>
              <h2
                id="car-chauffeur-title"
                className="font-display text-[clamp(1.55rem,3vw,2.2rem)] leading-[1.3] font-bold text-sand"
              >
                {c.chauffeurTitle}
              </h2>
              <p className="mt-5 max-w-[44rem] text-[1.05rem] leading-[1.9] text-sand-dim">
                {c.chauffeurBody}
              </p>
              <p className="mt-5 max-w-[44rem] text-[0.98rem] leading-[1.85] text-sand-dim">
                {about}
              </p>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {car.gallery.length > 1 ? (
        <section
          data-testid="car-detail-gallery"
          className="relative bg-ink pb-28 md:pb-32"
        >
          <Wrap>
            <Reveal>
              <p className="mb-6 text-start text-[0.75rem] font-semibold tracking-[0.18em] text-gold uppercase">
                {c.galleryEyebrow}
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {car.gallery.slice(1).map((src, i) => (
                <Reveal key={src} delay={(i % 3) * 50}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/20 bg-ink-2">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>
      ) : (
        <div className="bg-ink pb-28 md:pb-32" aria-hidden />
      )}

      {/* Sticky booking bar — stays dark chrome in both themes */}
      <div
        data-testid="car-booking-bar"
        className="lux-dark-chrome fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0B101E]/90 backdrop-blur-xl"
      >
        <Wrap className="flex items-center justify-between gap-4 py-3.5 md:py-4">
          <div className="min-w-0 text-start">
            <p className="text-[0.72rem] font-semibold tracking-[0.12em] text-gold/80 uppercase">
              {c.priceLabel}
            </p>
            <p className="mt-0.5 truncate text-[0.95rem] font-semibold text-on-dark md:text-[1.02rem]">
              {c.priceUponRequest}
            </p>
          </div>
          <TrackedLink
            href={wa}
            placement={`car-detail-book-${car.slug}`}
            locale={locale}
            t={t}
            testId="car-detail-book"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 text-[0.9rem] font-bold text-night shadow-[0_0_32px_-8px_rgba(201,162,75,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4ae55] hover:shadow-[0_0_40px_-6px_rgba(201,162,75,0.95)] sm:px-7 sm:text-[0.95rem]"
          >
            <CtaArrow className="h-3.5 w-3.5 shrink-0 ltr:rotate-180" />
            <span>{c.bookThisCar}</span>
          </TrackedLink>
        </Wrap>
      </div>
    </>
  );
}
