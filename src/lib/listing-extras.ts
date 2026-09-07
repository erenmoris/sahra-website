import extrasJson from "@/content/listing-extras.json";

export type ListingExtra = {
  about: string;
  mapsUrl: string;
  gallery: string[];
};

type ExtrasFile = {
  venues: Record<string, ListingExtra>;
  beaches: Record<string, ListingExtra>;
};

const extras = extrasJson as ExtrasFile;

export function getVenueExtra(slug: string): ListingExtra {
  return extras.venues[slug] ?? { about: "", mapsUrl: "", gallery: [] };
}

export function getBeachExtra(slug: string): ListingExtra {
  return extras.beaches[slug] ?? { about: "", mapsUrl: "", gallery: [] };
}
