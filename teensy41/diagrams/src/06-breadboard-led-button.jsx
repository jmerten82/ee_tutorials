// Breadboard view of the Lesson 1 circuit: Teensy straddling the trench, LED on pin 11, button on pin 2.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const X = c => 64 + (c - 1) * 18;
  const R = { tp: 98, tm: 116, 1: 150, 2: 168, 3: 186, 4: 204, 5: 222, 6: 276, 7: 294, 8: 312, 9: 330, 10: 348, bm: 380, bp: 398 };
  const cols = Array.from({ length: 36 }, (_, i) => i + 1);
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const hole = (c, r) => <rect key={'h' + c + '-' + r} x={X(c) - 3} y={R[r] - 3} width='6' height='6' fill='none' stroke={edge} strokeWidth='0.8'/>;
  const end = (c, r) => <circle cx={X(c)} cy={R[r]} r='4' fill={ink}/>;
  const wire = (d, a, b) => <g><path d={d} fill='none' stroke={ink} strokeWidth='3.2' strokeLinecap='round' strokeLinejoin='round'/>{end(a[0], a[1])}{end(b[0], b[1])}</g>;
  const bottomPins = ['G', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '3V', '24', '25', '26', '27', '28', '29', '30', '31', '32'];
  const topPins = ['V', 'G', '3V', '23', '22', '21', '20', '19', '18', '17', '16', '15', '14', '13', 'G', '41', '40', '39', '38', '37', '36', '35', '34', '33'];
  return <svg viewBox='0 0 760 520' role='img' aria-label='Breadboard wiring for the LED and button' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Breadboard view: Teensy across the trench, parts to the right</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Top view, USB to the left. The pins sit in rows 4 and 8, leaving 3 free holes above and 2 below each pin</text>
    <rect x='40' y='82' width='680' height='332' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <rect x='40' y='240' width='680' height='18' fill={tint} stroke='none'/>
    <path d={`M${X(1) - 8} 107H${X(36) + 8}M${X(1) - 8} 389H${X(36) + 8}`} stroke={rule} strokeWidth='1'/>
    <text x='52' y='102' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>+</text>
    <text x='52' y='121' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>−</text>
    <text x='52' y='385' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>−</text>
    <text x='52' y='403' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>+</text>
    {cols.map(c => <g key={'c' + c}>{hole(c, 'tp')}{hole(c, 'tm')}{hole(c, 'bm')}{hole(c, 'bp')}{rows.map(r => hole(c, r))}</g>)}
    <rect x={X(1) - 12} y='192' width={X(24) - X(1) + 24} height='132' rx='5' fill='#ffffff' stroke={ink} strokeWidth='2'/>
    <rect x={X(1) - 30} y='245' width='20' height='26' rx='3' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <rect x={X(9)} y='228' width='72' height='60' rx='3' fill={tint} stroke={ink} strokeWidth='1.2'/>
    <rect x={X(19)} y='226' width='96' height='64' rx='3' fill={tint} stroke={ink} strokeWidth='1.2'/>
    <text x={X(19) + 48} y='262' textAnchor='middle' fontSize='11.5' fill={ink}>microSD</text>
    <text x={X(9) + 36} y='262' textAnchor='middle' fontSize='11.5' fill={ink}>CPU</text>
    {topPins.map((t, i) => <g key={'tp' + i}><circle cx={X(i + 1)} cy={R[4]} r='5' fill={ink}/><text x={X(i + 1)} y={R[4] + 20} textAnchor='middle' fontSize='11.5' fill={ink}>{t}</text></g>)}
    {bottomPins.map((t, i) => <g key={'bp' + i}><circle cx={X(i + 1)} cy={R[8]} r='5' fill={ink}/><text x={X(i + 1)} y={R[8] - 11} textAnchor='middle' fontSize='11.5' fill={ink}>{t}</text></g>)}
    {wire(`M${X(1)} ${R[10]}V${R.bm}`, [1, 10], [1, 'bm'])}
    {wire(`M${X(2)} ${R[1]}V${R.tm}`, [2, 1], [2, 'tm'])}
    {wire(`M${X(4)} ${R[10]}H${X(26)}`, [4, 10], [26, 10])}
    {wire(`M${X(13)} ${R[9]}H${X(30)}`, [13, 9], [30, 9])}
    {wire(`M${X(28)} ${R[1]}V${R.tm}`, [28, 1], [28, 'tm'])}
    {wire(`M${X(35)} ${R[10]}V${R.bm}`, [35, 10], [35, 'bm'])}
    <rect x={X(26) - 8} y={R[5] - 10} width={X(28) - X(26) + 16} height={R[6] - R[5] + 20} rx='3' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <circle cx={(X(26) + X(28)) / 2} cy={(R[5] + R[6]) / 2} r='11' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    {end(26, 5)}{end(28, 5)}{end(26, 6)}{end(28, 6)}
    <path d={`M${X(30)} ${R[7]}H${X(34)}`} stroke={ink} strokeWidth='1.5'/>
    <rect x={X(31) - 4} y={R[7] - 7} width={X(33) - X(31) + 8} height='14' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    {end(30, 7)}{end(34, 7)}
    <circle cx={(X(34) + X(35)) / 2} cy={R[9] - 8} r='13' fill='#ffffff' stroke={ink} strokeWidth='1.8'/>
    <path d={`M${X(35) + 4} ${R[9] - 19}V${R[9] + 3}`} stroke={ink} strokeWidth='1.8'/>
    {end(34, 9)}{end(35, 9)}
    <text x='40' y='446' fontWeight='600' fill={ink}>Check, then power</text>
    <text x='40' y='466' fontSize='11.5' fill={ink}>1. GND (col 1) to the bottom − rail; top GND (col 2) to the top − rail.</text>
    <text x='40' y='484' fontSize='11.5' fill={ink}>2. Pin 2 (col 4) to col 26: the button. Its diagonal leg (col 28, top half) goes to the − rail.</text>
    <text x='40' y='502' fontSize='11.5' fill={ink}>3. Pin 11 (col 13) to col 30, R1 470 Ω from col 30 to 34, LED long leg col 34, short leg col 35, col 35 to −.</text>
    <text x={X(29) - 2} y='253' fontSize='11.5' fontWeight='600' fill={ink}>S1</text>
    <text x={X(32)} y='253' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>R1</text>
    <text x={X(35)} y='253' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>LED</text>
  </svg>;
};
