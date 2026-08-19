import { CLIENTS } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function TrustedBy() {
  return (
    <section className="relative z-10 py-14">
      <div className="shell">
        <Reveal>
          <p className="label-mono text-center">
            {"// Trusted by growing practices across the US"}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {CLIENTS.map((name) => (
              <span
                key={name}
                className="font-display text-sm tracking-wide text-fg-tertiary/80 transition-colors duration-300 hover:text-fg md:text-[0.95rem]"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
