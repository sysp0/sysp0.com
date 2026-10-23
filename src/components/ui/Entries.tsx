import type { LabEntry, LogEntry } from "@/lib/content";

function Sample() {
  return (
    <span className="rounded-md bg-line px-2 py-0.5 font-mono text-[11px] tracking-wide text-muted uppercase">sample</span>
  );
}

export function LabRow({ entry }: { entry: LabEntry }) {
  return (
    <li className="group flex flex-col gap-1.5 border-t border-line py-4 first:border-t-0 sm:flex-row sm:items-baseline sm:gap-6">
      <p className="font-mono font-bold text-carbon transition-colors group-hover:text-orange sm:w-56 sm:shrink-0">
        {entry.title}
      </p>
      <p className="flex-1 text-[15px] leading-6 text-ink">{entry.summary}</p>
      <p className="flex items-center gap-2">
        {entry.placeholder && <Sample />}
        <span className="rounded-full bg-[#FDEBDF] px-3 py-0.5 font-mono text-[13px] whitespace-nowrap text-orange">
          {entry.status}
        </span>
      </p>
    </li>
  );
}

export function LogRow({ entry }: { entry: LogEntry }) {
  return (
    <li className="group flex flex-col gap-1 border-t border-line py-4 first:border-t-0 sm:flex-row sm:items-baseline sm:gap-6">
      <p className="font-mono text-sm text-muted sm:w-28 sm:shrink-0">{entry.date}</p>
      <p className="flex-1 font-display text-lg font-medium text-carbon transition-colors group-hover:text-orange">
        {entry.title}
      </p>
      {entry.placeholder && <Sample />}
    </li>
  );
}
