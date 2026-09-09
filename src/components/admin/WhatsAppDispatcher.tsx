"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type DispatchStatus = "sent" | "failed";

type DispatchLog = {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: DispatchStatus;
  createdAt: string;
};

type VipInsight = {
  vibe: string;
  drink: string;
  lastBooking: string;
  note: string;
};

type InteractiveButton = {
  id: string;
  label: string;
};

const STORAGE_KEY = "sahra:whatsapp-dispatcher-log";
const MAX_LOG = 25;
const MAX_BUTTONS = 3;

const TEMPLATES = [
  {
    id: "welcome",
    label: "ترحيب حصري",
    body: (name: string) =>
      `أهلاً ${name || "ضيفنا العزيز"}،\n\nمعاك كونسييرج سهرة.\nسعدت بتواصلك — جاهزين نرتّب ليلتك بخصوصية كاملة.\nقولّي تفضيلاتك وأنا هجهّزلك الخيارات المناسبة.`,
  },
  {
    id: "table",
    label: "تأكيد طاولة",
    body: (name: string) =>
      `أهلاً ${name || "ضيفنا العزيز"}،\n\nتم تأكيد طاولتك عبر سهرة.\nالتفاصيل جاهزة باسمك — ولو محتاج أي تعديل قبل الوصول، راسلني مباشرة.`,
  },
  {
    id: "invite",
    label: "دعوة خاصة",
    body: (name: string) =>
      `أهلاً ${name || "ضيفنا العزيز"}،\n\nدعوة خاصة من سهرة.\nعندنا تجربة VIP الليلة — دخول مباشر وترتيب شخصي.\nلو حابب نحجزلك مكان، رد عليّ وأكمل التفاصيل فورًا.`,
  },
] as const;

const VIBE_POOL = [
  "يفضل الخصوصية",
  "يحب الطاولات الهادئة",
  "يفضّل سرعة الرد",
  "ضيف دائم — أسلوب راقٍ",
  "يحب التجارب الجديدة",
] as const;

const DRINK_POOL = [
  "مشروب كلاسيك بدون ثلج",
  "موكتيل منعش",
  "شاي أعشاب فاخر",
  "ماء فوار مثلّج",
  "إسبريسو بعد العشاء",
] as const;

const BOOKING_POOL = [
  "The Lemon Tree",
  "Skybar Cairo",
  "Chalet North Coast",
  "VIP Table — Downtown",
  "Beach Cabana #4",
] as const;

const NOTE_POOL = [
  "يفضّل التواصل باختصار وبأسلوب رسمي دافئ.",
  "لا يُذكر اسمه بصوت عالٍ أمام الطاولة.",
  "يحجز غالبًا في آخر لحظة — جهّز خيارات بديلة.",
  "يقدّر التأكيد المزدوج قبل الوصول بساعة.",
] as const;

function normalizePhone(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("ar-EG", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

function buildVipInsight(name: string, phone: string): VipInsight {
  const seed = hashSeed(`${name.trim().toLowerCase()}|${normalizePhone(phone)}`);
  return {
    vibe: VIBE_POOL[seed % VIBE_POOL.length],
    drink: DRINK_POOL[(seed >> 3) % DRINK_POOL.length],
    lastBooking: BOOKING_POOL[(seed >> 5) % BOOKING_POOL.length],
    note: NOTE_POOL[(seed >> 7) % NOTE_POOL.length],
  };
}

function polishVipTone(raw: string, clientName: string): string {
  const name = clientName.trim() || "ضيفنا العزيز";
  const body = raw
    .trim()
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^(أهلاً|مرحبا|مرحباً|السلام عليكم)[^\n]*/i, "")
    .trim();

  const core =
    body ||
    "يسعدنا ترتيب تجربة خاصة لك الليلة بخصوصية كاملة وتفاصيل مدروسة.";

  return [
    `أهلاً ${name}،`,
    "",
    "يسعدني التواصل معك من كونسييرج سهرة.",
    core
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) =>
        line
          .replace(/\bok\b/gi, "تمام")
          .replace(/هبعت|هبعتلك/gi, "سأرسل لك")
          .replace(/قولي|قوليلي/gi, "شاركني"),
      )
      .join("\n"),
    "",
    "بكل سرور، نحن تحت أمرك لأي تفصيلة قبل الوصول.",
    "— فريق سهرة VIP",
  ].join("\n");
}

