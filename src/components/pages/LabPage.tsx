import { getSite } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { LabRow } from "@/components/ui/Entries";
import { Shell } from "@/components/ui/Shell";
import { getLab } from "@/lib/content";

export function LabPage({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const entries = getLab();
  return (
    <>
      <Header locale={locale} path="/lab" active="/lab" />
      <main
        id="main"
        className="flex flex-1 flex-col gap-10 px-4 pt-16 pb-24 sm:px-10 sm:pt-24 lg:px-20"
      >
        <div className="flex flex-col gap-5">
          <PathBar path={localePath(locale, "/lab")} />
          <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-[-0.03em] text-carbon sm:text-7xl">
            {site.lab.subtitle}
          </h1>
          <p className="max-w-[720px] text-lg leading-8 text-muted sm:text-[21px]">
            {site.lab.intro}
          </p>
        </div>
        {entries.length ? (
          <ul
            data-reveal
            className="rounded-[28px] bg-white px-6 py-2 shadow-[inset_0_0_0_1px_var(--color-line)] sm:px-8"
          >
            {entries.map((e) => (
              <LabRow key={e.slug} entry={e} locale={locale} />
            ))}
          </ul>
        ) : (
          <div data-reveal className="max-w-2xl">
            <Shell command="ls /lab">
              total 0 · {site.home.lab.empty}
              <span className="caret text-orange">_</span>
            </Shell>
          </div>
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}
