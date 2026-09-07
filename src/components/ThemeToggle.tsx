"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "sahra:theme";

/** Cream luxury is default; dark only when explicitly chosen. */
export function getStoredTheme(): ThemeMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function applyTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle("light", mode === "light");
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // ignore
  }
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19.5 13.2A7.6 7.6 0 0 1 10.8 4.5 7.8 7.8 0 1 0 19.5 13.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThemeToggle({ locale }: { locale: Locale }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    applyTheme(stored);
    setMode(stored);
    setReady(true);
  }, []);

  function toggle() {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    applyTheme(next);
    setMode(next);
  }

  const label =
    mode === "dark"
      ? locale === "ar"
        ? "الوضع الفاتح"
        : "Light mode"
      : locale === "ar"
        ? "الوضع الداكن"
        : "Dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      suppressHydrationWarning
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold/60 bg-ink-2 text-gold transition-colors hover:border-gold hover:bg-gold/15"
    >
      {!ready || mode === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
