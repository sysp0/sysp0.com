import { SiteLink as Link } from "@/components/ui/SiteLink";
import type { LabEntry, LogEntry } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

// Lab entries are English only; log entries use the selected language.
export function EnTag() {
  return (
    <span className="rounded-md bg-line px-1.5 py-0.5 font-mono text-[11px] tracking-wide text-muted">EN</span>
  );
}

const island = (locale: Locale) => (locale === "fa" ? ({ dir: "ltr", lang: "en" } as const) : {});

export function Sample() {
  return (
    <span className="rounded-md bg-line px-2 py-0.5 font-mono text-[11px] tracking-wide text-muted uppercase">sample</span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full bg-badge px-3 py-0.5 font-mono text-[13px] whitespace-nowrap text-orange-ink">
      {status}
    </span>
  );
}

export function LabRow({ entry, locale = "en" }: { entry: LabEntry; locale?: Locale }) {
  return (
    <li className="border-t border-line first:border-t-0" {...island(locale)}>
      <Link
        href={`/lab/${entry.slug}`}
        className="group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 py-5"
      >
        <span className="min-w-0 font-mono font-bold wrap-anywhere text-carbon transition-colors group-hover:text-orange-ink">
          {entry.title}
        </span>
        <span className="col-span-2 row-start-2 text-[15px] leading-7 text-muted">{entry.summary}</span>
        <span className="col-start-2 row-start-1 flex flex-wrap items-center justify-end gap-2">
          {locale === "fa" && <EnTag />}
          {entry.placeholder && <Sample />}
          <StatusBadge status={entry.status} />
        </span>
      </Link>
    </li>
  );
}

export function LogRow({ entry, locale = "en" }: { entry: LogEntry; locale?: Locale }) {
  return (
    <li className="border-t border-line first:border-t-0">
      <Link href={localePath(locale, `/log/${entry.slug}`)} className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
        <time dateTime={entry.date} dir="ltr" className="font-mono text-sm text-muted sm:w-28 sm:shrink-0">{new Date(`${entry.date}T00:00:00Z`).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-CA", { timeZone: "UTC" })}</time>
        <span className="flex-1 font-display text-lg font-medium text-carbon transition-colors group-hover:text-orange-ink">
          {entry.title}
        </span>
        {entry.placeholder && <Sample />}
      </Link>
    </li>
  );
}
