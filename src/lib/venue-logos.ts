import { promises as fs } from "fs";
import path from "path";

const LOGO_DIR = path.join(process.cwd(), "public", "venues", "logos");
const LOGO_PATTERN = /\.(?:png|svg|webp|jpe?g|avif)$/i;
/** Skip empty/corrupt files (e.g. failed downloads). */
const MIN_LOGO_BYTES = 400;

/** slug → public URL, e.g. { "anzu-rooftop": "/venues/logos/anzu-rooftop.png?v=…" } */
export async function getVenueLogoMap(): Promise<Record<string, string>> {
  try {
    const files = await fs.readdir(LOGO_DIR);
    const map: Record<string, string> = {};
    for (const file of files) {
      if (!LOGO_PATTERN.test(file)) continue;
      const filePath = path.join(LOGO_DIR, file);
      const stat = await fs.stat(filePath);
      if (stat.size < MIN_LOGO_BYTES) continue;
      const slug = file.replace(LOGO_PATTERN, "");
      const v = Math.floor(stat.mtimeMs / 1000);
      map[slug] = `/venues/logos/${file}?v=${v}`;
    }
    return map;
  } catch {
    return {};
  }
}
