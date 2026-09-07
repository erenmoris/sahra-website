import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary, whatsappLink } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";
import PrivacyAccordion from "@/components/PrivacyAccordion";
import ConfidentialitySeal from "@/components/ConfidentialitySeal";
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
      <main className="pb-28" data-testid="privacy-page">
        <section
          data-testid="privacy-header"
          className="relative overflow-hidden border-b border-gold/15 bg-[#0b101e] pt-16 pb-16 md:pt-20 md:pb-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.12),transparent_55%)]"
          />
          <Wrap className="relative max-w-4xl">
            <p className="mb-4 text-[0.78rem] tracking-[0.18em] text-gold-soft uppercase">
              {t.privacy.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(2.2rem,4.8vw,3.2rem)] leading-[1.2] font-bold text-gold">
              {t.privacy.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-[0.8rem] text-gold-soft">
                {t.privacy.updated}
              </span>
              <span className="text-[0.85rem] text-sand-dim">{t.privacy.controller}</span>
            </div>
            <p className="mt-7 max-w-4xl text-[1.08rem] leading-[1.95] text-sand-dim">
              {t.privacy.intro}
            </p>
          </Wrap>
        </section>

        <Wrap className="max-w-6xl pt-12 md:pt-16">
          <PrivacyAccordion sections={sections} tocTitle={t.privacy.tocTitle} />

          <div className="mt-14 md:mt-16">
            <ConfidentialitySeal title={t.privacy.sealTitle} body={t.privacy.sealBody} />
          </div>

          <div
            data-testid="privacy-contact"
            className="lux-panel mt-12 rounded-[1.35rem] border border-gold/25 bg-ink-2/80 p-7 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.4)] backdrop-blur-md md:p-9"
          >
            <h2 className="font-display text-[1.3rem] font-semibold text-sand">
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
                testId="privacy-whatsapp-btn"
                className={buttonClass("whatsapp")}
              >
                {t.privacy.contactCta}
              </TrackedLink>
              <Link
                href={`/${locale}`}
                data-testid="privacy-back-home"
                className={buttonClass("ghost")}
              >
                {t.privacy.backHome}
              </Link>
            </div>
          </div>
        </Wrap>
      </main>
      <Footer locale={locale} t={t} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
