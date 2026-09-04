"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SNAPCHAT_URL, whatsappLink } from "@/i18n/dictionaries";
import { buttonClass } from "./ui";
import { SnapchatIcon, WhatsAppIcon } from "./Icons";
import TrackedLink from "./TrackedLink";

const fieldClass =
  "w-full rounded-sm border border-gold/25 bg-ink px-3.5 py-3 text-[0.94rem] text-sand transition-colors placeholder:text-sand-dim/60 focus:border-gold focus:outline-none";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[0.8rem] text-gold-soft">
      {children}
    </label>
  );
}

export default function ReservationForm({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const f = t.form.fields;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale, source: "reservation-form" }),
      });
      if (!response.ok) throw new Error("request failed");
      const result = (await response.json()) as { reservation: { ref: string } };
      setReference(result.reservation.ref);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-gold/25 bg-ink-2 px-8 py-14 text-center">
        <div className="mb-3 font-display text-[2.2rem] text-gold-soft">{t.form.successTitle}</div>
        <p className="mx-auto max-w-[46ch] leading-[1.8] text-sand-dim">{t.form.successBody}</p>
        {reference ? (
          <p className="mt-5 font-mono text-[0.85rem] text-gold-soft" dir="ltr">
            {t.form.successRef}: {reference}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <TrackedLink
            href={whatsappLink(t.whatsappMessage)}
            placement="form-success"
            locale={locale}
            className={buttonClass("whatsapp")}
          >
            <WhatsAppIcon /> {t.form.whatsappDirect}
          </TrackedLink>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className={buttonClass("ghost")}
          >
            {t.form.newRequest}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gold/25 bg-ink-2 px-6 py-10 sm:px-14 sm:py-12">
      <form onSubmit={handleSubmit} className="mx-auto max-w-[480px]">
        <div className="grid gap-5">
          <div>
            <Label htmlFor="name">{f.name}</Label>
            <input
              id="name"
              name="name"
              required
              maxLength={80}
              autoComplete="name"
              placeholder={f.namePlaceholder}
              className={fieldClass}
            />
          </div>
          <div>
            <Label htmlFor="phone">{f.phone}</Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              maxLength={30}
              dir="ltr"
              autoComplete="tel"
              placeholder={f.phonePlaceholder}
              className={fieldClass}
            />
          </div>
          <div>
            <Label htmlFor="notes">
              {f.notes} <span className="text-sand-dim">({f.optional})</span>
            </Label>
            <input
              id="notes"
              name="notes"
              maxLength={200}
              placeholder={f.notesPlaceholder}
              className={fieldClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClass("primary", "shine mt-7 w-full")}
        >
          {status === "sending" ? t.form.submitting : t.form.submit}
        </button>

        {status === "error" ? (
          <p className="mt-4 text-[0.85rem] text-[#e2857f]">{t.form.error}</p>
        ) : (
          <p className="mt-4 text-center text-[0.82rem] leading-[1.7] text-sand-dim">{t.form.note}</p>
        )}
      </form>

      <div className="relative mx-auto my-7 max-w-[480px] text-center">
        <span className="absolute inset-x-0 top-1/2 h-px bg-gold/20" />
        <span className="relative bg-ink-2 px-3.5 text-[0.78rem] text-sand-dim">{t.form.or}</span>
      </div>

      <div className="mx-auto grid max-w-[480px] gap-3 sm:grid-cols-2">
        <TrackedLink
          href={whatsappLink(t.whatsappMessage)}
          placement="form-direct"
          locale={locale}
          className={buttonClass("whatsapp", "w-full")}
        >
          <WhatsAppIcon /> {t.form.whatsappDirect}
        </TrackedLink>

        <TrackedLink
          href={SNAPCHAT_URL}
          placement="form-snapchat"
          locale={locale}
          className={buttonClass("snapchat", "w-full")}
        >
          <SnapchatIcon /> {t.form.snapchatDirect}
        </TrackedLink>
      </div>
    </div>
  );
}
