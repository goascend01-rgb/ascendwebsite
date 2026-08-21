import { describe, expect, it } from "vitest";
import {
  findAll,
  isStaffingFile,
  locate,
  sourceFiles,
  withoutComments,
} from "./helpers";

/* Nothing on this site may describe a capability the codebase does not have
   today. Every term below was verified against the claim truth register in
   WEBSITE-REBUILD-SPEC.md section 4 on 2026-08-20. */

/** Banned everywhere. No voice product exists, and no integration adapter
    exists behind the enum. */
const BANNED_EVERYWHERE: { pattern: RegExp; why: string }[] = [
  { pattern: /voice receptionist/i, why: "no voice product exists" },
  { pattern: /answers? the phone/i, why: "no voice product exists" },
  { pattern: /phone answering/i, why: "no voice product exists" },
  { pattern: /call handling/i, why: "no voice product exists" },
  { pattern: /sub-second/i, why: "no voice product exists" },
  { pattern: /hold (time|music)/i, why: "no voice product exists" },
  { pattern: /100% of calls/i, why: "no voice product exists" },
  { pattern: /\bDentrix\b/i, why: "no integration adapter exists" },
  { pattern: /\bOpen Dental\b/i, why: "no integration adapter exists" },
  { pattern: /\bEaglesoft\b/i, why: "no integration adapter exists" },
  { pattern: /\bathenahealth\b/i, why: "no integration adapter exists" },
  { pattern: /\bNexHealth\b/i, why: "no integration adapter exists" },
  { pattern: /\bEagleSoft\b/i, why: "no integration adapter exists" },
  { pattern: /\bCurve Dental\b/i, why: "no integration adapter exists" },
  { pattern: /\bRingCentral\b/i, why: "no integration adapter exists" },
  { pattern: /\bWeave\b/i, why: "no integration adapter exists" },
  {
    pattern: /monitors? your (google )?reviews/i,
    why: "public reviews are pasted in by staff today",
  },
  {
    pattern: /\d+\s+patients? (are )?on your waitlist/i,
    why: "there is no standing waitlist table",
  },
];

/** True of the staffing business, where people do this work, and false of
    the platform, where none of it is built. Allowed only in staffing files. */
const STAFFING_ONLY: RegExp[] = [
  /eligibility (verification|and benefits)/i,
  /prior authoriz/i,
  /claim status/i,
  /claims? submission/i,
  /referral coordination/i,
];


/** Internal product names the founder keeps off the marketing site. */
const INTERNAL_NAMES: RegExp[] = [/Command Cent(er|re)/i, /Board Meeting/i];

/** The site may deny offering a refund. It may never offer one. */
const REFUND_OFFERS: RegExp[] = [
  /risk[- ]free/i,
  /\d+[- ]day money[- ]back/i,
  /full refund/i,
  /refund policy/i,
  /we (will |can |do )?refund/i,
  /satisfaction guaranteed/i,
  /(offer|offering|include[sd]?|comes with|backed by)\s+(a\s+)?(full\s+)?(money[- ]back|refund)/i,
];

/** Terms allowed only when a negation sits immediately in front of them. */
const NEGATION = /\b(no|not|never|without|nor|neither)\b[^.]{0,60}$/i;

describe("no unbuilt capability is claimed", () => {
  it("never names a voice product, an integration, or a waitlist count", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      const scan = withoutComments(file);
      for (const { pattern, why } of BANNED_EVERYWHERE) {
        for (const hit of findAll(scan, pattern)) {
          offenders.push(`"${hit.match}" (${why}) at ${locate(file, hit.index)}`);
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("keeps human service work on the staffing pages only", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      if (isStaffingFile(file.rel)) continue;
      const scan = withoutComments(file);
      for (const pattern of STAFFING_ONLY) {
        for (const hit of findAll(scan, pattern)) {
          offenders.push(
            `"${hit.match}" is done by people, not the platform, at ${locate(
              file,
              hit.index
            )}`
          );
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("never offers a refund, a money-back guarantee, or a risk-free trial", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      const scan = withoutComments(file);
      for (const pattern of REFUND_OFFERS) {
        for (const hit of findAll(scan, pattern)) {
          const before = scan.content.slice(Math.max(0, hit.index - 70), hit.index);
          /* A denial is allowed and is in fact required. See the assertion
             below, which fails if the denial is ever quietly removed. */
          if (NEGATION.test(before)) continue;
          offenders.push(`"${hit.match}" reads as an offer at ${locate(file, hit.index)}`);
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("still says out loud that there is no refund", () => {
    /* JSX wraps prose across lines, so compare on collapsed whitespace. */
    const all = sourceFiles()
      .map((f) => f.content.replace(/\s+/g, " "))
      .join(" ");

    expect(all).toContain("We do not offer a refund.");
    expect(all).toContain("Ascend does not offer a money-back guarantee");
  });

  it("never prints an internal product name", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      const scan = withoutComments(file);
      for (const pattern of INTERNAL_NAMES) {
        for (const hit of findAll(scan, pattern)) {
          offenders.push(
            `"${hit.match}" is an internal name, describe what it does instead, at ${locate(file, hit.index)}`
          );
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("never benchmarks a practice against its peers", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      const scan = withoutComments(file);
      for (const hit of findAll(scan, /practices like yours/i)) {
        const before = scan.content.slice(Math.max(0, hit.index - 30), hit.index);
        if (/\b(no|not|never)\b/i.test(before)) continue;
        offenders.push(
          `the Network is built never to do this, at ${locate(file, hit.index)}`
        );
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});
