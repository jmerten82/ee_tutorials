export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const x0 = 200, W = 420;
  const square = (top, ht, period, pulse) => {
    let d = `M${x0} ${top + ht}`;
    for (let x = x0; x < x0 + W - 0.1; x += period) d += `V${top}H${x + pulse}V${top + ht}H${Math.min(x + period, x0 + W)}`;
    return d;
  };
  const led = [
    [96, 0.1, 26, '0.33 V'],
    [166, 0.5, 128, '1.65 V'],
    [236, 0.9, 230, '2.97 V'],
  ];
  const servo = [
    [384, 1.0, 819, '0°', 180],
    [444, 1.5, 1229, '90°', 90],
    [504, 2.0, 1638, '180°', 0],
  ];
  const P = 140;
  const msX = W / 40;
  const horn = (cx, cy, deg) => {
    const a = (deg * Math.PI) / 180;
    return <g>
      <path d={`M${cx - 18} ${cy}A18 18 0 0 1 ${cx + 18} ${cy}`} fill='none' stroke={rule} strokeWidth='1' strokeDasharray='3 3'/>
      <line x1={cx} y1={cy} x2={(cx + 18 * Math.cos(a)).toFixed(1)} y2={(cy - 18 * Math.sin(a)).toFixed(1)} stroke={ink} strokeWidth='3' strokeLinecap='round'/>
      <circle cx={cx} cy={cy} r='4' fill={ink}/>
    </g>;
  };
  return <svg viewBox='0 0 760 630' role='img' aria-label='PWM: the duty cycle sets the average, the pulse width sets the servo angle' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>PWM: the duty cycle sets the average, the pulse width sets the angle</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The pin only ever switches between 0 V and 3.3 V; what changes is how long it stays high</text>
    <text x='24' y='80' fontWeight='600' fill={ink}>LED dimming: ledcAttach(25, 5000, 8), 5 kHz, values 0–255</text>
    {led.map(([top, duty, val, avg]) => <g key={val}>
      <text x='24' y={top + 14} fontWeight='600' fill={ink}>{`${Math.round(duty * 100)} % duty`}</text>
      <text x='24' y={top + 31} fontSize='11.5' fill={quiet}>{`ledcWrite(25, ${val})`}</text>
      <line x1={x0} x2={x0 + W} y1={top + 40} y2={top + 40} stroke={rule} strokeWidth='1'/>
      <path d={square(top, 40, P, P * duty)} fill='none' stroke={ink} strokeWidth='2'/>
      <line x1={x0} x2={x0 + W + 8} y1={top + 40 - 40 * duty} y2={top + 40 - 40 * duty} stroke={ink} strokeWidth='1.5' strokeDasharray='6 4'/>
      <text x={x0 + W + 14} y={top + 44 - 40 * duty} fontSize='11.5' fill={ink}>{`avg ${avg}`}</text>
    </g>)}
    <line x1={x0} x2={x0 + W} y1='300' y2='300' stroke={ink} strokeWidth='1.5'/>
    {[0, 200, 400, 600].map((t, i) => <g key={t}>
      <line x1={x0 + i * P} x2={x0 + i * P} y1='300' y2='306' stroke={ink} strokeWidth='1.5'/>
      <text x={x0 + i * P} y='321' textAnchor='middle' fontSize='11.5' fill={ink}>{`${t} µs`}</text>
    </g>)}
    <text x='24' y='321' fontSize='11.5' fill={quiet}>one period = 200 µs</text>
    <text x='24' y='364' fontWeight='600' fill={ink}>Servo: ledcAttach(18, 50, 14), 50 Hz, one pulse every 20 ms</text>
    {servo.map(([top, ms, val, ang, deg]) => <g key={val}>
      <text x='24' y={top + 13} fontWeight='600' fill={ink}>{`${ms.toFixed(1)} ms → ${ang}`}</text>
      <text x='24' y={top + 30} fontSize='11.5' fill={quiet}>{`ledcWrite(18, ${val})`}</text>
      <line x1={x0} x2={x0 + W} y1={top + 34} y2={top + 34} stroke={rule} strokeWidth='1'/>
      <path d={square(top, 34, 20 * msX, ms * msX)} fill='none' stroke={ink} strokeWidth='2'/>
      {horn(690, top + 30, deg)}
    </g>)}
    <line x1={x0} x2={x0 + W} y1='552' y2='552' stroke={ink} strokeWidth='1.5'/>
    {[0, 10, 20, 30, 40].map(t => <g key={t}>
      <line x1={x0 + t * msX} x2={x0 + t * msX} y1='552' y2='558' stroke={ink} strokeWidth='1.5'/>
      <text x={x0 + t * msX} y='573' textAnchor='middle' fontSize='11.5' fill={ink}>{`${t} ms`}</text>
    </g>)}
    <text x='24' y='573' fontSize='11.5' fill={quiet}>drawn to scale</text>
    <text x='24' y='600' fontSize='11.5' fill={quiet}>14-bit at 50 Hz: 20 ms = 16384 counts, so 1 ms ≈ 819 and 2 ms ≈ 1638. Many SG90s travel further</text>
    <text x='24' y='617' fontSize='11.5' fill={quiet}>with 0.5–2.5 ms pulses; widen the range a little at a time and stop if the servo buzzes at the end.</text>
  </svg>;
};
