import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const brand = JSON.parse(readFileSync(new URL("../content/brand.json", import.meta.url))).colors;
const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8").toLowerCase();
assert.equal(brand.carbon, "#191970");
assert.equal(brand.orange, "#FB5607");
for (const color of ["carbon", "orange", "cream", "ink", "muted", "line"]) {
  assert.ok(css.includes(`--color-${color}: ${brand[color].toLowerCase()}`), `${color} token drift`);
}

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map((channel) => parseInt(channel, 16) / 255);
  return channels.map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
}
for (const [fg, bg] of [
  [brand.ink, brand.orange], [brand.ink, brand.orangeHover],
  [brand.orangeInk, brand.cream], [brand.orangeInk, brand.badgeBg],
  [brand.orange, brand.carbon], [brand.onCarbonSoft, brand.carbon],
  [brand.muted, brand.cream], [brand.white, brand.carbon],
]) {
  const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  const contrast = (values[0] + 0.05) / (values[1] + 0.05);
  assert.ok(contrast >= 4.5, `${fg} on ${bg}: ${contrast.toFixed(2)}:1`);
}
console.log("Brand tokens and text contrast pairs passed.");
