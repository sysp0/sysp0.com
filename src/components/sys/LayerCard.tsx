import type { Layer, Site } from "@/lib/site";
import { Architecture } from "./Architecture";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="journey-label font-sans text-sm leading-6 font-medium text-muted">{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3 text-base leading-7 text-ink">
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
          className={`timeline-node absolute start-1 top-[30px] size-[34px] rounded-full border-[6px] border-cream ${first ? "bg-orange" : "bg-carbon"}`}
        />
      </div>

      <article className="journey-layer flex min-w-0 flex-1 flex-col gap-8 rounded-[28px] bg-white p-6 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
          <div className="flex shrink-0 flex-col gap-2 lg:w-[240px]">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-[28px] leading-10 font-bold text-carbon">{layer.name}</h2>
              <bdi className="journey-tag font-sans text-sm text-muted">{layer.tag}</bdi>
            </div>
            <p className="font-sans text-sm leading-6 text-muted tabular-nums">
              <bdi>{layer.period}</bdi><br /><bdi>{layer.where}</bdi>
            </p>
            {layer.badge && (
              <p className="self-start rounded-full bg-badge px-3 py-1 font-sans text-sm text-orange-ink">
                {layer.badge}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3.5">
            <Label>{ui.whatChanged}</Label>
            <p className="font-display text-xl leading-9 font-medium text-carbon border-s-[3px] border-orange ps-5 sm:text-2xl">
              {layer.whatChanged}
            </p>
          </div>
        </div>

        <div className={`grid gap-8 ${columns.length === 3 ? "lg:grid-cols-3" : columns.length === 2 ? "lg:grid-cols-2" : ""}`}>
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
              className="rounded-lg bg-chip px-3 py-1.5 font-sans text-sm text-carbon transition-colors hover:bg-carbon hover:text-white"
            >
              {s}
            </span>
          ))}
        </div>
      </article>
    </li>
  );
}
