type Props = {
  size?: number;
  /** "light" = carbon strokes for light backgrounds, "dark" = white strokes for carbon backgrounds */
  tone?: "light" | "dark";
  className?: string;
};

// Root Node: orange root (P0) feeding a trunk that branches into two systems.
export function Symbol({ size = 34, tone = "light", className }: Props) {
  const ink = tone === "light" ? "#10316B" : "#FFFFFF";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true" overflow="visible">
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
