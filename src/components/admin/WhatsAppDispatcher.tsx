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

const STORAGE_KEY = "sahra:whatsapp-dispatcher-log";
const MAX_LOG = 25;

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

export default function WhatsAppDispatcher({ username }: { username: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [log, setLog] = useState<DispatchLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

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

  const ready = useMemo(() => true, []);

  function applyTemplate(id: string) {
    const template = TEMPLATES.find((item) => item.id === id);
    if (!template) return;
    setActiveTemplate(id);
    setMessage(template.body(name.trim()));
    setError(null);
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
    const trimmedMessage = message.trim();

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

    if (!trimmedMessage) {
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
    <div dir="rtl" className="min-h-screen bg-[#0B101E]">
      <header className="sticky top-0 z-30 border-b border-gold/20 bg-[#0B101E]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <div className="font-display text-xl font-bold text-sand">
              مركز إرسال الواتساب{" "}
              <span className="text-gold-soft">VIP</span>
            </div>
            <p className="mt-1 flex items-center gap-2 text-[0.8rem] text-sand-dim">
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  ready ? "bg-[#63c2a3]" : "bg-[#c9646f]"
                }`}
              >
                {ready ? (
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#63c2a3]/70" />
                ) : null}
              </span>
              {ready ? "متصل — Ready to send" : "غير متصل"}
              <span className="text-sand-dim/70">· مسجّل: {username}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
            >
              الحجوزات
            </Link>
            <Link
              href="/admin/content"
              className="border border-gold/25 px-3 py-2 text-[0.78rem] text-sand-dim transition-colors hover:border-gold hover:text-gold-soft"
            >
              المحتوى
            </Link>
            <button
              type="button"
              onClick={logout}
              className="cursor-pointer border border-[#c9646f]/40 px-3 py-2 text-[0.78rem] text-[#e2857f] transition-colors hover:border-[#c9646f]"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Right in RTL = first column: recipient & templates */}
          <section className="rounded-2xl border border-gold/25 bg-white/[0.04] p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl md:p-7">
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
                  className="w-full rounded-md border border-gold/25 bg-[#0B101E]/55 px-4 py-3 text-[0.95rem] text-sand placeholder:text-sand-dim/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
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
                  className="w-full rounded-md border border-gold/25 bg-[#0B101E]/55 px-4 py-3 text-left font-mono text-[0.95rem] text-sand placeholder:text-sand-dim/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
                />
              </label>
            </div>

            <div className="mt-7">
              <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.14em] text-gold uppercase">
                قوالب سريعة
              </p>
              <div className="flex flex-wrap gap-2.5">
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
                    >
                      {template.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Message composer */}
          <section className="flex flex-col rounded-2xl border border-gold/25 bg-white/[0.04] p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl md:p-7">
            <h2 className="font-display text-lg font-semibold text-sand">
              صياغة الرسالة
            </h2>
            <p className="mt-1 text-[0.82rem] text-sand-dim">
              عدّل النص بحرية قبل ما تفتح واتساب.
            </p>

            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setActiveTemplate(null);
              }}
              rows={12}
              placeholder="اكتب رسالتك للعميل هنا..."
              className="mt-6 min-h-[280px] flex-1 resize-y rounded-xl border border-gold/25 bg-[#0B101E]/50 px-4 py-4 text-[1rem] leading-[1.85] text-sand placeholder:text-sand-dim/45 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/35"
            />

            {error ? (
              <p className="mt-4 text-[0.85rem] text-[#e2857f]">{error}</p>
            ) : null}
            {flash ? (
              <p className="mt-4 text-[0.85rem] text-[#8fdcc2]">{flash}</p>
            ) : null}

            <button
              type="button"
              onClick={sendNow}
              className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-gold px-6 py-4 text-[1.05rem] font-bold text-night shadow-[0_0_40px_-8px_rgba(201,162,75,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4ae55]"
            >
              <SendIcon className="h-5 w-5 shrink-0 rotate-180" />
              إرسال الرسالة الآن
            </button>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-gold/20 bg-white/[0.03] p-5 backdrop-blur-md md:p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold text-sand">
                سجل الإرسال
              </h2>
              <p className="mt-1 text-[0.8rem] text-sand-dim">
                آخر الرسائل اللي اتفتح لها واتساب من اللوحة
              </p>
            </div>
            {log.length > 0 ? (
              <button
                type="button"
                onClick={() => persist([])}
                className="cursor-pointer text-[0.78rem] text-sand-dim hover:text-[#e2857f]"
              >
                مسح السجل
              </button>
            ) : null}
          </div>

          <div className="overflow-x-auto border border-gold/15">
            <table className="w-full min-w-[640px] border-collapse text-[0.88rem]">
              <thead>
                <tr className="bg-ink-2/80 text-right text-[0.74rem] tracking-[0.04em] text-sand-dim">
                  <th className="px-4 py-3 font-medium">الاسم</th>
                  <th className="px-4 py-3 font-medium">الرقم</th>
                  <th className="px-4 py-3 font-medium">وقت الإرسال</th>
                  <th className="px-4 py-3 font-medium">الحالة</th>
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
                    <tr key={row.id} className="border-t border-gold/10 hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-sand">{row.name}</td>
                      <td className="px-4 py-3 font-mono text-[0.8rem] text-sand-dim" dir="ltr">
                        {row.phone}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sand-dim">
                        {formatTime(row.createdAt)}
                      </td>
                      <td className="px-4 py-3">
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
