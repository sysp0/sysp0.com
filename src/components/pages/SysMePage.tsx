import Link from "next/link";
import { getSite, getSysMe } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { LayerCard } from "@/components/sys/LayerCard";

const stagePaths = [
  "M12 5v7m-7 6v-6h14v6M9 3h6v4H9zM2 18h6v4H2zM16 18h6v4h-6z",
  "m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18",
  "M6 8c5 0 7 8 12 8a4 4 0 0 0 0-8c-5 0-7 8-12 8a4 4 0 0 1 0-8z",
  "M4 6c0-4 16-4 16 0s-16 4-16 0v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0",
  "M8 8h8v8H8zM8 2v3m8-3v3M8 19v3m8-3v3M2 8h3m-3 8h3M19 8h3m-3 8h3",
];

export function SysMePage({ locale }: { locale: Locale }) {
  const sysMe = getSysMe(locale);
  const { ui } = getSite(locale);
  const layers = sysMe.layers;
  return (
    <>
      <Header locale={locale} path="/sys/me" active="/sys/me" />
      <main className="journey-page flex flex-col gap-8 px-5 pt-12 pb-24 sm:px-10 sm:pt-16 lg:px-16">
        <div className="flex flex-col gap-5">
          <PathBar path={localePath(locale, "/sys/me")} />
          <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-[-0.03em] text-carbon sm:text-7xl">
            {sysMe.title}
          </h1>
          <div className="max-w-[720px] space-y-4 text-lg leading-8 text-muted sm:text-[21px]">
            {sysMe.intro.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <nav className="journey-map" aria-label={sysMe.title}>
          <ol>
            {layers.map((l, i) => (
              <li key={l.id}>
                <a href={`#${l.id}`}>
                  <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={stagePaths[i]} /></svg>
                  <span><strong>{l.name}</strong><span className="journey-period"><bdi>{l.period}</bdi></span></span>
                  <span className="journey-map-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ol>
          </nav>
        </div>

        <ol className="mt-6 flex flex-col gap-8">
          {layers.map((layer, i) => (
            <LayerCard key={layer.id} layer={layer} first={i === 0} last={false} ui={ui} />
          ))}
          <li data-reveal className="flex">
            <div className="relative hidden w-[72px] shrink-0 sm:block" aria-hidden="true">
              <div className="absolute start-5 top-0 h-[30px] w-[2.5px] bg-carbon" />
              <div className="now-dot absolute start-2.5 top-[30px] size-[22px] rounded-full bg-orange" />
            </div>
            <div className="journey-next flex flex-1 items-center gap-6 rounded-[28px] bg-chip px-6 py-7 sm:px-10 sm:py-10">
              <p className="font-sans text-xl leading-9 text-carbon sm:text-2xl">
                {sysMe.ghost.text.split(/(P0|\/lab)/).map((part, i) =>
                  part === "P0" ? (
                    <bdi key={i} className="font-sans text-orange-ink">
                      {part}
                    </bdi>
                  ) : part === "/lab" ? (
                    <Link key={i} href={localePath(locale, "/lab")} className="inline-block rounded-md bg-chip px-2 text-carbon underline decoration-orange-ink underline-offset-4 hover:bg-carbon hover:text-white">
                      <code dir="ltr" className="inline-block font-mono">{part}</code>
                    </Link>
                  ) : (
                    part
                  ),
                )}
              </p>
            </div>
          </li>
        </ol>
      </main>
      <Footer locale={locale} />
    </>
  );
}
