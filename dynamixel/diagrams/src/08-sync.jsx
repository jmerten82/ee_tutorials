export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const seg = (x, w, y, label, shaded) => <g key={label + x}>
    <rect x={x} y={y} width={w} height='26' rx='3' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth='1.2'/>
    <text x={x + w / 2} y={y + 17} textAnchor='middle' fontSize='11' fill={ink}>{label}</text>
  </g>;
  const lat = (x, w, y) => <g key={'l' + x}><rect x={x} y={y + 8} width={w} height='10' fill={rule} opacity='0.5'/></g>;
  const single = [];
  let x = 40;
  for (const id of [1, 2, 3]) {
    single.push(seg(x, 54, 110, 'Read ' + id, false)); x += 54;
    single.push(lat(x, 46, 110)); x += 46;
    single.push(seg(x, 62, 110, 'Status ' + id, true)); x += 68;
  }
  const endSingle = x;
  const sync = [seg(40, 70, 220, 'Sync Read', false), lat(110, 46, 220), seg(156, 62, 220, 'Status 1', true), seg(220, 62, 220, 'Status 2', true), seg(284, 62, 220, 'Status 3', true)];
  return <svg viewBox='0 0 760 340' role='img' aria-label='Separate reads and a sync read' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Three separate reads, or one sync read</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Grey bars: return delay and USB serial latency, paid once per round trip. Not to scale</text>
    <text x='40' y='98' fontWeight='600' fill={ink}>One by one: three round trips</text>
    {single}
    <text x={endSingle + 10} y='127' fontSize='11.5' fill={ink}>done</text>
    <text x='40' y='208' fontWeight='600' fill={ink}>Sync Read (instruction 82): one round trip, the servos answer in turn</text>
    {sync}
    <text x='356' y='237' fontSize='11.5' fill={ink}>done</text>
    <text x='24' y='292' fontSize='11.5' fill={ink}>Sync Write (instruction 83) is one packet with a goal for every servo, and no answers at all.</text>
    <text x='24' y='312' fontSize='11.5' fill={ink}>Both work on the same address block in every servo, for example Present Position, 4 bytes from 132.</text>
  </svg>;
};
