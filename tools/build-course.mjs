// Builds a tutorial's web page and printable PDF from its README.md.
//
//   <tutorial>/<name>.html  for reading on screen; links the greyscale drawings in diagrams/
//   <tutorial>/<name>.pdf   print-first: cover with page-numbered contents, high-contrast drawings
//                           (diagrams/print/), cut-out cards, fill-in worksheets
//
// Usage:  node tools/build-course.mjs <tutorial-folder> [--letter] [--html-only]
// Settings come from <tutorial>/course.config.mjs (see soldering/course.config.mjs).
// Needs Google Chrome for the PDF (or CHROME=/path/to/chrome). Optional: Swift (macOS) for the
// page numbers in the contents list. No npm dependencies.
// Run `node tools/render-diagrams.mjs <tutorial-folder>` first if you changed a drawing.
import { readFileSync, writeFileSync, existsSync, rmSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const tools = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const root = args.find(a => !a.startsWith('--')) && resolve(args.find(a => !a.startsWith('--')));
if (!root || !existsSync(join(root, 'README.md'))) { console.error('usage: node tools/build-course.mjs <tutorial-folder> [--letter] [--html-only]'); process.exit(1); }
const letter = args.includes('--letter');
const htmlOnly = args.includes('--html-only');
const configPath = join(root, 'course.config.mjs');
const config = existsSync(configPath) ? (await import(pathToFileURL(configPath).href)).default : {};
const name = config.name || 'course';

// ---- Markdown subset -> blocks ------------------------------------------------------
// Headings, paragraphs, lists (nested, task lists), tables, images on their own line,
// fenced code blocks (```lang optional-label), and > blockquotes (callouts).
const esc = s => s.replace(/&(?!#?\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escCode = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s/g, '-');

let target = 'pdf'; // inline() renders links differently for the web page and the PDF
function inline(src) {
  const code = [];
  let s = src.replace(/`([^`]+)`/g, (_, c) => `\u0000${code.push(c) - 1}\u0000`);
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, href) => {
    if (href.startsWith('#')) return `<a href="${href}">${t}</a>`;
    const external = /^https?:/.test(href);
    if (target === 'html') return `<a href="${href.replace(/README\.md$/, '')}">${t}</a>`;
    const shown = href.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return external && shown !== t.replace(/<[^>]+>|\u0000\d+\u0000/g, '') ? `<span class="ref">${t}</span> <span class="url">(${shown})</span>` : `<span class="ref">${t}</span>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*\w])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${escCode(code[i])}</code>`);
}

function parseList(lines, i, indent) {
  const ordered = /^\d+\./.test(lines[i].trim());
  const start = ordered ? parseInt(lines[i].trim(), 10) : 1;
  let html = '';
  while (i < lines.length) {
    const m = lines[i].match(/^(\s*)([-*]|\d+\.) (.*)$/);
    if (!m && /^\s+\S/.test(lines[i]) && html) { html = html.replace(/<\/li>$/, ' ' + inline(lines[i].trim()) + '</li>'); i++; continue; } // wrapped line
    if (!m || m[1].length < indent) break;
    if (m[1].length > indent) { const [sub, j] = parseList(lines, i, m[1].length); html = html.replace(/<\/li>$/, sub + '</li>'); i = j; continue; }
    const task = m[3].match(/^\[( |x)\] (.*)$/);
    html += task ? `<li class="task"><span class="box"></span>${inline(task[2])}</li>` : `<li>${inline(m[3])}</li>`;
    i++;
  }
  const tag = ordered ? 'ol' : 'ul';
  const cls = html.includes('class="task"') ? ' class="tasks"' : '';
  return [`<${tag}${cls}${ordered && start !== 1 ? ` start="${start}" style="counter-reset: step ${start - 1}"` : ''}>${html}</${tag}>`, i];
}

function markdown(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let m;
    if ((m = line.match(/^```\s*(\S*)\s*(.*)$/))) {
      const body = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) body.push(lines[i++]);
      i++;
      out.push({ type: 'code', lang: m[1], label: m[2].trim(), text: body.join('\n') });
      continue;
    }
    if ((m = line.match(/^(#{1,6}) (.*)$/))) {
      out.push({ type: 'h', level: m[1].length, text: m[2], md: m[2], id: slug(m[2]) }); i++; continue;
    }
    if ((m = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/))) { out.push({ type: 'img', alt: m[1], src: m[2] }); i++; continue; }
    if (line.startsWith('>')) {
      const body = [];
      while (i < lines.length && lines[i].startsWith('>')) body.push(lines[i++].replace(/^>\s?/, ''));
      out.push({ type: 'quote', md: body.join('\n') });
      continue;
    }
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = r => r.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g, '|'));
      out.push({ type: 'table', head: cells(rows[0]), body: rows.slice(2).map(cells) });
      continue;
    }
    if (/^\s*([-*]|\d+\.) /.test(line)) {
      const start = i;
      while (i < lines.length && (/^\s*([-*]|\d+\.) /.test(lines[i]) || (/^\s+\S/.test(lines[i]) && i > start))) i++;
      out.push({ type: 'list', lines: lines.slice(start, i) });
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#|\||!\[|>|```|\s*([-*]|\d+\.) )/.test(lines[i])) para.push(lines[i++].trim());
    out.push({ type: 'p', text: para.join(' ') });
  }
  return out;
}

