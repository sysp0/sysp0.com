import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import matter from "gray-matter";
import { localePath, pairedAlternates } from "../src/lib/i18n.ts";

assert.equal(localePath("fa", "/"), "/");
assert.equal(localePath("en", "/"), "/en");
for (const path of ["/me", "/sys/me", "/lab", "/log"]) {
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
  const pathLinks = [...html.matchAll(/<a\b([^>]*)>(.*?)<\/a>/gs)]
    .filter(([, , body]) => /<code\b[^>]*>(\/sys\/me|\/me|\/lab|\/log)<\/code>/.test(body));
  assert.equal(pathLinks.length, 4, `${file}: destination cards should retain code-styled paths`);
  for (const [, attributes, body] of pathLinks) {
    const path = body.match(/<code\b[^>]*>(\/sys\/me|\/me|\/lab|\/log)<\/code>/)[1];
    const href = localePath(locale, path);
    assert.ok(attributes.includes(`href="${href}"`), `${file}: ${path} should link to ${href}`);
  }
  assert.equal(html.includes("cd /sys/me"), locale === "en", `${file}: command captions should only appear in English`);
  if (locale === "fa") assert.ok(!html.includes("cd /"), `${file}: Persian actions should not contain commands`);
  assert.match(html, new RegExp(`<html[^>]*lang="${locale}"[^>]*dir="${locale === "fa" ? "rtl" : "ltr"}"`));
  assert.equal(new URL(html.match(/<link rel="canonical" href="([^"]+)"/)[1]).href, `https://sysp0.com${canonical}`, file);
  assert.equal(new URL(html.match(/<link rel="alternate" hrefLang="x-default" href="([^"]+)"/)[1]).href, "https://sysp0.com/", file);
  assert.match(html, new RegExp(`<a(?=[^>]*hrefLang="${locale === "fa" ? "en" : "fa"}")(?=[^>]*href="${other}")`));
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
for (const [prefix, contentPath] of [["fa/", "fa/"], ["", ""]]) {
  const about = readFileSync(new URL(`../out/${prefix}me.html`, import.meta.url), "utf8");
  assert.ok(about.indexOf('class="cd-link cd-link-primary"') > about.indexOf("</dl>"), `${prefix}me: engineering CTA should follow the personal story`);
  const engineering = readFileSync(new URL(`../out/${prefix}sys/me.html`, import.meta.url), "utf8");
  assert.match(engineering, new RegExp(`<a[^>]*href="/${prefix}lab"[^>]*><code[^>]*>/lab</code></a>`));
  const { layers } = JSON.parse(readFileSync(new URL(`../content/${contentPath}sys-me.json`, import.meta.url)));
  const journeyMap = engineering.match(/<nav class="journey-map"[^>]*>(.*?)<\/nav>/s)?.[1];
  assert.ok(journeyMap, `${prefix}sys/me: visual journey navigation renders`);
  for (const layer of layers) {
    assert.ok(journeyMap.includes(`href="#${layer.id}"`), `${layer.id}: journey anchor retained`);
    assert.ok(journeyMap.includes(layer.name), `${layer.id}: navigation uses domain names`);
    assert.ok(!journeyMap.replace(/<[^>]*>/g, "").includes(layer.tag), `${layer.id}: navigation must not lead with P labels`);
    assert.ok(engineering.includes(`id="${layer.id}"`), `${layer.id}: anchor destination exists`);
  }
  for (const { architecture } of layers.filter((layer) => layer.architecture)) {
    assert.ok(engineering.includes(architecture.intro), "Architecture story should be rendered");
    for (const stage of architecture.stages) {
      assert.ok(engineering.includes(stage.description), `${stage.name}: narrative should be rendered`);
      for (const item of stage.items) assert.ok(engineering.includes(item), `${stage.name}: keep ${item}`);
    }
  }
}
assert.ok(sitemap.includes("<loc>https://sysp0.com/</loc>"));
assert.ok(sitemap.includes("<loc>https://sysp0.com/en</loc>"));
console.log("Locale routes, HTML language, alternates, home links and sitemap passed.");

// These pages must come from Docusaurus, with working Markdown and cross-app links.
for (const [locale, prefix, contentDir] of [["en", "", "blog/blog"], ["fa", "fa/", "blog/i18n/fa/docusaurus-plugin-content-blog"]]) {
  const index = readFileSync(new URL(`../out/${prefix}log.html`, import.meta.url), "utf8");
  assert.match(index, /<meta[^>]*name="generator"[^>]*content="Docusaurus v3\.10\.2"/);
  const htmlTag = index.match(/<html[^>]*>/)[0];
  assert.ok(htmlTag.includes(`lang="${locale}"`) && htmlTag.includes(`dir="${locale === "fa" ? "rtl" : "ltr"}"`));
  assert.ok(index.includes(`href="https://sysp0.com/${prefix}log"`));
  assert.ok(index.includes('class="navbar sysp0-header"') && index.includes('class="sysp0-footer"'));
  const tagsPage = readFileSync(new URL(`../out/${prefix}log/tags.html`, import.meta.url), "utf8");
  assert.ok(tagsPage.includes('class="sysp0-tag-directory"'), `${locale}: custom tag directory renders`);
  for (const [, label] of tagsPage.matchAll(/<bdi[^>]*>([^<]+)<\/bdi>/g)) {
    assert.match(label, /^[\x20-\x7E]+$/, `${locale}: tag labels must be English`);
  }
  const dataArchive = readFileSync(new URL(`../out/${prefix}log/tags/data.html`, import.meta.url), "utf8");
  assert.equal((dataArchive.match(/class="sysp0-entry(?: sysp0-entry-featured)?"/g) ?? []).length, 2, `${locale}: Data has two previews`);
  assert.ok(!dataArchive.includes('class="markdown"'), `${locale}: tag archive must not render full articles`);
  for (const file of readdirSync(new URL(`../${contentDir}/`, import.meta.url)).filter((file) => /\.mdx?$/.test(file) && !file.startsWith("_"))) {
    const {data, content} = matter(readFileSync(new URL(`../${contentDir}/${file}`, import.meta.url), "utf8"));
    const path = `/${prefix}log/${data.slug}`;
    if (data.draft || data.unlisted || data.placeholder) {
      assert.ok(!index.includes(`href="${path}"`), `${path}: hidden from listing`);
      continue;
    }
    const html = readFileSync(new URL(`../out${path}.html`, import.meta.url), "utf8");
    assert.ok(index.includes(`href="${path}"`), `${path}: listed in its own language`);
    assert.ok(html.includes(`href="https://sysp0.com${path}"`));
    assert.ok(html.includes(data.title), `${path}: title renders`);
    assert.ok(html.includes('class="sysp0-article-cover"'), `${path}: article cover renders`);
    if (/^## /m.test(content)) assert.match(html, /<h2\b/, `${path}: Markdown headings compile`);
    assert.ok(sitemap.includes(`<loc>https://sysp0.com${path}</loc>`));
    const otherPrefix = locale === "fa" ? "" : "fa/";
    const otherDir = locale === "fa" ? "blog/blog" : "blog/i18n/fa/docusaurus-plugin-content-blog";
    const translation = readdirSync(new URL(`../${otherDir}/`, import.meta.url)).some((otherFile) => {
      if (!/\.mdx?$/.test(otherFile)) return false;
      const {data: other} = matter(readFileSync(new URL(`../${otherDir}/${otherFile}`, import.meta.url), "utf8"));
      return other.slug === data.slug && !other.draft && !other.unlisted && !other.placeholder;
    });
    const otherPath = `/${otherPrefix}log${translation ? `/${data.slug}` : ""}`;
    assert.match(html, new RegExp(`<a(?=[^>]*href[Ll]ang="${locale === "fa" ? "en" : "fa"}")(?=[^>]*href="${otherPath}")`), `${path}: language switch`);
    for (const [, href] of html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)/g)) {
      const decoded = decodeURI(href);
      assert.ok(existsSync(new URL(`../out/${decoded === "/" ? "index" : decoded.slice(1)}.html`, import.meta.url)), `${path}: missing ${href}`);
    }
  }
}
console.log("Docusaurus Markdown, blog routes, translations and cross-app links passed.");
const redirects = JSON.parse(readFileSync(new URL("../blog/tag-redirects.json", import.meta.url), "utf8"));
const redirectRules = readFileSync(new URL("../out/_redirects", import.meta.url), "utf8");
for (const [legacy, tag] of Object.entries(redirects)) {
  assert.ok(redirectRules.includes(`/fa/log/tags/${encodeURIComponent(legacy)} /fa/log/tags/${tag} 301`));
  const fallback = readFileSync(new URL(`../out/fa/log/tags/${legacy}.html`, import.meta.url), "utf8");
  assert.ok(fallback.includes(`content="0;url=/fa/log/tags/${tag}"`), `${legacy}: static redirect fallback`);
}
