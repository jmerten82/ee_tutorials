// Settings for tools/build-course.mjs: node tools/build-course.mjs esp32
// The worksheets at the end of the PDF are drawn here. The pin-label strips are actual size (2.54 mm pitch).

// ---- Pin data (ESP32-DevKitC V4, top view, USB at the bottom; pin 1 at the antenna end) ----------
const J2 = [
  ['3V3', 'pwr', '3.3 V out'], ['EN', 'pwr', 'reset'], ['36', 'care', 'VP in only'], ['39', 'care', 'VN in only'],
  ['34', 'care', 'ADC1 in only'], ['35', 'care', 'ADC1 in only'], ['32', 'safe', 'ADC1 touch'], ['33', 'safe', 'ADC1 touch'],
  ['25', 'safe', 'DAC1 ADC2'], ['26', 'safe', 'DAC2 ADC2'], ['27', 'safe', 'ADC2 touch'], ['14', 'safe', 'boot pulses'],
  ['12', 'care', 'strap: LOW'], ['GND', 'pwr', 'ground'], ['13', 'safe', 'ADC2 touch'], ['9', 'avoid', 'flash D2'],
  ['10', 'avoid', 'flash D3'], ['11', 'avoid', 'flash CMD'], ['5V', 'pwr', 'USB 5 V'],
];
const J3 = [
  ['GND', 'pwr', 'ground'], ['23', 'safe', 'SPI MOSI'], ['22', 'safe', 'I2C SCL'], ['1', 'avoid', 'USB TX'],
  ['3', 'avoid', 'USB RX'], ['21', 'safe', 'I2C SDA'], ['GND', 'pwr', 'ground'], ['19', 'safe', 'SPI MISO'],
  ['18', 'safe', 'SPI SCK'], ['5', 'care', 'strap SS'], ['17', 'safe', 'TX2'], ['16', 'safe', 'RX2'],
  ['4', 'safe', 'ADC2 touch'], ['0', 'care', 'BOOT strap'], ['2', 'care', 'strap'], ['15', 'care', 'strap'],
  ['8', 'avoid', 'flash D1'], ['7', 'avoid', 'flash D0'], ['6', 'avoid', 'flash CLK'],
];

// One strip: 19 rows at 2.54 mm. side 'L' puts the pin number next to the header on the right (for J2).
function strip(x0, y0, pins, side, title) {
  const P = 2.54, wNum = 3.4, wName = 7.6, wNote = 12, W = wNum + wName + wNote;
  let s = `<text x="${x0 + W / 2}" y="${y0 - 4.2}" text-anchor="middle" font-size="2.6" font-weight="bold">${title}</text>`;
  s += `<text x="${x0 + W / 2}" y="${y0 - 1.2}" text-anchor="middle" font-size="1.7">▲ antenna end</text>`;
  pins.forEach(([name, st, note], i) => {
    const y = y0 + i * P;
    const order = side === 'L' ? [['note', wNote], ['name', wName], ['num', wNum]] : [['num', wNum], ['name', wName], ['note', wNote]];
    let x = x0;
    for (const [kind, w] of order) {
      const cx = x + w / 2, ty = y + P / 2 + 0.6;
      if (kind === 'num') s += `<text x="${cx}" y="${ty}" text-anchor="middle" font-size="1.5">${i + 1}</text>`;
      if (kind === 'name') {
        const label = /^\d+$/.test(name) ? 'IO' + name : name;
        const fill = st === 'safe' ? '#000' : st === 'pwr' ? '#d4d4d4' : st === 'avoid' ? '#eeeeee' : '#fff';
        const color = st === 'safe' ? '#fff' : '#000';
        s += `<rect x="${x}" y="${y}" width="${w}" height="${P}" fill="${fill}"/>`;
        if (st === 'care') s += `<rect x="${x + 0.25}" y="${y + 0.25}" width="${w - 0.5}" height="${P - 0.5}" fill="none" stroke="#000" stroke-width="0.35"/>`;
        s += `<text x="${cx}" y="${ty}" text-anchor="middle" font-size="1.75" font-weight="bold" fill="${color}">${label}</text>`;
        if (st === 'avoid') s += `<line x1="${x + 0.8}" x2="${x + w - 0.8}" y1="${y + P / 2}" y2="${y + P / 2}" stroke="#000" stroke-width="0.2"/>`;
      }
      if (kind === 'note') s += `<text x="${side === 'L' ? x + w - 0.6 : x + 0.6}" y="${ty}" text-anchor="${side === 'L' ? 'end' : 'start'}" font-size="1.45">${st === 'avoid' ? '✕ ' : st === 'care' ? '! ' : ''}${note}</text>`;
      x += w;
    }
    s += `<line x1="${x0}" x2="${x0 + W}" y1="${y}" y2="${y}" stroke="#000" stroke-width="0.12"/>`;
  });
  s += `<rect x="${x0}" y="${y0}" width="${W}" height="${19 * P}" fill="none" stroke="#000" stroke-width="0.3" stroke-dasharray="1 0.6"/>`;
  return s;
}

