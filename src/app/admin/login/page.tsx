import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata = { title: "Sahra · Sign in" };

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="lattice pointer-events-none fixed inset-0 opacity-30" />
      <div className="relative w-full max-w-[400px] border border-gold/25 bg-ink-2 px-8 py-10">
        <div className="mb-1 font-display text-2xl font-bold text-sand">
          Sahra <span className="text-gold-soft">·</span>
        </div>
        <p className="mb-8 text-[0.85rem] text-sand-dim">
          Reservations dashboard — لوحة تحكم الحجوزات
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
