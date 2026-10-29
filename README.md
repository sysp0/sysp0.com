# sysp0.com

**Start at P0. Build the system.**

Source for [sysp0.com](https://sysp0.com): Reza's engineering system across backend, infrastructure, and data & AI.

Persian is the default home page (`/`); the English home is at `/en`.
Existing Persian pages remain under `/fa` (including `/fa` as a home-page alias),
and existing English inner-page URLs are unchanged. Language switches link to
the matching page; canonical URLs and the sitemap use `/` for the Persian home.

- `/me`: human identity
- `/sys/me`: engineering identity (#p0 Backend · #p1 Infrastructure · #p2 Data & AI)
- `/lab`: experiments
- `/log`: notes & observations

## Stack

Next.js (App Router, static export) · Docusaurus (bilingual Markdown blog) · TypeScript · Tailwind CSS v4. Hosted on Cloudflare Pages.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
npm run test:locales # check exported language routes after a build
npm run test:design  # check palette consistency and text contrast
```

Brand colors are Royal Blue (`#191970`) and Nitro Orange (`#FB5607`).
`content/brand.json` documents the palette; `src/app/globals.css` contains the CSS tokens.


## Deploy (Cloudflare Pages)

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Environment variable | `NODE_VERSION=22` |

Site content lives in `content/` (JSON + lab MDX); blog Markdown lives in `blog/`. Spec: `docs/structure.md`.

## Writing in the blog (Docusaurus)

Docusaurus 3.10.2 owns `/log` and `/fa/log`. Next.js owns the rest of the site.
The blog uses the site's logo, navy/orange palette, local fonts, header and footer.
Markdown headings, links, images, tables, syntax-highlighted code, tags, reading
time, RSS/Atom feeds and previous/next navigation work through Docusaurus.

- Persian posts: `blog/i18n/fa/docusaurus-plugin-content-blog/*.md`
- English posts: `blog/blog/*.md`
- Images: `public/` (reference as `/image-name.webp`)
- Theme: `blog/src/theme/` and `blog/src/css/custom.css`

Create a `.md` file in the appropriate folder. `.mdx` also works if a post needs
React components. Use an explicit `slug` so changing the filename/date does not
change the article URL. Keep it lowercase with hyphens, without slashes.

```md
---
slug: my-experiment
title: "عنوان نوشته"
date: 2026-10-28
category: career
tags: [Engineering, Career]
description: "مسئله چه بود و چه چیزی یاد گرفتم؟"
draft: true
---

با یک لحظهٔ مشخص شروع کن؛ جایی که مسئله خودش را نشان داد.

## مسئله و نقطهٔ شروع

چه چیزی قرار بود بسازی؟ چه محدودیتی داشتی؟

## تصمیم و آزمایش

چه راهی را امتحان کردی و چرا؟ چه چیزی کار نکرد؟

## نتیجه و شواهد

چه چیزی واقعاً تغییر کرد؟ عدد، نمونه و محدودیت را ثبت کن.

## آموخته و قدم بعدی

خواننده چه چیزی می‌تواند از این تجربه استفاده کند؟
```

Choose one fixed `category`: `data`, `infrastructure`, `ai`, or `career`.
These areas always appear in the blog filter; `tags` remain specific tools or
topics and link to their own illustrated archives. Use English tag labels in
both languages so their names and slugs stay consistent. Place `<!-- truncate -->`
after the opening paragraph: archive bundles load the excerpt, while the article
page keeps its complete content.

Run `npm run dev`, then open <http://localhost:3000/fa/log> or
<http://localhost:3000/log>. Saving Markdown updates the blog in development.
`draft: true` previews only in development; remove it or set it to `false` when
ready to publish. Drafts are absent from the production blog, home preview and
sitemap. Use matching slugs in both languages to pair articles; translations
are optional. The language switch falls back to the other blog index if needed.
The home previews read the same files as Docusaurus, without duplicate content.
Restart `npm run dev` after adding/removing a translation to refresh language
links; edits to article text reload automatically. Production builds always
recompute the translation pairs. Restart the dev servers after adding a new
theme override; Docusaurus resolves theme aliases at startup.

`npm run dev` starts Next.js on 3000 and Docusaurus on 3001 (English) / 3002
(Persian). Next.js proxies blog pages and assets to those servers. The separate
Docusaurus cache folders prevent locale processes from overwriting each other.
Use Node.js 22 or newer. Stop all three with Ctrl+C.

`npm run build` builds Next.js with Webpack, builds both Docusaurus locales,
then merges only blog pages and assets into `out/`. Deploy that **combined**
`out/` directory using the existing Cloudflare Pages settings. Next.js keeps
ownership of the home page, 404 and sitemap. No production proxy is required.
Run `npm run test:locales`, `npm run test:design`, `npm run test:content` and
`npm run test:blog-index` after building. The blog index lists posts newest first
and filters by the fixed Markdown `category` field. Posts with the same date keep
Docusaurus’s existing order. Cover artwork lives in `public/blog/images/`;
the Markdown `image` field uses its canonical absolute URL. The index serves
same-site covers locally during preview and loads a smaller WebP on phones.
Translated interface copy is imported into the client bundle so edits hot-reload.

Next.js agent guidance is enabled with `agentRules: true`; `AGENTS.md` points
agents to the version-matched docs in `node_modules/next/dist/docs/`.
`npm run build:blog` is useful for checking the blog alone; it does not update
`out/`. Publishing still requires the normal deployment; saving locally does
not publish. No browser writing panel is installed.

The `tinypool` and `serialize-javascript` overrides select patched versions of
Docusaurus's build dependencies; validate the full build when changing them.

For the planned Software Factory experiment, record the initial goal, decisions,
failures, time/cost measurements and remaining limits during the two weeks.
No article or public page for that experiment has been added.

References: [Docusaurus blog](https://docusaurus.io/docs/blog),
[localization](https://docusaurus.io/docs/i18n/tutorial).
