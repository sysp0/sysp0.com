import { Logo } from "@/components/brand/Logo";
import Link from "next/link";
import { Symbol } from "@/components/brand/Symbol";

// Temporary landing page while the full system is being built.
export default function Home() {
  return (
    <>
      <header className="flex h-[88px] items-center justify-between border-b border-line px-4 sm:px-10 lg:px-20">
        <Logo />
        <span className="font-mono text-sm text-muted">status: booting</span>
      </header>

      <main className="flex flex-1 items-center px-4 py-16 sm:px-10 lg:px-20">
        <div className="flex w-full flex-col-reverse items-start justify-between gap-12 lg:flex-row lg:items-center">
          <div className="flex max-w-[780px] flex-col gap-7">
            <p className="font-mono text-base text-muted">
              sysp0.com<span className="text-orange">/</span>
            </p>
            <h1 className="font-display text-5xl leading-[1.04] font-bold tracking-[-0.03em] text-carbon sm:text-7xl lg:text-[84px]">
              Start at <span className="text-orange">P0</span>.
              <br />
              Build the system.
            </h1>
            <p className="max-w-[620px] text-lg leading-8 text-muted sm:text-[21px]">
              I&apos;m Reza. I went from networks to backend, then DevOps, then data, and now AI. This site is my
              system, and every URL on it means something.
            </p>
            <Link
              href="/sys/me"
              className="self-start rounded-full bg-orange px-6 py-3.5 font-mono font-bold text-white transition-colors hover:bg-orange-hover"
            >
              cd /sys/me
            </Link>
            <div className="rounded-2xl bg-carbon p-5 font-mono text-[15px] leading-7 text-on-carbon-soft sm:p-6">
              <p>
                <span className="text-orange">$</span> <span className="text-white">ls /</span>
              </p>
              <p>me&nbsp;&nbsp;sys/me&nbsp;&nbsp;lab&nbsp;&nbsp;log</p>
              <p>
                <span className="text-orange">$</span> <span className="text-white">status</span>
              </p>
              <p>
                building the system<span className="caret text-orange">_</span>
              </p>
            </div>
          </div>
          <div className="flex size-48 shrink-0 items-center justify-center rounded-[32px] bg-carbon sm:size-[320px] sm:rounded-[48px] lg:size-[420px]">
            <Symbol tone="dark" size={250} className="w-3/5 h-auto" />
          </div>
        </div>
      </main>

      <footer className="flex flex-col gap-4 bg-carbon px-4 py-10 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-20">
        <p className="font-mono text-lg">
          There is always another <span className="text-orange">P0</span>.
        </p>
        <p className="font-mono text-sm text-on-carbon-soft">© 2026 sysp0.com</p>
      </footer>
    </>
  );
}
