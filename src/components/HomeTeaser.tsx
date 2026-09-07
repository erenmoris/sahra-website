import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import { Accent, Wrap } from "./ui";

const BENTO_LAYOUT: Record<string, string> = {
  venues: "md:col-span-2 md:row-span-2 min-h-[240px] md:min-h-[380px]",
  beaches: "md:col-span-2 min-h-[160px]",
  chalets: "md:col-span-1 min-h-[160px]",
  trust: "md:col-span-1 min-h-[160px]",
};

const BENTO_IMAGE: Record<string, { src: string; sizes: string }> = {
  venues: { src: "/home/bento-venues.png", sizes: "(max-width: 768px) 100vw, 50vw" },
  beaches: { src: "/home/bento-beaches.png", sizes: "(max-width: 768px) 100vw, 50vw" },
  chalets: { src: "/home/bento-chalets.png", sizes: "(max-width: 768px) 100vw, 25vw" },
  trust: { src: "/home/bento-trust.png", sizes: "(max-width: 768px) 100vw, 25vw" },
};

export default function HomeTeaser({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section className="relative overflow-hidden py-10 sm:py-12" aria-labelledby="home-categories-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-24 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-[100px]"
      />

      <Wrap>
        <Reveal>
          <div className="mb-7 max-w-[720px] md:mb-8">
            <div className="mb-3 flex items-center gap-3 text-[0.82rem] font-semibold tracking-[0.04em] text-gold">
              <span className="inline-block h-px w-7 bg-gold" />
              {t.home.teaserEyebrow}
            </div>
            <h2
              id="home-categories-title"
              className="font-display text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.2] font-bold text-sand"
            >
              {t.home.teaserTitle} <Accent>{t.home.teaserAccent}</Accent>
            </h2>
            <p className="mt-3 max-w-[52ch] text-[1rem] leading-[1.75] text-sand-dim">
              {t.home.teaserLede}
            </p>
          </div>
        </Reveal>

        <div className="grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-3">
          {t.home.cards.map((card, index) => {
            const featured = card.href === "venues";
            const layout = BENTO_LAYOUT[card.href] ?? "md:col-span-1 min-h-[180px]";
            const image = BENTO_IMAGE[card.href];

            return (
              <Reveal
                key={card.href}
                delay={index * 70}
                className={`h-full ${layout}`}
              >
                <Link
                  href={`/${locale}/${card.href}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-gold/20 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-gold/55 hover:shadow-[0_24px_55px_-28px_rgba(201,162,75,0.28)] ${
                    featured ? "p-7 sm:p-8 md:p-9" : "p-5 sm:p-6"
                  }`}
                >
                  {image ? (
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes={image.sizes}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      priority={featured}
                    />
                  ) : null}

                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-gold/[0.12] via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span className="relative mb-2 text-[0.7rem] font-bold tracking-[0.12em] text-gold uppercase">
                    {card.tag}
                  </span>

                  <h3
                    className={`relative font-display font-bold leading-snug text-on-dark transition-colors duration-300 group-hover:text-gold-soft ${
                      featured
                        ? "mb-4 text-[clamp(1.55rem,2.4vw,2.15rem)]"
                        : "mb-2.5 text-[1.2rem] md:text-[1.25rem]"
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`relative flex-1 leading-[1.75] text-on-dark/75 ${
                      featured ? "mb-8 max-w-[36ch] text-[1rem]" : "mb-5 text-[0.88rem]"
                    }`}
                  >
                    {card.body}
                  </p>

                  <span
                    className={`relative mt-auto inline-flex items-center justify-center rounded-full border-2 border-gold/55 bg-ink/40 font-bold text-on-dark backdrop-blur-sm transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-night ${
                      featured
                        ? "w-full max-w-[240px] px-6 py-3.5 text-[0.9rem]"
                        : "w-full px-4 py-2.5 text-[0.8rem]"
                    }`}
                  >
                    {card.cta}
                    <span
                      aria-hidden
                      className="ms-2 inline-block transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
