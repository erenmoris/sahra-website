import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ResolvedChalet } from "@/lib/content";

function BedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-gold-soft/80">
      <path
        d="M3 18V9.5A1.5 1.5 0 0 1 4.5 8H9a3 3 0 0 1 6 0h4.5A1.5 1.5 0 0 1 21 9.5V18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M3 14h18M3 18h18M7 8V6.5A1.5 1.5 0 0 1 8.5 5h0A1.5 1.5 0 0 1 10 6.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-gold-soft/80">
      <path
        d="M4 12h16a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-2a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 19v1M16 19v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ChaletCard({
  chalet,
  locale,
  t,
}: {
  chalet: ResolvedChalet;
  locale: Locale;
  t: Dictionary;
}) {
  const href = `/${locale}/chalets/${chalet.slug}`;
  const alt =
    locale === "ar"
      ? `${chalet.title} — شالية سهر / إيجار في الساحل`
      : `${chalet.title} — owner chalet on the North Coast`;

  return (
    <article className="lux-panel group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-gold/20 bg-ink-2/90 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-700 hover:-translate-y-2 hover:border-gold/35 hover:shadow-[0_32px_70px_-30px_rgba(201,162,75,0.28)]">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden rounded-t-[1.25rem]">
        <Image
          src={chalet.coverImage}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          unoptimized={chalet.coverImage.startsWith("http")}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/20"
          aria-hidden
        />
        {chalet.fromOwner ? (
          <span className="absolute start-3 top-3 z-10 rounded-full border border-gold/45 bg-ink/90 px-3 py-1 text-[0.72rem] font-semibold tracking-wide text-gold-soft shadow-[0_8px_24px_-12px_rgba(0,0,0,0.85)] backdrop-blur-sm">
            {t.chalets.fromOwner}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3.5 p-5 md:p-6">
        <div>
          <h2 className="font-display text-[1.25rem] font-bold leading-snug text-sand transition-colors duration-300 group-hover:text-gold-soft md:text-[1.35rem]">
            <Link href={href}>{chalet.title}</Link>
          </h2>
          <p className="mt-1.5 text-[0.84rem] leading-relaxed text-sand-dim">{chalet.location}</p>
        </div>

        <p className="text-[0.9rem] leading-[1.75] text-sand-dim">{chalet.summary}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem] text-sand-dim">
          <span className="inline-flex items-center gap-1.5">
            <BedIcon />
            {chalet.bedrooms} {t.chalets.bedrooms}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BathIcon />
            {chalet.bathrooms} {t.chalets.bathrooms}
          </span>
        </div>

        <p className="text-[0.88rem] font-semibold text-gold-soft">{t.chalets.priceHint}</p>

        <Link
          href={href}
          className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-gold bg-transparent px-5 py-3 text-[0.9rem] font-bold text-gold transition-all duration-300 hover:bg-gold hover:text-night hover:shadow-[0_0_28px_-4px_rgba(201,162,75,0.7)]"
        >
          {t.chalets.details}
        </Link>
      </div>
    </article>
  );
}
