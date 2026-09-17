import { permanentRedirect } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Legacy SEO duplicate of /trust — permanently consolidate for Google. */
export default async function GuideRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) permanentRedirect("/ar/trust");
  permanentRedirect(`/${locale}/trust`);
}
