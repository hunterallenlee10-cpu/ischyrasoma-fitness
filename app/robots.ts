import type { MetadataRoute } from "next";
import { isLive, siteUrl } from "@/lib/business";

// AI training crawlers stay out in both modes.
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "PerplexityBot",
  "Bytespider",
  "Amazonbot",
  "meta-externalagent",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  // Demo mode still lets search engines in, so they can read the noindex tag and header.
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, disallow: "/" },
    ],
    ...(isLive ? { sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl } : {}),
  };
}
