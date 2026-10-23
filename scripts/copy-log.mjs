// Puts the Docusaurus site (log/build) under out/log, next to the Next.js export, so one folder is deployed.
import fs from "node:fs";

const from = "log/build";
const to = "out/log";

if (!fs.existsSync(from)) throw new Error(`${from} not found: run the Docusaurus build first`);
if (!fs.existsSync("out")) throw new Error("out/ not found: run `next build` first");
fs.rmSync(to, { recursive: true, force: true });
fs.cpSync(from, to, { recursive: true });
console.log(`copied ${from} -> ${to}`);
