export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gx = 60, gy = 80, dw = 64, dh = 36;
  const grid = [];
  for (let i = 0; i <= 10; i++) grid.push(<line key={'v' + i} x1={gx + i * dw} x2={gx + i * dw} y1={gy} y2={gy + 8 * dh} stroke={rule} strokeWidth={i === 0 || i === 10 ? 1.2 : 0.6} strokeDasharray={i === 0 || i === 10 ? '' : '2 3'}/>);
  for (let j = 0; j <= 8; j++) grid.push(<line key={'h' + j} x1={gx} x2={gx + 10 * dw} y1={gy + j * dh} y2={gy + j * dh} stroke={rule} strokeWidth={j === 0 || j === 8 ? 1.2 : 0.6} strokeDasharray={j === 0 || j === 8 ? '' : '2 3'}/>);
  const hi = gy + 2 * dh, lo = gy + 6 * dh; // 3.3 V at 1 V/div ≈ 3.3 div; drawn schematically
  const X = us => gx + dw + us * (dw / 200); // 200 us/div, trigger one division from the left
  const edges = [0, 18, 40, 70, 95, 140, 170, 230, 255, 330, 345, 520, 538, 610];
  let d = `M${gx} ${hi}`;
  let lvl = hi;
  edges.forEach(t => { lvl = lvl === hi ? lo : hi; d += `H${X(t).toFixed(1)}V${lvl}`; });
  d += `H${gx + 10 * dw}`;
  const c1 = X(0), c2 = X(610);
  return <svg viewBox='0 0 760 470' role='img' aria-label='A button bounce captured with a single trigger' fontSize='13'>
    <defs><marker id='bo-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>A button press, captured with Single</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>CH1 on GPIO33, 1 V/div, 200 µs/div; trigger: Edge, falling, 1.6 V; trigger point one division from the left</text>
    <rect x={gx} y={gy} width={10 * dw} height={8 * dh} fill={tint}/>
    {grid}
    <line x1={gx} x2={gx + 10 * dw} y1={(hi + lo) / 2} y2={(hi + lo) / 2} stroke={ink} strokeWidth='1' strokeDasharray='6 4'/>
    <text x={gx + 10 * dw + 6} y={(hi + lo) / 2 + 4} fontSize='11.5' fill={ink}>1.6 V</text>
    <path d={`M${c1 - 7} ${gy - 12}L${c1} ${gy - 2}L${c1 + 7} ${gy - 12}z`} fill={ink}/>
    <path d={d} fill='none' stroke={ink} strokeWidth='2'/>
    <line x1={c1} x2={c1} y1={gy} y2={gy + 8 * dh} stroke={ink} strokeWidth='1.2' strokeDasharray='8 3'/>
    <line x1={c2} x2={c2} y1={gy} y2={gy + 8 * dh} stroke={ink} strokeWidth='1.2' strokeDasharray='8 3'/>
    <text x={c1 + 4} y={gy + 8 * dh - 8} fontSize='11.5' fontWeight='600' fill={ink}>X1</text>
    <text x={c2 + 4} y={gy + 8 * dh - 8} fontSize='11.5' fontWeight='600' fill={ink}>X2</text>
    <path d={`M${c1} ${gy + 26}H${c2}`} stroke={ink} strokeWidth='1.2' markerStart='url(#bo-arrow)' markerEnd='url(#bo-arrow)'/>
    <text x={(c1 + c2) / 2} y={gy + 20} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>bounce: ΔX ≈ 610 µs</text>
    <text x={gx - 6} y={hi + 4} textAnchor='end' fontSize='11.5' fill={ink}>3.3 V</text>
    <text x={gx - 6} y={lo + 4} textAnchor='end' fontSize='11.5' fill={ink}>0 V</text>
    <text x={gx + 7 * dw} y={lo - 12} fontSize='11.5' fill={ink}>pressed: stays LOW</text>
    <text x={gx} y='400' fontSize='11.5' fill={ink}>Count the edges and measure the bounce time with the X cursors. Repeat for the release (rising slope).</text>
    <text x={gx} y='420' fontSize='11.5' fill={ink}>The debounce time in software must be longer than the longest bounce you measure.</text>
    <text x={gx} y='448' fontSize='11.5' fill={quiet}>Illustration: real bounce lasts from tens of microseconds to several milliseconds.</text>
  </svg>;
};
