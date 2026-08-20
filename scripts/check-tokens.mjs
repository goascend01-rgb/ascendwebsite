/* Fails the production build while any blocking founder token is unresolved.
   Runs as npm `prebuild`, so `npm run build` refuses to produce a bundle that
   would render a placeholder marker on the live site.

   To compile the site for preview while tokens are still outstanding, run
   `npx next build` directly, which skips this guard on purpose. */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const tokensFile = join(here, "..", "src", "lib", "tokens.ts");

const source = readFileSync(tokensFile, "utf8");

// Match: NAME: { value: <expr>, neededFor: "<text>", blocking: <bool>, },
const entry =
  /(\w+):\s*\{\s*value:\s*([^,]+?),\s*neededFor:\s*"([^"]*)",\s*blocking:\s*(true|false),?\s*\}/g;

const unresolved = [];
let match;
while ((match = entry.exec(source)) !== null) {
  const [, id, value, neededFor, blocking] = match;
  if (value.trim() === "null" && blocking === "true") {
    unresolved.push({ id, neededFor });
  }
}

if (unresolved.length === 0) {
  console.log("All founder tokens resolved.");
  process.exit(0);
}

const lines = [
  "",
  "  BUILD BLOCKED: unresolved founder tokens",
  "",
  "  These values must be supplied in src/lib/tokens.ts before this site ships.",
  "  A placeholder rendered on the live site is worse than a missing page.",
  "",
  ...unresolved.map((t) => `    ${t.id.padEnd(20)}  ${t.neededFor}`),
  "",
  "  To compile a preview build anyway, run: npx next build",
  "",
];

console.error(lines.join("\n"));
process.exit(1);
