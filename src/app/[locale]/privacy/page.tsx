import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary, whatsappLink } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import { Wrap, buttonClass } from "@/components/ui";

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

  return {
    title: `${t.privacy.title} · ${t.meta.businessName}`,
    description: t.privacy.intro,
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} t={t} />
      <main className="pt-[140px] pb-24">
        <Wrap className="max-w-[820px]">
          <h1 className="font-display text-[clamp(2rem,4vw,2.8rem)] leading-[1.3] font-semibold text-sand">
            {t.privacy.title}
          </h1>
          <p className="mt-3 font-mono text-[0.8rem] text-gold-soft">{t.privacy.updated}</p>
          <p className="mt-6 text-[1.05rem] leading-[1.9] text-sand-dim">{t.privacy.intro}</p>

          <div className="mt-12 space-y-9">
            {t.privacy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-3 font-display text-[1.35rem] font-semibold text-sand">
                  {section.title}
                </h2>
                <p className="leading-[1.9] text-sand-dim">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-4">
            <Link href={`/${locale}`} className={buttonClass("ghost")}>
              {t.privacy.backHome}
            </Link>
            <a
              href={whatsappLink(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("whatsapp")}
            >
              {t.footer.links.whatsapp}
            </a>
          </div>
        </Wrap>
      </main>
      <Footer locale={locale} t={t} />
      <WhatsAppFloat t={t} locale={locale} />
    </>
  );
}
