"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import WhatsAppScreenshot from "@/components/WhatsAppScreenshot";

type TestimonialItem = Dictionary["testimonials"]["items"][number];

function ArrowIcon({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      {dir === "prev" ? (
        <path
          d="M14.5 6L8.5 12l6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9.5 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function TestimonialsSlider({
  items,
  locale,
}: {
  items: TestimonialItem[];
  locale: Locale;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const syncIndex = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
    if (cards.length === 0) return;

    const rootRect = el.getBoundingClientRect();
    const rootCenter = rootRect.left + rootRect.width / 2;
    let closest = 0;
    let best = Number.POSITIVE_INFINITY;
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const dist = Math.abs(center - rootCenter);
      if (dist < best) {
        best = dist;
        closest = i;
      }
    });
    setIndex(closest);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncIndex();
    el.addEventListener("scroll", syncIndex, { passive: true });
    window.addEventListener("resize", syncIndex);
    return () => {
      el.removeEventListener("scroll", syncIndex);
      window.removeEventListener("resize", syncIndex);
    };
  }, [syncIndex, items.length]);

  function scrollByDir(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const step = (card?.offsetWidth ?? 300) + 20;
    const delta = locale === "ar" ? -direction * step : direction * step;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }

  function goTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>("[data-slide]")[i];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  const atStart = index <= 0;
  const atEnd = index >= items.length - 1;

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          disabled={atStart}
          aria-label={locale === "ar" ? "السابق" : "Previous"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ink-2 text-gold-soft transition-all hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ArrowIcon dir={locale === "ar" ? "next" : "prev"} />
        </button>
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          disabled={atEnd}
          aria-label={locale === "ar" ? "التالي" : "Next"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ink-2 text-gold-soft transition-all hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ArrowIcon dir={locale === "ar" ? "prev" : "next"} />
        </button>
      </div>

      <div
        ref={scrollerRef}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:-mx-7 sm:px-7 md:gap-6"
      >
        {items.map((item, i) => (
          <figure
            key={`${item.contact ?? item.who ?? item.image}-${i}`}
            data-slide
            className="w-[min(300px,82vw)] shrink-0 snap-center sm:w-[320px]"
          >
            {item.messages && item.messages.length > 0 ? (
              <WhatsAppScreenshot
                chat={{
                  contact: item.contact ?? "عميل",
                  messages: item.messages,
                  clock: item.clock,
                  battery: item.battery,
                  signal: item.signal,
                  lastSeen: item.lastSeen,
                  dayLabel: item.dayLabel,
                }}
                caption={item.who}
                locale={locale}
              />
            ) : item.image ? (
              <div className="overflow-hidden rounded-[1.5rem] border border-gold/20 bg-ink-2/90 p-2 shadow-[0_28px_60px_-32px_rgba(0,0,0,0.9)] backdrop-blur-md">
                <div className="relative aspect-9/16 overflow-hidden rounded-[1.1rem] bg-[#0d1a1f]">
                  <Image
                    src={item.image}
                    alt={
                      item.name || item.who
                        ? locale === "ar"
                          ? `واتساب — ${[item.name, item.who].filter(Boolean).join(" · ")}`
                          : `WhatsApp — ${[item.name, item.who].filter(Boolean).join(" · ")}`
                        : locale === "ar"
                          ? "لقطة شات واتساب من عميل"
                          : "WhatsApp chat screenshot from a guest"
                    }
                    fill
                    sizes="320px"
                    className="object-cover object-top"
                    loading={i < 3 ? "eager" : "lazy"}
                    unoptimized={item.image.startsWith("http")}
                  />
                </div>
              </div>
            ) : null}

            {item.who ? (
              <figcaption className="mt-3 flex items-center justify-center gap-1.5 text-[0.82rem] text-sand-dim">
                <span className="text-[0.9rem] tracking-tighter text-[#53bdeb]">✓✓</span>
                {item.name ? <span className="text-sand">{item.name}</span> : null}
                {item.who}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {items.length > 1 ? (
        <div
          className="mt-5 flex items-center justify-center gap-2"
          role="tablist"
          aria-label={locale === "ar" ? "شرائح الآراء" : "Review slides"}
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/55"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
