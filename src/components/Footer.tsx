import Link from "next/link";
import type { Locale } from "@/i18n/config";
import {
  SNAPCHAT_URL,
  whatsappLink,
  type Dictionary,
} from "@/i18n/dictionaries";
import Logo from "./Logo";
import { SnapchatIcon, WhatsAppIcon } from "./Icons";
import TrackedLink from "./TrackedLink";
import { Wrap } from "./ui";

const linkClass =
  "text-[0.92rem] text-sand-dim transition-colors duration-300 hover:text-gold";

const socialClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold transition-all duration-300 hover:border-gold hover:text-gold-soft hover:shadow-[0_0_24px_-4px_rgba(201,162,75,0.75)] hover:scale-105";

export default function Footer({
  locale,
  t,
  logoSrc,
}: {
  locale: Locale;
  t: Dictionary;
  logoSrc?: string;
}) {
  const year = 2026;
  const brand = locale === "ar" ? "سهرة" : "Sahra";

  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-gold/20 bg-[#0b101e] pt-16 pb-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <Wrap>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div data-testid="footer-brand" className="sm:col-span-2 lg:col-span-1">
            <div data-testid="footer-logo">
              <Logo locale={locale} size="sm" src={logoSrc} />
            </div>
            <p className="mt-5 max-w-[28ch] font-display text-[1.15rem] leading-[1.7] text-sand">
              {t.footer.slogan}
            </p>
            <p className="mt-4 max-w-[36ch] text-[0.8rem] leading-[1.8] text-sand-dim/80">
              {t.footer.note}
            </p>
          </div>

          <div data-testid="footer-discover">
            <h2 className="mb-5 text-[0.75rem] font-semibold tracking-[0.16em] text-gold uppercase">
              {t.footer.discoverTitle}
            </h2>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link
                  href={`/${locale}/venues`}
                  data-testid="footer-link-nightlife"
                  className={linkClass}
                >
                  {t.footer.links.venues}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/nightclubs`}
                  data-testid="footer-link-nightclubs"
                  className={linkClass}
                >
                  {t.footer.links.nightclubs}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/beaches`}
                  data-testid="footer-link-beaches"
                  className={linkClass}
                >
                  {t.footer.links.beaches}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/gallery`}
                  data-testid="footer-link-gallery"
                  className={linkClass}
                >
                  {t.footer.links.gallery}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/chalets`}
                  data-testid="footer-link-chalets"
                  className={linkClass}
                >
                  {t.footer.chaletsStay}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/cars`}
                  data-testid="footer-link-cars"
                  className={linkClass}
                >
                  {t.footer.links.cars}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  data-testid="footer-link-about"
                  className={linkClass}
                >
                  {t.footer.links.about}
                </Link>
              </li>
            </ul>
          </div>

          <div data-testid="footer-legal">
            <h2 className="mb-5 text-[0.75rem] font-semibold tracking-[0.16em] text-gold uppercase">
              {t.footer.legalTitle}
            </h2>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  data-testid="footer-link-privacy"
                  className={linkClass}
                >
                  {t.footer.links.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  data-testid="footer-link-terms"
                  className={linkClass}
                >
                  {t.footer.links.terms}
                </Link>
              </li>
            </ul>
          </div>

          <div data-testid="footer-connect">
            <h2 className="mb-5 text-[0.75rem] font-semibold tracking-[0.16em] text-gold uppercase">
              {t.footer.connectTitle}
            </h2>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href={whatsappLink(t.whatsappMessage)}
                placement="footer-whatsapp"
                locale={locale}
                t={t}
                testId="footer-social-whatsapp"
                ariaLabel={t.footer.links.whatsapp}
                className={socialClass}
              >
                <WhatsAppIcon className="h-5 w-5" />
              </TrackedLink>
              <TrackedLink
                href={SNAPCHAT_URL}
                placement="footer-snapchat"
                locale={locale}
                t={t}
                testId="footer-social-snapchat"
                ariaLabel={t.footer.links.snapchat}
                className={socialClass}
              >
                <SnapchatIcon className="h-5 w-5" />
              </TrackedLink>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-gold/20 pt-7">
          <p
            data-testid="footer-copyright"
            className="text-[0.78rem] tracking-[0.02em] text-sand-dim/85"
          >
            © {year} {brand}. {t.footer.copyright}
          </p>
        </div>
      </Wrap>
    </footer>
  );
}

export function WhatsAppFloat({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <TrackedLink
      href={whatsappLink(t.whatsappMessage)}
      placement="floating-button"
      locale={locale}
      t={t}
      testId="floating-whatsapp"
      ariaLabel={t.footer.links.whatsapp}
      className="halo fixed bottom-6 end-6 z-60 flex h-14 w-14 items-center justify-center rounded-full bg-[#1d7a52] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:scale-110 hover:bg-[#22935f]"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </TrackedLink>
  );
}
