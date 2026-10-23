// Shows the current URL as a path, e.g. sysp0.com/sys/me, typed out like a shell. The last segment is orange.
export function PathBar({ path }: { path: string }) {
  const segments = path.split("/").filter(Boolean);
  const chars = "sysp0.com".length + segments.reduce((n, s) => n + s.length + 1, 0) + (segments.length === 0 ? 1 : 0);
  return (
    <p className="font-mono text-base text-muted sm:text-xl">
      <span className="typed" style={{ "--chars": chars } as React.CSSProperties}>
        sysp0.com
        {segments.length === 0 && <span className="text-orange">/</span>}
        {segments.map((segment, i) => (
          <span key={i}>
            /
            <span className={i === segments.length - 1 ? "font-bold text-orange" : "font-bold text-carbon"}>
              {segment}
            </span>
          </span>
        ))}
      </span>
      <span className="caret text-orange" aria-hidden="true">
        _
      </span>
    </p>
  );
}
