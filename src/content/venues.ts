export type VenueRegion = "sahel" | "cairo";

export type Venue = {
  slug: string;
  name: string;
  nameAr: string;
  region: VenueRegion;
  /** Extra spellings people type into Google. */
  aliases?: string[];
};

/**
 * Venues we take reservations for. Listed on the home page ticker (Sahel logos)
 * and used as search keywords so the site can surface for "<venue> booking" queries.
 */
export const venues: Venue[] = [
  // North Coast (Sahel) — shown in the logo ticker
  { slug: "lemon-tree-and-co", name: "Lemon Tree & Co", nameAr: "ليمون تري آند كو", region: "sahel", aliases: ["Lemon Tree and Co", "ليمون تري"] },
  { slug: "amelia", name: "Amelia", nameAr: "أميليا", region: "sahel", aliases: ["Amelia Beirut", "أميليا بيروت"] },
  { slug: "esca-playa", name: "Esca Playa", nameAr: "إسكا بلايا", region: "sahel" },
  { slug: "satchi", name: "Satchi", nameAr: "ساتشي", region: "sahel" },
  { slug: "kikis-beach", name: "Kiki's Beach", nameAr: "كيكيز بيتش", region: "sahel", aliases: ["Kikis", "كيكيز"] },
  { slug: "ahm-sahel", name: "AHM Sahel", nameAr: "أيه إتش إم ساحل", region: "sahel", aliases: ["AHM", "أيه إتش إم"] },
  { slug: "kyma-beach", name: "Kyma Beach", nameAr: "كيما بيتش", region: "sahel", aliases: ["Kyma", "كيما"] },
  { slug: "lucida", name: "Lucida", nameAr: "لوسيدا", region: "sahel" },
  { slug: "sass-beach", name: "Sass Beach Bar", nameAr: "ساس بيتش", region: "sahel", aliases: ["Sass", "ساس"] },
  { slug: "the-smokery", name: "The Smokery", nameAr: "ذا سموكري", region: "sahel", aliases: ["Smokery", "سموكري"] },
  { slug: "pier-88", name: "Pier 88", nameAr: "بيير ٨٨", region: "sahel", aliases: ["Pier88"] },
  { slug: "nobu-ogami", name: "Nobu", nameAr: "نوبو", region: "sahel", aliases: ["Nobu Ogami", "نوبو أوجامي"] },
  // Cairo — SEO keywords only (not in the Sahel logo ticker)
  { slug: "ava", name: "Ava", nameAr: "آفا", region: "cairo" },
  { slug: "esca-cueva", name: "Esca Cueva", nameAr: "إسكا كويفا", region: "cairo", aliases: ["Esca", "إسكا"] },
  { slug: "the-origin", name: "The Origin", nameAr: "ذا أوريجين", region: "cairo", aliases: ["Origin"] },
  { slug: "rovi", name: "Rovi", nameAr: "روفي", region: "cairo" },
  { slug: "me-bar", name: "Me Bar", nameAr: "مي بار", region: "cairo", aliases: ["ME Bar"] },
  { slug: "villa-coconut", name: "Villa Coconut", nameAr: "فيلا كوكونت", region: "cairo" },
  { slug: "sangria", name: "Sangria", nameAr: "سانجريا", region: "cairo" },
  { slug: "idol", name: "Idol", nameAr: "أيدول", region: "cairo" },
  { slug: "outdoor", name: "Outdoor", nameAr: "أوت دور", region: "cairo", aliases: ["Out Door"] },
  { slug: "mood-bar", name: "Mood Bar", nameAr: "مود بار", region: "cairo", aliases: ["Moodbar"] },
  { slug: "anzu-rooftop", name: "Anzu Rooftop", nameAr: "أنزو روفتوب", region: "cairo", aliases: ["Anzu", "أنزو"] },
  { slug: "tap-east", name: "Tap East", nameAr: "تاب إيست", region: "cairo" },
  { slug: "opia", name: "Opia", nameAr: "أوبيا", region: "cairo" },
  { slug: "little-lexies", name: "Little Lexie's", nameAr: "ليتل ليكسيز", region: "cairo", aliases: ["Lexies", "ليكسيز"] },
  { slug: "kazoku", name: "Kazoku", nameAr: "كازوكو", region: "cairo" },
  { slug: "riverside", name: "Riverside", nameAr: "ريفرسايد", region: "cairo" },
  { slug: "bleu-vert", name: "Bleu Vert", nameAr: "بليو فيرت", region: "cairo", aliases: ["BleuVert"] },
  { slug: "kanter", name: "Kanter", nameAr: "كانتر", region: "cairo" },
];

/** North Coast venues — used for the scrolling logo strip on the home page. */
export const sahelVenues: Venue[] = venues.filter((v) => v.region === "sahel");

export function venueName(venue: Venue, locale: string): string {
  return locale === "ar" ? venue.nameAr : venue.name;
}

/** Every spelling of every venue, for metadata keywords. */
export const venueKeywords: string[] = venues.flatMap((venue) => [
  venue.name,
  venue.nameAr,
  ...(venue.aliases ?? []),
]);
