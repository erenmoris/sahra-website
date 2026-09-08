export type NightclubGalleryImage = {
  src: string;
  captionAr: string;
  captionEn: string;
};

export type NightclubGalleryVideo = {
  src: string;
  poster: string;
  titleAr: string;
  titleEn: string;
};

/** Images for /gallery — sourced from nightclub listings (no prices). */
export const nightclubGalleryImages: NightclubGalleryImage[] = [
  { src: "/nightclub-gallery/images/party-club.webp", captionAr: "بارتي كلوب · الجيزة", captionEn: "Party Club · Giza" },
  { src: "/nightclub-gallery/images/party-club-alt.png", captionAr: "بارتي كلوب", captionEn: "Party Club" },
  { src: "/nightclub-gallery/images/party-club-alt-2.png", captionAr: "أجواء بارتي كلوب", captionEn: "Party Club atmosphere" },
  { src: "/nightclub-gallery/images/tango-club.jpg", captionAr: "تانجو كلوب · الجيزة", captionEn: "Tango Club · Giza" },
  { src: "/nightclub-gallery/images/vieena-club.webp", captionAr: "فيينا كلوب · العجوزة", captionEn: "Vieena Club · Agouza" },
  { src: "/nightclub-gallery/images/royal-king.webp", captionAr: "رويال كينج · كورنيش النيل", captionEn: "Royal King · Nile Corniche" },
  { src: "/nightclub-gallery/images/fox-club.webp", captionAr: "فوكس كلوب · العجوزة", captionEn: "Fox Club · Agouza" },
  { src: "/nightclub-gallery/images/peacock-club.jpg", captionAr: "بيكوك كلوب · الزمالك", captionEn: "Peacock Club · Zamalek" },
  { src: "/nightclub-gallery/images/nox-club.jpg", captionAr: "نوكس كلوب · العجوزة", captionEn: "Nox Club · Agouza" },
  { src: "/nightclub-gallery/images/stage-cairo-club.jpg", captionAr: "ستيج كايرو · القاهرة", captionEn: "Stage Cairo Club · Cairo" },
  { src: "/nightclub-gallery/images/cash-cairo.jpg", captionAr: "كاش كايرو · المهندسين", captionEn: "Cash Cairo · Mohandessin" },
  { src: "/nightclub-gallery/images/cash-cairo-alt.webp", captionAr: "كاش كايرو", captionEn: "Cash Cairo" },
  { src: "/nightclub-gallery/images/omni-club-cairo.jpg", captionAr: "أومني كلوب · الجزيرة", captionEn: "Omni Club · Gezira" },
  { src: "/nightclub-gallery/images/echo-club.jpg", captionAr: "إيكو كلوب · المعادي", captionEn: "Echo Club · Maadi" },
  { src: "/nightclub-gallery/images/king-club.jpeg", captionAr: "كينج كلوب · الجيزة", captionEn: "King Club · Giza" },
  { src: "/nightclub-gallery/images/cosmo-lounge-and-club.jpg", captionAr: "كوزمو · الزمالك", captionEn: "Cosmo Lounge · Zamalek" },
  { src: "/nightclub-gallery/images/ovid-club.webp", captionAr: "أوفيد كلوب · ممشى أهل مصر", captionEn: "OVID Club · Nile walk" },
  { src: "/nightclub-gallery/images/shots-club.jpg", captionAr: "شوتس كلوب · المعادي", captionEn: "Shots Club · Maadi" },
  { src: "/nightclub-gallery/images/rovi-club.jpg", captionAr: "روفي كلوب · كورنيش المعادي", captionEn: "ROVI Club · Maadi Corniche" },
  { src: "/nightclub-gallery/images/rai-club-nile-dragon-boat.jpg", captionAr: "راي كلوب · مركب النيل", captionEn: "Rai Club · Nile boat" },
  { src: "/nightclub-gallery/images/volt-lounge.jpg", captionAr: "فولت لاونج · الدقي", captionEn: "Volt Lounge · Dokki" },
  { src: "/nightclub-gallery/images/sansee-club.png", captionAr: "سانسي كلوب · المهندسين", captionEn: "Sansee Club · Mohandessin" },
  { src: "/nightclub-gallery/images/disco-nox-club.jpg", captionAr: "ديسكو نوكس · العجوزة", captionEn: "Disco NoX · Agouza" },
  { src: "/nightclub-gallery/images/sahalal-club.jpg", captionAr: "صهله كلوب · شارع الهرم", captionEn: "Sahalal Club · Pyramid St" },
  { src: "/nightclub-gallery/images/kalije-night-club.jpg", captionAr: "خليجي نايت كلوب · الدقي", captionEn: "Kalije Night Club · Dokki" },
  { src: "/nightclub-gallery/images/promo-poster.jpeg", captionAr: "أجواء السهرة", captionEn: "Nightlife atmosphere" },
  { src: "/nightclub-gallery/images/al-molouk-club.jpg", captionAr: "الملوك كلوب · المهندسين", captionEn: "Al Molouk Club · Mohandessin" },
  { src: "/nightclub-gallery/images/aowtar-club.jpg", captionAr: "أوتار كلوب", captionEn: "Aowtar Club" },
  { src: "/nightclub-gallery/images/as-one-club.jpg", captionAr: "أس وان كلوب", captionEn: "AS.ONE Club" },
  { src: "/nightclub-gallery/images/el-maluonaerr-club.jpg", captionAr: "المليونير كلوب", captionEn: "El Maluonaerr Club" },
  { src: "/nightclub-gallery/images/sess-after-party.webp", captionAr: "سيس أفتر بارتي", captionEn: "Sess After Party" },
  { src: "/nightclub-gallery/images/dahabia-cash.webp", captionAr: "دهبية كاش", captionEn: "Dahabia Cash" },
  { src: "/nightclub-gallery/images/xo-club.jpg", captionAr: "إكس أو كلوب", captionEn: "XO Club" },
];

