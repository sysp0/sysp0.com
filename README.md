# sysp0.com

**Start at P0. Build the system.**

Source for [sysp0.com](https://sysp0.com): Reza's engineering system across backend, infrastructure, and data & AI.

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
```

## Deploy (Cloudflare Pages)

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Environment variable | `NODE_VERSION=22` |

Content lives in `content/` (JSON + MDX). Spec: `docs/structure.md`.
