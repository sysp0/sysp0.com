import type { Architecture as ArchitectureData } from "./types";

// Left-to-right flow of the data platform: each stage feeds the next.
export function Architecture({ architecture }: { architecture: ArchitectureData }) {
  return (
    <section className="flex flex-col gap-4 rounded-3xl bg-carbon p-6 text-white sm:p-8">
      <p className="font-mono text-[13px] tracking-[0.04em] text-on-carbon-soft uppercase">{architecture.title}</p>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {architecture.stages.map((stage, i) => (
          <li key={stage.name} className="flex flex-col gap-2 rounded-2xl bg-white/[0.07] p-4">
            <p className="font-mono text-xs text-orange">
              {String(i + 1).padStart(2, "0")} {i < architecture.stages.length - 1 && "→"}
            </p>
            <p className="font-display text-base font-bold">{stage.name}</p>
            <ul className="flex flex-col gap-1 text-[13px] leading-5 text-[#DCE4F2]">
              {stage.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="font-mono text-[13px] leading-6 text-on-carbon-soft">
        across every stage: {architecture.crossCutting.join(" · ")}
      </p>
    </section>
  );
}
