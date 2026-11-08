export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const x0 = 130, bw = 44;
  const bits = [1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1];  // 1 = recessive, 0 = dominant
  const level = { rec: 200, hi: 160, lo: 240 };
  const path = (domY) => { let d = `M${x0} ${level.rec}`; bits.forEach((b, i) => { d += `H${x0 + i * bw}V${b ? level.rec : domY}`; }); return d + `H${x0 + bits.length * bw}`; };
  const diffY = { rec: 380, dom: 320 };
  let diff = `M${x0} ${diffY.rec}`;
  bits.forEach((b, i) => { diff += `H${x0 + i * bw}V${b ? diffY.rec : diffY.dom}`; });
  diff += `H${x0 + bits.length * bw}`;
  return <svg viewBox='0 0 760 470' role='img' aria-label='CAN high, CAN low and their difference' fontSize='13'>
    <defs><marker id='can-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>CAN on the scope</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Two wires, opposite movements. Recessive (1): both near 2.3 V. Dominant (0): CANH up, CANL down. Levels typical</text>
    {bits.map((b, i) => b ? null : <rect key={i} x={x0 + i * bw} y='120' width={bw} height='280' fill={tint}/>)}
    <text x={x0 + 2 * bw + bw} y='112' textAnchor='middle' fontSize='11.5' fill={ink}>dominant</text>
    <text x={x0 + bw / 2 * 1} y='112' textAnchor='middle' fontSize='11.5' fill={ink}>recessive</text>
    <path d={path(level.hi)} fill='none' stroke={ink} strokeWidth='2'/>
    <path d={path(level.lo)} fill='none' stroke={ink} strokeWidth='2' strokeDasharray='7 3'/>
    <text x={x0 - 10} y={level.hi + 4} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>CH1 CANH</text>
    <text x={x0 - 10} y={level.lo + 4} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>CH2 CANL</text>
    <text x={x0 - 10} y={level.rec + 4} textAnchor='end' fontSize='11' fill={quiet}>≈ 2.3 V</text>
    <path d={diff} fill='none' stroke={ink} strokeWidth='2.5'/>
    <text x={x0 - 10} y={diffY.dom + 4} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>F1 = C1 − C2</text>
    <text x={x0 - 10} y={diffY.rec + 4} textAnchor='end' fontSize='11' fill={quiet}>≈ 0 V</text>
    <text x={x0 + 3 * bw} y={diffY.dom - 8} textAnchor='middle' fontSize='11' fill={ink}>≈ 2 V</text>
    <path d={`M${x0 + 5 * bw} 420H${x0 + 6 * bw}`} stroke={ink} strokeWidth='1.2' markerStart='url(#can-arrow)' markerEnd='url(#can-arrow)'/>
    <text x={x0 + 5.5 * bw} y='440' textAnchor='middle' fontSize='11.5' fill={ink}>1 bit = 2 µs at 500 kbit/s</text>
    <text x='24' y='462' fontSize='11.5' fill={ink}>Noise that hits both wires cancels in F1: that is why CAN is differential. Decode on the transceiver's RX pin.</text>
  </svg>;
};
