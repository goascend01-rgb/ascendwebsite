import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ROLES } from "@/lib/staffing";

/* The legal pages must be crawlable and reachable without a login: Meta's
   reviewer needs them, and a 404 there fails app review. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/platform", priority: 0.9, changeFrequency: "monthly" },
    { path: "/network", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/security", priority: 0.7, changeFrequency: "monthly" },
    { path: "/staffing", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/apply", priority: 0.5, changeFrequency: "monthly" },
    { path: "/legal/privacy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.4, changeFrequency: "yearly" },
    { path: "/legal/data-deletion", priority: 0.4, changeFrequency: "yearly" },
  ];

  const roleRoutes = ROLES.map((role) => ({
    path: `/staffing/roles/${role.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...routes, ...roleRoutes].map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
