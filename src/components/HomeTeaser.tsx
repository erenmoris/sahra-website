import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import { Accent, Wrap } from "./ui";

type CardIcon = "venues" | "beaches" | "chalets" | "trust" | string;

function CategoryIcon({ kind }: { kind: CardIcon }) {
  const common = {
    className: "h-9 w-9",
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

export default function HomeTeaser({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24" aria-labelledby="home-categories-title">
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
          <div className="mb-12 max-w-[720px] md:mb-14">
            <div className="mb-4 flex items-center gap-3 text-[0.82rem] font-semibold tracking-[0.04em] text-gold">
              <span className="inline-block h-px w-7 bg-gold" />
              {t.home.teaserEyebrow}
            </div>
            <h2
              id="home-categories-title"
              className="font-display text-[clamp(2.1rem,4.2vw,3.35rem)] leading-[1.2] font-bold text-sand"
            >
              {t.home.teaserTitle} <Accent>{t.home.teaserAccent}</Accent>
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.05rem] leading-[1.8] text-sand-dim">
              {t.home.teaserLede}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {t.home.cards.map((card, index) => (
            <Reveal key={card.href} delay={index * 90}>
              <Link
                href={`/${locale}/${card.href}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-ink-2/90 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-gold/60 hover:shadow-[0_10px_40px_rgba(201,162,75,0.18)] sm:p-7 lux-panel"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/[0.06] via-transparent to-transparent opacity-60 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                />

                <div className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/25 bg-ink-3 shadow-[inset_0_1px_0_rgba(228,200,120,0.12)] transition-all duration-300 ease-in-out group-hover:border-gold/50">
                  <CategoryIcon kind={card.href} />
                </div>

                <span className="relative mb-2 text-[0.72rem] font-bold tracking-[0.08em] text-gold">
                  {card.tag}
                </span>
                <h3 className="relative mb-3 font-display text-[1.35rem] leading-snug font-semibold text-sand transition-colors duration-300 ease-in-out group-hover:text-gold-soft">
                  {card.title}
                </h3>
                <p className="relative mb-7 flex-1 text-[0.92rem] leading-[1.75] text-sand-dim">
                  {card.body}
                </p>

                <span className="relative mt-auto inline-flex w-full items-center justify-center rounded-full border-2 border-gold/55 bg-transparent px-5 py-3 text-[0.85rem] font-bold text-sand transition-all duration-300 ease-in-out group-hover:border-gold group-hover:bg-gold group-hover:text-night">
                  {card.cta}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
