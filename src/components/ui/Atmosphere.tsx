/* Fixed ambient background: cyan glow + faint grid + grain.
   Sits behind all content (z-0); content lives at z-10. */
export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* primary glow, top-right */}
      <div
        className="absolute -top-[20%] right-[-10%] h-[70vw] w-[70vw] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at center, var(--accent-glow), transparent 60%)",
          filter: "blur(40px)",
        }}
      />
      {/* secondary, deep, bottom-left */}
      <div
        className="absolute bottom-[-25%] left-[-15%] h-[60vw] w-[60vw] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, rgba(11,185,196,.18), transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      {/* grid, masked to fade out */}
      <div
        className="bg-grid absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(circle at 70% 15%, #000 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at 70% 15%, #000 0%, transparent 72%)",
        }}
      />
      {/* grain */}
      <div className="bg-noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
