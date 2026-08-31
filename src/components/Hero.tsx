import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import { ButtonLink, Eyebrow, Wrap, buttonClass } from "./ui";
import TrackedLink from "./TrackedLink";
import Spotlight from "./Spotlight";

export default function Hero({ t, locale }: { t: Dictionary; locale: Locale }) {
  const { hero } = t;

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

        <div className="bob relative mx-auto w-full max-w-[380px] rounded-[22px] border border-gold/20 bg-gradient-to-b from-ink-3 to-ink-2 p-[18px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
          <div className="absolute -top-px left-1/2 h-[22px] w-[120px] -translate-x-1/2 rounded-b-[14px] bg-ink" />

          <div className="flex items-center gap-2.5 border-b border-gold/20 px-2 pt-3.5 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-display font-bold text-ink">
              {hero.chat.name.charAt(0)}
            </div>
            <div>
              <div className="text-[0.92rem] font-bold text-sand">{hero.chat.name}</div>
              <div className="flex items-center gap-1.5 text-[0.72rem] text-[#7fbf9e]">
                <span className="live-dot" />
                {hero.chat.status.replace(/^●\s*/, "")}
              </div>
            </div>
          </div>

          <div className="flex min-h-[300px] flex-col gap-2.5 px-1.5 pt-4 pb-1.5">
            {hero.chat.messages.map((message, index) => (
              <div
                key={message.text}
                className={`chat-bubble max-w-[82%] rounded-[14px] px-4 py-2.5 text-[0.88rem] leading-[1.6] ${
                  message.side === "out"
                    ? "self-end rounded-br-[3px] bg-teal text-[#dff2ea]"
                    : "self-start rounded-bl-[3px] bg-ink-3 text-sand"
                }`}
                style={{ animationDelay: `${0.3 + index * 0.8}s` }}
              >
                {message.text}
              </div>
            ))}
            <div
              className="chat-bubble max-w-[92%] self-start rounded-[14px] border border-gold/25 bg-gold/15 px-4 py-2.5 text-left font-mono text-[0.74rem] text-gold-soft"
              dir="ltr"
              style={{ animationDelay: `${0.3 + hero.chat.messages.length * 0.8}s` }}
            >
              {hero.chat.confirm.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
