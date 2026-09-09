import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import {
  carAbout,
  carName,
  getAllVipCarSlugs,
  getVipCarBySlug,
} from "@/content/cars";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarDetailContent from "@/components/cars/CarDetailContent";
import ScrollProgress from "@/components/ScrollProgress";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = getAllVipCarSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const car = getVipCarBySlug(slug);
  if (!car) return {};
  const t = await getSiteDictionary(locale);
  const name = carName(car, locale);
  return pageMetadata({
    locale,
    title: `${name} | ${t.cars.metaTitle}`,
    description: carAbout(car, locale),
    path: `/cars/${slug}`,
  });
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const car = getVipCarBySlug(slug);
  if (!car) notFound();

  const [t, config] = await Promise.all([
    getSiteDictionary(locale),
    getSiteConfig(),
  ]);

  return (
    <>
      <ScrollProgress />
      <Header locale={locale} t={t} logoSrc={config.logoUrl} />
      <main data-testid="car-detail-page">
        <CarDetailContent car={car} t={t} locale={locale} />
      </main>
      <Footer locale={locale} t={t} logoSrc={config.logoUrl} />
    </>
  );
}
