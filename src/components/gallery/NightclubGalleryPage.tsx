"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  nightclubGalleryImages,
  nightclubGalleryVideos,
} from "@/content/nightclub-gallery";
import Reveal from "@/components/Reveal";
import { Accent, SectionHeading, Wrap } from "@/components/ui";

export default function NightclubGalleryPage({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  return (
    <section className="relative overflow-hidden pb-24 pt-10 md:pt-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.07),transparent_55%)]"
        aria-hidden
      />

      <Wrap className="relative">
        <Reveal>
          <SectionHeading eyebrow={t.galleryPage.eyebrow} lede={t.galleryPage.lede}>
            {t.galleryPage.title} <Accent>{t.galleryPage.titleAccent}</Accent>
          </SectionHeading>
        </Reveal>

        <div className="mb-10 flex flex-wrap gap-3">
          {(
            [
              { id: "images" as const, label: t.galleryPage.tabImages },
              { id: "videos" as const, label: t.galleryPage.tabVideos },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={active}
                className={`rounded-full border px-5 py-2.5 text-[0.88rem] font-semibold tracking-wide transition-all duration-300 ${
                  active
                    ? "border-gold/60 bg-gold/20 text-gold-soft shadow-[0_0_20px_-8px_rgba(201,162,75,0.7)]"
                    : "border-gold/20 bg-ink-2/90 text-sand hover:border-gold/55 hover:text-gold-soft"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "images" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nightclubGalleryImages.map((item, index) => (
              <Reveal key={item.src} delay={(index % 3) * 80}>
                <figure className="group relative aspect-4/3 overflow-hidden border border-gold/20 bg-ink-2">
                  <Image
                    src={item.src}
                    alt={locale === "ar" ? item.captionAr : item.captionEn}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index < 3}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent px-4 pt-10 pb-4 text-[0.85rem] text-sand">
                    {locale === "ar" ? item.captionAr : item.captionEn}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {nightclubGalleryVideos.map((video, index) => (
              <Reveal key={video.src} delay={(index % 2) * 90}>
                <GalleryVideoCard
                  src={video.src}
                  poster={video.poster}
                  title={locale === "ar" ? video.titleAr : video.titleEn}
                />
              </Reveal>
            ))}
          </div>
        )}

        <p className="mt-12 text-center text-[0.78rem] leading-[1.8] text-sand-dim">
          {t.galleryPage.note}
        </p>
      </Wrap>
    </section>
  );
}

function GalleryVideoCard({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (!el.getAttribute("src")) el.setAttribute("src", src);
    if (el.paused) {
      void el.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <article className="overflow-hidden rounded-[1.2rem] border border-gold/20 bg-ink-2/90 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)]">
      <div className="relative aspect-video bg-ink">
        <video
          ref={ref}
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          preload="none"
          controls={playing}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
        {!playing ? (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors hover:bg-black/25"
            aria-label={title}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ink/70 text-gold-soft backdrop-blur-sm">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        ) : null}
      </div>
      <div className="px-5 py-4">
        <h3 className="font-display text-[1.05rem] font-semibold text-sand">{title}</h3>
      </div>
    </article>
  );
}
