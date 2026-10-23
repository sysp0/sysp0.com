import type { Metadata } from "next";
import site from "../../../content/site.json";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { LogRow } from "@/components/ui/Entries";
import { Shell } from "@/components/ui/Shell";
import { getLog } from "@/lib/content";

export const metadata: Metadata = {
  title: "/log · SYSP0",
  description: site.log.intro,
};

export default function LogPage() {
  const entries = getLog();
  return (
    <>
      <Header active="/log" />
      <main className="flex flex-1 flex-col gap-10 px-4 pt-16 pb-24 sm:px-10 sm:pt-24 lg:px-20">
        <div className="flex flex-col gap-5">
          <PathBar path="/log" />
          <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-[-0.03em] text-carbon sm:text-7xl">
            {site.log.subtitle}
          </h1>
          <p className="max-w-[720px] text-lg leading-8 text-muted sm:text-[21px]">{site.log.intro}</p>
        </div>
        {entries.length ? (
          <ul data-reveal className="rounded-[28px] bg-white px-6 py-2 shadow-[inset_0_0_0_1px_var(--color-line)] sm:px-8">
            {entries.map((e) => (
              <LogRow key={e.slug} entry={e} />
            ))}
          </ul>
        ) : (
          <div data-reveal className="max-w-2xl">
            <Shell command="ls /log">
              total 0 · {site.home.log.empty}
              <span className="caret text-orange">_</span>
            </Shell>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
