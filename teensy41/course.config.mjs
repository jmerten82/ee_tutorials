// Settings for tools/build-course.mjs: node tools/build-course.mjs teensy41
// The worksheets at the end of the PDF are drawn here; the pin strips are actual size (2.54 mm pitch).

// ---- Pin data (top view, USB at the top), checked against the PJRC pinout card ------------------
// ~ marks PWM. Left side top to bottom, then right side top to bottom.
const LEFT = [
  ['GND', ''], ['0', 'RX1 CRX2 CS1 ~'], ['1', 'TX1 CTX2 MISO1 ~'], ['2', '~'], ['3', '~'], ['4', '~'], ['5', '~'],
  ['6', '~'], ['7', 'RX2 ~'], ['8', 'TX2 ~'], ['9', '~'], ['10', 'MQSR CS ~'], ['11', 'MOSI ~'], ['12', 'MQSL MISO ~'],
  ['3.3V', 'out'], ['24', 'A10 TX6 SCL2 ~'], ['25', 'A11 RX6 SDA2 ~'], ['26', 'A12 MOSI1'], ['27', 'A13 SCK1'],
  ['28', 'RX7 ~'], ['29', 'TX7 ~'], ['30', 'CRX3'], ['31', 'CTX3'], ['32', ''],
];
const RIGHT = [
  ['VIN', '3.6–5.5 V'], ['GND', ''], ['3.3V', '250 mA'], ['23', 'A9 CRX1 ~'], ['22', 'A8 CTX1 ~'], ['21', 'A7 RX5'],
  ['20', 'A6 TX5'], ['19', 'A5 SCL ~'], ['18', 'A4 SDA ~'], ['17', 'A3 TX4 SDA1'], ['16', 'A2 RX4 SCL1'],
  ['15', 'A1 RX3 ~'], ['14', 'A0 TX3 ~'], ['13', 'LED SCK ~'], ['GND', ''], ['41', 'A17'], ['40', 'A16'],
  ['39', 'A15 MISO1'], ['38', 'A14 CS1'], ['37', 'CS ~'], ['36', 'CS ~'], ['35', 'TX8'], ['34', 'RX8'], ['33', '~'],
];

const P = 2.54, N = 24, W = 27; // pitch, pins per side, strip width (all mm)
const power = n => /^(GND|VIN|3\.3V)$/.test(n);

// One vertical strip; `side` 'L' = board to the right of the strip, 'R' = board to the left.
function strip(list, side) {
  let s = `<rect x="0" y="0" width="${W}" height="${N * P}" fill="#fff" stroke="#000" stroke-width="0.25"/>`;
  list.forEach(([n, f], i) => {
    const y = i * P;
    if (i) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#000" stroke-width="0.1"/>`;
    const anchor = side === 'L' ? 'end' : 'start';
    if (power(n)) s += `<rect x="${side === 'L' ? W - 8.2 : 0.4}" y="${y + 0.35}" width="7.8" height="${P - 0.7}" fill="#000"/>`;
    s += `<text x="${side === 'L' ? W - 4.3 : 4.3}" y="${y + 1.82}" text-anchor="middle" font-size="1.75" font-weight="bold" fill="${power(n) ? '#fff' : '#000'}">${n}</text>`;
    const fx = side === 'L' ? W - 9 : 9;
    s += `<text x="${fx}" y="${y + 1.78}" text-anchor="${anchor}" font-size="1.55">${f}</text>`;
  });
  return s;
}

