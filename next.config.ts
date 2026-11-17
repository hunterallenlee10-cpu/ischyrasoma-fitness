import type { NextConfig } from "next";

const isLive = process.env.NEXT_PUBLIC_SITE_MODE === "live";

const nextConfig: NextConfig = {
  // Per-request rendering with a cached feed fetch keeps "Today" honest. See implementation_kickstart.md.
  cacheComponents: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    if (isLive) return [];
    // Demo mode: every response (pages, images, files) carries the noindex header.
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
