import { describe, expect, it } from "vitest";
import { headingStrings, sourceFiles } from "./helpers";

/* Founder rule: no user-facing copy names a single vertical as the target.
   Say "independent practices", "your practice", "appointment-based
   practices".

   A vertical may appear in body copy inside an inclusive enumeration, which
   is also the right SEO shape: "whether you run a dental practice, an
   esthetic clinic, a medspa or another appointment-based practice". It may
   never appear in a heading, and never in metadata as the primary term. */
const VERTICALS = /\b(dental|dentist|dentistry|medspa|med spa|esthetic|aesthetic|orthodont|chiropract|veterinar)/i;

describe("no vertical is named in a headline or in metadata", () => {
  it("keeps h1, h2 and section titles free of a named vertical", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      for (const heading of headingStrings(file)) {
        const match = heading.match(VERTICALS);
        if (match) {
          offenders.push(
            `${file.rel}: "${heading.replace(/\s+/g, " ").trim().slice(0, 120)}" names "${match[0]}"`
          );
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("keeps the page title and keywords free of a named vertical", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles("app")) {
      const metadataBlock = file.content.match(
        /export const metadata[\s\S]*?\n\};/
      );
      if (!metadataBlock) continue;

      /* The description may carry an inclusive enumeration. The title and the
         keywords may not carry a vertical at all. */
      const title = metadataBlock[0].match(/title:\s*"([^"]*)"/)?.[1] ?? "";
      const keywords = metadataBlock[0].match(/keywords:\s*\[([\s\S]*?)\]/)?.[1] ?? "";

      for (const [field, value] of [
        ["title", title],
        ["keywords", keywords],
      ] as const) {
        const match = value.match(VERTICALS);
        if (match) offenders.push(`${file.rel} ${field} names "${match[0]}"`);
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  /* The founder rule bans naming a vertical *as the target*. Mentioning one
     and targeting one are not the same thing, and the founder letter is the
     case that proves it: "I qualified as a dentist" describes the author,
     not the buyer, and it is the most credibility-carrying sentence on the
     About page. So the biography is exempt by span, and only by span.
     Everything else in that file, and every other file, is still bound. */
  function founderStorySpan(content: string): [number, number] | null {
    const start = content.indexOf("FOUNDER_STORY: {");
    if (start === -1) return null;
    const end = content.indexOf("neededFor:", start);
    return end === -1 ? null : [start, end];
  }

  it("only ever mentions a vertical inside an inclusive enumeration", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      if (file.rel.startsWith("tests/")) continue;
      const biography =
        file.rel === "src/lib/tokens.ts" ? founderStorySpan(file.content) : null;

      for (const match of file.content.matchAll(new RegExp(VERTICALS.source, "gi"))) {
        const index = match.index ?? 0;

        if (biography && index >= biography[0] && index < biography[1]) continue;

        const window = file.content.slice(
          Math.max(0, index - 220),
          index + 260
        );
        /* An enumeration lists at least one alternative and lands on the
           inclusive phrase. */
        const isEnumeration =
          /another appointment-based practice/i.test(window) ||
          /whether you run/i.test(window);
        if (!isEnumeration) {
          offenders.push(
            `${file.rel}: "${match[0]}" is named outside an inclusive enumeration`
          );
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("keeps the biography exemption to one mention, so it cannot widen quietly", () => {
    const tokens = sourceFiles("lib").find((f) => f.rel === "src/lib/tokens.ts");
    expect(tokens).toBeDefined();

    const span = founderStorySpan(tokens!.content);
    expect(span, "the founder story span must be locatable").not.toBeNull();

    const story = tokens!.content.slice(span![0], span![1]);
    const mentions = story.match(new RegExp(VERTICALS.source, "gi")) ?? [];

    expect(
      mentions.length,
      `The founder letter may name a vertical once, as biography. Found: ${mentions.join(", ")}`
    ).toBeLessThanOrEqual(1);
  });
});
