import { PLATFORM_MODULES } from "@/lib/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* The whole thing, on one screen.

   Every other section on this page argues. This one just lists, because at
   some point a buyer comparing three products wants the inventory without
   the prose, and making them infer it from six narrative sections is a way
   of losing to a competitor with a worse product and a better table. */
export function ModuleInventory() {
  const total = PLATFORM_MODULES.reduce((n, g) => n + g.items.length, 0);

  return (
    <section
      id="everything"
      className="scroll-mt-[100px] border-t border-border-line py-20 md:py-24"
    >
      <SectionHeader
        label="// Everything, without the argument"
        title={<>The whole inventory, on one screen.</>}
        lead={`${total} capabilities across ${PLATFORM_MODULES.length} areas. Every line is shipped and running today. Anything on the roadmap is deliberately absent from this list.`}
      />

      <RevealGroup className="mt-16 space-y-px overflow-hidden rounded-lg border border-border-line bg-border-soft">
        {PLATFORM_MODULES.map((group) => (
          <RevealItem key={group.group}>
            <div className="grid gap-6 bg-surface-1 p-7 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
              <h3 className="font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase md:pt-1">
                {group.group}
              </h3>

              <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <p className="text-[0.98rem] leading-snug font-medium text-fg">
                      {item.name}
                    </p>
                    <p className="mt-1.5 text-[0.93rem] leading-[1.65] font-light text-fg-tertiary">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-[66ch] text-[0.95rem] leading-[1.72] font-light text-fg-tertiary">
          Ascend does not answer your phone, does not sync with your practice
          management software, and does not pull your reviews in from Google.
          Those are the three most common things a practice asks for that this
          list does not contain, so they are named here rather than left to be
          discovered on a call.
        </p>
      </Reveal>
    </section>
  );
}
