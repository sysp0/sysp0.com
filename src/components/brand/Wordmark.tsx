type Props = {
  /** "light" = carbon SYS for light backgrounds, "dark" = white SYS for carbon backgrounds */
  tone?: "light" | "dark";
  className?: string;
};

// SYSP0 wordmark A from the brand kit: custom monoline letters. SYS follows the tone, P0 is always orange.
export function Wordmark({ tone = "light", className }: Props) {
  const ink = tone === "light" ? "#10316B" : "#FFFFFF";
  const line = { fill: "none", strokeWidth: 16, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="-16 -16 448 132" className={className} role="img" aria-label="SYSP0">
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
