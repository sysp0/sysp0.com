import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/` for Cloudflare Pages.
  output: "export",
  images: { unoptimized: true },
  // Two language root layouts, so the 404 page lives in app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
