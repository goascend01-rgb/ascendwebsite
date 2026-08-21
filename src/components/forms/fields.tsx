"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

/* A labelled field.

   The hint and the error are WIRED to the control rather than merely sitting
   near it: both get an id, the control is given `aria-describedby` pointing at
   whichever is showing, and `aria-invalid` when it failed. Without that, a
   screen reader user hears "Email, edit text" and is never told which field
   was rejected or why, which is the difference between a form that is
   annoying and one that is impossible.

   `children` is a render prop so the ids can reach the control. The plain
   ReactNode form is still accepted for controls that manage their own
   description, such as the custom Select. */
export function Field({
  label,
  htmlFor,
  children,
  hint,
  optional = false,
  error,
}: {
  label: string;
  htmlFor?: string;
  children:
    | ReactNode
    | ((a11y: {
        id?: string;
        "aria-describedby"?: string;
        "aria-invalid"?: boolean;
      }) => ReactNode);
  hint?: string;
  optional?: boolean;
  error?: string;
}) {
  const auto = useId();
  const base = htmlFor ?? auto;
  const hintId = hint ? `${base}-hint` : undefined;
  const errorId = error ? `${base}-error` : undefined;
  const describedBy = errorId ?? hintId;

  const a11y = {
    id: htmlFor,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
  };

  return (
    <div>
      <label htmlFor={htmlFor} className="block">
        <span className="label-mono mb-2.5 flex items-center gap-2">
          {label}
          {optional && (
            <span className="text-fg-muted normal-case">(optional)</span>
          )}
        </span>
      </label>
      {typeof children === "function" ? children(a11y) : children}
      {error ? (
        <span
          id={errorId}
          className="mt-1.5 block text-xs font-light"
          style={{ color: "var(--danger)" }}
        >
          {error}
        </span>
      ) : (
        hint && (
          <span id={hintId} className="mt-1.5 block text-xs font-light text-fg-tertiary">
            {hint}
          </span>
        )
      )}
    </div>
  );
}

/* A field no human ever sees or tabs into. Anything that fills it is a
   script, and the server treats that submission as handled without
   delivering it. Hidden with position rather than display:none, because
   some bots skip fields that are display:none. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

/* Shown when the submission did not arrive. It says plainly that nothing
   was sent and gives a route that does not depend on the thing that just
   failed. */
export function FormError({
  message,
  email,
}: {
  message: string;
  email: string;
}) {
  return (
    <div
      role="alert"
      className="mt-6 rounded-lg border p-5"
      style={{ borderColor: "var(--danger)", background: "rgba(240,99,95,.06)" }}
    >
      <p className="font-mono text-[0.66rem] tracking-[0.18em] uppercase" style={{ color: "var(--danger)" }}>
        Not sent
      </p>
      <p className="mt-3 text-[0.97rem] leading-[1.65] font-light text-fg-secondary">
        {message}
      </p>
      <a
        href={`mailto:${email}`}
        className="mt-3 inline-block font-mono text-[0.78rem] text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
      >
        {email}
      </a>
    </div>
  );
}

const fieldBase =
  "w-full rounded-md border border-control-border bg-control px-4 py-3 text-fg placeholder:text-fg-muted transition-colors duration-200 hover:border-border-strong focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldBase} ${props.className ?? ""}`} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={`${fieldBase} resize-none ${props.className ?? ""}`}
    />
  );
}

/* Custom select, because a native <select> renders an OS control that
   cannot be styled to match. Keyboard behaviour is implemented rather than
   implied: arrows move through options, Enter and Space commit, Escape
   closes and returns focus to the trigger. */
export function Select({
  options,
  value,
  onChange,
  placeholder = "Select",
  id,
  label,
  describedBy,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  id?: string;
  /** The visible field label. Without it the trigger is announced only by
      its placeholder, so "Select" is the entire accessible name. */
  label?: string;
  describedBy?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const generatedId = useId();
  const listId = `${id ?? generatedId}-listbox`;

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  /* Moving focus is a DOM side effect and belongs here. Choosing which
     option is active is state, and is set when the list opens instead. */
  useEffect(() => {
    if (!open) return;
    optionRefs.current[active]?.focus();
  }, [open, active]);

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const commit = (opt: string) => {
    onChange(opt);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next =
        e.key === "ArrowDown"
          ? Math.min(options.length - 1, active + 1)
          : Math.max(0, active - 1);
      setActive(next);
      optionRefs.current[next]?.focus();
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            openList();
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={label}
        aria-describedby={describedBy}
        className={`${fieldBase} flex items-center justify-between text-left ${
          open ? "border-accent" : ""
        }`}
      >
        <span className={value ? "text-fg" : "text-fg-muted"}>
          {value || placeholder}
        </span>
        <span
          aria-hidden="true"
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
            id={listId}
            role="listbox"
            aria-label={label}
            tabIndex={-1}
            onKeyDown={onListKeyDown}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border-line bg-surface-3 p-1 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            {options.map((opt, i) => (
              <li
                key={opt}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                role="option"
                aria-selected={value === opt}
                tabIndex={-1}
                onClick={() => commit(opt)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    commit(opt);
                  }
                }}
                className={`cursor-pointer rounded px-3 py-2.5 text-left text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px] ${
                  value === opt
                    ? "bg-accent-dim text-fg"
                    : "text-fg-secondary hover:bg-surface-2 hover:text-fg"
                }`}
              >
                {opt}
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
      role="status"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border-line bg-surface-1 p-12 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-dim">
        <span aria-hidden="true" className="font-mono text-2xl text-accent">
          ✓
        </span>
      </div>
      <h2 className="display mt-6 text-2xl text-fg">{title}</h2>
      <p className="mx-auto mt-3 max-w-sm font-light text-fg-secondary">
        {message}
      </p>
    </motion.div>
  );
}
