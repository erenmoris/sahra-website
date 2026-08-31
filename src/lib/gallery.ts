import { promises as fs } from "fs";
import path from "path";

export type GalleryItem = {
  src: string;
  caption?: { ar: string; en: string };
};

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_PATTERN = /\.(?:jpe?g|png|webp|avif)$/i;

/**
 * Captions for the photos, keyed by file name. Files without an entry still
 * appear in the gallery, just without a caption.
 */
const captions: Record<string, { ar: string; en: string }> = {
  // "rooftop-nile.jpg": { ar: "روفتوب على النيل — القاهرة", en: "Nile rooftop — Cairo" },
};

/**
 * The gallery is driven by whatever is inside public/gallery, so adding real
 * photos to that folder is all it takes to publish them — and an empty folder
 * hides the section instead of showing broken images.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const files = await fs.readdir(GALLERY_DIR);
    return files
      .filter((file) => IMAGE_PATTERN.test(file))
      .sort((a, b) => a.localeCompare(b))
      .map((file) => ({ src: `/gallery/${file}`, caption: captions[file] }));
  } catch {
    return [];
  }
}
