// Breadboard view for the Lesson 7 capstone. The DevKitC (rows 1 inch apart) straddles two breadboards pushed together;
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
  return <svg viewBox='0 0 760 790' role='img' aria-label='Breadboard layout of the capstone climate monitor' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Capstone on the breadboard: sensor, display, LED and button</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The modules hang on short jumper wires above the top breadboard; the lower half is Lesson 1 mirrored</text>
    <g transform='translate(0,130)'>
    <rect x='24' y='64' width='712' height='160' rx='6' fill='#ffffff' stroke={edge} strokeWidth='1.25'/>
    {rail(84, '+', 'r1')}{rail(104, '−', 'r2')}
    {cols.map(x => strip(x, 210, 130, 'u' + x))}
    <rect x='24' y='396' width='712' height='178' rx='6' fill='#ffffff' stroke={edge} strokeWidth='1.25'/>
    {cols.map(x => strip(x, 410, 490, 'l' + x))}
    {rail(530, '−', 'r3')}{rail(550, '+', 'r4')}
    <text x='716' y='78' textAnchor='end' fontSize='11.5' fill={quiet}>3V3</text><text x='716' y='120' textAnchor='end' fontSize='11.5' fill={quiet}>GND</text>

    <rect x='140' y='198' width='466' height='224' rx='8' fill='#ffffff' stroke={ink} strokeWidth='2'/>
    <rect x='146' y='258' width='168' height='104' rx='3' fill={tint} stroke={edge} strokeWidth='1.25'/>
    <text x='231' y='314' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>ESP32-WROOM-32E</text>
    <rect x='592' y='290' width='34' height='40' rx='3' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='560' y='315' textAnchor='end' fontSize='11.5' fill={quiet}>USB</text>
    {J3.map((t, i) => <g key={'p3' + i}><circle cx={X0 + i * P} cy={TOP} r='5' fill={ink}/><text x={X0 + i * P + 4} y={TOP + 12} transform={`rotate(-90 ${X0 + i * P + 4} ${TOP + 12})`} textAnchor='end' fontSize='10' fill={ink}>{t}</text></g>)}
    {J2.map((t, i) => <g key={'p2' + i}><circle cx={X0 + i * P} cy={BOT} r='5' fill={ink}/><text x={X0 + i * P + 4} y={BOT - 12} transform={`rotate(-90 ${X0 + i * P + 4} ${BOT - 12})`} textAnchor='start' fontSize='10' fill={ink}>{t}</text></g>)}
    <text x='330' y='284' fontSize='11.5' fill={quiet}>J3 (pin names as printed on the board)</text>
    <text x='330' y='350' fontSize='11.5' fill={quiet}>J2</text>
    <rect x='150' y='-66' width='120' height='106' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <rect x='160' y='-58' width='100' height='54' rx='2' fill='#ffffff' stroke={ink} strokeWidth='1.25'/>
    <text x='210' y='-26' textAnchor='middle' fontSize='11.5' fill={quiet}>22.4 °C</text>
    <rect x='176' y='40' width='8' height='6' fill={ink}/><text x='184' y='34' transform='rotate(-90 184 34)' fontSize='10' fill={ink}>GND</text><rect x='196' y='40' width='8' height='6' fill={ink}/><text x='204' y='34' transform='rotate(-90 204 34)' fontSize='10' fill={ink}>VCC</text><rect x='216' y='40' width='8' height='6' fill={ink}/><text x='224' y='34' transform='rotate(-90 224 34)' fontSize='10' fill={ink}>SCL</text><rect x='236' y='40' width='8' height='6' fill={ink}/><text x='244' y='34' transform='rotate(-90 244 34)' fontSize='10' fill={ink}>SDA</text>
    <text x='24' y='-40' fontWeight='600' fill={ink}>SSD1306 OLED</text>
    <text x='24' y='-22' fontSize='11.5' fill={quiet}>128 × 64, 0x3C</text>
    <rect x='380' y='-36' width='100' height='76' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <rect x='420' y='-24' width='20' height='20' rx='2' fill='#ffffff' stroke={ink} strokeWidth='1.25'/>
    <rect x='396' y='40' width='8' height='6' fill={ink}/><text x='404' y='34' transform='rotate(-90 404 34)' fontSize='10' fill={ink}>VIN</text><rect x='416' y='40' width='8' height='6' fill={ink}/><text x='424' y='34' transform='rotate(-90 424 34)' fontSize='10' fill={ink}>GND</text><rect x='436' y='40' width='8' height='6' fill={ink}/><text x='444' y='34' transform='rotate(-90 444 34)' fontSize='10' fill={ink}>SCL</text><rect x='456' y='40' width='8' height='6' fill={ink}/><text x='464' y='34' transform='rotate(-90 464 34)' fontSize='10' fill={ink}>SDA</text>
    <text x='496' y='-20' fontWeight='600' fill={ink}>BME280 sensor</text>
    <text x='496' y='-2' fontSize='11.5' fill={quiet}>0x76. Pin order differs</text>
    <text x='496' y='14' fontSize='11.5' fill={quiet}>between modules: read yours.</text>
    {wire('M180 46V104', 'm1')}{end(180, 104)}
    {wire('M200 46V84', 'm2')}{end(200, 84)}
    {wire('M220 46C220 72 240 100 240 130', 'm3')}{end(240, 130)}
    {wire('M240 46C240 66 300 96 300 130', 'm4')}{end(300, 130)}
    {wire('M400 46V84', 'm5')}{end(400, 84)}
    {wire('M420 46V104', 'm6')}{end(420, 104)}
    {wire('M440 46C440 110 240 120 240 150', 'm7')}{end(240, 150)}
    {wire('M460 46C460 116 300 126 300 150', 'm8')}{end(300, 150)}
    {wire('M320 170V104', 'g0')}{end(320, 170)}{end(320, 104)}
    {wire('M200 490V550', 'v1')}{end(200, 490)}{end(200, 550)}
    {wire('M60 550H30V84H60', 'v2')}{end(60, 550)}{end(60, 84)}
    {lab(30, 320, '3V3', 36)}

    <rect x='100' y='436' width='40' height='28' rx='3' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <circle cx='120' cy='450' r='8' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    {end(100, 450)}{end(140, 450)}
    {lab(80, 428, 'S1', 26)}
    {wire('M340 470C300 444 180 444 140 470', 'w2')}{end(340, 470)}{end(140, 470)}
    {lab(240, 448, 'W2', 30)}
    {wire('M100 490V530', 'g1')}{end(100, 490)}{end(100, 530)}

    {wire('M360 450C420 424 580 424 640 450', 'w1')}{end(360, 450)}{end(640, 450)}
    {lab(500, 432, 'W1', 30)}
    <rect x='638' y='463' width='44' height='14' rx='6' fill={tint} stroke={ink} strokeWidth='1.25'/>
    <rect x='648' y='463' width='4' height='14' fill={ink}/><rect x='656' y='463' width='4' height='14' fill={ink}/><rect x='664' y='463' width='4' height='14' fill={ink}/>
    {end(640, 470)}{end(680, 470)}
    {lab(600, 494, 'R1', 26)}
    <path d='M676 450V438A14 14 0 0 1 704 438V450Z' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <line x1='704' x2='704' y1='426' y2='450' stroke={ink} strokeWidth='3'/>
    {end(680, 450)}{end(700, 450)}
    {lab(700, 412, 'LED1', 44)}
    {wire('M700 490V530', 'g2')}{end(700, 490)}{end(700, 530)}
    {wire('M460 490V530', 'g3')}{end(460, 490)}{end(460, 530)}
    </g>
    <text x='24' y='728' fontSize='11.5' fill={ink}>Top rails: + is 3V3 (fed from J2 pin 3V3 through the bottom + rail and the long wire on the left), − is GND from J3.</text>
    <text x='24' y='746' fontSize='11.5' fill={ink}>Both SCL wires land in the GPIO22 strip, both SDA wires in the GPIO21 strip. W1: GPIO25 → R1 → LED1. W2: GPIO33 → S1.</text>
    <text x='24' y='766' fontSize='11.5' fill={quiet}>Check before power: no wire joins a + rail to a − rail, and nothing goes to the 5V pin.</text>
  </svg>;
};
