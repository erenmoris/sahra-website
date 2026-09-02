"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WHATSAPP_NUMBER } from "@/i18n/dictionaries";
import {
  RESERVATION_STATUSES,
  type Reservation,
  type ReservationStatus,
  type WhatsAppClick,
} from "@/lib/types";
import { buttonClass } from "@/components/ui";
import { WhatsAppIcon } from "@/components/Icons";

const statusStyles: Record<ReservationStatus, string> = {
  new: "border-gold/40 bg-gold/15 text-gold-soft",
  contacted: "border-[#5a8fbf]/40 bg-[#5a8fbf]/15 text-[#9cc5e6]",
  confirmed: "border-[#63c2a3]/40 bg-[#63c2a3]/15 text-[#8fdcc2]",
  cancelled: "border-[#c9646f]/40 bg-[#c9646f]/15 text-[#e2857f]",
};

const statusLabels: Record<ReservationStatus, string> = {
  new: "New · جديد",
  contacted: "Contacted · تم التواصل",
  confirmed: "Confirmed · مؤكد",
  cancelled: "Cancelled · ملغي",
};

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function waLink(phone: string, name: string) {
  const digits = phone.replace(/[^\d]/g, "") || WHATSAPP_NUMBER;
  return `https://wa.me/${digits}?text=${encodeURIComponent(`Hi ${name}, this is Sahra concierge regarding your reservation request.`)}`;
}

