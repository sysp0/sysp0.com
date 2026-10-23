// The SYSP0 symbol and wordmark A from the brand kit, same shapes as src/components/brand on the main site.
type Tone = "light" | "dark";

export function Symbol({ tone = "light", size = 34 }: { tone?: Tone; size?: number }) {
  const ink = tone === "light" ? "#10316B" : "#FFFFFF";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" overflow="visible">
      <path
        d="M30 30 V33 A14 14 0 0 0 44 47 H60 M30 30 V62 A17 17 0 0 0 47 79 H60"
        fill="none"
        stroke={ink}
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="60" y="36" width="22" height="22" rx="7" fill={ink} />
      <rect x="60" y="68" width="22" height="22" rx="7" fill={ink} />
      <circle cx="30" cy="20" r="12" fill="#F96E2A" />
    </svg>
  );
}

export function Wordmark({ tone = "light", height = 24 }: { tone?: Tone; height?: number }) {
  const ink = tone === "light" ? "#10316B" : "#FFFFFF";
  const line = { fill: "none", strokeWidth: 16, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="-16 -16 448 132" style={{ height, width: "auto" }} role="img" aria-label="SYSP0">
      <path
        d="M64 0 H25 A25 25 0 0 0 0 25 A25 25 0 0 0 25 50 H39 A25 25 0 0 1 64 75 A25 25 0 0 1 39 100 H0 M88 0 L120 52 L152 0 M120 52 V100 M240 0 H201 A25 25 0 0 0 176 25 A25 25 0 0 0 201 50 H215 A25 25 0 0 1 240 75 A25 25 0 0 1 215 100 H176"
        stroke={ink}
        {...line}
      />
      <path d="M264 100 V0 H303 A25 25 0 0 1 303 50 H264" stroke="#F96E2A" {...line} />
      <rect x="352" y="0" width="64" height="100" rx="32" stroke="#F96E2A" {...line} />
      <circle cx="384" cy="50" r="10" fill="#F96E2A" />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: Tone }) {
  return (
    <span className="sysp0-logo" dir="ltr">
      <Symbol tone={tone} />
      <Wordmark tone={tone} />
    </span>
  );
}
