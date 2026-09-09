"use client";

import type { Locale } from "@/i18n/config";
import type { FlatCopy, LocalizedString } from "@/lib/content/types";
import type { CopyField } from "@/lib/content/page-copy";

function fieldClass(extra = "") {
  return `w-full rounded-sm border border-gold/25 bg-ink px-3.5 py-2.5 text-[0.9rem] text-sand placeholder:text-sand-dim/50 focus:border-gold focus:outline-none ${extra}`;
}

/** Pull string keys from a dictionary section for CMS field defaults. */
export function dictStringDefaults(
  section: Record<string, unknown> | undefined,
  fields: CopyField[],
): Record<string, string> {
  if (!section) return {};
  const out: Record<string, string> = {};
  for (const field of fields) {
    const value = section[field.key];
    if (typeof value === "string") out[field.key] = value;
  }
  return out;
}

export function FlatCopyFields({
  fields,
  value,
  locale,
  onChange,
  defaults,
}: {
  fields: CopyField[];
  value: FlatCopy | undefined;
  locale: Locale;
  onChange: (next: FlatCopy) => void;
  /** Live site strings when no CMS override is saved yet. */
  defaults?: Record<string, string>;
}) {
  return (
    <div className="grid gap-4">
      {fields.map((field) => {
        const stored = value?.[field.key]?.[locale];
        const current =
          stored !== undefined && stored !== ""
            ? stored
            : (defaults?.[field.key] ?? "");
        const Tag = field.multiline ? "textarea" : "input";
        return (
          <label key={field.key} className="block">
            <span className="mb-1.5 block text-[0.75rem] tracking-wide text-sand-dim uppercase">
              {field.label} · {locale === "ar" ? "عربي" : "English"}
            </span>
            <Tag
              className={fieldClass(field.multiline ? "min-h-[96px] resize-y" : "")}
              value={current}
              onChange={(e) =>
                onChange({
                  ...value,
                  [field.key]: {
                    ...value?.[field.key],
                    [locale]: e.target.value,
                  },
                })
              }
              {...(field.multiline ? {} : { type: "text" })}
            />
          </label>
        );
      })}
    </div>
  );
}

export function LocalizedPairFields({
  label,
  value,
  locale,
  onChange,
  multiline,
  defaultValue,
}: {
  label: string;
  value: LocalizedString | undefined;
  locale: Locale;
  onChange: (next: LocalizedString) => void;
  multiline?: boolean;
  defaultValue?: string;
}) {
  const stored = value?.[locale];
  const current =
    stored !== undefined && stored !== "" ? stored : (defaultValue ?? "");
  const Tag = multiline ? "textarea" : "input";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.75rem] tracking-wide text-sand-dim uppercase">
        {label} · {locale === "ar" ? "عربي" : "English"}
      </span>
      <Tag
        className={fieldClass(multiline ? "min-h-[96px] resize-y" : "")}
        value={current}
        onChange={(e) => onChange({ ...value, [locale]: e.target.value })}
        {...(multiline ? {} : { type: "text" })}
      />
    </label>
  );
}

export function LocaleLinesEditor({
  label,
  lines,
  onChange,
}: {
  label: string;
  lines: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.75rem] tracking-wide text-sand-dim uppercase">
        {label} · سطر لكل فقرة
      </span>
      <textarea
        className={fieldClass("min-h-[140px] resize-y")}
        value={lines.join("\n")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((line) => line.trimEnd())
              .filter((line, index, arr) => !(line === "" && index === arr.length - 1)),
          )
        }
      />
    </label>
  );
}
