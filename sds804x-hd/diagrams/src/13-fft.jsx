export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  // harmonic amplitudes of a pulse train with duty D: |sin(pi n D)| / (pi n) normalised to n = 1
  const amp = (n, D) => Math.abs(Math.sin(Math.PI * n * D)) / n / Math.abs(Math.sin(Math.PI * D));
  const spectrum = (ox, oy, D, title) => {
    const W = 300, Hh = 110;
    const bars = [];
    for (let n = 1; n <= 12; n++) {
      const a = amp(n, D);
      const x = ox + n * (W / 13);
      if (a < 0.01) bars.push(<g key={n}><circle cx={x} cy={oy} r='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/></g>);
      else bars.push(<line key={n} x1={x} x2={x} y1={oy} y2={oy - Hh * a} stroke={ink} strokeWidth='5'/>);
      bars.push(<text key={'t' + n} x={x} y={oy + 16} textAnchor='middle' fontSize='10.5' fill={ink}>{n}</text>);
    }
    return <g>
      <text x={ox} y={oy - Hh - 18} fontWeight='600' fill={ink}>{title}</text>
      <line x1={ox} x2={ox + W} y1={oy} y2={oy} stroke={ink} strokeWidth='1.5'/>
      {bars}
      <text x={ox + W} y={oy + 32} textAnchor='end' fontSize='11' fill={quiet}>frequency (kHz, for 1 kHz PWM)</text>
    </g>;
  };
  const wave = (ox, oy, D) => {
    let d = `M${ox} ${oy}`;
    for (let c = 0; c < 4; c++) { const x = ox + c * 60; d += `H${x}V${oy - 50}H${x + 60 * D}V${oy}`; }
    return <path d={d + `H${ox + 240}`} fill='none' stroke={ink} strokeWidth='2'/>;
  };
  return <svg viewBox='0 0 760 486' role='img' aria-label='A square wave and its spectrum' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>A pulse wave and its spectrum (FFT)</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Linear amplitude, fundamental = 1. On the scope the FFT axis is usually in dB: 1/3 = −9.5 dB, 1/5 = −14 dB</text>
    {wave(40, 170, 0.5)}
    <text x='40' y='196' fontSize='11.5' fill={ink}>50 % duty</text>
    {spectrum(380, 200, 0.5, 'Odd harmonics only: 1, 1/3, 1/5, 1/7 …')}
    {wave(40, 380, 0.25)}
    <text x='40' y='406' fontSize='11.5' fill={ink}>25 % duty</text>
    {spectrum(380, 410, 0.25, 'Every 4th harmonic missing (4, 8, 12)')}
    <text x='24' y='474' fontSize='11.5' fill={ink}>Open circles: harmonics that are absent. A pulse of 1/n duty has no harmonics at multiples of n.</text>
  </svg>;
};
