import Link from "next/link";

export function SiteLink(props: React.ComponentProps<"a"> & { href: string }) {
  return /^\/(?:fa\/)?log(?:\/|$)/.test(props.href) ? <a {...props} /> : <Link {...props} />;
}
