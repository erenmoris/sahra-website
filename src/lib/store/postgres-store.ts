import { neon } from "@neondatabase/serverless";
import type { Reservation, ReservationStatus, WhatsAppClick } from "@/lib/types";
import type { NewReservation, NewWhatsAppClick, ReservationStore } from "./types";
import { makeRef, newId } from "./ids";

// Hosting providers name the connection string differently (and Vercel storage
// integrations can add a prefix), so fall back to any Postgres URL in the env.
function findDatabaseUrl(): string {
  const preferred = [
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
    process.env.SAHRA_DATABASE_URL,
  ].find((value) => value && value.startsWith("post"));

  if (preferred) return preferred;

  const discovered = Object.entries(process.env).find(
    ([key, value]) =>
      /(?:DATABASE|POSTGRES)/i.test(key) &&
      !/PRISMA|NON_?POOL|UNPOOLED/i.test(key) &&
      typeof value === "string" &&
      /^postgres(?:ql)?:\/\//.test(value),
  );

  return discovered?.[1] ?? "";
}

export const DATABASE_URL = findDatabaseUrl();

const sql = DATABASE_URL ? neon(DATABASE_URL) : null;

let schemaReady: Promise<void> | null = null;

function client() {
  if (!sql) throw new Error("DATABASE_URL is not configured");
  return sql;
}

async function ensureSchema(): Promise<void> {
  schemaReady ??= (async () => {
    await client()`
      CREATE TABLE IF NOT EXISTS reservations (
        id          TEXT PRIMARY KEY,
        ref         TEXT NOT NULL,
        name        TEXT NOT NULL,
        phone       TEXT NOT NULL,
        city        TEXT,
        date        TEXT,
        guests      TEXT,
        type        TEXT,
        budget      TEXT,
        notes       TEXT,
        source      TEXT NOT NULL DEFAULT 'website',
        locale      TEXT NOT NULL DEFAULT 'ar',
        status      TEXT NOT NULL DEFAULT 'new',
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    await client()`
      CREATE INDEX IF NOT EXISTS reservations_created_at_idx
      ON reservations (created_at DESC)
    `;
    await client()`
      CREATE TABLE IF NOT EXISTS whatsapp_clicks (
        id          TEXT PRIMARY KEY,
        placement   TEXT NOT NULL,
        locale      TEXT NOT NULL DEFAULT 'ar',
        page        TEXT NOT NULL DEFAULT '/',
        country     TEXT,
        name        TEXT,
        phone       TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    // Existing deployments may already have the table without name/phone.
    await client()`ALTER TABLE whatsapp_clicks ADD COLUMN IF NOT EXISTS name TEXT`;
    await client()`ALTER TABLE whatsapp_clicks ADD COLUMN IF NOT EXISTS phone TEXT`;
    await client()`
      CREATE INDEX IF NOT EXISTS whatsapp_clicks_created_at_idx
      ON whatsapp_clicks (created_at DESC)
    `;
  })();

  return schemaReady;
}

type Row = {
  id: string;
  ref: string;
  name: string;
  phone: string;
  city: string | null;
  date: string | null;
  guests: string | null;
  type: string | null;
  budget: string | null;
  notes: string | null;
  source: string;
  locale: string;
  status: string;
  created_at: string | Date;
  updated_at: string | Date;
};

function toReservation(row: Row): Reservation {
  return {
    id: row.id,
    ref: row.ref,
    name: row.name,
    phone: row.phone,
    city: row.city ?? undefined,
    date: row.date ?? undefined,
    guests: row.guests ?? undefined,
    type: row.type ?? undefined,
    budget: row.budget ?? undefined,
    notes: row.notes ?? undefined,
    source: row.source,
    locale: row.locale,
    status: row.status as ReservationStatus,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

export const postgresStore: ReservationStore = {
  kind: "postgres",

  async list(): Promise<Reservation[]> {
    await ensureSchema();
    const rows = (await client()`
      SELECT * FROM reservations ORDER BY created_at DESC
    `) as Row[];
    return rows.map(toReservation);
  },

  async create(input: NewReservation): Promise<Reservation> {
    await ensureSchema();
    const rows = (await client()`
      INSERT INTO reservations
        (id, ref, name, phone, city, date, guests, type, budget, notes, source, locale)
      VALUES (
        ${newId()}, ${makeRef()}, ${input.name}, ${input.phone}, ${input.city ?? null},
        ${input.date ?? null}, ${input.guests ?? null}, ${input.type ?? null},
        ${input.budget ?? null}, ${input.notes ?? null}, ${input.source}, ${input.locale}
      )
      RETURNING *
    `) as Row[];
    return toReservation(rows[0]);
  },

  async updateStatus(id: string, status: ReservationStatus): Promise<Reservation | null> {
    await ensureSchema();
    const rows = (await client()`
      UPDATE reservations
      SET status = ${status}, updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `) as Row[];
    return rows.length ? toReservation(rows[0]) : null;
  },

  async remove(id: string): Promise<boolean> {
    await ensureSchema();
    const rows = (await client()`
      DELETE FROM reservations WHERE id = ${id} RETURNING id
    `) as { id: string }[];
    return rows.length > 0;
  },

  async logClick(input: NewWhatsAppClick): Promise<void> {
    await ensureSchema();
    await client()`
      INSERT INTO whatsapp_clicks (id, placement, locale, page, country, name, phone)
      VALUES (${newId()}, ${input.placement}, ${input.locale}, ${input.page}, ${input.country ?? null}, ${input.name ?? null}, ${input.phone ?? null})
    `;
  },

  async listClicks(limit = 100): Promise<WhatsAppClick[]> {
    await ensureSchema();
    const rows = (await client()`
      SELECT * FROM whatsapp_clicks ORDER BY created_at DESC LIMIT ${limit}
    `) as {
      id: string;
      placement: string;
      locale: string;
      page: string;
      country: string | null;
      name: string | null;
      phone: string | null;
      created_at: string | Date;
    }[];

    return rows.map((row) => ({
      id: row.id,
      placement: row.placement,
      locale: row.locale,
      page: row.page,
      country: row.country ?? undefined,
      name: row.name ?? undefined,
      phone: row.phone ?? undefined,
      createdAt: new Date(row.created_at).toISOString(),
    }));
  },
};
