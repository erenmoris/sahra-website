import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getSiteDictionary } from "@/lib/content";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
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
    title: locale === "ar" ? "دليل السهر | سهرات مصر" : "Egypt Nightlife Guide | Sahra",
    description:
      locale === "ar"
        ? t.seo.paragraphs[0]
        : "A practical guide to nightlife in Egypt: Cairo, North Coast, El Gouna — and how to book a table on WhatsApp.",
    path: "/guide",
    keywords: locale === "ar"
      ? t.meta.keywords
      : ["best nightlife in Egypt", "nightlife places in Egypt", "book a table Cairo", "North Coast nightlife"],
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getSiteDictionary(locale);
  const isAr = locale === "ar";

  return (
    <>
      <Header locale={locale} t={t} />
      <main className="pt-[88px]">
        <section className="py-16 md:py-20">
          <Wrap className="max-w-[800px]">
            <p className="text-[0.78rem] tracking-[0.18em] text-gold-soft uppercase">
              {isAr ? "دليل" : "Guide"}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,4vw,2.8rem)] font-semibold text-sand">
              {isAr ? "دليل السهر في مصر" : "Egypt Nightlife Guide"}
            </h1>
            <p className="mt-4 text-[1.05rem] leading-[1.8] text-sand-dim">
              {isAr ? t.seo.paragraphs[0] : "A practical guide to nightlife in Egypt: Cairo, North Coast, El Gouna — and how to book a table on WhatsApp."}
            </p>

            <div className="mt-10 space-y-8">
              {t.seo.paragraphs.map((paragraph) => (
                <article key={paragraph}>
                  <p className="text-[1rem] leading-[1.8] text-sand-dim">{paragraph}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 border border-gold/25 bg-ink-2/50 p-6">
              <h2 className="mb-2 font-display text-xl font-semibold text-sand">
                {isAr ? "أسئلة شائعة" : "Frequently asked"}
              </h2>
              <div className="space-y-4">
                {t.seo.faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-[1.02rem] font-semibold text-gold-soft">{item.q}</h3>
                    <p className="mt-1 text-[0.95rem] leading-[1.8] text-sand-dim">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </Wrap>
        </section>
      </main>
      <Footer locale={locale} t={t} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