/** Curated homepage preview — atmospheric picks only. */
export const homeGalleryPreview: NightclubGalleryImage[] = [
  { src: "/nightclub-gallery/images/promo-poster.jpeg", captionAr: "أجواء السهرة", captionEn: "Nightlife atmosphere" },
  { src: "/nightclub-gallery/images/party-club.webp", captionAr: "بارتي كلوب · الجيزة", captionEn: "Party Club · Giza" },
  { src: "/nightclub-gallery/images/tango-club.jpg", captionAr: "تانجو كلوب · الجيزة", captionEn: "Tango Club · Giza" },
  { src: "/nightclub-gallery/images/volt-lounge.jpg", captionAr: "فولت لاونج · الدقي", captionEn: "Volt Lounge · Dokki" },
  { src: "/nightclub-gallery/images/fox-club.webp", captionAr: "فوكس كلوب · العجوزة", captionEn: "Fox Club · Agouza" },
  { src: "/nightclub-gallery/images/peacock-club.jpg", captionAr: "بيكوك كلوب · الزمالك", captionEn: "Peacock Club · Zamalek" },
  { src: "/nightclub-gallery/images/stage-cairo-club.jpg", captionAr: "ستيج كايرو · القاهرة", captionEn: "Stage Cairo Club · Cairo" },
  { src: "/nightclub-gallery/images/xo-club.jpg", captionAr: "إكس أو كلوب", captionEn: "XO Club" },
  { src: "/nightclub-gallery/images/al-molouk-club.jpg", captionAr: "الملوك كلوب · المهندسين", captionEn: "Al Molouk Club · Mohandessin" },
];

