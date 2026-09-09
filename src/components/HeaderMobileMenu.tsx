"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import {
  SNAPCHAT_URL,
  type Dictionary,
} from "@/i18n/dictionaries";
import LanguageSwitch from "./LanguageSwitch";
import { SnapchatIcon } from "./Icons";
import TrackedLink from "./TrackedLink";

type NavLink = { href: string; label: string; testId?: string };

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

const NAV_TESTIDS: Record<string, string> = {
  home: "mobile-nav-home",
  venues: "mobile-nav-nightlife",
  beaches: "mobile-nav-beaches",
  chalets: "mobile-nav-accommodation",
  about: "mobile-nav-about",
  trust: "mobile-nav-trust",
};

function testIdForHref(href: string): string {
  const path = href.replace(/\/(ar|en)\/?/, "/").replace(/^\//, "");
  const key = path.split("/")[0] || "home";
  if (!path) return NAV_TESTIDS.home;
  return NAV_TESTIDS[key] ?? `mobile-nav-${key}`;
}

export default function HeaderMobileMenu({
  locale,
  t,
  links,
}: {
  locale: Locale;
  t: Dictionary;
  links: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const overlayId = useId();
  const other: Locale = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const overlay =
    mounted && open ? (
      <div
        id={overlayId}
        data-testid="mobile-menu-overlay"
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#0B101E]/90 backdrop-blur-2xl"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 px-5 pt-5 sm:px-7">
          <p className="font-display text-[1.15rem] font-bold tracking-[0.04em] text-gold">
            {locale === "ar" ? "سهرة" : "Sahra"}
          </p>
          <div className="flex items-center gap-2.5">
            <Suspense
              fallback={
                <Link
                  href={`/${other}`}
                  data-testid="mobile-lang-switch"
                  className="inline-flex h-11 items-center justify-center rounded-full border-2 border-gold bg-gold/10 px-4 text-[0.82rem] font-semibold text-gold transition-colors hover:bg-gold/20"
                  onClick={close}
                  hrefLang={other}
                >
                  {t.langSwitch}
                </Link>
              }
            >
              <LanguageSwitch
                locale={locale}
                label={t.langSwitch}
                testId="mobile-lang-switch"
                className="inline-flex h-11 items-center justify-center rounded-full border-2 border-gold bg-gold/10 px-4 text-[0.82rem] font-semibold text-gold transition-colors hover:bg-gold/20"
                onNavigate={close}
              />
            </Suspense>
            <button
              type="button"
              data-testid="mobile-close-btn"
              onClick={close}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_20px_-4px_rgba(201,162,75,0.6)]"
              aria-label={locale === "ar" ? "إغلاق" : "Close"}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>

        <nav
          className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-4"
          aria-label={locale === "ar" ? "قائمة الموبايل" : "Mobile menu"}
        >
          <ul className="flex w-full max-w-md flex-col items-center gap-0.5">
            {links.map((link) => (
              <li key={link.href} className="w-full text-center">
                <Link
                  href={link.href}
                  data-testid={link.testId ?? testIdForHref(link.href)}
                  className="block py-2.5 font-display text-[clamp(1.35rem,5.5vw,2rem)] font-bold text-sand transition-all duration-300 hover:scale-[1.04] hover:text-gold hover:drop-shadow-[0_0_18px_rgba(201,162,75,0.45)] active:scale-[1.04] active:text-gold"
                  onClick={close}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 px-6 pb-10 pt-2 sm:px-8">
          <div className="flex items-center justify-center gap-5">
            <TrackedLink
              href={SNAPCHAT_URL}
              placement="mobile-menu-snapchat"
              locale={locale}
              t={t}
              testId="mobile-social-snapchat"
              ariaLabel={t.footer.links.snapchat}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_-4px_rgba(201,162,75,0.65)]"
            >
              <SnapchatIcon className="h-5 w-5" />
            </TrackedLink>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        data-testid="mobile-menu-trigger"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold/60 bg-ink-2 text-gold"
        aria-expanded={open}
        aria-controls={open ? overlayId : undefined}
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

      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </div>
  );
}
