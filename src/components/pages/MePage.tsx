import Image from "next/image";
import { getSite } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { CdLink } from "@/components/ui/CdLink";

export function MePage({ locale }: { locale: Locale }) {
  const { me, home } = getSite(locale);
  const links = Object.entries(me.links)
    .filter(([, href]) => href && href !== "TODO")
    .map(([key, href]) => ({
      key,
      href: key === "email" ? `mailto:${href}` : href,
      text: href.replace(/^https?:\/\/(www\.)?/, ""),
    }));

  return (
    <>
      <Header locale={locale} path="/me" active="/me" />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-5 pt-7 pb-20 sm:px-10 sm:pt-10 lg:px-16">
        <div className="border-b border-line pb-5">
          <PathBar path={localePath(locale, "/me")} />
        </div>

        <section className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div className="flex min-w-0 flex-col items-start gap-6">
            <h1 className="max-w-3xl font-display text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.4] font-bold text-carbon">
              {me.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg sm:leading-9">{me.body}</p>
            <CdLink href={localePath(locale, "/sys/me")}>{home.layersStrip.cta.label}</CdLink>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-[28px] bg-carbon lg:max-w-[300px]">
            <div aria-hidden="true" className="absolute top-[14%] end-0 h-[36%] w-[40%] rounded-s-[32px] bg-orange" />
            <Image
              src={me.photo.src}
              alt={me.photo.alt}
              width={me.photo.width}
              height={me.photo.height}
              preload
              sizes="(min-width: 1024px) 300px, 240px"
              className="relative size-full object-cover object-top"
            />
          </div>
        </section>

        <ul className="grid gap-3 sm:grid-cols-3">
          {links.map((link) => (
            <li key={link.key} className="min-w-0">
              <a
                href={link.href}
                target={link.key === "email" ? undefined : "_blank"}
                rel="noreferrer"
                dir="ltr"
                className="group flex h-full min-h-20 flex-col gap-3 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-carbon hover:bg-chip"
              >
                <span className="flex items-center justify-between gap-3 font-mono text-sm font-bold text-carbon">
                  {link.key}<span aria-hidden="true">↗</span>
                </span>
                <span className="truncate font-mono text-xs text-muted">{link.text}</span>
              </a>
            </li>
          ))}
        </ul>

        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {me.sections.map((section, i) => (
            <div key={section.label} data-reveal style={{ "--delay": i } as React.CSSProperties} className="border-t border-line pt-5 last:md:col-span-2">
              <dt className="mb-3 text-sm font-bold text-orange-ink">{section.label}</dt>
              <dd className="max-w-3xl text-base leading-8 text-ink sm:text-lg sm:leading-9">{section.text}</dd>
            </div>
          ))}
        </dl>
      </main>
      <Footer locale={locale} />
    </>
  );
}
