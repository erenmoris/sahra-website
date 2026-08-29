import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { listReservations } from "@/lib/store";
import Dashboard from "./Dashboard";

export const metadata = { title: "Sahra · Reservations dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const reservations = await listReservations();

  return <Dashboard username={session.username} initialReservations={reservations} />;
}
