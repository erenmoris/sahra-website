"use client";

type Props = {
  href: string;
  placement: string;
  locale: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

function track(placement: string, locale: string) {
  const payload = JSON.stringify({
    placement,
    locale,
    page: window.location.pathname + window.location.hash,
  });

  // sendBeacon survives the tab switching to WhatsApp or Snapchat; fetch is the fallback.
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/whatsapp-click", payload);
    return;
  }

  void fetch("/api/whatsapp-click", { method: "POST", body: payload, keepalive: true }).catch(
    () => undefined,
  );
}

/** External contact link (WhatsApp, Snapchat) that records the tap before leaving. */
export default function TrackedLink({
  href,
  placement,
  locale,
  className,
  ariaLabel,
  children,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={() => track(placement, locale)}
    >
      {children}
    </a>
  );
}
