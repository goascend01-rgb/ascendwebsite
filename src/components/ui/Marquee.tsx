/* Infinite horizontal marquee with edge fades. Pauses on hover.
   Duplicates children once and scrolls -50% for a seamless loop. */
export function Marquee({
  items,
  fadeFrom = "var(--surface-1)",
}: {
  items: string[];
  fadeFrom?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div className="flex w-max gap-3 animate-marquee group-hover:[animation-play-state:paused]">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 rounded-full border border-border-line bg-surface-2/40 px-4 py-2 font-mono text-xs tracking-wide text-fg-secondary transition-colors duration-300 hover:border-accent hover:text-fg"
          >
            {name}
          </span>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20"
        style={{ background: `linear-gradient(to right, ${fadeFrom}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20"
        style={{ background: `linear-gradient(to left, ${fadeFrom}, transparent)` }}
      />
    </div>
  );
}
