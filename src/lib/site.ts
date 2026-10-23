import { z } from "zod";
import siteEn from "../../content/site.json";
import siteFa from "../../content/fa/site.json";
import sysMeEn from "../../content/sys-me.json";
import sysMeFa from "../../content/fa/sys-me.json";
import type { Locale } from "./i18n";

const Cta = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(["primary", "secondary"]),
});

const Section = z.object({ title: z.string(), subtitle: z.string(), show: z.number(), empty: z.string() });

// One schema for both languages: a key missing from content/fa/*.json breaks the build.
const SiteSchema = z.object({
  nav: z.array(z.object({ path: z.string(), label: z.string(), description: z.string() })),
  ui: z.object({
    whatChanged: z.string(),
    built: z.string(),
    forTheTeam: z.string(),
    forMe: z.string(),
    acrossEveryStage: z.string(),
    updated: z.string(),
    english: z.string(),
    switchTo: z.string(),
    switchLabel: z.string(),
  }),
  home: z.object({
    hero: z.object({ title: z.string(), intro: z.string(), ctas: z.array(Cta) }),
    now: z.object({ text: z.string(), updated: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "use YYYY-MM") }),
    map: z.object({ eyebrow: z.string(), title: z.string(), body: z.string() }),
    layersStrip: z.object({
      title: z.string(),
      eyebrow: z.string(),
      body: z.string(),
      cta: z.object({ label: z.string(), href: z.string() }),
    }),
    lab: Section,
    log: Section,
  }),
  me: z.object({
    title: z.string(),
    body: z.string(),
    links: z.record(z.string(), z.string()),
    photo: z.object({ src: z.string(), alt: z.string(), width: z.number(), height: z.number() }),
    sections: z.array(z.object({ label: z.string(), text: z.string() })),
  }),
  lab: z.object({ subtitle: z.string(), intro: z.string() }),
  log: z.object({ subtitle: z.string(), intro: z.string() }),
  footer: z.object({ tagline: z.string(), copyright: z.string() }),
  meta: z.object({
    description: z.string(),
    me: z.string(),
    sysMe: z.string(),
    lab: z.string(),
  }),
});

const Architecture = z.object({
  title: z.string(),
  stages: z.array(z.object({ name: z.string(), items: z.array(z.string()) })),
  crossCutting: z.array(z.string()),
});

const Layer = z.object({
  id: z.string(),
  tag: z.string(),
  name: z.string(),
  period: z.string(),
  where: z.string(),
  role: z.string(),
  whatChanged: z.string(),
  built: z.array(z.string()),
  forTheTeam: z.array(z.string()),
  forMe: z.array(z.string()),
  stack: z.array(z.string()),
  badge: z.string().optional(),
  architecture: Architecture.optional(),
});

const SysMeSchema = z.object({
  title: z.string(),
  intro: z.string(),
  layers: z.array(Layer),
  ghost: z.object({ tag: z.string(), name: z.string(), text: z.string() }),
});

export type Site = z.infer<typeof SiteSchema>;
export type SysMe = z.infer<typeof SysMeSchema>;
export type Layer = z.infer<typeof Layer>;
export type Architecture = z.infer<typeof Architecture>;

const sites = { en: SiteSchema.parse(siteEn), fa: SiteSchema.parse(siteFa) };
const sysMes = { en: SysMeSchema.parse(sysMeEn), fa: SysMeSchema.parse(sysMeFa) };

export const getSite = (locale: Locale): Site => sites[locale];
export const getSysMe = (locale: Locale): SysMe => sysMes[locale];

/** The "currently learning" line. Null when the text is empty, so the line is hidden. */
export function getNow(locale: Locale) {
  const { now } = sites[locale].home;
  return now.text.trim() ? now : null;
}
