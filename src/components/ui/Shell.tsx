// A static terminal block: one command and its output. Used for empty states and small asides.
export function Shell({ command, children }: { command: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-carbon p-5 font-mono text-[15px] leading-7 text-on-carbon-soft sm:p-6">
      <p>
        <span className="text-orange">$</span> <span className="text-white">{command}</span>
      </p>
      <div>{children}</div>
    </div>
  );
}
