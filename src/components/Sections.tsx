import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import VenueTicker from "./VenueTicker";
import TestimonialsSlider from "./TestimonialsSlider";
import { TrustIcon, VenueIcon } from "./Icons";
import { Accent, SectionHeading, Wrap } from "./ui";

export function HowItWorks({ t }: { t: Dictionary }) {
  return (
    <section id="how" className="py-24">
      <Wrap>
        <Reveal>
          <SectionHeading eyebrow={t.how.eyebrow} lede={t.how.lede}>
            {t.how.title} <Accent>{t.how.titleAccent}</Accent>
          </SectionHeading>
        </Reveal>

        <div className="grid gap-px border border-gold/20 bg-gold/20 md:grid-cols-3">
          {t.how.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 90}>
              <div className="group h-full bg-ink px-8 py-10 transition-colors duration-300 hover:bg-ink-2">
                <span className="mb-5 block font-mono text-[0.8rem] text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-gold-soft">
                  {step.num}
                </span>
                <h3 className="mb-3 font-display text-[1.4rem] font-semibold text-sand">
                  {step.title}
                </h3>
                <p className="text-[0.94rem] leading-[1.75] text-sand-dim">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function Trust({ t }: { t: Dictionary }) {
  return (
    <section id="trust" className="relative overflow-hidden py-24 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.07),transparent_55%)]"
        aria-hidden
      />
      <Wrap className="relative">
        <Reveal>
          <SectionHeading eyebrow={t.trust.eyebrow} lede={t.trust.lede}>
            {t.trust.title} <Accent>{t.trust.titleAccent}</Accent>
          </SectionHeading>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {t.trust.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <article className="lux-panel group h-full rounded-[1.25rem] border border-gold/20 bg-ink-2/90 px-7 py-9 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-gold/35 hover:bg-ink-3 hover:shadow-[0_28px_60px_-28px_rgba(201,162,75,0.35)] md:px-8 md:py-10">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 transition-transform duration-500 group-hover:scale-110">
                  <TrustIcon name={item.icon} className="h-8 w-8 text-gold" />
                </div>
                <h3 className="mb-3 font-display text-[1.35rem] font-bold leading-snug text-sand md:text-[1.45rem]">
                  {item.title}
                </h3>
                <p className="text-[0.94rem] leading-[1.8] text-sand-dim">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function Venues({
  t,
  locale,
  venueLogos,
}: {
  t: Dictionary;
  locale: Locale;
  venueLogos: Record<string, string>;
}) {
  return (
    <section id="venues" className="py-24">
      <Wrap>
        <Reveal>
          <SectionHeading eyebrow={t.venues.eyebrow}>
            {t.venues.title} <Accent>{t.venues.titleAccent}</Accent>
          </SectionHeading>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.venues.items.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 90}>
              <article className="lift shine group h-full border border-gold/20 bg-gradient-to-br from-ink-2 to-ink px-7 py-8 hover:border-gold">
                <VenueIcon
                  index={index}
                  className="mb-4 h-9 w-9 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
                <span className="mb-3 block text-[0.72rem] tracking-[0.04em] text-gold-soft">
                  {item.tag}
                </span>
                <h3 className="mb-2.5 font-display text-[1.35rem] font-semibold text-sand">
                  {item.title}
                </h3>
                <p className="text-[0.92rem] leading-[1.7] text-sand-dim">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 border-t border-gold/15 pt-8">
            <h3 className="mb-5 text-[0.95rem] font-semibold text-gold-soft">
              {t.venues.namesTitle}
            </h3>
            <VenueTicker
              locale={locale}
              venueLogos={venueLogos}
              labels={{
                sahel: t.venues.tickerSahel,
                cairo: t.venues.tickerCairo,
              }}
            />
            <p className="mt-5 max-w-[760px] text-[0.82rem] leading-[1.9] text-sand-dim">
              {t.venues.namesNote}
            </p>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}

const SEO_GOLD_PHRASES = [
  "أفضل سهرات",
  "ترابيزات VIP",
  "دخول مباشر",
  "بيتش كلوبز",
  "نايت كلوب",
  "الساحل الشمالي",
  "الواتساب",
  "best nightlife",
  "VIP tables",
  "beach clubs",
  "nightclubs",
  "North Coast",
  "WhatsApp",
  "straight entry",
];

function highlightSeoPhrases(text: string) {
  const pattern = new RegExp(
    `(${SEO_GOLD_PHRASES.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = text.split(pattern);
  return parts.map((part, index) => {
    const isGold = SEO_GOLD_PHRASES.some((p) => p.toLowerCase() === part.toLowerCase());
    if (isGold) {
      return (
        <span key={`${part}-${index}`} className="font-semibold text-gold-soft">
          {part}
        </span>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function FaqIcon() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold-soft">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M9.5 9.5a2.5 2.5 0 1 1 3.7 2.2c-.7.4-1.2.9-1.2 1.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Coverage({ t }: { t: Dictionary }) {
  return (
    <section id="coverage" className="relative overflow-hidden py-24 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.06),transparent_50%)]"
        aria-hidden
      />
      <Wrap className="relative">
        <Reveal>
          <SectionHeading eyebrow={t.seo.eyebrow}>
            {t.seo.title} <Accent>{t.seo.titleAccent}</Accent>
          </SectionHeading>
        </Reveal>

        <Reveal>
          <div className="lux-panel rounded-[1.5rem] border border-gold/20 bg-ink-2/90 p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-9 lg:p-10">
            <div className="grid gap-8 md:grid-cols-3 md:gap-9 lg:gap-10">
              {t.seo.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className="relative text-[0.98rem] leading-[1.95] text-sand-dim first:md:ps-0"
                >
                  <span
                    className="mb-4 block font-mono text-[0.72rem] tracking-[0.18em] text-gold/70"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {highlightSeoPhrases(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-20 md:mt-24">
          <Reveal>
            <h3 className="mb-8 font-display text-[clamp(1.45rem,3vw,1.85rem)] font-bold text-sand md:mb-10">
              {t.seo.faqTitle}
            </h3>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {t.seo.faq.map((item, index) => (
              <Reveal key={item.q} delay={(index % 2) * 80}>
                <article className="lux-panel group h-full rounded-[1.25rem] border border-gold/20 bg-ink-2/90 p-6 shadow-[0_18px_48px_-36px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/30 hover:bg-ink-3 hover:shadow-[0_24px_55px_-28px_rgba(201,162,75,0.28),0_0_40px_-24px_rgba(45,120,140,0.2)] md:p-7">
                  <div className="mb-3.5 flex items-start gap-3">
                    <FaqIcon />
                    <h4 className="pt-1 font-display text-[1.05rem] font-bold leading-snug text-gold-soft md:text-[1.1rem]">
                      {item.q}
                    </h4>
                  </div>
                  <p className="ps-12 text-[0.92rem] leading-[1.85] text-sand-dim">{item.a}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

export function Testimonials({
  t,
  locale = "ar",
  compact = false,
  limit,
}: {
  t: Dictionary;
  locale?: Locale;
  /** Tighter vertical rhythm for embedding on the homepage. */
  compact?: boolean;
  /** Optional max number of chat cards to render. */
  limit?: number;
}) {
  // Prefer HTML chat mockups; fall back to screenshot images.
  const messageItems = t.testimonials.items.filter(
    (item) => item.messages && item.messages.length > 0,
  );
  const imageOnlyItems = t.testimonials.items.filter(
    (item) => item.image && !(item.messages && item.messages.length > 0),
  );
  const items = [...messageItems, ...imageOnlyItems].slice(
    0,
    limit ?? Number.POSITIVE_INFINITY,
  );
  if (items.length === 0) return null;

  return (
    <section
      id="testimonials"
      className={`relative overflow-hidden ${compact ? "py-12 md:py-16" : "py-24 md:py-28"}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.06),transparent_50%),radial-gradient(ellipse_at_top,rgba(201,162,75,0.05),transparent_55%)]"
        aria-hidden
      />
      <Wrap className="relative">
        <Reveal>
          <SectionHeading eyebrow={t.testimonials.eyebrow} lede={t.testimonials.lede}>
            {t.testimonials.title} <Accent>{t.testimonials.titleAccent}</Accent>
            {t.testimonials.titleEnd ? <> {t.testimonials.titleEnd}</> : null}
          </SectionHeading>
        </Reveal>

        <Reveal>
          <TestimonialsSlider items={items} locale={locale} />
        </Reveal>
      </Wrap>
    </section>
  );
}
