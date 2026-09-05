"use client";

import Image from "next/image";
import { useState } from "react";

export default function ChaletGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-4/3 overflow-hidden border border-gold/20 bg-ink-2">
        <Image
          src={current}
          alt={`${title} — صورة ${active + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority
          loading="eager"
          unoptimized={current.startsWith("http")}
        />
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-7">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-square overflow-hidden border transition-colors ${
                index === active ? "border-gold" : "border-gold/15 hover:border-gold/40"
              }`}
              aria-label={`${index + 1}`}
            >
              <Image
                src={src}
                alt={`${title} — صورة ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
                loading="lazy"
                unoptimized={src.startsWith("http")}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
