import type { Metadata, Viewport } from "next";
import { SITE_URL, localePath, pairedAlternates, type Locale, type PairedPath } from "./i18n";
import { getSite } from "./site";

// Favicon set from the SYSP0 brand kit, served from public/.
const icons: Metadata["icons"] = {
  icon: [
    { url: "/favicon.ico", sizes: "48x48" },
    { url: "/favicon.svg", type: "image/svg+xml" },
    { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
  ],
  apple: "/apple-touch-icon.png",
};

export function rootMetadata(locale: Locale): Metadata {
  const { meta } = getSite(locale);
  const url = `${SITE_URL}${localePath(locale, "/")}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: "SYSP0: Start at P0. Build the system.",
    description: meta.description,
    openGraph: {
      title: "SYSP0",
      description: "Start at P0. Build the system.",
      url,
      siteName: "SYSP0",
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "SYSP0: Start at P0. Build the system." }],
    },
    twitter: { card: "summary_large_image" },
    icons,
    manifest: "/site.webmanifest",
  };
}

export const rootViewport: Viewport = { themeColor: "#191970" };

const DESCRIPTION_KEY = { "/me": "me", "/sys/me": "sysMe", "/lab": "lab" } as const;

/** Title, description, canonical and hreflang links for a page that exists in both languages. */
export function pairedMetadata(locale: Locale, path: PairedPath): Metadata {
  const alternates = pairedAlternates(locale, path);
  if (path === "/") return { alternates };
  return {
    title: `${path} · SYSP0`,
    description: getSite(locale).meta[DESCRIPTION_KEY[path]],
    alternates,
  };
}
