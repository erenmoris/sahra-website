import type { Reservation, ReservationStatus, WhatsAppClick } from "@/lib/types";
import { fileStore } from "./file-store";
import { DATABASE_URL, postgresStore } from "./postgres-store";
import type { NewReservation, NewWhatsAppClick, ReservationStore } from "./types";

export type { NewReservation, NewWhatsAppClick } from "./types";

// Postgres is used whenever a database URL is present (the Vercel deployment);
// otherwise reservations are kept in a local JSON file for development.
const store: ReservationStore = DATABASE_URL ? postgresStore : fileStore;

export const storeKind = store.kind;

export function listReservations(): Promise<Reservation[]> {
  return store.list();
}

export function createReservation(input: NewReservation): Promise<Reservation> {
  return store.create(input);
}

export function updateReservationStatus(
  id: string,
  status: ReservationStatus,
): Promise<Reservation | null> {
  return store.updateStatus(id, status);
}

export function deleteReservation(id: string): Promise<boolean> {
  return store.remove(id);
}

export function logWhatsAppClick(input: NewWhatsAppClick): Promise<void> {
  return store.logClick(input);
}

export function listWhatsAppClicks(limit?: number): Promise<WhatsAppClick[]> {
  return store.listClicks(limit);
}
