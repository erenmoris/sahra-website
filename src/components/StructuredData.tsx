import type { Locale } from "@/i18n/config";
import { WHATSAPP_NUMBER, type Dictionary } from "@/i18n/dictionaries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahra-website.vercel.app";

export default function StructuredData({ locale, t }: { locale: Locale; t: Dictionary }) {
  const url = `${siteUrl}/${locale}`;

  const graph = [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}#business`,
      name: t.meta.businessName,
      description: t.meta.description,
      url,
      telephone: `+${WHATSAPP_NUMBER}`,
      priceRange: "$$–$$$",
      image: `${siteUrl}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        addressCountry: "EG",
        addressRegion: locale === "ar" ? "مصر" : "Egypt",
      },
      areaServed: t.meta.areaServed.map((name) => ({ "@type": "Place", name })),
      knowsLanguage: ["ar", "en"],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "12:00",
        closes: "04:00",
      },
      potentialAction: {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${url}#reserve`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        result: { "@type": "Reservation", name: t.form.eyebrow },
      },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}#service`,
      serviceType: t.meta.businessName,
      provider: { "@id": `${siteUrl}#business` },
      areaServed: t.meta.areaServed.map((name) => ({ "@type": "Place", name })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: t.venues.eyebrow,
        itemListElement: t.venues.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item.title, description: item.body },
          areaServed: item.tag,
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: t.meta.businessName,
      inLanguage: locale,
      publisher: { "@id": `${siteUrl}#business` },
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: t.how.steps.map((step) => ({
        "@type": "Question",
        name: step.title,
        acceptedAnswer: { "@type": "Answer", text: step.body },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Structured data has to be inlined for crawlers to read it.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
