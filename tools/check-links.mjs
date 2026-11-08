// Checks every relative link and image in the repository's Markdown: the target file must exist,
// and a #fragment must match a heading in the target (same slug rule as GitHub and build-course.mjs).
// External http(s) links are listed with --external but not fetched.
// Usage: node tools/check-links.mjs [--external]
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const showExternal = process.argv.includes('--external');
const slug = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[`*]/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/[^\p{L}\p{N}\s_-]/gu, '').trim().replace(/\s/g, '-');

const mdFiles = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md')) mdFiles.push(p);
  }
})(repo);

const anchorCache = {};
function anchors(file) {
  if (anchorCache[file]) return anchorCache[file];
  const seen = {};
  const set = new Set();
  let fence = false;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (/^```/.test(line)) fence = !fence;
    const m = !fence && line.match(/^#{1,6} (.*)$/);
    if (!m) continue;
    const base = slug(m[1]);
    const n = seen[base] = (seen[base] ?? -1) + 1;
    set.add(n ? `${base}-${n}` : base);
  }
  return (anchorCache[file] = set);
}

let errors = 0, checked = 0;
const external = new Set();
for (const file of mdFiles) {
  let fence = false;
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (/^```/.test(line)) { fence = !fence; return; }
    if (fence) return;
    const text = line.replace(/`[^`]*`/g, '');
    for (const [, href] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(https?:|mailto:)/.test(href)) { external.add(href); continue; }
      checked++;
      const [path, frag] = href.split('#');
      const target = path ? resolve(dirname(file), decodeURIComponent(path)) : file;
      const where = `${relative(repo, file)}:${i + 1}`;
      if (!existsSync(target)) { console.log(`${where}  missing file: ${href}`); errors++; continue; }
      if (frag && target.endsWith('.md') && statSync(target).isFile() && !anchors(target).has(frag)) {
        console.log(`${where}  missing anchor: ${href}`); errors++;
      }
    }
  });
}
if (showExternal) [...external].sort().forEach(u => console.log('external', u));
console.log(`${mdFiles.length} Markdown files, ${checked} relative links checked, ${external.size} external links, ${errors} problem${errors === 1 ? '' : 's'}`);
process.exit(errors ? 1 : 0);
