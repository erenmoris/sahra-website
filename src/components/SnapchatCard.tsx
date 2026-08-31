import type { Locale } from "@/i18n/config";
import { SNAPCHAT_URL, type Dictionary } from "@/i18n/dictionaries";
import { SnapchatIcon } from "./Icons";
import TrackedLink from "./TrackedLink";

export default function SnapchatCard({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <div className="flex flex-col items-start gap-6 border border-gold/20 bg-ink-2 px-7 py-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFFC00] text-ink">
          <SnapchatIcon className="h-7 w-7" />
        </span>
        <div>
          <h3 className="font-display text-[1.3rem] font-semibold text-sand">{t.social.title}</h3>
          <p className="mt-1.5 max-w-[52ch] text-[0.92rem] leading-[1.75] text-sand-dim">
            {t.social.body}
          </p>
        </div>
      </div>

      <TrackedLink
        href={SNAPCHAT_URL}
        placement="snapchat-card"
        locale={locale}
        className="inline-flex shrink-0 items-center gap-2.5 rounded-sm bg-[#FFFC00] px-6 py-3.5 text-[0.9rem] font-bold text-ink transition-transform hover:-translate-y-px"
      >
        <SnapchatIcon className="h-5 w-5" />
        {t.social.snapchat}
        <span className="font-mono text-[0.8rem] opacity-70" dir="ltr">
          @{t.social.handle}
        </span>
      </TrackedLink>
    </div>
  );
}
