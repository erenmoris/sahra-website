import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import { getVenueCoverMap, getVenueLogoMap } from "@/lib/venue-logos";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import VenuesEntrance from "@/components/venues/VenuesEntrance";
import VenueDirectory from "@/components/venues/VenueDirectory";
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
    title: t.venues.metaTitle,
    description: t.venues.metaDescription,
    path: "/venues",
  });
}

export default async function VenuesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [t, config, venueLogos, venueCovers] = await Promise.all([
    getSiteDictionary(locale),
    getSiteConfig(),
    getVenueLogoMap(),
    getVenueCoverMap(),
  ]);

  const { logoUrl } = config;

  return (
    <>
      <ScrollProgress />
      <Header locale={locale} t={t} logoSrc={logoUrl} />
      <main>
        <VenuesEntrance
          locale={locale}
          title={t.venues.directoryTitle}
          titleAccent=""
          lede={t.venues.metaDescription}
        />
        <VenueDirectory
          locale={locale}
          t={t}
          venueLogos={venueLogos}
          venueCovers={venueCovers}
        />
      </main>
      <Footer locale={locale} t={t} logoSrc={logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
