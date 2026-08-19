"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { NAV } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="shell flex h-[72px] items-center justify-between">
          <Logo />

          <div className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.86rem] text-fg-secondary transition-colors duration-300 hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <ButtonLink href="/contact" size="sm" variant="ghost">
              Book a demo →
            </ButtonLink>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-[5px]">
              <span
                className={`h-px w-6 bg-fg transition-all duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-fg transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-fg transition-all duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-2">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block py-3 text-[2rem] text-fg"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                className="mt-6"
              >
                <ButtonLink
                  href="/contact"
                  variant="primary"
                  onClick={() => setOpen(false)}
                >
                  Book a demo →
                </ButtonLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
