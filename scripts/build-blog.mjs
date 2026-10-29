import {spawnSync} from 'node:child_process';
import {cpSync, readdirSync} from 'node:fs';
import path from 'node:path';

const result = spawnSync('node', ['node_modules/@docusaurus/core/bin/docusaurus.mjs', 'build', 'blog'], {stdio: 'inherit'});
if (result.status !== 0) process.exit(result.status ?? 1);

// Copy only blog routes and assets; Next.js owns the home, 404 and sitemap.
for (const prefix of ['', 'fa/']) {
  for (const name of readdirSync(`blog/build/${prefix}`)) {
    if (name === 'assets' || name === 'log' || name === 'log.html' || name === '_redirects') {
      cpSync(path.join('blog/build', prefix, name), path.join('out', prefix, name), {recursive: true});
    }
  }
}
