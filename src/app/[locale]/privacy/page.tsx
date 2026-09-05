import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary, whatsappLink } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";
import { Wrap, buttonClass } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return pageMetadata({
    locale,
    title: t.privacy.title,
    description: t.privacy.intro,
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const sections = t.privacy.sections;

  return (
    <>
      <Header locale={locale} t={t} />
      <main className="pb-28">
        {/* Document header */}
        <section className="border-b border-gold/15 bg-gradient-to-b from-ink-2/80 to-ink pt-[120px] pb-14 md:pt-[132px]">
          <Wrap className="max-w-[880px]">
            <p className="mb-4 text-[0.78rem] tracking-[0.18em] text-gold-soft uppercase">
              {t.privacy.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(2.1rem,4.5vw,3rem)] leading-[1.25] font-semibold text-sand">
              {t.privacy.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="border border-gold/30 bg-gold/10 px-3 py-1.5 text-[0.8rem] text-gold-soft">
                {t.privacy.updated}
              </span>
              <span className="text-[0.85rem] text-sand-dim">{t.privacy.controller}</span>
            </div>
            <p className="mt-7 max-w-[62ch] text-[1.08rem] leading-[1.9] text-sand-dim">
              {t.privacy.intro}
            </p>
          </Wrap>
        </section>

        <Wrap className="max-w-[880px] pt-12 md:pt-16">
          <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            {/* TOC */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-4 text-[0.75rem] tracking-[0.14em] text-gold-soft uppercase">
                {t.privacy.tocTitle}
              </p>
              <nav aria-label={t.privacy.tocTitle}>
                <ol className="space-y-2.5 border-s border-gold/20 ps-4">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block text-[0.88rem] leading-[1.55] text-sand-dim transition-colors hover:text-gold-soft"
                      >
                        <span className="me-1.5 font-mono text-[0.72rem] text-gold/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Body */}
            <div>
              <article className="space-y-0">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 border-b border-gold/12 py-9 first:pt-0 last:border-b-0"
                  >
                    <div className="mb-3 flex items-baseline gap-3">
                      <span className="font-mono text-[0.78rem] text-gold/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-[1.35rem] leading-[1.4] font-semibold text-sand">
                        {section.title}
                      </h2>
                    </div>
                    <p className="max-w-[62ch] text-[1.02rem] leading-[1.95] text-sand-dim">
                      {section.body}
                    </p>
                  </section>
                ))}
              </article>

              <div className="mt-12 border border-gold/25 bg-ink-2/50 p-7 md:p-8">
                <h2 className="font-display text-[1.25rem] font-semibold text-sand">
                  {t.privacy.contactTitle}
                </h2>
                <p className="mt-3 max-w-[52ch] text-[0.98rem] leading-[1.85] text-sand-dim">
                  {t.privacy.contactBody}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <TrackedLink
                    href={whatsappLink(t.privacy.whatsappMessage)}
                    placement="privacy-contact"
                    locale={locale}
                    t={t}
                    className={buttonClass("whatsapp")}
                  >
                    {t.privacy.contactCta}
                  </TrackedLink>
                  <Link href={`/${locale}`} className={buttonClass("ghost")}>
                    {t.privacy.backHome}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </main>
      <Footer locale={locale} t={t} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
