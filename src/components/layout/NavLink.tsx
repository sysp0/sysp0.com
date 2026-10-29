"use client";

import Link from "next/link";

// Next.js reuses the current route without resetting its scroll position.
export function NavLink({
  href,
  children,
  className,
  "aria-current": current,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
  "aria-current"?: "page";
}) {
  if (/^\/(?:fa\/)?log(?:\/|$)/.test(href)) {
    return <a href={href} className={className} aria-current={current}>{children}</a>;
  }
  return (
    <Link
      href={href}
      className={className}
      aria-current={current}
      onNavigate={() => {
        if (window.location.pathname === href) {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }}
    >
      {children}
    </Link>
  );
}
