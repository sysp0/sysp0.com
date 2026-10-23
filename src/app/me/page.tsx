import type { Metadata } from "next";
import site from "../../../content/site.json";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PathBar } from "@/components/layout/PathBar";
import { CdLink } from "@/components/ui/CdLink";
import { Shell } from "@/components/ui/Shell";

export const metadata: Metadata = {
  title: "/me · SYSP0",
  description: "Human identity: who Reza is outside the terminal.",
};

const LINK_LABELS: Record<string, string> = {
  email: "email",
  github: "github",
  linkedin: "linkedin",
  telegram: "telegram",
  instagram: "instagram",
};

export default function MePage() {
  const { me } = site;
  const links = Object.entries(me.links)
    .filter(([, href]) => href && href !== "TODO")
    .map(([key, href]) => ({ key, href: key === "email" ? `mailto:${href}` : href, text: href.replace(/^https?:\/\/(www\.)?/, "") }));

  return (
    <>
      <Header active="/me" />
      <main className="flex flex-1 flex-col gap-10 px-4 pt-16 pb-24 sm:px-10 sm:pt-24 lg:px-20">
        <div className="flex flex-col gap-5">
          <PathBar path="/me" />
          <h1 className="max-w-[900px] font-display text-5xl leading-[1.05] font-bold tracking-[-0.03em] text-carbon sm:text-7xl">
            {me.title}
          </h1>
          <p className="max-w-[720px] text-lg leading-8 text-muted sm:text-[21px]">{me.body}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div data-reveal>
            <Shell command="cat README.md">
              still writing this one<span className="caret text-orange">_</span>
              <br />
              <span className="text-white/45">until then, the engineering side is in /sys/me</span>
            </Shell>
          </div>
          <ul data-reveal className="flex flex-col rounded-[28px] bg-white p-3 shadow-[inset_0_0_0_1px_var(--color-line)]">
            {links.map((l) => (
              <li key={l.key}>
                <a
                  href={l.href}
                  target={l.key === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-baseline justify-between gap-4 rounded-2xl px-4 py-3.5 transition-colors hover:bg-cream"
                >
                  <span className="font-mono text-sm text-muted">{LINK_LABELS[l.key] ?? l.key}</span>
                  <span className="truncate font-mono font-bold text-carbon group-hover:text-orange">
                    {l.text} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <CdLink href="/sys/me">cd /sys/me</CdLink>
      </main>
      <Footer />
    </>
  );
}
