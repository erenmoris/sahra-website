import type { Reservation } from "@/lib/types";

const OWNER_EMAIL = process.env.OWNER_NOTIFY_EMAIL ?? "erenmoris5@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM ?? "Sahra Bookings <onboarding@resend.dev>";

function customerWhatsAppUrl(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

function row(label: string, value: string | undefined): string {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#b9b0a0;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#efe6d0">${escapeHtml(value)}</td></tr>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(r: Reservation): { subject: string; html: string; text: string } {
  const ar = r.locale === "ar";
  const reply = customerWhatsAppUrl(r.phone);

  const subject = ar
    ? `🔔 طلب حجز جديد — ${r.name} (${r.ref})`
    : `🔔 New booking — ${r.name} (${r.ref})`;

  const textLines = [
    ar ? "طلب حجز جديد — سهرة" : "New booking request — Sahra",
    "",
    `${ar ? "الاسم" : "Name"}: ${r.name}`,
    `${ar ? "واتساب" : "WhatsApp"}: ${r.phone}`,
    r.city ? `${ar ? "المدينة" : "City"}: ${r.city}` : "",
    r.date ? `${ar ? "التاريخ" : "Date"}: ${r.date}` : "",
    r.guests ? `${ar ? "الضيوف" : "Guests"}: ${r.guests}` : "",
    r.type ? `${ar ? "النوع" : "Type"}: ${r.type}` : "",
    r.budget ? `${ar ? "الميزانية" : "Budget"}: ${r.budget}` : "",
    r.notes ? `${ar ? "ملاحظات" : "Notes"}: ${r.notes}` : "",
    "",
    `${ar ? "المرجع" : "Ref"}: ${r.ref}`,
    `${ar ? "المصدر" : "Source"}: ${r.source}`,
    reply ? `${ar ? "رد سريع" : "Quick reply"}: ${reply}` : "",
  ].filter(Boolean);

  const html = `<!DOCTYPE html>
<html lang="${ar ? "ar" : "en"}" dir="${ar ? "rtl" : "ltr"}">
<body style="margin:0;background:#0b0f1a;font-family:Segoe UI,Arial,sans-serif;padding:24px">
  <div style="max-width:520px;margin:0 auto;background:#131a29;border:1px solid rgba(201,162,75,0.25);border-radius:8px;padding:24px">
    <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#e4c878">${ar ? "طلب حجز جديد" : "New booking request"}</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${row(ar ? "الاسم" : "Name", r.name)}
      ${row(ar ? "واتساب" : "WhatsApp", r.phone)}
      ${row(ar ? "المدينة" : "City", r.city)}
      ${row(ar ? "التاريخ" : "Date", r.date)}
      ${row(ar ? "الضيوف" : "Guests", r.guests)}
      ${row(ar ? "النوع" : "Type", r.type)}
      ${row(ar ? "الميزانية" : "Budget", r.budget)}
      ${row(ar ? "ملاحظات" : "Notes", r.notes)}
      ${row(ar ? "المرجع" : "Ref", r.ref)}
      ${row(ar ? "المصدر" : "Source", r.source)}
    </table>
    ${
      reply
        ? `<p style="margin:20px 0 0"><a href="${reply}" style="display:inline-block;background:#1d7a52;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-weight:600">${ar ? "رد على واتساب" : "Reply on WhatsApp"}</a></p>`
        : ""
    }
  </div>
</body>
</html>`;

  return { subject, html, text: textLines.join("\n") };
}

async function sendViaResend(subject: string, html: string, text: string): Promise<boolean> {
  if (!RESEND_API_KEY) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [OWNER_EMAIL],
      subject,
      html,
      text,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("[notify-owner] Resend HTTP", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

/** Email alert to owner. Never throws — reservation must still succeed. */
export async function notifyOwnerNewReservation(reservation: Reservation): Promise<void> {
  if (!RESEND_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[notify-owner] RESEND_API_KEY not set — skipping email alert");
    }
    return;
  }

  try {
    const { subject, html, text } = buildEmail(reservation);
    const ok = await sendViaResend(subject, html, text);
    if (!ok) console.error("[notify-owner] email failed for ref", reservation.ref);
  } catch (err) {
    console.error("[notify-owner] error:", err);
  }
}

export function isOwnerNotifyConfigured(): boolean {
  return Boolean(RESEND_API_KEY);
}

export function ownerNotifyEmail(): string {
  return OWNER_EMAIL;
}
