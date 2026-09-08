import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { whatsappLink } from "@/i18n/dictionaries";
import {
  getAllNightclubSlugs,
  getNightclubBySlug,
  nightclubAbout,
  nightclubArea,
  nightclubName,
} from "@/content/nightclubs";
import { getNightclubCoverMap } from "@/lib/nightclub-covers";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingDetailLayout from "@/components/ListingDetailLayout";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllNightclubSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const club = getNightclubBySlug(slug);
  if (!club) return {};
  const name = nightclubName(club, locale);
  return pageMetadata({
    locale,
    title: name,
    description: nightclubAbout(club, locale),
    path: `/nightclubs/${slug}`,
  });
}

export default async function NightclubDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const club = getNightclubBySlug(slug);
  if (!club) notFound();

  const [t, config, covers] = await Promise.all([
    getSiteDictionary(locale),
    getSiteConfig(),
    getNightclubCoverMap(),
  ]);
  const name = nightclubName(club, locale);
  const location = nightclubArea(club, locale);
  const about = nightclubAbout(club, locale);
  const gallery = covers[slug] ? [covers[slug]] : [];
  const waMessage = `${t.nightclubs.whatsappBookPrefix} ${name}`;

  return (
    <>
      <Header locale={locale} t={t} logoSrc={config.logoUrl} />
      <main>
        <ListingDetailLayout
          locale={locale}
          t={t}
          backHref={`/${locale}/nightclubs`}
          backLabel={t.nightclubs.backToList}
          category={t.nightclubs.categoryNightlife}
          title={name}
          location={location}
          aboutTitle={t.nightclubs.aboutTitle}
          about={about}
          locationTitle={t.nightclubs.locationTitle}
          openMapsLabel={t.nightclubs.openMaps}
          mapsUrl={undefined}
          gallery={gallery}
          ctaHref={whatsappLink(waMessage)}
          ctaLabel={t.nightclubs.detailsCta}
          ctaPlacement={`nightclub-detail-${slug}`}
          note={t.nightclubs.namesNote}
        />
      </main>
      <Footer locale={locale} t={t} logoSrc={config.logoUrl} />
    </>
  );
}
