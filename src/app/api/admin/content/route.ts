import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSiteContent, patchSiteContent } from "@/lib/content";
import type { SiteContent } from "@/lib/content/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await getSiteContent();
  return NextResponse.json({ content });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<SiteContent>;
  try {
    body = (await request.json()) as Partial<SiteContent>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const content = await patchSiteContent(body);
  return NextResponse.json({ content });
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: SiteContent;
  try {
    body = (await request.json()) as SiteContent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { saveSiteContent } = await import("@/lib/content/store");
  const content = await saveSiteContent(body);
  return NextResponse.json({ content });
}
