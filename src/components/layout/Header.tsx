import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { localePath, type Locale, type PairedPath } from "@/lib/i18n";
import { getSite } from "@/lib/site";
import { NavLink } from "./NavLink";

type Props = {
  locale?: Locale;
  /** The page's English path, when it also exists in Persian. The language switch goes to its counterpart. */
  path?: PairedPath | `/log/${string}`;
  active?: Exclude<PairedPath, "/">;
};

export function Header({ locale = "en", path, active }: Props) {
  const { ui, nav } = getSite(locale);
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-cream/95 backdrop-blur-md">
      <div className="site-header mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-16">
        <Link href={localePath(locale, "/")} aria-label={ui.homeLabel} className="site-brand flex min-h-11 w-fit items-center">
          <Logo />
        </Link>
        <nav dir={locale === "fa" ? "rtl" : "ltr"} aria-label={ui.navigationLabel} className="site-nav">
          {nav.map((item) => {
            return (
              <NavLink
                key={item.path}
                href={localePath(locale, item.path)}
                aria-current={item.path === active ? "page" : undefined}
                className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 transition-colors md:px-4 ${
                  item.path === active
                    ? "bg-carbon font-bold text-white"
                    : "text-carbon hover:bg-chip"
                }`}
              >
                <span className="font-sans text-xs font-semibold sm:text-sm">{item.title}</span>
                <span dir="ltr" className="flex items-center gap-1 font-mono text-[10px] opacity-75 sm:text-xs">
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>
        <details className="language-switch">
          <summary dir="ltr" aria-label={locale === "fa" ? "انتخاب زبان" : "Choose language"} title={locale === "fa" ? "انتخاب زبان" : "Choose language"}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" />
            </svg>
            <span lang="en">{locale === "fa" ? "Fa" : "En"}</span>
          </summary>
          <div className="language-options" dir="rtl">
            {(["en", "fa"] as const).map((language) => (
              <a key={language} href={localePath(language, path ?? "/")} hrefLang={language} lang={language} aria-current={language === locale ? "true" : undefined}>
                <span>{language === "fa" ? "فارسی | Farsi" : "انگلیسی | English"}</span>
                <span aria-hidden="true">{language === locale ? "✓" : ""}</span>
              </a>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
