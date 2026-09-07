"use client";

import Image from "next/image";
import { useState } from "react";

/** Shared cinematic gallery for venue / beach / chalet detail pages. */
export default function ListingGallery({
  images,
  title,
  variant = "split",
}: {
  images: string[];
  title: string;
  /** `hero` = full-bleed mobile-first stack; `split` = desktop column panel */
  variant?: "split" | "hero";
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-gold/20 bg-ink-2">
        <span className="font-display text-4xl text-gold-soft">{title.charAt(0)}</span>
      </div>
    );
  }

  const isRemote = current.startsWith("http");

  return (
    <div className="space-y-3">
      <div
        className={`relative overflow-hidden rounded-2xl border border-gold/20 bg-ink shadow-[0_28px_80px_-28px_rgba(0,0,0,0.55),0_0_48px_-20px_rgba(201,162,75,0.22)] ${
          variant === "hero"
            ? "aspect-[5/4] sm:aspect-[16/11] lg:aspect-[4/3]"
            : "aspect-[4/3] lg:min-h-[520px] lg:aspect-auto"
        }`}
      >
        <Image
          src={current}
          alt={`${title} — ${active + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
          priority
          unoptimized={isRemote}
        />
        {/* Mobile fade into content below */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink via-ink/55 to-transparent lg:hidden"
          aria-hidden
        />
        {/* Subtle cinematic vignette on desktop */}
        <div
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-tr from-black/35 via-transparent to-black/10 lg:block"
          aria-hidden
        />
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-square overflow-hidden rounded-xl border transition-all duration-300 ${
                index === active
                  ? "border-gold shadow-[0_0_0_1px_rgba(201,162,75,0.45)]"
                  : "border-gold/20 hover:border-gold/40"
              }`}
              aria-label={`${index + 1}`}
              aria-current={index === active}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                unoptimized={src.startsWith("http")}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
