import { TOKENS, type TokenId } from "@/lib/tokens";

/* An unresolved founder token. Renders the real value once it exists,
   and a loud amber marker until then. The production build refuses to
   run while any blocking token is still null, so this marker can only
   ever be seen in development or in a preview build. */
export function Token({
  id,
  as: As = "span",
  className = "",
}: {
  id: TokenId;
  as?: "span" | "p" | "div";
  className?: string;
}) {
  const record = TOKENS[id];

  if (record.value !== null) {
    /* A long value carries its own paragraphing. Rendering it as one block
       would run the founder letter together into a wall. */
    const paragraphs = record.value.split(/\n{2,}/).filter(Boolean);

    if (paragraphs.length > 1) {
      return (
        <As className={className}>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className={i === 0 ? undefined : "mt-5"}>
              {paragraph}
            </p>
          ))}
        </As>
      );
    }

    return <As className={className}>{record.value}</As>;
  }

  return (
    <As className={className}>
      <span
        title={`Needed for: ${record.neededFor}`}
        className="inline-flex items-center gap-2 rounded-sm border border-dashed px-2 py-1 font-mono text-[0.7rem] tracking-[0.12em] uppercase"
        style={{ borderColor: "var(--warning)", color: "var(--warning)" }}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--warning)" }}
        />
        {id} needed
      </span>
    </As>
  );
}

/* Inline form for use inside a sentence, without the block wrapper. */
export function TokenText({ id }: { id: TokenId }) {
  const record = TOKENS[id];
  if (record.value !== null) return <>{record.value}</>;
  return (
    <span
      title={`Needed for: ${record.neededFor}`}
      className="font-mono text-[0.85em] tracking-wide"
      style={{ color: "var(--warning)" }}
    >
      {`{${id}}`}
    </span>
  );
}
