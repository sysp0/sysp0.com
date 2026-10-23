import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/me", "/sys/me", "/lab", "/log"].map((path) => ({ url: `https://sysp0.com${path}` }));
}
