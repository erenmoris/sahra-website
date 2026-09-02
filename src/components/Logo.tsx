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
  const height = size === "sm" ? 28 : 32;
  const width = Math.round(height * (949 / 263));
  const sizeClass = size === "sm" ? "h-7" : "h-8";

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
        className={`${sizeClass} w-auto max-w-[4.5rem] object-contain object-center transition-transform duration-300 group-hover:scale-[1.03] sm:max-w-[5rem]`}
        priority={size === "md"}
      />
    </Link>
  );
}
