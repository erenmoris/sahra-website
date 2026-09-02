export type VenueRegion = "sahel" | "cairo";

export type Venue = {
  slug: string;
  name: string;
  nameAr: string;
  /** Where this venue appears in logo tickers (a brand may span both). */
  regions: VenueRegion[];
  /** Extra spellings people type into Google. */
  aliases?: string[];
};

/**
 * Venues we take reservations for. Listed on the home page logo tickers (Sahel + Cairo)
 * and used as search keywords so the site can surface for "<venue> booking" queries.
 */
export const venues: Venue[] = [
  // ── North Coast (Sahel) ─────────────────────────────────────────────────────
  { slug: "lemon-tree-and-co", name: "Lemon Tree & Co", nameAr: "ليمون تري آند كو", regions: ["sahel", "cairo"], aliases: ["Lemon Tree and Co", "ليمون تري"] },
  { slug: "amelia", name: "Amelia", nameAr: "أميليا", regions: ["sahel"], aliases: ["Amelia By The Sea", "Amelia Beirut", "أميليا بيروت"] },
  { slug: "esca-playa", name: "Esca Playa", nameAr: "إسكا بلايا", regions: ["sahel"] },
  { slug: "sachi", name: "Sachi", nameAr: "ساشي", regions: ["sahel", "cairo"], aliases: ["Satchi", "Sachi by the Sea", "ساتشي"] },
  { slug: "kikis-beach", name: "Kiki's Beach", nameAr: "كيكيز بيتش", regions: ["sahel"], aliases: ["Kikis", "كيكيز"] },
  { slug: "ahm-sahel", name: "AHM Sahel", nameAr: "أيه إتش إم ساحل", regions: ["sahel"], aliases: ["AHM", "أيه إتش إم"] },
  { slug: "kyma-beach", name: "Kyma Beach", nameAr: "كيما بيتش", regions: ["sahel"], aliases: ["Kyma", "كيما"] },
  { slug: "lucida-coast", name: "Lucida Coast", nameAr: "لوسيدا كوست", regions: ["sahel"], aliases: ["Lucida Hacienda", "لوسيدا ساحل"] },
  { slug: "sass-beach", name: "Sass Beach Bar", nameAr: "ساس بيتش", regions: ["sahel"], aliases: ["Sass", "ساس"] },
  { slug: "the-smokery", name: "The Smokery", nameAr: "ذا سموكري", regions: ["sahel", "cairo"], aliases: ["Smokery", "سموكري"] },
  { slug: "pier-88", name: "Pier 88", nameAr: "بيير ٨٨", regions: ["sahel", "cairo"], aliases: ["Pier88", "Pier 88 Nile", "Pier 88 Almaza"] },
  { slug: "nobu-ogami", name: "Nobu", nameAr: "نوبو", regions: ["sahel"], aliases: ["Nobu Ogami", "Nobu North Coast", "نوبو أوجامي"] },
  { slug: "villa-coconut", name: "Villa Coconut", nameAr: "فيلا كوكونت", regions: ["sahel"], aliases: ["Villa Coconut North Coast"] },

  // ── Cairo ───────────────────────────────────────────────────────────────────
  { slug: "ava", name: "Ava", nameAr: "آفا", regions: ["cairo"], aliases: ["Club Ava"] },
  { slug: "esca-cueva", name: "Esca Cueva", nameAr: "إسكا كويفا", regions: ["cairo"], aliases: ["Esca", "إسكا"] },
  { slug: "the-origin", name: "The Origin", nameAr: "ذا أوريجين", regions: ["cairo"], aliases: ["Origin", "The Origins"] },
  { slug: "rovi", name: "Rovi", nameAr: "روفي", regions: ["cairo"] },
  { slug: "me-bar", name: "Me Bar", nameAr: "مي بار", regions: ["cairo"], aliases: ["ME Bar"] },
  { slug: "sangria", name: "Sangria", nameAr: "سانجريا", regions: ["cairo"] },
  { slug: "idol", name: "Idol", nameAr: "أيدول", regions: ["cairo"] },
  { slug: "outdoor", name: "Outdoor", nameAr: "أوت دور", regions: ["cairo"], aliases: ["Out Door"] },
  { slug: "mood-bar", name: "Mood Bar", nameAr: "مود بار", regions: ["cairo"], aliases: ["Moodbar"] },
  { slug: "anzu-rooftop", name: "Anzu Rooftop", nameAr: "أنزو روفتوب", regions: ["cairo"], aliases: ["Anzu", "أنزو"] },
  { slug: "tap-east", name: "Tap East", nameAr: "تاب إيست", regions: ["cairo"] },
  { slug: "opia", name: "Opia", nameAr: "أوبيا", regions: ["cairo"] },
  { slug: "little-lexies", name: "Little Lexie's", nameAr: "ليتل ليكسيز", regions: ["cairo"], aliases: ["Lexies", "ليكسيز"] },
  { slug: "kazoku", name: "Kazoku", nameAr: "كازوكو", regions: ["cairo"] },
  { slug: "riverside", name: "Riverside", nameAr: "ريفرسايد", regions: ["cairo"], aliases: ["Riverside Cairo"] },
  { slug: "lucida", name: "Lucida", nameAr: "لوسيدا", regions: ["cairo"], aliases: ["Lucida Cairo", "لوسيدا القاهرة"] },
];

/** North Coast venues — used for the Sahel scrolling logo strip on the home page. */
export const sahelVenues: Venue[] = venues.filter((v) => v.regions.includes("sahel"));

/** Cairo venues — used for the Cairo scrolling logo strip on the home page. */
export const cairoVenues: Venue[] = venues.filter((v) => v.regions.includes("cairo"));

export function venueName(venue: Venue, locale: string): string {
  return locale === "ar" ? venue.nameAr : venue.name;
}

/** Every spelling of every venue, for metadata keywords. */
export const venueKeywords: string[] = venues.flatMap((venue) => [
  venue.name,
  venue.nameAr,
  ...(venue.aliases ?? []),
]);
