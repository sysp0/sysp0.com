import type { MetadataRoute } from "next";
import { getLab, getLog } from "@/lib/content";
import { localePath, LOCALES, SITE_URL, type PairedPath } from "@/lib/i18n";

export const dynamic = "force-static";

const PAIRED: PairedPath[] = ["/", "/me", "/sys/me", "/lab"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paired = PAIRED.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}${localePath(l, path)}`]),
        ),
      },
    })),
  );
  // The log is Docusaurus (it also writes /log/sitemap.xml with research pages, tags and the archive).
  const english = [
    "/log",
    ...getLab().map((e) => `/lab/${e.slug}`),
    ...getLog().map((e) => `/log/${e.slug}`),
  ].map((path) => ({ url: `${SITE_URL}${path}` }));
  return [...paired, ...english];
}