// ---- Shared layout ---------------------------------------------------------------------
const blocks = markdown(readFileSync(join(root, 'README.md'), 'utf8'));
const title = blocks.find(b => b.type === 'h' && b.level === 1);
const firstH2 = blocks.findIndex(b => b.type === 'h' && b.level === 2);
const intro = blocks.slice(1, firstH2);
const chapters = [];
for (const b of blocks.slice(firstH2)) {
  if (b.type === 'h' && b.level === 2) chapters.push({ ...b, blocks: [] });
  else chapters[chapters.length - 1].blocks.push(b);
}

const printSvg = src => {
  const p = join(root, src.replace(/^diagrams\//, 'diagrams/print/'));
  return readFileSync(existsSync(p) ? p : join(root, src), 'utf8').replace(/^<\?xml[^>]*>\s*/, '');
};
const isEmptyLog = t => t.head[0] === 'Date' && t.body.every(r => r.every(c => !c || c === '&nbsp;'));
const tableHtml = t => `<div class="table-wrap"><table><thead><tr>${t.head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${
  (isEmptyLog(t) && target === 'pdf' ? Array(17).fill(t.head.map(() => '')) : t.body).map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

function codeHtml(b) {
  const label = b.label || (b.lang && b.lang !== 'text' ? b.lang : '');
  const long = b.text.split('\n').length > 45 ? ' long' : '';
  return `<div class="code${long}">${label ? `<div class="code-label">${esc(label)}</div>` : ''}<pre><code>${escCode(b.text)}</code></pre></div>`;
}

function quoteHtml(b) {
  const kind = /^\*\*(Warning|Danger|Caution)\b/i.test(b.md) ? 'warn' : /^\*\*(Tip|Try it)\b/i.test(b.md) ? 'tip' : 'note';
  return `<aside class="callout ${kind}">${renderBlocks(markdown(b.md))}</aside>`;
}

function renderBlocks(list, chapterId) {
  let html = '';
  let card = false;
  for (let k = 0; k < list.length; k++) {
    const b = list[k];
    if (b.type === 'h') {
      if (card) { html += '</div>'; card = false; }
      const wall = /tape this to the wall/i.test(b.text);
      if (/^Card /.test(b.text) || wall) { html += `<div class="card${wall ? ' wall' : ''}"><div class="cut">✂ cut along the dashed line</div>`; card = true; }
      if (b.text === 'Practice log' && target === 'pdf') html += '<div class="page-break"></div>';
      html += `<h${b.level} id="${b.id}">${inline(b.md)}</h${b.level}>`;
      continue;
    }
    if (b.type === 'img') {
      const next = list[k + 1];
      const caption = next && next.type === 'p' ? (k++, inline(next.text)) : '';
      const pic = target === 'pdf' ? printSvg(b.src) : `<img src="${b.src}" alt="${esc(b.alt)}">`;
      html += `<figure>${pic}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
      continue;
    }
    if (b.type === 'p') {
      if (/^\*\*(Goal|Project goal):\*\*/.test(b.text)) { html += `<p class="goal">${inline(b.text)}</p>`; continue; }
      if (/^\*\*Printable version:\*\*/.test(b.text) && target === 'pdf') continue;
      if (/^\*\*[^*]+\*\*:?$/.test(b.text)) { html += `<p class="label">${inline(b.text)}</p>`; continue; }
      html += `<p>${inline(b.text)}</p>`;
      continue;
    }
    if (b.type === 'list') { html += parseList(b.lines, 0, 0)[0]; continue; }
    if (b.type === 'table') { html += tableHtml(b); continue; }
    if (b.type === 'code') { html += codeHtml(b); continue; }
    if (b.type === 'quote') { html += quoteHtml(b); continue; }
  }
  if (card) html += '</div>';
  return html;
}

