import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { findAll, locate, ROOT, sourceFiles } from "./helpers";
import { TOKENS, unresolvedBlockingTokens } from "@/lib/tokens";

const SCRIPT = join(ROOT, "scripts", "check-tokens.mjs");

/* A bracketed placeholder shipped to the live site is worse than a missing
   page, so none may exist in src at all. Founder values live in the token
   registry as null instead, which is what the production build checks. */

describe("no unresolved placeholder reaches a page", () => {
  it("finds no bracketed token marker anywhere in src", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      for (const hit of findAll(file, /\[\[[A-Z_]+\]\]/)) {
        offenders.push(`${hit.match} at ${locate(file, hit.index)}`);
      }
    }

    expect(
      offenders,
      `Move the value into src/lib/tokens.ts and render it with <Token>:\n${offenders.join(
        "\n"
      )}`
    ).toEqual([]);
  });

  it("names every founder token and what it blocks", () => {
    for (const [id, record] of Object.entries(TOKENS)) {
      expect(record.neededFor, `${id} must say what it is needed for`).toBeTruthy();
      expect(typeof record.blocking).toBe("boolean");
    }
  });

  /* The production build must refuse to run while a blocking token is null.
     Asserting the guard agrees with the registry keeps this test green in
     both states: red would only train people to ignore it. */
  it("refuses the production build while a blocking token is unresolved", () => {
    const missing = unresolvedBlockingTokens();
    const result = spawnSync(process.execPath, [SCRIPT], { encoding: "utf8" });
    const output = `${result.stdout}${result.stderr}`;

    if (missing.length > 0) {
      expect(result.status, "check-tokens must fail the build").toBe(1);
      for (const id of missing) {
        expect(output, `the failure must name ${id}`).toContain(id);
      }
    } else {
      expect(result.status, "check-tokens must allow the build").toBe(0);
    }
  });

  /* The guard used to inspect ONE token out of five, because its single regex
     could not match a value containing a comma, and reported "All founder
     tokens resolved" regardless. A checker that can silently see nothing is
     worse than no checker: it turns an absent safety net into a believed one.
     This pins the self-check that now prevents that. */
  it("can actually see every token it claims to check", () => {
    const result = spawnSync(process.execPath, [SCRIPT], { encoding: "utf8" });
    const output = `${result.stdout}${result.stderr}`;
    const declared = Object.keys(TOKENS).length;

    if (result.status === 0) {
      expect(
        output,
        `the guard must report how many tokens it inspected, and it must be all ${declared}`
      ).toContain(`${declared} checked`);
    } else {
      expect(output).not.toContain("not seeing every token");
    }
  });

  it("reports which founder values are still outstanding", () => {
    const missing = unresolvedBlockingTokens();
    if (missing.length > 0) {
      console.info(
        `\n  Outstanding founder values, blocking the production build:\n${missing
          .map((id) => `    ${id}: ${TOKENS[id].neededFor}`)
          .join("\n")}\n`
      );
    }
    expect(Array.isArray(missing)).toBe(true);
  });
});
