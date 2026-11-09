export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const st = (x, y, name, sub, dark) => <g>
    <rect x={x - 70} y={y - 30} width='140' height='60' rx='30' fill={dark ? ink : tint} stroke={ink} strokeWidth='2'/>
    <text x={x} y={y - 2} textAnchor='middle' fontSize='14' fontWeight='600' fill={dark ? '#ffffff' : ink}>{name}</text>
    <text x={x} y={y + 15} textAnchor='middle' fontSize='10.5' fill={dark ? '#ffffff' : quiet}>{sub}</text>
  </g>;
  const arrow = (d, label, lx, ly, anchor) => <g>
    <path d={d} fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#xi-sm-arrow)'/>
    <text x={lx} y={ly} textAnchor={anchor || 'middle'} fontSize='11' fill={ink}>{label}</text>
  </g>;
  return <svg viewBox='0 0 760 470' role='img' aria-label='The controller state machine' fontSize='13'>
    <defs><marker id='xi-sm-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='7' markerHeight='7' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>States and transitions</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The output is on only in FIRING. Every arrow is checked once per loop, in well under a millisecond</text>
    {st(130, 150, 'SAFE', 'output off', false)}
    {st(400, 150, 'ARMED', 'output off', false)}
    {st(640, 150, 'FIRING', 'output ON', true)}
    {st(400, 360, 'FAULT', 'output off, latched', false)}
    {arrow('M200 140H330', 'interlock closed 0.5 s', 265, 130)}
    <text x='265' y='112' textAnchor='middle' fontSize='11' fill={ink}>and host alive</text>
    {arrow('M330 166H200', 'interlock open or host lost', 265, 186)}
    {arrow('M470 140H570', 'FIRE <ms>', 520, 130)}
    <text x='520' y='112' textAnchor='middle' fontSize='11' fill={quiet}>re-arm time over</text>
    {arrow('M570 166H470', 'time up or STOP', 520, 186)}
    {arrow('M640 120C640 64 130 64 130 118', 'interlock open or host lost', 385, 72)}
    {arrow('M400 180V330', '', 0, 0)}
    {arrow('M150 180C170 290 280 340 330 352', '', 0, 0)}
    {arrow('M620 182C600 290 520 340 470 352', '', 0, 0)}
    <text x='408' y='290' fontSize='11' fill={ink}>ARM and CHAIN disagree</text>
    <text x='408' y='305' fontSize='11' fill={ink}>longer than 50 ms</text>
    {arrow('M330 375C200 390 110 300 118 182', '', 0, 0)}
    <text x='120' y='400' fontSize='11' fill={ink}>CLEAR with the key off</text>
    <text x='120' y='415' fontSize='11' fill={quiet}>(a person looked first)</text>
    <path d='M24 150H58' stroke={ink} strokeWidth='1.5' markerEnd='url(#xi-sm-arrow)'/>
    <text x='24' y='140' fontSize='11' fill={ink}>boot</text>
    <text x='24' y='452' fontSize='11.5' fill={ink}>Limits: pulse 1 to 500 ms, ended by time; no new pulse within 2 s of the last; heartbeat timeout 1 s; watchdog 0.5 s.</text>
  </svg>;
};
