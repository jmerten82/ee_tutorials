// Lesson 3 USB MIDI controller: four buttons on pins 2-5, four pots on A0-A3, USB to the Mac.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gnd = (x, y) => <path d={`M${x} ${y}V${y + 8}M${x - 11} ${y + 8}H${x + 11}M${x - 7} ${y + 13}H${x + 7}M${x - 3} ${y + 18}H${x + 3}`} fill='none' stroke={ink} strokeWidth='1.5'/>;
  const flagL = (x, y, t) => <g><polygon points={`${x},${y} ${x - 10},${y - 10} ${x - 44},${y - 10} ${x - 44},${y + 10} ${x - 10},${y + 10}`} fill='#ffffff' stroke={ink} strokeWidth='1.3'/><text x={x - 26} y={y + 4} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{t}</text></g>;
  const flagR = (x, y, t) => <g><polygon points={`${x},${y} ${x + 10},${y - 10} ${x + 44},${y - 10} ${x + 44},${y + 10} ${x + 10},${y + 10}`} fill='#ffffff' stroke={ink} strokeWidth='1.3'/><text x={x + 26} y={y + 4} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{t}</text></g>;
  const btn = (y, pin, note) => <g key={'b' + pin}>
    <path d={`M70 ${y}H187M233 ${y}H300`} stroke={ink} strokeWidth='1.5'/>
    <circle cx='190' cy={y} r='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/><circle cx='230' cy={y} r='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <path d={`M186 ${y - 10}H234M210 ${y - 10}V${y - 22}M200 ${y - 22}H220`} fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='120' y={y - 8} textAnchor='middle' fontSize='11.5' fill={quiet}>{note}</text>
    <path d={`M70 ${y}V${y + 10}`} stroke={ink} strokeWidth='1.5'/>{gnd(70, y + 10)}
    <text x='306' y={y + 4} fontSize='11.5' fontWeight='600' fill={ink}>{pin}</text>
  </g>;
  const pot = (x, y0, t) => <g key={'p' + t}>
    <text x={x} y={y0} textAnchor='middle' fontSize='11.5' fill={ink}>3.3V</text>
    <path d={`M${x} ${y0 + 6}V${y0 + 22}M${x} ${y0 + 72}V${y0 + 86}`} stroke={ink} strokeWidth='1.5'/>
    <rect x={x - 8} y={y0 + 22} width='16' height='50' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <path d={`M${x - 40} ${y0 + 47}H${x - 11}`} stroke={ink} strokeWidth='1.5' markerEnd='url(#mc-arrow)'/>
    {flagL(x - 40, y0 + 47, t)}
    {gnd(x, y0 + 86)}
  </g>;
  return <svg viewBox='0 0 760 560' role='img' aria-label='USB MIDI controller wiring' fontSize='13'>
    <defs><marker id='mc-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='5' markerHeight='5' orient='auto'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>USB MIDI controller: four keys, four knobs, one cable</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Buttons switch to GND (INPUT_PULLUP, no resistors). Pots divide 3.3 V. Flags with the same name are connected</text>
    <rect x='300' y='80' width='130' height='330' rx='6' fill={tint} stroke={ink} strokeWidth='2'/>
    <text x='365' y='292' textAnchor='middle' fontWeight='600' fill={ink}>Teensy 4.1</text>
    <text x='365' y='310' textAnchor='middle' fontSize='11.5' fill={quiet}>USB Type: MIDI</text>
    {btn(110, '2', 'note 60 C4')}{btn(180, '3', 'note 62 D4')}{btn(250, '4', 'note 64 E4')}{btn(320, '5', 'note 65 F4')}
    <path d='M270 380H300' stroke={ink} strokeWidth='1.5'/><path d='M270 380V386' stroke={ink} strokeWidth='1.5'/>{gnd(270, 386)}
    <text x='306' y='384' fontSize='11.5' fontWeight='600' fill={ink}>GND</text>
    {[['14 A0', 'K1', 110], ['15 A1', 'K2', 160], ['16 A2', 'K3', 210], ['17 A3', 'K4', 260]].map(r => <g key={r[1]}>
      <path d={`M430 ${r[2]}H462`} stroke={ink} strokeWidth='1.5'/>
      <text x='424' y={r[2] + 4} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>{r[0]}</text>
      {flagR(462, r[2], r[1])}
    </g>)}
    <path d='M430 330H470' stroke={ink} strokeWidth='1.5'/><text x='424' y='334' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>3.3V</text>
    <text x='476' y='334' fontSize='11.5' fill={quiet}>to the pots</text>
    <path d='M430 380H470V386' fill='none' stroke={ink} strokeWidth='1.5'/>{gnd(470, 386)}<text x='424' y='384' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>GND</text>
    {pot(606, 90, 'K1')}{pot(716, 90, 'K2')}{pot(606, 230, 'K3')}{pot(716, 230, 'K4')}
    <rect x='340' y='60' width='50' height='20' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='398' y='74' fontSize='11.5' fill={ink}>USB to the Mac</text>
    <path d='M24 432H736' stroke={rule} strokeWidth='1'/>
    <text x='24' y='458' fontWeight='600' fill={ink}>What each part sends (channel 1)</text>
    <text x='24' y='480' fontSize='11.5' fill={ink}>Buttons 1–4: Note On when pressed (velocity 99), Note Off when released: notes 60, 62, 64, 65.</text>
    <text x='24' y='500' fontSize='11.5' fill={ink}>Knobs 1–4: Control Change 1 (modulation), 7 (volume), 10 (pan), 74 (brightness), value 0–127, only when it changes.</text>
    <text x='24' y='520' fontSize='11.5' fill={quiet}>On the Mac it appears as "Teensy MIDI" in Audio MIDI Setup and in any DAW; no driver to install.</text>
    <text x='24' y='540' fontSize='11.5' fill={quiet}>Pots: 10 kΩ linear (B10K). Pins 14–17 are the same physical pins as A0–A3.</text>
  </svg>;
};
