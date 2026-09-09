/** Arabic labels for TrackedLink placements shown in the admin clicks table. */

const EXACT: Record<string, string> = {
  "hero-cta": "هيرو — واتساب",
  "home-exclusive-cta": "الدخول الحصري — واتساب",
  "promo-ticker": "الشريط المتحرك",
  "floating-button": "زر الواتساب الطاير",
  "footer-whatsapp": "فوتر — واتساب",
  "footer-snapchat": "فوتر — سناب شات",
  "mobile-menu-snapchat": "قائمة الموبايل — سناب",
  "about-cta": "صفحة عن سهرة",
  "form-success": "فورم الحجز — بعد الإرسال",
  "form-direct": "فورم الحجز — واتساب مباشر",
  "form-snapchat": "فورم الحجز — سناب",
  "snapchat-card": "كارت سناب شات",
  "terms-contact": "صفحة الشروط",
  "privacy-contact": "صفحة الخصوصية",
  "cars-airport-cta": "عربيات — استقبال المطار",
};

const PREFIX: { prefix: string; label: (rest: string) => string }[] = [
  {
    prefix: "cars-book-",
    label: (slug) => `أسطول العربيات — احجز (${slug})`,
  },
  {
    prefix: "car-detail-book-",
    label: (slug) => `تفاصيل عربية — احجز (${slug})`,
  },
  {
    prefix: "venue-book-",
    label: (slug) => `سهرات — احجز (${slug})`,
  },
  {
    prefix: "venue-detail-",
    label: (slug) => `تفاصيل سهرة — ${slug}`,
  },
  {
    prefix: "nightclub-book-",
    label: (slug) => `نايت كلوب — احجز (${slug})`,
  },
  {
    prefix: "nightclub-detail-",
    label: (slug) => `تفاصيل نايت كلوب — ${slug}`,
  },
  {
    prefix: "beach-book-",
    label: (slug) => `شواطئ — احجز (${slug})`,
  },
  {
    prefix: "beach-detail-",
    label: (slug) => `تفاصيل شاطئ — ${slug}`,
  },
  {
    prefix: "chalet-detail-",
    label: (slug) => `شاليه — ${slug}`,
  },
];

export function placementLabel(placement: string): string {
  if (!placement) return "—";
  if (EXACT[placement]) return EXACT[placement];
  for (const rule of PREFIX) {
    if (placement.startsWith(rule.prefix)) {
      return rule.label(placement.slice(rule.prefix.length));
    }
  }
  return placement;
}

export type PlacementGroup =
  | "cars"
  | "exclusive"
  | "hero"
  | "venues"
  | "nightclubs"
  | "beaches"
  | "chalets"
  | "form"
  | "footer"
  | "other";

export const PLACEMENT_GROUP_LABELS: Record<PlacementGroup, string> = {
  cars: "عربيات VIP",
  exclusive: "دخول حصري",
  hero: "هيرو",
  venues: "سهرات",
  nightclubs: "نايت كلوب",
  beaches: "شواطئ",
  chalets: "شاليهات",
  form: "فورم الحجز",
  footer: "فوتر / عائم",
  other: "أخرى",
};

export function placementGroup(placement: string): PlacementGroup {
  if (
    placement.startsWith("cars-") ||
    placement.startsWith("car-detail-") ||
    placement === "cars-airport-cta"
  ) {
    return "cars";
  }
  if (placement === "home-exclusive-cta") return "exclusive";
  if (placement === "hero-cta" || placement === "promo-ticker") return "hero";
  if (placement.startsWith("venue-")) return "venues";
  if (placement.startsWith("nightclub-")) return "nightclubs";
  if (placement.startsWith("beach-")) return "beaches";
  if (placement.startsWith("chalet-")) return "chalets";
  if (placement.startsWith("form-")) return "form";
  if (
    placement.startsWith("footer-") ||
    placement === "floating-button" ||
    placement === "mobile-menu-snapchat"
  ) {
    return "footer";
  }
  return "other";
}

/** Quick links shown in the admin overview. */
export const SITE_PAGES = [
  { href: "/ar", label: "الرئيسية" },
  { href: "/ar/venues", label: "سهرات" },
  { href: "/ar/nightclubs", label: "نايت كلوب" },
  { href: "/ar/beaches", label: "الشواطئ" },
  { href: "/ar/gallery", label: "المعرض" },
  { href: "/ar/chalets", label: "الشاليهات" },
  { href: "/ar/cars", label: "عربيات VIP" },
  { href: "/ar/about", label: "عن سهرة" },
  { href: "/ar/trust", label: "ليه تختارنا" },
] as const;
