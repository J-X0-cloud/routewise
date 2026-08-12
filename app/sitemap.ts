import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const routes = ["", "/platform", "/solutions", "/pricing"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
