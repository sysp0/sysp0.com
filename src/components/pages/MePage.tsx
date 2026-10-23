import Image from "next/image";
import { getLinks } from "@/lib/links";
import { personJsonLd } from "@/lib/structured-data";
import { getSite } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { JsonLd } from "@/components/layout/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { CdLink } from "@/components/ui/CdLink";

export function MePage({ locale }: { locale: Locale }) {
  const { me } = getSite(locale);
  const links = getLinks();

  return (
    <>
      <JsonLd data={personJsonLd(locale)} />
      <Header locale={locale} path="/me" active="/me" />
      <main
        id="main"
        className="flex flex-1 flex-col gap-12 px-4 pt-16 pb-24 sm:px-10 sm:pt-24 lg:px-20"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <PathBar path={localePath(locale, "/me")} />
              <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-[-0.03em] text-carbon sm:text-7xl">
                {me.title}
              </h1>
              <p className="max-w-[640px] text-lg leading-8 text-muted sm:text-[21px]">
                {me.body}
              </p>
            </div>

            <dl className="flex flex-col">
              {me.sections.map((s, i) => (
                <div
                  key={s.label}
                  data-reveal
                  style={{ "--delay": i } as React.CSSProperties}
                  className="flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:gap-10"
                >
                  <dt className="font-mono text-[13px] tracking-[0.04em] text-orange uppercase sm:w-44 sm:shrink-0 sm:pt-1.5">
                    {s.label}
                  </dt>
                  <dd className="font-display text-xl leading-8 font-medium text-carbon sm:text-2xl sm:leading-9">
                    {s.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="order-first lg:order-none">
            <div className="relative mx-auto aspect-[2/3] w-full max-w-[420px] overflow-hidden rounded-[32px] bg-carbon sm:rounded-[48px] lg:sticky lg:top-28">
              <div
                aria-hidden="true"
                className="absolute top-[14%] end-0 h-[36%] w-[40%] rounded-s-[32px] bg-orange"
              />
              <Image
                src={me.photo.src}
                alt={me.photo.alt}
                width={me.photo.width}
                height={me.photo.height}
                priority
                className="relative size-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <ul
          data-reveal
          className="flex max-w-2xl flex-col rounded-[28px] bg-white p-3 shadow-[inset_0_0_0_1px_var(--color-line)]"
        >
          {links.map((l) => (
            <li key={l.key}>
              <a
                href={l.href}
                target={l.key === "email" ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-baseline justify-between gap-4 rounded-2xl px-4 py-3.5 transition-colors hover:bg-cream"
              >
                <span dir="ltr" className="font-mono text-sm text-muted">
                  {l.key}
                </span>
                <span
                  dir="ltr"
                  className="truncate font-mono font-bold text-carbon group-hover:text-orange"
                >
                  {l.text} <span aria-hidden="true">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <CdLink href={localePath(locale, "/sys/me")}>cd /sys/me</CdLink>
      </main>
      <Footer locale={locale} />
    </>
  );
}
