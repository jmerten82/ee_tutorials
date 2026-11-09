export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const ee = [['7', 'ID'], ['8', 'Baud Rate'], ['9', 'Return Delay Time'], ['10', 'Drive Mode'], ['11', 'Operating Mode'], ['20', 'Homing Offset'], ['36', 'PWM Limit'], ['48 / 52', 'Max / Min Position Limit'], ['63', 'Shutdown']];
  const ram = [['64', 'Torque Enable'], ['65', 'LED'], ['70', 'Hardware Error Status'], ['108 / 112', 'Profile Accel. / Velocity'], ['116', 'Goal Position'], ['122', 'Moving'], ['132', 'Present Position'], ['144', 'Present Input Voltage'], ['146', 'Present Temperature']];
  const col = (x, title, sub, rows, shaded) => <g>
    <rect x={x} y='76' width='330' height='42' rx='6' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + 12} y='94' fontWeight='600' fill={ink}>{title}</text>
    <text x={x + 12} y='110' fontSize='11' fill={quiet}>{sub}</text>
    {rows.map(([a, n], i) => <g key={a}>
      <rect x={x} y={124 + i * 26} width='330' height='24' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth='0.8'/>
      <text x={x + 12} y={140 + i * 26} fontSize='12' fontWeight='600' fill={ink}>{a}</text>
      <text x={x + 90} y={140 + i * 26} fontSize='12' fill={ink}>{n}</text>
    </g>)}
  </g>;
  return <svg viewBox='0 0 760 420' role='img' aria-label='The control table: EEPROM and RAM' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The control table: EEPROM and RAM</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Selected X-series addresses; your model's e-Manual page has the full table with sizes and units</text>
    {col(24, 'EEPROM: addresses 0 to 63', 'kept at power-off; write only with torque off', ee, false)}
    {col(406, 'RAM: addresses 64 and up', 'reset at power-up; the live state', ram, true)}
    <text x='24' y='400' fontSize='11.5' fill={ink}>Torque Enable = 1 locks the EEPROM area: an EEPROM write then fails with an Access Error.</text>
  </svg>;
};
