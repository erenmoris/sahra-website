import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import { getNightclubCoverMap } from "@/lib/nightclub-covers";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import NightclubsEntrance from "@/components/nightclubs/NightclubsEntrance";
import NightclubDirectory from "@/components/nightclubs/NightclubDirectory";
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
    title: t.nightclubs.metaTitle,
    description: t.nightclubs.metaDescription,
    path: "/nightclubs",
  });
}

export default async function NightclubsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [t, config, covers] = await Promise.all([
    getSiteDictionary(locale),
    getSiteConfig(),
    getNightclubCoverMap(),
  ]);

  return (
    <>
      <ScrollProgress />
      <Header locale={locale} t={t} logoSrc={config.logoUrl} />
      <main>
        <NightclubsEntrance
          locale={locale}
          title={t.nightclubs.directoryTitle}
          titleAccent=""
          lede={t.nightclubs.metaDescription}
        />
        <NightclubDirectory locale={locale} t={t} covers={covers} />
      </main>
      <Footer locale={locale} t={t} logoSrc={config.logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
