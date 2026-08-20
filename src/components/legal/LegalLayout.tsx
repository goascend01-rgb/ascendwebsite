import type { ReactNode } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

/* Shared shell for the three legal pages. These are read by a Meta
   reviewer and by a practice's counsel, not by a prospect, so the
   priorities invert: no motion, no atmosphere, maximum scannability.
   Numbered sections, a sticky contents rail, and a measure that stays
   near 68 characters. */

export type LegalSectionMeta = { id: string; heading: string };

export function LegalLayout({
  title,
  intro,
  updated,
  sections,
  children,
  notice,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSectionMeta[];
  children: ReactNode;
  notice?: ReactNode;
}) {
  return (
    <div className="pt-[120px] pb-24">
      <div className="shell">
        <header className="max-w-3xl">
          <Link
            href="/"
            className="label-mono inline-block transition-colors duration-300 hover:text-accent"
          >
            {"// Ascend"}
          </Link>
          <h1 className="display mt-5 text-[clamp(2rem,4.5vw,3.1rem)] text-fg">
            {title}
          </h1>
          <p className="mt-5 text-[1.02rem] leading-[1.65] font-light text-fg-secondary">
            {intro}
          </p>
          <p className="mt-6 font-mono text-[0.7rem] tracking-[0.16em] text-fg-tertiary uppercase">
            Last updated {updated}
          </p>
        </header>

        {notice ? <div className="mt-10 max-w-3xl">{notice}</div> : null}

        <div className="mt-14 grid gap-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Contents" className="lg:sticky lg:top-[100px] lg:self-start">
            <h2 className="label-mono">Contents</h2>
            <ol className="mt-5 space-y-2.5">
              {sections.map((s, i) => (
                <li key={s.id} className="flex gap-3">
                  <span className="mt-[3px] font-mono text-[0.66rem] tabular-nums text-fg-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${s.id}`}
                    className="text-[0.84rem] leading-snug text-fg-tertiary transition-colors duration-300 hover:text-accent"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 max-w-[68ch]">{children}</div>
        </div>

        <footer className="mt-20 border-t border-border-soft pt-8">
          <p className="text-sm text-fg-tertiary">
            Questions about this document go to{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
            >
              {SITE.email}
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}

export function LegalSection({
  id,
  index,
  heading,
  children,
}: {
  id: string;
  index: number;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[100px] border-t border-border-soft py-10 first:border-t-0 first:pt-0">
      <h2 className="flex gap-4 font-display text-[1.3rem] font-medium leading-snug text-fg">
        <span className="mt-[7px] font-mono text-[0.7rem] tabular-nums text-accent">
          {String(index).padStart(2, "0")}
        </span>
        <span>{heading}</span>
      </h2>
      <div className="mt-5 space-y-4 pl-0 sm:pl-[2.15rem]">{children}</div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.95rem] leading-[1.72] font-light text-fg-secondary">
      {children}
    </p>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-3 font-mono text-[0.72rem] tracking-[0.18em] text-fg uppercase">
      {children}
    </h3>
  );
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[0.95rem] leading-[1.7] font-light text-fg-secondary"
        >
          <span
            aria-hidden="true"
            className="mt-[0.62rem] h-px w-3 shrink-0 bg-border-strong"
          />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-border-line bg-surface-1 p-5">
      <div className="text-[0.9rem] leading-[1.7] font-light text-fg-secondary">
        {children}
      </div>
    </div>
  );
}

export function SubprocessorTable({
  rows,
}: {
  rows: { name: string; purpose: string; processesPatientData: boolean }[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-line">
      <table className="w-full min-w-[460px] border-collapse text-left">
        <thead>
          <tr className="bg-surface-1">
            <th className="px-4 py-3 font-mono text-[0.64rem] tracking-[0.14em] text-fg-tertiary uppercase">
              Subprocessor
            </th>
            <th className="px-4 py-3 font-mono text-[0.64rem] tracking-[0.14em] text-fg-tertiary uppercase">
              Purpose
            </th>
            <th className="px-4 py-3 font-mono text-[0.64rem] tracking-[0.14em] text-fg-tertiary uppercase">
              Patient data
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-border-soft">
              <td className="px-4 py-3 text-[0.88rem] text-fg">{r.name}</td>
              <td className="px-4 py-3 text-[0.88rem] font-light text-fg-secondary">
                {r.purpose}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`font-mono text-[0.66rem] tracking-[0.12em] uppercase ${
                    r.processesPatientData ? "text-accent" : "text-fg-muted"
                  }`}
                >
                  {r.processesPatientData ? "Yes" : "No"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
