"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  intro: string;
  now?: string;
  /** "/fa" on the Persian site, so `cd` stays inside it. The shell itself is always English. */
  prefix?: string;
  layers: { id: string; tag: string; name: string; badge?: string }[];
  lab: string[];
  log: string[];
};

type Line = { id: number; input?: string; output?: React.ReactNode };

const ROUTES = ["/", "/me", "/sys/me", "/lab", "/log"];
const COMMANDS = ["help", "ls", "cd", "pwd", "whoami", "cat", "status", "now", "history", "date", "echo", "clear"];
const SCRIPT = ["ls /", "status"];

function ShellLink({ to, label, go }: { to: string; label?: string; go: (path: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => go(to)}
      className="cursor-pointer text-white underline decoration-white/25 underline-offset-4 hover:text-orange hover:decoration-orange"
    >
      {label ?? to}
    </button>
  );
}

let nextId = 0;
const line = (input?: string, output?: React.ReactNode): Line => ({ id: nextId++, input, output });

function resolve(arg: string | undefined): string {
  if (!arg || arg === "~" || arg === "/") return "/";
  let p = arg.replace(/^~/, "").replace(/^\.\//, "/");
  if (!p.startsWith("/")) p = `/${p}`;
  return p.length > 1 ? p.replace(/\/+$/, "") : p;
}

// An interactive shell for the home page. Paths in its output are clickable; `cd` navigates for real.
export function Terminal({ intro, now, prefix = "", layers, lab, log }: Props) {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [booting, setBooting] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const skipBoot = useRef(false);

  // /log is English-only, so it never gets the language prefix.
  const go = (path: string) => router.push(path.startsWith("/log") ? path : `${prefix}${path}`.replace(/^\/fa\/$/, "/fa"));
  const PathLink = ({ to, label }: { to: string; label?: string }) => <ShellLink to={to} label={label} go={go} />;

  function run(raw: string): Line[] {
    const input = raw.trim();
    const [cmd, ...args] = input.split(/\s+/);
    const arg = args[0];
    switch (cmd) {
      case "":
        return [line(raw)];
      case "help":
        return [
          line(
            raw,
            <span className="grid grid-cols-[7.5rem_1fr] gap-x-2">
              <span className="text-white">ls [path]</span>
              <span>list what lives here</span>
              <span className="text-white">cd &lt;path&gt;</span>
              <span>go there (try cd /sys/me)</span>
              <span className="text-white">whoami</span>
              <span>the short version</span>
              <span className="text-white">status</span>
              <span>what I&apos;m building now</span>
              {now && (
                <>
                  <span className="text-white">now</span>
                  <span>what I&apos;m learning</span>
                </>
              )}
              <span className="text-white">cat readme</span>
              <span>what this site is</span>
              <span className="text-white">clear</span>
              <span>start again from P0</span>
            </span>,
          ),
        ];
      case "ls": {
        const p = resolve(arg);
        if (p === "/")
          return [
            line(
              raw,
              <span className="flex flex-wrap gap-x-5">
                <PathLink to="/me" label="me" />
                <PathLink to="/sys/me" label="sys/" />
                <PathLink to="/lab" label="lab/" />
                <PathLink to="/log" label="log/" />
              </span>,
            ),
          ];
        if (p === "/sys") return [line(raw, <PathLink to="/sys/me" label="me/" />)];
        if (p === "/sys/me")
          return [
            line(
              raw,
              <span className="flex flex-wrap gap-x-5">
                {layers.map((l) => (
                  <PathLink key={l.id} to={`/sys/me#${l.id}`} label={`${l.tag} ${l.name.toLowerCase()}`} />
                ))}
                <span className="text-white/40">#p{layers.length} ?</span>
              </span>,
            ),
          ];
        if (p === "/lab" || p === "/log") {
          const items = p === "/lab" ? lab : log;
          return [
            line(
              raw,
              items.length ? (
                <span className="flex flex-col">
                  {items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </span>
              ) : (
                <span>total 0 · first entries are still compiling</span>
              ),
            ),
          ];
        }
        if (p === "/me") return [line(raw, <span>README.md</span>)];
        return [line(raw, `ls: ${arg}: no such file or directory`)];
      }
      case "cd": {
        const p = resolve(arg);
        const base = p.split("#")[0];
        if (ROUTES.includes(base)) {
          go(p);
          return [line(raw, <span className="text-white/50">→ {p}</span>)];
        }
        return [line(raw, `cd: no such file or directory: ${arg}`)];
      }
      case "pwd":
        return [line(raw, "/")];
      case "whoami":
        return [
          line(
            raw,
            <span>
              reza ·{" "}
              {layers.map((l, i) => (
                <span key={l.id}>
                  {l.name.toLowerCase()}
                  {i < layers.length - 1 && <span className="text-orange-light"> → </span>}
                </span>
              ))}
            </span>,
          ),
        ];
      case "cat":
        if (arg && /^readme(\.md)?$/i.test(arg)) return [line(raw, intro)];
        return [line(raw, `cat: ${arg ?? ""}: try cat readme`)];
      case "status": {
        const now = layers[layers.length - 1];
        return [
          line(
            raw,
            <span>
              building the system · now at <span className="text-orange-light">{now.tag}</span> {now.name}
              {now.badge ? ` (${now.badge})` : ""}
            </span>,
          ),
        ];
      }
      case "now":
        return [line(raw, now ?? "command not found: now. Type help.")];
      case "history":
        return [line(raw, history.length ? history.join("\n") : "(empty)")];
      case "date":
        return [line(raw, new Date().toString())];
      case "echo":
        return [line(raw, args.join(" "))];
      case "sudo":
        return [line(raw, "permission denied. Start at P0.")];
      case "rm":
        return [line(raw, "rm: the system keeps its history.")];
      case "exit":
        return [line(raw, "There is always another P0.")];
      default:
        return [line(raw, `command not found: ${cmd}. Type help.`)];
    }
  }

  // Boot: type the scripted commands, then hand the prompt to the visitor. Clicking in skips ahead.
  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    (async () => {
      await wait(reduce ? 0 : 700);
      for (let n = 0; n < SCRIPT.length; n++) {
        const cmd = SCRIPT[n];
        if (reduce || skipBoot.current) {
          if (cancelled) return;
          setValue("");
          setLines((prev) => [...prev, ...SCRIPT.slice(n).flatMap(run)]);
          break;
        }
        for (let i = 1; i <= cmd.length; i++) {
          if (cancelled) return;
          if (skipBoot.current) break;
          setValue(cmd.slice(0, i));
          await wait(70 + Math.random() * 60);
        }
        if (!skipBoot.current) await wait(260);
        if (cancelled) return;
        setValue("");
        setLines((prev) => [...prev, ...run(cmd)]);
        if (!skipBoot.current) await wait(500);
      }
      if (!cancelled) setBooting(false);
    })();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // The boot script runs once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Press "/" anywhere on the page to jump into the shell.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;
      if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        skipBoot.current = true;
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const raw = value;
    setValue("");
    setCursor(-1);
    if (raw.trim() === "clear") {
      setLines([]);
      return;
    }
    if (raw.trim()) setHistory((h) => [...h, raw.trim()]);
    setLines((prev) => [...prev, ...run(raw)]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (!history.length) return;
      e.preventDefault();
      const next =
        e.key === "ArrowUp" ? Math.min(cursor + 1, history.length - 1) : Math.max(cursor - 1, -1);
      setCursor(next);
      setValue(next === -1 ? "" : history[history.length - 1 - next]);
    } else if (e.key === "Escape") {
      e.currentTarget.blur();
    } else if (e.key === "Tab" && !e.shiftKey && value.trim()) {
      // Tab completes only when there is something to complete. Otherwise it moves focus on, so the shell never traps the keyboard.
      const [cmd, arg] = value.split(/\s+/);
      const match =
        arg === undefined
          ? COMMANDS.find((c) => c.startsWith(cmd))
          : ROUTES.find((r) => r.startsWith(resolve(arg)) && r !== "/");
      if (match) {
        e.preventDefault();
        setValue(arg === undefined ? `${match} ` : `${cmd} ${match}`);
      }
    }
  }

  function focus() {
    if (window.getSelection()?.toString()) return;
    skipBoot.current = true;
    inputRef.current?.focus();
  }

  return (
    <section
      aria-label="Interactive shell"
      onClick={focus}
      dir="ltr"
      className="flex flex-col overflow-hidden rounded-2xl bg-carbon font-mono text-[14px] focus-within:ring-2 focus-within:ring-orange focus-within:ring-offset-2 focus-within:ring-offset-cream leading-7 text-on-carbon-soft shadow-[0_24px_60px_-28px_rgba(16,49,107,0.55)] sm:text-[15px]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-2.5 text-xs text-white/70 sm:px-6">
        <span>reza@sysp0: /</span>
        <span className="hidden sm:inline">press / to type · esc to leave</span>
      </div>
      <div
        ref={scrollRef}
        tabIndex={0}
        aria-label="Shell session"
        className="h-[232px] overflow-y-auto px-5 py-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange sm:px-6"
      >
        <div role="log" aria-live="polite">
          {lines.map((l) => (
            <div key={l.id}>
              <p>
                <span className="text-orange-light">$</span> <span className="text-white">{l.input}</span>
              </p>
              {l.output !== undefined && <div className="whitespace-pre-wrap">{l.output}</div>}
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="flex items-center gap-2">
          <label htmlFor="shell" className="text-orange-light">
            $
          </label>
          <span className="relative flex-1">
            <input
              id="shell"
              ref={inputRef}
              value={value}
              onChange={(e) => !booting && setValue(e.target.value)}
              onKeyDown={onKeyDown}
              readOnly={booting}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Type a command, for example help"
              placeholder={booting || lines.length === 0 ? "" : "type help"}
              className="peer w-full bg-transparent text-white caret-orange outline-none placeholder:text-white/60"
            />
          </span>
        </form>
      </div>
    </section>
  );
}
