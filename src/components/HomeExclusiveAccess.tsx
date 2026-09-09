import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import TrackedLink from "./TrackedLink";
import { Wrap, buttonClass } from "./ui";

/** Minimal arrow — points left for RTL; flips in LTR. */
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

export default function HomeExclusiveAccess({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
}) {
  const x = t.home.exclusive;

  return (
    <section
      id="exclusive-access"
      data-testid="home-exclusive-access"
      className="relative overflow-hidden bg-[#0B101E] py-14 sm:py-20"
      aria-labelledby="home-exclusive-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
      />

      <Wrap>
        <Reveal>
          <div className="mb-10 max-w-[40rem] text-start md:mb-14">
            <p className="mb-4 text-[0.72rem] font-semibold tracking-[0.22em] text-gold uppercase">
              {x.eyebrow}
            </p>
            <h2
              id="home-exclusive-title"
              className="font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.22] font-bold text-gold"
            >
              {x.title}
            </h2>
            <p className="mt-5 max-w-[36rem] text-[1.02rem] leading-[1.9] text-[#D8D0C2] md:text-[1.08rem]">
              {x.lede}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5 xl:gap-6">
          {x.venues.map((venue, index) => {
            const isLemonTree = venue.id === "lemon-tree";

            return (
              <Reveal key={venue.id} delay={index * 80} className="h-full">
                <Link
                  href={`/${locale}/venues/${venue.slug}`}
                  data-testid={`exclusive-card-${venue.id}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-[1.15rem] border border-gold/20 bg-[#0B101E] shadow-[0_28px_60px_-40px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-gold/45 hover:shadow-[0_32px_70px_-36px_rgba(201,162,75,0.28)]"
                >
                  <Image
                    src={venue.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 h-full bg-gradient-to-t from-[#0B101E] via-[#0B101E]/90 to-transparent/20"
                  />

                  <div className="absolute inset-0 flex flex-col items-start p-6 text-start sm:p-8">
                    <span className="inline-flex w-fit border border-gold/40 bg-[#0B101E]/45 px-2.5 py-1 text-start text-[0.65rem] font-semibold tracking-[0.18em] text-gold uppercase drop-shadow-lg backdrop-blur-md">
                      {x.badge}
                    </span>

                    <div className="mt-auto flex w-full flex-col items-start text-start">
                      <h3
                        className={`w-full text-start font-display leading-[1.25] font-bold whitespace-nowrap text-white drop-shadow-lg transition-colors duration-500 group-hover:text-gold-soft ${
                          isLemonTree ? "text-xl" : "text-xl sm:text-2xl"
                        }`}
                      >
                        {isLemonTree ? (
                          <span dir="ltr">The Lemon Tree &amp; Co.</span>
                        ) : (
                          venue.name
                        )}
                      </h3>
                      <p className="mt-3.5 max-w-[28ch] text-start text-[0.9rem] leading-[1.85] text-[#C9BFB0] drop-shadow-lg sm:text-[0.95rem]">
                        {venue.body}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={140}>
          <div className="mt-11 flex justify-center md:mt-14">
            <TrackedLink
              href={whatsappLink(x.whatsappMessage)}
              placement="home-exclusive-cta"
              locale={locale}
              t={t}
              testId="home-exclusive-whatsapp"
              className={`${buttonClass(
                "primary",
                "relative inline-flex min-h-14 items-center gap-2.5 !rounded-md px-9 py-4 text-[1rem] tracking-[0.02em] shadow-[0_0_40px_-8px_rgba(201,162,75,0.8)] hover:shadow-[0_0_52px_-6px_rgba(201,162,75,0.95)] sm:min-h-16 sm:px-12 sm:text-[1.08rem]",
              )}`}
            >
              <CtaArrow className="h-4 w-4 shrink-0 ltr:rotate-180" />
              <span>{x.cta}</span>
            </TrackedLink>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
