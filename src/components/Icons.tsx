type IconProps = { className?: string };

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.14-1.35a10 10 0 0 0 4.9 1.25h.01c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.15h-.01a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-3.05.8.82-2.98-.2-.3a8.14 8.14 0 0 1-1.26-4.35c0-4.5 3.66-8.15 8.16-8.15 2.18 0 4.22.85 5.76 2.39a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.67 8.14-8.16 8.14zm4.47-6.1c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.5.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

const strokeProps = {
  stroke: "#C9A24B",
  strokeWidth: 1.3,
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function TrustIcon({ name, className = "h-9 w-9" }: IconProps & { name: string }) {
  if (name === "shield") {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
        <path d="M20 4 L33 10 V19 C33 27 27 33 20 36 C13 33 7 27 7 19 V10 Z" {...strokeProps} />
        <path d="M14 20l4 4 8-9" {...strokeProps} />
      </svg>
    );
  }

  if (name === "user") {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
        <circle cx="20" cy="14" r="6" {...strokeProps} />
        <path d="M8 33c1-8 8-12 12-12s11 4 12 12" {...strokeProps} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M6 20h28M6 20l6-6M6 20l6 6M34 20l-6-6M34 20l-6 6" {...strokeProps} />
    </svg>
  );
}

const venueIcons = [
  <>
    <path key="a" d="M10 8h20l-10 13v11" {...strokeProps} />
    <path key="b" d="M14 33h12" {...strokeProps} />
    <circle key="c" cx="27" cy="12" r="1.6" fill="#C9A24B" />
  </>,
  <>
    <path key="a" d="M6 26 L34 26 L30 33 L10 33 Z" {...strokeProps} />
    <path key="b" d="M20 26 V8 M20 8 L28 12 L20 16" {...strokeProps} />
    <path key="c" d="M5 22c3 3 6-3 9 0s6-3 9 0 6-3 9 0" {...strokeProps} strokeWidth={1} />
  </>,
  <>
    <path key="a" d="M20 6c4 6 4 10 0 14-4-4-4-8 0-14z" {...strokeProps} />
    <path key="b" d="M20 20 V34 M20 24 C14 24 12 20 12 20 M20 27 C26 27 28 22 28 22" {...strokeProps} />
    <path key="c" d="M5 34c3-3 6 3 9 0s6 3 9 0 6-3 9 0 6 3 9 0" {...strokeProps} strokeWidth={1} />
  </>,
  <>
    <path key="a" d="M15 6 L15 22 C15 26 25 26 25 22 L25 6" {...strokeProps} />
    <rect key="b" x="13" y="4" width="14" height="4" {...strokeProps} />
    <path key="c" d="M12 34 C12 28 28 28 28 34" {...strokeProps} />
  </>,
  <>
    <rect key="a" x="9" y="7" width="22" height="26" rx="1" {...strokeProps} />
    <path key="b" d="M14 14h12M14 20h12M14 26h7" {...strokeProps} />
  </>,
  <>
    <circle key="a" cx="20" cy="20" r="13" {...strokeProps} />
    <path key="b" d="M20 12v8l6 4" {...strokeProps} />
  </>,
];

export function VenueIcon({ index, className = "h-9 w-9" }: IconProps & { index: number }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {venueIcons[index % venueIcons.length]}
    </svg>
  );
}
