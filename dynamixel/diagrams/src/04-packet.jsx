export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const row = (y, bytes, groups, title, w) => {
    const x0 = 30;
    return <g>
      <text x='24' y={y - 34} fontWeight='600' fill={ink}>{title}</text>
      {bytes.map((b, i) => <g key={i}>
        <rect x={x0 + i * w} y={y - 22} width={w - 4} height='30' rx='3' fill={groups.find(g => i >= g[0] && i <= g[1])[3] ? tint : '#ffffff'} stroke={ink} strokeWidth='1.2'/>
        <text x={x0 + i * w + (w - 4) / 2} y={y - 2} textAnchor='middle' fontWeight='600' fill={ink}>{b}</text>
      </g>)}
      {groups.map(([a, b, label], k) => <g key={label}>
        <path d={`M${x0 + a * w} ${y + 14}V${y + 20}H${x0 + b * w + w - 4}V${y + 14}`} fill='none' stroke={ink} strokeWidth='1'/>
        <text x={x0 + (a * w + b * w + w - 4) / 2} y={y + 36 + (k % 2) * 14} textAnchor='middle' fontSize='11' fill={ink}>{label}</text>
      </g>)}
    </g>;
  };
  return <svg viewBox='0 0 760 400' role='img' aria-label='Anatomy of a Protocol 2.0 packet' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Anatomy of a Protocol 2.0 packet</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Hexadecimal bytes in the order they are sent. Multi-byte numbers are little-endian (low byte first)</text>
    {row(130, ['FF', 'FF', 'FD', '00', '01', '03', '00', '01', '19', '4E'],
      [[0, 2, 'header', true], [3, 3, 'reserved', false], [4, 4, 'ID 1', true], [5, 6, 'length 3', false], [7, 7, 'Ping', true], [8, 9, 'CRC 0x4E19', false]],
      'Ping to ID 1', 54)}
    {row(270, ['FF', 'FF', 'FD', '00', '01', '07', '00', '02', '84', '00', '04', '00', '1D', '15'],
      [[0, 2, 'header', true], [3, 3, 'reserved', false], [4, 4, 'ID 1', true], [5, 6, 'length 7', false], [7, 7, 'Read', true], [8, 9, 'address 132', false], [10, 11, 'size 4', true], [12, 13, 'CRC 0x151D', false]],
      'Read Present Position (address 132, 4 bytes) from ID 1', 50)}
    <text x='24' y='362' fontSize='11.5' fill={ink}>Length = instruction + parameters + 2 CRC bytes. CRC-16 (polynomial 0x8005) over every byte before it.</text>
    <text x='24' y='382' fontSize='11.5' fill={ink}>The answer is a status packet: same frame, instruction 55, then an error byte, then the data.</text>
  </svg>;
};
