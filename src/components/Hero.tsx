import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import { buildNavLinks } from "./Header";
import Logo from "./Logo";
import { ButtonLink, Eyebrow, Wrap, buttonClass } from "./ui";
import TrackedLink from "./TrackedLink";
import Spotlight from "./Spotlight";

export default function Hero({
  t,
  locale,
  logoSrc,
}: {
  t: Dictionary;
  locale: Locale;
  logoSrc?: string;
}) {
  const { hero } = t;
  const links = buildNavLinks(locale, t);

  return (
    <section className="relative overflow-hidden pt-[168px] pb-24">
      <div className="lattice pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-50" />

      <div
        aria-hidden="true"
        className="orb start-[-8%] top-[-12%] h-[420px] w-[420px] bg-gold/25"
      />
      <div
        aria-hidden="true"
        className="orb end-[-6%] top-[18%] h-[360px] w-[360px] bg-ruby/35"
        style={{ animationDelay: "-6s", animationDuration: "24s" }}
      />
      <div
        aria-hidden="true"
        className="orb start-[35%] bottom-[-18%] h-[320px] w-[320px] bg-teal/60"
        style={{ animationDelay: "-12s", animationDuration: "30s" }}
      />

      <Spotlight />

      <svg
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <g fill="none" stroke="#C9A24B" strokeWidth={1.1} opacity={0.28}>
          <path d="M0 460 L60 460 L60 380 L100 380 L100 420 L150 420 L150 340 L190 340 L190 460 L240 460 L240 300 L260 300 L260 460 L320 460 L320 400 L360 400 L360 460" />
          <g transform="translate(880,180)">
            <path d="M0 0 L160 0 L80 100 L80 220" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M30 250 L130 250" strokeLinecap="round" />
            <path d="M80 220 L80 250" strokeLinecap="round" />
            <circle cx="118" cy="24" r="6" />
            <path d="M100 18 L112 42 M136 18 L124 42" strokeWidth={0.9} />
          </g>
          <circle cx="200" cy="70" r="34" opacity={0.5} />
        </g>
      </svg>

      <Wrap className="relative z-10 grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="font-display text-[clamp(2.4rem,5vw,3.9rem)] leading-[1.22] font-semibold text-sand">
            {hero.titleTop} <span className="shimmer font-medium">{hero.titleAccent}</span>
            <br />
            {hero.titleBottom}
          </h1>
          <p className="mt-6 max-w-[48ch] text-[1.12rem] leading-[1.85] text-sand-dim">{hero.lede}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <TrackedLink
              href={whatsappLink(t.whatsappMessage)}
              placement="hero-cta"
              locale={locale}
              className={buttonClass("primary", "shine")}
            >
              {hero.ctaPrimary}
            </TrackedLink>
            <ButtonLink href="#reserve" variant="ghost">
              {hero.ctaSecondary}
            </ButtonLink>
          </div>

          <dl className="mt-11 flex flex-wrap gap-x-8 gap-y-4 text-[0.82rem] text-sand-dim">
            {hero.trust.map((item) => (
              <div key={item.value} className="flex items-baseline gap-2">
                <dt className="font-display text-[1.05rem] font-semibold text-gold-soft">
                  {item.value}
                </dt>
                <dd>{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="bob relative mx-auto w-full max-w-[400px] rounded-[22px] border border-gold/20 bg-gradient-to-b from-ink-3 to-ink-2 p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
          <p className="mb-6 text-center text-[0.72rem] tracking-[0.12em] text-gold-soft uppercase">
            {locale === "ar" ? "القائمة الرئيسية" : "Main navigation"}
          </p>

          <div className="mb-8 flex justify-center">
            <Logo locale={locale} src={logoSrc} size="lg" linked={false} />
          </div>

          <nav
            className="flex flex-col gap-2"
            aria-label={locale === "ar" ? "روابط الأقسام" : "Section links"}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm border border-gold/15 bg-ink/60 px-4 py-3.5 text-center text-[0.95rem] text-sand transition-colors hover:border-gold/40 hover:text-gold-soft"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}#reserve`}
              className={`${buttonClass("ghost", "mt-2 w-full justify-center py-3.5 text-[0.95rem]")}`}
            >
              {t.nav.reserve}
            </Link>
          </nav>
        </div>
      </Wrap>
    </section>
  );
}