function stripSheet() {
  const W = 176, H = 112, y0 = 12;
  let t = '';
  t += strip(4, y0, J2, 'L', 'J2 (left header)');
  t += strip(32, y0, J2, 'L', 'J2 spare');
  t += strip(96, y0, J3, 'R', 'J3 (right header)');
  t += strip(124, y0, J3, 'R', 'J3 spare');
  // legend
  const ly = 12;
  t += `<g font-size="1.9"><rect x="62" y="${ly}" width="5" height="2.54" fill="#000"/><text x="68.5" y="${ly + 2}">safe</text>`;
  t += `<rect x="62" y="${ly + 4}" width="5" height="2.54" fill="#fff" stroke="#000" stroke-width="0.35"/><text x="68.5" y="${ly + 6}">! careful</text>`;
  t += `<rect x="62" y="${ly + 8}" width="5" height="2.54" fill="#eee" stroke="#000" stroke-width="0.15"/><text x="68.5" y="${ly + 10}">✕ avoid</text>`;
  t += `<rect x="62" y="${ly + 12}" width="5" height="2.54" fill="#d4d4d4"/><text x="68.5" y="${ly + 14}">power</text></g>`;
  t += `<text x="62" y="${ly + 22}" font-size="1.9">IOn = GPIOn</text><text x="62" y="${ly + 25}" font-size="1.9">Row pitch 2.54 mm</text>`;
  // scale check
  const sy = 78;
  t += `<text x="4" y="${sy}" font-size="2.8" font-weight="bold">Scale check: 10 pins = 25.40 mm. Hold the bar against a header.</text>`;
  t += `<rect x="4" y="${sy + 3}" width="25.4" height="3" fill="#000"/>`;
  for (let i = 0; i <= 10; i++) t += `<line x1="${4 + i * 2.54}" x2="${4 + i * 2.54}" y1="${sy + 6}" y2="${sy + (i % 5 === 0 ? 9.5 : 8)}" stroke="#000" stroke-width="0.25"/>`;
  t += `<text x="33" y="${sy + 6}" font-size="2.2">25.40 mm (1 inch, 10 × 2.54 mm)</text>`;
  t += `<g transform="translate(4,${sy + 14})"><rect x="0" y="0" width="100" height="7" fill="none" stroke="#000" stroke-width="0.3"/>`;
  for (let i = 0; i <= 100; i++) t += `<line x1="${i}" y1="0" x2="${i}" y2="${i % 10 === 0 ? 4.5 : i % 5 === 0 ? 3.2 : 2}" stroke="#000" stroke-width="${i % 10 === 0 ? 0.3 : 0.15}"/>`;
  for (let i = 0; i <= 100; i += 10) t += `<text x="${i}" y="10" text-anchor="middle" font-size="2.2">${i / 10}</text>`;
  t += `<text x="103" y="5" font-size="2.4">cm: this must measure exactly 100 mm</text></g>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}mm" height="${H}mm" font-family="Helvetica, Arial, sans-serif">${t}</svg>`;
}

