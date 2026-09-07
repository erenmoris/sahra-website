import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { whatsappLink } from "@/i18n/dictionaries";
import {
  getAllChaletSlugs,
  getChaletBySlug,
  getSiteConfig,
  getSiteDictionary,
} from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingDetailLayout from "@/components/ListingDetailLayout";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getAllChaletSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const chalet = await getChaletBySlug(slug, locale);
  if (!chalet) return {};
  return pageMetadata({
    locale,
    title: chalet.title,
    description: chalet.summary,
    path: `/chalets/${slug}`,
  });
}

export default async function ChaletDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const [t, config, chalet] = await Promise.all([
    getSiteDictionary(locale),
    getSiteConfig(),
    getChaletBySlug(slug, locale),
  ]);

  if (!chalet) notFound();

  const waMessage = chalet.whatsappMessage || t.whatsappMessage;
  const gallery =
    chalet.gallery.length > 0 ? chalet.gallery : chalet.coverImage ? [chalet.coverImage] : [];

  return (
    <>
      <Header locale={locale} t={t} logoSrc={config.logoUrl} />
      <main>
        <ListingDetailLayout
          locale={locale}
          t={t}
          backHref={`/${locale}/chalets`}
          backLabel={t.chalets.backToList}
          category={chalet.fromOwner ? t.chalets.fromOwner : undefined}
          title={chalet.title}
          location={chalet.location}
          aboutTitle={locale === "ar" ? "نبذة" : "About"}
          about={chalet.summary}
          gallery={gallery}
          ctaHref={whatsappLink(waMessage)}
          ctaLabel={t.chalets.ctaWhatsapp}
          ctaPlacement={`chalet-detail-${slug}`}
        >
          <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/10 px-4 py-3.5">
            <p className="text-[0.88rem] font-semibold text-gold-soft">{t.chalets.priceBadge}</p>
            <p className="mt-1 text-[0.9rem] leading-[1.7] text-sand-dim">{t.chalets.priceHint}</p>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            <div className="lux-panel rounded-2xl border border-gold/20 bg-ink-2/90 px-4 py-3.5 backdrop-blur-md">
              <dt className="text-[0.8rem] text-sand-dim">{t.chalets.bedrooms}</dt>
              <dd className="mt-1 font-display text-2xl text-gold-soft">{chalet.bedrooms}</dd>
            </div>
            <div className="lux-panel rounded-2xl border border-gold/20 bg-ink-2/90 px-4 py-3.5 backdrop-blur-md">
              <dt className="text-[0.8rem] text-sand-dim">{t.chalets.bathrooms}</dt>
              <dd className="mt-1 font-display text-2xl text-gold-soft">{chalet.bathrooms}</dd>
            </div>
          </dl>

          {chalet.features.length > 0 ? (
            <div className="mt-7">
              <h2 className="mb-3 font-display text-lg font-semibold text-sand">
                {t.chalets.featuresTitle}
              </h2>
              <ul className="lux-panel space-y-1 rounded-2xl border border-gold/20 bg-ink-2/90 px-4 py-2 backdrop-blur-md">
                {chalet.features.map((feature) => (
                  <li
                    key={feature}
                    className="border-b border-gold/15 py-2.5 text-[0.92rem] text-sand-dim last:border-0"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </ListingDetailLayout>
      </main>
      <Footer locale={locale} t={t} logoSrc={config.logoUrl} />
    </>
  );
}
