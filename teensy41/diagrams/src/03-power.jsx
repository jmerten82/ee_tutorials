// Power paths on the Teensy 4.1: USB or VIN, the cuttable VIN-VUSB link, the 3.3 V budget, VBAT and On/Off.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const gnd = (x, y) => <g><path d={`M${x} ${y}V${y + 8}M${x - 11} ${y + 8}H${x + 11}M${x - 7} ${y + 13}H${x + 7}M${x - 3} ${y + 18}H${x + 3}`} fill='none' stroke={ink} strokeWidth='1.5'/></g>;
  const button = (x, y) => <g><circle cx={x} cy={y} r='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/><circle cx={x + 36} cy={y} r='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/><path d={`M${x - 2} ${y - 9}H${x + 38}M${x + 18} ${y - 9}V${y - 19}M${x + 10} ${y - 19}H${x + 26}`} fill='none' stroke={ink} strokeWidth='1.5'/></g>;
  return <svg viewBox='0 0 760 500' role='img' aria-label='Teensy 4.1 power paths' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Where the power goes: 5 V in, 3.3 V out</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>VUSB and VIN are joined by a trace between two pads on the underside; cut it before feeding VIN while USB is plugged in</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'>
      <path d='M134 150H196'/><path d='M224 150H340'/><path d='M282 150V94'/><path d='M282 150V226'/>
      <path d='M450 150H720'/><path d='M520 150V200'/><path d='M650 150V200'/><path d='M395 176V206'/>
    </g>
    <rect x='24' y='122' width='110' height='56' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='79' y='146' textAnchor='middle' fontWeight='600' fill={ink}>USB micro-B</text>
    <text x='79' y='164' textAnchor='middle' fontSize='11.5' fill={quiet}>5 V from the Mac</text>
    <text x='150' y='140' fontSize='11.5' fontWeight='600' fill={ink}>VUSB</text>
    <rect x='190' y='143' width='14' height='14' fill={ink}/>
    <rect x='216' y='143' width='14' height='14' fill={ink}/>
    <path d='M204 150H216' stroke={ink} strokeWidth='3'/>
    <path d='M210 132V170' stroke={ink} strokeWidth='1.2' strokeDasharray='3 2'/>
    <text x='210' y='190' textAnchor='middle' fontSize='11.5' fill={ink}>cut here</text>
    <text x='210' y='204' textAnchor='middle' fontSize='11.5' fill={quiet}>(underside)</text>
    {dot(282, 150)}
    <text x='290' y='140' fontSize='11.5' fontWeight='600' fill={ink}>VIN</text>
    <text x='282' y='70' textAnchor='middle' fontSize='11.5' fill={ink}>USB host +5V</text>
    <text x='282' y='86' textAnchor='middle' fontSize='11.5' fill={quiet}>(current-limited)</text>
    <rect x='222' y='226' width='120' height='54' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5' strokeDasharray='6 4'/>
    <text x='282' y='248' textAnchor='middle' fontWeight='600' fill={ink}>VIN pin</text>
    <text x='282' y='266' textAnchor='middle' fontSize='11.5' fill={quiet}>3.6–5.5 V supply</text>
    <path d='M282 280V296' stroke={ink} strokeWidth='1.5'/>{gnd(282, 296)}
    <text x='300' y='308' fontSize='11.5' fill={quiet}>supply − to GND</text>
    <rect x='340' y='124' width='110' height='52' rx='6' fill={tint} stroke={ink} strokeWidth='2'/>
    <text x='395' y='146' textAnchor='middle' fontWeight='600' fill={ink}>regulator</text>
    <text x='395' y='164' textAnchor='middle' fontSize='11.5' fill={quiet}>VIN → 3.3 V</text>
    {gnd(395, 206)}
    {dot(520, 150)}{dot(650, 150)}
    <text x='470' y='140' fontSize='11.5' fontWeight='600' fill={ink}>3.3 V rail</text>
    <rect x='454' y='200' width='132' height='66' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='520' y='222' textAnchor='middle' fontWeight='600' fill={ink}>the board itself</text>
    <text x='520' y='240' textAnchor='middle' fontSize='11.5' fill={quiet}>CPU, flash, SD card</text>
    <text x='520' y='255' textAnchor='middle' fontSize='11.5' fill={quiet}>≈ 100 mA at 600 MHz</text>
    <rect x='598' y='200' width='138' height='66' rx='6' fill='#ffffff' stroke={ink} strokeWidth='2.2'/>
    <text x='667' y='222' textAnchor='middle' fontWeight='600' fill={ink}>3.3V pins</text>
    <text x='667' y='240' textAnchor='middle' fontSize='11.5' fill={quiet}>your sensors, OLED…</text>
    <text x='667' y='255' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>250 mA max</text>
    <path d='M24 336H736' stroke={rule} strokeWidth='1'/>
    <text x='24' y='362' fontWeight='600' fill={ink}>The three small pads beside the SD socket</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'><path d='M80 392V410'/><path d='M80 432V450'/><path d='M80 392H150'/></g>
    <path d='M64 410H96' stroke={ink} strokeWidth='3'/><path d='M70 420H90' stroke={ink} strokeWidth='1.5'/>
    <path d='M70 420V432H90V420' fill='none' stroke='none'/>
    <path d='M80 420V432' stroke={ink} strokeWidth='1.5'/>
    {gnd(80, 450)}
    <text x='56' y='416' textAnchor='end' fontSize='11.5' fill={ink}>+</text>
    <text x='100' y='428' fontSize='11.5' fill={ink}>CR2032</text>
    <rect x='150' y='385' width='14' height='14' fill='#ffffff' stroke={ink} strokeWidth='1.3'/>
    <text x='172' y='396' fontWeight='600' fill={ink}>VBAT</text>
    <text x='100' y='478' fontSize='11.5' fill={quiet}>keeps the clock running</text>
    <text x='100' y='492' fontSize='11.5' fill={quiet}>while the power is off</text>
    <rect x='300' y='385' width='14' height='14' fill='#ffffff' stroke={ink} strokeWidth='1.3'/>
    <text x='300' y='424' fontWeight='600' fill={ink}>On/Off</text>
    <path d='M314 392H340' stroke={ink} strokeWidth='1.5'/>{button(340, 392)}<path d='M376 392H400V412' fill='none' stroke={ink} strokeWidth='1.5'/>{gnd(400, 412)}
    <text x='300' y='452' fontSize='11.5' fill={quiet}>hold 4 s: 3.3 V off</text>
    <text x='300' y='468' fontSize='11.5' fill={quiet}>press 0.5 s: on again</text>
    <rect x='510' y='385' width='14' height='14' fill='#ffffff' stroke={ink} strokeWidth='1.3'/>
    <text x='510' y='424' fontWeight='600' fill={ink}>Program</text>
    <path d='M524 392H550' stroke={ink} strokeWidth='1.5'/>{button(550, 392)}<path d='M586 392H610V412' fill='none' stroke={ink} strokeWidth='1.5'/>{gnd(610, 412)}
    <text x='510' y='452' fontSize='11.5' fill={quiet}>same as the on-board button:</text>
    <text x='510' y='468' fontSize='11.5' fill={quiet}>enters upload mode, not reset</text>
  </svg>;
};
