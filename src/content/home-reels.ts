export type HomeReel = {
  id: string;
  src: string;
  poster: string;
  titleAr: string;
  titleEn: string;
};

/** Short vertical clips cut from gallery videos for the homepage reels row. */
export const homeReels: HomeReel[] = [
  {
    id: "stage",
    src: "/home/reels/stage.mp4",
    poster: "/home/reels/stage.jpg",
    titleAr: "ستيج كايرو",
    titleEn: "Stage Cairo",
  },
  {
    id: "cash",
    src: "/home/reels/cash.mp4",
    poster: "/home/reels/cash.jpg",
    titleAr: "كاش كايرو",
    titleEn: "Cash Cairo",
  },
  {
    id: "omni",
    src: "/home/reels/omni.mp4",
    poster: "/home/reels/omni.jpg",
    titleAr: "أومني كلوب",
    titleEn: "Omni Club",
  },
  {
    id: "echo",
    src: "/home/reels/echo.mp4",
    poster: "/home/reels/echo.jpg",
    titleAr: "إيكو كلوب",
    titleEn: "Echo Club",
  },
  {
    id: "volt",
    src: "/home/reels/volt.mp4",
    poster: "/home/reels/volt.jpg",
    titleAr: "فولت لاونج",
    titleEn: "Volt Lounge",
  },
  {
    id: "kalije",
    src: "/home/reels/kalije.mp4",
    poster: "/home/reels/kalije.jpg",
    titleAr: "خليجي نايت كلوب",
    titleEn: "Kalije Night Club",
  },
  {
    id: "shots",
    src: "/home/reels/shots.mp4",
    poster: "/home/reels/shots.jpg",
    titleAr: "شوتس كلوب",
    titleEn: "Shots Club",
  },
  {
    id: "promo",
    src: "/home/reels/promo.mp4",
    poster: "/home/reels/promo.jpg",
    titleAr: "أجواء السهرة",
    titleEn: "Nightlife vibe",
  },
];
