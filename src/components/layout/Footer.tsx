import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/site";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Staffing",
    links: [
      { label: "Front Desk & Reception", href: "/roles/reception" },
      { label: "Billing & Insurance", href: "/roles/billing" },
      { label: "Coding & Scribes", href: "/roles/coding" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "AI Platform",
    links: [
      { label: "Voice Receptionist", href: "/platform#voice" },
      { label: "AI Chat & Chatbots", href: "/platform#chat" },
      { label: "Appointment Booking", href: "/platform#booking" },
      { label: "Growth CRM", href: "/platform#crm" },
      { label: "Review System", href: "/platform#reviews" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Book a demo", href: "/contact" },
      { label: "Apply as talent", href: "/apply" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 mt-32 border-t border-border-line bg-surface-1/40">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-secondary font-light">
              Pre-trained remote healthcare talent and practice automation —
              so you can grow without the hiring.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-block font-mono text-xs tracking-wider text-fg-tertiary transition-colors hover:text-accent"
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
                      className="text-sm text-fg-secondary transition-colors duration-300 hover:text-fg"
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
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono tracking-wider">HIPAA &amp; GDPR COMPLIANT</span>
            <Link href="/contact" className="transition-colors hover:text-fg">
              Privacy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-fg">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
