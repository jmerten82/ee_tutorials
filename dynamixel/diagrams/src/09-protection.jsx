export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const box = (x, y, w, ht, t, lines, shaded) => <g>
    <rect x={x} y={y} width={w} height={ht} rx='6' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + 12} y={y + 22} fontWeight='600' fill={ink}>{t}</text>
    {lines.map((l, i) => <text key={l} x={x + 12} y={y + 42 + i * 16} fontSize='11' fill={ink}>{l}</text>)}
  </g>;
  const arrow = d => <path d={d} fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#dx-pr-arrow)'/>;
  return <svg viewBox='0 0 760 380' role='img' aria-label='Protection inside the servo' fontSize='13'>
    <defs><marker id='dx-pr-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Protection inside the servo</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Limits stored in EEPROM; faults reported in RAM; a reboot clears them</text>
    {box(24, 76, 210, 120, 'Limits (EEPROM)', ['Temperature Limit (31)', 'Max/Min Voltage Limit (32, 34)', 'PWM Limit (36)', 'Current Limit (38, some models)'], false)}
    {box(274, 76, 210, 120, 'A fault occurs', ['too hot, wrong voltage,', 'overload, electrical shock,', 'encoder error'], true)}
    {box(524, 76, 212, 120, 'Hardware Error Status (70)', ['one bit per fault', 'alert bit 7 set in every', 'status packet'], false)}
    {arrow('M234 136H272')}
    {arrow('M484 136H522')}
    {box(274, 230, 210, 100, 'Shutdown (63)', ['default 52: overheating,', 'electrical shock, overload', '→ torque off, stays off'], true)}
    {arrow('M630 196V212H380V228')}
    {box(524, 230, 212, 100, 'Recovery', ['fix the cause, then', 'Reboot (instruction 08)', 'or power-cycle'], false)}
    {arrow('M484 280H522')}
    <text x='24' y='260' fontSize='11.5' fill={ink}>Your script: read 70 at start,</text>
    <text x='24' y='276' fontSize='11.5' fill={ink}>watch temperature and voltage,</text>
    <text x='24' y='292' fontSize='11.5' fill={ink}>torque off on every exit.</text>
  </svg>;
};
