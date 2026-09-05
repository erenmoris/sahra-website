/** Shared SEO helpers for site metadata and schema. */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahra-website.vercel.app";

export function absoluteUrl(path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${clean}`;
}

export function ogImagePath(): string {
  return "/brand/logo-horizontal.png";
}

/** Absolute OG/Twitter image — uses the Next.js opengraph-image route. */
export function absoluteOgImage(_locale: "ar" | "en" = "ar"): string {
  return absoluteUrl("/opengraph-image");
}

export function localeToOpenGraphLocale(locale: "ar" | "en"): string {
  return locale === "ar" ? "ar_EG" : "en_US";
}

export function pageMetadata(options: {
  locale: "ar" | "en";
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  ogImage?: string;
}): import("next").Metadata {
  const { locale, title, description, path, keywords = [], ogImage } = options;
  const url = absoluteUrl(`/${locale}${path}`);
  // Prefer the dynamic opengraph-image route (Next.js) so WhatsApp/FB get the
  // branded card; fall back to the logo if ogImage is overridden.
  const image = ogImage ?? absoluteOgImage(locale);

  // Keep hreflang paths in sync with the current route (nested pages included).
  // Prefer absolute URLs for Google's duplicate detection (not relative paths).
  const siblingPath = path === "" ? "" : path;
  const arPath = `/ar${siblingPath}`;
  const enPath = `/en${siblingPath}`;

  return {
    title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical: url,
      languages: {
        ar: absoluteUrl(arPath),
        en: absoluteUrl(enPath),
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: localeToOpenGraphLocale(locale),
      siteName: "Sahra",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
