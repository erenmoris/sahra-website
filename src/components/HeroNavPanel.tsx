import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Logo from "./Logo";
import { buttonClass } from "./ui";

type NavLink = { href: string; label: string };

export default function HeroNavPanel({
  locale,
  t,
  links,
  logoSrc,
  onNavigate,
  className = "",
}: {
  locale: Locale;
  t: Dictionary;
  links: NavLink[];
  logoSrc?: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`bob relative mx-auto w-full max-w-[400px] rounded-[22px] border border-gold/20 bg-gradient-to-b from-ink-3 to-ink-2 p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ${className}`}
    >
      <p className="mb-6 text-center text-[0.72rem] tracking-[0.12em] text-gold-soft uppercase">
        {locale === "ar" ? "القائمة الرئيسية" : "Main navigation"}
      </p>

      <div className="mb-8 flex justify-center">
        <Logo locale={locale} src={logoSrc} size="lg" linked={false} />
      </div>

      <nav
        className="flex flex-col gap-2"
        aria-label={locale === "ar" ? "روابط الأقسام" : "Section links"}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="rounded-sm border border-gold/15 bg-ink/60 px-4 py-3.5 text-center text-[0.95rem] text-sand transition-colors hover:border-gold/40 hover:text-gold-soft"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={`/${locale}#reserve`}
          onClick={onNavigate}
          className={buttonClass("ghost", "mt-2 w-full justify-center py-3.5 text-[0.95rem]")}
        >
          {t.nav.reserve}
        </Link>
      </nav>
    </div>
  );
}
