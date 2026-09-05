import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

const DEFAULT_LOGO = "/brand/logo-header.png";
const ASPECT = 864 / 476;

type Props = {
  locale: Locale;
  className?: string;
  /** Header size (default) vs compact footer */
  size?: "md" | "sm" | "lg";
  /** CMS override — falls back to default brand asset */
  src?: string;
  /** When false, render image only (no home link). */
  linked?: boolean;
};

export default function Logo({
  locale,
  className = "",
  size = "md",
  src,
  linked = true,
}: Props) {
  const logoSrc = src || DEFAULT_LOGO;
  const alt = locale === "ar" ? "سهرة" : "Sahra";
  const height = size === "sm" ? 32 : size === "lg" ? 72 : 56;
  const width = Math.round(height * ASPECT);
  const sizeClass = size === "sm" ? "h-8" : size === "lg" ? "h-[72px]" : "h-14";

  const image = (
    <Image
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      className={`${sizeClass} w-auto object-contain object-center drop-shadow-[0_0_12px_rgba(201,162,75,0.45)] transition-transform duration-300 group-hover:scale-[1.03]`}
      priority={size === "md" || size === "lg"}
      loading={size === "sm" ? "lazy" : "eager"}
    />
  );

  if (!linked) {
    return <span className={`inline-flex shrink-0 items-center ${className}`}>{image}</span>;
  }

  return (
    <Link
      href={`/${locale}`}
      className={`group inline-flex shrink-0 items-center ${className}`}
      aria-label={locale === "ar" ? "سهرة — الرئيسية" : "Sahra — Home"}
    >
      {image}
    </Link>
  );
}

export { DEFAULT_LOGO, ASPECT as LOGO_ASPECT };
