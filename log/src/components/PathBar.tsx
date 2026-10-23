// sysp0.com/log/<path> at the top of every page, like <PathBar> on the main site.
export function PathBar({ path }: { path: string }) {
  const segments = path.split("/").filter(Boolean);
  const chars = "sysp0.com".length + segments.reduce((n, s) => n + s.length + 1, 0);
  return (
    <p className="sysp0-pathbar">
      <span className="sysp0-pathbar__typed" style={{ "--chars": chars } as React.CSSProperties}>
        sysp0.com
        {segments.map((segment, i) => (
          <span key={i}>
            /<b>{segment}</b>
          </span>
        ))}
      </span>
      <span className="sysp0-pathbar__caret" aria-hidden="true">
        _
      </span>
    </p>
  );
}
