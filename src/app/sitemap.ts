import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getAllChaletSlugs } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahra-website.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const chaletSlugs = await getAllChaletSlugs();

  return locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: locale === "ar" ? 1 : 0.9,
    },
    {
      url: `${siteUrl}/${locale}/chalets`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/${locale}/venues`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/${locale}/trust`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...chaletSlugs.map((slug) => ({
      url: `${siteUrl}/${locale}/chalets/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/${locale}/privacy`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ]);
}
