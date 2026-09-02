import { promises as fs } from "fs";
import path from "path";
import { galleryFromContent, getSiteContent } from "@/lib/content";

export type GalleryItem = {
  src: string;
  caption?: { ar: string; en: string };
};

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_PATTERN = /\.(?:jpe?g|png|webp|avif)$/i;

/**
 * Captions for filesystem photos, keyed by file name.
 */
const captions: Record<string, { ar: string; en: string }> = {
  // "rooftop-nile.jpg": { ar: "روفتوب على النيل — القاهرة", en: "Nile rooftop — Cairo" },
};

async function filesystemGallery(): Promise<GalleryItem[]> {
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

/**
 * Prefer CMS gallery items when the admin has uploaded any.
 * Otherwise fall back to files in public/gallery.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const content = await getSiteContent();
  const fromCms = galleryFromContent(content);
  if (fromCms.length > 0) return fromCms;
  return filesystemGallery();
}
