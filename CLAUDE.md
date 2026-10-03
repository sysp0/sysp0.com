# sysp0.com

Personal engineering site for Reza. Brand: SYSP0 ("Start at P0. Build the system.").
Full spec: `docs/structure.md`. Content lives in `content/` (JSON + MDX), never hardcoded in components.

## Stack
Next.js 16 App Router + TypeScript, static export (`output: 'export'`), Tailwind v4, MDX, Zod, Shiki. Deploy: Cloudflare Pages (static `out/`).

## Commands
- `npm run dev` / `npm run build` / `npm run lint` / `npx playwright test`

## Rules
- Routes are concepts, not folders: `/`, `/me`, `/sys/me`, `/lab`, `/lab/[slug]`, `/log`, `/log/[slug]`. Never add `/about`, `/blog`, `/projects`.
- Nav items are the paths themselves (`/me /sys/me /lab /log`). Buttons read like commands: `cd /sys/me`.
- Every page shows its path at the top via `<PathBar>` (e.g. `sysp0.com/sys/me`).
- On `/sys/me`, "what changed" is the largest text in each layer; stack and company are secondary.
- Colors only from tokens (`content/brand.json` → `globals.css @theme`): carbon #10316B, orange #F96E2A, cream #F5F4EF (page bg), ink #0F1B33, muted #5E6577, line #E2DFD6.
- Fonts: JetBrains Mono (paths, labels, nav, buttons, wordmark), Space Grotesk (headings), Inter (body).
- Wordmark: SYS carbon (white on dark) + P0 orange. Logo root circle is always orange.
- Avoid (owner dislikes): dotted grids, big background circles, light-themed terminals, pure black next to light colors, the word `me` after a shell prompt.
- Site copy is English. Keep layout i18n-ready for a future `/fa` RTL version (Vazirmatn).
- Entries with `placeholder: true` are hidden in production builds.
- Mobile-first responsive; desktop reference width 1440 with 80px gutters.
- Make small, comparable changes; keep the previous good version when exploring alternatives.

@AGENTS.md
