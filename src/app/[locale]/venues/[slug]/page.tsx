import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { whatsappLink } from "@/i18n/dictionaries";
import { getAllVenueSlugs, getVenueBySlug, venueArea, venueName } from "@/content/venues";
import { getVenueExtra } from "@/lib/listing-extras";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingDetailLayout from "@/components/ListingDetailLayout";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllVenueSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const venue = getVenueBySlug(slug);
  if (!venue) return {};
  const name = venueName(venue, locale);
  const extra = getVenueExtra(slug);
  return pageMetadata({
    locale,
    title: name,
    description: extra.about || (locale === "ar" ? `احجز في ${name} عبر سهرة` : `Book ${name} with Sahra`),
    path: `/venues/${slug}`,
  });
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const venue = getVenueBySlug(slug);
  if (!venue) notFound();

  const [t, config] = await Promise.all([getSiteDictionary(locale), getSiteConfig()]);
  const name = venueName(venue, locale);
  const location = venueArea(venue, locale);
  const extra = getVenueExtra(slug);
  const about = extra.about || t.venues.fallbackAbout;
  const gallery =
    extra.gallery.length > 0 ? extra.gallery : [`/venues/covers/${slug}.webp`];
  const waMessage = `${t.venues.whatsappBookPrefix} ${name}`;

  return (
    <>
      <Header locale={locale} t={t} logoSrc={config.logoUrl} />
      <main>
        <ListingDetailLayout
          locale={locale}
          t={t}
          backHref={`/${locale}/venues`}
          backLabel={t.venues.backToList}
          category={t.venues.categoryNightlife}
          title={name}
          location={location}
          aboutTitle={t.venues.aboutTitle}
          about={about}
          locationTitle={t.venues.locationTitle}
          openMapsLabel={t.venues.openMaps}
          mapsUrl={extra.mapsUrl}
          gallery={gallery}
          ctaHref={whatsappLink(waMessage)}
          ctaLabel={t.venues.detailsCta}
          ctaPlacement={`venue-detail-${slug}`}
          note={t.venues.namesNote}
        />
      </main>
      <Footer locale={locale} t={t} logoSrc={config.logoUrl} />
    </>
  );
}
