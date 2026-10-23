import fs from "node:fs";
import path from "node:path";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import brand from "../content/brand.json";
import site from "../content/site.json";
import { prismTheme } from "./src/theme/prismTheme";

const { colors } = brand;

// Docusaurus is the /log section of sysp0.com: notes at /log/<slug>, research at /log/research/...
// The Next.js build copies this site's output into out/log (see scripts/copy-log.mjs).

// Cloudflare Web Analytics, same token as the main site. Production builds only, and only once a token is set.
const beaconToken = process.env.NODE_ENV === "production" ? site.analytics.cfBeaconToken.trim() : "";

// The Research nav link appears once there is at least one page to read: a published page in production,
// or any page (drafts included) while writing locally. `research/index.md` is unlisted (hidden from nav,
// sitemap and search) and only keeps the docs plugin alive when no real page exists yet.
const isProd = process.env.NODE_ENV === "production";

function hasResearch(dir = path.join(__dirname, "research")): boolean {
  return fs.readdirSync(dir, { withFileTypes: true }).some((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return hasResearch(file);
    if (!/\.mdx?$/.test(entry.name) || file === path.join(__dirname, "research", "index.md")) return false;
    const isDraft = /^draft:\s*true\s*$/m.test(fs.readFileSync(file, "utf8").split(/^---\s*$/m)[1] ?? "");
    return !isDraft || !isProd;
  });
}

const research = hasResearch();

const config: Config = {
  title: "SYSP0 log",
  tagline: site.log.subtitle,
  favicon: "img/favicon.ico",
  url: "https://sysp0.com",
  baseUrl: "/log/",
  trailingSlash: false,
  onBrokenLinks: "throw",
  markdown: { mermaid: true, hooks: { onBrokenMarkdownLinks: "throw" } },

  // Persian is prepared (RTL) but has no translated notes yet. Builds use `--locale en`, so no /log/fa is published.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fa"],
    localeConfigs: {
      en: { label: "English", direction: "ltr", htmlLang: "en" },
      fa: { label: "فارسی", direction: "rtl", htmlLang: "fa" },
    },
  },

  scripts: beaconToken
    ? [
        {
          src: "https://static.cloudflareinsights.com/beacon.min.js",
          defer: true,
          "data-cf-beacon": JSON.stringify({ token: beaconToken }),
        },
      ]
    : [],

  presets: [
    [
      "classic",
      {
        docs: { path: "research", routeBasePath: "research", sidebarPath: "./sidebars.ts", breadcrumbs: true },
        blog: {
          path: "blog",
          routeBasePath: "/",
          blogTitle: "SYSP0 log",
          blogDescription: site.log.intro,
          blogSidebarTitle: "Recent notes",
          blogSidebarCount: "ALL",
          postsPerPage: 10,
          showReadingTime: true,
          onInlineTags: "ignore",
          onInlineAuthors: "throw",
          feedOptions: { type: ["rss", "atom"], title: "SYSP0 log", description: site.log.intro, copyright: site.footer.copyright },
        },
        pages: false,
        theme: { customCss: "./src/css/custom.css" },
        sitemap: { changefreq: null, priority: null },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    "@docusaurus/theme-mermaid",
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexBlog: true,
        blogRouteBasePath: "/",
        indexDocs: true,
        docsDir: "research",
        docsRouteBasePath: "research",
        indexPages: false,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcutHint: false,
      },
    ],
  ],

  themeConfig: {
    image: "img/og.png",
    colorMode: { defaultMode: "light", disableSwitch: true, respectPrefersColorScheme: false },
    // Navbar and Footer are swizzled (src/theme) to match the main site, so these items only feed the search plugin.
    navbar: { title: "SYSP0", items: [{ type: "search", position: "right" }] },
    prism: {
      theme: prismTheme,
      darkTheme: prismTheme,
      additionalLanguages: ["bash", "python", "sql", "yaml", "json", "docker", "java", "scala", "toml"],
    },
    mermaid: {
      theme: { light: "base", dark: "base" },
      options: {
        themeVariables: {
          fontFamily: "Inter Variable, Inter, sans-serif",
          primaryColor: colors.chipBg,
          primaryBorderColor: colors.carbon,
          primaryTextColor: colors.ink,
          lineColor: colors.carbon,
          secondaryColor: colors.badgeBg,
          tertiaryColor: colors.cream,
          noteBkgColor: colors.badgeBg,
          noteBorderColor: colors.orange,
        },
      },
    },
    docs: { sidebar: { hideable: false } },
    metadata: [{ name: "twitter:card", content: "summary_large_image" }],
  } satisfies Preset.ThemeConfig,

  // Read by src/theme/Navbar to show the Research link only when there is something to read.
  customFields: { hasResearch: research },
};

export default config;
