import type { Metadata, Viewport } from "next";
import {
  SITE_URL,
  pairedAlternates,
  type Locale,
  type PairedPath,
} from "./i18n";
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
  const url = locale === "fa" ? `${SITE_URL}/fa` : SITE_URL;
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: "Start at P0. Build the system.",
      url,
      siteName: "SYSP0",
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "SYSP0: Start at P0. Build the system.",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
    icons,
    manifest: "/site.webmanifest",
  };
}

/** Share card fields for one page. Replaces the layout's openGraph object, so images are restated. */
export function pageOpenGraph(
  locale: Locale,
  {
    title,
    description,
    url,
  }: { title: string; description: string; url: string },
) {
  return {
    title,
    description,
    url,
    siteName: "SYSP0",
    type: "website" as const,
    locale: locale === "fa" ? "fa_IR" : "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SYSP0: Start at P0. Build the system.",
      },
    ],
  };
}

export const rootViewport: Viewport = { themeColor: "#10316B" };

const DESCRIPTION_KEY = {
  "/me": "me",
  "/sys/me": "sysMe",
  "/lab": "lab",
} as const;

/** Title, description, canonical and hreflang links for a page that exists in both languages. */
export function pairedMetadata(locale: Locale, path: PairedPath): Metadata {
  const alternates = pairedAlternates(locale, path);
  const meta = getSite(locale).meta;
  const title = path === "/" ? meta.title : `${path} · SYSP0`;
  const description =
    path === "/" ? meta.description : meta[DESCRIPTION_KEY[path]];
  return {
    ...(path === "/" ? {} : { title }),
    description,
    alternates,
    openGraph: pageOpenGraph(locale, {
      title,
      description,
      url: alternates.canonical,
    }),
  };
}
