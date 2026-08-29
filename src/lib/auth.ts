import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "sahra_session";
const SESSION_MAX_AGE = 60 * 60 * 12;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "erenmoris";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "1234";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "sahra-dev-secret-change-me";

type SessionPayload = { username: string; exp: number };

function sign(value: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
}

export function verifyCredentials(username: string, password: string): boolean {
  return safeEqual(username.trim(), ADMIN_USERNAME) && safeEqual(password, ADMIN_PASSWORD);
}

export function createToken(username: string): string {
  const payload: SessionPayload = { username, exp: Date.now() + SESSION_MAX_AGE * 1000 };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  if (!safeEqual(signature, sign(body))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return readToken(store.get(SESSION_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE,
  secure: process.env.NODE_ENV === "production",
};
