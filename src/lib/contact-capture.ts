/** Persist name + phone for click-tracking so returning visitors skip the modal. */

export const CONTACT_CAPTURE_STORAGE_KEY = "sahra:contact-capture";

export type ContactCapture = {
  name: string;
  phone: string;
};

export function loadContactCapture(): ContactCapture | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONTACT_CAPTURE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ContactCapture>;
    const name = typeof parsed.name === "string" ? parsed.name.trim() : "";
    const phone = typeof parsed.phone === "string" ? parsed.phone.trim() : "";
    if (!name || !phone) return null;
    return { name, phone };
  } catch {
    return null;
  }
}

export function saveContactCapture(data: ContactCapture): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    CONTACT_CAPTURE_STORAGE_KEY,
    JSON.stringify({ name: data.name.trim(), phone: data.phone.trim() }),
  );
}

export function normalizePhone(value: string): string {
  return value.replace(/[^\d]/g, "").slice(0, 15);
}
