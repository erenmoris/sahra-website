import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSiteContent, patchSiteContent } from "@/lib/content";
import {
  blobConfigured,
  deleteMediaUrl,
  uploadBuffer,
  validateMedia,
} from "@/lib/content/media";
import { randomUUID } from "crypto";
import type { GalleryMediaItem } from "@/lib/content/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const kind = String(form.get("kind") ?? "image") as "image" | "video" | "any";
  const purpose = String(form.get("purpose") ?? "gallery"); // gallery | video | poster

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const mime = file.type || "application/octet-stream";
  const error = validateMedia(mime, file.size, kind === "any" ? "any" : kind);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  // Large videos should use client upload to Blob when configured.
  if (kind === "video" && file.size > 4 * 1024 * 1024 && blobConfigured()) {
    return NextResponse.json(
      {
        error: "Large videos must use client upload. Call /api/admin/upload-token instead.",
        useClientUpload: true,
      },
      { status: 413 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await uploadBuffer({
    buffer,
    mime,
    filename: file.name,
    folder:
      purpose === "video"
        ? "videos"
        : purpose === "poster"
          ? "posters"
          : purpose === "logo"
            ? "logo"
            : "gallery",
  });

  if (purpose === "logo") {
    const content = await getSiteContent();
    const oldUrl = content.logoUrl;
    const next = await patchSiteContent({ logoUrl: uploaded.url });
    if (oldUrl && oldUrl !== uploaded.url && !oldUrl.startsWith("/brand/")) {
      await deleteMediaUrl(oldUrl);
    }
    return NextResponse.json({ url: uploaded.url, content: next });
  }

  if (purpose === "gallery") {
    const content = await getSiteContent();
    const item: GalleryMediaItem = {
      id: randomUUID(),
      src: uploaded.url,
      caption: { ar: "", en: "" },
      visible: true,
      sortOrder: (content.galleryItems?.length ?? 0) + 1,
    };
    const galleryItems = [...(content.galleryItems ?? []), item];
    const next = await patchSiteContent({ galleryItems });
    return NextResponse.json({ url: uploaded.url, item, content: next });
  }

  if (purpose === "video") {
    const content = await getSiteContent();
    const oldUrl = content.promoVideo?.src;
    const next = await patchSiteContent({
      promoVideo: {
        ...content.promoVideo,
        src: uploaded.url,
        visible: content.promoVideo?.visible ?? true,
        placement: content.promoVideo?.placement ?? "section",
      },
      sections: { ...content.sections, promoVideo: true },
    });
    if (oldUrl && oldUrl !== uploaded.url) {
      await deleteMediaUrl(oldUrl);
    }
    return NextResponse.json({ url: uploaded.url, content: next });
  }

  if (purpose === "poster") {
    const content = await getSiteContent();
    const oldUrl = content.promoVideo?.poster;
    const next = await patchSiteContent({
      promoVideo: {
        ...content.promoVideo,
        poster: uploaded.url,
      },
    });
    if (oldUrl && oldUrl !== uploaded.url) {
      await deleteMediaUrl(oldUrl);
    }
    return NextResponse.json({ url: uploaded.url, content: next });
  }

  return NextResponse.json({ url: uploaded.url });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { url?: string; galleryId?: string; clearVideo?: boolean; clearPoster?: boolean; clearLogo?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const content = await getSiteContent();

  if (body.galleryId) {
    const item = content.galleryItems?.find((g) => g.id === body.galleryId);
    const galleryItems = (content.galleryItems ?? []).filter((g) => g.id !== body.galleryId);
    const next = await patchSiteContent({ galleryItems });
    if (item?.src) await deleteMediaUrl(item.src);
    return NextResponse.json({ content: next });
  }

  if (body.clearLogo) {
    const old = content.logoUrl;
    const next = await patchSiteContent({ logoUrl: undefined });
    if (old && !old.startsWith("/brand/")) await deleteMediaUrl(old);
    return NextResponse.json({ content: next });
  }

  if (body.clearVideo) {
    const old = content.promoVideo?.src;
    const next = await patchSiteContent({
      promoVideo: { ...content.promoVideo, src: undefined },
    });
    if (old) await deleteMediaUrl(old);
    return NextResponse.json({ content: next });
  }

  if (body.clearPoster) {
    const old = content.promoVideo?.poster;
    const next = await patchSiteContent({
      promoVideo: { ...content.promoVideo, poster: undefined },
    });
    if (old) await deleteMediaUrl(old);
    return NextResponse.json({ content: next });
  }

  if (body.url) {
    await deleteMediaUrl(body.url);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Nothing to delete" }, { status: 400 });
}
