export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const box = (x, y, t, s, shaded) => <g>
    <rect x={x} y={y} width='96' height='44' rx='5' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + 48} y={y + 19} textAnchor='middle' fontSize='12' fontWeight='600' fill={ink}>{t}</text>
    <text x={x + 48} y={y + 34} textAnchor='middle' fontSize='10.5' fill={quiet}>{s}</text>
  </g>;
  return <svg viewBox='0 0 760 420' role='img' aria-label='Daisy-chained and star grounds' fontSize='13'>
    <defs><marker id='pu-gr-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Ground is a wire: daisy chain and star</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Only the ground wires are drawn. Arrows: the servo's return current on its way back to the supply</text>
    <line x1='380' x2='380' y1='66' y2='360' stroke={rule}/>
    <text x='24' y='84' fontWeight='600' fill={ink}>Daisy chain: shared return</text>
    {box(24, 110, 'Supply −', '0 V', true)}
    {box(140, 210, 'XIAO + hub', 'logic, USB')}
    {box(256, 300, 'Servo', 'up to 2 A')}
    <path d='M72 154V232H140' fill='none' stroke={ink} strokeWidth='2'/>
    <path d='M236 232H304V300' fill='none' stroke={ink} strokeWidth='2'/>
    <path d='M290 290V250' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#pu-gr-arrow)'/>
    <path d='M130 222H84V170' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#pu-gr-arrow)'/>
    <text x='24' y='380' fontSize='11.5' fill={ink}>The servo's 2 A flows through the logic's ground:</text>
    <text x='24' y='396' fontSize='11.5' fill={ink}>the XIAO's 0 V moves with every servo pulse.</text>
    <text x='404' y='84' fontWeight='600' fill={ink}>Star: separate returns</text>
    {box(404, 110, 'Supply −', 'star point', true)}
    {box(520, 210, 'XIAO + hub', 'logic, USB')}
    {box(636, 300, 'Servo', 'up to 2 A')}
    <path d='M452 154V232H520' fill='none' stroke={ink} strokeWidth='1.5'/>
    <path d='M500 132H684V300' fill='none' stroke={ink} strokeWidth='3'/>
    <path d='M670 290V160' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#pu-gr-arrow)'/>
    <text x='560' y='126' fontSize='11' fill={ink}>own heavy return wire</text>
    <text x='404' y='380' fontSize='11.5' fill={ink}>The servo's current returns on its own wire; the</text>
    <text x='404' y='396' fontSize='11.5' fill={ink}>logic's ground carries only the logic's milliamps.</text>
  </svg>;
};
