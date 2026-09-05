import type { Locale } from "@/i18n/config";
import { whatsappLink, type Dictionary } from "@/i18n/dictionaries";
import TrackedLink from "./TrackedLink";

/** Hype strip under the hero — the whole band is a tap target to WhatsApp. */
export default function PromoTicker({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <TrackedLink
      href={whatsappLink(t.whatsappMessage)}
      placement="promo-ticker"
      locale={locale}
      t={t}
      ariaLabel={t.hero.ctaPrimary}
      // The track is laid out left-to-right in both locales; RTL would push it
      // out of the visible band.
      dir="ltr"
      className="marquee relative block overflow-hidden border-y border-gold/25 bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 py-3.5"
    >
      <div className="marquee-track" style={{ animationDuration: "30s" }}>
        {/* Rendered twice so the loop at -50% is seamless. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {t.ticker.map((item) => (
              <span
                key={item}
                className="flex items-center gap-5 px-5 font-display text-[1.05rem] whitespace-nowrap text-gold-soft"
              >
                {item}
                <span className="spin-slow text-[0.75rem] text-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 start-0 w-20 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-20 bg-gradient-to-l from-ink to-transparent" />
    </TrackedLink>
  );
}
