import { getSite, getSysMe } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { LayerCard } from "@/components/sys/LayerCard";

export function SysMePage({ locale }: { locale: Locale }) {
  const sysMe = getSysMe(locale);
  const { ui } = getSite(locale);
  const layers = sysMe.layers;
  return (
    <>
      <Header locale={locale} path="/sys/me" active="/sys/me" />
      <main
        id="main"
        className="flex flex-col gap-8 px-4 pt-16 pb-24 sm:px-10 sm:pt-24 lg:px-20"
      >
        <div className="flex flex-col gap-5">
          <PathBar path={localePath(locale, "/sys/me")} />
          <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-[-0.03em] text-carbon sm:text-7xl">
            {sysMe.title}
          </h1>
          <p className="max-w-[720px] text-lg leading-8 text-muted sm:text-[21px]">
            {sysMe.intro}
          </p>
          <ol className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-base text-carbon">
            {layers.map((l, i) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="hover:text-orange">
                  <bdi>{l.tag}</bdi> {l.name}
                </a>
                {i < layers.length - 1 && (
                  <span
                    className="ms-3 inline-block text-orange rtl:-scale-x-100"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <ol className="mt-6 flex flex-col gap-8">
          {layers.map((layer, i) => (
            <LayerCard
              key={layer.id}
              layer={layer}
              first={i === 0}
              last={false}
              ui={ui}
            />
          ))}
          <li data-reveal className="flex">
            <div
              className="relative hidden w-[72px] shrink-0 sm:block"
              aria-hidden="true"
            >
              <div className="absolute start-5 top-0 h-[30px] w-[2.5px] bg-carbon" />
              <div className="absolute start-2.5 top-[30px] size-[22px] rounded-full shadow-[inset_0_0_0_2.5px_var(--color-carbon)]" />
            </div>
            <div className="flex flex-1 flex-col gap-2 rounded-[28px] border-[1.5px] border-dashed border-[#C9CFDB] px-6 py-7 sm:flex-row sm:items-center sm:gap-6 sm:px-11">
              <p
                dir="ltr"
                className="font-mono text-[32px] leading-10 font-extrabold text-[#7A8396]"
              >
                {sysMe.ghost.tag}
              </p>
              <p className="font-mono text-lg text-muted">
                {sysMe.ghost.text.split(/(P0|\/lab)/).map((part, i) =>
                  part === "P0" ? (
                    <bdi key={i} className="text-orange-text">
                      {part}
                    </bdi>
                  ) : part === "/lab" ? (
                    <bdi key={i} className="font-bold text-carbon">
                      {part}
                    </bdi>
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
