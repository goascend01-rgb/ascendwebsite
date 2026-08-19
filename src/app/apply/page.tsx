import type { Metadata } from "next";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Apply as talent",
  description:
    "Join Ascend's bench of remote healthcare professionals. Full-time remote roles in reception, billing, insurance, coding and scribing for US dental and medical practices.",
};

const PERKS = [
  { title: "Fully remote", desc: "Work from home, full-time, with US practices." },
  { title: "Real growth", desc: "Training, mentorship and a path to senior roles." },
  { title: "Paid well", desc: "Competitive pay benchmarked to your skills." },
  { title: "Backed daily", desc: "A success team and QA that has your back." },
];

export default function ApplyPage() {
  return (
    <div className="pt-36 md:pt-44">
      <section className="shell">
        <Reveal>
          <span className="label-mono text-accent">{"// Apply as talent"}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display mt-5 max-w-4xl text-[clamp(2.4rem,5.5vw,4.2rem)] text-fg">
            Build a career,{" "}
            <span className="text-fg-muted font-light">from anywhere.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-fg-secondary font-light">
            We place healthcare-trained professionals into full-time remote roles
            with growing US dental and medical practices. If you&apos;re sharp,
            reliable and great with people, we want to meet you.
          </p>
        </Reveal>
      </section>

      <section className="shell mt-12">
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft md:grid-cols-4">
            {PERKS.map((p) => (
              <div key={p.title} className="bg-surface-1 px-6 py-6">
                <div className="font-display font-medium text-fg">{p.title}</div>
                <div className="mt-2 text-sm text-fg-secondary font-light">
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="shell mt-12">
        <Reveal delay={0.12}>
          <ApplyForm />
        </Reveal>
      </section>

      <div className="h-20" />
    </div>
  );
}
