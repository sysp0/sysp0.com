import Link from "next/link";

// /log is a separate Docusaurus site served from the same domain, so it must be a normal link: Next's client router can't reach it.
export function SiteLink({
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  if (
    typeof href === "string" &&
    (href === "/log" || href.startsWith("/log/"))
  ) {
    return <a href={href} {...(props as React.ComponentProps<"a">)} />;
  }
  return <Link href={href} {...props} />;
}
