import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Wrap, buttonClass } from "./ui";

export default function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const other: Locale = locale === "ar" ? "en" : "ar";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-ink/85 backdrop-blur-md">
      <Wrap className="flex h-[76px] items-center justify-between">
        <Link href={`/${locale}`} className="font-display text-2xl font-bold text-sand">
          {locale === "ar" ? "سهرة" : "Sahra"} <span className="text-gold-soft">·</span>
        </Link>

        <div className="flex items-center gap-6 sm:gap-9">
          <nav className="hidden items-center gap-9 md:flex">
            <a
              href="#how"
              className="text-[0.86rem] text-sand-dim transition-colors hover:text-gold-soft"
            >
              {t.nav.how}
            </a>
            <a
              href="#venues"
              className="text-[0.86rem] text-sand-dim transition-colors hover:text-gold-soft"
            >
              {t.nav.venues}
            </a>
            <a
              href="#trust"
              className="text-[0.86rem] text-sand-dim transition-colors hover:text-gold-soft"
            >
              {t.nav.trust}
            </a>
          </nav>

          <Link
            href={`/${other}`}
            className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
          >
            {t.langSwitch}
          </Link>

          <a href="#reserve" className={buttonClass("ghost", "px-4 py-2.5 text-[0.82rem]")}>
            {t.nav.reserve}
          </a>
        </div>
      </Wrap>
    </header>
  );
}
