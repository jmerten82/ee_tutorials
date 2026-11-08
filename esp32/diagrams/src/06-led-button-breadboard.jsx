// Breadboard view for Lesson 1. The DevKitC (rows 1 inch apart) straddles two breadboards pushed together;
// it is drawn turned on its side: J3 along the top, J2 along the bottom, USB on the right. 20 px = 2.54 mm.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const P = 20, X0 = 200, TOP = 210, BOT = 410;
  const J3 = ['GND', '23', '22', 'TX', 'RX', '21', 'GND', '19', '18', '5', '17', '16', '4', '0', '2', '15', 'D1', 'D0', 'CLK'];
  const J2 = ['3V3', 'EN', 'VP', 'VN', '34', '35', '32', '33', '25', '26', '27', '14', '12', 'GND', '13', 'D2', 'D3', 'CMD', '5V'];
  const cols = Array.from({ length: 33 }, (_, i) => 60 + i * P);
  const hole = (x, y) => <rect x={x - 3.5} y={y - 3.5} width='7' height='7' rx='1' fill={edge} fillOpacity='0.45'/>;
  const strip = (x, y1, y2, k) => <g key={k}><rect x={x - 6} y={Math.min(y1, y2) - 6} width='12' height={Math.abs(y2 - y1) + 12} rx='5' fill={tint}/>{[0, 1, 2, 3, 4].map(n => <g key={n}>{hole(x, y1 + (y2 - y1) * n / 4)}</g>)}</g>;
  const rail = (y, label, k) => <g key={k}><line x1='52' x2='708' y1={y} y2={y} stroke={edge} strokeWidth='1' strokeDasharray={label === '−' ? 'none' : '5 3'}/>{cols.map(x => <g key={x}>{hole(x, y)}</g>)}<text x='40' y={y + 4.5} textAnchor='middle' fontWeight='600' fill={ink}>{label}</text></g>;
  const wire = (d, k) => <g key={k}><path d={d} fill='none' stroke='#ffffff' strokeWidth='8' strokeLinecap='round' strokeLinejoin='round'/><path d={d} fill='none' stroke={ink} strokeWidth='4' strokeLinecap='round' strokeLinejoin='round'/></g>;
  const lab = (x, y, t, w) => <g><rect x={x - w / 2} y={y - 13} width={w} height='18' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1'/><text x={x} y={y + 1} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{t}</text></g>;
  const end = (x, y) => <circle cx={x} cy={y} r='4' fill={ink}/>;
  return <svg viewBox='0 0 760 650' role='img' aria-label='Breadboard wiring for the LED and the button' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Lesson 1 on the breadboard: LED on GPIO25, button on GPIO33</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Two breadboards pushed together; the board bridges them. Shaded bars are the 5-hole strips joined inside.</text>

    <rect x='24' y='64' width='712' height='160' rx='6' fill='#ffffff' stroke={edge} strokeWidth='1.25'/>
    {rail(84, '+', 'r1')}{rail(104, '−', 'r2')}
    {cols.map(x => strip(x, 210, 130, 'u' + x))}
    <rect x='24' y='396' width='712' height='178' rx='6' fill='#ffffff' stroke={edge} strokeWidth='1.25'/>
    {cols.map(x => strip(x, 410, 490, 'l' + x))}
    {rail(530, '−', 'r3')}{rail(550, '+', 'r4')}
    

    <rect x='140' y='198' width='466' height='224' rx='8' fill='#ffffff' stroke={ink} strokeWidth='2'/>
    <rect x='146' y='258' width='168' height='104' rx='3' fill={tint} stroke={edge} strokeWidth='1.25'/>
    <text x='231' y='314' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>ESP32-WROOM-32E</text>
    <rect x='592' y='290' width='34' height='40' rx='3' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='560' y='315' textAnchor='end' fontSize='11.5' fill={quiet}>USB</text>
    {J3.map((t, i) => <g key={'p3' + i}><circle cx={X0 + i * P} cy={TOP} r='5' fill={ink}/><text x={X0 + i * P + 4} y={TOP + 12} transform={`rotate(-90 ${X0 + i * P + 4} ${TOP + 12})`} textAnchor='end' fontSize='10' fill={ink}>{t}</text></g>)}
    {J2.map((t, i) => <g key={'p2' + i}><circle cx={X0 + i * P} cy={BOT} r='5' fill={ink}/><text x={X0 + i * P + 4} y={BOT - 12} transform={`rotate(-90 ${X0 + i * P + 4} ${BOT - 12})`} textAnchor='start' fontSize='10' fill={ink}>{t}</text></g>)}
    <text x='330' y='284' fontSize='11.5' fill={quiet}>J3 (pin names as printed on the board)</text>
    <text x='330' y='350' fontSize='11.5' fill={quiet}>J2</text>

    {wire('M360 490V508H160V490', 'w1')}{end(360, 490)}{end(160, 490)}
    {lab(260, 514, 'W1', 30)}
    <rect x='118' y='463' width='44' height='14' rx='6' fill={tint} stroke={ink} strokeWidth='1.25'/>
    <rect x='128' y='463' width='4' height='14' fill={ink}/><rect x='136' y='463' width='4' height='14' fill={ink}/><rect x='144' y='463' width='4' height='14' fill={ink}/>
    <line x1='160' x2='162' y1='470' y2='470' stroke={ink} strokeWidth='2'/>{end(160, 470)}{end(120, 470)}
    {lab(212, 474, 'R1 330 Ω', 70)}
    <path d='M120 470V450M100 450V450' fill='none' stroke={ink} strokeWidth='2'/>
    <path d='M96 450V438A14 14 0 0 1 124 438V450Z' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <line x1='96' x2='96' y1='426' y2='450' stroke={ink} strokeWidth='3'/>
    {end(120, 450)}{end(100, 450)}
    {lab(60, 470, 'LED1', 44)}
    {wire('M100 490V530', 'g1')}{end(100, 490)}{end(100, 530)}

    {wire('M340 470C390 444 570 444 620 470', 'w2')}{end(340, 470)}{end(620, 470)}
    {lab(480, 446, 'W2', 30)}
    <rect x='620' y='436' width='40' height='28' rx='3' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <circle cx='640' cy='450' r='8' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    {end(620, 450)}{end(660, 450)}
    {lab(700, 428, 'S1', 26)}
    {wire('M660 490V530', 'g2')}{end(660, 490)}{end(660, 530)}
    {wire('M460 490V530', 'g3')}{end(460, 490)}{end(460, 530)}

    <text x='24' y='596' fontSize='11.5' fill={ink}>W1: GPIO25 strip → R1 (330 Ω) → LED1 long leg; LED1 short leg (flat side) → GND rail.</text>
    <text x='24' y='614' fontSize='11.5' fill={ink}>W2: GPIO33 strip → S1; the other leg of S1 → GND rail. A J2 GND pin feeds the GND rail.</text>
    <text x='24' y='634' fontSize='11.5' fill={quiet}>4-leg buttons: use two diagonally opposite legs, so the internal pairs cannot fool you.</text>
  </svg>;
};
