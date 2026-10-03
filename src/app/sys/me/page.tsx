import type { Metadata } from "next";
import sysMe from "../../../../content/sys-me.json";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { LayerCard } from "@/components/sys/LayerCard";
import type { Layer } from "@/components/sys/types";

export const metadata: Metadata = {
  title: "/sys/me · SYSP0",
  description: "Engineering identity: network, backend, DevOps, data and AI, and what each layer changed.",
};

export default function SysMePage() {
  const layers = sysMe.layers as Layer[];
  return (
    <>
      <Header active="/sys/me" />
      <main className="flex flex-col gap-8 px-4 pt-16 pb-24 sm:px-10 sm:pt-24 lg:px-20">
        <div className="flex flex-col gap-5">
          <PathBar path="/sys/me" />
          <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-[-0.03em] text-carbon sm:text-7xl">
            {sysMe.title}
          </h1>
          <p className="max-w-[720px] text-lg leading-8 text-muted sm:text-[21px]">{sysMe.intro}</p>
          <ol className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-base text-carbon">
            {layers.map((l, i) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="hover:text-orange">
                  {l.tag} {l.name}
                </a>
                {i < layers.length - 1 && <span className="ml-3 text-orange">→</span>}
              </li>
            ))}
          </ol>
        </div>

        <ol className="mt-6 flex flex-col gap-8">
          {layers.map((layer, i) => (
            <LayerCard key={layer.id} layer={layer} first={i === 0} last={false} />
          ))}
          <li className="flex">
            <div className="relative hidden w-[72px] shrink-0 sm:block" aria-hidden="true">
              <div className="absolute top-0 left-5 h-[30px] w-[2.5px] bg-carbon" />
              <div className="absolute top-[30px] left-2.5 size-[22px] rounded-full shadow-[inset_0_0_0_2.5px_var(--color-carbon)]" />
            </div>
            <div className="flex flex-1 flex-col gap-2 rounded-[28px] border-[1.5px] border-dashed border-[#C9CFDB] px-6 py-7 sm:flex-row sm:items-center sm:gap-6 sm:px-11">
              <p className="font-mono text-[32px] leading-10 font-extrabold text-[#AEB6C6]">{sysMe.ghost.tag}</p>
              <p className="font-mono text-lg text-muted">
                There is always another <span className="text-orange">P0</span>. Follow it in{" "}
                <span className="font-bold text-carbon">/lab</span>.
              </p>
            </div>
          </li>
        </ol>
      </main>
      <Footer />
    </>
  );
}
