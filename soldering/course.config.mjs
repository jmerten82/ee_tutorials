// Settings for tools/build-course.mjs: node tools/build-course.mjs soldering
// The three worksheets at the end of the PDF are drawn here, to scale where it matters.

// ---- Worksheets (actual-size where it matters) ---------------------------------------
const resistorIcon = '<svg viewBox="0 0 60 14" width="15mm" height="3.5mm"><line x1="0" y1="7" x2="60" y2="7" stroke="#000" stroke-width="1.5"/><rect x="16" y="1.5" width="28" height="11" rx="5" fill="#fff" stroke="#000" stroke-width="1.5"/><circle cx="3" cy="7" r="3" fill="#000"/><circle cx="57" cy="7" r="3" fill="#000"/></svg>';
const scoreSheet = `
<p>For Exercise 2.1. Copy this grid to match your board, solder all 50 joints, then inspect each with the loupe against Card D. Tick <b>P</b> (pass) or <b>F</b> (fail) for both joints of every resistor. Pass the lesson at 45 or more.</p>
<div class="fields"><span>Date</span><span>Alloy</span><span>Tip temp</span><span>Avg. s / joint</span></div>
<table class="score"><tbody>
${Array.from({ length: 5 }, (_, r) => `<tr>${Array.from({ length: 5 }, (_, c) => {
  const n = r * 5 + c + 1;
  return `<td><div class="rnum">R${n}</div>${resistorIcon}<div class="pf"><span>A</span><i>P</i><i>F</i></div><div class="pf"><span>B</span><i>P</i><i>F</i></div></td>`;
}).join('')}</tr>`).join('')}
</tbody></table>
<div class="tally"><span>Passed: ______ / 50</span><span>Most common fault: ______________________</span></div>
<p class="small">Failed joints are your material for Exercise 3.4: rework them, then write the new result beside the F.</p>
`;

function layoutGrid() {
  const cols = 27, rows = 35, p = 5.08, m = 8; // 2:1 scale of a 2.54 mm perfboard, about 7 x 9 cm
  const w = m + cols * p, h = m + rows * p;
  let dots = '', labels = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = m + c * p + p / 2, y = m + r * p + p / 2;
    dots += `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(c + 1) % 5 === 0 || (r + 1) % 5 === 0 ? 0.55 : 0.4}"/>`;
  }
  for (let c = 0; c < cols; c += 1) if ((c + 1) % 5 === 0 || c === 0) labels += `<text x="${(m + c * p + p / 2).toFixed(2)}" y="5.5" text-anchor="middle">${c + 1}</text>`;
  for (let r = 0; r < rows; r++) if ((r + 1) % 5 === 0 || r === 0) labels += `<text x="5.6" y="${(m + r * p + p / 2 + 1.1).toFixed(2)}" text-anchor="end">${r + 1}</text>`;
  return `<svg class="grid" viewBox="0 0 ${w} ${h}" width="${w}mm" height="${h}mm" font-family="Helvetica, Arial, sans-serif" font-size="2.8">
    <rect x="${m}" y="${m}" width="${cols * p}" height="${rows * p}" fill="none" stroke="#000" stroke-width="0.35"/>
    <g fill="#000">${dots}</g><g fill="#000">${labels}</g></svg>`;
}
const gridSheet = `
<p>For Exercise 2.3 (555 blinker) and 6.5 (interlock board). Each dot is one hole of a 2.54 mm perfboard, drawn at <b>twice actual size</b> so there is room to write. Draw parts as seen from the component side; draw copper-side links as dashed lines. Mark pin 1 of every IC and the stripe of every polarised part.</p>
<div class="grid-wrap">${layoutGrid()}</div>
`;

