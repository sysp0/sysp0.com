# sysp0.com

**Start at P0. Build the system.**

Source for [sysp0.com](https://sysp0.com): Reza's engineering system across backend, infrastructure, and data & AI.

- `/me`: human identity
- `/sys/me`: engineering identity (#p0 Backend · #p1 Infrastructure · #p2 Data & AI)
- `/lab`: experiments
- `/log`: notes & observations (Docusaurus, see below)

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

## The log (`/log`)

`/log` is a Docusaurus site in `log/`, served from the same domain with `baseUrl: '/log/'`. `npm run build` runs `next build`, then builds Docusaurus and copies it to `out/log`.

- **Notes:** `log/blog/<date>-<slug>.mdx`, URL `/log/<slug>` (set `slug:` in the frontmatter, no dates in URLs). Put `{/* truncate */}` after the intro paragraph. `draft: true` hides a note in production.
- **Research:** `log/research/<category>/<page>.md`, URL `/log/research/<category>/<page>`. Each folder is a sidebar category named by its `_category_.json`. Use `draft: true` while writing. The Research link in the header appears once one published page exists.
- Code blocks use Prism (brand theme), diagrams use Mermaid (` ```mermaid `), search is local and offline, RSS/Atom are at `/log/rss.xml` and `/log/atom.xml`.
- Write with `npm run dev:log` (http://localhost:3001/log/). The home page reads the latest notes from `log/blog`.
- Persian is prepared (`i18n` in `log/docusaurus.config.ts`) but not published: builds use `--locale en`.

Content lives in `content/` (JSON + MDX). Spec: `docs/structure.md`.
