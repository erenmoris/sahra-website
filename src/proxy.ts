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
      return NextResponse.redirect(url, { status: 308 });
    }
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  // Serve Arabic at "/" with HTTP 200 (rewrite), not a 308 redirect.
  // Search Console was flagging "/" as "Page with redirect" and not indexing it.
  // Canonical + sitemap still point at /ar so Google consolidates there.
  if (!hasLocale && (pathname === "/" || pathname === "")) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    const headers = new Headers(request.headers);
    headers.set("x-pathname", `/${defaultLocale}`);
    return NextResponse.rewrite(url, { request: { headers } });
  }

  // Collapse trailing-slash duplicates: /ar/ → /ar
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "") || `/${defaultLocale}`;
    return NextResponse.redirect(url, { status: 308 });
  }

  // Legacy guide URL duplicated /trust content — send Google to one canonical.
  const guideMatch = pathname.match(/^\/(ar|en)\/guide\/?$/i);
  if (guideMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/${guideMatch[1].toLowerCase()}/trust`;
    return NextResponse.redirect(url, { status: 308 });
  }

  const headers = new Headers(request.headers);
  headers.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
