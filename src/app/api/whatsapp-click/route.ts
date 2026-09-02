import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { listWhatsAppClicks, logWhatsAppClick } from "@/lib/store";

export const runtime = "nodejs";

function clean(value: unknown, max: number, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length ? trimmed : fallback;
}

export async function POST(request: Request) {
  // Sent with navigator.sendBeacon, so the body arrives as plain text.
  const raw = await request.text();
  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    body = {};
  }

  await logWhatsAppClick({
    placement: clean(body.placement, 40, "unknown"),
    locale: clean(body.locale, 5, "ar"),
    page: clean(body.page, 200, "/"),
    country: request.headers.get("x-vercel-ip-country") ?? undefined,
  });

  return new NextResponse(null, { status: 204 });
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const clicks = await listWhatsAppClicks(100);
    return NextResponse.json({ clicks });
  } catch (error) {
    console.error("whatsapp-click list failed:", error);
    return NextResponse.json({ error: "storage_unavailable", clicks: [] }, { status: 503 });
  }
}
