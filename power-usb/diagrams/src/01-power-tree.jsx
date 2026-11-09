export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const box = (x, y, w, ht, t, s, shaded) => <g>
    <rect x={x} y={y} width={w} height={ht} rx='5' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + w / 2} y={y + (s ? 20 : 25)} textAnchor='middle' fontWeight='600' fill={ink}>{t}</text>
    {s ? <text x={x + w / 2} y={y + 36} textAnchor='middle' fontSize='11' fill={quiet}>{s}</text> : null}
  </g>;
  const wire = (d, heavy, dash) => <path d={d} fill='none' stroke={ink} strokeWidth={heavy ? 3 : 1.5} strokeDasharray={dash || ''} markerEnd={heavy === 'arrow' ? 'url(#pu-pt-arrow)' : ''}/>;
  return <svg viewBox='0 0 760 490' role='img' aria-label='The power tree of one tower' fontSize='13'>
    <defs><marker id='pu-pt-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The power tree of one tower</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>One source, rails branching down, loads at the leaves. Heavy lines: 12 V. Dashed: USB data only</text>
    {box(24, 80, 110, 46, '12 V supply', 'enclosed, certified', true)}
    {box(170, 80, 96, 46, 'Jack', 'W7')}
    {box(296, 80, 96, 46, 'Rocker', 'W8')}
    {box(422, 80, 96, 46, 'Fuse', '7.5 A, W9')}
    {wire('M134 103H170', true)}{wire('M266 103H296', true)}{wire('M392 103H422', true)}
    {wire('M518 103H560V160', true)}
    <line x1='60' x2='720' y1='160' y2='160' stroke={ink} strokeWidth='3'/>
    <text x='728' y='164' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}> </text>
    <text x='64' y='152' fontSize='11.5' fontWeight='600' fill={ink}>12 V bus (18 AWG, W21)</text>
    {wire('M100 160V200', true)}{wire('M240 160V200', true)}{wire('M420 160V200', true)}{wire('M620 160V200', true)}
    {box(40, 200, 120, 46, 'Servos', 'DYNAMIXEL, 12 V')}
    {box(180, 200, 120, 46, 'MOSFET modules', '12 V loads')}
    {box(360, 200, 120, 46, 'Buck 1', 'D36V28F5, 5 V', true)}
    {box(560, 200, 120, 46, 'Buck 2', 'D36V28F5, 5 V', true)}
    {wire('M420 246V300')}{wire('M620 246V300')}
    <text x='428' y='278' fontSize='11' fill={ink}>5 V, W10</text>
    <text x='628' y='278' fontSize='11' fill={ink}>5 V, W22</text>
    {box(360, 300, 120, 46, 'Hub 1', 'CH334F, 5V pad')}
    {box(560, 300, 120, 46, 'Hub 2', 'CH334F, 5V pad')}
    {wire('M420 346V390')}{wire('M620 346V390')}
    {box(330, 390, 90, 40, 'XIAO', 'RP2040')}
    {box(440, 390, 90, 40, 'LED ring', 'WS2812')}
    {box(590, 390, 90, 40, 'devices', 'downstream')}
    <path d='M420 346V370H485V390' fill='none' stroke={ink} strokeWidth='1.5'/>
    <path d='M420 346V370H375V390' fill='none' stroke={ink} strokeWidth='1.5'/>
    {box(40, 300, 150, 46, 'Mac', 'USB host, data only', true)}
    <path d='M190 315H360' fill='none' stroke={ink} strokeWidth='1.5' strokeDasharray='6 4'/>
    <path d='M190 335H310V446H710V323H680' fill='none' stroke={ink} strokeWidth='1.5' strokeDasharray='6 4'/>
    <text x='200' y='308' fontSize='11' fill={ink}>W2: D+, D−, GND, CC</text>
    <text x='200' y='352' fontSize='11' fill={quiet}>W17 to hub 2</text>
    <text x='24' y='476' fontSize='11.5' fill={ink}>VBUS is cut in the upstream leads: the hubs take 5 V only from their bucks. Your tower may differ: draw your own.</text>
  </svg>;
};
