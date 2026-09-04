import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import { Accent, SectionHeading, Wrap, buttonClass } from "./ui";

export default function HomeTeaser({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section className="py-20">
      <Wrap>
        <Reveal>
          <SectionHeading eyebrow={t.home.teaserEyebrow} lede={t.home.teaserLede}>
            {t.home.teaserTitle} <Accent>{t.home.teaserAccent}</Accent>
          </SectionHeading>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.home.cards.map((card, index) => (
            <Reveal key={card.href} delay={index * 90}>
              <Link
                href={`/${locale}/${card.href}`}
                className="lift group flex h-full flex-col border border-gold/20 bg-gradient-to-br from-ink-2 to-ink px-7 py-8 transition-colors hover:border-gold"
              >
                <span className="mb-3 text-[0.72rem] tracking-[0.08em] text-gold-soft uppercase">
                  {card.tag}
                </span>
                <h3 className="mb-3 font-display text-[1.35rem] font-semibold text-sand group-hover:text-gold-soft">
                  {card.title}
                </h3>
                <p className="mb-6 flex-1 text-[0.92rem] leading-[1.75] text-sand-dim">{card.body}</p>
                <span className={buttonClass("ghost", "w-full justify-center py-3 text-[0.85rem]")}>
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
