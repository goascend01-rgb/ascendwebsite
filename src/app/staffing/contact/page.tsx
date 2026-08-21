import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { StaffingBriefForm } from "@/components/forms/StaffingBriefForm";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { STAFFING_STATUS } from "@/lib/staffing";

export const metadata = pageMetadata({
  title: "Tell us what you need",
  description:
    "Tell us the role, how many people and when. We will tell you on the call exactly who is available for it today, and if there is nobody we will say so and tell you how long it takes.",
  path: "/staffing/contact",
});

export default function StaffingContactPage() {
  const crumbs = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Staffing", path: "/staffing" },
    { name: "Tell us what you need", path: "/staffing/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      <PageHero
        label="// Ascend Staffing"
        title={<>Tell us what you need.</>}
        lead="The role, how many people, and when. Twenty minutes on a call and we will tell you who is on the bench for it, what they cost, and how quickly they can start."
      />

      <section className="pb-24 md:pb-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <div>
              <StaffingBriefForm />
            </div>

            <aside className="lg:pt-2">
              <Reveal delay={0.1}>
                <div className="rounded-lg border border-border-line bg-surface-1 p-7">
                  <h2 className="label-mono">{"// What happens next"}</h2>
                  <p className="mt-6 text-[0.97rem] leading-[1.72] font-light text-fg-secondary">
                    We reply within one business day with a time. On the call we
                    map the role, your software and your workflows, and we tell
                    you who is actually available for it.
                  </p>
                  <p className="mt-4 text-[0.97rem] leading-[1.72] font-light text-fg-secondary">
                    You interview the shortlist and choose. If they are not
                    right, we re-match. You do not pay until you hire.
                  </p>
                </div>
              </Reveal>

              {/* The stage disclosure travels with the ask, not just with the
                  marketing page. It is the thing that makes this honest. */}
              <Reveal delay={0.16}>
                <div className="mt-5 rounded-lg border border-border-line bg-bg p-7">
                  <h2 className="label-mono">{`// ${STAFFING_STATUS.eyebrow}`}</h2>
                  <p className="mt-6 font-display text-[1.05rem] leading-snug font-medium text-fg">
                    {STAFFING_STATUS.title}
                  </p>
                  {STAFFING_STATUS.body.map((para) => (
                    <p
                      key={para}
                      className="mt-4 text-[0.93rem] leading-[1.7] font-light text-fg-tertiary"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <p className="mt-5 px-1 text-[0.9rem] leading-[1.7] font-light text-fg-tertiary">
                  Prefer email? Write to{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
                  >
                    {SITE.email}
                  </a>
                  .
                </p>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
