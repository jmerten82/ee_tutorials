export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const stages = [
    ['0', 'Cold checks', 'no shorts, polarity', 'meter only'],
    ['1', '12 V bus only', 'near 0 mA', '100 mA'],
    ['2', 'Bucks, no load', '5 V ± 4 %', '200 mA'],
    ['3', 'Hub + XIAO', 'budget typical', '500 mA'],
    ['4', 'USB to the Mac', 'enumerates', '500 mA'],
    ['5', 'LED ring', 'ring current', '1.5 A'],
    ['6', 'Servos, MOSFET loads', 'all move, switch', 'budget peak'],
    ['7', 'Real supply + fuse', 'same as stage 6', 'fuse'],
  ];
  const bw = 166, bh = 70, gap = 18;
  const pos = i => [24 + (i % 4) * (bw + gap), 80 + Math.floor(i / 4) * (bh + 60)];
  return <svg viewBox='0 0 760 380' role='img' aria-label='Staged bring-up of a new tower' fontSize='13'>
    <defs><marker id='pu-bu-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Staged bring-up: one stage at a time, current-limited</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Each box: what you connect, what you expect, and the bench supply's current limit</text>
    {stages.map(([n, t, e, lim], i) => { const [x, y] = pos(i); return <g key={n}>
      <rect x={x} y={y} width={bw} height={bh} rx='6' fill={i === 0 || i === 7 ? tint : '#ffffff'} stroke={ink} strokeWidth='1.5'/>
      <text x={x + 10} y={y + 20} fontSize='12' fontWeight='600' fill={ink}>{n + '  ' + t}</text>
      <text x={x + 10} y={y + 40} fontSize='11' fill={ink}>{'expect: ' + e}</text>
      <text x={x + 10} y={y + 58} fontSize='11' fill={quiet}>{'limit: ' + lim}</text>
    </g>; })}
    {[0, 1, 2, 4, 5, 6].map(i => { const [x, y] = pos(i); return <path key={i} d={`M${x + bw + 2} ${y + bh / 2}H${x + bw + gap - 2}`} stroke={ink} strokeWidth='1.5' markerEnd='url(#pu-bu-arrow)'/>; })}
    <path d={`M${pos(3)[0] + bw / 2} ${pos(3)[1] + bh + 2}V${pos(3)[1] + bh + 28}H${pos(4)[0] + bw / 2}V${pos(4)[1] - 2}`} fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#pu-bu-arrow)'/>
    <rect x='24' y='300' width='712' height='58' rx='6' fill={tint}/>
    <text x='380' y='324' textAnchor='middle' fontSize='12' fontWeight='600' fill={ink}>Any surprise: switch off, find out why, repeat the stage.</text>
    <text x='380' y='344' textAnchor='middle' fontSize='11.5' fill={ink}>Supply in current limit at near 0 V = a short. Unexpected current = a reversed or wrong part. No current = an open connection.</text>
  </svg>;
};
