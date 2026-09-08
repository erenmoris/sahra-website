"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/config";

const VIDEO_SRC = "/chalets/entrance.mp4";
const VIDEO_POSTER = "/chalets/entrance-poster.jpg";

export default function ChaletEntrance({
  locale,
  title,
  titleAccent,
  lede,
  priceBadge,
}: {
  locale: Locale;
  title: string;
  titleAccent: string;
  lede: string;
  priceBadge: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (!el.getAttribute("src")) el.setAttribute("src", VIDEO_SRC);
    el.muted = true;
    void el.play().catch(() => {
      // Autoplay may be blocked until interaction — muted usually works.
    });
  }, []);

  function scrollToList() {
    document.getElementById("chalet-list")?.scrollIntoView({ behavior: "smooth" });
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
          <p className="mb-3 text-[0.78rem] tracking-[0.18em] text-[#e4c878] uppercase">
            {locale === "ar" ? "إيجار شاليهات" : "Chalet rentals"}
          </p>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.15] text-[#efe6d0]">
            {title} <span className="text-[#e4c878]">{titleAccent}</span>
          </h1>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-[1.85] text-[#c9bfae]">{lede}</p>
          <p className="mt-5 inline-flex border-2 border-[#e4c878]/70 bg-black/35 px-4 py-2 text-[0.88rem] font-semibold tracking-wide text-[#e4c878]">
            {priceBadge}
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={scrollToList}
              className="cursor-pointer border-2 border-[#e4c878]/70 bg-black/40 px-6 py-3 text-[0.9rem] font-medium text-[#efe6d0] backdrop-blur-sm transition-colors hover:border-[#e4c878]"
            >
              {locale === "ar" ? "شوف الشاليهات ↓" : "Browse chalets ↓"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
