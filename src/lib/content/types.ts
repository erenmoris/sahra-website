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
  chalets?: LocalizedString;
};

export type ChaletListing = {
  id: string;
  slug: string;
  visible?: boolean;
  title: LocalizedString;
  location: LocalizedString;
  summary: LocalizedString;
  bedrooms: number;
  bathrooms: number;
  familyOnly?: boolean;
  fromOwner?: boolean;
  features: LocalizedString[];
  coverImage: string;
  gallery: string[];
  whatsappMessage?: LocalizedString;
  sortOrder?: number;
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
  /** Real WhatsApp chat screenshot URL — preferred over text quotes. */
  image?: string;
  /** Optional caption under the screenshot (e.g. city). */
  who?: LocalizedString;
  name?: LocalizedString;
  /** Legacy text quote — ignored when `image` is set. */
  text?: LocalizedString;
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

export type FaqItem = {
  id: string;
  q: LocalizedString;
  a: LocalizedString;
  visible?: boolean;
};

export type SeoOverrides = {
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  titleAccent?: LocalizedString;
  /** When set, replaces default SEO paragraphs for that locale. */
  paragraphs?: { ar?: string[]; en?: string[] };
  faqTitle?: LocalizedString;
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
  /** Coverage / SEO section copy (above FAQ). */
  seo?: SeoOverrides;
  /** When set, replaces the default FAQ list. */
  faqItems?: FaqItem[];
  /** Chalet rental listings. When empty/undefined, seed defaults are used. */
  chalets?: ChaletListing[];
  updatedAt?: string;
};

const MARASSI_BASE = "/chalets/marassi-marina-2";
const BLANCA_BASE = "/chalets/blanca-204-101";
const STELLA_BASE = "/chalets/stella-heights-292";

/** Default seeded listing shown until admin saves a custom chalets array. */
export const DEFAULT_CHALETS: ChaletListing[] = [
  {
    id: "marassi-marina-2-2k304",
    slug: "marassi-marina-2-2k304",
    visible: true,
    sortOrder: 1,
    title: {
      ar: "شاليه مراسي — مارينا ٢",
      en: "Marassi Chalet — Marina 2",
    },
    location: {
      ar: "مراسي · مارينا ٢ · 2K304",
      en: "Marassi · Marina 2 · 2K304",
    },
    summary: {
      ar: "غرفة نوم واحدة، حمام، صالة واسعة، تكييف كامل — للإيجار من المالك، عائلات فقط.",
      en: "1 bedroom, 1 bath, wide living, full AC — owner rental, families only.",
    },
    bedrooms: 1,
    bathrooms: 1,
    familyOnly: true,
    fromOwner: true,
    features: [
      { ar: "متاح للإيجار", en: "Available for rental" },
      { ar: "من المالك مباشرة", en: "From owner" },
      { ar: "تكييف لكل الغرف والصالة", en: "Air conditioning in all rooms and living" },
      { ar: "عائلات فقط", en: "Family only" },
      { ar: "صالة واسعة — الأريكة تتحول لسرير", en: "Wide living with sofa that converts to a bed" },
      { ar: "أثاث جديد", en: "New furniture" },
      { ar: "أجهزة منزلية جديدة", en: "New home appliances" },
    ],
    coverImage: `${MARASSI_BASE}/01-balcony-view.jpg`,
    gallery: [
      `${MARASSI_BASE}/01-balcony-view.jpg`,
      `${MARASSI_BASE}/02-pool-view.jpg`,
      `${MARASSI_BASE}/03-resort-view.jpg`,
      `${MARASSI_BASE}/04-bedroom-a.jpg`,
      `${MARASSI_BASE}/05-bedroom-b.jpg`,
      `${MARASSI_BASE}/06-bathroom-a.jpg`,
      `${MARASSI_BASE}/07-bathroom-b.png`,
    ],
    whatsappMessage: {
      ar: "مرحبًا، مهتم بإيجار شاليه مراسي مارينا ٢ — 2K304",
      en: "Hi, I'm interested in renting the Marassi Marina 2 chalet — 2K304",
    },
  },
  {
    id: "blanca-204-101",
    slug: "blanca-204-101",
    visible: true,
    sortOrder: 2,
    title: {
      ar: "شاليه بلانكا — ٣ غرف",
      en: "Blanca Chalet — 3 Bedroom",
    },
    location: {
      ar: "بلانكا · 204/101",
      en: "Blanca · 204/101",
    },
    summary: {
      ar: "٣ غرف نوم + غرفة مربية، حمامين، صالة واسعة، تكييف كامل، فيو بحر ولاجون — من المالك، عائلات فقط.",
      en: "3 bedrooms + nanny room, 2 baths, wide living, full AC, sea & lagoon view — from owner, families only.",
    },
    bedrooms: 3,
    bathrooms: 2,
    familyOnly: true,
    fromOwner: true,
    features: [
      { ar: "متاح للإيجار", en: "Available for rental" },
      { ar: "من المالك مباشرة", en: "From owner" },
      { ar: "تكييف لكل الغرف والصالة", en: "Air conditioning in all rooms and living" },
      { ar: "عائلات فقط", en: "Family only" },
      { ar: "٣ غرف نوم", en: "3 bedrooms" },
      { ar: "غرفة مربية", en: "Nanny room" },
      { ar: "صالة واسعة بأريكة", en: "Wide living with sofa" },
      { ar: "فيو بحر قدام ولاجون ورا", en: "Sea view front and lagoon behind" },
      { ar: "أثاث جديد", en: "New furniture" },
      { ar: "٦ كروت بحر", en: "6 sea cards" },
      { ar: "أجهزة منزلية جديدة", en: "New home appliances" },
      { ar: "حمامان", en: "Two bathrooms" },
    ],
    coverImage: `${BLANCA_BASE}/01-living-balcony.png`,
    gallery: [
      `${BLANCA_BASE}/01-living-balcony.png`,
      `${BLANCA_BASE}/02-living-wide.png`,
      `${BLANCA_BASE}/03-living-view.png`,
      `${BLANCA_BASE}/04-living-sofa.png`,
      `${BLANCA_BASE}/05-living-detail.png`,
      `${BLANCA_BASE}/06-living-angle.png`,
      `${BLANCA_BASE}/07-tv-area.png`,
      `${BLANCA_BASE}/08-kitchen.png`,
      `${BLANCA_BASE}/09-bathroom.png`,
      `${BLANCA_BASE}/10-bedroom.jpg`,
    ],
    whatsappMessage: {
      ar: "مرحبًا، مهتم بإيجار شاليه بلانكا 204/101 — ٣ غرف",
      en: "Hi, I'm interested in renting the Blanca 204/101 three-bedroom chalet",
    },
  },
  {
    id: "stella-heights-292",
    slug: "stella-heights-292",
    visible: true,
    sortOrder: 3,
    title: {
      ar: "فيلا ستيلا هايتس — ٢٩٢",
      en: "Stella Heights Villa — 292",
    },
    location: {
      ar: "ستيلا هايتس · سيدي عبد الرحمن · ٢٩٢",
      en: "Stella Heights · Sidi Abdel Rahman · 292",
    },
    summary: {
      ar: "٣ غرف نوم، ٣ حمامات، صالة واسعة (الأريكة تتحول لسرير)، حديقة خاصة، فيو حمام سباحة ولاندسكيب وفيو بحر من السطح — من المالك، عائلات فقط.",
      en: "3 bedrooms, 3 baths, wide living (sofa converts to bed), private garden, pool & landscape view plus sea view from the roof — from owner, families only.",
    },
    bedrooms: 3,
    bathrooms: 3,
    familyOnly: true,
    fromOwner: true,
    features: [
      { ar: "متاح للإيجار", en: "Available for rental" },
      { ar: "من المالك مباشرة", en: "From owner" },
      { ar: "تكييف لكل الغرف والصالة", en: "Air conditioning in all rooms and living" },
      { ar: "عائلات فقط", en: "Family only" },
      { ar: "٣ غرف نوم", en: "3 bedrooms" },
      { ar: "صالة واسعة — الأريكة تتحول لسرير", en: "Wide living with sofa that converts to a bed" },
      { ar: "فيو حمام سباحة ولاندسكيب", en: "Pool and landscape view" },
      { ar: "فيو بحر من السطح", en: "Sea view from roof" },
      { ar: "حديقة خاصة", en: "Special garden" },
      { ar: "أثاث جديد", en: "New furniture" },
      { ar: "٨ كروت بحر", en: "8 sea cards" },
      { ar: "أجهزة منزلية جديدة", en: "New home appliances" },
      { ar: "٣ حمامات", en: "Three bathrooms" },
    ],
    coverImage: `${STELLA_BASE}/01-villa-front.jpg`,
    gallery: [
      `${STELLA_BASE}/01-villa-front.jpg`,
      `${STELLA_BASE}/02-garden-patio.jpg`,
      `${STELLA_BASE}/03-patio-garden.jpg`,
      `${STELLA_BASE}/06-pool-view.jpg`,
      `${STELLA_BASE}/04-resort-overview.jpg`,
      `${STELLA_BASE}/05-landscape-view.jpg`,
      `${STELLA_BASE}/08-living-dining.png`,
      `${STELLA_BASE}/11-living-sofa.png`,
      `${STELLA_BASE}/12-living-wide.jpg`,
      `${STELLA_BASE}/09-tv-area.jpg`,
      `${STELLA_BASE}/07-hallway.jpg`,
      `${STELLA_BASE}/10-staircase.png`,
      `${STELLA_BASE}/13-bedroom-master.jpg`,
      `${STELLA_BASE}/14-bedroom-twins.png`,
      `${STELLA_BASE}/15-bedroom-bunks.jpg`,
      `${STELLA_BASE}/16-kitchen-appliances.jpg`,
      `${STELLA_BASE}/17-kitchen-corner.jpg`,
      `${STELLA_BASE}/18-kitchen-detail.jpg`,
    ],
    whatsappMessage: {
      ar: "مرحبًا، مهتم بإيجار فيلا ستيلا هايتس ٢٩٢ — سيدي عبد الرحمن",
      en: "Hi, I'm interested in renting Stella Heights Villa 292 — Sidi Abdel Rahman",
    },
  },
];

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
  venues: "سهرات",
  gallery: "معرض الصور",
  coverage: "قسم التغطية / SEO",
  testimonials: "سكرينات واتساب",
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
