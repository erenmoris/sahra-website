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
    title: t.terms.metaTitle,
    description: t.terms.metaDescription,
    path: "/terms",
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} t={t} />
      <main className="pb-28" data-testid="terms-page">
        <section
          data-testid="terms-header"
          className="relative overflow-hidden border-b border-gold/15 bg-[#0b101e] pt-16 pb-14 md:pt-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.1),transparent_55%)]"
          />
          <Wrap className="relative max-w-4xl">
            <p className="mb-4 text-[0.78rem] tracking-[0.18em] text-gold-soft uppercase">
              {t.terms.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(2.1rem,4.5vw,3rem)] leading-[1.2] font-bold text-gold">
              {t.terms.title}
            </h1>
            <p className="mt-4 text-[0.85rem] text-sand-dim">{t.terms.updated}</p>
            <p className="mt-7 max-w-4xl text-[1.05rem] leading-[1.95] text-sand-dim">
              {t.terms.intro}
            </p>
          </Wrap>
        </section>

        <Wrap className="max-w-4xl space-y-4 pt-12 md:pt-14">
          {t.terms.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              data-testid={`terms-section-${section.id}`}
              className="lux-panel rounded-[1.15rem] border border-gold/20 bg-ink-2/85 px-6 py-7 shadow-[0_18px_48px_-36px_rgba(0,0,0,0.4)] backdrop-blur-md md:px-8"
            >
              <div className="mb-3 flex items-baseline gap-3">
                <span className="font-mono text-[0.75rem] text-gold/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-[1.25rem] font-semibold text-sand">
                  {section.title}
                </h2>
              </div>
              <p className="max-w-4xl text-[1.02rem] leading-[1.95] text-sand-dim">{section.body}</p>
            </section>
          ))}

          <div className="flex flex-wrap gap-3 pt-6">
            <TrackedLink
              href={whatsappLink(t.terms.whatsappMessage)}
              placement="terms-contact"
              locale={locale}
              t={t}
              testId="terms-whatsapp-btn"
              className={buttonClass("whatsapp")}
            >
              {t.terms.contactCta}
            </TrackedLink>
            <Link href={`/${locale}`} className={buttonClass("ghost")} data-testid="terms-back-home">
              {t.terms.backHome}
            </Link>
          </div>
        </Wrap>
      </main>
      <Footer locale={locale} t={t} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
