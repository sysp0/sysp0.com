import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import matter from "gray-matter";
import type { Locale } from "./i18n";

const CONTENT = path.join(process.cwd(), "content");

// Sample entries from the canvas designs stay visible in `next dev` and are hidden from production builds.
const SHOW_PLACEHOLDERS = process.env.NODE_ENV !== "production";

const LabSchema = z.object({
  title: z.string(),
  summary: z.string(),
  status: z.string(),
  date: z.preprocess((value) => value instanceof Date ? value.toISOString().slice(0, 10) : value, z.string()),
  tags: z.array(z.string()).default([]),
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
  placeholder: z.boolean().default(false),
});

const LogSchema = z.object({
  category: z.enum(["data", "infrastructure", "ai", "career"]),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "use a lowercase, hyphenated slug"),
  description: z.string().optional(),
  draft: z.boolean().default(false),
  unlisted: z.boolean().default(false),
  title: z.string(),
  date: z.preprocess((value) => value instanceof Date ? value.toISOString().slice(0, 10) : value, z.string()),
  tags: z.array(z.string().regex(/^[\x20-\x7E]+$/, "use English tag labels")).default([]),
  summary: z.string().optional(),
  placeholder: z.boolean().default(false),
});

export type LabEntry = z.infer<typeof LabSchema> & { slug: string; body: string };
export type LogEntry = z.infer<typeof LogSchema> & { slug: string; body: string };

export function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).length / 200));
}

function readCollection<T extends z.ZodTypeAny>(dir: string, schema: T) {
  const folder = path.join(CONTENT, dir);
  return fs
    .readdirSync(folder)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map((file) => {
      const { data, content: body } = matter(fs.readFileSync(path.join(folder, file), "utf8"));
      const parsed = schema.safeParse(data);
      if (!parsed.success) throw new Error(`content/${dir}/${file}: ${parsed.error.message}`);
      return { ...(parsed.data as z.infer<T>), slug: parsed.data.slug ?? file.replace(/\.mdx?$/, ""), body };
    });
}

export function getLab(): LabEntry[] {
  return readCollection("lab", LabSchema)
    .filter((e) => SHOW_PLACEHOLDERS || !e.placeholder)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getLog(locale: Locale = "en"): LogEntry[] {
  return readCollection(locale === "fa" ? "../blog/i18n/fa/docusaurus-plugin-content-blog" : "../blog/blog", LogSchema)
    .filter((e) => !e.draft && !e.unlisted && !e.placeholder)
    .sort((a, b) => b.date.localeCompare(a.date));
}
