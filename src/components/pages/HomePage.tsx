import Link from "next/link";
import { Symbol } from "@/components/brand/Symbol";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { CdLink } from "@/components/ui/CdLink";
import { LabRow, LogRow } from "@/components/ui/Entries";
import { Shell } from "@/components/ui/Shell";
import { getLab, getLog } from "@/lib/content";
import { getNow, getSite, getSysMe } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";

const FRAME = "mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-16";

export function HomePage({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const sysMe = getSysMe(locale);
  const to = (path: string) => localePath(locale, path);
  const { hero, map, layersStrip } = site.home;
  const layers = sysMe.layers;
  const lab = getLab().slice(0, site.home.lab.show);
  const log = getLog().slice(0, site.home.log.show);
  const now = getNow(locale);
  const [line1, line2] = hero.title.split("\n");
  const [beforeP0, afterP0] = line1.split("P0");

  return (
    <>
      <Header locale={locale} path="/" />
      <main className="flex flex-1 flex-col">
        <section className={`${FRAME} pt-7 pb-12 sm:pt-10 lg:pb-16`}>
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-5">
            <PathBar path={to("/")} />
          </div>
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            <div className="flex min-w-0 flex-col items-start gap-6 lg:py-6">
              <p className="flex items-center gap-3 text-sm font-medium text-muted">
                <span className="h-px w-8 bg-orange" aria-hidden="true" />{hero.eyebrow}
              </p>
              <h1 className="font-display text-[clamp(2.6rem,5.3vw,5rem)] leading-[1.3] font-bold tracking-tight text-carbon">
                <span className="block">{beforeP0}<bdi className="text-orange-ink">P0</bdi>{afterP0}</span>
                <span className="block">{line2}</span>
              </h1>
              <p className="max-w-[590px] text-base leading-8 text-muted sm:text-lg sm:leading-9">{hero.intro}</p>
              <div className="grid w-full grid-cols-1 gap-4 pt-1 min-[480px]:flex min-[480px]:w-auto min-[480px]:flex-wrap">
                {hero.ctas.map((cta) => <CdLink key={cta.href} href={to(cta.href)} variant={cta.variant} caption={locale === "en" ? `cd ${cta.href}` : undefined}>{cta.label}</CdLink>)}
              </div>
            </div>
            <div className="hero-logo flex aspect-square w-full max-w-[280px] items-center justify-center justify-self-center rounded-[32px] bg-carbon p-8 lg:max-w-[360px] lg:rounded-[40px]">
              <Symbol tone="dark" size={190} live className="h-auto w-36 lg:w-48" />
            </div>
          </div>
          {now && (
            <div className="mt-8 flex flex-col gap-3 border-y border-line py-5 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <p className="flex items-start gap-3 leading-7 text-ink"><span className="now-dot mt-2.5 size-2 shrink-0 rounded-full bg-orange" aria-hidden="true" />{now.text}</p>
              <p className="shrink-0 text-xs text-muted">{site.ui.updated} <bdi className="font-mono">/ {now.updated}</bdi></p>
            </div>
          )}
        </section>

        <section className={`${FRAME} pb-16 sm:pb-24`}>
          <div data-reveal className="mb-8 grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <p className="mb-3 font-mono text-xs font-bold text-orange-ink uppercase">01 / {map.eyebrow}</p>
              <h2 className="font-display text-3xl leading-snug font-bold text-carbon sm:text-4xl">{map.title}</h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-muted">
              {map.body.split(/(\/sys\/me|\/me|\/lab|\/log)/).map((part, i) =>
                site.nav.some((item) => item.path === part) ? (
                  <Link key={i} href={part === "/log" ? part : to(part)} className="inline-block rounded-md bg-chip px-1.5 text-carbon underline decoration-orange-ink underline-offset-4 transition-colors hover:bg-carbon hover:text-white">
                    <code dir="ltr" className="inline-block font-mono text-[0.9em]">{part}</code>
                  </Link>
                ) : part,
              )}
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {site.nav.map((item, i) => (
              <li key={item.path} data-reveal style={{ "--delay": i } as React.CSSProperties}>
                <Link href={item.path === "/log" ? item.path : to(item.path)} className="group flex h-full flex-col gap-5 rounded-2xl border border-line bg-white p-6 transition-colors duration-200 hover:border-carbon hover:bg-carbon">
                  <span dir="ltr" className="flex items-center justify-between font-mono text-xs text-muted group-hover:text-on-carbon-soft"><span>0{i + 1}</span><span aria-hidden="true">↗</span></span>
                  <code dir="ltr" className="w-fit rounded-lg bg-chip px-3 py-1 font-mono text-2xl font-bold text-carbon group-hover:bg-white/10 group-hover:text-white">{item.label}</code>
                  <span className="flex flex-col gap-2">
                    <span className="text-base font-bold text-carbon group-hover:text-white">{item.title}</span>
                    <span className="text-sm leading-7 text-muted group-hover:text-on-carbon-soft">{item.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${FRAME} pb-16 sm:pb-24`}>
          <div className="overflow-hidden rounded-[24px] bg-carbon px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
            <div data-reveal dir="ltr" className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div dir={locale === "fa" ? "rtl" : "ltr"} className="max-w-xl">
                <p className="mb-4 font-mono text-xs text-on-carbon-soft uppercase">02 / {layersStrip.eyebrow}</p>
                <h2 dir="ltr" className="text-left font-mono text-4xl font-bold sm:text-5xl"><bdi>{layersStrip.title}</bdi></h2>
                <p className="mt-5 text-base leading-8 text-on-carbon-soft">{layersStrip.body}</p>
              </div>
              <div dir={locale === "fa" ? "rtl" : "ltr"} className="justify-self-end">
                <CdLink href={to(layersStrip.cta.href)}>{layersStrip.cta.label}</CdLink>
              </div>
            </div>
            <ol>
              {layers.map((l, i) => (
                <li key={l.id} data-reveal style={{ "--delay": i } as React.CSSProperties}>
                  <Link href={`${to("/sys/me")}#${l.id}`} className="group grid gap-4 border-t border-white/20 py-6 transition-colors hover:bg-white/5 sm:grid-cols-[75px_130px_1fr] lg:grid-cols-[100px_180px_1fr] lg:gap-8">
                    <span dir="ltr" className="font-mono text-3xl font-bold text-orange">{l.tag}</span>
                    <span className="flex flex-col gap-2"><span className="text-lg font-bold">{l.name}</span><span className="font-mono text-xs leading-6 text-on-carbon-soft"><bdi>{l.period}</bdi></span></span>
                    <span className="max-w-2xl text-base leading-8 text-on-carbon-soft group-hover:text-white">{l.whatChanged}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <Link href={to("/lab")} className="mt-3 flex min-h-14 items-center justify-between gap-6 border-t border-white/20 pt-6 text-sm leading-7 text-on-carbon-soft hover:text-white">
              <span>{sysMe.ghost.text}</span><bdi className="shrink-0 font-mono text-xl text-orange">{sysMe.ghost.tag} ↗</bdi>
            </Link>
          </div>
        </section>

        <section className={`${FRAME} grid gap-8 pb-16 sm:pb-24 lg:grid-cols-2 lg:gap-12`}>
          {[
            { conf: site.home.lab, href: "/lab", rows: lab.map((e) => <LabRow key={e.slug} entry={e} locale={locale} />) },
            { conf: site.home.log, href: "/log", rows: log.map((e) => <LogRow key={e.slug} entry={e} locale={locale} />) },
          ].map(({ conf, href, rows }, i) => (
            <div key={href} data-reveal style={{ "--delay": i } as React.CSSProperties} className="min-w-0 border-t-2 border-carbon pt-6">
              <div dir="ltr" className="mb-5 flex items-start justify-between gap-4">
                <div className="text-left"><h2 className="font-mono text-3xl font-bold text-carbon"><bdi>{conf.title}</bdi></h2><p dir={locale === "fa" ? "rtl" : "ltr"} className="mt-2 text-sm text-muted">{conf.subtitle}</p></div>
                <Link href={href === "/lab" ? to(href) : href} dir={locale === "fa" ? "rtl" : "ltr"} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-orange-ink underline-offset-4 hover:underline">{conf.linkLabel}<span aria-hidden="true">↗</span></Link>
              </div>
              {rows.length ? <ul>{rows}</ul> : <Shell command={`ls ${href}`}>total 0 · {conf.empty}</Shell>}
            </div>
          ))}
        </section>

      </main>
      <Footer locale={locale} />
    </>
  );
}
