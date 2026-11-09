export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const cx = 230, cy = 220, r = 130;
  const at = (count, rr) => { const a = (count / 4096) * 2 * Math.PI; return [cx + rr * Math.sin(a), cy - rr * Math.cos(a)]; };
  const arc = (c1, c2, rr) => { const [x1, y1] = at(c1, rr), [x2, y2] = at(c2, rr); return `M${x1.toFixed(1)} ${y1.toFixed(1)}A${rr} ${rr} 0 ${c2 - c1 > 2048 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`; };
  const tick = (c, label, anchor) => { const [x1, y1] = at(c, r - 8), [x2, y2] = at(c, r + 8), [tx, ty] = at(c, r + 26); return <g key={label}>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth='2'/>
    <text x={tx} y={ty + 4} textAnchor={anchor || 'middle'} fontSize='11.5' fontWeight='600' fill={ink}>{label}</text></g>; };
  return <svg viewBox='0 0 760 420' role='img' aria-label='Positions, limits and homing offset' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Positions, limits and homing offset</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Position mode: one turn is 4096 counts, about 0.088° per count; 2048 is the middle</text>
    <circle cx={cx} cy={cy} r={r} fill='none' stroke={rule} strokeWidth='1.5'/>
    <path d={arc(1200, 2900, r)} fill='none' stroke={ink} strokeWidth='8' opacity='0.35'/>
    {tick(0, '0 / 4095')}{tick(1024, '1024', 'start')}{tick(2048, '2048')}{tick(3072, '3072', 'end')}
    {tick(1200, 'Min limit', 'start')}{tick(2900, 'Max limit', 'end')}
    <line x1={cx} y1={cy} x2={at(2048, r - 20)[0]} y2={at(2048, r - 20)[1]} stroke={ink} strokeWidth='4'/>
    <circle cx={cx} cy={cy} r='8' fill={ink}/>
    <text x={cx + 14} y={cy - 6} fontSize='11.5' fill={ink}>horn at home</text>
    <text x='470' y='110' fontWeight='600' fill={ink}>Safe range (shaded)</text>
    <text x='470' y='128' fontSize='11.5' fill={ink}>Goal Position outside Min/Max Position</text>
    <text x='470' y='144' fontSize='11.5' fill={ink}>Limit is refused (Data Limit Error).</text>
    <text x='470' y='184' fontWeight='600' fill={ink}>Homing Offset</text>
    <text x='470' y='202' fontSize='11.5' fill={ink}>Shifts the reading: Present Position =</text>
    <text x='470' y='218' fontSize='11.5' fill={ink}>raw position + Homing Offset.</text>
    <text x='470' y='234' fontSize='11.5' fill={ink}>Set it so the mechanical centre reads 2048.</text>
    <text x='470' y='274' fontWeight='600' fill={ink}>Drive Mode bit 0</text>
    <text x='470' y='292' fontSize='11.5' fill={ink}>Reverses the direction, for mirrored</text>
    <text x='470' y='308' fontSize='11.5' fill={ink}>mounting. Set limits after changing it.</text>
    <text x='24' y='404' fontSize='11.5' fill={ink}>Limits are in the servo's EEPROM: they protect the mechanism even when the controlling code is wrong.</text>
  </svg>;
};
