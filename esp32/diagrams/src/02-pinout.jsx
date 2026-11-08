// ESP32-DevKitC V4 pinout, top view, USB at the bottom. Pin order checked against
// the Espressif ESP32-DevKitC V4 user guide (header J2 and J3 tables).
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const J2 = [
    ['3V3', 'pwr', '3.3 V from the LDO'], ['EN', 'pwr', 'reset: low = chip off'],
    ['GPIO36', 'care', 'VP · ADC1_0 · input only'], ['GPIO39', 'care', 'VN · ADC1_3 · input only'],
    ['GPIO34', 'care', 'ADC1_6 · input only ◆ pot'], ['GPIO35', 'care', 'ADC1_7 · input only ◆ volts'],
    ['GPIO32', 'safe', 'ADC1_4 · touch 9'], ['GPIO33', 'safe', 'ADC1_5 · touch 8 ◆ button'],
    ['GPIO25', 'safe', 'ADC2_8 · DAC 1 ◆ LED'], ['GPIO26', 'safe', 'ADC2_9 · DAC 2'],
    ['GPIO27', 'safe', 'ADC2_7 · touch 7'], ['GPIO14', 'safe', 'ADC2_6 · pulses at boot'],
    ['GPIO12', 'care', 'strap: must be low at boot'], ['GND', 'pwr', 'ground'],
    ['GPIO13', 'safe', 'ADC2_4 · touch 4'], ['GPIO9', 'avoid', 'D2 · SPI flash'],
    ['GPIO10', 'avoid', 'D3 · SPI flash'], ['GPIO11', 'avoid', 'CMD · SPI flash'], ['5V', 'pwr', '5 V: USB or supply in'],
  ];
  const J3 = [
    ['GND', 'pwr', 'ground'], ['GPIO23', 'safe', 'SPI MOSI'], ['GPIO22', 'safe', 'I2C SCL ◆ sensors'],
    ['GPIO1', 'avoid', 'TX · USB serial'], ['GPIO3', 'avoid', 'RX · USB serial'], ['GPIO21', 'safe', 'I2C SDA ◆ sensors'],
    ['GND', 'pwr', 'ground'], ['GPIO19', 'safe', 'SPI MISO ◆ MOSFET'], ['GPIO18', 'safe', 'SPI SCK ◆ servo'],
    ['GPIO5', 'care', 'strap · SPI SS'], ['GPIO17', 'safe', 'Serial2 TX'], ['GPIO16', 'safe', 'Serial2 RX'],
    ['GPIO4', 'safe', 'ADC2_0 · touch 0'], ['GPIO0', 'care', 'BOOT button · strap'], ['GPIO2', 'care', 'strap · ADC2_2'],
    ['GPIO15', 'care', 'strap · ADC2_3'], ['GPIO8', 'avoid', 'D1 · SPI flash'], ['GPIO7', 'avoid', 'D0 · SPI flash'], ['GPIO6', 'avoid', 'CLK · SPI flash'],
  ];
  const y0 = 186, p = 39, lx = 318, rx = 442;
  const tag = (x, y, label, st) => {
    const w = 66, th = 24, X = x - w / 2, Y = y - th / 2;
    if (st === 'safe') return <g><rect x={X} y={Y} width={w} height={th} rx='4' fill={ink}/><text x={x} y={y + 4.5} textAnchor='middle' fontWeight='600' fill='#ffffff'>{label}</text></g>;
    if (st === 'care') return <g><rect x={X} y={Y} width={w} height={th} rx='4' fill='#ffffff' stroke={ink} strokeWidth='2'/><text x={x} y={y + 4.5} textAnchor='middle' fontWeight='600' fill={ink}>{label}</text></g>;
    if (st === 'avoid') return <g><rect x={X} y={Y} width={w} height={th} rx='4' fill='url(#pin-hatch)' stroke={ink} strokeWidth='1.25' strokeDasharray='4 3'/><text x={x} y={y + 4.5} textAnchor='middle' fill={ink}>{label}</text></g>;
    return <g><rect x={X} y={Y} width={w} height={th} rx='12' fill={tint} stroke={edge} strokeWidth='1'/><text x={x} y={y + 4.5} textAnchor='middle' fontWeight='600' fill={ink}>{label}</text></g>;
  };
  const row = (d, i, side) => {
    const y = y0 + i * p, left = side === 'L';
    const px = left ? lx : rx, tx = left ? 252 : 508;
    return <g key={side + i}>
      <line x1={left ? tx + 33 : px} x2={left ? px : tx - 33} y1={y} y2={y} stroke={ink} strokeWidth='1.25'/>
      <circle cx={px} cy={y} r='7' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
      <circle cx={px} cy={y} r='2.5' fill={ink}/>
      {tag(tx, y, d[0], d[1])}
      <text x={left ? 211 : 549} y={y + 4} textAnchor={left ? 'end' : 'start'} fontSize='11.5' fill={ink}>{d[2]}</text>
      <text x={left ? px + 13 : px - 13} y={y + 4} textAnchor={left ? 'start' : 'end'} fontSize='10' fill={quiet}>{i + 1}</text>
    </g>;
  };
  return <svg viewBox='0 0 760 990' role='img' aria-label='ESP32-DevKitC V4 pinout with safe, careful and avoid pins' fontSize='13'>
    <defs>
      <pattern id='pin-hatch' width='6' height='6' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>
        <rect x='0' y='0' width='6' height='6' fill='#ffffff'/>
        <rect x='0' y='0' width='2' height='6' fill={edge} fillOpacity='0.3'/>
      </pattern>
    </defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>ESP32-DevKitC V4 pinout (top view, USB at the bottom)</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Left header J2 and right header J3, 19 pins each at 2.54 mm; pin numbers inside the board edge</text>
    <g>
      {tag(57, 84, 'safe', 'safe')}<text x='96' y='88' fontSize='11.5' fill={ink}>general I/O</text>
      {tag(207, 84, 'careful', 'care')}<text x='246' y='88' fontSize='11.5' fill={ink}>read the note</text>
      {tag(373, 84, 'avoid', 'avoid')}<text x='412' y='88' fontSize='11.5' fill={ink}>flash or USB serial</text>
      {tag(565, 84, 'power', 'pwr')}<text x='604' y='88' fontSize='11.5' fill={ink}>power, reset</text>
      <text x='24' y='118' fontSize='11.5' fill={quiet}>◆ = pin used in this course. ADC2 pins (ADC2_n) cannot read analog while Wi-Fi is on; use ADC1.</text>
    </g>
    <rect x='300' y='132' width='160' height='790' rx='8' fill='#ffffff' stroke={ink} strokeWidth='2'/>
    <rect x='348' y='138' width='64' height='300' rx='3' fill={tint} stroke={edge} strokeWidth='1.25'/>
    <path d='M354 152h14v14h-10v10h18v-24h14v24h14' fill='none' stroke={edge} strokeWidth='1.5'/>
    <text x='380' y='196' textAnchor='middle' fontSize='10' fill={quiet}>antenna</text>
    <rect x='353' y='210' width='54' height='220' rx='2' fill='#ffffff' stroke={ink} strokeWidth='1.25'/>
    <text x='380' y='320' transform='rotate(-90 380 320)' textAnchor='middle' fontWeight='600' fill={ink}>ESP32-WROOM-32E</text>
    <rect x='352' y='560' width='56' height='56' rx='2' fill={tint} stroke={edge} strokeWidth='1.25'/>
    <text x='380' y='584' textAnchor='middle' fontSize='10' fill={ink}>USB-</text>
    <text x='380' y='598' textAnchor='middle' fontSize='10' fill={ink}>UART</text>
    <rect x='356' y='680' width='48' height='30' rx='2' fill={tint} stroke={edge} strokeWidth='1.25'/>
    <text x='380' y='699' textAnchor='middle' fontSize='10' fill={ink}>LDO</text>
    <rect x='350' y='820' width='24' height='24' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/><circle cx='362' cy='832' r='6' fill={tint} stroke={ink} strokeWidth='1.25'/>
    <text x='362' y='864' textAnchor='middle' fontSize='10' fontWeight='600' fill={ink}>EN</text>
    <rect x='386' y='820' width='24' height='24' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/><circle cx='398' cy='832' r='6' fill={tint} stroke={ink} strokeWidth='1.25'/>
    <text x='398' y='864' textAnchor='middle' fontSize='10' fontWeight='600' fill={ink}>BOOT</text>
    <rect x='356' y='898' width='48' height='36' rx='3' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='380' y='952' textAnchor='middle' fontSize='11.5' fill={quiet}>micro-USB</text>
    {J2.map((d, i) => row(d, i, 'L'))}
    {J3.map((d, i) => row(d, i, 'R'))}
    <text x='252' y='160' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>J2</text>
    <text x='508' y='160' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>J3</text>
    <text x='24' y='978' fontSize='11.5' fill={quiet}>GPIO16/17 are free on WROOM boards only. "Strap" pins set the boot mode at reset; see the boot-mode drawing.</text>
  </svg>;
};
