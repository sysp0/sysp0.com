import type { Layer, Site } from "@/lib/site";
import { Architecture } from "./Architecture";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[13px] leading-[18px] tracking-[0.04em] text-muted uppercase">{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5 text-[15px] leading-6 text-ink">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-orange" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LayerCard({ layer, first, last, ui }: { layer: Layer; first: boolean; last: boolean; ui: Site["ui"] }) {
  const columns = [
    { label: ui.built, items: layer.built },
    { label: ui.forTheTeam, items: layer.forTheTeam },
    { label: ui.forMe, items: layer.forMe },
  ].filter((c) => c.items.length > 0);

  return (
    <li id={layer.id} data-reveal className="relative flex scroll-mt-28">
      <div className="relative hidden w-[72px] shrink-0 sm:block" aria-hidden="true">
        <div
          className={`absolute start-5 w-[2.5px] bg-carbon ${first ? "top-10" : "top-0"} ${last ? "h-10" : "-bottom-8"}`}
        >
          <div className="timeline-fill size-full bg-orange" />
        </div>
        <div
          className={`timeline-node absolute start-2.5 top-9 size-[22px] rounded-full shadow-[0_0_0_6px_var(--color-cream)] ${first ? "bg-orange" : "bg-carbon"}`}
        />
      </div>

      <article className="flex flex-1 flex-col gap-8 rounded-[28px] bg-white p-6 shadow-[inset_0_0_0_1px_var(--color-line)] transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_var(--color-line),0_24px_50px_-30px_rgba(16,49,107,0.45)] sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
          <div className="flex shrink-0 flex-col gap-2 lg:w-[240px]">
            <p dir="ltr" className="font-mono text-4xl leading-tight font-extrabold text-orange sm:text-5xl">
              {layer.tag}
            </p>
            <h2 className="font-display text-[28px] leading-[34px] font-bold text-carbon">{layer.name}</h2>
            <p className="font-mono text-sm text-muted">
              <bdi>{layer.period}</bdi> · <bdi>{layer.where}</bdi>
            </p>
            {layer.badge && (
              <p className="self-start rounded-full bg-[#FDEBDF] px-3 py-1 font-mono text-[13px] text-orange">
                {layer.badge}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3.5">
            <Label>{ui.whatChanged}</Label>
            <p className="font-display text-2xl leading-9 font-medium text-carbon border-s-[3px] border-orange ps-5 sm:text-[26px]">
              {layer.whatChanged}
            </p>
          </div>
        </div>

        <div className={`grid gap-8 ${columns.length === 3 ? "md:grid-cols-3" : columns.length === 2 ? "md:grid-cols-2" : ""}`}>
          {columns.map((c) => (
            <div key={c.label} className="flex flex-col gap-3.5">
              <Label>{c.label}</Label>
              <List items={c.items} />
            </div>
          ))}
        </div>

        {layer.architecture && <Architecture architecture={layer.architecture} acrossLabel={ui.acrossEveryStage} />}

        <div className="flex flex-wrap gap-2">
          {layer.stack.map((s) => (
            <span
              key={s}
              className="rounded-lg bg-[#EEF1F7] px-3 py-1.5 font-mono text-sm text-carbon transition-colors hover:bg-carbon hover:text-white"
            >
              {s}
            </span>
          ))}
        </div>
      </article>
    </li>
  );
}
