import Link from "next/link";
import site from "../../content/site.json";
import sysMe from "../../content/sys-me.json";
import { Symbol } from "@/components/brand/Symbol";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { Terminal } from "@/components/home/Terminal";
import { CdLink } from "@/components/ui/CdLink";
import { LabRow, LogRow } from "@/components/ui/Entries";
import { Shell } from "@/components/ui/Shell";
import type { Layer } from "@/components/sys/types";
import { getLab, getLog, parseNow } from "@/lib/content";

const GUTTER = "px-4 sm:px-10 lg:px-20";

export default function Home() {
  const { hero, map, layersStrip } = site.home;
  const layers = sysMe.layers as Layer[];
  const lab = getLab().slice(0, site.home.lab.show);
  const log = getLog().slice(0, site.home.log.show);
  const now = parseNow(site.home.now);
  const [line1, line2] = hero.title.split("\n");

  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className={`py-14 sm:py-20 ${GUTTER}`}>
          <div className="flex w-full flex-col-reverse items-start justify-between gap-12 lg:flex-row lg:items-center">
            <div className="flex w-full max-w-[780px] flex-col gap-7">
              <PathBar path="/" />
              <h1 className="font-display text-5xl leading-[1.04] font-bold tracking-[-0.03em] text-carbon sm:text-7xl lg:text-[84px]">
                {line1.replace("P0.", "")}
                <span className="text-orange">P0</span>.
                <br />
                {line2}
              </h1>
              <p className="max-w-[620px] text-lg leading-8 text-muted sm:text-[21px]">{hero.intro}</p>
              {now && (
                <p className="flex max-w-[620px] flex-col gap-1 font-mono text-sm leading-6 sm:text-[15px]">
                  <span className="flex items-center gap-2 text-muted">
                    <span className="now-dot size-2 rounded-full bg-orange" aria-hidden="true" />
                    $ cat /now
                  </span>
                  <span className="text-ink">
                    {now.text} <span className="text-muted">· updated {now.updated}</span>
                  </span>
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {hero.ctas.map((cta) => (
                  <CdLink key={cta.href} href={cta.href} variant={cta.variant as "primary" | "secondary"}>
                    {cta.label}
                  </CdLink>
                ))}
              </div>
              <Terminal
                intro={hero.intro}
                now={now?.text}
                layers={layers.map(({ id, tag, name, badge }) => ({ id, tag, name, badge }))}
                lab={getLab().map((e) => e.title)}
                log={getLog().map((e) => `${e.date}  ${e.title}`)}
              />
            </div>
            <div className="group flex size-48 shrink-0 items-center justify-center rounded-[32px] bg-carbon transition-transform duration-500 hover:-rotate-2 sm:size-[320px] sm:rounded-[48px] lg:size-[420px]">
              <Symbol tone="dark" size={250} live className="h-auto w-3/5" />
            </div>
          </div>
        </section>

        {/* The map */}
        <section className={`flex flex-col gap-10 border-t border-line py-16 sm:py-24 ${GUTTER}`}>
          <div data-reveal className="flex max-w-[720px] flex-col gap-4">
            <p className="font-mono text-sm tracking-[0.04em] text-orange uppercase">{map.eyebrow}</p>
            <h2 className="font-display text-4xl leading-tight font-bold tracking-[-0.02em] text-carbon sm:text-5xl">
              {map.title}
            </h2>
            <p className="text-lg leading-8 text-muted">{map.body}</p>
          </div>

          <div className="flex flex-col gap-0">
            <p
              data-reveal
              className="flex items-center gap-3 self-start rounded-full bg-carbon px-5 py-2.5 font-mono font-bold text-white"
            >
              <span className="size-3 rounded-full bg-orange" aria-hidden="true" />
              sysp0.com/
            </p>
            <div className="ml-[26px] h-8 w-[2px] bg-carbon" aria-hidden="true" />
            <ul className="grid gap-4 border-t-2 border-carbon pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {site.nav.map((item, i) => (
                <li key={item.path} data-reveal style={{ "--delay": i } as React.CSSProperties}>
                  <Link
                    href={item.path}
                    className="group flex h-full flex-col gap-3 rounded-[20px] bg-white p-6 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_var(--color-orange),0_18px_40px_-24px_rgba(16,49,107,0.45)]"
                  >
                    <span className="flex items-center justify-between font-mono text-xl font-bold text-carbon group-hover:text-orange">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="text-sm font-medium text-orange opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        cd →
                      </span>
                    </span>
                    <span className="text-[15px] leading-6 text-muted">{item.description}</span>
                    {item.path === "/sys/me" && (
                      <span className="mt-auto flex flex-wrap gap-1.5 pt-1">
                        {layers.map((l) => (
                          <span key={l.id} className="rounded-md bg-[#EEF1F7] px-2 py-0.5 font-mono text-xs text-carbon">
                            {l.tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Layers strip */}
        <section className={`flex flex-col gap-10 bg-carbon py-16 text-white sm:py-24 ${GUTTER}`}>
          <div data-reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex max-w-[720px] flex-col gap-4">
              <p className="font-mono text-sm tracking-[0.04em] text-orange uppercase">{layersStrip.eyebrow}</p>
              <h2 className="font-mono text-4xl font-extrabold tracking-tight sm:text-5xl">{layersStrip.title}</h2>
              <p className="text-lg leading-8 text-on-carbon-soft">{layersStrip.body}</p>
            </div>
            <Link
              href={layersStrip.cta.href}
              className="self-start rounded-full bg-orange px-6 py-3.5 font-mono font-bold text-white transition-colors hover:bg-orange-hover lg:self-auto"
            >
              {layersStrip.cta.label}
            </Link>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {layers.map((l, i) => (
              <li key={l.id} data-reveal style={{ "--delay": i } as React.CSSProperties}>
                <Link
                  href={`/sys/me#${l.id}`}
                  className="group flex h-full flex-col gap-4 rounded-[20px] bg-white/[0.06] p-6 transition-colors hover:bg-white/[0.11]"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-3xl font-extrabold text-orange">{l.tag}</span>
                    <span className="font-mono text-xs text-on-carbon-soft">{l.period}</span>
                  </span>
                  <span className="font-display text-xl font-bold">{l.name}</span>
                  <span className="text-[17px] leading-7 text-[#DCE4F2]">{l.whatChanged}</span>
                  {l.badge && (
                    <span className="mt-auto self-start rounded-full bg-orange/15 px-3 py-1 font-mono text-xs text-orange">
                      {l.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
            <li data-reveal style={{ "--delay": layers.length } as React.CSSProperties}>
              <Link
                href="/lab"
                className="flex h-full flex-col justify-center gap-3 rounded-[20px] border-[1.5px] border-dashed border-white/25 p-6 transition-colors hover:border-orange"
              >
                <span className="font-mono text-3xl font-extrabold text-white/35">{sysMe.ghost.tag} ?</span>
                <span className="font-mono text-on-carbon-soft">{sysMe.ghost.text}</span>
              </Link>
            </li>
          </ol>
        </section>

        {/* Lab + Log preview */}
        <section className={`grid gap-6 py-16 sm:py-24 lg:grid-cols-2 ${GUTTER}`}>
          {(
            [
              { conf: site.home.lab, href: "/lab", rows: lab.map((e) => <LabRow key={e.slug} entry={e} />) },
              { conf: site.home.log, href: "/log", rows: log.map((e) => <LogRow key={e.slug} entry={e} />) },
            ] as const
          ).map(({ conf, href, rows }, i) => (
            <div
              key={href}
              data-reveal
              style={{ "--delay": i } as React.CSSProperties}
              className="flex flex-col gap-6 rounded-[28px] bg-white p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h2 className="font-mono text-3xl font-extrabold text-carbon">{conf.title}</h2>
                  <p className="text-muted">{conf.subtitle}</p>
                </div>
                <Link href={href} className="font-mono text-sm font-bold whitespace-nowrap text-orange hover:underline">
                  cd {href} →
                </Link>
              </div>
              {rows.length ? (
                <ul>{rows}</ul>
              ) : (
                <Shell command={`ls ${href}`}>
                  total 0 · {conf.empty}
                  <span className="caret text-orange">_</span>
                </Shell>
              )}
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
