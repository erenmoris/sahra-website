import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import { Accent, SectionHeading, Wrap } from "./ui";

export default function PromoVideo({
  src,
  poster,
  locale,
  t,
  compact = false,
}: {
  src: string;
  poster?: string;
  locale: Locale;
  t: Dictionary;
  /** When true, omit the section heading (used inside Hero). */
  compact?: boolean;
}) {
  const title = locale === "ar" ? "شوف سهرة" : "Watch Sahra";
  const lede =
    locale === "ar"
      ? "فيديو قصير عن الخدمة والأماكن اللي بنظبط فيها حجوزات."
      : "A short look at how Sahra works and the nights we book.";

  const player = (
    <div className="overflow-hidden border border-gold/25 bg-ink-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="aspect-video w-full bg-black"
        aria-label={title}
      >
        {locale === "ar" ? "المتصفح مش بيدعم تشغيل الفيديو." : "Your browser does not support video."}
      </video>
    </div>
  );

  if (compact) return player;

  return (
    <section id="video" className="scroll-mt-24 py-24">
      <Wrap>
        <Reveal>
          <SectionHeading eyebrow={t.gallery.eyebrow} lede={lede}>
            {title} <Accent>{locale === "ar" ? "قبل ما تحجز" : "before you book"}</Accent>
          </SectionHeading>
        </Reveal>
        <Reveal>
          <div className="mx-auto max-w-3xl">{player}</div>
        </Reveal>
      </Wrap>
    </section>
  );
}