export default function Dashboard({
  username,
  initialReservations,
  initialClicks,
  ephemeralStorage = false,
  ownerNotifyEnabled = false,
}: {
  username: string;
  initialReservations: Reservation[];
  initialClicks: WhatsAppClick[];
  ephemeralStorage?: boolean;
  ownerNotifyEnabled?: boolean;
}) {
  const router = useRouter();
  const [reservations, setReservations] = useState(initialReservations);
  const [clicks, setClicks] = useState(initialClicks);
  const [tab, setTab] = useState<"requests" | "clicks">("requests");
  const [filter, setFilter] = useState<ReservationStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function refresh() {
    const [reservationsResponse, clicksResponse] = await Promise.all([
      fetch("/api/reservations", { cache: "no-store" }),
      fetch("/api/whatsapp-click", { cache: "no-store" }),
    ]);

    if (reservationsResponse.ok) {
      const data = (await reservationsResponse.json()) as { reservations: Reservation[] };
      setReservations(data.reservations);
    }

    if (clicksResponse.ok) {
      const data = (await clicksResponse.json()) as { clicks: WhatsAppClick[] };
      setClicks(data.clicks);
    }
  }

  useEffect(() => {
    const interval = setInterval(refresh, 20000);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    return {
      total: reservations.length,
      today: reservations.filter((item) => new Date(item.createdAt).toDateString() === today).length,
      new: reservations.filter((item) => item.status === "new").length,
      confirmed: reservations.filter((item) => item.status === "confirmed").length,
      clicksToday: clicks.filter((item) => new Date(item.createdAt).toDateString() === today).length,
      clicksTotal: clicks.length,
    };
  }, [reservations, clicks]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return reservations.filter((item) => {
      if (filter !== "all" && item.status !== filter) return false;
      if (!needle) return true;
      return [item.name, item.phone, item.ref, item.city, item.type, item.notes]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(needle));
    });
  }, [reservations, filter, query]);

  async function changeStatus(id: string, status: ReservationStatus) {
    setBusyId(id);
    const response = await fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (response.ok) {
      const { reservation } = (await response.json()) as { reservation: Reservation };
      setReservations((prev) => prev.map((item) => (item.id === id ? reservation : item)));
      setSelected((prev) => (prev && prev.id === id ? reservation : prev));
    }
    setBusyId(null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this reservation permanently?")) return;
    setBusyId(id);
    const response = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
    if (response.ok) {
      setReservations((prev) => prev.filter((item) => item.id !== id));
      setSelected((prev) => (prev && prev.id === id ? null : prev));
    }
    setBusyId(null);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  function exportCsv() {
    const header = [
      "ref",
      "name",
      "phone",
      "city",
      "date",
      "guests",
      "type",
      "budget",
      "status",
      "source",
      "locale",
      "createdAt",
      "notes",
    ];
    const rows = visible.map((item) =>
      header
        .map((key) => `"${String(item[key as keyof Reservation] ?? "").replace(/"/g, '""')}"`)
        .join(","),
    );
    const csv = [header.join(","), ...rows].join("\n");
    const url = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `sahra-reservations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div dir="ltr" className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-gold/20 bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <div className="font-display text-xl font-bold text-sand">
              Sahra <span className="text-gold-soft">·</span> Dashboard
            </div>
            <p className="text-[0.78rem] text-sand-dim">Signed in as {username}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/content"
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
            >
              Manage content
            </Link>
            <Link
              href="/ar"
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={exportCsv}
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={logout}
              className="cursor-pointer border border-[#c9646f]/40 px-3 py-2 text-[0.78rem] text-[#e2857f] transition-colors hover:border-[#c9646f]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-6 py-8">
        {ephemeralStorage ? (
          <div className="mb-6 border border-[#c9646f]/40 bg-[#c9646f]/10 px-5 py-4 text-[0.85rem] leading-[1.7] text-[#e2857f]">
            No database is connected, so reservations are stored temporarily and will be lost when
            the server restarts. Add a Postgres database and set <code>DATABASE_URL</code> to keep
            them permanently.
          </div>
        ) : null}

        {!ownerNotifyEnabled ? (
          <div className="mb-6 border border-gold/30 bg-gold/10 px-5 py-4 text-[0.85rem] leading-[1.7] text-gold-soft">
            Email alerts are off. Set <code>RESEND_API_KEY</code> on Vercel to receive booking
            notifications at <code>erenmoris5@gmail.com</code> (see <code>.env.example</code>).
          </div>
        ) : (
          <div className="mb-6 border border-[#63c2a3]/40 bg-[#63c2a3]/10 px-5 py-3 text-[0.85rem] text-[#8fdcc2]">
            Email alerts on — new reservations are sent to erenmoris5@gmail.com
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total requests", value: stats.total },
            { label: "Requests today", value: stats.today },
            { label: "Awaiting reply", value: stats.new },
            { label: "Confirmed", value: stats.confirmed },
            { label: "Contact clicks today", value: stats.clicksToday },
          ].map((card) => (
            <div key={card.label} className="border border-gold/20 bg-ink-2 px-6 py-5">
              <div className="text-[0.78rem] tracking-[0.04em] text-sand-dim">{card.label}</div>
              <div className="mt-2 font-display text-3xl font-semibold text-gold-soft">
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-2 border-b border-gold/20">
          {(
            [
              ["requests", `Reservation requests (${reservations.length})`],
              ["clicks", `WhatsApp & Snapchat clicks (${stats.clicksTotal})`],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={`-mb-px cursor-pointer border-b-2 px-4 py-3 text-[0.85rem] transition-colors ${
                tab === value
                  ? "border-gold text-gold-soft"
                  : "border-transparent text-sand-dim hover:text-sand"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "clicks" ? (
          <>
            <p className="mt-5 text-[0.85rem] leading-[1.7] text-sand-dim">
              Every time a visitor taps a WhatsApp or Snapchat button on the site it is recorded
              here — even if they never fill in the form — so you can see interest as it happens.
            </p>
            <div className="mt-4 overflow-x-auto border border-gold/20">
              <table className="w-full min-w-[640px] border-collapse text-[0.88rem]">
                <thead>
                  <tr className="bg-ink-2 text-left text-[0.76rem] tracking-[0.04em] text-sand-dim">
                    <th className="px-4 py-3 font-medium">When</th>
                    <th className="px-4 py-3 font-medium">Button</th>
                    <th className="px-4 py-3 font-medium">Page</th>
                    <th className="px-4 py-3 font-medium">Language</th>
                    <th className="px-4 py-3 font-medium">Country</th>
                  </tr>
                </thead>
                <tbody>
                  {clicks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-14 text-center text-sand-dim">
                        No WhatsApp clicks recorded yet.
                      </td>
                    </tr>
                  ) : (
                    clicks.map((click) => (
                      <tr key={click.id} className="border-t border-gold/15 hover:bg-ink-2/60">
                        <td className="px-4 py-3 whitespace-nowrap text-sand-dim">
                          {formatDateTime(click.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-sand">{click.placement}</td>
                        <td className="px-4 py-3 font-mono text-[0.8rem] text-sand-dim">
                          {click.page}
                        </td>
                        <td className="px-4 py-3 text-sand-dim uppercase">{click.locale}</td>
                        <td className="px-4 py-3 text-sand-dim">{click.country ?? "—"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
        <>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {(["all", ...RESERVATION_STATUSES] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`cursor-pointer border px-3 py-2 text-[0.78rem] capitalize transition-colors ${
                  filter === value
                    ? "border-gold bg-gold/15 text-gold-soft"
                    : "border-gold/20 text-sand-dim hover:border-gold/50"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, phone, reference…"
            className="ms-auto w-full max-w-[320px] rounded-sm border border-gold/25 bg-ink px-3.5 py-2.5 text-[0.88rem] text-sand focus:border-gold focus:outline-none"
          />
        </div>

        <div className="mt-5 overflow-x-auto border border-gold/20">
          <table className="w-full min-w-[900px] border-collapse text-[0.88rem]">
            <thead>
              <tr className="bg-ink-2 text-left text-[0.76rem] tracking-[0.04em] text-sand-dim">
                <th className="px-4 py-3 font-medium">Ref</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">WhatsApp</th>
                <th className="px-4 py-3 font-medium">Night</th>
                <th className="px-4 py-3 font-medium">Details</th>
                <th className="px-4 py-3 font-medium">Received</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center text-sand-dim">
                    No reservations yet. Requests submitted on the website appear here instantly.
                  </td>
                </tr>
              ) : (
                visible.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gold/15 transition-colors hover:bg-ink-2/60"
                  >
                    <td className="px-4 py-3 font-mono text-[0.8rem] text-gold-soft">{item.ref}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setSelected(item)}
                        className="cursor-pointer text-sand underline decoration-gold/40 underline-offset-4 hover:text-gold-soft"
                      >
                        {item.name}
                      </button>
                      <div className="text-[0.74rem] text-sand-dim">{item.source}</div>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={waLink(item.phone, item.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#8fdcc2] hover:underline"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        {item.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sand-dim">
                      {item.date || "—"}
                      {item.guests ? ` · ${item.guests}p` : ""}
                    </td>
                    <td className="max-w-[220px] px-4 py-3 text-sand-dim">
                      {[item.city, item.type, item.budget].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sand-dim">
                      {formatDateTime(item.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block border px-2 py-1 text-[0.72rem] ${statusStyles[item.status]}`}
                      >
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={item.status}
                          disabled={busyId === item.id}
                          onChange={(event) =>
                            changeStatus(item.id, event.target.value as ReservationStatus)
                          }
                          className="cursor-pointer rounded-sm border border-gold/25 bg-ink px-2 py-1.5 text-[0.78rem] text-sand focus:border-gold focus:outline-none"
                        >
                          {RESERVATION_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          disabled={busyId === item.id}
                          className="cursor-pointer text-[0.78rem] text-[#e2857f] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </>
        )}
      </main>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(6,8,14,0.82)] p-5 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div className="relative w-full max-w-[520px] border border-gold/40 bg-ink-2 px-8 py-8">
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-3 right-4 cursor-pointer text-2xl leading-none text-sand-dim hover:text-gold-soft"
            >
              ×
            </button>
            <div className="mb-1 font-mono text-[0.8rem] text-gold-soft">{selected.ref}</div>
            <h2 className="mb-6 font-display text-2xl font-semibold text-sand">{selected.name}</h2>

            <dl className="grid gap-3 text-[0.9rem]">
              {[
                ["WhatsApp", selected.phone],
                ["City", selected.city],
                ["Night of", selected.date],
                ["Party size", selected.guests],
                ["Experience", selected.type],
                ["Budget", selected.budget],
                ["Source", selected.source],
                ["Language", selected.locale],
                ["Received", formatDateTime(selected.createdAt)],
                ["Last update", formatDateTime(selected.updatedAt)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-gold/10 pb-2">
                  <dt className="text-sand-dim">{label}</dt>
                  <dd className="text-right text-sand">{value || "—"}</dd>
                </div>
              ))}
            </dl>

            {selected.notes ? (
              <div className="mt-5">
                <div className="mb-2 text-[0.8rem] text-gold-soft">Notes</div>
                <p className="leading-[1.8] text-sand-dim">{selected.notes}</p>
              </div>
            ) : null}

            <a
              href={waLink(selected.phone, selected.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("whatsapp", "mt-7 w-full")}
            >
              <WhatsAppIcon /> Reply on WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
