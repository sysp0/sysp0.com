import Link from "next/link";

// Shared navigation action: readable label, optional command caption, and a directional cue.
export function CdLink({
  href,
  children,
  variant = "primary",
  caption,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  caption?: string;
}) {
  return (
    <Link
      href={href}
      className={`cd-link cd-link-${variant}`}
    >
      <span className="flex flex-col gap-1 text-start">
        <span className="text-sm font-bold sm:text-base">{children}</span>
        {caption && <bdi dir="ltr" className="font-mono text-[11px] font-medium">{caption}</bdi>}
      </span>
      <span aria-hidden="true" className="cd-link-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5m6-6-6 6 6 6" />
        </svg>
      </span>
    </Link>
  );
}
