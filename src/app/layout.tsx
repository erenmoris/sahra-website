import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cairo, El_Messiri, IBM_Plex_Mono } from "next/font/google";
import { defaultLocale, dir, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahra-website.vercel.app";

async function currentLocale(): Promise<Locale> {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      url: `${siteUrl}/${locale}`,
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    verification: {
      // Carried over from the previous static site so search console stays verified.
      google: "googlef9d35aaff3c2db3e.html",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await currentLocale();

  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={`${elMessiri.variable} ${cairo.variable} ${plexMono.variable} bg-ink text-sand antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
