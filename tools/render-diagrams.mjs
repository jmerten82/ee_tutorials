// Renders every <tutorial>/diagrams/src/*.jsx drawing twice:
//   <tutorial>/diagrams/<name>.svg        greyscale, for the README and the HTML page
//   <tutorial>/diagrams/print/<name>.svg  high contrast (pure black ink, heavier strokes), for the PDF
// No dependencies: a small JSX-to-h() transform below covers the subset these drawings use.
// Usage: node tools/render-diagrams.mjs <tutorial-folder> [name-prefix]
// Drawings must not declare their own variable named `h`: it would hide the h() element factory.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';

if (!process.argv[2]) { console.error('usage: node tools/render-diagrams.mjs <tutorial-folder> [name-prefix]'); process.exit(1); }
const here = join(resolve(process.argv[2]), 'diagrams', 'src');
const out = join(here, '..');
const only = process.argv[3] || '';

// ---- minimal JSX transform -------------------------------------------------
function skipString(src, i) {
  const q = src[i];
  let j = i + 1;
  while (j < src.length && src[j] !== q) j += src[j] === '\\' ? 2 : 1;
  if (j >= src.length) throw new Error(`unterminated string starting at character ${i}`);
  return j + 1;
}
function skipTemplate(src, i) {
  let k = i + 1;
  while (src[k] !== '`') {
    if (src[k] === '\\') k += 2;
    else if (src.startsWith('${', k)) k = walkJS(src, k + 2, true)[1] + 1;
    else k++;
  }
  return k + 1;
}
function walkJS(src, i, stop) {
  let out = '', depth = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { const j = src.indexOf('\n', i); i = j < 0 ? src.length : j; continue; } // line comment
    if (c === '/' && src[i + 1] === '*') { const j = src.indexOf('*/', i + 2); i = j < 0 ? src.length : j + 2; continue; } // block comment
    if (c === "'" || c === '"') { const j = skipString(src, i); out += src.slice(i, j); i = j; continue; }
    if (c === '`') { const j = skipTemplate(src, i); out += src.slice(i, j); i = j; continue; }
    if (c === '<' && /[A-Za-z]/.test(src[i + 1])) { const [code, j] = parseEl(src, i); out += code; i = j; continue; }
    if (stop) {
      if (c === '{') depth++;
      if (c === '}') { if (depth === 0) return [out, i]; depth--; }
    }
    out += c; i++;
  }
  return [out, i];
}
function parseEl(src, i) {
  i++;
  let name = '';
  while (/[A-Za-z0-9]/.test(src[i])) name += src[i++];
  const props = [], kids = [];
  for (;;) {
    while (/\s/.test(src[i])) i++;
    if (src.startsWith('/>', i)) return [`h(${JSON.stringify(name)}, {${props.join(', ')}})`, i + 2];
    if (src[i] === '>') { i++; break; }
    let a = '';
    while (/[A-Za-z0-9_:\-]/.test(src[i])) a += src[i++];
    let v = 'true';
    if (src[i] === '=') {
      i++;
      if (src[i] === "'" || src[i] === '"') { const j = skipString(src, i); v = src.slice(i, j); i = j; }
      else { const [e, j] = walkJS(src, i + 1, true); v = `(${e})`; i = j + 1; }
    }
    props.push(`${JSON.stringify(a)}: ${v}`);
  }
  for (;;) {
    if (src.startsWith('</', i)) { i = src.indexOf('>', i) + 1; break; }
    if (src[i] === '<') { const [c, j] = parseEl(src, i); kids.push(c); i = j; continue; }
    if (src[i] === '{') { const [e, j] = walkJS(src, i + 1, true); if (e.trim()) kids.push(`(${e})`); i = j + 1; continue; }
    let j = i;
    while (j < src.length && src[j] !== '<' && src[j] !== '{') j++;
    // JSX whitespace rules: runs containing a line break vanish, spaces on the same line are kept.
    const t = src.slice(i, j).replace(/^\s*\n\s*/, '').replace(/\s*\n\s*$/, '').replace(/\s+/g, ' ');
    if (t) kids.push(JSON.stringify(t));
    i = j;
  }
  return [`h(${JSON.stringify(name)}, {${props.join(', ')}}${kids.length ? ', ' + kids.join(', ') : ''})`, i];
}

// ---- h(): elements to SVG markup ------------------------------------------
const KEEP = new Set(['viewBox', 'refX', 'refY', 'markerWidth', 'markerHeight']);
const PALETTES = {
  screen: { // greyscale: black, greys, white
    '--cds-text-primary': '#111111',
    '--cds-text-secondary': '#444444',
    '--cds-chart-reference-tint': '#ececec',
    '--cds-chart-grid': '#bbbbbb',
    '--cds-chart-axis': '#666666',
  },
  print: { // high contrast: every line and letter pure black, one light fill
    '--cds-text-primary': '#000000',
    '--cds-text-secondary': '#000000',
    '--cds-chart-reference-tint': '#dedede',
    '--cds-chart-grid': '#000000',
    '--cds-chart-axis': '#000000',
  },
};
// High-contrast tweaks: strokes 1.5x heavier, small text one step larger, bold headings bolder.
const PRINT = { stroke: 1.5, minStroke: 1.5, smallText: 12.5, weight: '700' };
let mode = 'screen';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const quote = s => esc(s).replace(/"/g, '&quot;');
const kebab = k => (KEEP.has(k) || k.includes('-') ? k : k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()));
globalThis.h = (tag, props, ...children) => {
  const p = { ...(props || {}) };
  if (mode === 'print') {
    const sw = parseFloat(p.strokeWidth);
    if (!Number.isNaN(sw)) p.strokeWidth = String(Math.max(PRINT.minStroke, +(sw * PRINT.stroke).toFixed(2)));
    if (parseFloat(p.fontSize) < 12) p.fontSize = String(PRINT.smallText);
    if (p.fontWeight === '600') p.fontWeight = PRINT.weight;
  }
  if (tag === 'svg') { p.xmlns = 'http://www.w3.org/2000/svg'; p.fontFamily = 'Helvetica, Arial, sans-serif'; }
  const attrs = Object.entries(p)
    .filter(([k, v]) => k !== 'key' && !k.startsWith('data-claude') && v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${kebab(k)}="${quote(v)}"`).join('');
  const inner = children.flat(Infinity)
    .filter(c => c !== null && c !== undefined && c !== false && c !== true)
    .map(c => (c && c.__svg !== undefined ? c.__svg : esc(c))).join('');
  return { __svg: `<${tag}${attrs}>${inner}</${tag}>` };
};

const TARGETS = [['screen', out], ['print', join(out, 'print')]];
mkdirSync(join(out, 'print'), { recursive: true });
for (const f of readdirSync(here).filter(f => f.endsWith('.jsx') && f.startsWith(only)).sort()) {
  const code = walkJS(readFileSync(join(here, f), 'utf8'), 0, false)[0];
  const mod = await import('data:text/javascript,' + encodeURIComponent(code));
  for (const [m, dir] of TARGETS) {
    mode = m;
    const colors = PALETTES[m];
    const svg = mod.default().__svg.replace(/var\((--[a-z-]+)\)/g, (_, v) => colors[v] ?? '#000000');
    writeFileSync(join(dir, basename(f, '.jsx') + '.svg'), '<?xml version="1.0" encoding="UTF-8"?>\n' + svg + '\n');
  }
  console.log('wrote', basename(f, '.jsx') + '.svg', '+ print/' + basename(f, '.jsx') + '.svg');
}
