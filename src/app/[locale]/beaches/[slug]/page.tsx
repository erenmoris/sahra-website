import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { whatsappLink } from "@/i18n/dictionaries";
import { beachArea, beachName, getAllBeachSlugs, getBeachBySlug } from "@/content/beaches";
import { getBeachExtra } from "@/lib/listing-extras";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingDetailLayout from "@/components/ListingDetailLayout";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllBeachSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const beach = getBeachBySlug(slug);
  if (!beach) return {};
  const name = beachName(beach, locale);
  const extra = getBeachExtra(slug);
  return pageMetadata({
    locale,
    title: name,
    description: extra.about || (locale === "ar" ? `احجز في ${name} عبر سهرة` : `Book ${name} with Sahra`),
    path: `/beaches/${slug}`,
  });
}

export default async function BeachDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const beach = getBeachBySlug(slug);
  if (!beach) notFound();

  const [t, config] = await Promise.all([getSiteDictionary(locale), getSiteConfig()]);
  const name = beachName(beach, locale);
  const location = beachArea(beach, locale);
  const extra = getBeachExtra(slug);
  const about = extra.about || t.beaches.fallbackAbout;
  const gallery =
    extra.gallery.length > 0 ? extra.gallery : [`/beaches/covers/${slug}.webp`];
  const waMessage = `${t.beaches.whatsappBookPrefix} ${name}`;
  const category =
    beach.kind === "aqua" ? t.beaches.categoryAqua : t.beaches.categoryBeach;

  return (
    <>
      <Header locale={locale} t={t} logoSrc={config.logoUrl} />
      <main>
        <ListingDetailLayout
          locale={locale}
          t={t}
          backHref={`/${locale}/beaches`}
          backLabel={t.beaches.backToList}
          category={category}
          title={name}
          location={location}
          aboutTitle={t.beaches.aboutTitle}
          about={about}
          locationTitle={t.beaches.locationTitle}
          openMapsLabel={t.beaches.openMaps}
          mapsUrl={extra.mapsUrl}
          gallery={gallery}
          ctaHref={whatsappLink(waMessage)}
          ctaLabel={t.beaches.detailsCta}
          ctaPlacement={`beach-detail-${slug}`}
          note={t.beaches.namesNote}
        />
      </main>
      <Footer locale={locale} t={t} logoSrc={config.logoUrl} />
    </>
  );
}
