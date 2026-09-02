export type SectionKey =
  | "hero"
  | "promoTicker"
  | "how"
  | "trust"
  | "venues"
  | "gallery"
  | "coverage"
  | "testimonials"
  | "reserve"
  | "promoVideo";

export type LocalizedString = {
  ar?: string;
  en?: string;
};

export type HeroOverrides = {
  eyebrow?: LocalizedString;
  titleTop?: LocalizedString;
  titleAccent?: LocalizedString;
  titleBottom?: LocalizedString;
  lede?: LocalizedString;
  ctaPrimary?: LocalizedString;
  ctaSecondary?: LocalizedString;
};

export type SectionCopyOverrides = {
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  titleAccent?: LocalizedString;
  titleEnd?: LocalizedString;
  lede?: LocalizedString;
};

export type TestimonialItem = {
  id: string;
  text: LocalizedString;
  who: LocalizedString;
  name?: LocalizedString;
  visible?: boolean;
};

export type GalleryMediaItem = {
  id: string;
  src: string;
  caption?: LocalizedString;
  visible?: boolean;
  sortOrder?: number;
};

export type PromoVideoConfig = {
  src?: string;
  poster?: string;
  /** Where to render the video on the public site. */
  placement?: "hero" | "section";
  visible?: boolean;
};

export type SiteContent = {
  sections?: Partial<Record<SectionKey, boolean>>;
  hero?: HeroOverrides;
  how?: SectionCopyOverrides;
  trust?: SectionCopyOverrides;
  gallery?: SectionCopyOverrides;
  testimonials?: SectionCopyOverrides;
  /** When set, replaces the default ticker lines for that locale. */
  ticker?: { ar?: string[]; en?: string[] };
  /** When set, replaces the default testimonials list. */
  testimonialItems?: TestimonialItem[];
  /** When set, replaces / merges with filesystem gallery. */
  galleryItems?: GalleryMediaItem[];
  promoVideo?: PromoVideoConfig;
  updatedAt?: string;
};

export const DEFAULT_SECTIONS: Record<SectionKey, boolean> = {
  hero: true,
  promoTicker: true,
  how: true,
  trust: true,
  venues: true,
  gallery: true,
  coverage: true,
  testimonials: true,
  reserve: true,
  promoVideo: false,
};

export const SECTION_LABELS: Record<SectionKey, string> = {
  hero: "Hero",
  promoTicker: "Promo ticker",
  how: "How it works",
  trust: "Trust",
  venues: "Venues",
  gallery: "Gallery",
  coverage: "Coverage / SEO",
  testimonials: "Testimonials",
  reserve: "Reservation form",
  promoVideo: "Promo video section",
};

export function emptySiteContent(): SiteContent {
  return {
    sections: { ...DEFAULT_SECTIONS },
    galleryItems: [],
    testimonialItems: undefined,
    ticker: undefined,
    promoVideo: { visible: false, placement: "section" },
  };
}
