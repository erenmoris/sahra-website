import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import HeaderMobileMenu from "./HeaderMobileMenu";
import Logo from "./Logo";
import { Wrap, buttonClass } from "./ui";

type NavLink = { href: string; label: string };

export default function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const other: Locale = locale === "ar" ? "en" : "ar";

  const links: NavLink[] = [
    { href: `/${locale}#how`, label: t.nav.how },
    { href: `/${locale}#venues`, label: t.nav.venues },
    { href: `/${locale}#trust`, label: t.nav.trust },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-visible border-b border-gold/20 bg-ink/85 backdrop-blur-md">
      <Wrap className="flex h-[88px] items-center justify-between gap-4 sm:gap-6 md:gap-9">
        <Logo locale={locale} className="shrink-0" />

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

          <HeaderMobileMenu locale={locale} t={t} links={links} other={other} />
        </div>
      </Wrap>
    </header>
  );
}