const stripsHtml = `
<p>Print this page at <b>100 % / actual size</b> (not "fit to page") and check the 100 mm ruler first. Cut out a strip along its dashed outline and lay it beside its header on the breadboard: the pin numbers sit next to the pins, so you read off the GPIO without counting. Pin 1 is at the antenna end of both headers. With the board on its side as in the drawings, rotate the strips to match.</p>
<div class="card strips"><div class="cut">✂ cut along the dashed lines</div>${stripSheet()}</div>
`;

// ---- Pin plan: a fill-in table for your own projects --------------------------------------------
const plan = [
  ['4', 'J3-13', 'safe, ADC2, touch'], ['13', 'J2-15', 'safe, ADC2, touch'], ['14', 'J2-12', 'safe, pulses at boot'],
  ['16', 'J3-12', 'safe, RX2'], ['17', 'J3-11', 'safe, TX2'], ['18', 'J3-9', 'safe, SPI SCK'], ['19', 'J3-8', 'safe, SPI MISO'],
  ['21', 'J3-6', 'safe, I2C SDA'], ['22', 'J3-3', 'safe, I2C SCL'], ['23', 'J3-2', 'safe, SPI MOSI'],
  ['25', 'J2-9', 'safe, DAC1, ADC2'], ['26', 'J2-10', 'safe, DAC2, ADC2'], ['27', 'J2-11', 'safe, ADC2, touch'],
  ['32', 'J2-7', 'safe, ADC1, touch'], ['33', 'J2-8', 'safe, ADC1, touch, RTC wake'],
  ['34', 'J2-5', 'input only, ADC1'], ['35', 'J2-6', 'input only, ADC1'], ['36 (VP)', 'J2-3', 'input only, ADC1'], ['39 (VN)', 'J2-4', 'input only, ADC1'],
  ['0', 'J3-14', 'strap: high at boot; BOOT button'], ['2', 'J3-15', 'strap: low to upload'], ['5', 'J3-10', 'strap, SPI SS'],
  ['12', 'J2-13', 'strap: LOW at boot'], ['15', 'J3-16', 'strap'],
];
const planHtml = `
<p>Plan every project's pins here before you wire anything, and keep the sheet with the project. Check each choice against the pin's note; an analog input that must work with Wi-Fi needs an ADC1 pin. Header positions count from pin 1 at the antenna end.</p>
<div class="fields"><span>Project</span><span>Date</span><span>Power source</span><span>Sketch file</span></div>
<table class="plan"><thead><tr><th>GPIO</th><th>Header pin</th><th>Notes</th><th>Connected to</th><th>Wire colour</th><th>Checked</th></tr></thead><tbody>
${plan.map(([g, h, n]) => `<tr><td><b>${g}</b></td><td>${h}</td><td>${n}</td><td></td><td></td><td></td></tr>`).join('')}
</tbody></table>
`;

export default {
  name: 'esp32-course',
  short: 'ESP32 Hands-On',
  coverFigure: 'diagrams/01-board-anatomy.svg',
  printNote: 'The pin-label strips in Worksheet 1 are actual size. Fill in checkboxes, the pin plan and the practice log with a pen; cut out the reference cards along the dashed lines.',
  appendix: [
    { id: 'worksheet-pin-label-strips', title: 'Worksheet 1: actual-size pin-label strips', html: stripsHtml },
    { id: 'worksheet-pin-plan', title: 'Worksheet 2: project pin plan', html: planHtml },
  ],
  css: `
.card.strips { padding: 10pt 4pt 2pt; }
.card.strips svg { display: block; }
table.plan td { height: 7.4mm; }
table.plan td:nth-child(4) { width: 34%; }
`,
};
