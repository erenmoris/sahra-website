"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { homeReels } from "@/content/home-reels";
import Reveal from "@/components/Reveal";
import { Accent, Wrap } from "@/components/ui";

export default function HomeReels({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="reels" className="relative overflow-hidden py-12 sm:py-16" aria-labelledby="home-reels-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-16 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-[100px]"
      />

      <Wrap>
        <Reveal>
          <div className="mb-7 flex flex-col gap-5 md:mb-9 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[640px]">
              <div className="mb-3 flex items-center gap-3 text-[0.82rem] font-semibold tracking-[0.04em] text-gold">
                <span className="inline-block h-px w-7 bg-gold" />
                {t.reels.eyebrow}
              </div>
              <h2
                id="home-reels-title"
                className="font-display text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.2] font-bold text-sand"
              >
                {t.reels.title} <Accent>{t.reels.titleAccent}</Accent>
              </h2>
              <p className="mt-3 max-w-[48ch] text-[1rem] leading-[1.75] text-sand-dim">{t.reels.lede}</p>
            </div>
            <Link
              href={`/${locale}/gallery`}
              className="inline-flex shrink-0 items-center justify-center self-start rounded-full border-2 border-gold/60 bg-ink-2/80 px-5 py-2.5 text-[0.88rem] font-bold text-sand transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night md:self-auto"
            >
              {t.reels.viewGallery}
              <span aria-hidden className="ms-2">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </Wrap>

      <div className="relative">
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc((100vw-1100px)/2+1.25rem))] pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          role="list"
          aria-label={t.reels.title}
        >
          {homeReels.map((reel, index) => (
            <Reveal key={reel.id} delay={(index % 4) * 60} className="snap-center shrink-0">
              <ReelCard
                src={reel.src}
                poster={reel.poster}
                title={locale === "ar" ? reel.titleAr : reel.titleEn}
                href={`/${locale}/gallery`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReelCard({
  src,
  poster,
  title,
  href,
}: {
  src: string;
  poster: string;
  title: string;
  href: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    const card = cardRef.current;
    if (!el || !card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          if (!el.getAttribute("src")) el.setAttribute("src", src);
          el.muted = true;
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: [0, 0.55, 1] },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [src]);

  return (
    <Link
      ref={cardRef}
      href={href}
      role="listitem"
      className="group relative block h-[min(68vh,520px)] w-[min(72vw,280px)] overflow-hidden rounded-[1.4rem] border border-gold/25 bg-ink shadow-[0_24px_50px_-30px_rgba(0,0,0,0.65)] transition-transform duration-500 hover:-translate-y-1 hover:border-gold/50"
    >
      <video
        ref={videoRef}
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/25"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 p-4">
        <p className="font-display text-[1.05rem] font-semibold text-sand drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
          {title}
        </p>
      </div>
    </Link>
  );
}
