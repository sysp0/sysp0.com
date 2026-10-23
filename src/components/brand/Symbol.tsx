type Props = {
  size?: number;
  /** "light" = carbon strokes for light backgrounds, "dark" = white strokes for carbon backgrounds */
  tone?: "light" | "dark";
  /** Draws the branches from the root, then sends packets down them. For the large hero symbol only. */
  live?: boolean;
  className?: string;
};

const UPPER = "M30 30 V33 A14 14 0 0 0 44 47 H60";
const LOWER = "M30 30 V62 A17 17 0 0 0 47 79 H60";

// Root Node: orange root (P0) feeding a trunk that branches into two systems.
export function Symbol({ size = 34, tone = "light", live = false, className }: Props) {
  const ink = tone === "light" ? "#10316B" : "#FFFFFF";
  if (!live) {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true" overflow="visible">
        <path
          d={`${UPPER} ${LOWER}`}
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

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`symbol-live ${className ?? ""}`}
      aria-hidden="true"
      overflow="visible"
    >
      {[UPPER, LOWER].map((d, i) => (
        <path
          key={d}
          className="branch"
          d={d}
          pathLength={1}
          fill="none"
          stroke={ink}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animationDelay: `${300 + i * 150}ms` }}
        />
      ))}
      {[UPPER, LOWER].map((d, i) => (
        <circle key={`packet-${d}`} className="packet" r="3.2" fill="#F96E2A" opacity="0">
          <animateMotion path={d} dur="1.6s" begin={`${1.6 + i * 0.9}s`} repeatCount="indefinite" />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.85;1"
            dur="1.6s"
            begin={`${1.6 + i * 0.9}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      <rect className="node" x="60" y="36" width="22" height="22" rx="7" fill={ink} style={{ animationDelay: "1.1s" }} />
      <rect className="node" x="60" y="68" width="22" height="22" rx="7" fill={ink} style={{ animationDelay: "1.25s" }} />
      <circle className="root-ping" cx="30" cy="20" r="12" fill="none" stroke="#F96E2A" strokeWidth="2" />
      <circle className="node" cx="30" cy="20" r="12" fill="#F96E2A" />
    </svg>
  );
}
