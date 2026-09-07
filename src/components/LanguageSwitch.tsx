"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";

/** Swap `/ar/...` ↔ `/en/...` while keeping the rest of the path + query. */
export function localeSiblingHref(pathname: string, nextLocale: Locale, search = ""): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const segments = clean.split("/");
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = nextLocale;
  } else {
    segments.splice(1, 0, nextLocale);
  }
  const path = segments.join("/") || `/${nextLocale}`;
  return `${path}${search}`;
}

export default function LanguageSwitch({
  locale,
  label,
  className,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || `/${locale}`;
  const searchParams = useSearchParams();
  const other: Locale = locale === "ar" ? "en" : "ar";
  const search = searchParams?.toString();
  const href = localeSiblingHref(pathname, other, search ? `?${search}` : "");

  return (
    <Link href={href} className={className} onClick={onNavigate} hrefLang={other}>
      {label}
    </Link>
  );
}
