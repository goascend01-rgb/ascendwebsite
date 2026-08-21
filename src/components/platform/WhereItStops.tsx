import { Reveal } from "@/components/ui/Reveal";

/* The block no competitor's site carries, which is exactly why it is here.
   Extracted because it now appears beside every capability on the platform
   page, and a limit that is formatted differently each time reads as an
   afterthought rather than as policy. */
export function WhereItStops({
  children,
  delay = 0.15,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="mt-10 flex flex-col gap-4 rounded-lg border border-border-line bg-surface-1 p-6 sm:flex-row sm:gap-6">
        <span className="w-fit shrink-0 rounded-sm border border-border-strong px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.18em] text-fg-muted uppercase">
          Where it stops
        </span>
        <p className="max-w-[58ch] text-[0.97rem] leading-[1.7] font-light text-fg-secondary">
          {children}
        </p>
      </div>
    </Reveal>
  );
}
