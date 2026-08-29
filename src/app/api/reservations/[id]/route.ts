import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { deleteReservation, updateReservationStatus } from "@/lib/store";
import { RESERVATION_STATUSES, type ReservationStatus } from "@/lib/types";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as { status?: string };

  if (!body.status || !(RESERVATION_STATUSES as readonly string[]).includes(body.status)) {
    return NextResponse.json({ error: "invalid_status" }, { status: 422 });
  }

  const reservation = await updateReservationStatus(id, body.status as ReservationStatus);
  if (!reservation) return NextResponse.json({ error: "not_found" }, { status: 404 });

  return NextResponse.json({ reservation });
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const deleted = await deleteReservation(id);
  if (!deleted) return NextResponse.json({ error: "not_found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
