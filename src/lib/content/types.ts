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
const FAYA_BASE = "/chalets/faya-ground-garden";
const CATANIA_BASE = "/chalets/catania-ground-studio";
const LIA_BASE = "/chalets/lia-2bedroom";
const MARASSI_3BED_BASE = "/chalets/marassi-marina-3bedroom";

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
  {
    id: "faya-ground-garden",
    slug: "faya-ground-garden",
    visible: true,
    sortOrder: 4,
    title: {
      ar: "شاليه فايا — أرضي بجنينة",
      en: "Faya Chalet — Ground with Garden",
    },
    location: {
      ar: "فايا · الشالية الرابع · أرضي",
      en: "Faya · Unit 4 · Ground floor",
    },
    summary: {
      ar: "غرفة نوم واحدة، أرضي بجنينة، خطوات من حمامات السباحة — صالة ومطبخ وحمام، من المالك.",
      en: "One bedroom, ground floor with garden, steps to swimming pools — living, kitchen, and bath, from owner.",
    },
    bedrooms: 1,
    bathrooms: 1,
    familyOnly: true,
    fromOwner: true,
    features: [
      { ar: "متاح للإيجار", en: "Available for rental" },
      { ar: "من المالك مباشرة", en: "From owner" },
      { ar: "غرفة نوم واحدة", en: "One bedroom" },
      { ar: "أرضي بجنينة", en: "Ground floor with garden" },
      { ar: "خطوات من حمامات السباحة", en: "Steps to swimming pools" },
      { ar: "صالة مفتوحة على المطبخ", en: "Open living with kitchen" },
      { ar: "حمام", en: "Bathroom" },
      { ar: "عائلات فقط", en: "Family only" },
    ],
    coverImage: `${FAYA_BASE}/01-garden-patio.jpg`,
    gallery: [
      `${FAYA_BASE}/01-garden-patio.jpg`,
      `${FAYA_BASE}/02-garden-view.jpg`,
      `${FAYA_BASE}/03-living-garden.jpg`,
      `${FAYA_BASE}/04-living-kitchen.jpg`,
      `${FAYA_BASE}/05-living-wide.jpg`,
      `${FAYA_BASE}/06-living-entrance.jpg`,
      `${FAYA_BASE}/07-kitchen-bar.jpg`,
      `${FAYA_BASE}/08-bedroom.jpg`,
      `${FAYA_BASE}/09-bathroom.jpg`,
    ],
    whatsappMessage: {
      ar: "مرحبًا، مهتم بإيجار شاليه فايا الأرضي بجنينة — الشالية الرابع",
      en: "Hi, I'm interested in renting the Faya ground-floor garden chalet — unit 4",
    },
  },
  {
    id: "catania-ground-studio",
    slug: "catania-ground-studio",
    visible: true,
    sortOrder: 5,
    title: {
      ar: "استوديو كاتانيا — أرضي",
      en: "Catania Studio — Ground Floor",
    },
    location: {
      ar: "كاتانيا · الشالية الخامس · أرضي",
      en: "Catania · Unit 5 · Ground floor",
    },
    summary: {
      ar: "استوديو أرضي بجنينة/تراس، صالة وتلفزيون، مطبخ كامل، غرفة نوم بإطلالة على الحديقة — من المالك.",
      en: "Ground-floor studio with garden patio, living with TV, full kitchen, bedroom opening to the garden — from owner.",
    },
    bedrooms: 1,
    bathrooms: 1,
    familyOnly: true,
    fromOwner: true,
    features: [
      { ar: "متاح للإيجار", en: "Available for rental" },
      { ar: "من المالك مباشرة", en: "From owner" },
      { ar: "استوديو أرضي", en: "Ground-floor studio" },
      { ar: "تراس على الجنينة", en: "Patio overlooking the garden" },
      { ar: "صالة وتلفزيون", en: "Living area with TV" },
      { ar: "مطبخ كامل", en: "Full kitchen" },
      { ar: "غرفة نوم", en: "Bedroom" },
      { ar: "عائلات فقط", en: "Family only" },
    ],
    coverImage: `${CATANIA_BASE}/01-patio-garden.jpg`,
    gallery: [
      `${CATANIA_BASE}/01-patio-garden.jpg`,
      `${CATANIA_BASE}/02-living-sofa.jpg`,
      `${CATANIA_BASE}/03-living-tv.jpg`,
      `${CATANIA_BASE}/04-living-garden.jpg`,
      `${CATANIA_BASE}/05-living-dining.jpg`,
      `${CATANIA_BASE}/06-kitchen.jpg`,
      `${CATANIA_BASE}/07-bedroom.jpg`,
    ],
    whatsappMessage: {
      ar: "مرحبًا، مهتم بإيجار استوديو كاتانيا الأرضي — الشالية الخامس",
      en: "Hi, I'm interested in renting the Catania ground-floor studio — unit 5",
    },
  },
  {
    id: "lia-2bedroom",
    slug: "lia-2bedroom",
    visible: true,
    sortOrder: 6,
    title: {
      ar: "شاليه ليا — غرفتين",
      en: "Lia Chalet — 2 Bedroom",
    },
    location: {
      ar: "ليا · الشالية السادس · غرفتين",
      en: "Lia · Unit 6 · 2 bedroom",
    },
    summary: {
      ar: "غرفتين نوم، صالة واسعة، سفرة ومطبخ، حمام، جنينة خاصة — من المالك، عائلات فقط.",
      en: "2 bedrooms, wide living, dining and kitchen, bathroom, private garden — from owner, families only.",
    },
    bedrooms: 2,
    bathrooms: 1,
    familyOnly: true,
    fromOwner: true,
    features: [
      { ar: "متاح للإيجار", en: "Available for rental" },
      { ar: "من المالك مباشرة", en: "From owner" },
      { ar: "غرفتين نوم", en: "2 bedrooms" },
      { ar: "صالة واسعة", en: "Wide living area" },
      { ar: "سفرة ومطبخ", en: "Dining and kitchen" },
      { ar: "جنينة خاصة", en: "Private garden" },
      { ar: "تكييف", en: "Air conditioning" },
      { ar: "عائلات فقط", en: "Family only" },
    ],
    coverImage: `${LIA_BASE}/01.jpg`,
    gallery: Array.from({ length: 41 }, (_, i) => `${LIA_BASE}/${String(i + 1).padStart(2, "0")}.jpg`),
    whatsappMessage: {
      ar: "مرحبًا، مهتم بإيجار شاليه ليا غرفتين — الشالية السادس",
      en: "Hi, I'm interested in renting the Lia two-bedroom chalet — unit 6",
    },
  },
  {
    id: "marassi-marina-3bedroom",
    slug: "marassi-marina-3bedroom",
    visible: true,
    sortOrder: 7,
    title: {
      ar: "شاليه مراسي — ٣ غرف · مارينا",
      en: "Marassi Chalet — 3 Bedroom · Marina",
    },
    location: {
      ar: "مراسي · مارينا · ٣ غرف",
      en: "Marassi · Marina · 3 bedrooms",
    },
    summary: {
      ar: "٣ غرف نوم، صالة واسعة وبلكونة على حمامات السباحة، سفرة ومطبخ كامل — من المالك، عائلات فقط.",
      en: "3 bedrooms, wide living with balcony overlooking the pools, dining and full kitchen — from owner, families only.",
    },
    bedrooms: 3,
    bathrooms: 2,
    familyOnly: true,
    fromOwner: true,
    features: [
      { ar: "متاح للإيجار", en: "Available for rental" },
      { ar: "من المالك مباشرة", en: "From owner" },
      { ar: "٣ غرف نوم", en: "3 bedrooms" },
      { ar: "بلكونة بإطلالة على حمامات السباحة", en: "Balcony with pool view" },
      { ar: "صالة واسعة", en: "Wide living area" },
      { ar: "سفرة ومطبخ كامل", en: "Dining and full kitchen" },
      { ar: "تكييف", en: "Air conditioning" },
      { ar: "عائلات فقط", en: "Family only" },
    ],
    coverImage: `${MARASSI_3BED_BASE}/01.jpg`,
    gallery: Array.from(
      { length: 38 },
      (_, i) => `${MARASSI_3BED_BASE}/${String(i + 1).padStart(2, "0")}.jpg`,
    ),
    whatsappMessage: {
      ar: "مرحبًا، مهتم بإيجار شاليه مراسي مارينا ٣ غرف",
      en: "Hi, I'm interested in renting the Marassi Marina 3-bedroom chalet",
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
