import type { Metadata } from "next";
import { SITE } from "./site";

/* Per-route metadata, built in one place.

   Two things were wrong before this existed:

     1. openGraph and twitter were set ONCE in the root layout and no page
        overrode them, so every route shared the homepage's social card.
        Next does not derive them from `title` and `description`, so a page
        setting those alone changed nothing a link preview would show.

     2. The layout also pinned `og:url` to the site root, which contradicted
        each page's own rel=canonical on the same document.

   `pageMetadata` makes the canonical the single input those all derive from,
   so they cannot disagree again. */

export function pageMetadata({
  title,
  description,
  path,
  robots,
}: {
  /** Without the brand. The layout template appends it. */
  title: string;
  description: string;
  /** Route path, leading slash. */
  path: string;
  robots?: Metadata["robots"];
}): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  /* The social card carries the brand, because it is read out of context
     where the template that normally supplies it is not present. */
  const social = path === "/" ? `${SITE.name} · ${title}` : `${title} · ${SITE.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: social,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
    },
    ...(robots ? { robots } : {}),
  };
}

/* Schema.org requires an absolute URL for a ListItem's `item`. Every
   hand-written breadcrumb block on this site passed a bare path, which makes
   the markup invalid and the breadcrumb ineligible as a rich result. */
export function breadcrumbLd(
  trail: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${SITE.url}${step.path === "/" ? "" : step.path}`,
    })),
  };
}
