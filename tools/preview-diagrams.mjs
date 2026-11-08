// Screenshots a tutorial's high-contrast drawings onto one contact sheet, to check them by eye.
// Usage: node tools/preview-diagrams.mjs <tutorial-folder> <out.png> [name-prefix ...]
// Needs Google Chrome (or set CHROME=/path/to/chrome).
import { readdirSync, writeFileSync, existsSync, readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const [dir, out, ...prefixes] = process.argv.slice(2);
if (!dir || !out) { console.error('usage: node tools/preview-diagrams.mjs <tutorial-folder> <out.png> [name-prefix ...]'); process.exit(1); }
const printDir = join(resolve(dir), 'diagrams', 'print');
const files = readdirSync(printDir).filter(f => f.endsWith('.svg') && (!prefixes.length || prefixes.some(p => f.startsWith(p)))).sort();
const chrome = [process.env.CHROME, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => p && existsSync(p));
if (!chrome) { console.error('Google Chrome not found; set CHROME'); process.exit(1); }

// Height of each drawing at 760 px wide, from its viewBox.
const heights = files.map(f => {
  const m = readFileSync(join(printDir, f), 'utf8').match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  return m ? Math.ceil((760 * +m[2]) / +m[1]) : 500;
});
const tmp = mkdtempSync(join(tmpdir(), 'diagram-preview-'));
const html = join(tmp, 'sheet.html');
writeFileSync(html, `<html><body style="margin:0;background:#fff">${files.map(f =>
  `<div style="font:11px monospace;color:#c00;padding:2px 4px">${f}</div><img src="file://${join(printDir, f)}" style="display:block;width:760px;border-bottom:1px dashed #c00">`).join('')}</body></html>`);
const total = heights.reduce((a, b) => a + b + 20, 0);
execFileSync(chrome, ['--headless', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', `--user-data-dir=${join(tmp, 'profile')}`,
  '--force-device-scale-factor=1.5', `--window-size=760,${total}`, `--screenshot=${resolve(out)}`, 'file://' + html], { stdio: 'pipe' });
rmSync(tmp, { recursive: true, force: true });
console.log(`wrote ${out}: ${files.join(', ')}`);
