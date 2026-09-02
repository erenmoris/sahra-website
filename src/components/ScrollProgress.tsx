/** Thin gold bar across the top — CSS scroll-driven, no client JS. */
export default function ScrollProgress() {
  return (
    <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div className="scroll-progress-bar h-full bg-gradient-to-r from-gold via-gold-soft to-gold shadow-[0_0_12px_rgba(228,200,120,0.8)]" />
    </div>
  );
}
