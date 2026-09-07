import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import TrackedLink from "./TrackedLink";
import { Wrap, buttonClass } from "./ui";

const VALUE_TESTID: Record<string, string> = {
  access: "value-card-access",
  privacy: "value-card-privacy",
  curation: "value-card-curation",
};

export default function AboutPageContent({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
}) {
  const a = t.about;

  return (
    <>
      <section
        data-testid="about-hero"
        className="relative flex min-h-[min(78vh,760px)] items-center justify-center overflow-hidden bg-[#0b101e]"
      >
        <Image
          src="/about/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="theme-scrim absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/50"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(11,16,30,0.7)_100%)]"
        />

        <Wrap className="relative z-10 py-24 text-center md:py-28">
          <Reveal>
            <h1 className="theme-scrim-text mx-auto max-w-[18ch] font-display text-[clamp(2.1rem,5.5vw,3.75rem)] leading-[1.2] font-bold text-gold">
              {a.heroTitle}
            </h1>
            <p className="theme-scrim-muted mx-auto mt-6 max-w-[40ch] text-[1.05rem] leading-[1.85] text-on-dark-muted md:text-[1.15rem]">
              {a.heroSubtitle}
            </p>
          </Reveal>
        </Wrap>
      </section>

      <section data-testid="about-story" className="relative py-16 md:py-24">
        <Wrap>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <Reveal className="relative order-2 aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-gold/25 lg:order-1">
              <Image
                src="/about/story.png"
                alt={a.storyImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent"
              />
            </Reveal>

            <Reveal delay={80} className="order-1 lg:order-2">
              <div
                data-testid="about-story-panel"
                className="lux-panel rounded-[1.35rem] border border-gold/25 bg-ink-2/80 p-7 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-9"
              >
                <p className="mb-3 text-[0.78rem] font-semibold tracking-[0.14em] text-gold uppercase">
                  {a.storyEyebrow}
                </p>
                <h2 className="font-display text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.25] font-bold text-sand">
                  {a.storyTitle}
                </h2>
                <div className="mt-6 space-y-4">
                  {a.storyBody.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[1.02rem] leading-[1.9] text-sand-dim"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      <section data-testid="about-values" className="relative pb-16 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
        />
        <Wrap>
          <Reveal>
            <div className="mb-10 max-w-[640px]">
              <p className="mb-3 text-[0.78rem] font-semibold tracking-[0.14em] text-gold uppercase">
                {a.valuesEyebrow}
              </p>
              <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.2] font-bold text-sand">
                {a.valuesTitle}
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {a.values.map((value, index) => (
              <Reveal key={value.id} delay={index * 70} className="h-full">
                <article
                  data-testid={VALUE_TESTID[value.id] ?? `value-card-${value.id}`}
                  className="lux-panel group flex h-full flex-col rounded-[1.25rem] border border-gold/20 bg-ink-2/90 p-7 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 md:p-8"
                >
                  <span className="mb-5 font-mono text-[0.75rem] tracking-[0.12em] text-gold/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 font-display text-[1.35rem] font-bold text-sand transition-colors group-hover:text-gold-soft">
                    {value.title}
                  </h3>
                  <p className="flex-1 text-[0.95rem] leading-[1.85] text-sand-dim">
                    {value.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section data-testid="about-cta" className="relative pb-20 md:pb-28">
        <Wrap>
          <Reveal>
            <div className="lux-panel relative overflow-hidden rounded-[1.5rem] border border-gold/30 bg-gradient-to-br from-ink-2 via-ink-2 to-gold/[0.08] px-7 py-12 text-center shadow-[0_28px_70px_-40px_rgba(0,0,0,0.5)] backdrop-blur-md md:px-12 md:py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -start-16 top-0 h-48 w-48 rounded-full bg-gold/15 blur-[80px]"
              />
              <h2 className="relative font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-sand">
                {a.ctaTitle}
              </h2>
              <p className="relative mx-auto mt-4 max-w-[42ch] text-[1.02rem] leading-[1.85] text-sand-dim">
                {a.ctaBody}
              </p>
              <TrackedLink
                href={whatsappLink(a.whatsappMessage)}
                placement="about-cta"
                locale={locale}
                t={t}
                testId="about-whatsapp-btn"
                className={`${buttonClass("primary", "relative mt-8 inline-flex px-8 py-3.5 text-[0.95rem]")}`}
              >
                {a.ctaButton}
              </TrackedLink>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
