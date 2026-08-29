import type { Reservation, ReservationStatus, WhatsAppClick } from "@/lib/types";

export type NewReservation = Omit<
  Reservation,
  "id" | "ref" | "status" | "createdAt" | "updatedAt"
>;

export type NewWhatsAppClick = Omit<WhatsAppClick, "id" | "createdAt">;

export type ReservationStore = {
  kind: "file" | "postgres";
  list(): Promise<Reservation[]>;
  create(input: NewReservation): Promise<Reservation>;
  updateStatus(id: string, status: ReservationStatus): Promise<Reservation | null>;
  remove(id: string): Promise<boolean>;
  logClick(input: NewWhatsAppClick): Promise<void>;
  listClicks(limit?: number): Promise<WhatsAppClick[]>;
};
