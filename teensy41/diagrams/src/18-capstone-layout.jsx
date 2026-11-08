// Capstone layout: Teensy on the breadboard as the hub, four small sub-assemblies wired to labelled holes.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const X = c => 120 + (c - 1) * 16;
  const R = { tp: 196, tm: 212, 1: 236, 2: 252, 3: 268, 4: 284, 5: 300, 6: 348, 7: 364, 8: 380, 9: 396, 10: 412, bm: 436, bp: 452 };
  const cols = Array.from({ length: 26 }, (_, i) => i + 1);
  const hole = (c, r) => <rect key={'h' + c + '-' + r} x={X(c) - 3} y={R[r] - 3} width='6' height='6' fill='none' stroke={edge} strokeWidth='0.8'/>;
  const end = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const stub = (c, r, y2, label, k) => <g key={'s' + c + label}>
    <path d={`M${X(c)} ${R[r]}V${y2}`} stroke={ink} strokeWidth='2.6' strokeLinecap='round'/>{end(X(c), R[r])}
    <text x={X(c)} y={y2 < R[r] ? y2 - 6 - (k % 2) * 15 : y2 + 15 + (k % 2) * 15} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{label}</text>
  </g>;
  const bottomPins = ['G', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '3V', '24', '25', '26', '27', '28', '29', '30', '31', '32'];
  const topPins = ['V', 'G', '3V', '23', '22', '21', '20', '19', '18', '17', '16', '15', '14', '13', 'G', '41', '40', '39', '38', '37', '36', '35', '34', '33'];
  const panel = (y, hh, title, lines) => <g>
    <rect x='570' y={y} width='166' height={hh} rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <rect x='570' y={y} width='166' height='22' rx='6' fill={ink}/>
    <text x='580' y={y + 16} fontSize='11.5' fontWeight='600' fill='#ffffff'>{title}</text>
    {lines.map((l, i) => <text key={title + i} x='580' y={y + 40 + i * 17} fontSize='11.5' fill={ink}>{l}</text>)}
  </g>;
  return <svg viewBox='0 0 760 640' role='img' aria-label='Capstone breadboard and wiring layout' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Capstone layout: the breadboard is the hub, the parts live on panels</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Each labelled wire leaves a free hole beside its pin. Build the four panels on perfboard (or a second breadboard)</text>
    <rect x='96' y='182' width='446' height='284' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <rect x='96' y='315' width='446' height='18' fill={tint}/>
    <text x='106' y='200' fontSize='11.5' fontWeight='600' fill={ink}>+</text><text x='106' y='216' fontSize='11.5' fontWeight='600' fill={ink}>−</text>
    <text x='106' y='440' fontSize='11.5' fontWeight='600' fill={ink}>−</text><text x='106' y='456' fontSize='11.5' fontWeight='600' fill={ink}>+</text>
    {cols.map(c => <g key={'c' + c}>{hole(c, 'tp')}{hole(c, 'tm')}{hole(c, 'bm')}{hole(c, 'bp')}{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => hole(c, r))}</g>)}
    <rect x={X(1) - 12} y='272' width={X(24) - X(1) + 24} height='120' rx='5' fill='#ffffff' stroke={ink} strokeWidth='2'/>
    <rect x={X(1) - 30} y='318' width='20' height='26' rx='3' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x={X(12)} y='336' textAnchor='middle' fontWeight='600' fill={ink}>Teensy 4.1</text>
    {topPins.map((t, i) => <g key={'tp' + i}><circle cx={X(i + 1)} cy={R[4]} r='4.5' fill={ink}/><text x={X(i + 1)} y={R[4] + 18} textAnchor='middle' fontSize='11.5' fill={ink}>{t}</text></g>)}
    {bottomPins.map((t, i) => <g key={'bp' + i}><circle cx={X(i + 1)} cy={R[8]} r='4.5' fill={ink}/><text x={X(i + 1)} y={R[8] - 10} textAnchor='middle' fontSize='11.5' fill={ink}>{t}</text></g>)}
    <path d={`M${X(2)} ${R[1]}V${R.tm}M${X(3)} ${R[1]}V${R.tp}M${X(1)} ${R[10]}V${R.bm}`} stroke={ink} strokeWidth='2.6' strokeLinecap='round'/>
    {end(X(2), R[1])}{end(X(2), R.tm)}{end(X(3), R[1])}{end(X(3), R.tp)}{end(X(1), R[10])}{end(X(1), R.bm)}
    {stub(8, 1, 120, 'SCL', 0)}{stub(9, 1, 120, 'SDA', 1)}
    {stub(10, 1, 120, 'K4', 0)}{stub(11, 1, 120, 'K3', 1)}{stub(12, 1, 120, 'K2', 0)}{stub(13, 1, 120, 'K1', 1)}
    <path d={`M${X(20)} ${R.tp}V120M${X(22)} ${R.tm}V120`} stroke={ink} strokeWidth='2.6' strokeLinecap='round'/>
    {end(X(20), R.tp)}{end(X(22), R.tm)}
    <text x={X(20)} y='114' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>+3.3</text>
    <text x={X(22)} y='99' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>GND</text>
    <text x={X(21)} y='82' textAnchor='middle' fontSize='11.5' fill={quiet}>to knobs, OLED</text>
    {[4, 5, 6, 7, 8, 9, 10, 11].map((c, k) => stub(c, 10, 500, 'S' + (k + 1), k))}
    {stub(12, 10, 500, 'R', 0)}{stub(14, 10, 500, 'L', 0)}
    <path d={`M${X(18)} ${R.bm}V500`} stroke={ink} strokeWidth='2.6' strokeLinecap='round'/>{end(X(18), R.bm)}
    <text x={X(18)} y='515' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>GND</text>
    <text x={X(18)} y='531' textAnchor='middle' fontSize='11.5' fill={quiet}>keys, audio</text>
    <text x='96' y='572' fontSize='11.5' fill={ink}>Top row, free holes above the pins: OLED on 19 SCL / 18 SDA, knobs on 17–14 (A3–A0).</text>
    <text x='96' y='590' fontSize='11.5' fill={ink}>Bottom row, free holes below: keys S1–S8 on pins 2–9, audio R on 10 and L on 12.</text>
    <text x='96' y='608' fontSize='11.5' fill={ink}>Jumpers: GND (top col 2) to the top − rail, 3.3V (col 3) to the top + rail, GND (bottom col 1) to the bottom − rail.</text>
    <text x='96' y='626' fontSize='11.5' fill={quiet}>Never connect VIN (col 1, top) to a rail: it is 5 V.</text>
    {panel(76, 96, 'OLED 128 × 64', ['GND → top − rail', 'VCC → top + rail', 'SCL → SCL, SDA → SDA'])}
    {panel(184, 112, 'Knob panel: 4 × 10 kΩ', ['outer legs: + 3.3 and GND', 'wipers → K1 … K4', 'K1 cutoff, K2 resonance,', 'K3 release, K4 volume'])}
    {panel(308, 112, 'Key strip: 8 buttons', ['one leg → S1 … S8', 'other leg → common GND', 'S1 = C4 … S8 = C5', 'wires under 30 cm'])}
    {panel(432, 112, 'Audio board', ['L, R → 2.2 kΩ each,', '4.7 nF to GND, 10 µF', 'in series → 3.5 mm jack', 'GND → jack sleeve'])}
  </svg>;
};
