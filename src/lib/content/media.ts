import { put, del, type PutBlobResult } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
export const VIDEO_MIME = new Set(["video/mp4", "video/webm"]);

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

export function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function safeExt(mime: string, filename?: string): string {
  if (EXT_BY_MIME[mime]) return EXT_BY_MIME[mime];
  const fromName = filename?.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]{2,5}$/.test(fromName)) return fromName;
  return "bin";
}

export function validateMedia(
  mime: string,
  size: number,
  kind: "image" | "video" | "any",
): string | null {
  if (kind === "image" || (kind === "any" && IMAGE_TYPES.has(mime))) {
    if (!IMAGE_TYPES.has(mime)) return "Unsupported image type. Use JPG, PNG, WebP, or AVIF.";
    if (size > MAX_IMAGE_BYTES) return "Image is too large (max 10MB).";
    return null;
  }
  if (kind === "video" || (kind === "any" && VIDEO_MIME.has(mime))) {
    if (!VIDEO_MIME.has(mime)) return "Unsupported video type. Use MP4 or WebM.";
    if (size > MAX_VIDEO_BYTES) return "Video is too large (max 100MB).";
    return null;
  }
  return "Unsupported file type.";
}

async function saveLocal(buffer: Buffer, mime: string, filename?: string): Promise<string> {
  const folder = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(folder, { recursive: true });
  const name = `${randomUUID()}.${safeExt(mime, filename)}`;
  await fs.writeFile(path.join(folder, name), buffer);
  return `/uploads/${name}`;
}

export async function uploadBuffer(opts: {
  buffer: Buffer;
  mime: string;
  filename?: string;
  folder?: string;
}): Promise<{ url: string; pathname: string }> {
  const prefix = opts.folder ?? "media";
  const pathname = `${prefix}/${randomUUID()}.${safeExt(opts.mime, opts.filename)}`;

  if (blobConfigured()) {
    const result: PutBlobResult = await put(pathname, opts.buffer, {
      access: "public",
      contentType: opts.mime,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return { url: result.url, pathname: result.pathname };
  }

  const url = await saveLocal(opts.buffer, opts.mime, opts.filename);
  return { url, pathname: url };
}

export async function deleteMediaUrl(url: string): Promise<void> {
  if (!url) return;

  if (url.startsWith("/uploads/")) {
    const filePath = path.join(process.cwd(), "public", url.replace(/^\//, ""));
    try {
      await fs.unlink(filePath);
    } catch {
      // already gone
    }
    return;
  }

  if (blobConfigured() && /vercel-storage\.com|blob\.vercel-storage\.com|public\.blob\.vercel-storage\.com/.test(url)) {
    try {
      await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    } catch {
      // ignore missing blobs
    }
  }
}
