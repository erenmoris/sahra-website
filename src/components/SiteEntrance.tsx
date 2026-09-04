"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export const ENTRANCE_STORAGE_KEY = "sahra:entrance-load-v2";
const LOAD_MS = 4200;
const TEASER_SRC = "/brand/entrance-teaser.mp4";
const GATE_CLASS = "sahra-gate";

function clearGate() {
  document.documentElement.classList.remove(GATE_CLASS);
}

/**
 * Loading splash with teasing background video — once per session.
 * A pre-React gate in the root layout covers the page until this mounts.
 */
export default function SiteEntrance({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
  videoSrc?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Start closed so SSR matches returning visitors. New visitors stay covered by
  // the pre-React `sahra-gate` until this layout effect opens the splash.
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);
  const copy = t.entrance;

  useLayoutEffect(() => {
    if (sessionStorage.getItem(ENTRANCE_STORAGE_KEY)) {
      clearGate();
      return;
    }
    setOpen(true);
  }, []);

  // Drop the CSS gate only after the splash is in the DOM — avoids a one-frame content flash.
  useLayoutEffect(() => {
    if (open) clearGate();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => undefined);
  }, [open]);

  useEffect(() => {
    if (!open || leaving) return;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const p = Math.min(1, (now - start) / LOAD_MS);
      const eased = 1 - Math.pow(1 - p, 2.4);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setReady(true);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, leaving]);

  useEffect(() => {
    if (!ready || leaving) return;
    const timer = window.setTimeout(() => close(), 380);
    return () => window.clearTimeout(timer);
  }, [ready, leaving]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setLeaving(true);
    sessionStorage.setItem(ENTRANCE_STORAGE_KEY, "1");
    clearGate();
    window.setTimeout(() => setOpen(false), 500);
  }

  if (!open) return null;

  return (
    <div
      data-sahra-entrance
      role="status"
      aria-live="polite"
      aria-busy={!ready}
      aria-label={copy.loading}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-end overflow-hidden bg-[#07090f] transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src={TEASER_SRC}
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 bg-ink/40" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" aria-hidden />

      <div className="relative z-10 mb-[min(6vh,48px)] flex w-full max-w-[280px] flex-col items-center px-6 pb-6 pt-4">
        <p className="font-display text-[2rem] tracking-[0.28em] text-gold-soft drop-shadow-[0_2px_20px_rgba(0,0,0,0.65)]">
          {copy.brand}
        </p>
        <p className="mt-4 text-[0.9rem] tracking-wide text-sand drop-shadow-[0_1px_12px_rgba(0,0,0,0.7)]">
          {copy.loading}
        </p>

        <div className="mt-10 h-[2px] w-full overflow-hidden bg-sand/15">
          <div
            className="h-full bg-gold-soft transition-[width] duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 font-mono text-[0.72rem] tabular-nums text-sand/70">{progress}%</p>

        <button
          type="button"
          onClick={close}
          className="mt-12 cursor-pointer text-[0.72rem] text-sand/45 transition-colors hover:text-sand"
        >
          {copy.skip}
        </button>
      </div>
    </div>
  );
}
