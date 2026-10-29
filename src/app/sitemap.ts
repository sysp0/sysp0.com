import type { MetadataRoute } from "next";
import { getLab, getLog } from "@/lib/content";
import { localePath, LOCALES, SITE_URL, type PairedPath } from "@/lib/i18n";

export const dynamic = "force-static";

const PAIRED: PairedPath[] = ["/", "/me", "/sys/me", "/lab", "/log"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paired = PAIRED.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])),
      },
    })),
  );
  const english = [
    ...getLab().map((e) => `/lab/${e.slug}`),
  ].map((path) => ({ url: `${SITE_URL}${path}` }));
  const log = LOCALES.flatMap((locale) => getLog(locale).map((entry) => {
    const path = `/log/${entry.slug}`;
    return {
      url: `${SITE_URL}${localePath(locale, path)}`,
      alternates: {
        languages: Object.fromEntries(LOCALES.filter((l) => getLog(l).some((e) => e.slug === entry.slug))
          .map((l) => [l, `${SITE_URL}${localePath(l, path)}`])),
      },
    };
  }));
  return [...paired, ...english, ...log];
}
