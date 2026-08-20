import { describe, expect, it } from "vitest";
import { findAll, locate, sourceFiles, withoutComments } from "./helpers";

/* No company-scale statistic may appear anywhere. These are simultaneously
   the most checkable, the most damaging and the least persuasive claims a
   pre-revenue company can make, so the site carries none of them.

   The founding cohort size is not a scale statistic: it is a stated limit on
   how many accounts will be sold, and it is written out as a plain count
   rather than as a "practices served" style boast. */
const INVENTED_SCALE: { pattern: RegExp; why: string }[] = [
  { pattern: /\d+\+\s*practices/i, why: "practices served is invented" },
  { pattern: /practices served/i, why: "no practice has run Ascend in production" },
  { pattern: /\d+\s*%\s*(12[- ]month\s*)?retention/i, why: "retention rate is invented" },
  { pattern: /\d+\.\d+\s*\/\s*5/i, why: "a star rating is invented and a search penalty" },
  { pattern: /\broles placed\b/i, why: "no placement has been made" },
  { pattern: /\bfounded\s+20\d\d\b/i, why: "founding year is invented" },
  { pattern: /countries of talent/i, why: "invented" },
  { pattern: /\d+\+?\s*(clinics|practices)\s+(trust|use|run)/i, why: "invented" },
];

/* Outcome statistics from zero production practices. */
const INVENTED_OUTCOMES: { pattern: RegExp; why: string }[] = [
  { pattern: /\d+%\s*fewer no[- ]shows/i, why: "no measured outcome exists" },
  { pattern: /\$\d[\d,]*k?\s*recovered/i, why: "no measured outcome exists" },
  { pattern: /\d+(\.\d+)?\s*(x|×)\s*(more\s+)?(lead\s+)?conversion/i, why: "no measured outcome exists" },
  { pattern: /\d+\s*new google reviews/i, why: "no measured outcome exists" },
  { pattern: /\d+\+?\s*after[- ]hours appointments/i, why: "no measured outcome exists" },
];

describe("no invented company-scale or outcome statistic", () => {
  it("carries no scale claim", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      const scan = withoutComments(file);
      for (const { pattern, why } of INVENTED_SCALE) {
        for (const hit of findAll(scan, pattern)) {
          offenders.push(`"${hit.match}" (${why}) at ${locate(file, hit.index)}`);
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("carries no measured outcome claim", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      const scan = withoutComments(file);
      for (const { pattern, why } of INVENTED_OUTCOMES) {
        for (const hit of findAll(scan, pattern)) {
          offenders.push(`"${hit.match}" (${why}) at ${locate(file, hit.index)}`);
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("emits no AggregateRating in structured data", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles()) {
      const scan = withoutComments(file);
      for (const hit of findAll(scan, /aggregateRating/i)) {
        offenders.push(
          `an invented rating is both a lie and a search penalty, at ${locate(
            file,
            hit.index
          )}`
        );
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});
