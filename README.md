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

Next.js (App Router, static export) · TypeScript · Tailwind CSS v4 · MDX. Hosted on Cloudflare Pages.

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

Content lives in `content/` (JSON + MDX). Spec: `docs/structure.md`.
