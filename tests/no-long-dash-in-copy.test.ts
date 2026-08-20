import { describe, expect, it } from "vitest";
import { findAll, locate, sourceFiles } from "./helpers";

/* Hard founder rule: no long dash may surface anywhere a human reads.

   The characters are built from code points rather than typed literally, so
   this file does not contain the characters it forbids and the guard can be
   pointed at the whole repository later without tripping on its own source.

   A hyphen-minus in a compound word or a numeric range is fine and is not
   matched. Nothing is allow-listed. */
const FORBIDDEN_DASHES: { code: number; name: string }[] = [
  { code: 0x2012, name: "figure dash" },
  { code: 0x2013, name: "en dash" },
  { code: 0x2014, name: "em dash" },
  { code: 0x2015, name: "horizontal bar" },
  { code: 0x2212, name: "minus sign, which reads as a dash at text sizes" },
];

const CLASS = FORBIDDEN_DASHES.map((d) => `\\u{${d.code.toString(16)}}`).join("");
const LONG_DASHES = new RegExp(`[${CLASS}]`, "gu");

const nameFor = (char: string) =>
  FORBIDDEN_DASHES.find((d) => d.code === char.codePointAt(0))?.name ?? "long dash";

describe("no long dash appears in anything a human reads", () => {
  it("finds none anywhere in src", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      for (const hit of findAll(file, LONG_DASHES)) {
        offenders.push(`${nameFor(hit.match)} at ${locate(file, hit.index)}`);
      }
    }

    expect(
      offenders,
      `Replace each with a comma, a colon, a semicolon, parentheses, or two sentences:\n${offenders.join(
        "\n"
      )}`
    ).toEqual([]);
  });
});