function rulerCard() {
  const W = 170;
  let t = '';
  // 100 mm ruler
  t += `<g transform="translate(6,6)"><rect x="0" y="0" width="100" height="10" fill="none" stroke="#000" stroke-width="0.3"/>`;
  for (let i = 0; i <= 100; i++) t += `<line x1="${i}" y1="0" x2="${i}" y2="${i % 10 === 0 ? 6 : i % 5 === 0 ? 4 : 2.4}" stroke="#000" stroke-width="${i % 10 === 0 ? 0.3 : 0.18}"/>`;
  for (let i = 0; i <= 100; i += 10) t += `<text x="${i}" y="13.2" text-anchor="middle" font-size="2.6">${i / 10}</text>`;
  t += `<text x="104" y="7" font-size="3">cm</text></g><text x="6" y="25" font-size="3">Scale check: this ruler must measure exactly 100 mm. If not, reprint at 100 % / actual size.</text>`;
  // strip gauges
  t += `<text x="6" y="33" font-size="3.6" font-weight="bold">Strip-length gauge (1:1): hold the wire against the bar</text>`;
  [[2, 'USB inner conductors (6.1)'], [5, 'Tinning a wire end (1.1)'], [8, 'Splice, minimum (1.2)'], [10, 'Splice, maximum (1.2)'], [25, 'USB outer jacket (6.1)']].forEach(([mm, label], k) => {
    const y = 38 + k * 6.5;
    t += `<rect x="6" y="${y}" width="${mm}" height="3.4" fill="#000"/><line x1="6" y1="${y - 1}" x2="6" y2="${y + 4.4}" stroke="#000" stroke-width="0.3"/><text x="${6 + Math.max(mm, 25) + 3}" y="${y + 3}" font-size="3"><tspan font-weight="bold">${mm} mm</tspan>  ${label}</text>`;
  });
  // chip sizes
  const cy = 80;
  t += `<text x="6" y="${cy}" font-size="3.6" font-weight="bold">Chip sizes: actual size, and 5× to see the shape</text>`;
  [['1206', 3.2, 1.6], ['0805', 2.0, 1.25], ['0603', 1.6, 0.8]].forEach(([name, l, w], k) => {
    const x = 6 + k * 58, y = cy + 6;
    t += `<rect x="${x}" y="${y + 2}" width="${l}" height="${w}" fill="#000"/>`;
    t += `<g transform="translate(${x + 8},${y})"><rect x="0" y="0" width="${l * 5}" height="${w * 5}" fill="#ddd" stroke="#000" stroke-width="0.35"/><rect x="0" y="0" width="${l * 5 * 0.18}" height="${w * 5}" fill="#000"/><rect x="${l * 5 * 0.82}" y="0" width="${l * 5 * 0.18}" height="${w * 5}" fill="#000"/></g>`;
    t += `<text x="${x}" y="${y + 13}" font-size="3"><tspan font-weight="bold">${name}</tspan>  ${l} × ${w} mm</text>`;
  });
  // pitches
  const py = 108;
  t += `<text x="6" y="${py}" font-size="3.6" font-weight="bold">Pin pitch at 1:1 (left) and 4× (right)</text>`;
  [['2.54 mm', 'DIP, headers', 2.54], ['1.27 mm', 'SOIC', 1.27], ['0.65 mm', 'TSSOP', 0.65]].forEach(([name, what, p], k) => {
    const y = py + 5 + k * 12;
    let pins = '', big = '';
    for (let n = 0; n < 6; n++) pins += `<rect x="${6 + n * p}" y="${y}" width="${p * 0.45}" height="3" fill="#000"/>`;
    for (let n = 0; n < 6; n++) big += `<rect x="${n * p * 4}" y="0" width="${p * 4 * 0.45}" height="7" fill="#000"/>`;
    t += pins + `<g transform="translate(30,${y - 2})">${big}</g><text x="${30 + 6 * p * 4 + 4}" y="${y + 3}" font-size="3"><tspan font-weight="bold">${name}</tspan>  ${what}</text>`;
  });
  // wire gauges
  const wy = 152;
  t += `<text x="6" y="${wy}" font-size="3.6" font-weight="bold">Copper diameter at 4× (bare conductor, no insulation)</text>`;
  [['18 AWG', 1.02], ['22 AWG', 0.64], ['26 AWG', 0.40], ['28 AWG', 0.32]].forEach(([name, d], k) => {
    const x = 12 + k * 40;
    t += `<circle cx="${x}" cy="${wy + 9}" r="${(d * 4) / 2}" fill="#000"/><text x="${x + 5}" y="${wy + 10}" font-size="3"><tspan font-weight="bold">${name}</tspan>  ${d} mm</text>`;
  });
  return `<svg viewBox="0 0 ${W} 168" width="${W}mm" height="168mm" font-family="Helvetica, Arial, sans-serif">${t}</svg>`;
}
const rulerSheet = `
<p>Print this page at <b>100 % / actual size</b> (not "fit to page") and check the ruler first. Keep it beside the vise: the bars give the strip lengths used in this course, and the chips and pitches show what you are about to pick up.</p>
<div class="card ruler"><div class="cut">✂ cut along the dashed line</div>${rulerCard()}</div>
`;

export default {
  name: 'soldering-course',
  short: 'Hands-On Soldering',
  coverFigure: 'diagrams/01-core-technique.svg',
  printNote: 'The bench ruler in Worksheet 3 is to scale. Fill in checkboxes, worksheets and the practice log with a pen; cut out the bench cards along the dashed lines.',
  appendix: [
    { id: 'worksheet-50-joint-drill', title: 'Worksheet 1: 50-joint drill score sheet', html: scoreSheet },
    { id: 'worksheet-layout-grid', title: 'Worksheet 2: perfboard layout grid', html: gridSheet },
    { id: 'worksheet-bench-ruler', title: 'Worksheet 3: actual-size bench ruler', html: rulerSheet },
  ],
  css: `
.score td { width: 20%; height: 31mm; text-align: center; vertical-align: middle; padding: 3pt; }
.rnum { font-weight: 700; font-size: 11pt; margin-bottom: 2pt; }
.pf { display: flex; justify-content: center; align-items: center; gap: 2.5mm; margin-top: 2.5mm; font-size: 9pt; }
.pf span { font-weight: 700; width: 4mm; }
.pf i { font-style: normal; display: inline-block; width: 6mm; height: 6mm; line-height: 6mm; border: 1.2pt solid #000; font-size: 8pt; }
.tally { display: flex; justify-content: space-between; font-size: 12pt; font-weight: 700; margin: 10pt 0 6pt; flex-wrap: wrap; gap: 6pt; }
.small { font-size: 9pt; }
.grid-wrap { display: flex; justify-content: center; margin-top: 4pt; overflow-x: auto; }
.grid { display: block; }
.card.ruler { padding: 8pt 4pt 0; }
.card.ruler svg { display: block; }
`,
};
