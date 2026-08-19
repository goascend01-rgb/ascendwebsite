import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROLES } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

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
    title: `${role.name} — Remote Staffing`,
    description: `${role.tagline} ${role.blurb}`,
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

  return (
    <article className="pt-36 md:pt-44">
      {/* hero */}
      <section className="shell">
        <Reveal>
          <Link
            href="/#staffing"
            className="label-mono inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            ← All roles
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <Reveal>
              <span className="label-mono text-accent">
                {`// ${role.index} · Staffing`}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display mt-5 text-[clamp(2.4rem,5.5vw,4rem)] text-fg">
                {role.name}
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 text-lg font-medium text-accent">
                {role.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-fg-secondary font-light">
                {role.blurb}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-9 flex flex-wrap gap-4">
                <ButtonLink href="/contact" variant="primary" size="lg">
                  Hire {role.short.toLowerCase()} →
                </ButtonLink>
                <ButtonLink href="/pricing" variant="ghost" size="lg">
                  See pricing
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* pricing card */}
          <Reveal delay={0.2}>
            <div className="rounded-xl border border-border-line bg-surface-1 p-8">
              <div className="label-mono">{"// Monthly cost"}</div>
              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-5xl font-semibold text-fg">
                  ${role.price.toLocaleString()}
                </span>
                <span className="pb-2 text-sm text-fg-tertiary">/ month</span>
              </div>
              <div className="mt-2 font-mono text-xs tracking-wider text-fg-muted uppercase line-through">
                ${role.inHouse.toLocaleString()} / mo in-house
              </div>

              <div className="mt-6 rounded-lg bg-accent-dim px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-fg">You save</span>
                  <span className="font-display font-semibold text-accent">
                    ${savings.toLocaleString()}/mo · {savingsPct}%
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-border-soft p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-semibold text-accent">
                    {role.metric.value}
                  </span>
                  <span className="text-right font-mono text-[0.62rem] tracking-wider text-fg-tertiary uppercase">
                    {role.metric.label}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-center font-mono text-[0.66rem] tracking-wider text-fg-muted uppercase">
                No upfront cost · Pay only after you hire
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* responsibilities */}
      <section className="shell mt-28">
        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,3.5vw,2.6rem)] text-fg">
              What they{" "}
              <span className="text-fg-muted font-light">handle.</span>
            </h2>
          </Reveal>
          <RevealGroup className="space-y-px overflow-hidden rounded-xl border border-border-line">
            {role.responsibilities.map((r, i) => (
              <RevealItem key={r}>
                <div className="flex items-center gap-5 bg-surface-1 px-6 py-5">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-fg">{r}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* tools */}
      <section className="shell mt-20">
        <Reveal>
          <div className="rounded-xl border border-border-line bg-surface-1/40 p-8">
            <div className="label-mono">{"// Already fluent in your software"}</div>
            <div className="mt-6 flex flex-wrap gap-3">
              {role.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border-line bg-surface-2/50 px-4 py-2 font-mono text-xs tracking-wide text-fg-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* other roles */}
      <section className="shell mt-28">
        <Reveal>
          <div className="label-mono">{"// Explore other roles"}</div>
        </Reveal>
        <RevealGroup className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border-line bg-border-soft md:grid-cols-2">
          {others.map((o) => (
            <RevealItem key={o.slug}>
              <Link
                href={`/roles/${o.slug}`}
                className="group flex items-center justify-between bg-surface-1 p-7 transition-colors duration-300 hover:bg-surface-2"
              >
                <div>
                  <div className="font-display text-lg font-medium text-fg">
                    {o.name}
                  </div>
                  <div className="mt-1 text-sm text-fg-secondary">
                    {o.tagline}
                  </div>
                </div>
                <span className="font-mono text-accent transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* cta */}
      <section className="shell mt-28">
        <Reveal>
          <div className="rounded-2xl border border-border-line bg-surface-1 px-8 py-16 text-center">
            <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)] text-fg">
              Ready for a {role.short.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-fg-secondary font-light">
              Tell us your setup and we&apos;ll have a shortlist in front of you
              within three days.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Book a demo →
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
