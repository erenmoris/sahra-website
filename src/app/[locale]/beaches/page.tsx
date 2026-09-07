import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import { getBeachCoverMap } from "@/lib/beach-covers";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import BeachesEntrance from "@/components/beaches/BeachesEntrance";
import BeachDirectory from "@/components/beaches/BeachDirectory";
import ScrollProgress from "@/components/ScrollProgress";
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
  const t = await getSiteDictionary(locale);
  return pageMetadata({
    locale,
    title: t.beaches.metaTitle,
    description: t.beaches.metaDescription,
    path: "/beaches",
  });
}

export default async function BeachesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [t, config, beachCovers] = await Promise.all([
    getSiteDictionary(locale),
    getSiteConfig(),
    getBeachCoverMap(),
  ]);

  const { logoUrl } = config;
  const heroCover =
    beachCovers["sol-beach"] ?? beachCovers["noya-beach"] ?? Object.values(beachCovers)[0];

  return (
    <>
      <ScrollProgress />
      <Header locale={locale} t={t} logoSrc={logoUrl} />
      <main>
        <BeachesEntrance
          locale={locale}
          title={t.beaches.directoryTitle}
          lede={t.beaches.metaDescription}
          coverSrc={heroCover}
        />
        <BeachDirectory locale={locale} t={t} beachCovers={beachCovers} />
      </main>
      <Footer locale={locale} t={t} logoSrc={logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
