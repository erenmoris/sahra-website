import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cairo, El_Messiri, IBM_Plex_Mono } from "next/font/google";
import { defaultLocale, dir, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { venueKeywords } from "@/content/venues";
import { absoluteOgImage, absoluteUrl, siteUrl } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-el-messiri",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

async function currentLocale(): Promise<Locale> {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const t = getDictionary(locale);
  const title = t.meta.title;
  const description = t.meta.description;
  const url = absoluteUrl(`/${locale}`);
  const image = absoluteOgImage(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s · ${locale === "ar" ? "سهرة" : "Sahra"}`,
    },
    description,
    keywords: [...t.meta.keywords, ...venueKeywords],
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: {
        ar: absoluteUrl("/ar"),
        en: absoluteUrl("/en"),
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      siteName: "Sahra",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons: {
      icon: [{ url: "/brand/logo-icon.png", type: "image/png" }],
      apple: [{ url: "/brand/logo-icon.png", type: "image/png" }],
    },
    // Google's meta method needs the long token from Search Console; the older
    // file method still works through public/googlef9d35aaff3c2db3e.html.
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
    other: {
      "google-adsense-account": "ca-pub-1287316495357755",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await currentLocale();
  const t = getDictionary(locale);

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <head>
        {/* Covers the homepage before React hydrates so content never flashes first. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname.replace(/\\/+$/,"")||"/";if(p!=="/ar"&&p!=="/en"&&p!=="/")return;if(sessionStorage.getItem("sahra:entrance-load-v2"))return;document.documentElement.classList.add("sahra-gate");setTimeout(function(){document.documentElement.classList.remove("sahra-gate")},9000)}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${elMessiri.variable} ${cairo.variable} ${plexMono.variable} bg-ink text-sand antialiased`}
      >
        <StructuredData locale={locale} t={t} />
        {children}
      </body>
    </html>
  );
}
