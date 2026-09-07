export type BeachKind = "beach" | "aqua";

export type Beach = {
  slug: string;
  name: string;
  nameAr: string;
  kind: BeachKind;
  area: string;
  areaAr: string;
  aliases?: string[];
};

/**
 * Beach clubs & water parks listed on /beaches (North Coast).
 * Sourced to match the public iSahel beach catalogue; Sahra books independently.
 */
export const beaches: Beach[] = [
  {
    slug: "noya-beach",
    name: "Noya Beach",
    nameAr: "نويا بيتش",
    kind: "beach",
    area: "El Alamein · North Coast",
    areaAr: "العلمين · الساحل الشمالي",
  },
  {
    slug: "karl-beach-club",
    name: "Karl Beach Club",
    nameAr: "كارل بيتش كلوب",
    kind: "beach",
    area: "Marina El Alamein · North Coast",
    areaAr: "مارينا العلمين · الساحل الشمالي",
  },
  {
    slug: "massimo-beach-club",
    name: "Massimo Beach Club",
    nameAr: "ماسيمو بيتش كلوب",
    kind: "beach",
    area: "Marina El Alamein · North Coast",
    areaAr: "مارينا العلمين · الساحل الشمالي",
  },
  {
    slug: "kyma-beach",
    name: "Kyma Beach",
    nameAr: "كيما بيتش",
    kind: "beach",
    area: "South Med · North Coast",
    areaAr: "ساوث ميد · الساحل الشمالي",
  },
  {
    slug: "marassi-water-world",
    name: "Marassi Water World",
    nameAr: "مراسي ووتر ورلد",
    kind: "aqua",
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
    aliases: ["مراسي أكوا بارك", "Marassi Aqua"],
  },
  {
    slug: "sass",
    name: "Sass",
    nameAr: "ساس",
    kind: "beach",
    area: "Hacienda Bay · North Coast",
    areaAr: "هاسيندا باي · الساحل الشمالي",
    aliases: ["Sass Beach", "ساس بيتش"],
  },
  {
    slug: "esca",
    name: "Esca",
    nameAr: "إسكا",
    kind: "beach",
    area: "Ceasar Island · North Coast",
    areaAr: "جزيرة سيزار · الساحل الشمالي",
    aliases: ["Esca Playa", "إسكا بلايا"],
  },
  {
    slug: "kikis",
    name: "Kiki's",
    nameAr: "كيكيز",
    kind: "beach",
    area: "Hacienda White · North Coast",
    areaAr: "هاسيندا وايت · الساحل الشمالي",
    aliases: ["Kiki's Beach", "Kikis", "كيكيز بيتش"],
  },
  {
    slug: "baia",
    name: "Baia",
    nameAr: "بايا",
    kind: "beach",
    area: "Bianchi · North Coast",
    areaAr: "بيانكي · الساحل الشمالي",
  },
  {
    slug: "sol-beach",
    name: "Sol Beach",
    nameAr: "سول بيتش",
    kind: "beach",
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
  },
  {
    slug: "the-smokery-beach",
    name: "The Smokery Beach",
    nameAr: "ذا سموكري بيتش",
    kind: "beach",
    area: "Bianchi · North Coast",
    areaAr: "بيانكي · الساحل الشمالي",
    aliases: ["The smokery beach", "Smokery"],
  },
  {
    slug: "cocoon",
    name: "Cocoon",
    nameAr: "كوكون",
    kind: "beach",
    area: "Sidi AbdulRahman · North Coast",
    areaAr: "سيدي عبد الرحمن · الساحل الشمالي",
  },
  {
    slug: "maasoom",
    name: "Maa'soom",
    nameAr: "معصوم",
    kind: "beach",
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
    aliases: ["Maasoom", "معصوم بيتش"],
  },
  {
    slug: "bar-du-port",
    name: "Bar Du Port",
    nameAr: "بار دو بورت",
    kind: "beach",
    area: "Marassi · North Coast",
    areaAr: "مراسي · الساحل الشمالي",
  },
  {
    slug: "trope-beach-club",
    name: "Tropé Beach Club",
    nameAr: "تروبي بيتش كلوب",
    kind: "beach",
    area: "Ghazala · North Coast",
    areaAr: "غزالة · الساحل الشمالي",
    aliases: ["Trope Beach Club", "Trope"],
  },
  {
    slug: "babbos-taverna",
    name: "Babbo's Taverna",
    nameAr: "بابوز تافيرنا",
    kind: "beach",
    area: "Sidi Heneish Village · North Coast",
    areaAr: "قرية سيدي هنيش · الساحل الشمالي",
    aliases: ["Babbos Taverna", "Babbo"],
  },
  {
    slug: "kokomo",
    name: "Kokomo",
    nameAr: "كوكومو",
    kind: "beach",
    area: "Sidi Heneish Village · North Coast",
    areaAr: "قرية سيدي هنيش · الساحل الشمالي",
  },
  {
    slug: "one-beachouse",
    name: "One Beachouse",
    nameAr: "وان بيتش هاوس",
    kind: "beach",
    area: "Seashell · North Coast",
    areaAr: "سي شل · الساحل الشمالي",
    aliases: ["One Beach House"],
  },
  {
    slug: "la-femme-ladies-beach",
    name: "La Femme Ladies Beach",
    nameAr: "لا فام ليديز بيتش",
    kind: "beach",
    area: "Marina El Alamein · North Coast",
    areaAr: "مارينا العلمين · الساحل الشمالي",
    aliases: ["La Femme", "Ladies Beach"],
  },
  {
    slug: "gitana-ladies-beach",
    name: "Gitana Ladies Beach",
    nameAr: "جيتانا ليديز بيتش",
    kind: "beach",
    area: "Bungalows · North Coast",
    areaAr: "بنجالوز · الساحل الشمالي",
    aliases: ["Gitana ladies beach"],
  },
  {
    slug: "al-yashmak-ladies-beach",
    name: "AL Yashmak Ladies Beach",
    nameAr: "اليشمك ليديز بيتش",
    kind: "beach",
    area: "AL Rawda · North Coast",
    areaAr: "الروضة · الساحل الشمالي",
    aliases: ["Yashmak", "Al Yashmak"],
  },
  {
    slug: "la-taiga-beach-resort",
    name: "La Taiga Beach Resort",
    nameAr: "لا تايجا بيتش ريزورت",
    kind: "beach",
    area: "New Alamein · North Coast",
    areaAr: "العلمين الجديدة · الساحل الشمالي",
    aliases: ["La Taiga"],
  },
];

export function beachName(beach: Beach, locale: string): string {
  return locale === "ar" ? beach.nameAr : beach.name;
}

export function beachArea(beach: Beach, locale: string): string {
  return locale === "ar" ? beach.areaAr : beach.area;
}

export function getBeachBySlug(slug: string): Beach | undefined {
  return beaches.find((b) => b.slug === slug);
}

export function getAllBeachSlugs(): string[] {
  return beaches.map((b) => b.slug);
}
