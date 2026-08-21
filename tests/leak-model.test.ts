import { describe, expect, it } from "vitest";
import { computeLeaks } from "@/lib/leak";
import { LEAK_MODEL } from "@/lib/site";

/* The calculator is the highest converting element on the page, and its
   credibility rests on the arithmetic being checkable. Two behaviours are
   borrowed from the product and must not drift: visits floor to whole
   numbers, and a row with no inputs is not applicable rather than zero. */

describe("the leak model", () => {
  it("returns 136 visits and PKR 1,632,000 at the shipped defaults", () => {
    const result = computeLeaks(LEAK_MODEL);

    expect(result.totalVisits).toBe(136);
    expect(result.totalValue).toBe(1_632_000);
  });

  it("floors every row to whole visits", () => {
    const result = computeLeaks(LEAK_MODEL);
    const byId = Object.fromEntries(result.rows.map((r) => [r.id, r]));

    // 1200 * 0.08 = 96 inactive, 96 * 0.15 = 14.4, floored to 14
    // 136 visits at PKR 12,000 = PKR 1,632,000
    expect(result.inactivePerYear).toBe(96);
    expect(byId.reactivation.visits).toBe(14);
    // 2 * 52 = 104 slots, 104 * 0.6 = 62.4, floored to 62
    expect(byId.slots.visits).toBe(62);
    // 25 * 12 = 300 enquiries, 300 * 0.2 = 60 exactly
    expect(byId.enquiries.visits).toBe(60);

    for (const row of result.rows) {
      expect(Number.isInteger(row.visits)).toBe(true);
    }
  });

  it("says not applicable rather than zero when an input is zero", () => {
    const result = computeLeaks({ ...LEAK_MODEL, cancellationsPerWeek: 0 });
    const slots = result.rows.find((r) => r.id === "slots");

    expect(slots?.state).toBe("not_applicable");
    expect(slots?.visits).toBe(0);
    expect(result.allNotApplicable).toBe(false);
  });

  it("marks every row not applicable when nothing can be computed", () => {
    const result = computeLeaks({
      ...LEAK_MODEL,
      activePatients: 0,
      cancellationsPerWeek: 0,
      afterHoursPerMonth: 0,
    });

    expect(result.allNotApplicable).toBe(true);
    expect(result.totalVisits).toBe(0);
  });

  it("refuses to value visits when there is no value per visit", () => {
    const result = computeLeaks({ ...LEAK_MODEL, averageVisitValue: 0 });

    expect(result.valueNotApplicable).toBe(true);
    expect(result.totalVisits).toBe(136);
    expect(result.totalValue).toBe(0);
  });

  it("never returns a negative figure", () => {
    const result = computeLeaks({
      ...LEAK_MODEL,
      activePatients: -500,
      cancellationsPerWeek: -3,
    });

    for (const row of result.rows) {
      expect(row.visits).toBeGreaterThanOrEqual(0);
      expect(row.value).toBeGreaterThanOrEqual(0);
    }
    expect(result.totalValue).toBeGreaterThanOrEqual(0);
  });
});