function stripsSheet() {
  const gap = 15.24 - 2 * 0; // pin rows are 15.24 mm apart
  const bw = 17.78;           // board width
  // Portrait set: left strip | board outline | right strip, lined up with the pin rows.
  const x0 = 8, y0 = 24;
  const lx = x0, bx = lx + W + 1.5, rx = bx + bw + 1.5;
  const pinL = bx + (bw - gap) / 2, pinR = pinL + gap;
  let pins = '';
  for (let i = 0; i < N; i++) {
    pins += `<circle cx="${pinL}" cy="${y0 + i * P + P / 2}" r="0.55" fill="none" stroke="#000" stroke-width="0.15"/>`;
    pins += `<circle cx="${pinR}" cy="${y0 + i * P + P / 2}" r="0.55" fill="none" stroke="#000" stroke-width="0.15"/>`;
  }
  const portrait = `
    <text x="${x0}" y="${y0 - 16}" font-size="3.2" font-weight="bold">A. USB at the top (as in the pinout drawing)</text>
    <text x="${x0}" y="${y0 - 11.5}" font-size="2.3">Cut out both strips; lay them beside the board, numbers next to the pins.</text>
    <g transform="translate(${lx},${y0})">${strip(LEFT, 'L')}</g>
    <rect x="${bx}" y="${y0 - 4}" width="${bw}" height="${N * P + 4}" rx="1" fill="none" stroke="#000" stroke-width="0.2" stroke-dasharray="1 0.8"/>
    <rect x="${bx + bw / 2 - 4}" y="${y0 - 5.5}" width="8" height="5" fill="none" stroke="#000" stroke-width="0.2"/>
    <text x="${bx + bw / 2}" y="${y0 + 30}" text-anchor="middle" font-size="2.2">Teensy 4.1</text>
    <text x="${bx + bw / 2}" y="${y0 + 33}" text-anchor="middle" font-size="2.2">top view</text>
    ${pins}
    <g transform="translate(${rx},${y0})">${strip(RIGHT, 'R')}</g>`;
  // Landscape set: USB to the left, as on the breadboard in Lesson 1.
  const ly = y0 + N * P + 24;
  const landscape = `
    <text x="${x0}" y="${ly - 6}" font-size="3.2" font-weight="bold">B. USB to the left (breadboard view, Lessons 1 and 7)</text>
    <text x="${x0}" y="${ly - 2}" font-size="2.3">Top strip above the board, bottom strip below it.</text>
    <g transform="translate(${x0},${ly + W}) rotate(-90)">${strip(RIGHT, 'R')}</g>
    <rect x="${x0}" y="${ly + W + 1.5}" width="${N * P}" height="${bw}" rx="1" fill="none" stroke="#000" stroke-width="0.2" stroke-dasharray="1 0.8"/>
    <text x="${x0 + N * P / 2}" y="${ly + W + 1.5 + bw / 2 + 0.8}" text-anchor="middle" font-size="2.2">Teensy 4.1, USB to the left</text>
    <g transform="translate(${x0},${ly + W + 3 + bw + W}) rotate(-90)">${strip(LEFT, 'L')}</g>`;
  // Scale bar
  const sy = ly + 2 * W + bw + 14;
  let bar = `<g transform="translate(${x0},${sy})"><rect x="0" y="0" width="50" height="4" fill="none" stroke="#000" stroke-width="0.25"/>`;
  for (let i = 0; i <= 50; i++) bar += `<line x1="${i}" y1="0" x2="${i}" y2="${i % 10 === 0 ? 4 : i % 5 === 0 ? 2.8 : 1.6}" stroke="#000" stroke-width="${i % 10 === 0 ? 0.25 : 0.12}"/>`;
  for (let i = 0; i <= 50; i += 10) bar += `<text x="${i}" y="7.2" text-anchor="middle" font-size="2.2">${i}</text>`;
  bar += `<text x="54" y="3.4" font-size="2.6">mm: must measure exactly 50 mm.</text></g>`;
  const legend = `<text x="${x0 + 92}" y="${y0 + 4}" font-size="2.6" font-weight="bold">Key</text>
    <text x="${x0 + 92}" y="${y0 + 9}" font-size="2.3">~  PWM (analogWrite)</text>
    <text x="${x0 + 92}" y="${y0 + 13}" font-size="2.3">A0–A17  analog inputs</text>
    <text x="${x0 + 92}" y="${y0 + 17}" font-size="2.3">RXn / TXn  Serial1–8</text>
    <text x="${x0 + 92}" y="${y0 + 21}" font-size="2.3">SDA / SCL  I2C (Wire, 1, 2)</text>
    <text x="${x0 + 92}" y="${y0 + 25}" font-size="2.3">MOSI MISO SCK CS  SPI</text>
    <text x="${x0 + 92}" y="${y0 + 29}" font-size="2.3">CRXn / CTXn  CAN1–3</text>
    <text x="${x0 + 92}" y="${y0 + 33}" font-size="2.3">MQSL / MQSR  audio out</text>
    <text x="${x0 + 92}" y="${y0 + 40}" font-size="2.3">Every pin: 3.3 V only,</text>
    <text x="${x0 + 92}" y="${y0 + 44}" font-size="2.3">4 mA, interrupts.</text>
    <text x="${x0 + 92}" y="${y0 + 51}" font-size="2.3">Inner pads by the SD socket:</text>
    <text x="${x0 + 92}" y="${y0 + 55}" font-size="2.3">VBAT, 3.3V, GND, Program,</text>
    <text x="${x0 + 92}" y="${y0 + 59}" font-size="2.3">On/Off (check the order on</text>
    <text x="${x0 + 92}" y="${y0 + 63}" font-size="2.3">your board before soldering).</text>`;
  const H = sy + 12;
  return `<svg viewBox="0 0 168 ${H}" width="168mm" height="${H}mm" font-family="Helvetica, Arial, sans-serif">${portrait}${legend}${landscape}${bar}</svg>`;
}

