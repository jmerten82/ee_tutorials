export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const x0 = 100, y0 = 360, Vtop = 120; // 0 V at y0, 3.3 V at Vtop
  const H = y0 - Vtop;
  const ns = t => x0 + t * 0.55; // 1 ns = 0.55 px, 0..1000 ns
  const curve = tau => { let d = `M${x0} ${y0}`; for (let t = 0; t <= 1000; t += 5) d += `L${ns(t).toFixed(1)} ${(y0 - H * (1 - Math.exp(-t / tau))).toFixed(1)}`; return d; };
  const C = 150e-12;
  const rs = [[10000, '10 kΩ'], [4700, '4.7 kΩ'], [2200, '2.2 kΩ']];
  const y30 = y0 - 0.3 * H, y70 = y0 - 0.7 * H;
  const tau22 = 2200 * C * 1e9, t30 = -tau22 * Math.log(0.7), t70 = -tau22 * Math.log(0.3);
  return <svg viewBox='0 0 760 470' role='img' aria-label='I2C rise time for three pull-up resistors' fontSize='13'>
    <defs><marker id='i2c-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>I2C rise time and the pull-up resistor</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The chips pull the line low; the pull-up charges the bus capacitance back up. Example: 150 pF bus</text>
    {[[y70, '70 %'], [y30, '30 %']].map(([y, t]) => <g key={t}>
      <line x1={x0} x2={ns(1000)} y1={y} y2={y} stroke={ink} strokeWidth='1' strokeDasharray='6 4'/>
      <text x={x0 - 8} y={y + 4} textAnchor='end' fontSize='11.5' fill={ink}>{t}</text>
    </g>)}
    <rect x={ns(t30)} y={y70} width={ns(t70) - ns(t30)} height={y30 - y70} fill={tint}/>
    <line x1={ns(t30)} x2={ns(t30)} y1={y30} y2={y0} stroke={ink} strokeWidth='0.8' strokeDasharray='2 2'/>
    <line x1={ns(t70)} x2={ns(t70)} y1={y70} y2={y0} stroke={ink} strokeWidth='0.8' strokeDasharray='2 2'/>
    <path d={`M${ns(t30)} ${y0 - 14}H${ns(t70)}`} stroke={ink} strokeWidth='1.2' markerStart='url(#i2c-arrow)' markerEnd='url(#i2c-arrow)'/>
    <text x={(ns(t30) + ns(t70)) / 2} y={y0 - 20} textAnchor='middle' fontSize='11.5' fill={ink}>t_rise for 2.2 kΩ</text>
    <line x1={x0} x2={x0} y1={Vtop - 10} y2={y0} stroke={ink} strokeWidth='1.2'/>
    <line x1={x0} x2={ns(1000)} y1={y0} y2={y0} stroke={ink} strokeWidth='1.2'/>
    <text x={x0 - 8} y={Vtop + 4} textAnchor='end' fontSize='11.5' fill={ink}>3.3 V</text>
    <text x={x0 - 8} y={y0 + 4} textAnchor='end' fontSize='11.5' fill={ink}>0 V</text>
    {[0, 200, 400, 600, 800, 1000].map(t => <text key={t} x={ns(t)} y={y0 + 18} textAnchor='middle' fontSize='11' fill={ink}>{t}</text>)}
    <text x={ns(1000)} y={y0 + 34} textAnchor='end' fontSize='11' fill={quiet}>time after release (ns)</text>
    {rs.map(([R, label], i) => {
      const tau = R * C * 1e9;
      const tr = 0.847 * tau;
      const tEnd = 1000;
      return <g key={label}>
        <path d={curve(tau)} fill='none' stroke={ink} strokeWidth={i === 1 ? 2.5 : 2} strokeDasharray={i === 0 ? '8 4' : i === 2 ? '' : '3 3'}/>
        <text x={ns(tEnd) + 6} y={y0 - H * (1 - Math.exp(-tEnd / tau)) + 4} fontSize='11.5' fontWeight='600' fill={ink}>{label + ': ' + Math.round(tr) + ' ns'}</text>
      </g>;
    })}
    <text x='24' y='420' fontSize='11.5' fill={ink}>Rise time (30 % to 70 %) = 0.847 × R × C. Measure it, then solve for the bus capacitance: C ≈ t_rise / (0.847 × R).</text>
    <text x='24' y='440' fontSize='11.5' fill={ink}>Standard-mode (100 kHz) allows 1000 ns, Fast-mode (400 kHz) 300 ns. Smaller R: faster edges, more current when low.</text>
  </svg>;
};
