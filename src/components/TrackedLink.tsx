"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  loadContactCapture,
  normalizePhone,
  saveContactCapture,
} from "@/lib/contact-capture";

type Props = {
  href: string;
  placement: string;
  locale: string;
  className?: string;
  ariaLabel?: string;
  dir?: "ltr" | "rtl";
  /** Dictionary for bilingual capture copy (defaults to Arabic-friendly fallbacks). */
  t?: Dictionary;
  children: React.ReactNode;
};

function track(payload: {
  placement: string;
  locale: string;
  page: string;
  name: string;
  phone: string;
}) {
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/whatsapp-click", body);
    return;
  }

  void fetch("/api/whatsapp-click", { method: "POST", body, keepalive: true }).catch(
    () => undefined,
  );
}

/** External contact link (WhatsApp, Snapchat) that records the tap before leaving. */
export default function TrackedLink({
  href,
  placement,
  locale,
  className,
  ariaLabel,
  dir,
  t,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const ar = locale === "ar";
  const copy = {
    title:
      t?.modal.title ??
      (ar ? "أرسل اسمك ورقم الواتساب" : "Leave your name and WhatsApp"),
    body:
      t?.modal.body ??
      (ar
        ? "عشان أقدر أرد عليك. الاسم ورقم الواتساب مطلوبان."
        : "I need your name and WhatsApp number so I can reply."),
    name: t?.form.fields.name ?? (ar ? "الاسم" : "Name"),
    phone: t?.form.fields.phone ?? (ar ? "رقم الواتساب" : "WhatsApp number"),
    namePlaceholder:
      t?.form.fields.namePlaceholder ?? (ar ? "اكتب اسمك" : "Your name"),
    phonePlaceholder:
      t?.form.fields.phonePlaceholder ?? (ar ? "+20 أو +966…" : "+20 or +966…"),
    submit: t?.modal.submit ?? (ar ? "إرسال" : "Send"),
    cancel: t?.modal.close ?? (ar ? "إلغاء" : "Close"),
    requiredName: t?.modal.requiredName ?? (ar ? "اسمك مطلوب" : "Name is required"),
    requiredPhone:
      t?.modal.requiredPhone ?? (ar ? "رقم الواتساب مطلوب" : "Phone is required"),
  };

  async function submitWithRedirect(nextName: string, nextPhone: string) {
    const trimmedName = nextName.trim();
    const trimmedPhone = normalizePhone(nextPhone);

    if (!trimmedName) {
      setError(copy.requiredName);
      return false;
    }
    if (!trimmedPhone) {
      setError(copy.requiredPhone);
      return false;
    }

    saveContactCapture({ name: trimmedName, phone: trimmedPhone });

    // Record the click, then redirect. Prefer await so the row lands first.
    const page = window.location.pathname + window.location.hash;
    const payload = {
      placement,
      locale,
      page,
      name: trimmedName,
      phone: trimmedPhone,
    };

    try {
      await fetch("/api/whatsapp-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch {
      // Fall back to beacon if the fetch fails.
      track(payload);
    }

    window.open(href, "_blank", "noopener,noreferrer");
    return true;
  }

  function openCapture(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setError("");

    // Returning visitors (or form re-fill) skip the modal.
    const cached = loadContactCapture();
    if (cached) {
      void submitWithRedirect(cached.name, cached.phone);
      return;
    }

    setName("");
    setPhone("");
    setOpen(true);
  }

  async function submitCapture() {
    setBusy(true);
    try {
      await submitWithRedirect(name, phone);
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        dir={dir}
        className={className}
        onClick={openCapture}
      >
        {children}
      </a>

      {open ? (
        <div
          className="fixed inset-0 z-70 flex items-end justify-center bg-black/60 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-capture-title"
        >
          <div className="w-full max-w-md rounded-sm border border-gold/25 bg-ink p-5 text-sand shadow-2xl">
            <h2 id="contact-capture-title" className="mb-2 font-display text-lg text-gold-soft">
              {copy.title}
            </h2>
            <p className="mb-4 text-[0.85rem] leading-[1.7] text-sand-dim">
              {copy.body}
            </p>

            <label className="mb-1 block text-[0.8rem] text-gold-soft">{copy.name}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder={copy.namePlaceholder}
              className="mb-3 w-full rounded-sm border border-gold/25 bg-ink-2 px-3.5 py-2.5 text-[0.94rem] text-sand focus:border-gold focus:outline-none"
            />

            <label className="mb-1 block text-[0.8rem] text-gold-soft">{copy.phone}</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
              autoComplete="tel"
              placeholder={copy.phonePlaceholder}
              className="mb-3 w-full rounded-sm border border-gold/25 bg-ink-2 px-3.5 py-2.5 text-[0.94rem] text-sand focus:border-gold focus:outline-none"
            />

            {error ? <p className="mb-3 text-[0.85rem] text-[#e2857f]">{error}</p> : null}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-sm border border-gold/25 px-4 py-2.5 text-[0.9rem] text-sand-dim hover:border-gold/50"
              >
                {copy.cancel}
              </button>
              <button
                type="button"
                onClick={submitCapture}
                disabled={busy}
                className="flex-1 rounded-sm bg-gold px-4 py-2.5 text-[0.9rem] font-semibold text-ink hover:bg-gold/90 disabled:opacity-60"
              >
                {busy ? (t?.modal.submit ?? "…") : copy.submit}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
