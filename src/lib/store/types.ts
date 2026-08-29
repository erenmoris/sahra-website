import type { Reservation, ReservationStatus } from "@/lib/types";

export type NewReservation = Omit<
  Reservation,
  "id" | "ref" | "status" | "createdAt" | "updatedAt"
>;

export type ReservationStore = {
  kind: "file" | "postgres";
  list(): Promise<Reservation[]>;
  create(input: NewReservation): Promise<Reservation>;
  updateStatus(id: string, status: ReservationStatus): Promise<Reservation | null>;
  remove(id: string): Promise<boolean>;
};
