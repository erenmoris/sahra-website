export type Venue = {
  name: string;
  nameAr: string;
  /** Extra spellings people type into Google. */
  aliases?: string[];
};

/**
 * Venues we take reservations for. Listed on the home page and used as search
 * keywords so the site can surface for "<venue> booking" style queries.
 */
export const venues: Venue[] = [
  { name: "Lemon Tree & Co", nameAr: "ليمون تري آند كو", aliases: ["Lemon Tree and Co", "ليمون تري"] },
  { name: "Amelia", nameAr: "أميليا", aliases: ["Amelia Beirut", "أميليا بيروت"] },
  { name: "Ava", nameAr: "آفا" },
  { name: "Esca Cueva", nameAr: "إسكا كويفا", aliases: ["Esca", "إسكا"] },
  { name: "Esca Playa", nameAr: "إسكا بلايا" },
  { name: "The Origin", nameAr: "ذا أوريجين", aliases: ["Origin"] },
  { name: "Dusit", nameAr: "دوسيت" },
  { name: "Moon Deck", nameAr: "مون ديك", aliases: ["Moondeck"] },
  { name: "Rovi", nameAr: "روفي" },
  { name: "Me Bar", nameAr: "مي بار", aliases: ["ME Bar"] },
  { name: "Satchi", nameAr: "ساتشي" },
  { name: "Villa Coconut", nameAr: "فيلا كوكونت" },
  { name: "Sangria", nameAr: "سانجريا" },
  { name: "Idol", nameAr: "أيدول" },
  { name: "Outdoor", nameAr: "أوت دور", aliases: ["Out Door"] },
  { name: "Mood Bar", nameAr: "مود بار", aliases: ["Moodbar"] },
  { name: "Anzu Rooftop", nameAr: "أنزو روفتوب", aliases: ["Anzu", "أنزو"] },
];

export function venueName(venue: Venue, locale: string): string {
  return locale === "ar" ? venue.nameAr : venue.name;
}

/** Every spelling of every venue, for metadata keywords. */
export const venueKeywords: string[] = venues.flatMap((venue) => [
  venue.name,
  venue.nameAr,
  ...(venue.aliases ?? []),
]);