export const nightclubGalleryVideos: NightclubGalleryVideo[] = [
  {
    src: "/nightclub-gallery/videos/nightclub-promo.mp4",
    poster: "/nightclub-gallery/posters/nightclub-promo.jpeg",
    titleAr: "أفضل نايت كلوب في القاهرة",
    titleEn: "Best nightclubs in Cairo",
  },
  {
    src: "/nightclub-gallery/videos/party-club.mp4",
    poster: "/nightclub-gallery/posters/party-club.jpg",
    titleAr: "بارتي كلوب · الجيزة",
    titleEn: "Party Club · Giza",
  },
  {
    src: "/nightclub-gallery/videos/vieena-club.mp4",
    poster: "/nightclub-gallery/posters/vieena-club.jpg",
    titleAr: "فيينا كلوب",
    titleEn: "Vieena Club",
  },
  {
    src: "/nightclub-gallery/videos/vieena-club-2.mp4",
    poster: "/nightclub-gallery/posters/vieena-club-2.jpg",
    titleAr: "أجواء فيينا كلوب",
    titleEn: "Vieena Club vibe",
  },
  {
    src: "/nightclub-gallery/videos/royal-king.mp4",
    poster: "/nightclub-gallery/posters/royal-king.jpg",
    titleAr: "رويال كينج",
    titleEn: "Royal King",
  },
  {
    src: "/nightclub-gallery/videos/fox-club.mp4",
    poster: "/nightclub-gallery/posters/fox-club.jpg",
    titleAr: "فوكس كلوب",
    titleEn: "Fox Club",
  },
  {
    src: "/nightclub-gallery/videos/xo-club-cairo.mp4",
    poster: "/nightclub-gallery/posters/xo-club-cairo.jpg",
    titleAr: "إكس أو كلوب القاهرة",
    titleEn: "XO Club Cairo",
  },
  {
    src: "/nightclub-gallery/videos/stage-cairo-club.mp4",
    poster: "/nightclub-gallery/posters/stage-cairo-club.jpg",
    titleAr: "تجربة VIP في Stage Cairo Club",
    titleEn: "VIP experience at Stage Cairo Club",
  },
  {
    src: "/nightclub-gallery/videos/cash-cairo.mp4",
    poster: "/nightclub-gallery/posters/cash-cairo.webp",
    titleAr: "كاش كايرو نايت كلوب",
    titleEn: "Cash Cairo nightclub",
  },
  {
    src: "/nightclub-gallery/videos/omni-club-cairo.mp4",
    poster: "/nightclub-gallery/posters/omni-club-cairo.jpg",
    titleAr: "أومني كلوب القاهرة",
    titleEn: "Omni Club Cairo",
  },
  {
    src: "/nightclub-gallery/videos/shots-club.mp4",
    poster: "/nightclub-gallery/posters/shots-club.jpg",
    titleAr: "شوتس كلوب",
    titleEn: "Shots Club",
  },
  {
    src: "/nightclub-gallery/videos/echo-club.mp4",
    poster: "/nightclub-gallery/posters/echo-club.jpg",
    titleAr: "جولة داخل Echo Club",
    titleEn: "Inside Echo Club",
  },
  {
    src: "/nightclub-gallery/videos/volt-lounge.mp4",
    poster: "/nightclub-gallery/posters/volt-lounge.jpg",
    titleAr: "فولت لاونج",
    titleEn: "Volt Lounge",
  },
  {
    src: "/nightclub-gallery/videos/kalije-night-club.mp4",
    poster: "/nightclub-gallery/posters/kalije-night-club.jpg",
    titleAr: "خليجي نايت كلوب",
    titleEn: "Kalije Night Club",
  },
  {
    src: "/nightclub-gallery/videos/lounge-01.mp4",
    poster: "/nightclub-gallery/posters/lounge-01.jpg",
    titleAr: "جولة داخل المكان",
    titleEn: "Inside the venue",
  },
  {
    src: "/nightclub-gallery/videos/lounge-02.mp4",
    poster: "/nightclub-gallery/posters/lounge-02.jpg",
    titleAr: "أجواء السهرة",
    titleEn: "Nightlife atmosphere",
  },
  {
    src: "/nightclub-gallery/videos/lounge-03.mp4",
    poster: "/nightclub-gallery/posters/lounge-03.jpg",
    titleAr: "سهرة VIP",
    titleEn: "VIP night",
  },
  {
    src: "/nightclub-gallery/videos/lounge-04.mp4",
    poster: "/nightclub-gallery/posters/lounge-04.jpg",
    titleAr: "ديسكو ولاونج",
    titleEn: "Disco & lounge",
  },
  {
    src: "/nightclub-gallery/videos/lounge-05.mp4",
    poster: "/nightclub-gallery/posters/lounge-05.jpg",
    titleAr: "طاقة المكان",
    titleEn: "Club energy",
  },
  {
    src: "/nightclub-gallery/videos/lounge-07.mp4",
    poster: "/nightclub-gallery/posters/lounge-07.jpg",
    titleAr: "ليلة على النيل",
    titleEn: "A night by the Nile",
  },
  {
    src: "/nightclub-gallery/videos/mrx-01.mp4",
    poster: "/nightclub-gallery/posters/mrx-01.jpg",
    titleAr: "سهرة من Mr X",
    titleEn: "Mr X night out",
  },
  {
    src: "/nightclub-gallery/videos/mrx-02.mp4",
    poster: "/nightclub-gallery/posters/mrx-02.jpg",
    titleAr: "أجواء النايت كلوب",
    titleEn: "Nightclub atmosphere",
  },
  {
    src: "/nightclub-gallery/videos/mrx-03.mp4",
    poster: "/nightclub-gallery/posters/mrx-03.jpg",
    titleAr: "حفلة VIP",
    titleEn: "VIP party",
  },
  {
    src: "/nightclub-gallery/videos/mrx-04.mp4",
    poster: "/nightclub-gallery/posters/mrx-04.jpg",
    titleAr: "ديسكو القاهرة",
    titleEn: "Cairo disco",
  },
  {
    src: "/nightclub-gallery/videos/mrx-05.mp4",
    poster: "/nightclub-gallery/posters/mrx-05.jpg",
    titleAr: "طاقة السهرة",
    titleEn: "Party energy",
  },
  {
    src: "/nightclub-gallery/videos/mrx-06.mp4",
    poster: "/nightclub-gallery/posters/mrx-06.jpg",
    titleAr: "ليلة مشتعلة",
    titleEn: "A hot night",
  },
];
