// Capstone: room climate monitor. BME280 and SSD1306 on I2C, status LED on GPIO25, page button on GPIO33.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const line = d => <path d={d} fill='none' stroke={ink} strokeWidth='1.5'/>;
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const pinR = (y, t) => <g><line x1='230' x2='244' y1={y} y2={y} stroke={ink} strokeWidth='1.5'/><text x='222' y={y + 4.5} textAnchor='end' fontSize='11.5' fill={ink}>{t}</text></g>;
  const mod = (x, w, title, sub, pins) => <g>
    <rect x={x} y='276' width={w} height='74' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x={x + w / 2} y='318' textAnchor='middle' fontWeight='600' fill={ink}>{title}</text>
    <text x={x + w / 2} y='336' textAnchor='middle' fontSize='11.5' fill={ink}>{sub}</text>
    {pins.map(([px, t]) => <text key={t} x={px} y='292' textAnchor='middle' fontSize='10' fill={ink}>{t}</text>)}
    <text x={x + w / 2 + 9} y='366' fontSize='10' fill={ink}>GND</text>
  </g>;
  return <svg viewBox='0 0 760 526' role='img' aria-label='Capstone schematic: room climate monitor' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Capstone schematic: the room climate monitor</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Everything runs from the board 3V3; the sensor and display share the I2C bus; pull-ups are on the modules</text>

    <rect x='24' y='130' width='70' height='60' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='59' y='154' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>USB</text>
    <text x='59' y='170' textAnchor='middle' fontSize='11.5' fill={ink}>charger</text>
    <text x='59' y='184' textAnchor='middle' fontSize='10' fill={quiet}>5 V, 1 A</text>
    {line('M94 160H110')}
    <rect x='110' y='90' width='120' height='320' rx='6' fill='#ffffff' stroke={ink} strokeWidth='2'/>
    <text x='122' y='112' fontWeight='600' fill={ink}>ESP32</text>
    <text x='122' y='128' fontSize='11.5' fill={quiet}>DevKitC V4</text>
    <text x='118' y='164' fontSize='10' fill={quiet}>micro-USB</text>
    {pinR(120, '3V3')}{pinR(180, 'GPIO22')}{pinR(220, 'GPIO21')}{pinR(300, 'GPIO25')}{pinR(350, 'GPIO33')}
    <text x='170' y='402' textAnchor='middle' fontSize='11.5' fill={ink}>GND</text>
    {line('M170 410V450')}

    <path d='M244 120H720' fill='none' stroke={ink} strokeWidth='2.5'/>
    <text x='724' y='116' textAnchor='end' fontWeight='600' fill={ink}>3V3</text>
    <path d='M244 180H720' fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='724' y='174' textAnchor='end' fontWeight='600' fill={ink}>SCL</text>
    <path d='M244 220H720' fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='724' y='214' textAnchor='end' fontWeight='600' fill={ink}>SDA</text>
    <path d='M170 450H720' fill='none' stroke={ink} strokeWidth='2.5'/>
    <text x='724' y='444' textAnchor='end' fontWeight='600' fill={ink}>GND</text>

    {mod(360, 150, 'BME280', 'address 0x76', [[380, 'VCC'], [430, 'SCL'], [480, 'SDA']])}
    {line('M380 120V276')}{dot(380, 120)}
    {line('M430 180V276')}{dot(430, 180)}
    {line('M480 220V276')}{dot(480, 220)}
    {line('M435 350V450')}{dot(435, 450)}
    {mod(560, 150, 'SSD1306 OLED', '128 × 64, 0x3C', [[580, 'VCC'], [630, 'SCL'], [680, 'SDA']])}
    {line('M580 120V276')}{dot(580, 120)}
    {line('M630 180V276')}{dot(630, 180)}
    {line('M680 220V276')}{dot(680, 220)}
    {line('M635 350V450')}{dot(635, 450)}

    {line('M244 300H310V312')}
    <rect x='302' y='312' width='16' height='36' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='296' y='326' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>R1</text>
    <text x='296' y='342' textAnchor='end' fontSize='10' fill={quiet}>330 Ω</text>
    {line('M310 348V372')}
    <polygon points='298,372 322,372 310,394' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <line x1='298' x2='322' y1='394' y2='394' stroke={ink} strokeWidth='2'/>
    <text x='328' y='388' fontSize='11.5' fontWeight='600' fill={ink}>LED1</text>
    {line('M310 394V450')}{dot(310, 450)}
    {line('M244 350H262V372')}
    <circle cx='262' cy='376' r='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <circle cx='262' cy='412' r='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <line x1='250' x2='250' y1='368' y2='420' stroke={ink} strokeWidth='2'/>
    {line('M250 394H238')}
    <text x='272' y='404' fontSize='11.5' fontWeight='600' fill={ink}>S1</text>
    {line('M262 416V450')}{dot(262, 450)}

    <text x='24' y='478' fontSize='11.5' fill={ink}>GPIO25: status LED (on while saving, toggled from the web page). GPIO33: button, next display page (INPUT_PULLUP).</text>
    <text x='24' y='496' fontSize='11.5' fill={ink}>I2C: Wire.begin(21, 22). Add 4.7 kΩ pull-ups to 3V3 only if neither module has them.</text>
    <text x='24' y='514' fontSize='11.5' fill={quiet}>Keep the BME280 away from the ESP32 module and the LDO: both warm the air around them.</text>
  </svg>;
};
