import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import { ButtonLink, Wrap, buttonClass } from "./ui";
import TrackedLink from "./TrackedLink";
import PromoVideo from "./PromoVideo";
import { WhatsAppIcon } from "./Icons";

const TRUST_ICONS = ["shield", "clock", "globe", "calendar"] as const;

function TrustSvg({ name }: { name: (typeof TRUST_ICONS)[number] }) {
  const common = {
    className: "h-6 w-6",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3l8 3v6c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    );
  }
  if (name === "globe") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4c2.5 2.5 2.5 13 0 16M12 4c-2.5 2.5-2.5 13 0 16" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

const MESSAGE_TIMES = ["10:41", "10:42", "10:42", "10:43"];

export default function Hero({
  t,
  locale,
  videoSrc,
  videoPoster,
}: {
  t: Dictionary;
  locale: Locale;
  videoSrc?: string;
  videoPoster?: string;
}) {
  const { hero } = t;
  const showVideo = Boolean(videoSrc);
  const trustItems = hero.trust.slice(0, 3);

  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-24">
      {/* Ambient luxury washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -start-[10%] top-[-8%] h-[420px] w-[420px] rounded-full bg-gold/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-[8%] top-[20%] h-[380px] w-[380px] rounded-full bg-ruby/25 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.12),transparent_55%)]"
      />

      <Wrap className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Pitch column — first in DOM for RTL start (right in Arabic) */}
        <div className="order-1">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-[0.78rem] font-bold tracking-[0.04em] text-gold">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold shadow-[0_0_12px_rgba(201,162,75,0.9)]" />
            {hero.eyebrow}
          </p>

          <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.1rem)] leading-[1.15] font-bold text-sand">
            {hero.titleTop}{" "}
            <span className="bg-gradient-to-l from-gold via-[#e4c878] to-gold bg-clip-text text-transparent">
              {hero.titleAccent}
            </span>
            <br />
            {hero.titleBottom}
          </h1>

          <p className="mt-6 max-w-[46ch] text-[1.08rem] leading-[1.85] text-sand-dim">{hero.lede}</p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <TrackedLink
              href={whatsappLink(t.whatsappMessage)}
              placement="hero-cta"
              locale={locale}
              t={t}
              className={buttonClass("primary", "min-w-[200px]")}
            >
              <WhatsAppIcon className="h-5 w-5" />
              {hero.ctaPrimary}
            </TrackedLink>
            <ButtonLink href="#reserve" variant="ghost" className="min-w-[160px]">
              {hero.ctaSecondary}
            </ButtonLink>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-3">
            {trustItems.map((item, index) => (
              <li
                key={item.value}
                className="rounded-2xl border border-gold/25 bg-ink-2/80 p-4 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.55)] backdrop-blur-md"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-3 text-gold">
                  <TrustSvg name={TRUST_ICONS[index] ?? "shield"} />
                </span>
                <p className="text-[0.92rem] font-bold text-sand">{item.value}</p>
                <p className="mt-1 text-[0.78rem] leading-snug text-sand-dim">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat / media column */}
        <div className="order-2 mx-auto w-full max-w-[420px] lg:mx-0 lg:justify-self-end">
          {showVideo ? (
            <PromoVideo
              src={videoSrc!}
              poster={videoPoster}
              locale={locale}
              t={t}
              compact
            />
          ) : (
            <article
              className="relative overflow-hidden rounded-[28px] border border-gold/30 bg-ink-2/90 p-4 shadow-[0_40px_80px_-28px_rgba(0,0,0,0.75)] backdrop-blur-2xl sm:p-5"
              aria-label={locale === "ar" ? "معاينة محادثة الحجز" : "Booking chat preview"}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-black/30"
              />

              <div className="relative mb-3 flex items-center justify-between px-1">
                <span className="text-[0.7rem] font-semibold text-sand">10:41</span>
                <span className="mx-auto h-1.5 w-20 rounded-full bg-gold/25" />
                <span className="text-[0.7rem] text-sand-dim">5G</span>
              </div>

              <header className="relative flex items-center gap-3 rounded-2xl border border-gold/20 bg-ink/50 px-3 py-3 backdrop-blur-md">
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold font-display text-lg font-bold text-night shadow-[0_0_20px_rgba(201,162,75,0.45)]">
                    {hero.chat.name.charAt(0)}
                  </div>
                  <span className="absolute end-0 bottom-0 h-3 w-3 rounded-full border-2 border-ink-2 bg-[#7fbf9e]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-[0.95rem] font-bold text-sand">{hero.chat.name}</h2>
                  <p className="text-[0.72rem] text-[#7fbf9e]">
                    {hero.chat.status.replace(/^●\s*/, "")}
                  </p>
                </div>
              </header>

              <div className="relative mt-4 flex min-h-[320px] flex-col gap-3 px-0.5 pb-2">
                {hero.chat.messages.map((message, index) => {
                  const outgoing = message.side === "out";
                  return (
                    <div
                      key={`${message.text}-${index}`}
                      className={`chat-bubble flex max-w-[88%] flex-col gap-1 ${
                        outgoing ? "self-end items-end" : "self-start items-start"
                      }`}
                      style={{ animationDelay: `${0.25 + index * 0.55}s` }}
                    >
                      <div
                        className={`rounded-[18px] px-3.5 py-2.5 text-[0.88rem] leading-[1.55] shadow-sm ${
                          outgoing
                            ? "rounded-se-md bg-ink-3 text-sand"
                            : "rounded-ss-md bg-sand text-night"
                        }`}
                      >
                        {message.text}
                      </div>
                      <time className="px-1 text-[0.65rem] text-sand-dim">
                        {MESSAGE_TIMES[index] ?? "10:41"}
                      </time>
                    </div>
                  );
                })}

                <div
                  className="chat-bubble flex items-center gap-1 self-start rounded-[18px] rounded-ss-md bg-sand px-3.5 py-3"
                  style={{ animationDelay: `${0.25 + hero.chat.messages.length * 0.55}s` }}
                  aria-hidden
                >
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>

                <div
                  className="chat-bubble mt-1 w-full overflow-hidden rounded-2xl border border-gold/45 bg-gradient-to-br from-ink-3 to-ink shadow-[0_12px_28px_-12px_rgba(201,162,75,0.35)]"
                  style={{ animationDelay: `${0.45 + hero.chat.messages.length * 0.55}s` }}
                  dir="ltr"
                >
                  <div className="flex items-center justify-between border-b border-dashed border-gold/35 bg-gold/15 px-4 py-2.5">
                    <span className="text-[0.68rem] font-bold tracking-[0.14em] text-gold uppercase">
                      Confirmed
                    </span>
                    <span className="rounded-full bg-gold px-2.5 py-0.5 text-[0.68rem] font-bold text-night">
                      VIP
                    </span>
                  </div>
                  <div className="space-y-1 px-4 py-3 font-mono text-[0.74rem] leading-relaxed text-sand">
                    {hero.chat.confirm.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </Wrap>
    </section>
  );
}
