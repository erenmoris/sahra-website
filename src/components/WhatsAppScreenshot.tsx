import type { ReactNode } from "react";

export type WaMessage = {
  from: "them" | "us";
  text: string;
  time: string;
};

export type WaChat = {
  contact: string;
  messages: WaMessage[];
  /** Last-seen line (will be blurred for privacy) */
  lastSeen?: string;
  /** Chat date chip — e.g. "١٥ يناير" */
  dayLabel?: string;
  clock?: string;
  battery?: number;
  signal?: number;
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
        className="pointer-events-none absolute inset-0 rounded-sm bg-[#0d1f24]/30 backdrop-blur-[2px]"
      />
    </span>
  );
}

/** Premium floating WhatsApp glass mock — dark teal + emerald bubbles. */
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
  const lastSeen = chat.lastSeen ?? labels.lastSeen;
  const dayLabel = chat.dayLabel ?? labels.today;

  return (
    <div className="lux-dark-chrome overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#0d1a1f] p-2 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.95),0_0_40px_-20px_rgba(16,185,129,0.25)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_32px_80px_-28px_rgba(0,0,0,0.95),0_0_48px_-16px_rgba(201,162,75,0.22)]">
      <div
        className="flex flex-col overflow-hidden rounded-[1.15rem] text-[13px] leading-[1.45]"
        dir={locale === "ar" ? "rtl" : "ltr"}
        style={{ backgroundColor: "#0d1a1f" }}
      >
        <div className="flex items-center gap-2.5 border-b border-white/8 bg-[#12252c]/95 px-2.5 py-3 backdrop-blur-md">
          <span className="text-[20px] leading-none text-[#9fb0b8]">{locale === "ar" ? "‹" : "›"}</span>
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#2a3f48]">
            <span className="absolute inset-0 bg-gradient-to-br from-[#4a6570] to-[#1c2d34]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold text-white">
              <BlurStrip>{chat.contact}</BlurStrip>
            </div>
            <div className="mt-0.5 text-[11px] text-white/45">
              <BlurStrip>{lastSeen}</BlurStrip>
            </div>
          </div>
          <div className="flex items-center gap-3.5 text-[15px] text-[#9fb0b8]">
            <span aria-hidden>⋮</span>
          </div>
        </div>

        <div
          className="flex min-h-[220px] flex-col gap-[6px] px-2.5 py-3.5"
          style={{
            backgroundColor: "#0d1a1f",
            backgroundImage:
              "radial-gradient(circle at 20% 10%, rgba(16,185,129,0.06), transparent 40%), url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23ffffff' stroke-opacity='0.025'/%3E%3C/svg%3E\")",
          }}
        >
          <div className="mb-1.5 self-center rounded-full border border-white/8 bg-[#15262d]/90 px-3.5 py-1 text-[11px] text-white/45 backdrop-blur-sm">
            {dayLabel}
          </div>
          {chat.messages.map((msg, i) => {
            const ours = msg.from === "us";
            const side = ours ? "self-end" : "self-start";
            const radius = ours
              ? locale === "ar"
                ? "rounded-2xl rounded-bl-md"
                : "rounded-2xl rounded-br-md"
              : locale === "ar"
                ? "rounded-2xl rounded-br-md"
                : "rounded-2xl rounded-bl-md";

            return (
              <div key={`${msg.time}-${i}`} className={`flex max-w-[88%] ${side}`}>
                <div
                  className={`relative px-3 pt-2 pb-1.5 shadow-[0_4px_14px_-6px_rgba(0,0,0,0.55)] ${radius} ${
                    ours
                      ? "border border-emerald-400/20 bg-[#0f766e] bg-gradient-to-br from-[#10b981]/90 to-[#0d9488]"
                      : "border border-white/8 bg-[#1e2d35]"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-[0.92rem] text-white/95">{msg.text}</p>
                  <div
                    className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                      ours ? "text-emerald-100/70" : "text-white/40"
                    }`}
                  >
                    <span>{msg.time}</span>
                    {ours ? (
                      <span className="text-[11px] leading-none tracking-tighter text-[#7dd3fc]">
                        ✓✓
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 border-t border-white/6 bg-[#12252c]/95 px-1.5 py-2 backdrop-blur-md">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-full border border-white/8 bg-[#1a2c33] px-3 text-[13px] text-white/40">
            <span className="text-[16px]">☺</span>
            <span>{labels.placeholder}</span>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#10b981] to-[#0d9488] text-white shadow-[0_0_16px_-4px_rgba(16,185,129,0.7)]">
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
