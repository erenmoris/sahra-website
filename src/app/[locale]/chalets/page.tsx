import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getSiteConfig, getSiteDictionary, getVisibleChalets } from "@/lib/content";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import ChaletCard from "@/components/chalets/ChaletCard";
import ChaletEntrance from "@/components/chalets/ChaletEntrance";
import Reveal from "@/components/Reveal";
import { Wrap } from "@/components/ui";
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
    title: t.chalets.metaTitle,
    description: t.chalets.metaDescription,
    path: "/chalets",
  });
}

export default async function ChaletsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [t, config, chalets] = await Promise.all([
    getSiteDictionary(locale),
    getSiteConfig(),
    getVisibleChalets(locale),
  ]);

  return (
    <>
      <Header locale={locale} t={t} logoSrc={config.logoUrl} />
      <main>
        <ChaletEntrance
          locale={locale}
          title={t.chalets.title}
          titleAccent={t.chalets.titleAccent}
          lede={t.chalets.lede}
          priceBadge={t.chalets.priceBadge}
        />

        <section id="chalet-list" className="relative scroll-mt-24 overflow-hidden py-20 md:py-24">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.07),transparent_50%)]"
            aria-hidden
          />
          <Wrap className="relative">
            <header className="mb-12 max-w-2xl text-center sm:text-start md:mb-14">
              <p className="text-[0.95rem] font-semibold tracking-[0.08em] text-gold-soft drop-shadow-[0_0_18px_rgba(201,162,75,0.45)] md:text-[1.05rem]">
                {t.chalets.priceBadge}
              </p>
              <p className="mt-3 text-[1.05rem] leading-[1.9] text-sand-dim md:text-[1.1rem]">
                {t.chalets.priceTeaser}
              </p>
            </header>

            {chalets.length === 0 ? (
              <p className="text-center text-sand-dim">{t.chalets.empty}</p>
            ) : (
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {chalets.map((chalet, index) => (
                  <Reveal key={chalet.id} delay={(index % 3) * 80}>
                    <ChaletCard chalet={chalet} locale={locale} t={t} />
                  </Reveal>
                ))}
              </div>
            )}
          </Wrap>
        </section>
      </main>
      <Footer locale={locale} t={t} logoSrc={config.logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
