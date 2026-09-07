"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { buttonClass } from "./ui";

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
}: {
  locale: Locale;
  t: Dictionary;
  links: NavLink[];
  other: Locale;
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
    <div className="relative md:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold/60 bg-ink-2 text-gold"
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
            className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm"
            aria-label={locale === "ar" ? "إغلاق" : "Close"}
            onClick={close}
          />
          <nav
            id="mobile-nav"
            className="absolute end-0 top-[calc(100%+0.75rem)] z-50 w-[min(100vw-1.5rem,320px)] max-h-[70dvh] overflow-y-auto rounded-2xl border-2 border-gold/40 bg-ink-2 px-5 py-5 shadow-xl"
            aria-label={locale === "ar" ? "قائمة الموبايل" : "Mobile menu"}
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block border-b border-gold/15 py-4 text-[1.05rem] font-semibold text-sand transition-colors hover:text-gold"
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={`/${locale}#reserve`}
                className={buttonClass("primary", "w-full justify-center py-3.5 text-[0.95rem]")}
                onClick={close}
              >
                {t.nav.reserve}
              </Link>
              <Link
                href={`/${other}`}
                className="block rounded-full border-2 border-gold/60 bg-ink py-3.5 text-center text-[0.9rem] font-semibold text-sand transition-colors hover:border-gold hover:text-gold"
                onClick={close}
              >
                {t.langSwitch}
              </Link>
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}
