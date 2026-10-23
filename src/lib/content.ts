import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const CONTENT = path.join(process.cwd(), "content");

// Sample entries from the canvas designs stay visible in `next dev` and are hidden from production builds.
const SHOW_PLACEHOLDERS = process.env.NODE_ENV !== "production";

const LabSchema = z.object({
  title: z.string(),
  summary: z.string(),
  status: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
  placeholder: z.boolean().default(false),
});

const LogSchema = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  summary: z.string().optional(),
  placeholder: z.boolean().default(false),
});

export type LabEntry = z.infer<typeof LabSchema> & { slug: string; body: string };
export type LogEntry = z.infer<typeof LogSchema> & { slug: string; body: string };

export function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).length / 200));
}

// Parses the small YAML subset our frontmatter uses: `key: value`, `key: [a, b]`, quoted strings, booleans.
function frontmatter(source: string): { data: Record<string, unknown>; body: string } {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: source };
  const data: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, raw] = m;
    const value = raw.trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => unquote(s.trim()))
        .filter(Boolean);
    } else if (value === "true" || value === "false") {
      data[key] = value === "true";
    } else {
      data[key] = unquote(value);
    }
  }
  return { data, body: source.slice(match[0].length).trim() };
}

function unquote(s: string) {
  return s.replace(/^["'](.*)["']$/, "$1");
}

function readCollection<T extends z.ZodTypeAny>(dir: string, schema: T) {
  const folder = path.join(CONTENT, dir);
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data, body } = frontmatter(fs.readFileSync(path.join(folder, file), "utf8"));
      const parsed = schema.safeParse(data);
      if (!parsed.success) throw new Error(`content/${dir}/${file}: ${parsed.error.message}`);
      return { ...(parsed.data as z.infer<T>), slug: file.replace(/\.mdx$/, ""), body };
    });
}

export function getLab(): LabEntry[] {
  return readCollection("lab", LabSchema)
    .filter((e) => SHOW_PLACEHOLDERS || !e.placeholder)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getLog(): LogEntry[] {
  return readCollection("log", LogSchema)
    .filter((e) => SHOW_PLACEHOLDERS || !e.placeholder)
    .sort((a, b) => b.date.localeCompare(a.date));
}
