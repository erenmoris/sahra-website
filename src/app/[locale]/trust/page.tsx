import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import { Coverage, Testimonials, Trust } from "@/components/Sections";
import ScrollProgress from "@/components/ScrollProgress";
import { Divider, Wrap } from "@/components/ui";

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
  const t = await getSiteDictionary(locale);
  return {
    title: t.trust.metaTitle,
    description: t.trust.metaDescription,
  };
}

export default async function TrustPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [t, config] = await Promise.all([getSiteDictionary(locale), getSiteConfig()]);
  const { sections, logoUrl } = config;

  return (
    <>
      <ScrollProgress />
      <Header locale={locale} t={t} logoSrc={logoUrl} />
      <main className="pt-[88px]">
        {sections.trust ? <Trust t={t} /> : null}

        {sections.trust && sections.testimonials ? (
          <Wrap>
            <Divider />
          </Wrap>
        ) : null}

        {sections.testimonials ? <Testimonials t={t} locale={locale} /> : null}

        {sections.testimonials && sections.coverage ? (
          <Wrap>
            <Divider />
          </Wrap>
        ) : null}

        {sections.coverage ? <Coverage t={t} /> : null}
      </main>
      <Footer locale={locale} t={t} logoSrc={logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
