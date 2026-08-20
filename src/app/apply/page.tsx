import type { Metadata } from "next";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Apply as talent",
  description:
    "Join the Ascend bench of remote professionals. Full-time remote roles in reception, billing and insurance, coding and scribing, working with independent practices in the United States.",
  alternates: { canonical: "/apply" },
};

const PERKS = [
  { title: "Fully remote", desc: "Work from home, full-time, with US practices." },
  { title: "Real growth", desc: "Training, mentorship and a path to senior roles." },
  { title: "Paid well", desc: "Competitive pay benchmarked to your skills." },
  { title: "Backed daily", desc: "A success manager and quality review behind you." },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        label="// Apply as talent"
        title={
          <>
            Build a career,{" "}
            <span className="text-fg-muted">from anywhere.</span>
          </>
        }
        lead="We place trained professionals into full-time remote roles with independent practices in the United States, whether that is a dental practice, an esthetic clinic, a medspa or another appointment-based practice. If you are sharp, reliable and good with people, we want to meet you."
      />

      <section className="pb-12">
        <div className="shell">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border-line bg-border-soft md:grid-cols-4">
              {PERKS.map((p) => (
                <div key={p.title} className="bg-surface-1 px-6 py-6">
                  <div className="font-display font-medium text-fg">{p.title}</div>
                  <div className="mt-2 text-sm font-light text-fg-secondary">
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-28">
        <div className="shell">
          <Reveal delay={0.12}>
            <div className="max-w-3xl">
              <ApplyForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
