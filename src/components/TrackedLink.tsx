"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
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
  /** QA automation hook */
  testId?: string;
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
  testId,
  children,
}: Props) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
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
    cancel: t?.modal.close ?? (ar ? "إغلاق" : "Close"),
    requiredName: t?.modal.requiredName ?? (ar ? "اسمك مطلوب" : "Name is required"),
    requiredPhone:
      t?.modal.requiredPhone ?? (ar ? "رقم الواتساب مطلوب" : "Phone is required"),
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
      track(payload);
    }

    window.open(href, "_blank", "noopener,noreferrer");
    return true;
  }

  function openCapture(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setError("");

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

  const modal =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-testid="contact-capture-modal"
          >
            <button
              type="button"
              aria-label={copy.cancel}
              className="absolute inset-0 bg-[#0B101E]/75 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />

            <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-b from-ink-2 to-[#0B101E] p-6 text-start shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85)] sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -end-10 top-0 h-40 w-40 rounded-full bg-gold/15 blur-[70px]"
              />

              <div className="relative overflow-hidden">
                <h2
                  id={titleId}
                  className="font-display text-[1.25rem] leading-[1.45] font-bold text-gold sm:text-[1.35rem]"
                >
                  {copy.title}
                </h2>
                <p className="mt-3 text-[0.9rem] leading-[1.8] text-sand-dim">{copy.body}</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-[0.72rem] font-semibold tracking-[0.14em] text-gold/90 uppercase">
                      {copy.name}
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      placeholder={copy.namePlaceholder}
                      className="w-full rounded-md border border-gold/25 bg-[#0B101E]/80 px-4 py-3.5 text-start text-[0.95rem] text-sand placeholder:text-sand-dim/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[0.72rem] font-semibold tracking-[0.14em] text-gold/90 uppercase">
                      {copy.phone}
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      dir="ltr"
                      autoComplete="tel"
                      placeholder={copy.phonePlaceholder}
                      className="w-full rounded-md border border-gold/25 bg-[#0B101E]/80 px-4 py-3.5 text-start text-[0.95rem] text-sand placeholder:text-sand-dim/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
                    />
                  </div>
                </div>

                {error ? (
                  <p className="mt-4 text-start text-[0.85rem] text-[#e2857f]">{error}</p>
                ) : null}

                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    onClick={submitCapture}
                    disabled={busy}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gold px-5 py-3.5 text-[0.92rem] font-bold text-night shadow-[0_0_32px_-8px_rgba(201,162,75,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4ae55] hover:shadow-[0_0_40px_-6px_rgba(201,162,75,0.95)] disabled:opacity-60"
                  >
                    {busy ? "…" : copy.submit}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-md border border-gold/35 bg-transparent px-5 py-3.5 text-[0.92rem] font-semibold text-sand transition-colors hover:border-gold hover:bg-gold/10"
                  >
                    {copy.cancel}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        dir={dir}
        className={className}
        data-testid={testId}
        onClick={openCapture}
      >
        {children}
      </a>
      {modal}
    </>
  );
}
