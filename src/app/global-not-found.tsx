import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Logo } from "@/components/brand/Logo";
import { MissingPath } from "@/components/layout/MissingPath";
import { RootDocument } from "@/components/layout/RootDocument";
import { inter, spaceGrotesk } from "@/lib/fonts/latin";
import { jetbrainsMono } from "@/lib/fonts/mono";

export const metadata: Metadata = { title: "404 · SYSP0" };

export default function GlobalNotFound() {
  return (
    <RootDocument
      locale="en"
      fontClass={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <main
        id="main"
        className="flex flex-1 flex-col items-start justify-center gap-8 px-4 py-16 sm:px-10 lg:px-20"
      >
        <Logo />
        <h1 className="sr-only">404: page not found</h1>
        <div className="w-full max-w-2xl rounded-2xl bg-carbon p-6 font-mono text-[15px] leading-7 text-on-carbon-soft">
          <p>
            <span className="text-orange-light">$</span>{" "}
            <span className="text-white">cd</span> <MissingPath />
          </p>
          <p>cd: no such file or directory</p>
          <p>
            <span className="text-orange-light">$</span>{" "}
            <span className="caret text-orange-light">_</span>
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full bg-orange px-6 py-3.5 font-mono font-bold text-ink transition-colors hover:bg-orange-hover"
        >
          cd /
        </Link>
      </main>
    </RootDocument>
  );
}
