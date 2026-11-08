// Rebuilds every tutorial: drawings (where a tutorial has diagrams/src), then the web page and PDF,
// then checks the links. Options are passed on to build-course.mjs (--letter, --html-only).
// Usage: node tools/build-all.mjs [--letter] [--html-only] [tutorial ...]
import { readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const tools = dirname(fileURLToPath(import.meta.url));
const repo = resolve(tools, '..');
const args = process.argv.slice(2);
const flags = args.filter(a => a.startsWith('--'));
const only = args.filter(a => !a.startsWith('--'));
const tutorials = readdirSync(repo, { withFileTypes: true })
  .filter(d => d.isDirectory() && existsSync(join(repo, d.name, 'README.md')) && existsSync(join(repo, d.name, 'course.config.mjs')))
  .map(d => d.name)
  .filter(n => !only.length || only.includes(n))
  .sort();

const run = (script, ...a) => execFileSync(process.execPath, [join(tools, script), ...a], { cwd: repo, stdio: 'inherit' });
for (const t of tutorials) {
  console.log(`\n== ${t}`);
  if (existsSync(join(repo, t, 'diagrams', 'src'))) run('render-diagrams.mjs', t);
  run('build-course.mjs', t, ...flags);
}
console.log('\n== links');
run('check-links.mjs');
