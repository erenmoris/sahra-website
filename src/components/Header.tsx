"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Logo from "./Logo";
import { Wrap, buttonClass } from "./ui";

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

export default function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const other: Locale = locale === "ar" ? "en" : "ar";
  const [open, setOpen] = useState(false);

  const links: NavLink[] = [
    { href: `/${locale}#how`, label: t.nav.how },
    { href: `/${locale}#venues`, label: t.nav.venues },
    { href: `/${locale}#trust`, label: t.nav.trust },
  ];

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-ink/85 backdrop-blur-md">
      <Wrap className="flex h-[76px] items-center justify-between">
        <Logo locale={locale} />

        <div className="flex items-center gap-4 sm:gap-6 md:gap-9">
          <nav className="hidden items-center gap-9 md:flex" aria-label={locale === "ar" ? "التنقل" : "Main"}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.86rem] text-sand-dim transition-colors hover:text-gold-soft"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href={`/${other}`}
            className="hidden border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft sm:inline-block"
          >
            {t.langSwitch}
          </Link>

          <Link
            href={`/${locale}#reserve`}
            className={`${buttonClass("ghost", "px-4 py-2.5 text-[0.82rem]")} hidden sm:inline-flex`}
          >
            {t.nav.reserve}
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-gold/25 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? (locale === "ar" ? "إغلاق القائمة" : "Close menu") : locale === "ar" ? "فتح القائمة" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </Wrap>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[76px] z-40 bg-ink/70 md:hidden"
            aria-label={locale === "ar" ? "إغلاق" : "Close"}
            onClick={close}
          />
          <nav
            id="mobile-nav"
            className="fixed inset-x-0 top-[76px] z-50 max-h-[calc(100dvh-76px)] overflow-y-auto border-b border-gold/20 bg-ink px-6 py-6 md:hidden"
            aria-label={locale === "ar" ? "قائمة الموبايل" : "Mobile menu"}
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block border-b border-gold/10 py-4 text-[1.05rem] text-sand transition-colors hover:text-gold-soft"
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
                className={buttonClass("ghost", "w-full justify-center py-3.5 text-[0.95rem]")}
                onClick={close}
              >
                {t.nav.reserve}
              </Link>
              <Link
                href={`/${other}`}
                className="block border border-gold/25 py-3.5 text-center text-[0.9rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
                onClick={close}
              >
                {t.langSwitch}
              </Link>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
