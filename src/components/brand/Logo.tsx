import { Symbol } from "./Symbol";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-3" aria-label="SYSP0">
      <Symbol tone={tone} />
      <span className="font-mono text-[22px] leading-none font-extrabold tracking-tight">
        <span className={tone === "light" ? "text-carbon" : "text-white"}>SYS</span>
        <span className="text-orange">P0</span>
      </span>
    </span>
  );
}
