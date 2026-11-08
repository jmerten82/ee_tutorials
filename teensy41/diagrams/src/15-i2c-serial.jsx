// I2C bus with a BME280 sensor and an SSD1306 OLED on pins 18/19, plus a serial loopback between Serial1 and Serial2.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const Y = { v: 100, sda: 160, scl: 190, g: 220 };
  const dev = (x, w, title, sub, pins) => <g>
    <rect x={x} y='270' width={w} height='70' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x={x + w / 2} y='310' textAnchor='middle' fontWeight='600' fill={ink}>{title}</text>
    <text x={x + w / 2} y='328' textAnchor='middle' fontSize='11.5' fill={quiet}>{sub}</text>
    {pins.map((p, i) => <g key={title + p[0]}>
      <path d={`M${x + 20 + i * 30} ${Y[p[1]]}V270`} stroke={ink} strokeWidth='1.5'/>{dot(x + 20 + i * 30, Y[p[1]])}
      <text x={x + 20 + i * 30} y='288' textAnchor='middle' fontSize='11.5' fill={ink}>{p[0]}</text>
    </g>)}
  </g>;
  return <svg viewBox='0 0 760 570' role='img' aria-label='I2C bus with sensor and OLED; serial loopback' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Talking to other chips: an I2C bus and two serial ports</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>I2C: two shared wires, every chip has an address. Serial: one wire each way, TX always goes to RX</text>
    <rect x='24' y='76' width='120' height='164' rx='6' fill={tint} stroke={ink} strokeWidth='2'/>
    <text x='34' y='96' fontSize='11.5' fontWeight='600' fill={ink}>Teensy 4.1</text>
    {[['3.3V', 'v'], ['18 SDA', 'sda'], ['19 SCL', 'scl'], ['GND', 'g']].map(p => <g key={p[1]}><text x='136' y={Y[p[1]] + 4} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>{p[0]}</text><path d={`M144 ${Y[p[1]]}H720`} stroke={ink} strokeWidth={p[1] === 'sda' || p[1] === 'scl' ? 2 : 1.5}/></g>)}
    <text x='724' y={Y.v + 4} fontSize='11.5' fill={ink}>3.3V</text>
    <text x='724' y={Y.sda + 4} fontSize='11.5' fill={ink}>SDA</text>
    <text x='724' y={Y.scl + 4} fontSize='11.5' fill={ink}>SCL</text>
    <text x='724' y={Y.g + 4} fontSize='11.5' fill={ink}>GND</text>
    <rect x='190' y='112' width='14' height='34' fill='#ffffff' stroke={ink} strokeWidth='1.3' strokeDasharray='3 2'/>
    <rect x='230' y='112' width='14' height='34' fill='#ffffff' stroke={ink} strokeWidth='1.3' strokeDasharray='3 2'/>
    <path d={`M197 ${Y.v}V112M197 146V${Y.sda}M237 ${Y.v}V112M237 146V${Y.scl}`} fill='none' stroke={ink} strokeWidth='1.3'/>
    {dot(197, Y.v)}{dot(197, Y.sda)}{dot(237, Y.v)}{dot(237, Y.scl)}
    <text x='256' y='126' fontSize='11.5' fill={ink}>4.7 kΩ pull-ups</text>
    <text x='256' y='142' fontSize='11.5' fill={quiet}>usually already on the breakouts</text>
    {dev(440, 140, 'BME280', 'address 0x76 or 0x77', [['VIN', 'v'], ['GND', 'g'], ['SCL', 'scl'], ['SDA', 'sda']])}
    {dev(596, 140, 'SSD1306 OLED', '128 × 64, addr 0x3C', [['GND', 'g'], ['VCC', 'v'], ['SCL', 'scl'], ['SDA', 'sda']])}
    <text x='24' y='366' fontSize='11.5' fill={quiet}>Use 3.3 V breakouts (or ones with a regulator and pull-ups to 3.3 V). Read the pin names on your board: OLED orders vary.</text>
    <path d='M24 384H736' stroke={rule} strokeWidth='1'/>
    <text x='24' y='410' fontWeight='600' fill={ink}>Serial loopback: no parts, two jumpers</text>
    <rect x='24' y='426' width='120' height='124' rx='6' fill={tint} stroke={ink} strokeWidth='2'/>
    <text x='34' y='446' fontSize='11.5' fontWeight='600' fill={ink}>Teensy 4.1</text>
    {[['0 RX1', 460], ['1 TX1', 484], ['7 RX2', 508], ['8 TX2', 532]].map(p => <g key={p[0]}><text x='136' y={p[1] + 4} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>{p[0]}</text><path d={`M144 ${p[1]}H170`} stroke={ink} strokeWidth='1.5'/></g>)}
    <path d='M170 484C230 484 230 508 170 508' fill='none' stroke={ink} strokeWidth='2.6'/>
    <path d='M170 532C290 532 290 460 170 460' fill='none' stroke={ink} strokeWidth='2.6'/>
    <text x='300' y='466' fontSize='11.5' fill={ink}>Serial1.print() leaves on TX1 and arrives on RX2: Serial2.read().</text>
    <text x='300' y='486' fontSize='11.5' fill={ink}>Serial2.print() leaves on TX2 and arrives on RX1.</text>
    <text x='300' y='510' fontSize='11.5' fill={ink}>A real device (GPS, MIDI DIN, another board): its TX to a Teensy RX,</text>
    <text x='300' y='528' fontSize='11.5' fill={ink}>its RX to a Teensy TX, grounds joined, 3.3 V levels only.</text>
  </svg>;
};
