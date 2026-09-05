import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getSiteContent } from "@/lib/content";
import { blobConfigured } from "@/lib/content/media";
import ContentEditor from "@/components/admin/ContentEditor";

export const metadata = {
  title: "سهرة · إدارة المحتوى",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const content = await getSiteContent();

  return (
    <ContentEditor
      username={session.username}
      initialContent={content}
      blobReady={blobConfigured()}
    />
  );
}
