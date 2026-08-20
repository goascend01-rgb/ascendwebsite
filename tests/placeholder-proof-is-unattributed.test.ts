import { describe, expect, it } from "vitest";
import { PROOF_MODE, TESTIMONIALS } from "@/lib/site";

/* Placeholder proof must be impossible to disprove.

   A named person at a named practice can be searched for in ten seconds,
   and finding nothing produces exactly the reaction this site is engineered
   to prevent. So attribution is role, practice shape and region, and this
   guard fails the moment somebody adds a name back. */

const US_REGIONS = new Set([
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "the Midwest", "the Northeast", "the Southwest", "the Pacific Northwest",
]);

const PERSON_TITLE = /\b(Dr\.?|DDS|DMD|MD|RDH|Mr\.?|Mrs\.?|Ms\.?)\b/;
/* Capitalised only: "two-location group" is a practice shape, "Whitfield
   Family Group" is a business. "Practice" is absent on purpose, because
   "Practice owner" and "Practice manager" are the roles we want. */
const BUSINESS_SUFFIX = /\b(Dental|Clinic|Group|Health|Medical|Partners|Associates|Center|Centre|Surgery|Orthodontics|Pediatric)\b/;

const placeholders = TESTIMONIALS.filter((t) => t.status === "placeholder");

describe("placeholder proof carries no invented person or business", () => {
  it("has placeholder proof to check", () => {
    expect(PROOF_MODE).toBe("placeholder");
    expect(placeholders.length).toBeGreaterThan(0);
  });

  it.each(placeholders.map((t) => [t.attribution, t] as const))(
    "%s is shaped as role, practice shape and region",
    (_label, testimonial) => {
      const segments = testimonial.attribution.split("·").map((s) => s.trim());

      expect(
        segments,
        `Attribution must be "role · practice shape · region", got "${testimonial.attribution}"`
      ).toHaveLength(3);

      const [role, shape, region] = segments;

      /* The role and the shape are descriptions, so nothing inside them may
         be capitalised beyond the opening letter: a capital mid-string is
         how a proper noun gets in. */
      for (const [name, value] of [
        ["role", role],
        ["practice shape", shape],
      ] as const) {
        const rest = value.slice(1);
        expect(
          rest,
          `The ${name} "${value}" contains a capitalised word, which reads as a name`
        ).toBe(rest.toLowerCase());
      }

      expect(
        US_REGIONS.has(region),
        `"${region}" is not a recognised region. Use a US state or a broad region, never a city plus a practice name.`
      ).toBe(true);
    }
  );

  it("names no person and no business, anywhere in the quote or attribution", () => {
    for (const testimonial of placeholders) {
      const full = `${testimonial.quote} ${testimonial.attribution}`;

      expect(
        PERSON_TITLE.test(full),
        `"${full}" carries a personal title`
      ).toBe(false);

      expect(
        BUSINESS_SUFFIX.test(full),
        `"${full}" carries a business name suffix`
      ).toBe(false);
    }
  });

  it("uses no rating and no aggregate count", () => {
    for (const testimonial of placeholders) {
      expect(testimonial).not.toHaveProperty("rating");
      expect(testimonial).not.toHaveProperty("metric");
      expect(testimonial.attribution).not.toMatch(/\d+\s*(stars?|\/\s*5)/i);
    }
  });
});
