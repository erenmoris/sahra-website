import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The dashboard is not localised, so send every guessable spelling to it.
  if (/^(?:\/(?:ar|en))?\/(?:dashboard|admin)(\/.*)?$/i.test(pathname)) {
    const target = pathname.replace(/^\/(?:ar|en)/i, "").replace(/^\/dashboard/i, "/admin");
    if (target !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = target;
      // Permanent redirect so Google does not soft-duplicate /admin and /ar/admin.
      return NextResponse.redirect(url, 301);
    }
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  // Arabic is the site's primary language, so every visitor starts there and
  // switches to English deliberately from the header.
  // Permanent 301: Google treats / and /ar as soft-duplicates if / is 307.
  if (!hasLocale && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 301);
  }

  const headers = new Headers(request.headers);
  headers.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
