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

export type NavOverrides = {
  how?: LocalizedString;
  venues?: LocalizedString;
  trust?: LocalizedString;
  reserve?: LocalizedString;
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
  /** Custom logo URL — falls back to /brand/logo-header.png */
  logoUrl?: string;
  /** Header navigation labels (how, venues, trust, reserve). */
  nav?: NavOverrides;
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
  hero: "الهيرو (أعلى الصفحة)",
  promoTicker: "الشريط المتحرك",
  how: "طريقة الحجز",
  trust: "ليه تختارنا",
  venues: "أنواع السهرات",
  gallery: "معرض الصور",
  coverage: "قسم التغطية / SEO",
  testimonials: "آراء العملاء",
  reserve: "نموذج الحجز",
  promoVideo: "قسم الفيديو الدعائي",
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
