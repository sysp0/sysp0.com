import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const NAV = ["/me", "/sys/me", "/lab", "/log"] as const;

export function Header({ active }: { active?: (typeof NAV)[number] }) {
  return (
    <header className="flex h-[88px] items-center justify-between gap-6 border-b border-line px-4 sm:px-10 lg:px-20">
      <Link href="/" aria-label="sysp0.com home">
        <Logo />
      </Link>
      <nav className="flex gap-4 overflow-x-auto font-mono text-sm sm:gap-10 sm:text-base">
        {NAV.map((path) => (
          <Link
            key={path}
            href={path}
            aria-current={path === active ? "page" : undefined}
            className={
              path === active
                ? "py-1.5 font-bold whitespace-nowrap text-orange shadow-[inset_0_-2px_0_var(--color-orange)]"
                : "py-1.5 font-medium whitespace-nowrap text-ink hover:text-orange"
            }
          >
            {path}
          </Link>
        ))}
      </nav>
    </header>
  );
}
