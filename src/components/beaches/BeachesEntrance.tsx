"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

export default function BeachesEntrance({
  locale,
  title,
  lede,
  coverSrc,
}: {
  locale: Locale;
  title: string;
  lede: string;
  coverSrc?: string;
}) {
  function scrollToContent() {
    document.getElementById("beaches")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative h-[min(72vh,720px)] min-h-[420px] w-full overflow-hidden bg-ink">
      {coverSrc ? (
        <Image
          src={coverSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30 theme-scrim"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(6,8,14,0.5)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 pt-[100px] md:px-10 md:pb-16">
        <div className="mx-auto w-full max-w-[1100px]">
          <p className="mb-3 text-[0.78rem] tracking-[0.18em] text-gold-soft uppercase theme-scrim-muted">
            {locale === "ar" ? "الشواطئ" : "Beaches"}
          </p>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.15] text-sand theme-scrim-text">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-[1.85] text-sand-dim theme-scrim-muted">{lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={scrollToContent}
              className="cursor-pointer border-2 border-gold/70 bg-ink/55 px-6 py-3 text-[0.9rem] font-medium text-sand backdrop-blur-sm transition-colors hover:border-gold hover:text-gold-soft theme-scrim-text"
            >
              {locale === "ar" ? "شوف الشواطئ ↓" : "Browse beaches ↓"}
            </button>
            <Link
              href={`/${locale}/venues`}
              className="border-2 border-gold/50 bg-transparent px-6 py-3 text-[0.9rem] font-medium text-sand transition-colors hover:border-gold hover:text-gold-soft theme-scrim-text"
            >
              {locale === "ar" ? "السهرات" : "Nights out"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
