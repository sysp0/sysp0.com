import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { localePath, pairedAlternates } from "../src/lib/i18n.ts";

assert.equal(localePath("fa", "/"), "/");
assert.equal(localePath("en", "/"), "/en");
for (const path of ["/me", "/sys/me", "/lab"]) {
  assert.equal(localePath("fa", path), `/fa${path}`);
  assert.equal(localePath("en", path), path);
  assert.equal(pairedAlternates("en", path).languages["x-default"], `https://sysp0.com/fa${path}`);
}

for (const [file, locale, canonical, other] of [
  ["index.html", "fa", "/", "/en"],
  ["fa.html", "fa", "/", "/en"],
  ["en.html", "en", "/en", "/"],
]) {
  const html = readFileSync(new URL(`../out/${file}`, import.meta.url), "utf8");
  assert.ok(html.includes('data-scroll-behavior="smooth"'), `${file}: Next.js must manage smooth route scrolling`);
  assert.ok(!html.includes('id="shell"'), `${file}: interactive terminal should be removed`);
  assert.ok(!html.includes("royal-blue-texture"), `${file}: decorative texture should be removed`);
  assert.ok(html.includes("symbol-live") && /<animateMotion\b/i.test(html), `${file}: animated logo should be present`);
  assert.ok(html.includes("cd-link-primary"), `${file}: primary action should be present`);
  const pathLinks = [...html.matchAll(/<a\b([^>]*)><code\b[^>]*>(\/sys\/me|\/me|\/lab|\/log)<\/code><\/a>/g)];
  assert.equal(pathLinks.length, 4, `${file}: map paths should be code-styled links`);
  for (const [, attributes, path] of pathLinks) {
    const href = path === "/log" ? path : localePath(locale, path);
    assert.ok(attributes.includes(`href="${href}"`), `${file}: ${path} should link to ${href}`);
  }
  assert.equal(html.includes("cd /sys/me"), locale === "en", `${file}: command captions should only appear in English`);
  if (locale === "fa") assert.ok(!html.includes("cd /"), `${file}: Persian actions should not contain commands`);
  assert.match(html, new RegExp(`<html[^>]*lang="${locale}"[^>]*dir="${locale === "fa" ? "rtl" : "ltr"}"`));
  assert.equal(new URL(html.match(/<link rel="canonical" href="([^"]+)"/)[1]).href, `https://sysp0.com${canonical}`, file);
  assert.equal(new URL(html.match(/<link rel="alternate" hrefLang="x-default" href="([^"]+)"/)[1]).href, "https://sysp0.com/", file);
  assert.match(html, new RegExp(`<a[^>]*hrefLang="${locale === "fa" ? "en" : "fa"}"[^>]*href="${other}"`));
  for (const [, href] of html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)/g)) {
    assert.ok(existsSync(new URL(`../out/${href === "/" ? "index" : href.slice(1)}.html`, import.meta.url)), `${file}: missing ${href}`);
  }
}
for (const file of ["fa/me.html", "fa/lab.html"]) {
  const html = readFileSync(new URL(`../out/${file}`, import.meta.url), "utf8");
  assert.ok(!html.includes("cd /"), `${file}: Persian actions should not contain commands`);
}
for (const file of ["en.html", "me.html"]) {
  const html = readFileSync(new URL(`../out/${file}`, import.meta.url), "utf8");
  assert.ok(!html.includes("cd /sys/me →"), `${file}: command label should not duplicate the arrow icon`);
}
const sitemap = readFileSync(new URL("../out/sitemap.xml", import.meta.url), "utf8");
assert.ok(sitemap.includes("<loc>https://sysp0.com/</loc>"));
assert.ok(sitemap.includes("<loc>https://sysp0.com/en</loc>"));
console.log("Locale routes, HTML language, alternates, home links and sitemap passed.");
