import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { localePath, type Locale } from "@/lib/i18n";
import { getLinks } from "@/lib/links";
import { getSite } from "@/lib/site";

const PATHS = ["/me", "/sys/me", "/lab", "/log"];

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const { footer } = getSite(locale);
  const links = getLinks();
  return (
    <footer className="flex flex-col gap-6 bg-carbon px-4 py-12 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-20">
      <div className="flex flex-col gap-4">
        <Logo tone="dark" />
        <p dir="ltr" className="font-mono text-lg">
          There is always another <span className="text-orange">P0</span>.
        </p>
      </div>
      <div className="flex flex-col gap-2 font-mono text-sm text-on-carbon-soft sm:items-end">
        <p dir="ltr" className="flex gap-4">
          {PATHS.map((p) => (
            <Link
              key={p}
              href={locale === "fa" && p === "/log" ? p : localePath(locale, p)}
              className="transition-colors hover:text-orange"
            >
              {p}
            </Link>
          ))}
        </p>
        <p dir="ltr" className="flex gap-4">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              target={l.key === "email" ? undefined : "_blank"}
              rel="noreferrer"
              className="transition-colors hover:text-orange"
            >
              {l.key}
            </a>
          ))}
        </p>
        <p dir="ltr">{footer.copyright}</p>
      </div>
    </footer>
  );
}
