import { promises as fs } from "fs";
import path from "path";

const LOGO_DIR = path.join(process.cwd(), "public", "venues", "logos");
const COVER_DIR = path.join(process.cwd(), "public", "venues", "covers");
const MEDIA_PATTERN = /\.(?:png|svg|webp|jpe?g|avif)$/i;
/** Skip empty/corrupt files (e.g. failed downloads). */
const MIN_BYTES = 400;

async function mapDir(dir: string, urlPrefix: string): Promise<Record<string, string>> {
  try {
    const files = await fs.readdir(dir);
    const map: Record<string, string> = {};
    for (const file of files) {
      if (!MEDIA_PATTERN.test(file)) continue;
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      if (stat.size < MIN_BYTES) continue;
      const slug = file.replace(MEDIA_PATTERN, "");
      map[slug] = `${urlPrefix}/${file}`;
    }
    return map;
  } catch {
    return {};
  }
}

/** slug → public URL, e.g. { "anzu-rooftop": "/venues/logos/anzu-rooftop.png" } */
export async function getVenueLogoMap(): Promise<Record<string, string>> {
  return mapDir(LOGO_DIR, "/venues/logos");
}

/** slug → cover photo URL under /venues/covers */
export async function getVenueCoverMap(): Promise<Record<string, string>> {
  return mapDir(COVER_DIR, "/venues/covers");
}
