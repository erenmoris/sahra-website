import type { Dictionary } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
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
              <div className="h-full bg-ink px-8 py-10">
                <span className="mb-5 block font-mono text-[0.8rem] text-gold">{step.num}</span>
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
              <div className="h-full bg-ink px-8 py-10">
                <TrustIcon name={item.icon} className="mb-4 h-9 w-9" />
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

export function Venues({ t }: { t: Dictionary }) {
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
              <article className="group h-full border border-gold/20 bg-gradient-to-br from-ink-2 to-ink px-7 py-8 transition-all duration-200 hover:-translate-y-1 hover:border-gold">
                <VenueIcon index={index} className="mb-4 h-9 w-9" />
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
      </Wrap>
    </section>
  );
}

export function Testimonials({ t }: { t: Dictionary }) {
  return (
    <section className="py-24">
      <Wrap>
        <Reveal>
          <SectionHeading eyebrow={t.testimonials.eyebrow} lede={t.testimonials.lede}>
            {t.testimonials.title} <Accent>{t.testimonials.titleAccent}</Accent>{" "}
            {t.testimonials.titleEnd}
          </SectionHeading>
        </Reveal>

        <div className="grid gap-7 md:grid-cols-2">
          {t.testimonials.items.map((item, index) => (
            <Reveal key={item.who} delay={(index % 2) * 90}>
              <figure className="flex flex-col items-start">
                <blockquote className="max-w-[92%] rounded-[14px] rounded-bl-[3px] bg-teal px-5 py-4.5 text-[1rem] leading-[1.9] text-[#dff2ea] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]">
                  {item.text}
                </blockquote>
                <figcaption className="mt-2.5 flex items-center gap-1.5 text-[0.8rem] text-sand-dim">
                  <span className="text-[0.85rem] text-[#63c2a3]">✓✓</span> {item.who}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
