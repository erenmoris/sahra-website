import Link from "next/link";

export function Wrap({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1180px] px-7 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[0.82rem] tracking-[0.06em] text-gold-soft">
      <span className="inline-block h-px w-7 bg-gold" />
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
    <div className="mb-14 max-w-[640px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.3] font-semibold text-sand">
        {children}
      </h2>
      {lede ? <p className="mt-4 text-[1.02rem] leading-[1.8] text-sand-dim">{lede}</p> : null}
    </div>
  );
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-gold-soft">{children}</span>;
}

export function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />;
}

const buttonBase =
  "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-sm border px-7 py-4 text-[0.9rem] font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "border-transparent bg-gold font-bold text-ink hover:-translate-y-px hover:bg-gold-soft",
  ghost: "border-gold/25 text-sand hover:border-gold hover:text-gold-soft",
  whatsapp: "border-transparent bg-[#1d7a52] font-bold text-white hover:bg-[#22935f]",
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
