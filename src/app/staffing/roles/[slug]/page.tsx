import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbLd } from "@/lib/seo";
import {
  ROLES,
  STAFFING_PROCESS,
  STAFFING_FOOTNOTE,
  STAFFING_STATUS,
} from "@/lib/staffing";
import { usd } from "@/lib/leak";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) return {};
  return {
    title: `${role.name}, remote staffing`,
    description: `${role.tagline} ${role.blurb}`,
    alternates: { canonical: `/staffing/roles/${role.slug}` },
  };
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) notFound();

  const savings = role.inHouse - role.price;
  const savingsPct = Math.round((savings / role.inHouse) * 100);
  const others = ROLES.filter((r) => r.slug !== role.slug);

  const breadcrumbs = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Staffing", path: "/staffing" },
    { name: role.name, path: `/staffing/roles/${role.slug}` },
  ]);

  return (
    <article className="pt-[128px] md:pt-[164px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="shell">
        <Reveal>
          <Link
            href="/staffing"
            className="label-mono inline-flex items-center gap-2 transition-colors duration-300 hover:text-accent"
          >
            ← All roles
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
          <div>
            <Reveal>
              <span className="label-mono text-accent">
                {`// ${role.index} · Staffing`}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display mt-5 text-[clamp(2.2rem,5.2vw,3.7rem)] text-fg">
                {role.name}
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 font-display text-[1.15rem] font-medium text-accent">
                {role.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[56ch] text-[1.02rem] leading-[1.72] font-light text-fg-secondary">
                {role.blurb}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/staffing/contact" variant="primary" size="lg">
                  Tell us what you need <span aria-hidden="true">→</span>
                </ButtonLink>
                <ButtonLink href="/staffing" variant="ghost" size="lg">
                  Other roles
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* cost panel */}
          <Reveal delay={0.2}>
            <aside className="rounded-lg border border-border-line bg-surface-1 p-7 md:p-8">
              <h2 className="label-mono">{"// What it costs"}</h2>

              <p className="mt-7 flex items-baseline gap-2">
                <span className="font-display text-[2.6rem] leading-none font-semibold tabular-nums text-accent">
                  {usd(role.price)}
                </span>
                <span className="font-mono text-[0.7rem] tracking-[0.12em] text-fg-tertiary uppercase">
                  / month
                </span>
              </p>

              <dl className="mt-8 space-y-px overflow-hidden rounded-md border border-border-soft bg-border-soft">
                <div className="flex items-baseline justify-between gap-4 bg-bg px-4 py-3.5">
                  <dt className="text-[0.93rem] font-light text-fg-secondary">
                    Typical US in-house cost
                  </dt>
                  <dd className="font-mono text-[0.85rem] tabular-nums text-fg-tertiary">
                    {usd(role.inHouse)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 bg-bg px-4 py-3.5">
                  <dt className="text-[0.93rem] font-light text-fg-secondary">
                    Difference
                  </dt>
                  <dd className="font-mono text-[0.85rem] tabular-nums text-fg">
                    {usd(savings)}
                    <span className="ml-2 text-fg-muted">({savingsPct}%)</span>
                  </dd>
                </div>
              </dl>

              <p className="mt-6 text-[0.82rem] leading-[1.65] font-light text-fg-tertiary">
                {STAFFING_FOOTNOTE}
              </p>

              <p className="mt-6 border-t border-border-soft pt-5 font-mono text-[0.66rem] leading-relaxed tracking-[0.12em] text-fg-muted uppercase">
                {role.stack}
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* responsibilities */}
      <section className="border-t border-border-soft mt-20 py-20 md:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <SectionHeader
              label="// The work"
              title={<>What they do, every day.</>}
            />
            <RevealGroup className="space-y-px overflow-hidden rounded-lg border border-border-line bg-border-soft">
              {role.responsibilities.map((item) => (
                <RevealItem key={item}>
                  <div className="flex gap-4 bg-surface-1 px-6 py-4.5 transition-colors duration-500 hover:bg-surface-2">
                    <span
                      aria-hidden="true"
                      className="mt-[0.72rem] h-px w-3 shrink-0 bg-accent"
                    />
                    <p className="py-1 text-[1rem] leading-[1.65] font-light text-fg-secondary">
                      {item}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* process */}
      <section className="py-20 md:py-24">
        <div className="shell">
          <SectionHeader
            label="// How it works"
            title={<>Hired and working in a week, not a quarter.</>}
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border-line bg-border-soft md:grid-cols-4">
            {STAFFING_PROCESS.map((step) => (
              <RevealItem key={step.day} className="h-full">
                <div className="flex h-full flex-col bg-surface-1 p-6">
                  <span className="font-mono text-[0.66rem] tracking-[0.16em] text-accent uppercase">
                    {step.day}
                  </span>
                  <h3 className="mt-5 font-display text-[1.02rem] leading-snug font-medium text-fg">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.94rem] leading-[1.68] font-light text-fg-secondary">
                    {step.desc}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* The stage disclosure. A role page that carries the full promise
          without it is the one place this site would read as overselling. */}
      <section className="border-t border-border-soft py-16 md:py-20">
        <div className="shell">
          <div className="max-w-[68ch] rounded-lg border border-border-line bg-surface-1 p-7 md:p-8">
            <h2 className="label-mono">{`// ${STAFFING_STATUS.eyebrow}`}</h2>
            <p className="mt-6 font-display text-[1.2rem] leading-snug font-medium text-fg">
              {STAFFING_STATUS.title}
            </p>
            {STAFFING_STATUS.body.map((para) => (
              <p
                key={para}
                className="mt-4 text-[0.97rem] leading-[1.72] font-light text-fg-secondary"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* other roles */}
      <section className="border-t border-border-soft py-20 md:py-24">
        <div className="shell">
          <h2 className="label-mono">{"// Other roles"}</h2>
          <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2">
            {others.map((other) => (
              <RevealItem key={other.slug}>
                <Link
                  href={`/staffing/roles/${other.slug}`}
                  className="group flex items-center justify-between gap-6 rounded-lg border border-border-line bg-surface-1 p-6 transition-colors duration-500 hover:border-border-strong hover:bg-surface-2"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.05rem] font-medium text-fg">
                      {other.name}
                    </h3>
                    <p className="mt-1.5 text-[0.93rem] font-light text-fg-secondary">
                      {other.tagline}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-accent transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </article>
  );
}
