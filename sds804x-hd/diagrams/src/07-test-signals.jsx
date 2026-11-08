export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const x0 = 200, x1 = 730, H = 40;
  const lanes = [
    [86, 'GPIO25', 'PWM, 1 kHz, 25 % at start', 'f and d commands change it'],
    [176, 'GPIO26', 'DAC sine, 100 Hz', '100 steps of 100 µs'],
    [266, 'GPIO27', 'pulse every 10 ms', '50 µs; every 100th: 5 µs'],
    [356, 'GPIO17', 'UART TX, 9600 baud', '"Hello scope n" every 100 ms'],
  ];
  // PWM
  let pwm = `M${x0} ${86 + H}`;
  for (let x = x0; x < x1; x += 80) pwm += `H${x}V86H${x + 20}V${86 + H}`;
  pwm += `H${x1}`;
  // stepped sine
  let sine = `M${x0} ${176 + H / 2}`;
  for (let i = 0; i <= 60; i++) {
    const x = x0 + i * ((x1 - x0) / 60);
    const y = 176 + H / 2 - (H / 2) * Math.sin((2 * Math.PI * i) / 30);
    sine += `V${y.toFixed(1)}H${(x + (x1 - x0) / 60).toFixed(1)}`;
  }
  // pulses with one glitch
  let pul = `M${x0} ${266 + H}`;
  [0, 1, 2, 3, 4].forEach(i => { const x = x0 + 20 + i * 110; const w = i === 3 ? 3 : 22; pul += `H${x}V266H${x + w}V${266 + H}`; });
  pul += `H${x1}`;
  // UART: idle high, start bit low, data bits
  const bits = [0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1];
  let uart = `M${x0} 356`;
  let x = x0 + 20;
  uart += `H${x}`;
  bits.forEach(b => { uart += `V${b ? 356 : 356 + H}H${x + 20}`; x += 20; });
  uart += `V356H${x1}`;
  return <svg viewBox='0 0 760 462' role='img' aria-label='Test signals from the ESP32 sketch' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Test signals from scope_signals.ino</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Four outputs at once; probe the jumper wires, ground clips on the GND wire. Not to scale.</text>
    {lanes.map(([y, pin, a, b]) => <g key={pin}>
      <rect x='24' y={y - 2} width='160' height={H + 6} rx='4' fill={tint}/>
      <text x='32' y={y + 14} fontWeight='600' fill={ink}>{pin}</text>
      <text x='32' y={y + 29} fontSize='11' fill={ink}>{a}</text>
      <line x1={x0} x2={x1} y1={y + H} y2={y + H} stroke={rule} strokeWidth='0.8' strokeDasharray='3 3'/>
      <text x='32' y={y + 56} fontSize='11' fill={quiet}>{b}</text>
    </g>)}
    <g fill='none' stroke={ink} strokeWidth='2'>
      <path d={pwm}/>
      <path d={sine}/>
      <path d={pul}/>
      <path d={uart}/>
    </g>
    <text x={x0 + 20 + 3 * 110 + 10} y='260' fontSize='11.5' fontWeight='600' fill={ink}>glitch</text>
    <text x={x0 + 30} y='350' fontSize='11' fill={quiet}>start bit</text>
    <text x='24' y='450' fontSize='11.5' fill={ink}>All outputs swing between 0 V and 3.3 V; the DAC sine between about 0.4 V and 2.9 V.</text>
  </svg>;
};
