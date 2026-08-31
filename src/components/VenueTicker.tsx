import type { Locale } from "@/i18n/config";
import { venues } from "@/content/venues";

type Props = {
  locale: Locale;
  /** Two rows scroll in opposite directions; one row is the compact variant. */
  rows?: 1 | 2;
};

function Row({ names, reverse, speed }: { names: string[]; reverse?: boolean; speed: number }) {
  return (
    <div className="marquee relative overflow-hidden py-3">
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Rendered twice so the loop at -50% is seamless. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {names.map((name) => (
              <span
                key={name}
                className="group flex items-center gap-6 px-6 font-display text-[1.15rem] whitespace-nowrap text-sand-dim transition-colors hover:text-gold-soft"
              >
                {name}
                <span className="spin-slow text-[0.8rem] text-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VenueTicker({ locale, rows = 1 }: Props) {
  const primary = venues.map((venue) => (locale === "ar" ? venue.nameAr : venue.name));
  const secondary = venues.map((venue) => (locale === "ar" ? venue.name : venue.nameAr));

  return (
    <div
      className="relative overflow-hidden border-y border-gold/15 bg-ink-2/40"
      dir="ltr"
      aria-hidden="true"
    >
      <Row names={primary} speed={42} />
      {rows === 2 ? <Row names={secondary} speed={34} reverse /> : null}

      <div className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
