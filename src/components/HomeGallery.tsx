import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { homeGalleryPreview } from "@/content/nightclub-gallery";
import Reveal from "@/components/Reveal";
import { Accent, Wrap } from "@/components/ui";

const LAYOUT: string[] = [
  "md:col-span-7 md:row-span-2 min-h-[280px] md:min-h-[420px]",
  "md:col-span-5 min-h-[200px]",
  "md:col-span-5 min-h-[200px]",
  "md:col-span-4 min-h-[180px]",
  "md:col-span-4 min-h-[180px]",
  "md:col-span-4 min-h-[180px]",
  "md:col-span-6 min-h-[200px]",
  "md:col-span-6 min-h-[200px]",
];

export default function HomeGallery({ locale, t }: { locale: Locale; t: Dictionary }) {
  const items = homeGalleryPreview.slice(0, 8);

  return (
    <section id="gallery" className="relative overflow-hidden py-12 sm:py-16" aria-labelledby="home-gallery-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-20 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[110px]"
      />

      <Wrap>
        <Reveal>
          <div className="mb-7 flex flex-col gap-5 md:mb-9 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[640px]">
              <div className="mb-3 flex items-center gap-3 text-[0.82rem] font-semibold tracking-[0.04em] text-gold">
                <span className="inline-block h-px w-7 bg-gold" />
                {t.gallery.eyebrow}
              </div>
              <h2
                id="home-gallery-title"
                className="font-display text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.2] font-bold text-sand"
              >
                {t.gallery.title} <Accent>{t.gallery.titleAccent}</Accent>
              </h2>
              <p className="mt-3 max-w-[48ch] text-[1rem] leading-[1.75] text-sand-dim">{t.gallery.lede}</p>
            </div>
            <Link
              href={`/${locale}/gallery`}
              className="inline-flex shrink-0 items-center justify-center self-start rounded-full border-2 border-gold/60 bg-ink-2/80 px-5 py-2.5 text-[0.88rem] font-bold text-sand transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night md:self-auto"
            >
              {t.gallery.viewAll}
              <span aria-hidden className="ms-2">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-12 md:gap-3">
          {items.map((item, index) => {
            const caption = locale === "ar" ? item.captionAr : item.captionEn;
            const featured = index === 0;

            return (
              <Reveal key={item.src} delay={(index % 4) * 70} className={LAYOUT[index] ?? "md:col-span-4 min-h-[180px]"}>
                <Link
                  href={`/${locale}/gallery`}
                  className="group relative block h-full min-h-[200px] overflow-hidden rounded-[1.25rem] border border-gold/25 shadow-[0_20px_50px_-34px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/55 hover:shadow-[0_24px_55px_-28px_rgba(201,162,75,0.28)]"
                >
                  <Image
                    src={item.src}
                    alt={caption}
                    fill
                    sizes={
                      featured
                        ? "(max-width: 768px) 100vw, 58vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    priority={index < 2}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-gold/[0.12] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div
                    className={`absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 text-sand ${
                      featured ? "sm:px-6 sm:pb-5" : ""
                    }`}
                  >
                    <span
                      className={`font-display font-semibold leading-snug ${
                        featured ? "text-[1.15rem] sm:text-[1.35rem]" : "text-[0.95rem]"
                      }`}
                    >
                      {caption}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
