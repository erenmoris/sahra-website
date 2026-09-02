type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Scroll-reveal wrapper — CSS-only so it stays a Server Component. */
export default function Reveal({ children, className = "", delay = 0 }: Props) {
  return (
    <div className={`reveal ${className}`} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
