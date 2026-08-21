/* Fails the production build while any blocking founder token is unresolved.
   Runs as npm `prebuild`, so `npm run build` refuses to produce a bundle that
   would render a placeholder marker on the live site.

   To compile the site for preview while tokens are still outstanding, run
   `npx next build` directly, which skips this guard on purpose.

   ── WHY THIS IS NOT ONE REGEX ─────────────────────────────────────────────

   It used to be:

       /(\w+):\s*\{\s*value:\s*([^,]+?),\s*neededFor:\s*"([^"]*)",.../

   `[^,]+?` cannot match a value containing a comma, and four of the five real
   values contain one ("Hamraz Azam Khan Bangash, trading as Ascend", "the laws
   of the State of Delaware, United States", and so on). So the guard silently
   inspected ONE token out of five and printed "All founder tokens resolved."
   Four blocking values could have been null and the build would have shipped.

   Two changes follow from that:

     1. Entries are found by brace matching rather than by a single pattern, so
        a value may contain commas, braces, template literals or a `.join()`.
     2. The guard CROSS-CHECKS itself against the TokenId union and fails if it
        cannot account for every declared token. A checker that can quietly
        parse nothing and report success is worse than no checker, because it
        converts an absent safety net into a believed one. */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const tokensFile = join(here, "..", "src", "lib", "tokens.ts");
const source = readFileSync(tokensFile, "utf8");

const fail = (lines) => {
  console.error("\n" + lines.join("\n") + "\n");
  process.exit(1);
};

/** Token ids as declared in the TokenId union: the independent expectation. */
function declaredTokenIds() {
  const union = source.match(/export type TokenId =([\s\S]*?);/);
  if (!union) return null;
  return [...union[1].matchAll(/"([A-Z_]+)"/g)].map((m) => m[1]);
}

/** The body of `export const TOKENS = { ... }`, by brace matching. */
function tokensBody() {
  const start = source.search(/export const TOKENS[^=]*=\s*\{/);
  if (start === -1) return null;
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(open + 1, i);
    }
  }
  return null;
}

/** Every `NAME: { ... }` entry inside the TOKENS body, brace matched. */
function parseEntries(body) {
  const out = [];
  const head = /([A-Z_]+)\s*:\s*\{/g;
  let m;
  while ((m = head.exec(body)) !== null) {
    const open = body.indexOf("{", m.index);
    let depth = 0;
    let end = -1;
    for (let i = open; i < body.length; i += 1) {
      const ch = body[i];
      if (ch === "{") depth += 1;
      else if (ch === "}") {
        depth -= 1;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end === -1) continue;
    const entry = body.slice(open + 1, end);

    // `value:` runs until the next top level key of the entry.
    const valueMatch = entry.match(/value\s*:\s*([\s\S]*?),?\s*(?:neededFor|blocking)\s*:/);
    const value = valueMatch ? valueMatch[1].trim().replace(/,$/, "") : null;
    const neededFor = (entry.match(/neededFor\s*:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] ?? "";
    const blocking = /blocking\s*:\s*true/.test(entry);

    out.push({ id: m[1], value, neededFor, blocking, parsed: valueMatch !== null });
    head.lastIndex = end;
  }
  return out;
}

const declared = declaredTokenIds();
const body = tokensBody();

if (!declared || !body) {
  fail([
    "  BUILD BLOCKED: cannot read the founder token registry",
    "",
    "  src/lib/tokens.ts did not match the expected shape, so this guard cannot",
    "  tell whether a placeholder would ship. Failing rather than assuming.",
  ]);
}

const entries = parseEntries(body);

/* Self check. If the parser and the type disagree, the guard is blind and must
   say so instead of reporting a clean run. */
const seen = entries.map((e) => e.id);
const missed = declared.filter((id) => !seen.includes(id));
const unparsed = entries.filter((e) => !e.parsed).map((e) => e.id);

if (missed.length > 0 || unparsed.length > 0) {
  fail([
    "  BUILD BLOCKED: the founder token guard is not seeing every token",
    "",
    `  TokenId declares ${declared.length}: ${declared.join(", ")}`,
    `  This guard could read ${seen.length}: ${seen.join(", ") || "none"}`,
    ...(missed.length ? [`  Not found:   ${missed.join(", ")}`] : []),
    ...(unparsed.length ? [`  No value:    ${unparsed.join(", ")}`] : []),
    "",
    "  Fix scripts/check-tokens.mjs before shipping. A guard that cannot see a",
    "  token cannot stop that token shipping unresolved.",
  ]);
}

const unresolved = entries.filter((e) => e.blocking && e.value === "null");

if (unresolved.length === 0) {
  console.log(`All founder tokens resolved (${entries.length} checked).`);
  process.exit(0);
}

fail([
  "  BUILD BLOCKED: unresolved founder tokens",
  "",
  "  These values must be supplied in src/lib/tokens.ts before this site ships.",
  "  A placeholder rendered on the live site is worse than a missing page.",
  "",
  ...unresolved.map((t) => `    ${t.id.padEnd(20)}  ${t.neededFor}`),
  "",
  "  To compile a preview build anyway, run: npx next build",
]);
