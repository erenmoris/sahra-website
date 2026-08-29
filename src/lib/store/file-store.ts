import { promises as fs } from "fs";
import os from "os";
import path from "path";
import type { Reservation, ReservationStatus, WhatsAppClick } from "@/lib/types";
import type { NewReservation, NewWhatsAppClick, ReservationStore } from "./types";
import { makeRef, newId } from "./ids";

// On serverless hosts the deployment directory is read-only, so fall back to the
// writable temp directory. Data there is ephemeral — set DATABASE_URL to persist.
const defaultDir = process.env.VERCEL ? path.join(os.tmpdir(), "sahra") : path.join(process.cwd(), "data");

const DATA_DIR = process.env.SAHRA_DATA_DIR ?? defaultDir;
const DATA_FILE = path.join(DATA_DIR, "reservations.json");
const CLICKS_FILE = path.join(DATA_DIR, "whatsapp-clicks.json");
const MAX_CLICKS = 500;

// Writes are serialised through this promise chain so concurrent requests
// cannot clobber each other's changes to the JSON file.
let writeQueue: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<Reservation[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Reservation[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(items: Reservation[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(task, task);
  writeQueue = result.catch(() => undefined);
  return result;
}

export const fileStore: ReservationStore = {
  kind: "file",

  async list(): Promise<Reservation[]> {
    const items = await readAll();
    return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async create(input: NewReservation): Promise<Reservation> {
    return enqueue(async () => {
      const items = await readAll();
      const now = new Date().toISOString();
      const reservation: Reservation = {
        ...input,
        id: newId(),
        ref: makeRef(),
        status: "new",
        createdAt: now,
        updatedAt: now,
      };
      items.push(reservation);
      await writeAll(items);
      return reservation;
    });
  },

  async updateStatus(id: string, status: ReservationStatus): Promise<Reservation | null> {
    return enqueue(async () => {
      const items = await readAll();
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) return null;
      items[index] = { ...items[index], status, updatedAt: new Date().toISOString() };
      await writeAll(items);
      return items[index];
    });
  },

  async remove(id: string): Promise<boolean> {
    return enqueue(async () => {
      const items = await readAll();
      const next = items.filter((item) => item.id !== id);
      if (next.length === items.length) return false;
      await writeAll(next);
      return true;
    });
  },

  async logClick(input: NewWhatsAppClick): Promise<void> {
    await enqueue(async () => {
      const clicks = await readClicks();
      clicks.unshift({ ...input, id: newId(), createdAt: new Date().toISOString() });
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(
        CLICKS_FILE,
        JSON.stringify(clicks.slice(0, MAX_CLICKS), null, 2),
        "utf8",
      );
    });
  },

  async listClicks(limit = 100): Promise<WhatsAppClick[]> {
    const clicks = await readClicks();
    return clicks.slice(0, limit);
  },
};

async function readClicks(): Promise<WhatsAppClick[]> {
  try {
    const raw = await fs.readFile(CLICKS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WhatsAppClick[]) : [];
  } catch {
    return [];
  }
}
