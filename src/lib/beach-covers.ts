import { promises as fs } from "fs";
import path from "path";

const COVER_DIR = path.join(process.cwd(), "public", "beaches", "covers");
const MEDIA_PATTERN = /\.(?:png|svg|webp|jpe?g|avif)$/i;
const MIN_BYTES = 400;

/** slug → cover photo URL under /beaches/covers */
export async function getBeachCoverMap(): Promise<Record<string, string>> {
  try {
    const files = await fs.readdir(COVER_DIR);
    const map: Record<string, string> = {};
    for (const file of files) {
      if (!MEDIA_PATTERN.test(file)) continue;
      const filePath = path.join(COVER_DIR, file);
      const stat = await fs.stat(filePath);
      if (stat.size < MIN_BYTES) continue;
      const slug = file.replace(MEDIA_PATTERN, "");
      map[slug] = `/beaches/covers/${file}`;
    }
    return map;
  } catch {
    return {};
  }
}
