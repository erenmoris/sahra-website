import type { ReactNode } from "react";

export type WaMessage = {
  from: "them" | "us";
  text: string;
  time: string;
};

export type WaChat = {
  contact: string;
  messages: WaMessage[];
  /** Status-bar clock, e.g. "١١:٣٨" */
  clock?: string;
  /** Battery 1–100 */
  battery?: number;
  /** Cellular bars 1–4 */
  signal?: number;
  /** Last-seen line (will be blurred for privacy) */
  lastSeen?: string;
};

type WaLabels = {
  today: string;
  lastSeen: string;
  placeholder: string;
};

const LABELS = {
  ar: { today: "اليوم", lastSeen: "آخر ظهور اليوم", placeholder: "رسالة" },
  en: { today: "Today", lastSeen: "last seen today", placeholder: "Message" },
} as const;

function SignalBars({ level }: { level: number }) {
  const n = Math.min(4, Math.max(1, level));
  return (
    <span className="inline-flex items-end gap-[1.5px]" aria-hidden>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`w-[3px] rounded-[0.5px] ${i <= n ? "bg-[#e9edef]" : "bg-[#e9edef]/30"}`}
          style={{ height: `${4 + i * 2.5}px` }}
        />
      ))}
    </span>
  );
}

function BatteryIcon({ percent }: { percent: number }) {
  const p = Math.min(100, Math.max(5, percent));
  const low = p <= 20;
  return (
    <span className="inline-flex items-center gap-[2px]" aria-hidden>
      <span className="relative h-[11px] w-[22px] rounded-[2.5px] border border-[#e9edef]/90 p-[1.5px]">
        <span
          className={`block h-full rounded-[1px] ${low ? "bg-[#ff453a]" : "bg-[#e9edef]"}`}
          style={{ width: `${p}%` }}
        />
      </span>
      <span className="h-[4px] w-[1.5px] rounded-e-[1px] bg-[#e9edef]/90" />
      <span className="ms-0.5 text-[10px] font-medium leading-none text-[#e9edef]">{p}</span>
    </span>
  );
}

/** Soft privacy blur — like covering a name on a real screenshot. */
function BlurStrip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block max-w-full ${className}`}>
      <span className="select-none blur-[6px]">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-sm bg-[#1f2c34]/25 backdrop-blur-[2px]"
      />
    </span>
  );
}

/** Pixel-close WhatsApp dark chat mock — reads as a phone screenshot. */
export default function WhatsAppScreenshot({
  chat,
  caption,
  locale = "ar",
}: {
  chat: WaChat;
  caption?: string;
  locale?: "ar" | "en";
}) {
  const labels: WaLabels = LABELS[locale];
  const clock = chat.clock ?? (locale === "ar" ? "١٠:٢٤" : "10:24");
  const battery = chat.battery ?? 73;
  const signal = chat.signal ?? 3;
  const lastSeen = chat.lastSeen ?? labels.lastSeen;

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#25D366]/35 bg-[#0b141a] p-1.5 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.85)]">
      <div
        className="flex aspect-9/16 flex-col overflow-hidden rounded-[16px] text-[13px] leading-[1.45]"
        dir={locale === "ar" ? "rtl" : "ltr"}
        style={{ backgroundColor: "#0b141a" }}
      >
        {/* Status bar — cellular + battery only (no Wi‑Fi label) */}
        <div className="flex items-center justify-between bg-[#1f2c34] px-3.5 pt-2.5 pb-1 text-[11px] font-medium text-[#e9edef]">
          <span className="tabular-nums">{clock}</span>
          <div className="flex items-center gap-2">
            <SignalBars level={signal} />
            <BatteryIcon percent={battery} />
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-b border-black/25 bg-[#1f2c34] px-2.5 py-2">
          <span className="text-[20px] leading-none text-[#aebac1]">{locale === "ar" ? "‹" : "›"}</span>
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#627884]">
            <span className="absolute inset-0 blur-[5px] brightness-75" aria-hidden />
            <span className="absolute inset-0 bg-gradient-to-br from-[#7a8f9a] to-[#3d4f58]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold text-[#e9edef]">
              <BlurStrip>{chat.contact}</BlurStrip>
            </div>
            <div className="mt-0.5 text-[11px] text-[#8696a0]">
              <BlurStrip>{lastSeen}</BlurStrip>
            </div>
          </div>
          <div className="flex items-center gap-3.5 text-[15px] text-[#aebac1]">
            <span aria-hidden>⋮</span>
          </div>
        </div>

        <div
          className="flex flex-1 flex-col justify-end gap-[5px] overflow-hidden px-2 py-3"
          style={{
            backgroundColor: "#0b141a",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23ffffff' stroke-opacity='0.02'/%3E%3C/svg%3E\")",
          }}
        >
          <div className="mb-1.5 self-center rounded-md bg-[#182229] px-3 py-1 text-[11px] text-[#8696a0]">
            {labels.today}
          </div>
          {chat.messages.map((msg, i) => {
            const ours = msg.from === "us";
            const side = ours ? "self-end" : "self-start";
            const radius = ours
              ? locale === "ar"
                ? "rounded-lg rounded-bl-sm"
                : "rounded-lg rounded-br-sm"
              : locale === "ar"
                ? "rounded-lg rounded-br-sm"
                : "rounded-lg rounded-bl-sm";

            return (
              <div key={`${msg.time}-${i}`} className={`flex max-w-[86%] ${side}`}>
                <div
                  className={`relative px-2.5 pt-1.5 pb-1 shadow-[0_1px_0.5px_rgba(0,0,0,0.35)] ${radius} ${
                    ours ? "bg-[#005c4b]" : "bg-[#202c33]"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-[#e9edef]">{msg.text}</p>
                  <div
                    className={`mt-0.5 flex items-center justify-end gap-1 text-[10px] ${
                      ours ? "text-[#99beb7]" : "text-[#8696a0]"
                    }`}
                  >
                    <span>{msg.time}</span>
                    {ours ? (
                      <span className="text-[11px] leading-none tracking-tighter text-[#53bdeb]">
                        ✓✓
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 bg-[#1f2c34] px-1.5 py-1.5">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-full bg-[#2a3942] px-3 text-[13px] text-[#8696a0]">
            <span className="text-[16px]">☺</span>
            <span>{labels.placeholder}</span>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
        </div>
      </div>
      {caption ? <p className="sr-only">{caption}</p> : null}
    </div>
  );
}
