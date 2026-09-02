import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { listReservations, listWhatsAppClicks, storeKind } from "@/lib/store";
import { isOwnerNotifyConfigured } from "@/lib/notify-owner";
import Dashboard from "./Dashboard";

export const metadata = { title: "Sahra · Reservations dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [reservations, clicks] = await Promise.all([listReservations(), listWhatsAppClicks(100)]);

  return (
    <Dashboard
      username={session.username}
      initialReservations={reservations}
      initialClicks={clicks}
      ephemeralStorage={storeKind === "file" && Boolean(process.env.VERCEL)}
      ownerNotifyEnabled={isOwnerNotifyConfigured()}
    />
  );
}
