import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find((code) => (locales as readonly string[]).includes(code));
  return preferred ?? defaultLocale;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocale && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${detectLocale(request)}`;
    return NextResponse.redirect(url);
  }

  const headers = new Headers(request.headers);
  headers.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
