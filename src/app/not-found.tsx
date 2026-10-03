import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-start justify-center gap-8 px-4 py-16 sm:px-10 lg:px-20">
      <Logo />
      <div className="w-full max-w-2xl rounded-2xl bg-carbon p-6 font-mono text-[15px] leading-7 text-on-carbon-soft">
        <p>
          <span className="text-orange">$</span> <span className="text-white">cd</span> ./this-path
        </p>
        <p>cd: no such file or directory</p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-orange px-6 py-3.5 font-mono font-bold text-white transition-colors hover:bg-orange-hover"
      >
        cd /
      </Link>
    </main>
  );
}
