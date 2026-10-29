import {spawn} from 'node:child_process';

const children = [];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill('SIGTERM');
  process.exitCode = code;
}
function start(args, env = {}) {
  const child = spawn(process.execPath, args, {stdio: 'inherit', env: {...process.env, ...env}});
  children.push(child);
  child.on('error', (error) => { console.error(error.message); stop(1); });
  child.on('exit', (code, signal) => { if (!stopping) stop(code ?? (signal ? 1 : 0)); });
}
for (const [locale, port] of [['en', '3001'], ['fa', '3002']]) {
  start(['node_modules/@docusaurus/core/bin/docusaurus.mjs', 'start', 'blog', '--locale', locale, '--port', port, '--host', '127.0.0.1', '--no-open'], {
    DOCUSAURUS_GENERATED_FILES_DIR_NAME: `.docusaurus-${locale}`,
    BLOG_DEV_PORT: port,
  });
}
start(['node_modules/next/dist/bin/next', 'dev', '--webpack', '--hostname', '0.0.0.0', '--port', '3000']);
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
