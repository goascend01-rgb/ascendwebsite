"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="label-mono mb-2.5 block">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-fg-tertiary">{hint}</span>}
    </label>
  );
}

const fieldBase =
  "w-full rounded-md border border-control-border bg-control px-4 py-3 text-fg placeholder:text-fg-muted transition-colors duration-200 focus:border-accent focus:outline-none";

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} className={`${fieldBase} ${props.className ?? ""}`} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={`${fieldBase} resize-none ${props.className ?? ""}`}
    />
  );
}

/* Custom select — native <select> can't be styled to match. */
export function Select({
  options,
  value,
  onChange,
  placeholder = "Select…",
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${fieldBase} flex items-center justify-between text-left ${
          open ? "border-accent" : ""
        }`}
      >
        <span className={value ? "text-fg" : "text-fg-muted"}>
          {value || placeholder}
        </span>
        <span
          className={`text-fg-tertiary transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border-line bg-surface-3 p-1 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full rounded px-3 py-2.5 text-left text-sm transition-colors ${
                    value === opt
                      ? "bg-accent-dim text-fg"
                      : "text-fg-secondary hover:bg-surface-2 hover:text-fg"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Shared success panel after submit. */
export function SuccessPanel({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border-line bg-surface-1 p-12 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-dim">
        <span className="font-mono text-2xl text-accent">✓</span>
      </div>
      <h2 className="display mt-6 text-2xl text-fg">{title}</h2>
      <p className="mx-auto mt-3 max-w-sm text-fg-secondary font-light">
        {message}
      </p>
    </motion.div>
  );
}
