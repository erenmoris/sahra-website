import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Coverage, HowItWorks, Testimonials, Trust, Venues } from "@/components/Sections";
import ReservationForm from "@/components/ReservationForm";
import IntroModal from "@/components/IntroModal";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import Reveal from "@/components/Reveal";
import { Accent, Divider, SectionHeading, Wrap } from "@/components/ui";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);

  return (
    <>
      <StructuredData locale={locale} t={t} />
      <Header locale={locale} t={t} />
      <main>
        <Hero t={t} locale={locale} />

        <Wrap>
          <Divider />
        </Wrap>

        <HowItWorks t={t} />

        <Wrap>
          <Divider />
        </Wrap>

        <Trust t={t} />

        <Wrap>
          <Divider />
        </Wrap>

        <Venues t={t} />

        <Wrap>
          <Divider />
        </Wrap>

        <Coverage t={t} />

        <Wrap>
          <Divider />
        </Wrap>

        <Testimonials t={t} />

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
          </Wrap>
        </section>
      </main>

      <Footer locale={locale} t={t} />
      <WhatsAppFloat t={t} locale={locale} />
      <IntroModal t={t} locale={locale} />
    </>
  );
}
