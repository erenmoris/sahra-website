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
  const height = size === "sm" ? 36 : 44;
  const width = Math.round(height * (519 / 244));

  return (
    <Link
      href={`/${locale}`}
      className={`group inline-flex items-center ${className}`}
      aria-label={locale === "ar" ? "سهرة — الرئيسية" : "Sahra — Home"}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className="h-auto w-auto shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
        priority={size === "md"}
      />
    </Link>
  );
}
