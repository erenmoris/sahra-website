import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { DATABASE_URL } from "@/lib/store/postgres-store";
import { emptySiteContent, type SiteContent } from "./types";

const sql = DATABASE_URL ? neon(DATABASE_URL) : null;

const defaultDir = process.env.VERCEL
  ? path.join(os.tmpdir(), "sahra")
  : path.join(process.cwd(), "data");
const DATA_DIR = process.env.SAHRA_DATA_DIR ?? defaultDir;
const DATA_FILE = path.join(DATA_DIR, "site-content.json");

let schemaReady: Promise<void> | null = null;
let writeQueue: Promise<unknown> = Promise.resolve();

function client() {
  if (!sql) throw new Error("DATABASE_URL is not configured");
  return sql;
}

async function ensureSchema(): Promise<void> {
  if (!sql) return;
  schemaReady ??= (async () => {
    await client()`
      CREATE TABLE IF NOT EXISTS site_content (
        id TEXT PRIMARY KEY DEFAULT 'main',
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
  })();
  return schemaReady;
}

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(task, task);
  writeQueue = result.catch(() => undefined);
  return result;
}

async function readFileContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as SiteContent;
    return parsed && typeof parsed === "object" ? parsed : emptySiteContent();
  } catch {
    return emptySiteContent();
  }
}

async function writeFileContent(data: SiteContent): Promise<SiteContent> {
  const next = { ...data, updatedAt: new Date().toISOString() };
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2), "utf8");
  return next;
}

async function readPostgresContent(): Promise<SiteContent> {
  await ensureSchema();
  const rows = (await client()`
    SELECT data FROM site_content WHERE id = 'main' LIMIT 1
  `) as { data: SiteContent | string }[];
  if (!rows.length || !rows[0].data) return emptySiteContent();
  const raw = rows[0].data;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as SiteContent;
    } catch {
      return emptySiteContent();
    }
  }
  return raw;
}

async function writePostgresContent(data: SiteContent): Promise<SiteContent> {
  await ensureSchema();
  const next = { ...data, updatedAt: new Date().toISOString() };
  await client()`
    INSERT INTO site_content (id, data, updated_at)
    VALUES ('main', ${next as unknown as string}, now())
    ON CONFLICT (id) DO UPDATE
      SET data = ${next as unknown as string}, updated_at = now()
  `;
  return next;
}

export const contentStoreKind: "postgres" | "file" = DATABASE_URL ? "postgres" : "file";

export async function getSiteContent(): Promise<SiteContent> {
  if (sql) return readPostgresContent();
  return readFileContent();
}

export async function saveSiteContent(data: SiteContent): Promise<SiteContent> {
  if (sql) {
    return enqueue(() => writePostgresContent(data));
  }
  return enqueue(() => writeFileContent(data));
}

/** Shallow-merge top-level keys; nested objects are replaced when provided. */
export async function patchSiteContent(patch: Partial<SiteContent>): Promise<SiteContent> {
  const current = await getSiteContent();
  const next: SiteContent = {
    ...current,
    ...patch,
    sections: patch.sections ? { ...current.sections, ...patch.sections } : current.sections,
    hero: patch.hero ? { ...current.hero, ...patch.hero } : current.hero,
    how: patch.how ? { ...current.how, ...patch.how } : current.how,
    trust: patch.trust ? { ...current.trust, ...patch.trust } : current.trust,
    gallery: patch.gallery ? { ...current.gallery, ...patch.gallery } : current.gallery,
    testimonials: patch.testimonials
      ? { ...current.testimonials, ...patch.testimonials }
      : current.testimonials,
    ticker: patch.ticker ? { ...current.ticker, ...patch.ticker } : current.ticker,
    promoVideo: patch.promoVideo
      ? { ...current.promoVideo, ...patch.promoVideo }
      : current.promoVideo,
  };

  if (patch.testimonialItems !== undefined) next.testimonialItems = patch.testimonialItems;
  if (patch.galleryItems !== undefined) next.galleryItems = patch.galleryItems;

  return saveSiteContent(next);
}
