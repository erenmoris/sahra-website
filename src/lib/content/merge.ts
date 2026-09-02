import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import type { GalleryItem } from "@/lib/gallery";
import { getSiteContent } from "./store";
import {
  DEFAULT_SECTIONS,
  type LocalizedString,
  type SectionKey,
  type SiteContent,
} from "./types";

function pickLocalized(value: LocalizedString | undefined, locale: Locale): string | undefined {
  if (!value) return undefined;
  const preferred = value[locale];
  if (preferred !== undefined && preferred !== "") return preferred;
  const fallback = value[locale === "ar" ? "en" : "ar"];
  if (fallback !== undefined && fallback !== "") return fallback;
  return undefined;
}

function applyLocalized(
  current: string,
  override: LocalizedString | undefined,
  locale: Locale,
): string {
  return pickLocalized(override, locale) ?? current;
}

export type SiteConfig = {
  sections: Record<SectionKey, boolean>;
  promoVideo: NonNullable<SiteContent["promoVideo"]>;
  logoUrl?: string;
  content: SiteContent;
};

export async function getSiteConfig(): Promise<SiteConfig> {
  const content = await getSiteContent();
  return {
    content,
    logoUrl: content.logoUrl,
    sections: { ...DEFAULT_SECTIONS, ...content.sections },
    promoVideo: {
      visible: false,
      placement: "section",
      ...content.promoVideo,
    },
  };
}

export async function getSiteDictionary(locale: Locale): Promise<Dictionary> {
  const base = getDictionary(locale);
  const content = await getSiteContent();
  return mergeDictionary(base, content, locale);
}

/** Runtime-mutable copy of the dictionary for CMS overrides. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDict = any;

export function mergeDictionary(
  base: Dictionary,
  content: SiteContent,
  locale: Locale,
): Dictionary {
  const next: AnyDict = structuredClone(base);

  if (content.nav) {
    next.nav.how = applyLocalized(next.nav.how, content.nav.how, locale);
    next.nav.venues = applyLocalized(next.nav.venues, content.nav.venues, locale);
    next.nav.trust = applyLocalized(next.nav.trust, content.nav.trust, locale);
    next.nav.reserve = applyLocalized(next.nav.reserve, content.nav.reserve, locale);
  }

  if (content.hero) {
    next.hero.eyebrow = applyLocalized(next.hero.eyebrow, content.hero.eyebrow, locale);
    next.hero.titleTop = applyLocalized(next.hero.titleTop, content.hero.titleTop, locale);
    next.hero.titleAccent = applyLocalized(
      next.hero.titleAccent,
      content.hero.titleAccent,
      locale,
    );
    next.hero.titleBottom = applyLocalized(
      next.hero.titleBottom,
      content.hero.titleBottom,
      locale,
    );
    next.hero.lede = applyLocalized(next.hero.lede, content.hero.lede, locale);
    next.hero.ctaPrimary = applyLocalized(
      next.hero.ctaPrimary,
      content.hero.ctaPrimary,
      locale,
    );
    next.hero.ctaSecondary = applyLocalized(
      next.hero.ctaSecondary,
      content.hero.ctaSecondary,
      locale,
    );
  }

  for (const key of ["how", "trust", "gallery", "testimonials"] as const) {
    const override = content[key];
    if (!override) continue;
    const section = next[key];
    section.eyebrow = applyLocalized(section.eyebrow, override.eyebrow, locale);
    section.title = applyLocalized(section.title, override.title, locale);
    section.titleAccent = applyLocalized(section.titleAccent, override.titleAccent, locale);
    if (typeof section.lede === "string") {
      section.lede = applyLocalized(section.lede, override.lede, locale);
    }
    if (typeof section.titleEnd === "string") {
      section.titleEnd = applyLocalized(section.titleEnd, override.titleEnd, locale);
    }
  }

  const tickerLines = content.ticker?.[locale];
  if (tickerLines && tickerLines.length > 0) {
    next.ticker = tickerLines;
  }

  if (content.testimonialItems && content.testimonialItems.length > 0) {
    const items = content.testimonialItems
      .filter((item) => item.visible !== false)
      .map((item) => ({
        text: pickLocalized(item.text, locale) ?? "",
        who: pickLocalized(item.who, locale) ?? "",
        name: pickLocalized(item.name, locale),
      }))
      .filter((item) => item.text);
    if (items.length > 0) {
      next.testimonials.items = items;
    }
  }

  if (content.seo) {
    next.seo.eyebrow = applyLocalized(next.seo.eyebrow, content.seo.eyebrow, locale);
    next.seo.title = applyLocalized(next.seo.title, content.seo.title, locale);
    next.seo.titleAccent = applyLocalized(
      next.seo.titleAccent,
      content.seo.titleAccent,
      locale,
    );
    next.seo.faqTitle = applyLocalized(next.seo.faqTitle, content.seo.faqTitle, locale);
    const paragraphs = content.seo.paragraphs?.[locale];
    if (paragraphs && paragraphs.length > 0) {
      next.seo.paragraphs = paragraphs.filter(Boolean);
    }
  }

  if (content.faqItems && content.faqItems.length > 0) {
    const items = content.faqItems
      .filter((item) => item.visible !== false)
      .map((item) => ({
        q: pickLocalized(item.q, locale) ?? "",
        a: pickLocalized(item.a, locale) ?? "",
      }))
      .filter((item) => item.q && item.a);
    if (items.length > 0) {
      next.seo.faq = items;
    }
  }

  return next as Dictionary;
}

export function galleryFromContent(content: SiteContent): GalleryItem[] {
  if (!content.galleryItems?.length) return [];
  return content.galleryItems
    .filter((item) => item.visible !== false && item.src)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((item) => ({
      src: item.src,
      caption:
        item.caption?.ar || item.caption?.en
          ? { ar: item.caption.ar ?? "", en: item.caption.en ?? "" }
          : undefined,
    }));
}
