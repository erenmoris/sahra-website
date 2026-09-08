export type VenueRegion = "sahel";

export type Venue = {
  slug: string;
  name: string;
  nameAr: string;
  /** Where this venue appears in logo tickers. */
  regions: VenueRegion[];
  /** Area line shown on venue cards, e.g. "Marassi · North Coast". */
  area: string;
  areaAr: string;
  /** Extra spellings people type into Google. */
  aliases?: string[];
  /** Optional filename slug under /venues/logos when different from `slug`. */
  logoSlug?: string;
};

/**
 * Nightlife venues listed on /venues (North Coast party directory).
 * Sourced to match the public party listing set; Sahra books independently.
 */
export const venues: Venue[] = [
  {
    slug: "lemon-tree",
    name: "Lemon tree",
    nameAr: "ليمون تري",
    regions: ["sahel"],
    area: "Hacienda White · North Coast",
    areaAr: "هاسيندا وايت · الساحل الشمالي",
    aliases: ["Lemon Tree", "Lemon Tree & Co", "ليمون تري آند كو"],
    logoSlug: "lemon-tree-and-co",
  },
  {
    slug: "lucida",
    name: "Lucida",
    nameAr: "لوسيدا",
    regions: ["sahel"],
    area: "Hacienda Red · North Coast",
    areaAr: "هاسيندا ريد · الساحل الشمالي",
    aliases: ["Lucida Coast", "Lucida Hacienda", "لوسيدا كوست"],
    logoSlug: "lucida",
  },
  {
    slug: "galambo",
    name: "Galambo",
    nameAr: "جالامبو",
    regions: ["sahel"],
    area: "Hacienda White · North Coast",
    areaAr: "هاسيندا وايت · الساحل الشمالي",
  },
  {
    slug: "kikis",
    name: "Kiki's",
    nameAr: "كيكيز",
    regions: ["sahel"],
    area: "Hacienda White · North Coast",
    areaAr: "هاسيندا وايت · الساحل الشمالي",
    aliases: ["Kiki's Beach", "Kikis", "كيكيز بيتش"],
    logoSlug: "kikis-beach",
  },
  {
    slug: "rituals",
    name: "Rituals",
    nameAr: "ريتوالز",
    regions: ["sahel"],
    area: "Ghazala Bay · North Coast",
    areaAr: "غزالة باي · الساحل الشمالي",
  },
  {
    slug: "pier-88",
    name: "Pier 88",
    nameAr: "بيير ٨٨",
    regions: ["sahel"],
    area: "Almaza Bay · North Coast",
    areaAr: "ألماظة باي · الساحل الشمالي",
    aliases: ["Pier88", "Pier 88 Almaza"],
  },
  {
    slug: "esca",
    name: "Esca",
    nameAr: "إسكا",
    regions: ["sahel"],
    area: "PLAYA · North Coast",
    areaAr: "بلايا · الساحل الشمالي",
    aliases: ["Esca Playa", "إسكا بلايا"],
    logoSlug: "esca-playa",
  },
  {
    slug: "gar-alamar",
    name: "Gar Alamar",
    nameAr: "جار الامار",
    regions: ["sahel"],
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
  },
  {
    slug: "el-barrio",
    name: "El-Barrio",
    nameAr: "إل باريو",
    regions: ["sahel"],
    area: "Stella De Mare, Sidi Abdelrahman · North Coast",
    areaAr: "ستيلا دي ماري، سيدي عبد الرحمن · الساحل الشمالي",
    aliases: ["El Barrio", "Barrio"],
  },
  {
    slug: "surf-club",
    name: "Surf Club",
    nameAr: "سيرف كلوب",
    regions: ["sahel"],
    area: "Hacienda Red · North Coast",
    areaAr: "هاسيندا ريد · الساحل الشمالي",
  },
  {
    slug: "baia",
    name: "Baia",
    nameAr: "بايا",
    regions: ["sahel"],
    area: "Bianchi · North Coast",
    areaAr: "بيانكي · الساحل الشمالي",
  },
  {
    slug: "sass",
    name: "Sass",
    nameAr: "ساس",
    regions: ["sahel"],
    area: "Hacienda Bay · North Coast",
    areaAr: "هاسيندا باي · الساحل الشمالي",
    aliases: ["Sass Beach", "Sass Beach Bar", "ساس بيتش"],
    logoSlug: "sass-beach",
  },
  {
    slug: "sol-beach",
    name: "Sol Beach",
    nameAr: "سول بيتش",
    regions: ["sahel"],
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
  },
  {
    slug: "the-smokery-beach",
    name: "The smokery beach",
    nameAr: "ذا سموكري بيتش",
    regions: ["sahel"],
    area: "Bianchi · North Coast",
    areaAr: "بيانكي · الساحل الشمالي",
    aliases: ["The Smokery", "Smokery", "سموكري"],
    logoSlug: "the-smokery",
  },
  {
    slug: "cocoon",
    name: "Cocoon",
    nameAr: "كوكوون",
    regions: ["sahel"],
    area: "Sidi AbdulRahman · North Coast",
    areaAr: "سيدي عبد الرحمن · الساحل الشمالي",
  },
  {
    slug: "maasoom",
    name: "Maa'soom",
    nameAr: "معصوم",
    regions: ["sahel"],
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
    aliases: ["Maasoom", "Masoom"],
  },
  {
    slug: "at-9",
    name: "At / 9",
    nameAr: "آت / ٩",
    regions: ["sahel"],
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
    aliases: ["At 9", "At/9", "AT9"],
  },
  {
    slug: "amelia-beirut",
    name: "Amelia Beirut",
    nameAr: "أميليا بيروت",
    regions: ["sahel"],
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
    aliases: ["Amelia", "أميليا"],
  },
  {
    slug: "la-casa",
    name: "La Casa",
    nameAr: "لا كاسا",
    regions: ["sahel"],
    area: "Sidi AbdulRahman · North Coast",
    areaAr: "سيدي عبد الرحمن · الساحل الشمالي",
  },
  {
    slug: "o-by-michel",
    name: "O by michel",
    nameAr: "أو باي ميشيل",
    regions: ["sahel"],
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
    aliases: ["O by Michel", "O By Michel"],
  },
  {
    slug: "greeka",
    name: "GREEKA",
    nameAr: "غريكا",
    regions: ["sahel"],
    area: "AL Dabaa · North Coast",
    areaAr: "الضبعة · الساحل الشمالي",
    aliases: ["Greeka"],
  },
  {
    slug: "taratsa",
    name: "Taratsa",
    nameAr: "تاراتسا",
    regions: ["sahel"],
    area: "Hacienda Bay · North Coast",
    areaAr: "هاسيندا باي · الساحل الشمالي",
  },
  {
    slug: "sky-20",
    name: "Sky 20",
    nameAr: "سكاي ٢٠",
    regions: ["sahel"],
    area: "Sidi AbdulRahman · North Coast",
    areaAr: "سيدي عبد الرحمن · الساحل الشمالي",
    aliases: ["Sky20"],
  },
  {
    slug: "perle",
    name: "Perle",
    nameAr: "بيرل",
    regions: ["sahel"],
    area: "Sidi AbdulRahman · North Coast",
    areaAr: "سيدي عبد الرحمن · الساحل الشمالي",
  },
  {
    slug: "sangria-restaurant",
    name: "Sangria Restaurant",
    nameAr: "سانجريا",
    regions: ["sahel"],
    area: "New Alamein · North Coast",
    areaAr: "العلمين الجديدة · الساحل الشمالي",
    aliases: ["Sangria", "سانجريا مطعم"],
    logoSlug: "sangria",
  },
  {
    slug: "bar-du-port",
    name: "Bar Du Port",
    nameAr: "بار دو بور",
    regions: ["sahel"],
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
    aliases: ["Bar du Port"],
  },
  {
    slug: "cocoya",
    name: "Cocoya",
    nameAr: "كوكويا",
    regions: ["sahel"],
    area: "Ghazalla luxury collection hotel · North Coast",
    areaAr: "غزالة · الساحل الشمالي",
  },
  {
    slug: "iris",
    name: "Iris",
    nameAr: "آيرس",
    regions: ["sahel"],
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
  },
  {
    slug: "charl",
    name: "Charl",
    nameAr: "تشارل",
    regions: ["sahel"],
    area: "Telal · North Coast",
    areaAr: "تلال · الساحل الشمالي",
  },
  {
    slug: "sachi",
    name: "Sachi",
    nameAr: "ساشي",
    regions: ["sahel"],
    area: "North Coast",
    areaAr: "الساحل الشمالي",
    aliases: ["Satchi", "ساتشي"],
  },
];

/** North Coast venues — used for the Sahel scrolling logo strip on the home page. */
export const sahelVenues: Venue[] = venues.filter((v) => v.regions.includes("sahel"));

export function venueName(venue: Venue, locale: string): string {
  return locale === "ar" ? venue.nameAr : venue.name;
}

export function venueArea(venue: Venue, locale: string): string {
  return locale === "ar" ? venue.areaAr : venue.area;
}

export function venueLogoKey(venue: Venue): string {
  return venue.logoSlug ?? venue.slug;
}

/** Prefer downloaded cover photo when present. */
export function venueCoverPath(venue: Venue): string {
  return `/venues/covers/${venue.slug}.webp`;
}

export function getVenueBySlug(slug: string): Venue | undefined {
  return venues.find((v) => v.slug === slug);
}

export function getAllVenueSlugs(): string[] {
  return venues.map((v) => v.slug);
}

/** Every spelling of every venue, for metadata keywords. */
export const venueKeywords: string[] = venues.flatMap((venue) => [
  venue.name,
  venue.nameAr,
  venue.area,
  venue.areaAr,
  ...(venue.aliases ?? []),
]);
