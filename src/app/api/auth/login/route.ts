import { NextResponse } from "next/server";
import { createToken, SESSION_COOKIE, sessionCookieOptions, verifyCredentials } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    username?: string;
    password?: string;
  };

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createToken(username.trim()), sessionCookieOptions);
  return response;
}
