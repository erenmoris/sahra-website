import type { Locale } from "@/i18n/config";
import { getSiteContent } from "./store";
import {
  DEFAULT_CHALETS,
  type ChaletListing,
  type LocalizedString,
  type SiteContent,
} from "./types";

function pickLocalized(value: LocalizedString | undefined, locale: Locale): string {
  if (!value) return "";
  const preferred = value[locale];
  if (preferred !== undefined && preferred !== "") return preferred;
  const fallback = value[locale === "ar" ? "en" : "ar"];
  return fallback ?? "";
}

export type ResolvedChalet = {
  id: string;
  slug: string;
  title: string;
  location: string;
  summary: string;
  bedrooms: number;
  bathrooms: number;
  familyOnly: boolean;
  fromOwner: boolean;
  features: string[];
  coverImage: string;
  gallery: string[];
  whatsappMessage: string;
  sortOrder: number;
};

export function chaletsFromContent(content: SiteContent): ChaletListing[] {
  if (!content.chalets?.length) return DEFAULT_CHALETS;
  const ids = new Set(content.chalets.map((c) => c.id));
  const extras = DEFAULT_CHALETS.filter((d) => !ids.has(d.id));
  return extras.length ? [...content.chalets, ...extras] : content.chalets;
}

export function resolveChalet(listing: ChaletListing, locale: Locale): ResolvedChalet {
  return {
    id: listing.id,
    slug: listing.slug,
    title: pickLocalized(listing.title, locale),
    location: pickLocalized(listing.location, locale),
    summary: pickLocalized(listing.summary, locale),
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    familyOnly: Boolean(listing.familyOnly),
    fromOwner: Boolean(listing.fromOwner),
    features: (listing.features ?? [])
      .map((f) => pickLocalized(f, locale))
      .filter(Boolean),
    coverImage: listing.coverImage,
    gallery: listing.gallery?.length ? listing.gallery : [listing.coverImage].filter(Boolean),
    whatsappMessage: pickLocalized(listing.whatsappMessage, locale),
    sortOrder: listing.sortOrder ?? 0,
  };
}

export async function getVisibleChalets(locale: Locale): Promise<ResolvedChalet[]> {
  const content = await getSiteContent();
  return chaletsFromContent(content)
    .filter((item) => item.visible !== false && item.slug && item.coverImage)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((item) => resolveChalet(item, locale));
}

export async function getChaletBySlug(
  slug: string,
  locale: Locale,
): Promise<ResolvedChalet | null> {
  const content = await getSiteContent();
  const listing = chaletsFromContent(content).find(
    (item) => item.slug === slug && item.visible !== false,
  );
  return listing ? resolveChalet(listing, locale) : null;
}

export async function getAllChaletSlugs(): Promise<string[]> {
  const content = await getSiteContent();
  return chaletsFromContent(content)
    .filter((item) => item.visible !== false && item.slug)
    .map((item) => item.slug);
}
