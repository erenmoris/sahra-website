import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeTeaser from "@/components/HomeTeaser";
import PromoTicker from "@/components/PromoTicker";
import PromoVideo from "@/components/PromoVideo";
import ScrollProgress from "@/components/ScrollProgress";
import { HowItWorks } from "@/components/Sections";
import ReservationForm from "@/components/ReservationForm";
import SiteEntrance from "@/components/SiteEntrance";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import SnapchatCard from "@/components/SnapchatCard";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { Accent, SectionHeading, Wrap } from "@/components/ui";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
      <StructuredData locale={locale} t={t} />
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

        {sections.how ? <HowItWorks t={t} /> : null}

        {sections.reserve ? (
          <section id="reserve" className="scroll-mt-24 py-24">
            <Wrap>
              <Reveal>
                <SectionHeading eyebrow={t.form.eyebrow} lede={t.form.lede}>
                  {t.form.title} <Accent>{t.form.titleAccent}</Accent>
                </SectionHeading>
              </Reveal>
              <Reveal>
                <ReservationForm t={t} locale={locale} />
              </Reveal>
              <Reveal>
                <div className="mt-6">
                  <SnapchatCard locale={locale} t={t} />
                </div>
              </Reveal>
            </Wrap>
          </section>
        ) : null}
      </main>

      <Footer locale={locale} t={t} logoSrc={logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
      <SiteEntrance t={t} locale={locale} />
    </>
  );
}
