import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getAllBeachSlugs } from "@/content/beaches";
import { getAllVenueSlugs } from "@/content/venues";
import { getAllChaletSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const chaletSlugs = await getAllChaletSlugs();
  const venueSlugs = getAllVenueSlugs();
  const beachSlugs = getAllBeachSlugs();

  return locales.flatMap((locale) => [
    {
      url: absoluteUrl(`/${locale}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: locale === "ar" ? 1 : 0.9,
    },
    {
      url: absoluteUrl(`/${locale}/chalets`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: absoluteUrl(`/${locale}/venues`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: absoluteUrl(`/${locale}/beaches`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: absoluteUrl(`/${locale}/trust`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: absoluteUrl(`/${locale}/about`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: absoluteUrl(`/${locale}/privacy`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.35,
    },
    {
      url: absoluteUrl(`/${locale}/terms`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    ...chaletSlugs.map((slug) => ({
      url: absoluteUrl(`/${locale}/chalets/${slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...venueSlugs.map((slug) => ({
      url: absoluteUrl(`/${locale}/venues/${slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...beachSlugs.map((slug) => ({
      url: absoluteUrl(`/${locale}/beaches/${slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]);
}
