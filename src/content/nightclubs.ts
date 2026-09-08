export type Nightclub = {
  slug: string;
  name: string;
  nameAr: string;
  area: string;
  areaAr: string;
  /** Short about for detail page — never include prices. */
  about: string;
  aboutAr: string;
  couplesOnly?: boolean;
  aliases?: string[];
};

/**
 * Cairo / Giza nightclubs directory.
 * Names and areas sourced from public listings; Sahra books independently.
 * No prices are shown on the site.
 */
export const nightclubs: Nightclub[] = [
  {
    slug: "party-club",
    name: "Party Club",
    nameAr: "بارتي كلوب",
    area: "Giza",
    areaAr: "الجيزة",
    about:
      "International DJs, VIP bottle service, and a polished nightlife room — we arrange your table privately on WhatsApp.",
    aboutAr:
      "موسيقى عالمية وخدمة زجاجات VIP وأجواء راقية. نرتّب ترابيزتك والدخول بهدوء عبر واتساب الكونسييرج.",
    aliases: ["PARTY CLUB", "بارتي", "بارتي كلوب"],
  },
  {
    slug: "tango-club",
    name: "Tango Club",
    nameAr: "تانجو كلوب",
    area: "Great Nile St · Giza",
    areaAr: "الجيزة · شارع البحر الأعظم",
    about:
      "A VIP night with international DJs and a polished atmosphere — we arrange your table and entrance privately on WhatsApp.",
    aboutAr: "سهرة VIP مع دي جيه عالميين وأجواء ساحرة. نرتّب ترابيزتك والدخول بهدوء عبر واتساب الكونسييرج.",
    aliases: ["TANGO CLUB", "تانجو"],
  },
  {
    slug: "vieena-club",
    name: "Vieena Club",
    nameAr: "فيينا كلوب",
    area: "Agouza · Nile Corniche",
    areaAr: "العجوزة · كورنيش النيل",
    about: "An elegant Nile-side evening with a refined room and a strong DJ set.",
    aboutAr: "تجربة راقية على كورنيش النيل بأجواء أنيقة ودي جيه مميز.",
    aliases: ["VIEENA CLUB", "Vienna Club"],
  },
  {
    slug: "royal-king",
    name: "Royal King",
    nameAr: "رويال كينج",
    area: "Agouza · Nile Corniche",
    areaAr: "كورنيش النيل العجوزة",
    about: "A premium club on the Nile Corniche — VIP seating and a polished night out.",
    aboutAr: "نادي فخم على كورنيش النيل — تجربة VIP مميزة وطاولات منتقاة.",
    aliases: ["رويال كينج", "Royal King Club"],
  },
  {
    slug: "fox-club",
    name: "Fox Club",
    nameAr: "فوكس كلوب",
    area: "Agouza · Giza",
    areaAr: "الجيزة · العجوزة",
    about: "Nile views, a luxurious room, and world-class sound — booked through Sahra concierge.",
    aboutAr: "مطل على النيل مع أجواء فخمة وصوتيات عالمية. نرتّب حجزك عبر الكونسييرج.",
    aliases: ["FOX CLUB", "فوكس"],
  },
  {
    slug: "peacock-club",
    name: "Peacock Club",
    nameAr: "بيكوك كلوب",
    area: "Zamalek · Cairo",
    areaAr: "القاهرة · الزمالك",
    about: "A luxurious Zamalek night with dancefloor energy, VIP cabanas, and curated service.",
    aboutAr: "أجواء فاخرة في الزمالك مع دي جيه راقص، وكبائن VIP، وخدمة منتقاة.",
    aliases: ["Peacock", "بيكوك"],
  },
  {
    slug: "nox-club",
    name: "Nox Club",
    nameAr: "نوكس كلوب",
    area: "Agouza · Cairo",
    areaAr: "القاهرة · العجوزة",
    about: "A premium room with advanced sound systems and electronic nightlife energy.",
    aboutAr: "نادي فخم مع أنظمة صوتية متقدمة وأجواء إلكترونية.",
    aliases: ["NOX CLUB", "نوكس"],
  },
  {
    slug: "stage-cairo-club",
    name: "Stage Cairo Club",
    nameAr: "ستيج كايرو كلوب",
    area: "Behind Al Ahly Club · Cairo",
    areaAr: "خلف النادي الأهلي · القاهرة",
    about: "A theatrical nightlife experience with local DJs and strong light-and-sound production.",
    aboutAr: "تجربة مسرحية مع دي جيه محليين وعروض ضوء وصوت متقدمة.",
    aliases: ["Stage Cairo", "ستيج"],
  },
  {
    slug: "cash-cairo",
    name: "Cash Cairo",
    nameAr: "كاش كايرو",
    area: "Mohandessin · Cairo",
    areaAr: "المهندسين · القاهرة",
    about: "A contemporary club with neon lighting and a VIP-forward music night.",
    aboutAr: "مكان عصري بإضاءة نيون وموسيقى VIP مميزة.",
    aliases: ["Cash", "كاش"],
  },
  {
    slug: "omni-club-cairo",
    name: "Omni Club Cairo",
    nameAr: "أومني كلوب القاهرة",
    area: "Gezira Club Rd · Cairo",
    areaAr: "طريق نادي الجزيرة · القاهرة",
    about: "Varied music evenings with live DJs and a high-energy dancefloor.",
    aboutAr: "أمسيات موسيقية متنوعة ودي جيه لايف وأجواء حماسية.",
    couplesOnly: true,
    aliases: ["Omni Club", "أومني"],
  },
  {
    slug: "echo-club",
    name: "Echo Club",
    nameAr: "إيكو كلوب",
    area: "Maadi · Cairo",
    areaAr: "المعادي · القاهرة",
    about: "Striking sound, laser lights, and live musical moments in Maadi.",
    aboutAr: "صوتيات مذهلة مع أضواء ليزر وعروض مع فرق موسيقية حية.",
    aliases: ["Echo", "إيكو"],
  },
  {
    slug: "king-club",
    name: "King Club",
    nameAr: "كينج كلوب",
    area: "Great Nile St · Giza",
    areaAr: "البحر الأعظم · الجيزة",
    about: "A regal room for refined evenings with exclusive DJ sets.",
    aboutAr: "المكان الملكي للأمسيات الراقية مع عروض دي جيه حصرية.",
    aliases: ["King", "كينج"],
  },
  {
    slug: "cosmo-lounge-and-club",
    name: "Cosmo Lounge & Club",
    nameAr: "كوزمو لاونج آند كلوب",
    area: "Zamalek · Cairo",
    areaAr: "الزمالك · القاهرة",
    about: "A luxurious lounge-club hybrid with international music and VIP service.",
    aboutAr: "لاونج فخم مع دي جيه وموسيقى عالمية وخدمة VIP فاخرة.",
    couplesOnly: true,
    aliases: ["Cosmo", "كوزمو", "Cosmo Lounge"],
  },
  {
    slug: "shots-club",
    name: "Shots Club",
    nameAr: "شوتس كلوب",
    area: "Maadi · Cairo",
    areaAr: "المعادي · القاهرة",
    about: "High-energy nights with sharp production and VIP table service.",
    aboutAr: "ليالي ملتهبة مع باقات VIP وتقنية عالية.",
    couplesOnly: true,
    aliases: ["Shots", "شوتس"],
  },
  {
    slug: "rovi-club",
    name: "ROVI Club",
    nameAr: "روفي كلوب",
    area: "Maadi Corniche · Cairo",
    areaAr: "كورنيش المعادي · القاهرة",
    about: "A modern dance destination for big nightlife nights on the Maadi Corniche.",
    aboutAr: "ركن حديث للموسيقى الراقصة والحفلات الليلية الكبيرة على كورنيش المعادي.",
    couplesOnly: true,
    aliases: ["ROVI", "OVID Club", "روفي"],
  },
  {
    slug: "rai-club-nile-dragon-boat",
    name: "Rai Club Nile Dragon Boat",
    nameAr: "راي كلوب · مركب النيل",
    area: "Nile Corniche · Cairo",
    areaAr: "كورنيش النيل · القاهرة",
    about: "Boat parties with Nile views, Raï music, and live celebration energy.",
    aboutAr: "حفلات على المركب مع إطلالة نيلية وموسيقى راي وحفلات حية.",
    aliases: ["Rai Club", "راي كلوب", "Dragon Boat"],
  },
  {
    slug: "volt-lounge",
    name: "Volt Lounge",
    nameAr: "فولت لاونج",
    area: "Dokki / Agouza · Giza",
    areaAr: "الدقي / العجوزة · الجيزة",
    about: "International club energy with dynamic lighting, DJs, and fast VIP service.",
    aboutAr: "أجواء نوادي عالمية مع دي جيه وإضاءة ديناميكية وخدمة سريعة.",
    aliases: ["Volt", "فولت"],
  },
  {
    slug: "sansee-club",
    name: "Sansee Club",
    nameAr: "سانسي كلوب",
    area: "Mohandessin · Giza",
    areaAr: "المهندسين · الجيزة",
    about: "Arabic and Western sets in a standout Mohandessin nightlife room.",
    aboutAr: "موقع مميز لسهرة ممتعة مع موسيقى عربية وغربية وبرامج حصرية.",
    aliases: ["Sansee", "سانسي", "سانسي كلوب"],
  },
  {
    slug: "disco-nox-club",
    name: "Disco NoX Club",
    nameAr: "ديسكو نوكس كلوب",
    area: "Agouza · Giza",
    areaAr: "العجوزة · الجيزة",
    about: "An evolved NoX disco night with DJs and unforgettable dancefloor moments.",
    aboutAr: "نسخة موسيقية متطورة من نوكس مع دي جيه وعروض رقص لا تُنسى.",
    aliases: ["Disco Nox", "ديسكو نوكس"],
  },
  {
    slug: "sahalal-club",
    name: "Sahalal Club",
    nameAr: "صهله كلوب",
    area: "Pyramid St · Giza",
    areaAr: "الجيزة · شارع الهرم",
    about: "High-energy nights with professional sound and daily party programming.",
    aboutAr: "أجواء مليئة بالطاقة وصوتيات احترافية وحفلات يومية.",
    aliases: ["SAHALAL", "صهله", "صهلة"],
  },
  {
    slug: "kalije-night-club",
    name: "Kalije Night Club",
    nameAr: "خليجي نايت كلوب",
    area: "Dokki · Giza",
    areaAr: "الدقي · الجيزة",
    about: "A modern Gulf-leaning room with white DJs and exclusive VIP stations.",
    aboutAr: "أجواء حديثة ومتنوعة مع موسيقى وايت دي جيه ومحطات VIP حصرية.",
    aliases: ["Kalije", "خليجي", "خليجي كلوب"],
  },
  {
    slug: "al-molouk-club",
    name: "Al Molouk Club",
    nameAr: "الملوك كلوب",
    area: "Mohandessin · Giza",
    areaAr: "المهندسين · جامعة الدول",
    about: "A Mohandessin nightclub on Gameat El Dowal — polished service and a full evening out.",
    aboutAr: "نايت كلوب في المهندسين على جامعة الدول — سهرة مرتّبة وخدمة أنيقة.",
    aliases: ["الملوك", "Al Molouk", "Molouk"],
  },
  {
    slug: "aowtar-club",
    name: "Aowtar Club",
    nameAr: "أوتار كلوب",
    area: "Cairo",
    areaAr: "القاهرة",
    about: "Arabic and Western sets with a lively guest mix — booked quietly through Sahra.",
    aboutAr: "موسيقى عربية وغربية مع تشكيلة واسعة من الضيوف — نرتّب الحجز عبر الكونسييرج.",
    aliases: ["Aowtar", "أوتار"],
  },
  {
    slug: "as-one-club",
    name: "AS.ONE Club",
    nameAr: "أس وان كلوب",
    area: "Cairo",
    areaAr: "القاهرة",
    about: "A VIP disco room with live DJ energy and a high-gloss night out.",
    aboutAr: "أجواء VIP فاخرة مع عروض دي جيه حية وسهر مشتعل.",
    aliases: ["AS.ONE", "AS ONE", "أس وان"],
  },
  {
    slug: "el-maluonaerr-club",
    name: "El Maluonaerr Club",
    nameAr: "المليونير كلوب",
    area: "Cairo",
    areaAr: "القاهرة",
    about: "An elegant Gulf-leaning club with refined service and curated party nights.",
    aboutAr: "أجواء راقية وأنيقة مع خدمة فاخرة وحفلات مميزة.",
    aliases: ["El Maluonaerr", "المليونير", "Maluonaerr"],
  },
  {
    slug: "sess-after-party",
    name: "Sess After Party",
    nameAr: "سيس أفتر بارتي",
    area: "Cairo",
    areaAr: "القاهرة",
    about: "An after-party that keeps going from late night into the morning.",
    aboutAr: "عالم السهر اللي ما بيخلصش — من الفجر لحد الضهر.",
    aliases: ["Sess", "ساس", "Sess After"],
  },
  {
    slug: "dahabia-cash",
    name: "Dahabia Cash",
    nameAr: "دهبية كاش",
    area: "Cairo",
    areaAr: "القاهرة",
    about: "A contemporary room with neon lighting and VIP-forward music nights.",
    aboutAr: "مكان عصري بإضاءة نيون وموسيقى VIP مميزة.",
    aliases: ["Dahabia", "دهبية", "دهبيه كاش", "Dahabea Cash"],
  },
  {
    slug: "xo-club",
    name: "XO Club",
    nameAr: "إكس أو كلوب",
    area: "Cairo",
    areaAr: "القاهرة",
    about: "A Gulf disco night with strong energy and VIP table service.",
    aboutAr: "ديسكو خليجي بطاقة عالية وخدمة ترابيزات VIP.",
    aliases: ["XO", "إكس أو", "XO Club Cairo"],
  },
];

export function nightclubName(club: Nightclub, locale: string): string {
  return locale === "ar" ? club.nameAr : club.name;
}

export function nightclubArea(club: Nightclub, locale: string): string {
  return locale === "ar" ? club.areaAr : club.area;
}

export function nightclubAbout(club: Nightclub, locale: string): string {
  return locale === "ar" ? club.aboutAr : club.about;
}

export function getNightclubBySlug(slug: string): Nightclub | undefined {
  return nightclubs.find((c) => c.slug === slug);
}

export function getAllNightclubSlugs(): string[] {
  return nightclubs.map((c) => c.slug);
}

export const nightclubKeywords: string[] = nightclubs.flatMap((club) => [
  club.name,
  club.nameAr,
  club.area,
  club.areaAr,
  ...(club.aliases ?? []),
]);
