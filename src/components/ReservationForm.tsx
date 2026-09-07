"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SNAPCHAT_URL, whatsappLink } from "@/i18n/dictionaries";
import { buttonClass } from "./ui";
import { SnapchatIcon, WhatsAppIcon } from "./Icons";
import TrackedLink from "./TrackedLink";

const fieldClass =
  "w-full rounded-xl border border-gold/25 bg-ink/80 px-4 py-3.5 text-[0.95rem] text-sand shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 placeholder:text-sand-dim/70 focus:border-gold focus:outline-none focus:shadow-[0_0_0_3px_rgba(201,162,75,0.18),inset_0_0_12px_rgba(201,162,75,0.08)]";

const quickActionClass =
  "group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-gold/25 bg-ink/55 px-5 py-3.5 text-[0.9rem] font-bold text-sand backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-ink/80";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2.5 block text-[0.82rem] font-semibold tracking-[0.02em] text-gold">
      {children}
    </label>
  );
}

function FormShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-ink-2/50 px-6 py-10 shadow-[0_30px_80px_-36px_rgba(0,0,0,0.85),0_0_40px_-20px_rgba(201,162,75,0.25)] backdrop-blur-md sm:px-12 sm:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/8 via-transparent to-black/20"
      />
      <div className="relative">{children}</div>
    </div>
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
      try {
        const savedName = String(data.name ?? "").trim();
        const savedPhone = String(data.phone ?? "").trim();
        if (savedName && savedPhone) {
          localStorage.setItem(
            "sahra:contact-capture",
            JSON.stringify({ name: savedName, phone: savedPhone }),
          );
        }
      } catch {
        // ignore storage errors
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <FormShell>
        <div className="px-2 py-6 text-center sm:py-8">
          <div className="mb-3 font-display text-[clamp(1.8rem,3vw,2.3rem)] font-bold text-gold">
            {t.form.successTitle}
          </div>
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
              t={t}
              className={`${quickActionClass} hover:shadow-[0_0_20px_rgba(29,122,82,0.25)]`}
            >
              <span className="text-[#25D366]">
                <WhatsAppIcon />
              </span>
              {t.form.whatsappDirect}
            </TrackedLink>
            <button type="button" onClick={() => setStatus("idle")} className={buttonClass("ghost")}>
              {t.form.newRequest}
            </button>
          </div>
        </div>
      </FormShell>
    );
  }

  return (
    <FormShell>
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
              {f.notes} <span className="font-normal text-sand-dim">({f.optional})</span>
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
          className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-[#e4c878]/45 bg-gold px-7 py-4 text-[0.95rem] font-bold text-night shadow-[0_14px_36px_-12px_rgba(201,162,75,0.95)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#d4ae55] hover:shadow-[0_18px_42px_-10px_rgba(201,162,75,1)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === "sending" ? t.form.submitting : t.form.submit}
        </button>

        {status === "error" ? (
          <p className="mt-4 text-center text-[0.85rem] text-[#e2857f]">{t.form.error}</p>
        ) : (
          <p className="mt-4 text-center text-[0.82rem] leading-[1.7] text-sand-dim">{t.form.note}</p>
        )}
      </form>

      <div className="relative mx-auto my-8 max-w-[480px] text-center">
        <span className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        <span className="relative rounded-full border border-gold/20 bg-ink-2/90 px-4 py-1 text-[0.78rem] font-semibold text-sand-dim backdrop-blur-sm">
          {t.form.or}
        </span>
      </div>

      <div className="mx-auto grid max-w-[480px] gap-3 sm:grid-cols-2">
        <TrackedLink
          href={whatsappLink(t.whatsappMessage)}
          placement="form-direct"
          locale={locale}
          t={t}
          className={`${quickActionClass} hover:shadow-[0_0_22px_rgba(29,122,82,0.28)]`}
        >
          <span className="text-[#25D366] transition-transform duration-300 group-hover:scale-110">
            <WhatsAppIcon />
          </span>
          {t.form.whatsappDirect}
        </TrackedLink>

        <TrackedLink
          href={SNAPCHAT_URL}
          placement="form-snapchat"
          locale={locale}
          t={t}
          className={`${quickActionClass} hover:shadow-[0_0_22px_rgba(245,240,0,0.22)]`}
        >
          <span className="text-[#FFFC00] transition-transform duration-300 group-hover:scale-110">
            <SnapchatIcon />
          </span>
          {t.form.snapchatDirect}
        </TrackedLink>
      </div>
    </FormShell>
  );
}
