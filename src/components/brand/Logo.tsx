import { Symbol } from "./Symbol";
import { Wordmark } from "./Wordmark";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-2.5" aria-label="SYSP0">
      <Symbol tone={tone} />
      <Wordmark tone={tone} className="h-7 w-auto" />
    </span>
  );
}