const stripsHtml = `
<p>Print this page at <b>100 % / actual size</b> (not "fit to page") and check the 50 mm bar first. Then cut out the strips you need and lay them beside the Teensy on the breadboard, so every pin carries its name and jobs. Set A matches the pinout drawing (USB at the top); set B matches the breadboard drawings (USB to the left).</p>
<div class="card strips"><div class="cut">✂ cut along the lines</div>${stripsSheet()}</div>
`;

// ---- Pin planner -----------------------------------------------------------------------------
const plannerRows = [
  ['GND', 'ground', '', 'black', ''], ['3.3V', 'power out, 250 mA max', '', 'red', ''],
  ...Array.from({ length: 22 }, () => ['', '', '', '', '']),
];
const plannerHtml = `
<p>Plan every project on paper before wiring: one row per pin you use. Check each pin's jobs on Card A or the strips, keep pins 10 and 12 free if you want MQS audio, and tick <b>Checked</b> once the wire is in and beeps through with the meter.</p>
<div class="fields"><span>Project</span><span>Date</span><span>USB Type</span><span>CPU speed</span></div>
<table class="planner"><thead><tr><th>Pin</th><th>Job (A0, PWM, RX2, SDA…)</th><th>Connected to</th><th>Wire colour</th><th>Checked</th></tr></thead><tbody>
${plannerRows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
</tbody></table>
`;

export default {
  name: 'teensy41-course',
  short: 'Teensy 4.1 Hands-On',
  coverFigure: 'diagrams/02-block-diagram.svg',
  printNote: 'The pin-label strips in Worksheet 1 are actual size. Fill in checkboxes, the pin planner and the practice log with a pen; cut out the reference cards and strips along the dashed lines.',
  appendix: [
    { id: 'worksheet-pin-label-strips', title: 'Worksheet 1: actual-size pin-label strips', html: stripsHtml },
    { id: 'worksheet-pin-planner', title: 'Worksheet 2: pin planner', html: plannerHtml },
  ],
  css: `
.card.strips { padding: 8pt 4pt 2pt; overflow-x: auto; }
.card.strips svg { display: block; }
table.planner td { height: 8.6mm; }
table.planner td:first-child { width: 14mm; font-weight: 700; }
table.planner td:last-child { width: 16mm; }
`,
};
