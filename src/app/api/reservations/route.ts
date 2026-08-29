import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createReservation, listReservations } from "@/lib/store";

export const runtime = "nodejs";

function clean(value: unknown, max = 200): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length ? trimmed : undefined;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 30);

  if (!name || !phone) {
    return NextResponse.json({ error: "name_and_phone_required" }, { status: 422 });
  }

  const reservation = await createReservation({
    name,
    phone,
    city: clean(body.city, 60),
    date: clean(body.date, 40),
    guests: clean(body.guests, 10),
    type: clean(body.type, 60),
    budget: clean(body.budget, 60),
    notes: clean(body.notes, 1000),
    source: clean(body.source, 40) ?? "website",
    locale: clean(body.locale, 5) ?? "ar",
  });

  return NextResponse.json({ reservation }, { status: 201 });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const reservations = await listReservations();
  return NextResponse.json({ reservations });
}
