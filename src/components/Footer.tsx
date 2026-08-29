import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import { WhatsAppIcon } from "./Icons";
import { Wrap } from "./ui";

export default function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="border-t border-gold/20 pt-12 pb-10">
      <Wrap>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="font-display text-xl font-bold text-sand">
            {locale === "ar" ? "سهرة" : "Sahra"} <span className="text-gold-soft">·</span>
          </div>
          <div className="flex flex-wrap gap-6 text-[0.85rem] text-sand-dim">
            <a
              href={whatsappLink(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold-soft"
            >
              {t.footer.links.whatsapp}
            </a>
            <a href="#venues" className="transition-colors hover:text-gold-soft">
              {t.footer.links.venues}
            </a>
            <a href="#reserve" className="transition-colors hover:text-gold-soft">
              {t.footer.links.reserve}
            </a>
            <Link href="/admin" className="transition-colors hover:text-gold-soft">
              {t.footer.links.dashboard}
            </Link>
          </div>
        </div>
        <p className="mt-7 text-[0.76rem] leading-[1.8] text-[#6b6455]">{t.footer.note}</p>
        <p className="mt-2 text-[0.76rem] text-[#6b6455]">
          © {new Date().getFullYear()} {locale === "ar" ? "سهرة" : "Sahra"} — {t.footer.rights}
        </p>
      </Wrap>
    </footer>
  );
}

export function WhatsAppFloat({ t }: { t: Dictionary }) {
  return (
    <a
      href={whatsappLink(t.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.footer.links.whatsapp}
      className="fixed bottom-6 end-6 z-60 flex h-14 w-14 items-center justify-center rounded-full bg-[#1d7a52] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:scale-105 hover:bg-[#22935f]"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
