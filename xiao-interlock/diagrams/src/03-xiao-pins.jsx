export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const left = [['D0', 'GPIO26', 'A0', ''], ['D1', 'GPIO27', 'A1', 'ARM'], ['D2', 'GPIO28', 'A2', 'FIRE'], ['D3', 'GPIO29', 'A3', 'drain sense'],
    ['D4', 'GPIO6', 'SDA', ''], ['D5', 'GPIO7', 'SCL', ''], ['D6', 'GPIO0', 'TX', '']];
  const right = [['5V', '', '', ''], ['GND', '', '', ''], ['3V3', '', '', ''], ['D10', 'GPIO3', 'MOSI', 'RING'], ['D9', 'GPIO4', 'MISO', ''],
    ['D8', 'GPIO2', 'SCK', ''], ['D7', 'GPIO1', 'RX', 'CHAIN']];
  const y0 = 120, step = 38, bx = 300, bw = 160;
  return <svg viewBox='0 0 760 462' role='img' aria-label='XIAO RP2040 pins as used in this course' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>XIAO RP2040 pins in this course</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Top view, USB-C at the top. Labels on the board, GPIO numbers for the sketches. 3.3 V logic, not 5 V tolerant</text>
    <rect x={bx} y='80' width={bw} height='300' rx='14' fill={tint} stroke={ink} strokeWidth='2'/>
    <rect x={bx + 55} y='68' width='50' height='24' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={bx + 80} y='84' textAnchor='middle' fontSize='10.5' fill={ink}>USB-C</text>
    <text x={bx + 80} y='103' textAnchor='middle' fontSize='10.5' fontWeight='600' fill={ink}>XIAO RP2040</text>
    {left.map(([l, g, f, use], i) => {
      const y = y0 + i * step;
      return <g key={l}>
        <circle cx={bx + 14} cy={y} r='7' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
        <text x={bx + 28} y={y + 4} fontSize='11.5' fontWeight='600' fill={ink}>{l}</text>
        <text x={bx - 10} y={y + 4} textAnchor='end' fontSize='11' fill={ink}>{g + '  ' + f}</text>
        {use ? <g><rect x='24' y={y - 11} width='120' height='22' rx='4' fill={ink}/>
          <text x='84' y={y + 4} textAnchor='middle' fontSize='11.5' fontWeight='600' fill='#ffffff'>{use}</text>
          <line x1='144' x2='196' y1={y} y2={y} stroke={ink} strokeWidth='1.2'/></g> : null}
      </g>;
    })}
    {right.map(([l, g, f, use], i) => {
      const y = y0 + i * step;
      return <g key={l}>
        <circle cx={bx + bw - 14} cy={y} r='7' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
        <text x={bx + bw - 28} y={y + 4} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>{l}</text>
        {g ? <text x={bx + bw + 10} y={y + 4} fontSize='11' fill={ink}>{g + '  ' + f}</text> : null}
        {use ? <g><line x1='584' x2='616' y1={y} y2={y} stroke={ink} strokeWidth='1.2'/>
          <rect x='616' y={y - 11} width='120' height='22' rx='4' fill={ink}/>
          <text x='676' y={y + 4} textAnchor='middle' fontSize='11.5' fontWeight='600' fill='#ffffff'>{use}</text></g> : null}
      </g>;
    })}
    <text x='24' y='408' fontSize='11.5' fill={ink}>ARM and CHAIN arrive through 12 V dividers; FIRE drives the MOSFET module; RING goes through the 74AHCT125.</text>
    <text x='24' y='426' fontSize='11.5' fill={ink}>Onboard: B (boot) and R (reset) buttons; RGB LED on GPIO 17, 16, 25 (on when LOW); pixel on GPIO 12, its power on GPIO 11.</text>
    <text x='24' y='444' fontSize='11.5' fill={quiet}>D7 is also the UART RX pin: do not start Serial1. Serial is USB.</text>
  </svg>;
};
