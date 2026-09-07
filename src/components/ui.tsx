import Link from "next/link";

export function Wrap({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1180px] px-6 sm:px-7 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-[0.82rem] font-semibold tracking-[0.04em] text-gold-soft">
      <span className="inline-block h-1 w-6 rounded-[1px] bg-gold" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  children,
  lede,
}: {
  eyebrow: string;
  children: React.ReactNode;
  lede?: string;
}) {
  return (
    <div className="mb-12 max-w-[640px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.3] font-semibold text-sand">
        {children}
      </h2>
      <span className="grow-line mt-3 block h-1 w-14 rounded-[1px] bg-gold" />
      {lede ? <p className="mt-4 text-[1.02rem] leading-[1.75] text-sand-dim">{lede}</p> : null}
    </div>
  );
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-gold-soft">{children}</span>;
}

export function Divider() {
  return <div className="h-px bg-line" />;
}

/* Tractie structure + Sahra gold: clear primary/secondary, premium hover. */
const buttonBase =
  "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border px-7 py-3.5 text-[0.9rem] font-bold tracking-[0.01em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "border border-[#e4c878]/40 bg-gold text-night shadow-[0_10px_28px_-12px_rgba(201,162,75,0.95)] hover:scale-[1.03] hover:bg-[#d4ae55] active:scale-[0.99]",
  ghost:
    "btn-outline border-2 border-gold/55 bg-transparent text-sand hover:border-gold hover:bg-gold/10 hover:text-gold",
  whatsapp: "border-transparent bg-[#1d7a52] text-white hover:bg-[#22935f]",
  snapchat: "border-transparent bg-[#f5f000] text-night hover:bg-[#fffc00]",
} as const;

type Variant = keyof typeof variants;

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${buttonBase} ${variants[variant]} ${className}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  external,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass(variant, className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
