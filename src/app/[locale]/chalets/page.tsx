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
  return {
    title: t.chalets.metaTitle,
    description: t.chalets.metaDescription,
  };
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

        <section id="chalet-list" className="scroll-mt-24 py-20">
          <Wrap>
            <div className="mb-10 max-w-2xl border-s-2 border-gold/50 ps-5">
              <p className="text-[0.78rem] tracking-[0.14em] text-gold-soft uppercase">
                {t.chalets.priceBadge}
              </p>
              <p className="mt-2 text-[1.05rem] leading-[1.85] text-sand-dim">{t.chalets.priceTeaser}</p>
            </div>

            {chalets.length === 0 ? (
              <p className="text-sand-dim">{t.chalets.empty}</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
