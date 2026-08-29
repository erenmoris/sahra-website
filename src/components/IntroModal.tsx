"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import { buttonClass } from "./ui";

const STORAGE_KEY = "sahra:intro-dismissed";
const fieldClass =
  "w-full rounded-sm border border-gold/25 bg-ink px-3.5 py-3 text-[0.94rem] text-sand transition-colors placeholder:text-sand-dim/60 focus:border-gold focus:outline-none";

export default function IntroModal({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function close() {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    setSending(true);
    try {
      await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale, source: "intro-popup" }),
      });
    } catch {
      // The lead is still shown as received; the visitor can use WhatsApp instead.
    }
    setSending(false);
    setSent(true);
    setTimeout(close, 2400);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="fixed inset-0 z-200 flex items-center justify-center bg-[rgba(6,8,14,0.82)] p-5 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-[420px] border border-gold bg-gradient-to-br from-ink-3 to-ink-2 px-8 pt-9 pb-8 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)]">
        <button
          type="button"
          onClick={close}
          aria-label={t.modal.close}
          className="absolute top-3 end-4 cursor-pointer text-2xl leading-none text-sand-dim transition-colors hover:text-gold-soft"
        >
          ×
        </button>

        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="mb-3.5" aria-hidden="true">
          <path
            d="M6 6h22l-9 12v9M17 27h-6M17 27h6"
            stroke="#C9A24B"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="9" r="1.6" fill="#C9A24B" />
        </svg>

        <div className="mb-2.5 text-[0.76rem] tracking-[0.04em] text-gold-soft">{t.modal.eyebrow}</div>
        <h3 className="mb-6 font-display text-[1.4rem] leading-[1.45] font-semibold text-sand">
          {t.modal.title}
        </h3>

        {sent ? (
          <div className="py-2.5 text-center">
            <div className="mb-2 font-display text-[1.8rem] text-gold-soft">
              {t.modal.successTitle}
            </div>
            <p className="text-[0.92rem] text-sand-dim">{t.modal.successBody}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="mName" className="mb-2 block text-[0.8rem] text-gold-soft">
                {t.form.fields.name}
              </label>
              <input
                id="mName"
                name="name"
                required
                maxLength={80}
                placeholder={t.form.fields.namePlaceholder}
                className={fieldClass}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="mPhone" className="mb-2 block text-[0.8rem] text-gold-soft">
                {t.form.fields.phone}
              </label>
              <input
                id="mPhone"
                name="phone"
                type="tel"
                required
                maxLength={30}
                dir="ltr"
                placeholder={t.form.fields.phonePlaceholder}
                className={fieldClass}
              />
            </div>
            <button type="submit" disabled={sending} className={buttonClass("primary", "w-full")}>
              {sending ? t.form.submitting : t.modal.submit}
            </button>
          </form>
        )}

        <div className="relative my-6 text-center">
          <span className="absolute inset-x-0 top-1/2 h-px bg-gold/20" />
          <span className="relative bg-ink-2 px-3.5 text-[0.78rem] text-sand-dim">{t.modal.or}</span>
        </div>

        <a
          href={whatsappLink(t.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-gold/25 p-3 text-center text-[0.88rem] text-gold-soft transition-colors hover:border-gold"
        >
          {t.modal.whatsappDirect}
        </a>
      </div>
    </div>
  );
}
