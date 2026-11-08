export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const top = 130, base = 330, A = base - top;
  const x0 = 60;
  // pulse with finite rise, overshoot and undershoot, then a second rise
  const pts = [];
  const rise = (xs, from, to, n) => { for (let i = 0; i <= n; i++) { const t = i / n; pts.push([xs + t * 40, from + (to - from) * (0.5 - 0.5 * Math.cos(Math.PI * t))]); } };
  const ring = (xs, lvl, dir, len) => { for (let i = 1; i <= 30; i++) { const t = i / 30; pts.push([xs + t * len, lvl + dir * 22 * Math.exp(-t * 4) * Math.cos(t * 9)]); } };
  pts.push([x0, base]);
  rise(100, base, top, 12); ring(140, top, -1, 90); pts.push([340, top]);
  rise(340, top, base, 12); ring(380, base, 1, 90); pts.push([520, base]);
  rise(520, base, top, 12); ring(560, top, -1, 90); pts.push([700, top]);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
  const y10 = base - 0.1 * A, y90 = base - 0.9 * A, y50 = base - 0.5 * A;
  const dim = (x1, x2, y, label, below) => <g>
    <path d={`M${x1} ${y}H${x2}`} stroke={ink} strokeWidth='1.2' markerStart='url(#ms-arrow)' markerEnd='url(#ms-arrow)'/>
    <text x={(x1 + x2) / 2} y={y + (below ? 16 : -6)} textAnchor='middle' fontSize='11.5' fill={ink}>{label}</text>
  </g>;
  const vdim = (x, y1, y2, label) => <g>
    <path d={`M${x} ${y1}V${y2}`} stroke={ink} strokeWidth='1.2' markerStart='url(#ms-arrow)' markerEnd='url(#ms-arrow)'/>
    <text x={x + 6} y={(y1 + y2) / 2 + 4} fontSize='11.5' fill={ink}>{label}</text>
  </g>;
  return <svg viewBox='0 0 760 480' role='img' aria-label='What the scope measures on a pulse' fontSize='13'>
    <defs><marker id='ms-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>What the scope measures on a pulse</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Levels from all samples, times at the thresholds (10 %, 50 %, 90 % by default)</text>
    {[[top, 'Top'], [base, 'Base']].map(([y, t]) => <g key={t}>
      <line x1={x0} x2='700' y1={y} y2={y} stroke={rule} strokeWidth='1' strokeDasharray='4 4'/>
      <text x='706' y={y + 4} fontSize='11.5' fontWeight='600' fill={ink}>{t}</text>
    </g>)}
    <line x1={x0} x2='700' y1={top - 22} y2={top - 22} stroke={rule} strokeWidth='1' strokeDasharray='1 3'/>
    <text x='706' y={top - 18} fontSize='11.5' fill={ink}>Max</text>
    <line x1={x0} x2='700' y1={base + 22} y2={base + 22} stroke={rule} strokeWidth='1' strokeDasharray='1 3'/>
    <text x='706' y={base + 26} fontSize='11.5' fill={ink}>Min</text>
    {[[y90, '90 %'], [y50, '50 %'], [y10, '10 %']].map(([y, t]) => <g key={t}>
      <line x1='86' x2='160' y1={y} y2={y} stroke={ink} strokeWidth='0.8' strokeDasharray='2 2'/>
      <text x='82' y={y + 4} textAnchor='end' fontSize='11' fill={quiet}>{t}</text>
    </g>)}
    <path d={d} fill='none' stroke={ink} strokeWidth='2'/>
    {vdim(470, top, base, 'Amplitude')}
    {vdim(640, top - 22, base + 22, 'Pk-Pk')}
    {dim(104, 136, 374, 'Rise time', true)}
    <line x1='104' x2='104' y1={y10} y2='378' stroke={ink} strokeWidth='0.8'/>
    <line x1='136' x2='136' y1={y90} y2='378' stroke={ink} strokeWidth='0.8'/>
    {dim(120, 360, y50, '+Width (at 50 %)', false)}
    {dim(120, 540, 410, 'Period = 1 / Frequency', true)}
    <line x1='120' x2='120' y1={y50} y2='414' stroke={ink} strokeWidth='0.8' strokeDasharray='2 2'/>
    <line x1='540' x2='540' y1={y50} y2='414' stroke={ink} strokeWidth='0.8' strokeDasharray='2 2'/>
    <text x='24' y='446' fontSize='11.5' fill={ink}>+Duty Cycle = +Width / Period. Amplitude = Top − Base ignores overshoot; Pk-Pk = Max − Min includes it.</text>
    <text x='24' y='464' fontSize='11.5' fill={ink}>Mean is the average of all samples; RMS the root mean square. I2C rise time uses 30 % and 70 % instead.</text>
  </svg>;
};
