import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import VenueTicker from "./VenueTicker";
import WhatsAppScreenshot from "./WhatsAppScreenshot";
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
    <section id="trust" className="py-24">
      <Wrap>
        <Reveal>
          <SectionHeading eyebrow={t.trust.eyebrow} lede={t.trust.lede}>
            {t.trust.title} <Accent>{t.trust.titleAccent}</Accent>
          </SectionHeading>
        </Reveal>

        <div className="grid gap-px border border-gold/20 bg-gold/20 md:grid-cols-3">
          {t.trust.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <div className="group h-full bg-ink px-8 py-10 transition-colors duration-300 hover:bg-ink-2">
                <TrustIcon
                  name={item.icon}
                  className="mb-4 h-9 w-9 transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="mb-3 font-display text-[1.4rem] font-semibold text-sand">
                  {item.title}
                </h3>
                <p className="text-[0.94rem] leading-[1.75] text-sand-dim">{item.body}</p>
              </div>
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
            <p className="mt-5 max-w-[760px] text-[0.82rem] leading-[1.9] text-[#6b6455]">
              {t.venues.namesNote}
            </p>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function Coverage({ t }: { t: Dictionary }) {
  return (
    <section id="coverage" className="py-24">
      <Wrap>
        <Reveal>
          <SectionHeading eyebrow={t.seo.eyebrow}>
            {t.seo.title} <Accent>{t.seo.titleAccent}</Accent>
          </SectionHeading>
        </Reveal>
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {t.seo.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[0.96rem] leading-[1.9] text-sand-dim">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16">
            <h3 className="mb-6 font-display text-[1.5rem] font-semibold text-sand">
              {t.seo.faqTitle}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {t.seo.faq.map((item) => (
                <div key={item.q} className="border border-gold/15 bg-ink-2/40 px-6 py-6">
                  <h4 className="mb-2.5 text-[1.02rem] font-semibold text-gold-soft">{item.q}</h4>
                  <p className="text-[0.92rem] leading-[1.85] text-sand-dim">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function Testimonials({
  t,
  locale = "ar",
}: {
  t: Dictionary;
  locale?: Locale;
}) {
  const items = t.testimonials.items.filter(
    (item) => item.image || (item.messages && item.messages.length > 0),
  );
  if (items.length === 0) return null;

  return (
    <section className="py-24">
      <Wrap>
        <Reveal>
          <SectionHeading eyebrow={t.testimonials.eyebrow} lede={t.testimonials.lede}>
            {t.testimonials.title} <Accent>{t.testimonials.titleAccent}</Accent>{" "}
            {t.testimonials.titleEnd}
          </SectionHeading>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.image ?? item.contact ?? item.who} delay={(index % 4) * 80}>
              <figure className="flex flex-col">
                {item.image ? (
                  <div className="overflow-hidden rounded-[22px] border border-[#25D366]/35 bg-[#0b141a] p-1.5 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.85)]">
                    <div className="relative aspect-9/16 overflow-hidden rounded-[16px] bg-[#111b21]">
                      <Image
                        src={item.image}
                        alt={
                          item.name || item.who
                            ? `واتساب — ${[item.name, item.who].filter(Boolean).join(" · ")}`
                            : "سكرين شات واتساب من عميل"
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top"
                        unoptimized={item.image.startsWith("http")}
                      />
                    </div>
                  </div>
                ) : item.messages ? (
                  <WhatsAppScreenshot
                    chat={{
                      contact: item.contact ?? "عميل",
                      messages: item.messages,
                      clock: item.clock,
                      battery: item.battery,
                      signal: item.signal,
                      lastSeen: item.lastSeen,
                      dayLabel: item.dayLabel,
                    }}
                    caption={item.who}
                    locale={locale}
                  />
                ) : null}
                {item.who ? (
                  <figcaption className="mt-3 flex items-center gap-1.5 text-[0.8rem] text-sand-dim">
                    <span className="text-[0.85rem] text-[#63c2a3]">✓✓</span>
                    {item.name ? <span className="text-sand">{item.name}</span> : null}
                    {item.who}
                  </figcaption>
                ) : null}
              </figure>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
