import type { MetadataRoute } from "next";
import { getLab, getLog } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/me",
    "/sys/me",
    "/lab",
    "/log",
    ...getLab().map((e) => `/lab/${e.slug}`),
    ...getLog().map((e) => `/log/${e.slug}`),
  ];
  return paths.map((path) => ({ url: `https://sysp0.com${path}` }));
}
