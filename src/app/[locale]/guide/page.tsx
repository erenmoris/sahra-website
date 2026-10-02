import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getSiteConfig, getSiteDictionary } from "@/lib/content";
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
    title: t.guide.metaTitle,
    description: t.guide.metaDescription,
    path: "/guide",
  });
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [t, config] = await Promise.all([getSiteDictionary(locale), getSiteConfig()]);
  const g = t.guide;

  return (
    <>
      <Header locale={locale} t={t} logoSrc={config.logoUrl} />
      <main className="pb-28" data-testid="guide-page">
        <section className="border-b border-gold/15 bg-[#0b101e] pt-16 pb-14 md:pt-20 md:pb-16">
          <Wrap className="max-w-3xl">
            <p className="mb-4 text-[0.78rem] tracking-[0.18em] text-gold-soft uppercase">
              {g.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.25] font-bold text-gold">
              {g.title}
            </h1>
            <p className="mt-6 text-[1.08rem] leading-[1.95] text-sand-dim">{g.lede}</p>
          </Wrap>
        </section>
        <Wrap className="max-w-3xl pt-12 md:pt-16">
          <div className="space-y-10">
            {g.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-[1.45rem] leading-snug font-bold text-sand">
                  {section.title}
                </h2>
                <p className="mt-3 text-[1.02rem] leading-[1.95] text-sand-dim">{section.body}</p>
              </section>
            ))}
          </div>
        </Wrap>
      </main>
      <Footer locale={locale} t={t} logoSrc={config.logoUrl} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
