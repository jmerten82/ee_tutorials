export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const x0 = 90, y0 = 360, sx = 0.55, sy = 120; // 1 s = ... time axis 0..1000 units, current axis A
  const X = t => x0 + t * sx, Y = a => y0 - a * sy;
  // rest 0.05 A, a move with a start peak 1.0 A then 0.35 A, rest, a stall 1.5 A
  const pts = [[0, 0.05], [120, 0.05], [122, 1.0], [140, 0.6], [160, 0.38], [330, 0.35], [345, 0.05], [520, 0.05], [522, 0.95], [540, 0.55], [560, 0.4], [640, 0.6], [660, 1.45], [860, 1.5], [870, 0.05], [1000, 0.05]];
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join('');
  const lvl = (a, label, sub) => <g>
    <line x1={x0} x2={X(1000)} y1={Y(a)} y2={Y(a)} stroke={rule} strokeWidth='1' strokeDasharray='4 4'/>
    <text x={X(1000) + 8} y={Y(a) + 4} fontSize='11.5' fontWeight='600' fill={ink}>{label}</text>
    {sub ? <text x={X(1000) + 8} y={Y(a) + 18} fontSize='10.5' fill={quiet}>{sub}</text> : null}
  </g>;
  return <svg viewBox='0 0 760 440' role='img' aria-label='Typical, peak and stall current of a servo' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>A servo's current: typical, peak and stall</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Illustration of an X-series servo at 12 V; measure your own with a shunt (Exercise 1.2)</text>
    <rect x={X(650)} y={Y(1.6)} width={X(870) - X(650)} height={Y(0) - Y(1.6)} fill={tint}/>
    <text x={X(760)} y={Y(1.62) - 6} textAnchor='middle' fontSize='11.5' fill={ink}>held by hand: stall</text>
    {lvl(0.35, 'typical', 'moving')}
    {lvl(1.0, 'peak', 'start of a move')}
    {lvl(1.5, 'stall', 'sets the fuse')}
    <line x1={x0} x2={x0} y1={Y(1.75)} y2={y0} stroke={ink} strokeWidth='1.2'/>
    <line x1={x0} x2={X(1000)} y1={y0} y2={y0} stroke={ink} strokeWidth='1.2'/>
    {[0, 0.5, 1.0, 1.5].map(a => <text key={a} x={x0 - 8} y={Y(a) + 4} textAnchor='end' fontSize='11' fill={ink}>{a.toFixed(1) + ' A'}</text>)}
    <path d={d} fill='none' stroke={ink} strokeWidth='2'/>
    <text x={X(40)} y={Y(0.05) - 10} fontSize='11' fill={quiet}>at rest</text>
    <text x={X(200)} y={Y(0.35) - 10} fontSize='11' fill={quiet}>move</text>
    <text x={X(420)} y={Y(0.05) - 10} fontSize='11' fill={quiet}>at rest</text>
    <text x={X(1000)} y={y0 + 20} textAnchor='end' fontSize='11' fill={quiet}>time (a few seconds)</text>
    <text x='24' y='408' fontSize='11.5' fill={ink}>Typical current heats wires and regulators. Peaks cause the voltage dips that capacitors must cover.</text>
    <text x='24' y='426' fontSize='11.5' fill={ink}>Stall is the worst case the harness must survive until the fuse opens, or the servo's own protection cuts out.</text>
  </svg>;
};
