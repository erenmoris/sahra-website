export default function ConfidentialitySeal({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div
      data-testid="privacy-seal"
      className="lux-panel mx-auto flex max-w-xl flex-col items-center rounded-[1.35rem] border border-gold/35 bg-ink-2/90 px-8 py-10 text-center shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-md"
    >
      <svg
        width="88"
        height="88"
        viewBox="0 0 88 88"
        fill="none"
        aria-hidden
        className="mb-5"
      >
        <circle cx="44" cy="44" r="42" stroke="#c9a24b" strokeWidth="1.5" opacity="0.45" />
        <circle cx="44" cy="44" r="34" stroke="#c9a24b" strokeWidth="1.25" />
        <path
          d="M44 22l14 6v12c0 10-6.2 16.5-14 19-7.8-2.5-14-9-14-19V28l14-6z"
          stroke="#e4c878"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M36.5 44.5l5 5 10-11"
          stroke="#c9a24b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="font-display text-[1.35rem] font-bold text-gold">{title}</p>
      <p className="mt-3 max-w-[36ch] text-[0.95rem] leading-[1.8] text-sand-dim">{body}</p>
    </div>
  );
}
