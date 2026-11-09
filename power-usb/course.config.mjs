// Settings for tools/build-course.mjs: node tools/build-course.mjs power-usb
// The two worksheets at the end of the PDF are drawn here.

const groups = [
  ['12 V bus, direct loads', 7],
  ['5 V rail (buck 1)', 5],
  ['5 V rail (buck 2)', 4],
];
const budgetHtml = `
<p>For Lesson 1. One row per load, grouped by rail. Use measured values where you have them and mark estimates with "e". For each buck, enter its output total in its group, then its input current (V_out × I_out ÷ (efficiency × 12 V)) as a row of the 12 V bus.</p>
<div class="fields"><span>Tower</span><span>Date</span><span>Supply rating</span><span>Fuse</span></div>
<table class="budget"><thead><tr><th>Load</th><th>Qty</th><th>Typical (mA)</th><th>Peak (mA)</th><th>Stall / fault (mA)</th><th>Can peaks coincide?</th><th>Source</th></tr></thead><tbody>
${groups.map(([g, n]) => `<tr class="group"><td colspan="7"><b>${g}</b></td></tr>` +
  Array.from({ length: n }, () => '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>').join('') +
  `<tr class="total"><td><b>Total</b></td><td></td><td></td><td></td><td></td><td colspan="2"></td></tr>`).join('')}
</tbody></table>
<p>12 V typical: ________ A &nbsp;&nbsp;&nbsp;&nbsp; 12 V peak: ________ A &nbsp;&nbsp;&nbsp;&nbsp; 12 V stall: ________ A</p>
<p class="small">Supply ≥ 1.5 × typical and ≥ peak (or capacitors cover the difference). Fuse above the normal peak, below what the thinnest wire behind it can carry.</p>
`;

const stages = ['1 Bus only', '2 Bucks, no load', '3 Hub + XIAO', '4 USB to Mac', '5 LED ring', '6 Servos + MOSFET loads', '7 Real supply + fuse', 'Warm, after 30 min'];
const railsHtml = `
<p>For Lesson 7 and the capstone. Record each bring-up stage: the current limit you set, the 12 V input current, and every rail measured at its load end.</p>
<div class="fields"><span>Tower</span><span>Date</span><span>Supply</span><span>Firmware</span></div>
<table class="rails"><thead><tr><th>Stage</th><th>Limit</th><th>12 V in (V)</th><th>12 V in (A)</th><th>5 V buck 1 (V)</th><th>5 V buck 2 (V)</th><th>Worst dip</th><th>OK</th></tr></thead><tbody>
${stages.map(s => `<tr><td><b>${s}</b></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join('')}
</tbody></table>
<p>USB tree saved as: ______________________ &nbsp;&nbsp;&nbsp;&nbsp; Backfeed: ______ V &nbsp;&nbsp;&nbsp;&nbsp; CC to GND: ______ kΩ</p>
`;

export default {
  name: 'power-usb-course',
  short: 'Power and USB',
  coverFigure: 'diagrams/01-power-tree.svg',
  printNote: 'Fill in the power-budget worksheet and the rail record sheet with a pen, one copy per tower; cut out the reference cards along the dashed lines.',
  appendix: [
    { id: 'worksheet-power-budget', title: 'Worksheet 1: power budget', html: budgetHtml },
    { id: 'worksheet-rail-record', title: 'Worksheet 2: rail record sheet', html: railsHtml },
  ],
  css: `
table.budget td, table.rails td { height: 7.5mm; }
table.budget tr.group td { height: auto; background: #eee; }
table.budget tr.total td { border-top: 1.5pt solid #000; }
table.rails td:first-child { width: 26%; }
`,
};
