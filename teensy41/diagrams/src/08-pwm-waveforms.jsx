// PWM: duty cycle sets the average voltage; frequency and resolution are separate knobs.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const x0 = 220, per = 108, n = 4;
  const wave = (duty, yH, yL) => {
    let d = `M${x0} ${yL}`;
    for (let k = 0; k < n; k++) { const s = x0 + k * per; d += `H${s}V${yH}H${s + duty * per}V${yL}`; }
    return d + `H${x0 + n * per}`;
  };
  const rows = [
    { duty: 0.1, call: 'analogWrite(pin, 26)', avg: '0.33 V' },
    { duty: 0.5, call: 'analogWrite(pin, 128)', avg: '1.65 V' },
    { duty: 0.9, call: 'analogWrite(pin, 230)', avg: '2.97 V' },
  ];
  return <svg viewBox='0 0 760 470' role='img' aria-label='PWM duty cycle and average voltage' fontSize='13'>
    <defs><marker id='pw-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>PWM: the pin is only ever 0 V or 3.3 V; the duty cycle sets the average</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Default 8-bit resolution (0–255); default frequency about 4.48 kHz, so one period is about 223 µs</text>
    {rows.map((r, i) => {
      const yH = 90 + i * 100, yL = yH + 50, avgY = yL - r.duty * 50;
      return <g key={'r' + i}>
        <text x='24' y={yH + 18} fontWeight='600' fill={ink}>{Math.round(r.duty * 100)} % duty</text>
        <text x='24' y={yH + 36} fontSize='11.5' fill={quiet}>{r.call}</text>
        <text x={x0 - 8} y={yH + 4} textAnchor='end' fontSize='11.5' fill={ink}>3.3 V</text>
        <text x={x0 - 8} y={yL + 4} textAnchor='end' fontSize='11.5' fill={ink}>0 V</text>
        <path d={wave(r.duty, yH, yL)} fill='none' stroke={ink} strokeWidth='2'/>
        <path d={`M${x0} ${avgY}H${x0 + n * per}`} stroke={ink} strokeWidth='1.4' strokeDasharray='6 4'/>
        <text x={x0 + n * per + 8} y={avgY + 4} fontSize='11.5' fontWeight='600' fill={ink}>{'avg ' + r.avg}</text>
      </g>;
    })}
    <path d={`M${x0} 384H${x0 + per}`} stroke={ink} strokeWidth='1.2' markerStart='url(#pw-arrow)' markerEnd='url(#pw-arrow)'/>
    <text x={x0 + per / 2} y='402' textAnchor='middle' fontSize='11.5' fill={ink}>one period T = 1 / f</text>
    <path d={`M${x0 + per} 384H${x0 + per * 1.5}`} stroke={ink} strokeWidth='1.2' markerStart='url(#pw-arrow)' markerEnd='url(#pw-arrow)'/>
    <text x={x0 + per * 1.25} y='376' textAnchor='middle' fontSize='11.5' fill={ink}>on time</text>
    <text x='420' y='384' fontSize='11.5' fill={ink}>average = 3.3 V × value / 255</text>
    <text x='420' y='402' fontSize='11.5' fill={quiet}>an LED or motor responds to the average</text>
    <text x='24' y='436' fontSize='11.5' fill={ink}>analogWriteFrequency(pin, 20000) moves the switching above hearing (quieter motors, no LED flicker on camera).</text>
    <text x='24' y='454' fontSize='11.5' fill={ink}>analogWriteResolution(12) gives 0–4095; the faster the frequency, the fewer real steps are left.</text>
  </svg>;
};
