import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { GalleryItem } from "@/lib/gallery";
import Reveal from "./Reveal";
import { Accent, SectionHeading, Wrap } from "./ui";

export default function Gallery({
  items,
  locale,
  t,
}: {
  items: GalleryItem[];
  locale: Locale;
  t: Dictionary;
}) {
  if (items.length === 0) return null;

  return (
    <section id="gallery" className="py-24">
      <Wrap>
        <Reveal>
          <SectionHeading eyebrow={t.gallery.eyebrow} lede={t.gallery.lede}>
            {t.gallery.title} <Accent>{t.gallery.titleAccent}</Accent>
          </SectionHeading>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.src} delay={(index % 3) * 90}>
              <figure className="group relative aspect-4/3 overflow-hidden border border-gold/20">
                <Image
                  src={item.src}
                  alt={item.caption?.[locale] ?? t.gallery.fallbackAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 3}
                />
                {item.caption ? (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent px-4 pt-10 pb-4 text-[0.85rem] text-sand">
                    {item.caption[locale]}
                  </figcaption>
                ) : null}
              </figure>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
