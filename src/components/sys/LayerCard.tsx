import type { Layer } from "./types";
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

export function LayerCard({ layer, first, last }: { layer: Layer; first: boolean; last: boolean }) {
  const columns = [
    { label: "what I built", items: layer.built },
    { label: "for the team", items: layer.forTheTeam },
    { label: "for me", items: layer.forMe },
  ].filter((c) => c.items.length > 0);

  return (
    <li id={layer.id} className="relative flex scroll-mt-8">
      <div className="relative hidden w-[72px] shrink-0 sm:block" aria-hidden="true">
        <div
          className={`absolute left-5 w-[2.5px] bg-carbon ${first ? "top-10" : "top-0"} ${last ? "h-10" : "-bottom-8"}`}
        />
        <div
          className={`absolute top-9 left-2.5 size-[22px] rounded-full shadow-[0_0_0_6px_var(--color-cream)] ${first ? "bg-orange" : "bg-carbon"}`}
        />
      </div>

      <article className="flex flex-1 flex-col gap-8 rounded-[28px] bg-white p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
          <div className="flex shrink-0 flex-col gap-2 lg:w-[240px]">
            <p className="font-mono text-4xl leading-tight font-extrabold text-orange sm:text-5xl">{layer.tag}</p>
            <h2 className="font-display text-[28px] leading-[34px] font-bold text-carbon">{layer.name}</h2>
            <p className="font-mono text-sm text-muted">
              {layer.period} · {layer.where}
            </p>
            {layer.badge && (
              <p className="self-start rounded-full bg-[#FDEBDF] px-3 py-1 font-mono text-[13px] text-orange">
                {layer.badge}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3.5">
            <Label>what changed</Label>
            <p className="font-display text-2xl leading-9 font-medium text-carbon shadow-[inset_3px_0_0_var(--color-orange)] sm:text-[26px] pl-5">
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

        {layer.architecture && <Architecture architecture={layer.architecture} />}

        <div className="flex flex-wrap gap-2">
          {layer.stack.map((s) => (
            <span key={s} className="rounded-lg bg-[#EEF1F7] px-3 py-1.5 font-mono text-sm text-carbon">
              {s}
            </span>
          ))}
        </div>
      </article>
    </li>
  );
}
