import { ImageResponse } from "next/og";
import { getLab } from "@/lib/content";

const size = { width: 1200, height: 630 };

// Served as /og/lab/<slug>.png. A route handler with a .png name, because the opengraph-image convention
// exports an extensionless file that static hosting can't give an image content type.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getLab().map((e) => ({ file: `${e.slug}.png` }));
}

const CARBON = "#10316B";
const ORANGE = "#F96E2A";

// Share card for /lab/[slug], drawn at build time: title on carbon with the wordmark. Brand tokens only.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const slug = (await params).file.replace(/\.png$/, "");
  const entry = getLab().find((e) => e.slug === slug);
  const line = {
    fill: "none",
    strokeWidth: 16,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: CARBON,
        padding: "72px 80px",
        color: "#FFFFFF",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <svg width="260" height="76" viewBox="-16 -16 448 132">
          <path
            d="M64 0 H25 A25 25 0 0 0 0 25 A25 25 0 0 0 25 50 H39 A25 25 0 0 1 64 75 A25 25 0 0 1 39 100 H0 M88 0 L120 52 L152 0 M120 52 V100 M240 0 H201 A25 25 0 0 0 176 25 A25 25 0 0 0 201 50 H215 A25 25 0 0 1 240 75 A25 25 0 0 1 215 100 H176"
            stroke="#FFFFFF"
            {...line}
          />
          <path
            d="M264 100 V0 H303 A25 25 0 0 1 303 50 H264"
            stroke={ORANGE}
            {...line}
          />
          <rect
            x="352"
            y="0"
            width="64"
            height="100"
            rx="32"
            stroke={ORANGE}
            {...line}
          />
          <circle cx="384" cy="50" r="10" fill={ORANGE} />
        </svg>
        <div
          style={{ fontSize: 30, color: "#B9C5DD" }}
        >{`sysp0.com/lab/${slug}`}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{ width: 96, height: 8, background: ORANGE, borderRadius: 4 }}
        />
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {entry?.title ?? slug}
        </div>
        <div
          style={{
            fontSize: 34,
            lineHeight: 1.35,
            color: "#B9C5DD",
            maxWidth: 980,
          }}
        >
          {entry?.summary}
        </div>
      </div>
    </div>,
    size,
  );
}
