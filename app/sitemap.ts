import type { MetadataRoute } from "next";
import { isLive, siteUrl } from "@/lib/business";

// The build date is the page's real last-modified date. Demo mode lists nothing.
const builtAt = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isLive) return [];
  return [{ url: `${siteUrl}/`, lastModified: builtAt, changeFrequency: "daily", priority: 1 }];
}
