import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import WhatsAppDispatcher from "@/components/admin/WhatsAppDispatcher";

export const metadata = {
  title: "سهرة · مركز إرسال الواتساب VIP",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminWhatsAppPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return <WhatsAppDispatcher username={session.username} />;
}
