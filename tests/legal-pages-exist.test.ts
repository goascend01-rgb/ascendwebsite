import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ROOT } from "./helpers";

/* Meta app review fails on a 404, and this is the cheapest possible
   insurance against one. Each page must exist, be crawlable, require no
   login, and carry the headings a reviewer looks for. */

const pageFor = (route: string) =>
  join(ROOT, "src", "app", ...route.split("/").filter(Boolean), "page.tsx");

const REQUIRED: {
  route: string;
  headings: string[];
}[] = [
  {
    route: "/legal/privacy",
    headings: [
      "Who we are and how to reach us",
      "The two roles we act in",
      "Information we collect as controller",
      "Information we process on behalf of practices",
      "Meta platform data, specifically",
      "How we use information",
      "Subprocessors",
      "Legal bases and HIPAA",
      "Security",
      "Retention",
      "Your choices",
      "Deletion",
      "Children",
      "International transfers",
      "Changes and effective date",
    ],
  },
  {
    route: "/legal/terms",
    headings: [
      "What the service is",
      "The customer's responsibilities",
      "Acceptable use",
      "AI generated output",
      "The ninety day working commitment",
      "Term, notice and termination",
      "Data ownership",
      "Limitation of liability",
      "Governing law and dispute resolution",
    ],
  },
  {
    route: "/legal/data-deletion",
    headings: [
      "If you messaged a practice",
      "If you hold an Ascend account",
      "What deletion removes",
      "What we may retain",
    ],
  },
];

describe("the three legal pages Meta requires", () => {
  it.each(REQUIRED)("$route exists", ({ route }) => {
    expect(existsSync(pageFor(route)), `${route} is missing`).toBe(true);
  });

  it.each(REQUIRED)("$route carries its required headings", ({ route, headings }) => {
    const content = readFileSync(pageFor(route), "utf8");
    for (const heading of headings) {
      expect(content, `${route} is missing the section "${heading}"`).toContain(
        heading
      );
    }
  });

  it.each(REQUIRED)("$route is indexable and needs no login", ({ route }) => {
    const content = readFileSync(pageFor(route), "utf8");
    expect(content).not.toMatch(/noindex/i);
    expect(content).not.toMatch(/redirect\(|auth\(\)|requireUser|getSession/);
  });

  it("lists all three in the sitemap", () => {
    const sitemap = readFileSync(join(ROOT, "src", "app", "sitemap.ts"), "utf8");
    for (const { route } of REQUIRED) {
      expect(sitemap, `${route} must be crawlable`).toContain(route);
    }
  });

  it("links to the deletion instructions from the privacy policy", () => {
    const privacy = readFileSync(pageFor("/legal/privacy"), "utf8");
    expect(privacy).toContain("/legal/data-deletion");
  });

  it("names the Meta permissions the reviewer checks for", () => {
    const privacy = readFileSync(pageFor("/legal/privacy"), "utf8");
    for (const permission of [
      "pages_messaging",
      "instagram_manage_messages",
      "pages_show_list",
      "instagram_basic",
      "pages_manage_metadata",
    ]) {
      expect(privacy, `the policy must name ${permission}`).toContain(permission);
    }
  });
});
