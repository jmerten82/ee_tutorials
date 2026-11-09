export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const servo = (x, label) => <g>
    <rect x={x} y='150' width='100' height='60' rx='8' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x={x + 50} y='176' textAnchor='middle' fontWeight='600' fill={ink}>{label}</text>
    <text x={x + 50} y='194' textAnchor='middle' fontSize='11' fill={quiet}>up to 1.4 A</text>
  </g>;
  return <svg viewBox='0 0 760 360' role='img' aria-label='Where the current flows in a chain' fontSize='13'>
    <defs><marker id='dx-pw-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Where the current flows in a chain</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Example: three XL430-W250-T at 12 V, stall current 1.4 A each (e-Manual)</text>
    <rect x='24' y='140' width='120' height='80' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='84' y='172' textAnchor='middle' fontWeight='600' fill={ink}>Supply +</text>
    <text x='84' y='190' textAnchor='middle' fontWeight='600' fill={ink}>power hub</text>
    <path d='M144 180H200' stroke={ink} strokeWidth='5'/>
    {servo(200, 'ID 1')}
    <path d='M300 180H360' stroke={ink} strokeWidth='3.5'/>
    {servo(360, 'ID 2')}
    <path d='M460 180H520' stroke={ink} strokeWidth='2'/>
    {servo(520, 'ID 3')}
    <text x='172' y='130' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>4.2 A</text>
    <text x='330' y='130' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>2.8 A</text>
    <text x='490' y='130' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>1.4 A</text>
    <path d='M172 136V170' stroke={ink} strokeWidth='1' markerEnd='url(#dx-pw-arrow)'/>
    <path d='M330 136V170' stroke={ink} strokeWidth='1' markerEnd='url(#dx-pw-arrow)'/>
    <path d='M490 136V170' stroke={ink} strokeWidth='1' markerEnd='url(#dx-pw-arrow)'/>
    <text x='24' y='260' fontSize='11.5' fill={ink}>Worst case, all servos stalled: the first cable carries every servo's current, and each connector drops a little voltage.</text>
    <text x='24' y='280' fontSize='11.5' fill={ink}>Supply rating at least the sum of the stall currents, with margin. Check Present Input Voltage on the last servo.</text>
    <rect x='24' y='300' width='712' height='40' rx='6' fill={tint}/>
    <text x='380' y='325' textAnchor='middle' fontSize='11.5' fill={ink}>Budget: 3 × 1.4 A = 4.2 A, so a 5 A to 6 A supply, a hub and fuse rated above it, short chains.</text>
  </svg>;
};
