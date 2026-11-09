export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const hi = 130, lo = 170;
  const burst = (x0, n) => {
    let d = '', x = x0;
    const pattern = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1];
    for (let i = 0; i < n; i++) { const b = pattern[i % pattern.length]; d += `H${x}V${b ? hi : lo}`; x += 8; }
    return { d: d + `H${x}V${hi}`, end: x };
  };
  const a = burst(80, 34), b = burst(a.end + 130, 26);
  const wave = `M30 ${hi}` + a.d + b.d + `H730`;
  return <svg viewBox='0 0 760 340' role='img' aria-label='Half-duplex timing on the DATA line' fontSize='13'>
    <defs><marker id='dx-tm-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Half-duplex timing on the DATA line</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>One wire, two speakers taking turns. Idle is high; each byte starts with a low start bit. Not to scale</text>
    <rect x='80' y='118' width={a.end - 80} height='64' fill={tint}/>
    <rect x={a.end + 130} y='118' width={b.end - a.end - 130} height='64' fill={tint}/>
    <path d={wave} fill='none' stroke={ink} strokeWidth='2'/>
    <text x={(80 + a.end) / 2} y='104' textAnchor='middle' fontWeight='600' fill={ink}>instruction packet (U2D2)</text>
    <text x={(a.end + 130 + b.end) / 2} y='104' textAnchor='middle' fontWeight='600' fill={ink}>status packet (servo)</text>
    <path d={`M${a.end} 214H${a.end + 130}`} stroke={ink} strokeWidth='1.2' markerStart='url(#dx-tm-arrow)' markerEnd='url(#dx-tm-arrow)'/>
    <line x1={a.end} x2={a.end} y1='186' y2='220' stroke={ink} strokeWidth='0.8' strokeDasharray='2 2'/>
    <line x1={a.end + 130} x2={a.end + 130} y1='186' y2='220' stroke={ink} strokeWidth='0.8' strokeDasharray='2 2'/>
    <text x={a.end + 65} y='238' textAnchor='middle' fontSize='11.5' fill={ink}>Return Delay Time</text>
    <text x={a.end + 65} y='254' textAnchor='middle' fontSize='11' fill={quiet}>250 × 2 µs = 500 µs by default</text>
    <text x='24' y='292' fontSize='11.5' fill={ink}>On the scope: probe the TTL DATA test point, trigger on a falling edge, decode UART 8N1, idle high, at the bus baud rate.</text>
    <text x='24' y='312' fontSize='11.5' fill={ink}>Measure the gap with X cursors; set Return Delay Time to 0 and measure again.</text>
  </svg>;
};
