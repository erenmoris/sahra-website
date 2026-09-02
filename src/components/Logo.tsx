import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  className?: string;
  /** Header size (default) vs compact footer */
  size?: "md" | "sm";
};

export default function Logo({ locale, className = "", size = "md" }: Props) {
  const src = "/brand/logo-header.png";
  const alt = locale === "ar" ? "سهرة" : "Sahra";
  // ~56px in 88px header — full wordmark including crescent
  const height = size === "sm" ? 32 : 56;
  const width = Math.round(height * (864 / 476));
  const sizeClass = size === "sm" ? "h-8" : "h-14";

  return (
    <Link
      href={`/${locale}`}
      className={`group inline-flex shrink-0 items-center ${className}`}
      aria-label={locale === "ar" ? "سهرة — الرئيسية" : "Sahra — Home"}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className={`${sizeClass} w-auto object-contain object-center drop-shadow-[0_0_12px_rgba(201,162,75,0.45)] transition-transform duration-300 group-hover:scale-[1.03]`}
        priority={size === "md"}
      />
    </Link>
  );
}
