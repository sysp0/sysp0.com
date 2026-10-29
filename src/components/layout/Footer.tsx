import { SiteLink as Link } from "@/components/ui/SiteLink";
import { Logo } from "@/components/brand/Logo";
import { localePath, type Locale } from "@/lib/i18n";
import { getSite } from "@/lib/site";

const PATHS = ["/me", "/sys/me", "/lab", "/log"];

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const { footer } = getSite(locale);
  return (
    <footer className="bg-carbon text-white">
      <div dir="ltr" className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
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
              href={localePath(locale, p)}
              className="inline-flex min-h-11 items-center transition-colors hover:text-orange"
            >
              {p}
            </Link>
          ))}
        </p>
        <p dir="ltr">{footer.copyright}</p>
      </div>
      </div>
    </footer>
  );
}
