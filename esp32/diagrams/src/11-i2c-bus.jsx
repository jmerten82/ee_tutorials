export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const gnd = (x, y) => <g stroke={ink} strokeWidth='1.5'>
    <line x1={x} x2={x} y1={y} y2={y + 10}/>
    <line x1={x - 12} x2={x + 12} y1={y + 10} y2={y + 10}/>
    <line x1={x - 8} x2={x + 8} y1={y + 15} y2={y + 15}/>
    <line x1={x - 4} x2={x + 4} y1={y + 20} y2={y + 20}/>
  </g>;
  const pwrUp = (x, y) => <g>
    <line x1={x - 12} x2={x + 12} y1={y} y2={y} stroke={ink} strokeWidth='2'/>
    <text x={x} y={y - 6} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>3V3</text>
  </g>;
  const pwrDown = (x, y) => <g>
    <line x1={x} x2={x} y1={y - 25} y2={y} stroke={ink} strokeWidth='1.5'/>
    <line x1={x - 12} x2={x + 12} y1={y} y2={y} stroke={ink} strokeWidth='2'/>
    <text x={x} y={y + 16} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>3V3</text>
  </g>;
  const device = (x, name, l2, l3, sclX, sdaX) => <g>
    <line x1={sclX} x2={sclX} y1='210' y2='300' stroke={ink} strokeWidth='1.5'/>
    <line x1={sdaX} x2={sdaX} y1='250' y2='300' stroke={ink} strokeWidth='1.5'/>
    {dot(sclX, 210)}{dot(sdaX, 250)}
    <rect x={x} y='300' width='150' height='100' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x={sclX} y='316' textAnchor='middle' fontSize='11.5' fill={ink}>SCL</text>
    <text x={sdaX} y='316' textAnchor='middle' fontSize='11.5' fill={ink}>SDA</text>
    <text x={x + 75} y='342' textAnchor='middle' fontWeight='600' fill={ink}>{name}</text>
    <text x={x + 75} y='359' textAnchor='middle' fontSize='11.5' fill={ink}>{l2}</text>
    <text x={x + 75} y='375' textAnchor='middle' fontSize='11.5' fill={quiet}>{l3}</text>
    <text x={sclX} y='394' textAnchor='middle' fontSize='11.5' fill={ink}>VCC</text>
    <text x={sdaX} y='394' textAnchor='middle' fontSize='11.5' fill={ink}>GND</text>
    {pwrDown(sclX, 425)}
    {gnd(sdaX, 400)}
  </g>;
  return <svg viewBox='0 0 760 548' role='img' aria-label='I2C: two wires, many devices, one pair of pull-ups' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>I2C: two wires, many devices, one pair of pull-ups</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Lesson 4. Every device on the bus has its own address; all of them run from 3V3</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'>
      <path d='M170 210H712'/>
      <path d='M170 250H712'/>
      <path d='M170 170H196'/>
      <path d='M240 100V120'/>
      <path d='M240 160V210'/>
      <path d='M290 100V120'/>
      <path d='M290 160V250'/>
      <path d='M140 300V316'/>
    </g>
    {dot(240, 210)}{dot(290, 250)}
    <line x1='196' x2='196' y1='158' y2='182' stroke={ink} strokeWidth='2'/>
    <text x='202' y='174' fontSize='11.5' fontWeight='600' fill={ink}>3V3</text>
    {pwrUp(240, 100)}{pwrUp(290, 100)}
    <rect x='232' y='120' width='16' height='40' fill='none' stroke={ink} strokeWidth='1.5'/>
    <rect x='282' y='120' width='16' height='40' fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='226' y='144' textAnchor='end' fontWeight='600' fill={ink}>R1</text>
    <text x='306' y='138' fontWeight='600' fill={ink}>R2</text>
    <text x='306' y='154' fontSize='11.5' fill={quiet}>4.7 kΩ each</text>
    <text x='718' y='214' fontWeight='600' fill={ink}>SCL</text>
    <text x='718' y='254' fontWeight='600' fill={ink}>SDA</text>
    <rect x='30' y='150' width='140' height='150' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='60' y='196' textAnchor='middle' fontWeight='600' fill={ink}>ESP32</text>
    <text x='162' y='174' textAnchor='end' fontSize='11.5' fill={ink}>3V3</text>
    <text x='162' y='214' textAnchor='end' fontSize='11.5' fill={ink}>GPIO22</text>
    <text x='162' y='254' textAnchor='end' fontSize='11.5' fill={ink}>GPIO21</text>
    <text x='140' y='292' textAnchor='middle' fontSize='11.5' fill={ink}>GND</text>
    {gnd(140, 316)}
    <text x='30' y='350' fontSize='11.5' fill={ink}>Wire.begin(21, 22);</text>
    <text x='400' y='96' fontWeight='600' fill={ink}>One pair of pull-ups per bus, to 3V3</text>
    <text x='400' y='114' fontSize='11.5' fill={quiet}>Most breakout modules already carry them.</text>
    <text x='400' y='130' fontSize='11.5' fill={quiet}>Check before adding more; 2–3 sets in parallel</text>
    <text x='400' y='146' fontSize='11.5' fill={quiet}>are fine, more makes the low level too weak.</text>
    {device(380, 'BME280', 'addr 0x76', '0x77 if SDO to 3V3', 420, 490)}
    {device(570, 'SSD1306 OLED', '128 × 64 pixels', 'addr 0x3C', 610, 680)}
    <rect x='24' y='372' width='334' height='164' rx='4' fill='none' stroke={rule} strokeWidth='1.5'/>
    <text x='36' y='394' fontWeight='600' fill={ink}>Open drain: anyone may pull low</text>
    <text x='36' y='412' fontSize='11.5' fill={quiet}>Released, the resistor pulls the line to 3.3 V.</text>
    <text x='36' y='428' fontSize='11.5' fill={quiet}>A device switches it to 0 V; none drives it high.</text>
    <text x='40' y='465' fontSize='11.5' fontWeight='600' fill={ink}>3V3</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'>
      <path d='M68 461H90'/>
      <rect x='90' y='453' width='40' height='16'/>
      <path d='M130 461H320'/>
      <path d='M200 461V476'/>
      <path d='M200 476L212 490'/>
      <path d='M200 494V500'/>
      <path d='M280 461V476'/>
      <path d='M280 476L292 490'/>
      <path d='M280 494V500'/>
    </g>
    {dot(200, 461)}{dot(280, 461)}
    {gnd(200, 500)}{gnd(280, 500)}
    <text x='222' y='490' fontSize='11.5' fill={ink}>ESP32</text>
    <text x='302' y='490' fontSize='11.5' fill={ink}>sensor</text>
    <text x='110' y='446' textAnchor='middle' fontSize='11.5' fill={quiet}>4.7 kΩ</text>
  </svg>;
};
