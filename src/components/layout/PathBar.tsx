// Shows the current URL as a path, e.g. sysp0.com/sys/me. The last segment is orange.
export function PathBar({ path }: { path: string }) {
  const segments = path.split("/").filter(Boolean);
  return (
    <p className="font-mono text-base text-muted sm:text-xl">
      sysp0.com
      {segments.length === 0 && <span className="text-orange">/</span>}
      {segments.map((segment, i) => (
        <span key={i}>
          /
          <span className={i === segments.length - 1 ? "font-bold text-orange" : "font-bold text-carbon"}>{segment}</span>
        </span>
      ))}
    </p>
  );
}