const appendix = (config.appendix || []).map(a => ({ ...a, html: typeof a.html === 'function' ? a.html({ letter }) : a.html }));
const tocItems = [...chapters.map(c => ({ id: c.id, md: c.md })), ...appendix.map(a => ({ id: a.id, md: a.title }))];
const subtitle = intro.find(b => b.type === 'p' && b.text.startsWith('*'));
const css = f => readFileSync(join(tools, f), 'utf8');

function document(pageNumbers) {
  const pdf = target === 'pdf';
  const toc = tocItems.map((t, k) => `<a class="toc-row" href="#${t.id}"><span class="toc-text">${inline(t.md)}</span><span class="toc-dots"></span><span class="toc-page">${pageNumbers ? pageNumbers[k] ?? '' : ''}</span></a>`).join('');
  const body = chapters.map(c => `<section class="chapter" id="${c.id}"><h2>${inline(c.md)}</h2>${renderBlocks(c.blocks, c.id)}</section>`).join('\n');
  const extra = appendix.map(a => `<section class="worksheet" id="${a.id}"><h2>${inline(a.title)}</h2>${a.html}</section>`).join('\n');
  const coverFig = config.coverFigure ? (pdf ? printSvg(config.coverFigure) : `<img src="${config.coverFigure}" alt="">`) : '';
  const introHtml = pdf ? '' : renderBlocks(intro.filter(b => b !== subtitle));
  const styles = (pdf ? css('print.css').replace('/*PAGE_SIZE*/', letter ? 'letter' : 'A4').replace('/*SHORT_TITLE*/', JSON.stringify(config.short || title.text)) : css('screen.css')) + (config.css || '');
  const printNote = pdf
    ? `<div class="howto"><b>Printing:</b> ${letter ? 'US Letter' : 'A4'}, single-sided, black and white, at <b>100 % / actual size</b>. ${config.printNote || ''}</div>`
    : intro.some(b => b.type === 'p' && /^\*\*Printable version:\*\*/.test(b.text)) ? '' : `<div class="howto"><b>Printable version:</b> <a href="${name}.pdf">${name}.pdf</a> has the same content with high-contrast drawings, page numbers and cut-out cards.</div>`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title.text)}</title><style>${styles}</style></head>
<body class="${target}"><main>
<section class="cover">
  <h1>${inline(title.md)}</h1>
  ${subtitle ? `<p class="sub">${inline(subtitle.text).replace(/<\/?em>/g, '')}</p>` : ''}
  ${coverFig ? `<figure class="cover-fig">${coverFig}</figure>` : ''}
  ${introHtml}
  <h2 class="toc-head">Contents</h2>
  <nav class="toc">${toc}</nav>
  ${printNote}
</section>
${body}
${extra}
</main></body></html>`;
}

// ---- Web page ------------------------------------------------------------------------------
target = 'html';
writeFileSync(join(root, `${name}.html`), document(null));
console.log(`wrote ${join(root, name + '.html')}`);
if (htmlOnly) process.exit(0);

// ---- PDF via headless Chrome ---------------------------------------------------------------
target = 'pdf';
const chrome = [process.env.CHROME, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(p => p && existsSync(p));
if (!chrome) { console.error('Google Chrome not found; set CHROME=/path/to/chrome'); process.exit(1); }
const outPdf = join(root, `${name}${letter ? '-letter' : ''}.pdf`);
const work = mkdtempSync(join(tmpdir(), 'course-pdf-'));

function render(html) {
  const file = join(work, 'print.html');
  writeFileSync(file, html);
  execFileSync(chrome, ['--headless', '--disable-gpu', '--no-pdf-header-footer', '--generate-pdf-document-outline',
    `--user-data-dir=${join(work, 'profile')}`, `--print-to-pdf=${outPdf}`, pathToFileURL(file).href], { stdio: 'pipe' });
}

function tocPages() {
  try {
    const out = execFileSync('swift', [join(tools, 'toc-pages.swift'), outPdf, '2'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    const lines = out.trim().split('\n');
    return { total: Number(lines[0].split('\t')[1]), pages: lines.slice(1).map(Number) };
  } catch {
    return null;
  }
}

render(document(null));
const found = tocPages();
if (found && found.pages.length === tocItems.length) {
  render(document(found.pages)); // same layout, numbers filled in
  console.log(`wrote ${outPdf} (${found.total} pages)`);
} else {
  console.log(`wrote ${outPdf} (contents without page numbers: ${found ? `found ${found.pages.length} of ${tocItems.length} links` : 'Swift not available'})`);
}
rmSync(work, { recursive: true, force: true });
