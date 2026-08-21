import { LEAK_MODEL, type LeakInputs } from "./site";

/* The leak model.

   Kept out of the component so the arithmetic can be tested directly. Two
   rules matter and both come from the product rather than from marketing:

   1. Visits floor to whole numbers. Half a patient does not come back.
   2. A row whose inputs are zero is `not_applicable`, not $0. The product
      keeps "we measured it and it was zero" apart from "this does not
      apply", and the page behaves like the product.

   At the shipped defaults this returns 136 visits and PKR 1,632,000. */

export type RowState = "estimated" | "not_applicable";

export type LeakRow = {
  id: "reactivation" | "slots" | "enquiries";
  label: string;
  /** What the visitor is being shown the working for. */
  basis: string;
  visits: number;
  value: number;
  state: RowState;
};

export type LeakResult = {
  inactivePerYear: number;
  rows: LeakRow[];
  totalVisits: number;
  totalValue: number;
  /** True when no row could be computed at all. */
  allNotApplicable: boolean;
  /** True when visits exist but cannot be valued, because value per visit is zero. */
  valueNotApplicable: boolean;
};

const floor = (n: number) => Math.floor(Math.max(0, n));

export function computeLeaks(input: LeakInputs = LEAK_MODEL): LeakResult {
  const {
    activePatients,
    averageVisitValue,
    inactiveRate,
    recoveryRate,
    cancellationsPerWeek,
    refillRate,
    afterHoursPerMonth,
    afterHoursConversion,
  } = input;

  const inactivePerYear = floor(activePatients * inactiveRate);

  const recoveredApplies =
    activePatients > 0 && inactiveRate > 0 && recoveryRate > 0;
  const refilledApplies = cancellationsPerWeek > 0 && refillRate > 0;
  const convertedApplies = afterHoursPerMonth > 0 && afterHoursConversion > 0;

  const visitsRecovered = recoveredApplies ? floor(inactivePerYear * recoveryRate) : 0;
  const visitsRefilled = refilledApplies
    ? floor(cancellationsPerWeek * 52 * refillRate)
    : 0;
  const visitsConverted = convertedApplies
    ? floor(afterHoursPerMonth * 12 * afterHoursConversion)
    : 0;

  const valueNotApplicable = averageVisitValue <= 0;
  const valueOf = (visits: number) =>
    valueNotApplicable ? 0 : visits * averageVisitValue;

  const rows: LeakRow[] = [
    {
      id: "reactivation",
      label: "Visits recovered from patients who drifted",
      basis: `${inactivePerYear.toLocaleString()} go inactive per year`,
      visits: visitsRecovered,
      value: valueOf(visitsRecovered),
      state: recoveredApplies ? "estimated" : "not_applicable",
    },
    {
      id: "slots",
      label: "Visits refilled after a cancellation",
      basis: `${floor(cancellationsPerWeek * 52).toLocaleString()} unfilled slots per year`,
      visits: visitsRefilled,
      value: valueOf(visitsRefilled),
      state: refilledApplies ? "estimated" : "not_applicable",
    },
    {
      id: "enquiries",
      label: "Visits converted from after hours enquiries",
      basis: `${floor(afterHoursPerMonth * 12).toLocaleString()} enquiries per year`,
      visits: visitsConverted,
      value: valueOf(visitsConverted),
      state: convertedApplies ? "estimated" : "not_applicable",
    },
  ];

  const totalVisits = rows.reduce((sum, r) => sum + r.visits, 0);
  const totalValue = valueNotApplicable ? 0 : totalVisits * averageVisitValue;

  return {
    inactivePerYear,
    rows,
    totalVisits,
    totalValue,
    allNotApplicable: rows.every((r) => r.state === "not_applicable"),
    valueNotApplicable,
  };
}

/* Two currencies, deliberately separate.

   The platform sells in Pakistan and prices in rupees. Ascend Staffing places
   Pakistani professionals INTO US practices and prices in dollars. A single
   shared formatter would render $1,290 as PKR 1,290 the moment the platform
   repriced, so the two are named for their market and cannot be confused. */

/** Platform pricing. Pakistan. */
export const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  });

/** Ascend Staffing pricing, which is billed to US practices in dollars. */
export const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
