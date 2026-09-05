import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ResolvedChalet } from "@/lib/content";
import { buttonClass } from "../ui";

export default function ChaletCard({
  chalet,
  locale,
  t,
}: {
  chalet: ResolvedChalet;
  locale: Locale;
  t: Dictionary;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-gold/20 bg-ink-2/40 transition-colors hover:border-gold/40">
      <Link href={`/${locale}/chalets/${chalet.slug}`} className="relative block aspect-4/3 overflow-hidden">
        <Image
          src={chalet.coverImage}
          alt={
            locale === "ar"
              ? `${chalet.title} — شالية سهر / إيجار في الساحل`
              : `${chalet.title} — owner chalet on the North Coast`
          }
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          unoptimized={chalet.coverImage.startsWith("http")}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {chalet.fromOwner ? (
            <span className="border border-gold/30 bg-gold/10 px-2 py-0.5 text-[0.72rem] text-gold-soft">
              {t.chalets.fromOwner}
            </span>
          ) : null}
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-sand">
            <Link href={`/${locale}/chalets/${chalet.slug}`} className="hover:text-gold-soft">
              {chalet.title}
            </Link>
          </h2>
          <p className="mt-1 text-[0.85rem] text-gold-soft">{chalet.location}</p>
        </div>
        <p className="text-[0.9rem] leading-[1.7] text-sand-dim">{chalet.summary}</p>
        <p className="text-[0.82rem] text-sand-dim">
          {chalet.bedrooms} {t.chalets.bedrooms} · {chalet.bathrooms} {t.chalets.bathrooms}
        </p>
        <p className="text-[0.85rem] font-medium text-gold-soft">{t.chalets.priceHint}</p>
        <Link
          href={`/${locale}/chalets/${chalet.slug}`}
          className={buttonClass("ghost", "mt-auto w-full justify-center py-3 text-[0.88rem]")}
        >
          {t.chalets.details}
        </Link>
      </div>
    </article>
  );
}