function appendInteractiveButtons(message: string, buttons: InteractiveButton[]): string {
  const labels = buttons.map((b) => b.label.trim()).filter(Boolean);
  if (!labels.length) return message.trim();

  const block = [
    "",
    "————————",
    "خيارات سريعة (رد برقم أو نص الزر):",
    ...labels.map((label, i) => `${i + 1}) ${label}`),
  ].join("\n");

  return `${message.trim()}\n${block}`;
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 12h11.2M12.2 6.5 18.5 12l-6.3 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5 13.2 8.8 18.5 10 13.2 11.2 12 16.5 10.8 11.2 5.5 10 10.8 8.8 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 14.5 19.1 16.9 21.5 17.5 19.1 18.1 18.5 20.5 17.9 18.1 15.5 17.5 17.9 16.9 18.5 14.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WhatsAppDispatcher({ username }: { username: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [log, setLog] = useState<DispatchLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [polishing, setPolishing] = useState(false);
  const [buttons, setButtons] = useState<InteractiveButton[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as DispatchLog[];
      if (Array.isArray(parsed)) setLog(parsed.slice(0, MAX_LOG));
    } catch {
      // ignore corrupt storage
    }
  }, []);

  function persist(next: DispatchLog[]) {
    setLog(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(0, MAX_LOG)));
    } catch {
      // private mode / quota
    }
  }

  const clientSelected = name.trim().length >= 2 || normalizePhone(phone).length >= 10;

  const vipInsight = useMemo(() => {
    if (!clientSelected) return null;
    return buildVipInsight(name, phone);
  }, [clientSelected, name, phone]);

  function applyTemplate(id: string) {
    const template = TEMPLATES.find((item) => item.id === id);
    if (!template) return;
    setActiveTemplate(id);
    setMessage(template.body(name.trim()));
    setError(null);
  }

  function selectFromLog(row: DispatchLog) {
    setName(row.name === "عميل" ? "" : row.name);
    setPhone(row.phone === "—" ? "" : row.phone);
    setMessage(row.message);
    setActiveTemplate(null);
    setError(null);
    setFlash("تم تحميل ملف العميل من السجل.");
  }

  function addInteractiveButton() {
    if (buttons.length >= MAX_BUTTONS) return;
    setButtons((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: prev.length === 0 ? "تأكيد الحجز" : prev.length === 1 ? "إلغاء" : "تواصل معنا",
      },
    ]);
  }

  function updateButtonLabel(id: string, label: string) {
    setButtons((prev) => prev.map((b) => (b.id === id ? { ...b, label } : b)));
  }

  function removeButton(id: string) {
    setButtons((prev) => prev.filter((b) => b.id !== id));
  }

  function runTonePolisher() {
    setPolishing(true);
    setError(null);
    window.setTimeout(() => {
      setMessage((prev) => polishVipTone(prev, name));
      setActiveTemplate(null);
      setPolishing(false);
      setFlash("تم تنعيم النص بنبرة VIP.");
    }, 420);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  function sendNow() {
    setError(null);
    setFlash(null);

    const digits = normalizePhone(phone);
    const trimmedName = name.trim() || "عميل";
    const trimmedMessage = appendInteractiveButtons(message, buttons);

    if (digits.length < 10) {
      setError("أدخل رقم واتساب صحيح مع رمز الدولة (مثال: 2010xxxxxxx).");
      const failed: DispatchLog = {
        id: crypto.randomUUID(),
        name: trimmedName,
        phone: phone.trim() || "—",
        message: trimmedMessage,
        status: "failed",
        createdAt: new Date().toISOString(),
      };
      persist([failed, ...log].slice(0, MAX_LOG));
      return;
    }

    if (!message.trim()) {
      setError("اكتب الرسالة أو اختَر قالبًا قبل الإرسال.");
      return;
    }

    const href = `https://wa.me/${digits}?text=${encodeURIComponent(trimmedMessage)}`;
    const opened = window.open(href, "_blank", "noopener,noreferrer");

    const entry: DispatchLog = {
      id: crypto.randomUUID(),
      name: trimmedName,
      phone: digits,
      message: trimmedMessage,
      status: opened ? "sent" : "failed",
      createdAt: new Date().toISOString(),
    };

    persist([entry, ...log].slice(0, MAX_LOG));

    if (!opened) {
      setError("المتصفح منع فتح واتساب. اسمح بالنوافذ المنبثقة وحاول مرة أخرى.");
      return;
    }

    setFlash("اتفتح واتساب — أكّد الإرسال من التطبيق.");
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#0B101E]" data-testid="whatsapp-dispatcher-root">
      <header className="sticky top-0 z-30 border-b border-gold/20 bg-[#0B101E]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <div className="font-display text-xl font-bold text-sand">
              WhatsApp VIP Dispatcher{" "}
              <span className="text-gold-soft">· CRM</span>
            </div>
            <p className="mt-1 flex items-center gap-2 text-[0.8rem] text-sand-dim">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#63c2a3]">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#63c2a3]/70" />
              </span>
              متصل — Interactive CRM
              <span className="text-sand-dim/70">· مسجّل: {username}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
              data-testid="nav-reservations"
            >
              الحجوزات
            </Link>
            <Link
              href="/admin/content"
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
              data-testid="nav-content"
            >
              المحتوى
            </Link>
            <button
              type="button"
              onClick={logout}
              className="cursor-pointer border border-[#c9646f]/40 px-3 py-2 text-[0.78rem] text-[#e2857f] transition-colors hover:border-[#c9646f]"
              data-testid="logout-button"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(280px,0.85fr)] xl:gap-6">
          {/* Client + templates */}
          <section
            className="rounded-2xl border border-gold/25 bg-white/[0.04] p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl md:p-7"
            data-testid="client-templates-panel"
          >
            <h2 className="font-display text-lg font-semibold text-sand">
              العميل والقوالب
            </h2>
            <p className="mt-1 text-[0.82rem] text-sand-dim">
              أضف بيانات المستلم واختَر قالب VIP جاهز.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-[0.78rem] font-semibold tracking-[0.04em] text-gold">
                  اسم العميل
                </span>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (activeTemplate) {
                      const template = TEMPLATES.find((t) => t.id === activeTemplate);
                      if (template) setMessage(template.body(e.target.value.trim()));
                    }
                  }}
                  placeholder="مثال: أحمد"
                  className="w-full rounded-md border border-gold/25 bg-[#0B101E]/55 ps-4 pe-4 py-3 text-[0.95rem] text-sand placeholder:text-sand-dim/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
                  data-testid="client-name-input"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[0.78rem] font-semibold tracking-[0.04em] text-gold">
                  رقم الواتساب (مع رمز الدولة)
                </span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  dir="ltr"
                  placeholder="2010xxxxxxx"
                  className="w-full rounded-md border border-gold/25 bg-[#0B101E]/55 ps-4 pe-4 py-3 text-start font-mono text-[0.95rem] text-sand placeholder:text-sand-dim/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
                  data-testid="client-phone-input"
                />
              </label>
            </div>

            <div className="mt-7">
              <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.14em] text-gold uppercase">
                قوالب سريعة
              </p>
              <div className="flex flex-wrap gap-2.5" data-testid="template-chips">
                {TEMPLATES.map((template) => {
                  const active = activeTemplate === template.id;
                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => applyTemplate(template.id)}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-[0.82rem] font-semibold transition-all ${
                        active
                          ? "border-gold bg-gold text-night shadow-[0_0_28px_-8px_rgba(201,162,75,0.9)]"
                          : "border-gold/55 bg-transparent text-gold hover:border-gold hover:bg-gold/10"
                      }`}
                      data-testid={`template-${template.id}`}
                    >
                      {template.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Composer + buttons + AI */}
          <section
            className="flex flex-col rounded-2xl border border-gold/25 bg-white/[0.04] p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl md:p-7"
            data-testid="message-composer-panel"
          >
            <h2 className="font-display text-lg font-semibold text-sand">
              صياغة الرسالة
            </h2>
            <p className="mt-1 text-[0.82rem] text-sand-dim">
              عدّل النص، صقله بنبرة VIP، ثم أضف أزرار تفاعلية.
            </p>

            <div className="relative mt-6 flex min-h-[240px] flex-1 flex-col">
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setActiveTemplate(null);
                }}
                rows={10}
                placeholder="اكتب رسالتك للعميل هنا..."
                className="min-h-[240px] flex-1 resize-y rounded-xl border border-gold/25 bg-[#0B101E]/50 ps-4 pe-4 pb-16 pt-4 text-[1rem] leading-[1.85] text-sand placeholder:text-sand-dim/45 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
                data-testid="message-textarea"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-end px-3">
                <button
                  type="button"
                  onClick={runTonePolisher}
                  disabled={polishing}
                  className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-full border border-gold/60 bg-gold/15 px-4 py-2 text-[0.8rem] font-semibold text-gold shadow-[0_0_32px_-6px_rgba(201,162,75,0.95)] transition-all hover:bg-gold/25 hover:shadow-[0_0_40px_-4px_rgba(201,162,75,1)] disabled:cursor-wait disabled:opacity-70"
                  data-testid="ai-tone-polisher"
                >
                  <SparkleIcon className="h-4 w-4 shrink-0 animate-pulse" />
                  {polishing ? "جاري الصياغة…" : "صياغة بنبرة VIP"}
                </button>
              </div>
            </div>

            {/* Interactive buttons builder */}
            <div
              className="mt-5 rounded-xl border border-gold/20 bg-[#0B101E]/40 p-4"
              data-testid="whatsapp-buttons-builder"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[0.82rem] font-semibold text-sand">
                    أزرار الواتساب التفاعلية{" "}
                    <span className="text-gold-soft">(Max 3)</span>
                  </p>
                  <p className="mt-0.5 text-[0.72rem] text-sand-dim">
                    تُلحق كخيارات رد سريعة داخل نص الرسالة عبر wa.me
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addInteractiveButton}
                  disabled={buttons.length >= MAX_BUTTONS}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-gold/45 bg-gold/10 px-3 py-2 text-[0.78rem] font-semibold text-gold transition-colors hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
                  data-testid="add-whatsapp-btn-action"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Button
                </button>
              </div>

              <div className="mt-4 space-y-2.5" data-testid="whatsapp-buttons-list">
                {buttons.length === 0 ? (
                  <p
                    className="rounded-lg border border-dashed border-gold/20 px-3 py-4 text-center text-[0.78rem] text-sand-dim"
                    data-testid="whatsapp-buttons-empty"
                  >
                    لا أزرار بعد — أضف حتى 3 (مثال: تأكيد الحجز، إلغاء)
                  </p>
                ) : (
                  buttons.map((btn, index) => (
                    <div
                      key={btn.id}
                      className="flex items-center gap-2"
                      data-testid={`whatsapp-btn-row-${index}`}
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/10 font-mono text-[0.72rem] text-gold">
                        {index + 1}
                      </span>
                      <input
                        value={btn.label}
                        onChange={(e) => updateButtonLabel(btn.id, e.target.value)}
                        placeholder="نص الزر…"
                        maxLength={40}
                        className="min-w-0 flex-1 rounded-md border border-gold/25 bg-[#0B101E]/70 ps-3 pe-3 py-2.5 text-[0.88rem] text-sand placeholder:text-sand-dim/45 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/35"
                        data-testid={`whatsapp-btn-input-${index}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeButton(btn.id)}
                        className="shrink-0 cursor-pointer rounded-md border border-[#c9646f]/35 px-2.5 py-2 text-[0.72rem] text-[#e2857f] transition-colors hover:border-[#c9646f]"
                        data-testid={`whatsapp-btn-remove-${index}`}
                        aria-label="حذف الزر"
                      >
                        حذف
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {error ? (
              <p className="mt-4 text-[0.85rem] text-[#e2857f]" data-testid="dispatcher-error">
                {error}
              </p>
            ) : null}
            {flash ? (
              <p className="mt-4 text-[0.85rem] text-[#8fdcc2]" data-testid="dispatcher-flash">
                {flash}
              </p>
            ) : null}

            <button
              type="button"
              onClick={sendNow}
              className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-gold px-6 py-4 text-[1.05rem] font-bold text-night shadow-[0_0_40px_-8px_rgba(201,162,75,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4ae55]"
              data-testid="send-whatsapp-now"
            >
              <SendIcon className="h-5 w-5 shrink-0 rotate-180" />
              إرسال الرسالة الآن
            </button>
          </section>

          {/* VIP Whisperer Panel */}
          <aside className="xl:min-h-[420px]" data-testid="vip-whisperer-column">
            {clientSelected && vipInsight ? (
              <div
                className="h-full rounded-2xl border border-gold/30 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-[0_24px_60px_-40px_rgba(201,162,75,0.45)] backdrop-blur-xl md:p-6"
                data-testid="vip-insights-panel"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
                      لوحة أسرار العميل
                    </p>
                    <h2 className="mt-1 font-display text-lg font-semibold text-sand">
                      The VIP Whisperer
                    </h2>
                  </div>
                  <span
                    className="inline-flex shrink-0 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-1 text-[0.68rem] font-semibold text-gold"
                    data-testid="vip-client-active-badge"
                  >
                    Active
                  </span>
                </div>

                <p className="mt-3 text-[0.9rem] font-semibold text-sand" data-testid="vip-client-display-name">
                  {name.trim() || "ضيف بدون اسم"}
                </p>
                {normalizePhone(phone) ? (
                  <p
                    className="mt-0.5 font-mono text-[0.78rem] text-sand-dim"
                    dir="ltr"
                    data-testid="vip-client-display-phone"
                  >
                    {normalizePhone(phone)}
                  </p>
                ) : null}

                <div className="mt-5 space-y-3">
                  <div
                    className="rounded-xl border border-gold/20 bg-[#0B101E]/45 ps-4 pe-4 py-3"
                    data-testid="vip-tag-vibe"
                  >
                    <p className="text-[0.68rem] tracking-[0.08em] text-gold/80">المزاج العام</p>
                    <p className="mt-1 text-[0.92rem] text-sand">{vipInsight.vibe}</p>
                  </div>

                  <div
                    className="rounded-xl border border-gold/20 bg-[#0B101E]/45 ps-4 pe-4 py-3"
                    data-testid="vip-tag-drink"
                  >
                    <p className="text-[0.68rem] tracking-[0.08em] text-gold/80">المشروب المفضل</p>
                    <p className="mt-1 text-[0.92rem] text-sand">{vipInsight.drink}</p>
                  </div>

                  <div
                    className="rounded-xl border border-gold/20 bg-[#0B101E]/45 ps-4 pe-4 py-3"
                    data-testid="vip-tag-last-booking"
                  >
                    <p className="text-[0.68rem] tracking-[0.08em] text-gold/80">آخر حجز</p>
                    <p className="mt-1 text-[0.92rem] text-sand">{vipInsight.lastBooking}</p>
                  </div>
                </div>

                <p
                  className="mt-5 border-t border-gold/15 pt-4 text-[0.8rem] leading-relaxed text-sand-dim"
                  data-testid="vip-whisper-note"
                >
                  {vipInsight.note}
                </p>
              </div>
            ) : (
              <div
                className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gold/25 bg-white/[0.02] p-6 text-center backdrop-blur-md"
                data-testid="vip-insights-empty"
              >
                <p className="font-display text-base text-sand-dim">لوحة أسرار العميل</p>
                <p className="mt-2 max-w-[220px] text-[0.8rem] leading-relaxed text-sand-dim/80">
                  اكتب اسم العميل أو رقمه لفتح بطاقة الـ VIP Whisperer.
                </p>
              </div>
            )}
          </aside>
        </div>

        <section
          className="mt-8 rounded-2xl border border-gold/20 bg-white/[0.03] p-5 backdrop-blur-md md:p-6"
          data-testid="dispatch-log-section"
        >
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold text-sand">
                سجل الإرسال
              </h2>
              <p className="mt-1 text-[0.8rem] text-sand-dim">
                اضغط صفًا لتحميل ملف العميل في اللوحة
              </p>
            </div>
            {log.length > 0 ? (
              <button
                type="button"
                onClick={() => persist([])}
                className="cursor-pointer text-[0.78rem] text-sand-dim hover:text-[#e2857f]"
                data-testid="clear-dispatch-log"
              >
                مسح السجل
              </button>
            ) : null}
          </div>

          <div className="overflow-x-auto border border-gold/15">
            <table className="w-full min-w-[640px] border-collapse text-[0.88rem]" data-testid="dispatch-log-table">
              <thead>
                <tr className="bg-ink-2/80 text-start text-[0.74rem] tracking-[0.04em] text-sand-dim">
                  <th className="ps-4 pe-4 py-3 font-medium">الاسم</th>
                  <th className="ps-4 pe-4 py-3 font-medium">الرقم</th>
                  <th className="ps-4 pe-4 py-3 font-medium">وقت الإرسال</th>
                  <th className="ps-4 pe-4 py-3 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {log.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-sand-dim">
                      لسه مفيش إرسال. أول رسالة هتظهر هنا.
                    </td>
                  </tr>
                ) : (
                  log.map((row) => (
                    <tr
                      key={row.id}
                      className="cursor-pointer border-t border-gold/10 hover:bg-white/[0.04]"
                      onClick={() => selectFromLog(row)}
                      data-testid={`dispatch-log-row-${row.id}`}
                    >
                      <td className="ps-4 pe-4 py-3 text-sand">{row.name}</td>
                      <td className="ps-4 pe-4 py-3 font-mono text-[0.8rem] text-sand-dim" dir="ltr">
                        {row.phone}
                      </td>
                      <td className="ps-4 pe-4 py-3 whitespace-nowrap text-sand-dim">
                        {formatTime(row.createdAt)}
                      </td>
                      <td className="ps-4 pe-4 py-3">
                        <span
                          className={`inline-block border px-2.5 py-1 text-[0.72rem] font-semibold ${
                            row.status === "sent"
                              ? "border-[#63c2a3]/40 bg-[#63c2a3]/12 text-[#8fdcc2]"
                              : "border-[#c9646f]/40 bg-[#c9646f]/12 text-[#e2857f]"
                          }`}
                        >
                          {row.status === "sent" ? "Sent" : "Failed"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
