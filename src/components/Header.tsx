import Link from "next/link";
import { Suspense } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import HeaderMobileMenu from "./HeaderMobileMenu";
import LanguageSwitch from "./LanguageSwitch";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { Wrap, buttonClass } from "./ui";

type NavLink = { href: string; label: string };

export function buildNavLinks(locale: Locale, t: Dictionary): NavLink[] {
  return [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/venues`, label: t.nav.venues },
    { href: `/${locale}/beaches`, label: t.nav.beaches },
    { href: `/${locale}/chalets`, label: t.nav.chalets },
    { href: `/${locale}/trust`, label: t.nav.trust },
  ];
}

function LanguageSwitchFallback({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const other: Locale = locale === "ar" ? "en" : "ar";
  return (
    <Link href={`/${other}`} className={className} hrefLang={other}>
      {label}
    </Link>
  );
}

export default function Header({
  locale,
  t,
  logoSrc,
}: {
  locale: Locale;
  t: Dictionary;
  logoSrc?: string;
}) {
  const links = buildNavLinks(locale, t);
  const langClass =
    "hidden rounded-full border-2 border-gold/60 bg-ink-2 px-3.5 py-2 text-[0.78rem] font-semibold text-sand transition-colors hover:border-gold hover:text-gold sm:inline-block";

  return (
    <header className="relative z-50 border-b border-gold/35 bg-ink/95">
      <Wrap className="flex h-[80px] items-center justify-between gap-4 sm:gap-6 md:gap-9">
        <Logo locale={locale} className="shrink-0" src={logoSrc} />

        <div className="flex items-center gap-2.5 sm:gap-4 md:gap-6">
          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label={locale === "ar" ? "التنقل" : "Main"}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link relative py-1 text-[0.88rem] font-semibold text-sand transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle locale={locale} />

          <Suspense fallback={<LanguageSwitchFallback locale={locale} label={t.langSwitch} className={langClass} />}>
            <LanguageSwitch locale={locale} label={t.langSwitch} className={langClass} />
          </Suspense>

          <Link
            href={`/${locale}#reserve`}
            className={`${buttonClass("primary", "hidden px-5 py-2.5 text-[0.84rem] sm:inline-flex")}`}
          >
            {t.nav.reserve}
          </Link>

          <HeaderMobileMenu locale={locale} t={t} links={links} />
        </div>
      </Wrap>
    </header>
  );
}
