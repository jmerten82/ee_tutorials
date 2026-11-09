export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const pins = [['1', 'GND', 'ground'], ['2', 'VDD', 'supply (12 V or 5 V)'], ['3', 'DATA', 'half-duplex TTL data']];
  return <svg viewBox='0 0 760 360' role='img' aria-label='The X3P cable and the TTL pinout' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The X3P cable and the TTL pinout</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>JST EH 3-pin, crimped contacts. Pin numbers from the ROBOTIS e-Manual; check pin 1 on your connector</text>
    <rect x='60' y='90' width='150' height='70' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    {pins.map(([n], i) => <g key={n}>
      <rect x={78 + i * 42} y='108' width='30' height='34' rx='2' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
      <text x={93 + i * 42} y='130' textAnchor='middle' fontWeight='600' fill={ink}>{n}</text>
    </g>)}
    <text x='135' y='80' textAnchor='middle' fontSize='11.5' fill={ink}>housing, contacts facing you</text>
    {pins.map(([n, name, what], i) => <g key={'t' + n}>
      <path d={`M${93 + i * 42} 160V${210 + i * 34}H260`} fill='none' stroke={ink} strokeWidth='1.2'/>
      <text x='268' y={214 + i * 34} fontWeight='600' fill={ink}>{'Pin ' + n + ': ' + name}</text>
      <text x='400' y={214 + i * 34} fontSize='11.5' fill={ink}>{what}</text>
    </g>)}
    <rect x='470' y='80' width='250' height='100' rx='6' fill='none' stroke={rule} strokeDasharray='5 4'/>
    <text x='482' y='100' fontSize='11.5' fontWeight='600' fill={ink}>Two connectors per servo,</text>
    <text x='482' y='117' fontSize='11.5' fontWeight='600' fill={ink}>wired in parallel</text>
    <rect x='520' y='126' width='110' height='42' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <rect x='510' y='138' width='12' height='18' fill={ink}/>
    <rect x='628' y='138' width='12' height='18' fill={ink}/>
    <path d='M522 147H628' stroke={ink} strokeWidth='1' strokeDasharray='3 3'/>
    <text x='24' y='330' fontSize='11.5' fill={ink}>Crimped contacts are never soldered. Seat every plug fully, with the bus unpowered.</text>
  </svg>;
};
