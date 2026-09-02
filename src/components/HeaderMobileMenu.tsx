"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import HeroNavPanel from "./HeroNavPanel";

type NavLink = { href: string; label: string };

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6 text-sand"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <>
          <path strokeLinecap="round" d="M4 7h16" />
          <path strokeLinecap="round" d="M4 12h16" />
          <path strokeLinecap="round" d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export default function HeaderMobileMenu({
  locale,
  t,
  links,
  other,
  logoSrc,
}: {
  locale: Locale;
  t: Dictionary;
  links: NavLink[];
  other: Locale;
  logoSrc?: string;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-gold/25 md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={
          open
            ? locale === "ar"
              ? "إغلاق القائمة"
              : "Close menu"
            : locale === "ar"
              ? "فتح القائمة"
              : "Open menu"
        }
        onClick={() => setOpen((v) => !v)}
      >
        <MenuIcon open={open} />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[88px] z-40 bg-ink/70 md:hidden"
            aria-label={locale === "ar" ? "إغلاق" : "Close"}
            onClick={close}
          />
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-[88px] z-50 max-h-[calc(100dvh-88px)] overflow-y-auto border-b border-gold/20 bg-ink px-6 py-8 md:hidden"
            aria-label={locale === "ar" ? "قائمة الموبايل" : "Mobile menu"}
          >
            <HeroNavPanel
              locale={locale}
              t={t}
              links={links}
              logoSrc={logoSrc}
              onNavigate={close}
              className="max-w-none shadow-none"
            />

            <div className="mt-6">
              <Link
                href={`/${other}`}
                className="block rounded-sm border border-gold/25 py-3.5 text-center text-[0.9rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
                onClick={close}
              >
                {t.langSwitch}
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
