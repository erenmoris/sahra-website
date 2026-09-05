import type { Metadata } from "next";
import Link from "next/link";
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
import Footer, { WhatsAppFloat } from "@/components/Footer";
import ChaletGallery from "@/components/chalets/ChaletGallery";
import TrackedLink from "@/components/TrackedLink";
import Reveal from "@/components/Reveal";
import { Wrap, buttonClass } from "@/components/ui";
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

  return (
    <>
      <Header locale={locale} t={t} logoSrc={config.logoUrl} />
      <main className="pt-[88px]">
        <section className="py-16 md:py-20">
          <Wrap>
            <Reveal>
              <Link
                href={`/${locale}/chalets`}
                className="mb-8 inline-block text-[0.85rem] text-sand-dim transition-colors hover:text-gold-soft"
              >
                ← {t.chalets.backToList}
              </Link>
            </Reveal>

            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <Reveal>
                <ChaletGallery images={chalet.gallery} title={chalet.title} />
              </Reveal>

              <Reveal delay={80}>
                <div className="lg:sticky lg:top-28">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {chalet.fromOwner ? (
                      <span className="border border-gold/30 bg-gold/10 px-2.5 py-1 text-[0.75rem] text-gold-soft">
                        {t.chalets.fromOwner}
                      </span>
                    ) : null}
                  </div>

                  <h1 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.25] text-sand">
                    {chalet.title}
                  </h1>
                  <p className="mt-2 text-[1rem] text-gold-soft">{chalet.location}</p>
                  <p className="mt-5 text-[1.05rem] leading-[1.85] text-sand-dim">{chalet.summary}</p>

                  <div className="mt-5 border border-gold/30 bg-gold/10 px-4 py-3">
                    <p className="text-[0.88rem] font-semibold text-gold-soft">{t.chalets.priceBadge}</p>
                    <p className="mt-1 text-[0.9rem] leading-[1.7] text-sand-dim">{t.chalets.priceHint}</p>
                  </div>

                  <dl className="mt-6 grid grid-cols-2 gap-4 border border-gold/15 bg-ink-2/50 px-5 py-4 text-[0.9rem]">
                    <div>
                      <dt className="text-sand-dim">{t.chalets.bedrooms}</dt>
                      <dd className="mt-1 font-display text-xl text-gold-soft">{chalet.bedrooms}</dd>
                    </div>
                    <div>
                      <dt className="text-sand-dim">{t.chalets.bathrooms}</dt>
                      <dd className="mt-1 font-display text-xl text-gold-soft">{chalet.bathrooms}</dd>
                    </div>
                  </dl>

                  {chalet.features.length > 0 ? (
                    <div className="mt-8">
                      <h2 className="mb-3 font-display text-lg text-sand">{t.chalets.featuresTitle}</h2>
                      <ul className="space-y-2">
                        {chalet.features.map((feature) => (
                          <li
                            key={feature}
                            className="border-b border-gold/10 py-2.5 text-[0.92rem] text-sand-dim"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <TrackedLink
                    href={whatsappLink(waMessage)}
                    placement="chalet-detail"
                    locale={locale}
                    t={t}
                    className={buttonClass("primary", "mt-8 w-full justify-center shine")}
                  >
                    {t.chalets.ctaWhatsapp}
                  </TrackedLink>
                </div>
              </Reveal>
            </div>
          </Wrap>
        </section>
      </main>
      <Footer locale={locale} t={t} logoSrc={config.logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
