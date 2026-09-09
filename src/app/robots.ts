import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
          "/admin/content",
          "/admin/whatsapp",
          "/admin/login",
          // Decorative entrance loops — not watch pages; keep out of video indexing.
          "/venues/entrance.mp4",
          "/chalets/entrance.mp4",
          "/brand/entrance-teaser.mp4",
          "/nightclub-gallery/videos/",
          "/home/reels/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
