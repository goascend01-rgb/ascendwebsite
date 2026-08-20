import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/site";
import { ROLES } from "@/lib/staffing";

/* No phone number until a real one exists, and no compliance badge. HIPAA
   posture is described as architecture on /security, because no HIPAA
   certification exists to badge. */
const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "What it does", href: "/platform" },
      { label: "The Network", href: "/network" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Staffing",
    links: [
      { label: "Overview", href: "/staffing" },
      ...ROLES.map((r) => ({
        label: r.name,
        href: `/staffing/roles/${r.slug}`,
      })),
      { label: "Apply as talent", href: "/apply" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Book the call", href: "/contact" },
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms of service", href: "/legal/terms" },
      { label: "Delete your data", href: "/legal/data-deletion" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-24 border-t border-border-line bg-surface-1/40">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed font-light text-fg-secondary">
              An operator for independent practices. It answers, it refills the
              chair, it brings patients back, and it shows you its reasoning
              first.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-block font-mono text-xs tracking-wider text-fg-tertiary transition-colors duration-300 hover:text-accent"
            >
              {SITE.email}
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label-mono">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label + l.href}>
                    <Link
                      href={l.href}
                      className="text-sm font-light text-fg-secondary transition-colors duration-300 hover:text-fg"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border-soft pt-8 text-xs text-fg-tertiary sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-[0.14em] text-fg-muted uppercase">
            Built for HIPAA · Assisted by default
          </p>
        </div>
      </div>
    </footer>
  );
}
