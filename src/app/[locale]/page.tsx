import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeTeaser from "@/components/HomeTeaser";
import PromoTicker from "@/components/PromoTicker";
import PromoVideo from "@/components/PromoVideo";
import ScrollProgress from "@/components/ScrollProgress";
import ReservationForm from "@/components/ReservationForm";
import SiteEntrance from "@/components/SiteEntrance";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { Accent, Wrap } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getSiteDictionary(locale);
  return pageMetadata({
    locale,
    title: t.meta.title,
    description: t.meta.description,
    path: "",
    keywords: [...t.meta.keywords],
  });
}

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [t, config] = await Promise.all([getSiteDictionary(locale), getSiteConfig()]);

  const { sections, promoVideo, logoUrl } = config;
  const videoVisible = Boolean(promoVideo.visible && promoVideo.src);
  const videoInHero = videoVisible && promoVideo.placement === "hero";
  const videoAsSection =
    videoVisible && promoVideo.placement !== "hero" && sections.promoVideo;

  return (
    <>
      <SiteEntrance t={t} locale={locale} />
      <ScrollProgress />
      <Header locale={locale} t={t} logoSrc={logoUrl} />
      <main>
        {sections.hero ? (
          <Hero
            t={t}
            locale={locale}
            videoSrc={videoInHero ? promoVideo.src : undefined}
            videoPoster={videoInHero ? promoVideo.poster : undefined}
          />
        ) : null}

        {videoAsSection && promoVideo.src ? (
          <PromoVideo
            src={promoVideo.src}
            poster={promoVideo.poster}
            locale={locale}
            t={t}
          />
        ) : null}

        {sections.promoTicker ? <PromoTicker t={t} locale={locale} /> : null}

        <HomeTeaser t={t} locale={locale} />

        {sections.reserve ? (
          <section id="reserve" className="relative scroll-mt-8 overflow-hidden py-20 sm:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute end-[-10%] top-1/4 h-80 w-80 rounded-full bg-gold/10 blur-[110px]"
            />
            <Wrap>
              <Reveal>
                <div className="mb-10 max-w-[640px] md:mb-12">
                  <div className="mb-4 flex items-center gap-3 text-[0.82rem] font-semibold tracking-[0.04em] text-gold">
                    <span className="inline-block h-px w-7 bg-gold" />
                    {t.form.eyebrow}
                  </div>
                  <h2 className="font-display text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.2] font-bold text-sand">
                    {t.form.title} <Accent>{t.form.titleAccent}</Accent>
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-[1.05rem] leading-[1.8] text-sand-dim">{t.form.lede}</p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <ReservationForm t={t} locale={locale} />
              </Reveal>
            </Wrap>
          </section>
        ) : null}
      </main>

      <Footer locale={locale} t={t} logoSrc={logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
