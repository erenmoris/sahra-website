import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
  VIDEO_MIME,
  blobConfigured,
} from "@/lib/content/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!blobConfigured()) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN is not configured. Add a Vercel Blob store, or upload small files via /api/admin/media in local development.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const lower = pathname.toLowerCase();
        const isImage = /\.(jpe?g|png|webp|avif)$/.test(lower);
        const isVideo = /\.(mp4|webm)$/.test(lower);
        if (!isImage && !isVideo) {
          throw new Error("Only images (JPG/PNG/WebP/AVIF) and videos (MP4/WebM) are allowed.");
        }
        return {
          allowedContentTypes: [
            ...IMAGE_TYPES,
            ...VIDEO_MIME,
          ] as unknown as string[],
          maximumSizeInBytes: isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES,
          tokenPayload: JSON.stringify({ user: session.username }),
        };
      },
    });
    return NextResponse.json(json);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
