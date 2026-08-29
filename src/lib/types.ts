export const RESERVATION_STATUSES = ["new", "contacted", "confirmed", "cancelled"] as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export type WhatsAppClick = {
  id: string;
  placement: string;
  locale: string;
  page: string;
  country?: string;
  createdAt: string;
};

export type Reservation = {
  id: string;
  ref: string;
  name: string;
  phone: string;
  city?: string;
  date?: string;
  guests?: string;
  type?: string;
  budget?: string;
  notes?: string;
  source: string;
  locale: string;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
};
