export const LOCALES = ["en", "fa"] as const;
export type Locale = (typeof LOCALES)[number];

export const SITE_URL = "https://sysp0.com";

// Index pages that exist in both languages; article translations are checked separately.
export type PairedPath = "/" | "/me" | "/sys/me" | "/lab" | "/log";

/** Persian is the default home; existing inner-page URLs stay unchanged. */
export function localePath(locale: Locale, path: string): string {
  if (path === "/") return locale === "fa" ? "/" : "/en";
  if (locale === "en") return path;
  return `/fa${path}`;
}

/** The other language's version of a paired page. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fa" : "en";
}

/** Canonical URL and hreflang links for a page that exists in both languages. */
export function pairedAlternates(locale: Locale, path: PairedPath) {
  return {
    canonical: `${SITE_URL}${localePath(locale, path)}`,
    languages: {
      en: `${SITE_URL}${localePath("en", path)}`,
      fa: `${SITE_URL}${localePath("fa", path)}`,
      "x-default": `${SITE_URL}${localePath("fa", path)}`,
    },
  };
}
