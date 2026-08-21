import { describe, expect, it } from "vitest";
import { ROLES, PRICE_ITEMS } from "@/lib/staffing";

/* Two arrays now hold a price for the same three roles: the detailed cards
   at the top of /staffing and the full rate card below them. A price that
   renders twice is a price that will eventually disagree with itself, and a
   prospect who spots two numbers for one role stops believing both.

   The overlap is asserted rather than eliminated, because the two lists
   serve different jobs: ROLES carries responsibilities and copy, PRICE_ITEMS
   carries the wider bench. */
const OVERLAP: Record<string, string> = {
  reception: "reception",
  billing: "billing",
  coding: "coder",
};

describe("the two staffing price lists agree", () => {
  it.each(Object.entries(OVERLAP))(
    "role %s matches rate card entry %s",
    (roleSlug, priceKey) => {
      const role = ROLES.find((r) => r.slug === roleSlug);
      const item = PRICE_ITEMS.find((p) => p.key === priceKey);

      expect(role, `no role ${roleSlug}`).toBeDefined();
      expect(item, `no rate card entry ${priceKey}`).toBeDefined();

      expect(item!.price, `${roleSlug} monthly price disagrees`).toBe(role!.price);
      expect(item!.inHouse, `${roleSlug} in-house comparison disagrees`).toBe(
        role!.inHouse
      );
    }
  );

  it("prices every role it lists, with a real comparison", () => {
    for (const item of PRICE_ITEMS) {
      expect(item.price, `${item.key} has no price`).toBeGreaterThan(0);
      expect(
        item.inHouse,
        `${item.key} in-house comparison must exceed the Ascend price or the table argues against itself`
      ).toBeGreaterThan(item.price);
    }
  });
});
