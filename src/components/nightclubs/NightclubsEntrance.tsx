"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/config";

const VIDEO_SRC = "/nightclub-gallery/videos/nightclub-promo.mp4";
const VIDEO_POSTER = "/nightclub-gallery/posters/nightclub-promo.jpeg";

export default function NightclubsEntrance({
  locale,
  title,
  titleAccent,
  lede,
}: {
  locale: Locale;
  title: string;
  titleAccent: string;
  lede: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (!el.getAttribute("src")) el.setAttribute("src", VIDEO_SRC);
    el.muted = true;
    void el.play().catch(() => undefined);
  }, []);

  function scrollToContent() {
    document.getElementById("nightclubs")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative h-[min(92vh,920px)] min-h-[480px] w-full overflow-hidden bg-ink">
      <video
        ref={videoRef}
        poster={VIDEO_POSTER}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25 theme-scrim"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(6,8,14,0.45)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 pt-[100px] md:px-10 md:pb-16">
        <div className="mx-auto w-full max-w-[1100px]">
          <p className="mb-3 text-[0.78rem] tracking-[0.18em] text-gold-soft uppercase theme-scrim-muted">
            {locale === "ar" ? "نايت كلوب" : "Night clubs"}
          </p>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.15] text-sand theme-scrim-text">
            {title} <span className="text-gold-soft">{titleAccent}</span>
          </h1>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-[1.85] text-sand-dim theme-scrim-muted">{lede}</p>
          <div className="mt-8">
            <button
              type="button"
              onClick={scrollToContent}
              className="cursor-pointer border-2 border-gold/70 bg-ink/55 px-6 py-3 text-[0.9rem] font-medium text-sand backdrop-blur-sm transition-colors hover:border-gold hover:text-gold-soft theme-scrim-text"
            >
              {locale === "ar" ? "شوف النوادي ↓" : "Browse clubs ↓"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
