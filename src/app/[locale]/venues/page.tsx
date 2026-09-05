import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import { getGalleryItems } from "@/lib/gallery";
import { getVenueLogoMap } from "@/lib/venue-logos";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import { Venues } from "@/components/Sections";
import Gallery from "@/components/Gallery";
import VenuesEntrance from "@/components/venues/VenuesEntrance";
import ScrollProgress from "@/components/ScrollProgress";
import { Divider, Wrap } from "@/components/ui";
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

  const [t, config, galleryItems, venueLogos] = await Promise.all([
    getSiteDictionary(locale),
    getSiteConfig(),
    getGalleryItems(),
    getVenueLogoMap(),
  ]);

  const { sections, logoUrl } = config;

  return (
    <>
      <ScrollProgress />
      <Header locale={locale} t={t} logoSrc={logoUrl} />
      <main>
        <VenuesEntrance
          locale={locale}
          title={t.venues.title}
          titleAccent={t.venues.titleAccent}
          lede={t.venues.metaDescription}
        />

        {sections.venues ? <Venues t={t} locale={locale} venueLogos={venueLogos} /> : null}

        {sections.venues && sections.gallery && galleryItems.length > 0 ? (
          <Wrap>
            <Divider />
          </Wrap>
        ) : null}

        {sections.gallery ? <Gallery items={galleryItems} locale={locale} t={t} /> : null}
      </main>
      <Footer locale={locale} t={t} logoSrc={logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
