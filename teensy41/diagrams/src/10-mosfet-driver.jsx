// Low-side N-MOSFET switch: 12 V LED strip (left) and DC motor with flyback diode (right), both PWM-driven from pin 5.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const gnd = (x, y) => <path d={`M${x} ${y}V${y + 8}M${x - 11} ${y + 8}H${x + 11}M${x - 7} ${y + 13}H${x + 7}M${x - 3} ${y + 18}H${x + 3}`} fill='none' stroke={ink} strokeWidth='1.5'/>;
  const nmos = (cx, cy) => <g>
    <path d={`M${cx - 30} ${cy}H${cx - 10}M${cx - 10} ${cy - 16}V${cy + 16}`} fill='none' stroke={ink} strokeWidth='1.8'/>
    <path d={`M${cx - 4} ${cy - 18}V${cy - 10}M${cx - 4} ${cy - 4}V${cy + 4}M${cx - 4} ${cy + 10}V${cy + 18}`} fill='none' stroke={ink} strokeWidth='2.6'/>
    <path d={`M${cx - 4} ${cy - 14}H${cx + 10}V${cy - 34}M${cx - 4} ${cy + 14}H${cx + 10}V${cy + 34}M${cx + 10} ${cy}V${cy + 14}`} fill='none' stroke={ink} strokeWidth='1.5'/>
    <path d={`M${cx + 10} ${cy}H${cx - 2}`} fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#mf-arrow)'/>
    <text x={cx - 27} y={cy - 8} fontSize='11.5' fill={ink}>G</text>
    <text x={cx + 16} y={cy - 22} fontSize='11.5' fill={ink}>D</text>
    <text x={cx + 16} y={cy + 30} fontSize='11.5' fill={ink}>S</text>
  </g>;
  const gate = (px, cx, cy) => <g>
    <path d={`M${px + 7} ${cy}H${px + 40}M${px + 90} ${cy}H${cx - 30}M${cx - 40} ${cy}V${cy + 24}M${cx - 40} ${cy + 64}V${cy + 80}`} fill='none' stroke={ink} strokeWidth='1.5'/>
    <rect x={px - 7} y={cy - 7} width='14' height='14' fill='#ffffff' stroke={ink} strokeWidth='1.6'/>
    <text x={px - 7} y={cy - 14} fontSize='11.5' fontWeight='600' fill={ink}>pin 5</text>
    <rect x={px + 40} y={cy - 8} width='50' height='16' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={px + 65} y={cy - 14} textAnchor='middle' fontSize='11.5' fill={ink}>100 Ω</text>
    <rect x={cx - 48} y={cy + 24} width='16' height='40' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={cx - 54} y={cy + 48} textAnchor='end' fontSize='11.5' fill={ink}>10 kΩ</text>
    {dot(cx - 40, cy)}
  </g>;
  return <svg viewBox='0 0 760 520' role='img' aria-label='MOSFET low-side driver for a 12 V LED strip and a motor' fontSize='13'>
    <defs><marker id='mf-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='5' markerHeight='5' orient='auto'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Switching 12 V loads: a logic-level MOSFET on the low side</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The Teensy only drives the gate. The 12 V current flows supply → load → drain → source → ground and never touches a pin</text>
    <text x='24' y='80' fontWeight='600' fill={ink}>A. 12 V LED strip (dimming)</text>
    <path d='M60 104H330' stroke={ink} strokeWidth='1.8'/>
    <text x='64' y='98' fontSize='11.5' fontWeight='600' fill={ink}>+12 V</text>
    <rect x='232' y='126' width='96' height='40' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='280' y='144' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>LED strip</text>
    <text x='280' y='159' textAnchor='middle' fontSize='11.5' fill={ink}>12 V, ≤ 3 A</text>
    <path d='M250 104V126M250 166V226' fill='none' stroke={ink} strokeWidth='1.5'/>
    {nmos(240, 260)}
    {gate(54, 240, 260)}
    <path d='M250 294V340M200 340H250' fill='none' stroke={ink} strokeWidth='1.5'/>
    {dot(250, 340)}{gnd(250, 340)}
    <text x='264' y='358' fontSize='11.5' fill={ink}>supply − and</text>
    <text x='264' y='374' fontSize='11.5' fill={ink}>Teensy GND</text>
    <path d='M370 70V400' stroke={rule} strokeWidth='1'/>
    <text x='390' y='80' fontWeight='600' fill={ink}>B. DC motor (speed control)</text>
    <path d='M420 104H720' stroke={ink} strokeWidth='1.8'/>
    <text x='424' y='98' fontSize='11.5' fontWeight='600' fill={ink}>+12 V</text>
    <circle cx='610' cy='152' r='22' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='610' y='157' textAnchor='middle' fontWeight='600' fill={ink}>M</text>
    <path d='M610 104V130M610 174V226M610 196H686V170M686 138V104' fill='none' stroke={ink} strokeWidth='1.5'/>
    <polygon points='674,170 698,170 686,148' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <path d='M672 146H700' stroke={ink} strokeWidth='2.8'/>
    <path d='M686 146V138' stroke={ink} strokeWidth='1.5'/>
    <text x='706' y='158' fontSize='11.5' fontWeight='600' fill={ink}>D1</text>
    <text x='706' y='174' fontSize='11.5' fill={ink}>1N5819</text>
    <text x='706' y='190' fontSize='11.5' fill={quiet}>band up</text>
    {dot(610, 196)}{dot(686, 104)}{dot(610, 104)}
    {nmos(600, 260)}
    {gate(414, 600, 260)}
    <path d='M610 294V340M560 340H610' fill='none' stroke={ink} strokeWidth='1.5'/>
    {dot(610, 340)}{gnd(610, 340)}
    <text x='624' y='358' fontSize='11.5' fill={ink}>common ground</text>
    <path d='M24 412H736' stroke={rule} strokeWidth='1'/>
    <text x='24' y='436' fontSize='11.5' fill={ink}>Q1: IRLB8721 (TO-220, logic-level, 30 V). Facing the printed side, legs left to right: G, D, S. Use one for each load.</text>
    <text x='24' y='456' fontSize='11.5' fill={ink}>100 Ω: limits the pin current while the gate charges. 10 kΩ: holds the gate low while the Teensy boots or is unplugged.</text>
    <text x='24' y='476' fontSize='11.5' fill={ink}>D1: a motor, relay or solenoid kicks back when switched off; the diode catches it. Band (cathode) to +12 V. LEDs need none.</text>
    <text x='24' y='496' fontSize='11.5' fill={quiet}>Never connect +12 V to any Teensy pin. Only the grounds are joined. No mains, ever.</text>
  </svg>;
};
