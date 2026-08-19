import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";

/* The Ascend mark, rendered from the real icon art as a CSS mask so it
   inherits `currentColor` (white in nav, cyan in accents / on hover). */
const maskStyle: CSSProperties = {
  backgroundColor: "currentColor",
  WebkitMaskImage: "url(/brand/ascend-icon.png)",
  maskImage: "url(/brand/ascend-icon.png)",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

export function Mark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block ${className}`}
      style={maskStyle}
    />
  );
}

export function Logo({
  className = "",
  wordmark = true,
}: {
  className?: string;
  wordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Ascend — home"
      className={`group inline-flex items-center gap-4 text-fg ${className}`}
    >
      <Mark className="h-[26px] w-[26px] shrink-0 transition-colors duration-300 group-hover:text-accent" />
      {wordmark && (
        <Image
          src="/brand/ascend-wordmark.png"
          alt="Ascend"
          width={1505}
          height={169}
          priority
          className="h-[15px] w-auto select-none opacity-95 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </Link>
  );
}
