import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { Prose } from "@/components/content/Prose";
import { SITE_URL } from "@/lib/i18n";
import { pageOpenGraph } from "@/lib/metadata";
import { getLog, readingMinutes } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLog().map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLog().find((e) => e.slug === slug);
  if (!entry) return {};
  const url = `${SITE_URL}/log/${slug}`;
  const title = `${entry.title} · SYSP0`;
  const description = entry.summary ?? "";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...pageOpenGraph("en", { title, description, url }),
      type: "article",
      publishedTime: entry.date,
    },
  };
}

export default async function LogEntryPage({ params }: Props) {
  const { slug } = await params;
  const entries = getLog();
  const i = entries.findIndex((e) => e.slug === slug);
  if (i === -1) notFound();
  const entry = entries[i];
  // Entries are sorted newest first, so "previous" is the next index.
  const newer = entries[i - 1];
  const older = entries[i + 1];

  return (
    <>
      <Header active="/log" />
      <main
        id="main"
        className="flex flex-1 flex-col gap-8 px-4 pt-16 pb-24 sm:px-10 sm:pt-24 lg:px-20"
      >
        <div className="flex flex-col gap-5">
          <PathBar path={`/log/${entry.slug}`} />
          <h1 className="max-w-[900px] font-display text-4xl leading-[1.08] font-bold tracking-[-0.02em] text-carbon sm:text-6xl">
            {entry.title}
          </h1>
          {entry.summary && (
            <p className="max-w-[720px] text-lg leading-8 text-muted sm:text-[21px]">
              {entry.summary}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-muted">
            <span>{entry.date}</span>
            <span aria-hidden="true">·</span>
            <span>{readingMinutes(entry.body)} min read</span>
            {entry.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-[#EEF1F7] px-2 py-0.5 text-carbon"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <Prose source={entry.body} />
        <nav className="flex flex-col gap-4 border-t border-line pt-8 font-mono text-sm sm:flex-row sm:justify-between">
          {older ? (
            <Link href={`/log/${older.slug}`} className="group max-w-sm">
              <span className="text-muted">← previous</span>
              <span className="mt-1 block font-bold text-carbon group-hover:text-orange">
                {older.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link
              href={`/log/${newer.slug}`}
              className="group max-w-sm sm:text-right"
            >
              <span className="text-muted">next →</span>
              <span className="mt-1 block font-bold text-carbon group-hover:text-orange">
                {newer.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/log"
              className="font-bold text-orange-text hover:underline"
            >
              cd /log →
            </Link>
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
