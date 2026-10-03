import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="flex flex-col gap-6 bg-carbon px-4 py-12 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-20">
      <div className="flex flex-col gap-4">
        <Logo tone="dark" />
        <p className="font-mono text-lg">
          There is always another <span className="text-orange">P0</span>.
        </p>
      </div>
      <div className="flex flex-col gap-2 font-mono text-sm text-on-carbon-soft sm:items-end">
        <p>/me · /sys/me · /lab · /log</p>
        <p>© 2026 sysp0.com</p>
      </div>
    </footer>
  );
}
