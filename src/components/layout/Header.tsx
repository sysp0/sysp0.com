import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { EnTag } from "@/components/ui/Entries";
import {
  localePath,
  otherLocale,
  type Locale,
  type PairedPath,
} from "@/lib/i18n";
import { getSite } from "@/lib/site";

const NAV = ["/me", "/sys/me", "/lab", "/log"] as const;
// Pages that only exist in English (the log and lab entries) keep their English URL on the Persian site.
const ENGLISH_ONLY = new Set<string>(["/log"]);

type Props = {
  locale?: Locale;
  /** The page's English path, when it also exists in Persian. The language switch goes to its counterpart. */
  path?: PairedPath;
  active?: (typeof NAV)[number];
};

export function Header({ locale = "en", path, active }: Props) {
  const { ui } = getSite(locale);
  const other = otherLocale(locale);
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-4 border-b border-line bg-cream/85 px-4 backdrop-blur-md sm:h-[88px] sm:gap-6 sm:px-10 lg:px-20">
      <Link href={localePath(locale, "/")} aria-label="sysp0.com home">
        <Logo />
      </Link>
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-8">
        <nav className="flex gap-3  overflow-x-auto font-mono text-[13px] sm:gap-10 sm:text-base">
          {NAV.map((item) => {
            const english = locale === "fa" && ENGLISH_ONLY.has(item);
            return (
              <Link
                key={item}
                href={english ? item : localePath(locale, item)}
                dir="ltr"
                aria-current={item === active ? "page" : undefined}
                className={`flex items-center gap-1.5 py-1.5 whitespace-nowrap ${
                  item === active
                    ? "font-bold text-orange shadow-[inset_0_-2px_0_var(--color-orange)]"
                    : "font-medium text-ink transition-[color,box-shadow] hover:text-orange hover:shadow-[inset_0_-2px_0_var(--color-orange)]"
                }`}
              >
                {item}
                {english && (
                  <span className="hidden sm:inline">
                    <EnTag />
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <Link
          href={localePath(other, path ?? "/")}
          hrefLang={other}
          lang={other}
          aria-label={ui.switchLabel}
          className="shrink-0 rounded-full px-2 py-0.5 font-mono text-xs font-bold text-carbon shadow-[inset_0_0_0_1.5px_var(--color-carbon)] transition-colors hover:bg-carbon hover:text-white sm:text-sm"
        >
          {ui.switchTo}
        </Link>
      </div>
    </header>
  );
}
