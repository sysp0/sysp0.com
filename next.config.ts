import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
  agentRules: true,
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/` for Cloudflare Pages.
  output: "export",
  images: { unoptimized: true },
  // Two language root layouts, so the 404 page lives in app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default function config(phase: string): NextConfig {
  if (phase !== PHASE_DEVELOPMENT_SERVER) return nextConfig;
  return {
    ...nextConfig,
    output: undefined,
    async rewrites() {
      return { beforeFiles: [
        { source: "/fa/log/:path*", destination: "http://127.0.0.1:3002/fa/log/:path*" },
        { source: "/fa/assets/:path*", destination: "http://127.0.0.1:3002/fa/assets/:path*" },
        { source: "/fa/:file.:ext(js|json|css)", destination: "http://127.0.0.1:3002/fa/:file.:ext" },
        { source: "/log/:path*", destination: "http://127.0.0.1:3001/log/:path*" },
        { source: "/assets/:path*", destination: "http://127.0.0.1:3001/assets/:path*" },
        { source: "/:file.:ext(js|json|css)", destination: "http://127.0.0.1:3001/:file.:ext" },
      ], afterFiles: [], fallback: [] };
    },
  };
}
