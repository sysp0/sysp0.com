import { getSite } from "./site";

export type ProfileLink = { key: string; href: string; text: string };

/** Contact and profile links from content/site.json. Entries still set to TODO are skipped. */
export function getLinks(): ProfileLink[] {
  return Object.entries(getSite("en").me.links)
    .filter(([, href]) => href && href !== "TODO")
    .map(([key, href]) => ({
      key,
      href: key === "email" ? `mailto:${href}` : href,
      text: href.replace(/^https?:\/\/(www\.)?/, ""),
    }));
}
