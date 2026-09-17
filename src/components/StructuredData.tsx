import { headers } from "next/headers";
import type { Locale } from "@/i18n/config";
import { SNAPCHAT_URL, WHATSAPP_NUMBER, type Dictionary } from "@/i18n/dictionaries";
import { venues, venueName } from "@/content/venues";
import { absoluteUrl, siteUrl } from "@/lib/seo";

function normalizePath(pathname: string, locale: Locale): string {
  const cleaned = (pathname || `/${locale}`).replace(/\/+$/, "") || `/${locale}`;
  if (cleaned === `/${locale}` || cleaned.startsWith(`/${locale}/`)) return cleaned;
  return `/${locale}`;
}

export default async function StructuredData({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const pathname = (await headers()).get("x-pathname") ?? `/${locale}`;
  const path = normalizePath(pathname, locale);
  const isHome = path === `/${locale}`;
  const homeUrl = absoluteUrl(`/${locale}`);
  const pageUrl = absoluteUrl(path);
  const businessId = `${siteUrl}#business`;
  const sameAs = [SNAPCHAT_URL];

  // Sitewide identity only — never claim every URL is the homepage.
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": businessId,
      name: t.meta.businessName,
      url: homeUrl,
      logo: `${siteUrl}/brand/logo-icon.png`,
      sameAs,
      areaServed: t.meta.areaServed.map((name) => ({ "@type": "Place", name })),
      knowsLanguage: ["ar", "en"],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}#localbusiness`,
      name: t.meta.businessName,
      description: t.meta.description,
      url: homeUrl,
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
          urlTemplate: `${homeUrl}#reserve`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        result: { "@type": "Reservation", name: t.form.eyebrow },
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: t.meta.businessName,
      inLanguage: locale,
      publisher: { "@id": businessId },
      potentialAction: {
        "@type": "SearchAction",
        target: `${homeUrl}?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: t.meta.title,
      description: t.meta.description,
      isPartOf: { "@id": `${siteUrl}#website` },
      inLanguage: locale,
      ...(isHome ? {} : { about: { "@id": businessId } }),
    },
  ];

  // Homepage-only rich graph — repeating FAQ/Event on every URL caused
  // "Duplicate, Google chose different canonical" in Search Console.
  if (isHome) {
    graph.push(
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
        "@id": `${homeUrl}#venues`,
        name: t.venues.namesTitle,
        itemListElement: venues.map((venue, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: venueName(venue, locale),
          alternateName: locale === "ar" ? venue.name : venue.nameAr,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${homeUrl}#faq`,
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
        "@id": `${homeUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "ar" ? "الرئيسية" : "Home",
            item: homeUrl,
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
    );

    const seasonStart = "2026-05-01T18:00:00+03:00";
    const seasonEnd = "2026-10-31T04:00:00+03:00";
    const eventImage = `${siteUrl}/brand/logo-horizontal.png`;
    const organizer = {
      "@type": "Organization",
      "@id": businessId,
      name: t.meta.businessName,
      url: homeUrl,
    };

    graph.push({
      "@type": "Event",
      "@id": `${homeUrl}#event`,
      name: locale === "ar" ? "حجز سهرات في مصر" : "Book nightlife in Egypt",
      description: t.meta.description,
      startDate: seasonStart,
      endDate: seasonEnd,
      eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: [eventImage],
      url: `${homeUrl}#reserve`,
      organizer,
      performer: {
        "@type": "PerformingGroup",
        name: t.meta.businessName,
      },
      location: [
        {
          "@type": "Place",
          name: locale === "ar" ? "القاهرة والساحل الشمالي، مصر" : "Cairo & North Coast, Egypt",
          address: {
            "@type": "PostalAddress",
            addressLocality: locale === "ar" ? "القاهرة" : "Cairo",
            addressRegion: locale === "ar" ? "القاهرة" : "Cairo Governorate",
            addressCountry: "EG",
          },
        },
        {
          "@type": "VirtualLocation",
          url: `${homeUrl}#reserve`,
        },
      ],
      offers: {
        "@type": "Offer",
        url: `${homeUrl}#reserve`,
        price: "0",
        priceCurrency: "EGP",
        availability: "https://schema.org/InStock",
        validFrom: seasonStart,
        description: locale === "ar" ? "حجز عبر واتساب الكونسييرج" : "Book via WhatsApp concierge",
      },
    });
  } else {
    // Simple breadcrumb: Home → current section path.
    const segments = path.split("/").filter(Boolean);
    const crumbs: Record<string, unknown>[] = [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ar" ? "الرئيسية" : "Home",
        item: homeUrl,
      },
    ];
    if (segments.length > 1) {
      crumbs.push({
        "@type": "ListItem",
        position: 2,
        name: segments[segments.length - 1],
        item: pageUrl,
      });
    }
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: crumbs,
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
