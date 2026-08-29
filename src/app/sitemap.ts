import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahra-website.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "ar" ? 1 : 0.9,
  }));
}
