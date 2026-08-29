"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappLink } from "@/i18n/dictionaries";
import { buttonClass } from "./ui";
import { WhatsAppIcon } from "./Icons";

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
          <a
            href={whatsappLink(t.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("whatsapp")}
          >
            <WhatsAppIcon /> {t.form.whatsappDirect}
          </a>
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
    <div className="border border-gold/25 bg-ink-2 px-6 py-10 sm:px-14 sm:py-14">
      <form onSubmit={handleSubmit} className="mx-auto max-w-[720px]">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">{f.name}</Label>
            <input
              id="name"
              name="name"
              required
              maxLength={80}
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
              placeholder={f.phonePlaceholder}
              className={fieldClass}
            />
          </div>
          <div>
            <Label htmlFor="city">
              {f.city} <span className="text-sand-dim">({f.optional})</span>
            </Label>
            <select id="city" name="city" defaultValue="" className={fieldClass}>
              <option value="">—</option>
              {t.form.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="type">
              {f.type} <span className="text-sand-dim">({f.optional})</span>
            </Label>
            <select id="type" name="type" defaultValue="" className={fieldClass}>
              <option value="">—</option>
              {t.form.types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="date">
              {f.date} <span className="text-sand-dim">({f.optional})</span>
            </Label>
            <input id="date" name="date" type="date" className={fieldClass} />
          </div>
          <div>
            <Label htmlFor="guests">
              {f.guests} <span className="text-sand-dim">({f.optional})</span>
            </Label>
            <input
              id="guests"
              name="guests"
              type="number"
              min={1}
              max={200}
              placeholder="6"
              className={fieldClass}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="budget">
              {f.budget} <span className="text-sand-dim">({f.optional})</span>
            </Label>
            <select id="budget" name="budget" defaultValue="" className={fieldClass}>
              <option value="">—</option>
              {t.form.budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="notes">
              {f.notes} <span className="text-sand-dim">({f.optional})</span>
            </Label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              maxLength={1000}
              placeholder={f.notesPlaceholder}
              className={fieldClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClass("primary", "mt-7 w-full")}
        >
          {status === "sending" ? t.form.submitting : t.form.submit}
        </button>

        {status === "error" ? (
          <p className="mt-4 text-[0.85rem] text-[#e2857f]">{t.form.error}</p>
        ) : (
          <p className="mt-4 text-[0.82rem] leading-[1.7] text-sand-dim">{t.form.note}</p>
        )}
      </form>

      <div className="relative mx-auto my-7 max-w-[720px] text-center">
        <span className="absolute inset-x-0 top-1/2 h-px bg-gold/20" />
        <span className="relative bg-ink-2 px-3.5 text-[0.78rem] text-sand-dim">{t.form.or}</span>
      </div>

      <a
        href={whatsappLink(t.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass("whatsapp", "mx-auto max-w-[720px] w-full")}
      >
        <WhatsAppIcon /> {t.form.whatsappDirect}
      </a>
    </div>
  );
}
