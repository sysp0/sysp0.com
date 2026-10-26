import type { Architecture as ArchitectureData } from "@/lib/site";

const ICONS = [
  "M4 5h16v4H4z M4 11h16v4H4z M4 17h16v4H4z M7 7h.01 M7 13h.01 M7 19h.01",
  "M12 3v12 M7 10l5 5 5-5 M4 16v5h16v-5",
  "M3 12h4l3-7 4 14 3-7h4",
  "M4 7h16 M4 17h16 M8 4v6 M16 14v6",
  "M4 6c0-4 16-4 16 0s-16 4-16 0v12c0 4 16 4 16 0V6 M4 12c0 4 16 4 16 0",
  "M4 3v17h17 M8 15v-4 M13 15V7 M18 15V5",
];

// Each step explains what happens to the data before listing the tools behind it.
export function Architecture({ architecture, acrossLabel }: { architecture: ArchitectureData; acrossLabel: string }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-carbon text-white">
      <div className="border-b border-white/15 px-5 py-7 sm:px-8 sm:py-9">
        <p className="mb-3 font-mono text-xs text-on-carbon-soft">{architecture.title}</p>
        <h3 className="max-w-xl text-2xl leading-relaxed font-bold text-balance sm:text-3xl">{architecture.intro}</h3>
      </div>
      <ol className="px-5 py-7 sm:px-8">
        {architecture.stages.map((stage, i) => (
          <li key={stage.name} className="relative flex gap-4 pb-7 last:pb-0 sm:gap-6">
            {i < architecture.stages.length - 1 && <span aria-hidden="true" className="absolute start-[21px] top-11 bottom-0 w-px bg-orange/60" />}
            <span aria-hidden="true" className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-2xl border border-orange/50 bg-carbon text-orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[i]} /></svg>
            </span>
            <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="font-mono text-xs text-orange">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="text-lg font-bold">{stage.name}</h4>
              </div>
              <p className="mb-4 max-w-xl text-sm leading-7 text-on-carbon-soft sm:text-base">{stage.description}</p>
              <ul dir="ltr" className="flex flex-wrap gap-2 text-left">
                {stage.items.map((item) => <li key={item} className="max-w-full rounded-md bg-white/10 px-2.5 py-1 font-mono text-xs leading-6 break-words text-on-carbon-soft">{item}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <div className="border-t border-white/15 bg-white/5 px-5 py-6 sm:px-8">
        <p className="mb-3 text-sm font-bold">{acrossLabel}</p>
        <ul dir="ltr" className="flex flex-wrap gap-2 text-left">
          {architecture.crossCutting.map((item) => <li key={item} className="rounded-full border border-white/20 px-3 py-1 font-mono text-xs leading-6 text-on-carbon-soft">{item}</li>)}
        </ul>
      </div>
    </section>
  );
}
