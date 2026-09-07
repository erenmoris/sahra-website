"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type Section = Dictionary["privacy"]["sections"][number];

export default function PrivacyAccordion({
  sections,
  tocTitle,
}: {
  sections: readonly Section[];
  tocTitle: string;
}) {
  const [openId, setOpenId] = useState<string | null>(sections[0]?.id ?? null);

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
      <aside
        data-testid="privacy-toc"
        className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
      >
        <p className="mb-4 text-[0.75rem] tracking-[0.14em] text-gold-soft uppercase">
          {tocTitle}
        </p>
        <nav aria-label={tocTitle}>
          <ol className="space-y-2.5 border-s border-gold/25 ps-4">
            {sections.map((section, index) => {
              const active = openId === section.id;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    data-testid={`privacy-toc-${section.id}`}
                    onClick={() => {
                      setOpenId(section.id);
                      document
                        .getElementById(section.id)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`block w-full text-start text-[0.88rem] leading-[1.55] transition-colors ${
                      active ? "text-gold-soft" : "text-sand-dim hover:text-gold-soft"
                    }`}
                  >
                    <span className="me-1.5 font-mono text-[0.72rem] text-gold/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>

      <div data-testid="privacy-sections" className="space-y-3">
        {sections.map((section, index) => {
          const open = openId === section.id;
          return (
            <section
              key={section.id}
              id={section.id}
              data-testid={`policy-section-${section.id}`}
              className="lux-panel scroll-mt-28 overflow-hidden rounded-[1.15rem] border border-gold/20 bg-ink-2/85 shadow-[0_18px_48px_-36px_rgba(0,0,0,0.4)] backdrop-blur-md"
            >
              <h2>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${section.id}-panel`}
                  data-testid={`policy-heading-${section.id}`}
                  onClick={() => setOpenId(open ? null : section.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start md:px-7 md:py-6"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.75rem] text-gold/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.15rem] leading-[1.4] font-semibold text-sand md:text-[1.25rem]">
                      {section.title}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
              </h2>
              <div
                id={`${section.id}-panel`}
                role="region"
                hidden={!open}
                className={open ? "border-t border-gold/15 px-5 pb-6 md:px-7 md:pb-7" : undefined}
              >
                {open ? (
                  <p className="max-w-4xl pt-1 text-[1.02rem] leading-[1.95] text-sand-dim">
                    {section.body}
                  </p>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
