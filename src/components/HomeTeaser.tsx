import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import { Accent, Wrap } from "./ui";

type CardIcon = "venues" | "beaches" | "chalets" | "trust" | string;

function CategoryIcon({ kind, large = false }: { kind: CardIcon; large?: boolean }) {
  const common = {
    className: large ? "h-12 w-12" : "h-9 w-9",
    viewBox: "0 0 40 40",
    fill: "none",
    "aria-hidden": true as const,
  };
  const stroke = {
    stroke: "#C9A24B",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (kind === "venues") {
    return (
      <svg {...common}>
        <path d="M14 28c0-6 4-8 6-12 2 4 6 6 6 12" {...stroke} />
        <path d="M14 28h12" {...stroke} />
        <circle cx="20" cy="12" r="3.2" {...stroke} />
        <path d="M12 16c2-1 4-1 8 0s6 1 8 0" {...stroke} strokeWidth={1.2} />
      </svg>
    );
  }

  if (kind === "beaches") {
    return (
      <svg {...common}>
        <path d="M8 24c3 3 6-3 9 0s6-3 9 0 6-3 9 0" {...stroke} />
        <path d="M8 29c3 3 6-3 9 0s6-3 9 0 6-3 9 0" {...stroke} strokeWidth={1.2} />
        <path d="M20 8v10" {...stroke} />
        <path d="M20 10c4 1 7 4 8 8" {...stroke} />
      </svg>
    );
  }

  if (kind === "chalets") {
    return (
      <svg {...common}>
        <path d="M12 18h16v12H12z" {...stroke} />
        <path d="M10 18l10-8 10 8" {...stroke} />
        <circle cx="26" cy="25" r="1.8" fill="#C9A24B" />
        <path d="M16 30v-6h5v6" {...stroke} />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M20 6l10 4v8c0 7-4.5 11.5-10 13-5.5-1.5-10-6-10-13V10l10-4z" {...stroke} />
      <path d="M15 20l3.5 3.5L26 16" {...stroke} />
    </svg>
  );
}

const BENTO_LAYOUT: Record<string, string> = {
  venues: "md:col-span-2 md:row-span-2 min-h-[240px] md:min-h-[380px]",
  beaches: "md:col-span-2 min-h-[160px]",
  chalets: "md:col-span-1 min-h-[160px]",
  trust: "md:col-span-1 min-h-[160px]",
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

            return (
              <Reveal
                key={card.href}
                delay={index * 70}
                className={`h-full ${layout}`}
              >
                <Link
                  href={`/${locale}/${card.href}`}
                  className={`lux-panel group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-gold/20 bg-ink-2/90 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-gold/55 hover:shadow-[0_24px_55px_-28px_rgba(201,162,75,0.28)] ${
                    featured
                      ? "bg-gradient-to-br from-ink-2 via-ink-2 to-gold/[0.07] p-7 sm:p-8 md:p-9"
                      : "p-5 sm:p-6"
                  }`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/[0.07] via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -end-10 -top-10 h-36 w-36 rounded-full bg-gold/10 blur-3xl transition-transform duration-700 group-hover:scale-125"
                  />

                  <div
                    className={`relative inline-flex items-center justify-center rounded-2xl border border-gold/25 bg-ink-3 shadow-[inset_0_1px_0_rgba(228,200,120,0.12)] transition-all duration-500 group-hover:border-gold/50 group-hover:scale-105 ${
                      featured ? "mb-6 h-16 w-16" : "mb-4 h-12 w-12"
                    }`}
                  >
                    <CategoryIcon kind={card.href} large={featured} />
                  </div>

                  <span className="relative mb-2 text-[0.7rem] font-bold tracking-[0.12em] text-gold uppercase">
                    {card.tag}
                  </span>

                  <h3
                    className={`relative font-display font-bold leading-snug text-sand transition-colors duration-300 group-hover:text-gold-soft ${
                      featured
                        ? "mb-4 text-[clamp(1.55rem,2.4vw,2.15rem)]"
                        : "mb-2.5 text-[1.2rem] md:text-[1.25rem]"
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`relative flex-1 leading-[1.75] text-sand-dim ${
                      featured ? "mb-8 max-w-[36ch] text-[1rem]" : "mb-5 text-[0.88rem]"
                    }`}
                  >
                    {card.body}
                  </p>

                  <span
                    className={`relative mt-auto inline-flex items-center justify-center rounded-full border-2 border-gold/50 font-bold text-sand transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-night ${
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
