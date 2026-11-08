// Capstone: Teensy desk synth and USB MIDI controller. Eight keys, four knobs, OLED, MQS audio out.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gnd = (x, y) => <path d={`M${x} ${y}V${y + 8}M${x - 11} ${y + 8}H${x + 11}M${x - 7} ${y + 13}H${x + 7}M${x - 3} ${y + 18}H${x + 3}`} fill='none' stroke={ink} strokeWidth='1.5'/>;
  const flagR = (x, y, t) => <g><polygon points={`${x},${y} ${x + 10},${y - 10} ${x + 44},${y - 10} ${x + 44},${y + 10} ${x + 10},${y + 10}`} fill='#ffffff' stroke={ink} strokeWidth='1.3'/><text x={x + 26} y={y + 4} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{t}</text></g>;
  const flagL = (x, y, t) => <g><polygon points={`${x},${y} ${x - 10},${y - 10} ${x - 44},${y - 10} ${x - 44},${y + 10} ${x - 10},${y + 10}`} fill='#ffffff' stroke={ink} strokeWidth='1.3'/><text x={x - 26} y={y + 4} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{t}</text></g>;
  const notes = ['C4 60', 'D4 62', 'E4 64', 'F4 65', 'G4 67', 'A4 69', 'B4 71', 'C5 72'];
  const btn = (k) => {
    const y = 110 + k * 50, pin = String(k + 2);
    return <g key={'b' + k}>
      <path d={`M90 ${y}H187M233 ${y}H300M90 ${y}V${y + 8}`} fill='none' stroke={ink} strokeWidth='1.5'/>{gnd(90, y + 8)}
      <circle cx='190' cy={y} r='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/><circle cx='230' cy={y} r='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
      <path d={`M186 ${y - 10}H234M210 ${y - 10}V${y - 20}M200 ${y - 20}H220`} fill='none' stroke={ink} strokeWidth='1.5'/>
      <text x='24' y={y + 4} fontSize='11.5' fontWeight='600' fill={ink}>{'S' + (k + 1)}</text>
      <text x='140' y={y - 6} textAnchor='middle' fontSize='11.5' fill={quiet}>{notes[k]}</text>
      <text x='306' y={y + 4} fontSize='11.5' fontWeight='600' fill={ink}>{pin}</text>
    </g>;
  };
  const pot = (x, y0, t, role) => <g key={'p' + t}>
    <text x={x} y={y0} textAnchor='middle' fontSize='11.5' fill={ink}>3.3V</text>
    <path d={`M${x} ${y0 + 6}V${y0 + 18}M${x} ${y0 + 62}V${y0 + 72}`} stroke={ink} strokeWidth='1.5'/>
    <rect x={x - 8} y={y0 + 18} width='16' height='44' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <path d={`M${x - 40} ${y0 + 40}H${x - 11}`} stroke={ink} strokeWidth='1.5' markerEnd='url(#cs-arrow)'/>
    {flagL(x - 40, y0 + 40, t)}{gnd(x, y0 + 72)}
  </g>;
  return <svg viewBox='0 0 760 620' role='img' aria-label='Capstone desk synth schematic' fontSize='13'>
    <defs><marker id='cs-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='5' markerHeight='5' orient='auto'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Capstone schematic: the Teensy desk synth</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>USB Type: Serial + MIDI. Plays its own sound on MQS and sends every key and knob to the Mac as MIDI</text>
    <rect x='300' y='76' width='140' height='470' rx='6' fill={tint} stroke={ink} strokeWidth='2'/>
    <rect x='345' y='58' width='50' height='18' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='403' y='71' fontSize='11.5' fill={ink}>USB to the Mac</text>
    <text x='370' y='300' textAnchor='middle' fontWeight='600' fill={ink}>Teensy 4.1</text>
    {[0, 1, 2, 3, 4, 5, 6, 7].map(btn)}
    <path d='M270 520H300M270 520V526' fill='none' stroke={ink} strokeWidth='1.5'/>{gnd(270, 526)}<text x='306' y='524' fontSize='11.5' fontWeight='600' fill={ink}>GND</text>
    {[['14 A0', 'K1', 110], ['15 A1', 'K2', 150], ['16 A2', 'K3', 190], ['17 A3', 'K4', 230]].map(r => <g key={r[1]}>
      <path d={`M440 ${r[2]}H462`} stroke={ink} strokeWidth='1.5'/>
      <text x='434' y={r[2] + 4} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>{r[0]}</text>
      {flagR(462, r[2], r[1])}
    </g>)}
    {pot(616, 84, 'K1', 'cutoff')}{pot(716, 84, 'K2', 'reso')}{pot(616, 196, 'K3', 'release')}{pot(716, 196, 'K4', 'volume')}
    <text x='434' y='334' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>18 SDA</text>
    <text x='434' y='364' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>19 SCL</text>
    <path d='M440 330H580M440 360H580' stroke={ink} strokeWidth='1.8'/>
    <rect x='580' y='312' width='150' height='66' rx='5' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='588' y='334' fontSize='11.5' fill={ink}>SDA</text><text x='588' y='364' fontSize='11.5' fill={ink}>SCL</text>
    <text x='690' y='340' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>OLED</text>
    <text x='690' y='356' textAnchor='middle' fontSize='11.5' fill={ink}>SSD1306</text>
    <text x='655' y='394' textAnchor='middle' fontSize='11.5' fill={quiet}>VCC 3.3V, GND, addr 0x3C</text>
    <text x='434' y='424' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>12 MQSL</text>
    <text x='434' y='454' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>10 MQSR</text>
    <path d='M440 420H520M440 450H520M620 420H650M620 450H650' stroke={ink} strokeWidth='1.5'/>
    <rect x='520' y='406' width='100' height='58' rx='5' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='570' y='430' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>2 × RC filter</text>
    <text x='570' y='448' textAnchor='middle' fontSize='11.5' fill={quiet}>as drawing 14</text>
    <rect x='650' y='406' width='80' height='58' rx='5' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='690' y='430' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>jack</text>
    <text x='690' y='448' textAnchor='middle' fontSize='11.5' fill={ink}>→ speakers</text>
    <text x='434' y='504' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>3.3V</text>
    <path d='M440 500H480' stroke={ink} strokeWidth='1.5'/>
    <text x='486' y='504' fontSize='11.5' fill={quiet}>to pots and OLED VCC (≈ 25 mA total)</text>
    <text x='434' y='528' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>GND</text>
    <path d='M440 524H480V530' fill='none' stroke={ink} strokeWidth='1.5'/>{gnd(480, 530)}
    <path d='M24 566H736' stroke={rule} strokeWidth='1'/>
    <text x='24' y='588' fontSize='11.5' fill={ink}>Pins used: 2–9 keys, 14–17 knobs, 18–19 I2C, 10 and 12 audio. Free for extensions: 0, 1, 11, 13 (LED), 20–41.</text>
    <text x='24' y='606' fontSize='11.5' fill={quiet}>MQS uses 10 and 12, so the SPI port (10–13) is not available in this project; the SD card and I2C are unaffected.</text>
  </svg>;
};
