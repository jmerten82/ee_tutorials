export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gnd = (x, y) => <g stroke={ink} strokeWidth='1.5'>
    <line x1={x - 12} x2={x + 12} y1={y} y2={y}/><line x1={x - 8} x2={x + 8} y1={y + 5} y2={y + 5}/><line x1={x - 4} x2={x + 4} y1={y + 10} y2={y + 10}/>
  </g>;
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const box = (x, y, w, ht, a, b, shaded) => <g>
    <rect x={x} y={y} width={w} height={ht} rx='4' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + w / 2} y={y + (b ? 18 : 23)} textAnchor='middle' fontSize='12' fontWeight='600' fill={ink}>{a}</text>
    {b ? <text x={x + w / 2} y={y + 33} textAnchor='middle' fontSize='11' fill={quiet}>{b}</text> : null}
  </g>;
  // a switch drawn vertically between y1 and y2 at x, open (blade angled) or closed
  const sw = (x, y1, y2, nc) => <g stroke={ink} strokeWidth='1.8' fill='none'>
    <circle cx={x} cy={y1} r='3' fill='#ffffff'/><circle cx={x} cy={y2} r='3' fill='#ffffff'/>
    {nc ? <path d={`M${x} ${y1 + 3}L${x + 2} ${y2 - 3}`}/> : <path d={`M${x} ${y1 + 3}L${x + 14} ${y2 - 6}`}/>}
  </g>;
  return <svg viewBox='0 0 760 480' role='img' aria-label='Tower 2: the hardware interlock and the controller' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Tower 2: the interlock and the controller</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Only the relay contact can power the fire rail. The XIAO reads the interlock and switches the actuator's low side</text>
    {box(24, 76, 96, 48, '12 V supply', 'current limit', true)}
    <path d='M120 100H150' stroke={ink} strokeWidth='1.5'/>
    <rect x='150' y='92' width='60' height='16' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='180' y='86' textAnchor='middle' fontSize='11' fill={ink}>fuse, rocker</text>
    <path d='M210 100H420V128' fill='none' stroke={ink} strokeWidth='1.5'/>
    {dot(260, 100)}
    <path d='M260 100V128' stroke={ink} strokeWidth='1.5'/>
    {sw(260, 131, 159, true)}
    <text x='272' y='150' fontSize='11.5' fill={ink}>E-stop (NC)</text>
    <path d='M260 162V176' stroke={ink} strokeWidth='1.5'/>
    {sw(260, 179, 207, false)}
    <text x='280' y='198' fontSize='11.5' fill={ink}>key</text>
    <path d='M260 210V250' stroke={ink} strokeWidth='1.5'/>
    {dot(260, 215)}
    <text x='206' y='219' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>coil feed</text>
    <path d='M230 215H260' stroke={ink} strokeWidth='1' strokeDasharray='3 2'/>
    <rect x='244' y='250' width='32' height='40' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='236' y='266' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>relay coil</text>
    <text x='236' y='281' textAnchor='end' fontSize='11' fill={quiet}>G5LE, 33 mA</text>
    <path d='M260 290V330' stroke={ink} strokeWidth='1.5'/>
    <path d='M260 240H300V300H260' fill='none' stroke={ink} strokeWidth='1.2'/>
    <polygon points='292,276 308,276 300,262' fill='none' stroke={ink} strokeWidth='1.5'/>
    <line x1='290' x2='310' y1='261' y2='261' stroke={ink} strokeWidth='2'/>
    <text x='312' y='290' fontSize='10.5' fill={quiet}>1N4007</text>
    {gnd(260, 330)}
    <path d='M276 270C330 270 370 200 412 146' fill='none' stroke={ink} strokeWidth='1' strokeDasharray='4 3'/>
    {sw(420, 131, 159, false)}
    <text x='438' y='138' fontSize='11.5' fill={ink}>relay contact</text>
    <path d='M420 162V230' stroke={ink} strokeWidth='2.5'/>
    {dot(420, 190)}
    <text x='430' y='181' fontSize='11.5' fontWeight='600' fill={ink}>fire rail</text>
    {box(380, 230, 80, 40, 'actuator', 'dummy load', false)}
    <path d='M420 270V300' stroke={ink} strokeWidth='1.5'/>
    {box(370, 300, 100, 44, 'MOSFET', 'module', false)}
    <path d='M420 344V370' stroke={ink} strokeWidth='1.5'/>
    {gnd(420, 370)}
    <path d='M420 190H490' stroke={ink} strokeWidth='1.2'/>
    <path d='M260 215H412A8 8 0 0 1 428 215H490' fill='none' stroke={ink} strokeWidth='1.2'/>
    {[[190, 'ARM'], [215, 'CHAIN']].map(([y, t]) => <g key={t}>
      <rect x='490' y={y - 8} width='60' height='16' fill='#ffffff' stroke={ink} strokeWidth='1.2'/>
      <text x='520' y={y + 4} textAnchor='middle' fontSize='10.5' fill={ink}>÷ 4.2</text>
      <path d={`M550 ${y}H600`} stroke={ink} strokeWidth='1.2'/>
    </g>)}
    <text x='520' y='240' textAnchor='middle' fontSize='10.5' fill={quiet}>dividers</text>
    <rect x='600' y='160' width='136' height='220' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='668' y='262' textAnchor='middle' fontWeight='600' fill={ink}>XIAO</text>
    <text x='668' y='278' textAnchor='middle' fontWeight='600' fill={ink}>RP2040</text>
    <text x='608' y='194' fontSize='11.5' fill={ink}>D1 ARM</text>
    <text x='608' y='219' fontSize='11.5' fill={ink}>D7 CHAIN</text>
    <text x='608' y='326' fontSize='11.5' fill={ink}>D2 FIRE</text>
    <text x='608' y='362' fontSize='11.5' fill={ink}>D10 RING</text>
    <path d='M600 322H470' stroke={ink} strokeWidth='1.2'/>
    <text x='535' y='316' textAnchor='middle' fontSize='10.5' fill={quiet}>10 kΩ pull-down</text>
    <path d='M600 358H580V420' fill='none' stroke={ink} strokeWidth='1.2'/>
    {box(500, 420, 160, 40, '74AHCT125 → ring', '5 V status ring', false)}
    <path d='M668 160V128' stroke={ink} strokeWidth='1.2'/>
    {box(620, 76, 96, 52, 'Mac', 'USB: host', true)}
    <text x='24' y='420' fontSize='11.5' fill={ink}>Key off or E-stop pressed: no coil current,</text>
    <text x='24' y='436' fontSize='11.5' fill={ink}>relay open, fire rail dead. Whatever the</text>
    <text x='24' y='452' fontSize='11.5' fill={ink}>XIAO does, the actuator has no energy.</text>
  </svg>;
};
