import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import AboutPageContent from "@/components/AboutPageContent";
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
  const t = getDictionary(locale);

  return pageMetadata({
    locale,
    title: t.about.metaTitle,
    description: t.about.metaDescription,
    path: "/about",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);

  return (
    <>
      <ScrollProgress />
      <Header locale={locale} t={t} />
      <main data-testid="about-page">
        <AboutPageContent t={t} locale={locale} />
      </main>
      <Footer locale={locale} t={t} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
