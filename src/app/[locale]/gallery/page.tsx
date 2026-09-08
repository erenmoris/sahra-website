import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import NightclubGalleryPage from "@/components/gallery/NightclubGalleryPage";
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
    title: t.galleryPage.metaTitle,
    description: t.galleryPage.metaDescription,
    path: "/gallery",
  });
}

export default async function GalleryRoutePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [t, config] = await Promise.all([getSiteDictionary(locale), getSiteConfig()]);

  return (
    <>
      <ScrollProgress />
      <Header locale={locale} t={t} logoSrc={config.logoUrl} />
      <main className="pt-[80px]">
        <NightclubGalleryPage locale={locale} t={t} />
      </main>
      <Footer locale={locale} t={t} logoSrc={config.logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
