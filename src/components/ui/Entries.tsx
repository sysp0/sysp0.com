import Link from "next/link";
import type { LabEntry, LogEntry } from "@/lib/content";

export function Sample() {
  return (
    <span className="rounded-md bg-line px-2 py-0.5 font-mono text-[11px] tracking-wide text-muted uppercase">sample</span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full bg-[#FDEBDF] px-3 py-0.5 font-mono text-[13px] whitespace-nowrap text-orange">
      {status}
    </span>
  );
}

export function LabRow({ entry }: { entry: LabEntry }) {
  return (
    <li className="border-t border-line first:border-t-0">
      <Link
        href={`/lab/${entry.slug}`}
        className="group flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:gap-6"
      >
        <span className="font-mono font-bold text-carbon transition-colors group-hover:text-orange sm:w-56 sm:shrink-0">
          {entry.title}
        </span>
        <span className="flex-1 text-[15px] leading-6 text-ink">{entry.summary}</span>
        <span className="flex items-center gap-2">
          {entry.placeholder && <Sample />}
          <StatusBadge status={entry.status} />
        </span>
      </Link>
    </li>
  );
}

export function LogRow({ entry }: { entry: LogEntry }) {
  return (
    <li className="border-t border-line first:border-t-0">
      <Link href={`/log/${entry.slug}`} className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
        <span className="font-mono text-sm text-muted sm:w-28 sm:shrink-0">{entry.date}</span>
        <span className="flex-1 font-display text-lg font-medium text-carbon transition-colors group-hover:text-orange">
          {entry.title}
        </span>
        {entry.placeholder && <Sample />}
      </Link>
    </li>
  );
}
