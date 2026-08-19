import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "quiet";

const base =
  "inline-flex items-center justify-center gap-2 font-mono text-[0.8rem] tracking-[0.04em] rounded-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const sizes = {
  md: "px-6 py-3.5",
  sm: "px-4 py-2.5 text-[0.72rem]",
  lg: "px-7 py-4",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent font-bold hover:bg-accent-bright hover:-translate-y-0.5 shadow-[0_0_0_0_var(--accent-glow)] hover:shadow-[0_8px_30px_-6px_var(--accent-glow)]",
  ghost:
    "border border-border-strong text-fg hover:border-accent hover:text-accent hover:bg-accent-dim",
  quiet:
    "text-fg-secondary hover:text-fg",
};

type CommonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
