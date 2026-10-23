import Link from "next/link";

// A button that reads like a shell command, e.g. `cd /sys/me`. The arrow slides on hover.
export function CdLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const look =
    variant === "primary"
      ? "bg-orange text-ink hover:bg-orange-hover"
      : "text-carbon shadow-[inset_0_0_0_1.5px_var(--color-carbon)] hover:bg-carbon hover:text-white";
  return (
    <Link
      href={href}
      dir="ltr"
      className={`group inline-flex items-center gap-2 self-start rounded-full px-6 py-3.5 font-mono font-bold transition-colors ${look}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
