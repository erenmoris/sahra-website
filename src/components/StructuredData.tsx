import type { Locale } from "@/i18n/config";
import { SNAPCHAT_URL, WHATSAPP_NUMBER, type Dictionary } from "@/i18n/dictionaries";
import { venues, venueName } from "@/content/venues";
import { absoluteUrl, siteUrl } from "@/lib/seo";

export default function StructuredData({ locale, t }: { locale: Locale; t: Dictionary }) {
  const url = absoluteUrl(`/${locale}`);
  const businessId = `${siteUrl}#business`;
  const sameAs = [SNAPCHAT_URL];
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": businessId,
      name: t.meta.businessName,
      url,
      logo: `${siteUrl}/brand/logo-icon.png`,
      sameAs,
      areaServed: t.meta.areaServed.map((name) => ({ "@type": "Place", name })),
      knowsLanguage: ["ar", "en"],
    },
    {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: t.meta.businessName,
      description: t.meta.description,
      url,
      telephone: `+${WHATSAPP_NUMBER}`,
      sameAs,
      priceRange: "$$–$$$",
      image: `${siteUrl}/brand/logo-horizontal.png`,
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
      serviceType: locale === "ar" ? "كونسييرج سهرات في مصر" : "Egypt nightlife concierge",
      description: t.meta.description,
      provider: { "@id": businessId },
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
      "@type": "ItemList",
      "@id": `${url}#venues`,
      name: t.venues.namesTitle,
      itemListElement: venues.map((venue, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: venueName(venue, locale),
        alternateName: locale === "ar" ? venue.name : venue.nameAr,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: t.meta.businessName,
      inLanguage: locale,
      publisher: { "@id": businessId },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: t.meta.title,
      description: t.meta.description,
      isPartOf: { "@id": `${siteUrl}#website` },
      inLanguage: locale,
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: [
        ...t.how.steps.map((step) => ({
          "@type": "Question",
          name: step.title,
          acceptedAnswer: { "@type": "Answer", text: step.body },
        })),
        ...t.seo.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "ar" ? "الرئيسية" : "Home",
          item: url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "ar" ? "سهرات" : "Nights out",
          item: absoluteUrl(`/${locale}/venues`),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: locale === "ar" ? "نايت كلوب" : "Night clubs",
          item: absoluteUrl(`/${locale}/nightclubs`),
        },
        {
          "@type": "ListItem",
          position: 4,
          name: locale === "ar" ? "الشواطئ" : "Beaches",
          item: absoluteUrl(`/${locale}/beaches`),
        },
        {
          "@type": "ListItem",
          position: 5,
          name: locale === "ar" ? "المعرض" : "Gallery",
          item: absoluteUrl(`/${locale}/gallery`),
        },
        {
          "@type": "ListItem",
          position: 6,
          name: locale === "ar" ? "شاليهات" : "Chalets",
          item: absoluteUrl(`/${locale}/chalets`),
        },
      ],
    },
  ];

  // Season window for Event rich results (Google requires startDate + location).
  const seasonStart = "2026-05-01T18:00:00+03:00";
  const seasonEnd = "2026-10-31T04:00:00+03:00";
  const eventImage = `${siteUrl}/brand/logo-horizontal.png`;
  const organizer = {
    "@type": "Organization",
    "@id": businessId,
    name: t.meta.businessName,
    url,
  };
  const eventLocation = {
    "@type": "Place",
    name: locale === "ar" ? "القاهرة والساحل الشمالي، مصر" : "Cairo & North Coast, Egypt",
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ar" ? "القاهرة" : "Cairo",
      addressRegion: locale === "ar" ? "القاهرة" : "Cairo Governorate",
      addressCountry: "EG",
    },
  };
  const eventOffers = {
    "@type": "Offer",
    url: `${url}#reserve`,
    price: "0",
    priceCurrency: "EGP",
    availability: "https://schema.org/InStock",
    validFrom: seasonStart,
    description: locale === "ar" ? "حجز عبر واتساب الكونسييرج" : "Book via WhatsApp concierge",
  };

  // Primary Event — complete required + recommended fields for Search Console.
  graph.push({
    "@type": "Event",
    "@id": `${url}#event`,
    name: locale === "ar" ? "حجز سهرات في مصر" : "Book nightlife in Egypt",
    description: t.meta.description,
    startDate: seasonStart,
    endDate: seasonEnd,
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [eventImage],
    url: `${url}#reserve`,
    organizer,
    performer: {
      "@type": "PerformingGroup",
      name: t.meta.businessName,
    },
    location: [
      eventLocation,
      {
        "@type": "VirtualLocation",
        url: `${url}#reserve`,
      },
    ],
    offers: eventOffers,
  });

  // Reservation must NOT nest an incomplete Event (that caused GSC invalid items).
  graph.push({
    "@type": "Reservation",
    "@id": `${url}#reservation`,
    name: locale === "ar" ? "طلب حجز سهرة" : "Nightlife reservation request",
    url: `${url}#reserve`,
    reservationStatus: "https://schema.org/ReservationPending",
    provider: { "@id": businessId },
    underName: {
      "@type": "Organization",
      name: t.meta.businessName,
    },
    reservationFor: {
      "@type": "Service",
      name: t.form.title,
      description: t.form.lede,
      provider: { "@id": businessId },
    },
  });

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
