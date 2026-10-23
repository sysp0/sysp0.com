import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { Prose } from "@/components/content/Prose";
import { StatusBadge } from "@/components/ui/Entries";
import { getLab } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLab().map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLab().find((e) => e.slug === slug);
  return entry ? { title: `/lab/${slug} · SYSP0`, description: entry.summary } : {};
}

export default async function LabEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getLab().find((e) => e.slug === slug);
  if (!entry) notFound();

  return (
    <>
      <Header active="/lab" />
      <main className="flex flex-1 flex-col gap-8 px-4 pt-16 pb-24 sm:px-10 sm:pt-24 lg:px-20">
        <div className="flex flex-col gap-5">
          <PathBar path={`/lab/${entry.slug}`} />
          <h1 className="font-mono text-4xl leading-tight font-extrabold tracking-tight text-carbon sm:text-6xl">
            {entry.title}
          </h1>
          <p className="max-w-[720px] text-lg leading-8 text-muted sm:text-[21px]">{entry.summary}</p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-muted">
            <StatusBadge status={entry.status} />
            <span>{entry.date}</span>
            {entry.tags.map((t) => (
              <span key={t} className="rounded-md bg-[#EEF1F7] px-2 py-0.5 text-carbon">
                {t}
              </span>
            ))}
          </div>
        </div>
        <Prose source={entry.body} />
        <div className="flex flex-wrap gap-6 font-mono text-sm font-bold">
          {entry.repo && (
            <a href={entry.repo} target="_blank" rel="noreferrer" className="text-orange hover:underline">
              repo ↗
            </a>
          )}
          {entry.demo && (
            <a href={entry.demo} target="_blank" rel="noreferrer" className="text-orange hover:underline">
              demo ↗
            </a>
          )}
          <Link href="/lab" className="text-orange hover:underline">
            cd /lab →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
