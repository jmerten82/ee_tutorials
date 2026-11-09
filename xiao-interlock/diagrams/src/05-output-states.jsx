export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const phases = [
    [60, 140, 'power off', 'no supply'],
    [140, 240, 'boot', 'pins are inputs'],
    [240, 400, 'running SAFE / ARMED', 'sketch drives LOW'],
    [400, 450, 'FIRING', 'HIGH'],
    [450, 540, 'ARMED', 'LOW'],
    [540, 640, 'upload or reset', 'pins are inputs'],
    [640, 730, 'running', 'LOW'],
  ];
  const yPin = 210, yGate = 300;
  return <svg viewBox='0 0 760 420' role='img' aria-label='The fire output stays off in every phase except FIRING' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>A fail-safe output: off unless the sketch says FIRING</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>D2 → 330 Ω → module input, 10 kΩ from the input to GND. The resistor holds the gate low when nothing drives it</text>
    {phases.map(([a, b, t, s], i) => <g key={t + a}>
      <rect x={a} y='80' width={b - a} height='56' fill={i === 3 ? ink : i % 2 ? tint : '#ffffff'} stroke={ink} strokeWidth='1'/>
      <text x={(a + b) / 2} y='103' textAnchor='middle' fontSize='11' fontWeight='600' fill={i === 3 ? '#ffffff' : ink}>{t}</text>
      <text x={(a + b) / 2} y='122' textAnchor='middle' fontSize='10.5' fill={i === 3 ? '#ffffff' : quiet}>{s}</text>
    </g>)}
    <text x='52' y={yPin - 30} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>D2 pin</text>
    <path d={`M60 ${yPin}H140`} stroke={ink} strokeWidth='2'/>
    <path d={`M140 ${yPin - 20}H240`} stroke={ink} strokeWidth='2' strokeDasharray='4 4'/>
    <text x='190' y={yPin - 28} textAnchor='middle' fontSize='10.5' fill={quiet}>floating</text>
    <path d={`M240 ${yPin}H400V${yPin - 40}H450V${yPin}H540`} fill='none' stroke={ink} strokeWidth='2'/>
    <path d={`M540 ${yPin - 20}H640`} stroke={ink} strokeWidth='2' strokeDasharray='4 4'/>
    <text x='590' y={yPin - 28} textAnchor='middle' fontSize='10.5' fill={quiet}>floating</text>
    <path d={`M640 ${yPin}H730`} stroke={ink} strokeWidth='2'/>
    <text x='52' y={yGate - 30} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>gate</text>
    <text x='52' y={yGate - 16} textAnchor='end' fontSize='10.5' fill={quiet}>with</text>
    <text x='52' y={yGate - 4} textAnchor='end' fontSize='10.5' fill={quiet}>10 kΩ</text>
    <path d={`M60 ${yGate}H400V${yGate - 40}H450V${yGate}H730`} fill='none' stroke={ink} strokeWidth='2.5'/>
    <line x1='60' x2='730' y1={yGate + 1} y2={yGate + 1} stroke={rule} strokeWidth='0.8'/>
    <text x='425' y={yGate + 20} textAnchor='middle' fontSize='11' fill={ink}>the only pulse</text>
    <text x='24' y='360' fontSize='11.5' fill={ink}>In code: digitalWrite(FIRE_PIN, LOW) before pinMode(FIRE_PIN, OUTPUT), so the pin never drives HIGH by accident.</text>
    <text x='24' y='378' fontSize='11.5' fill={ink}>Check it on the scope: Normal trigger on the gate, then power-cycle, reset and upload. The scope must stay silent.</text>
    <text x='24' y='404' fontSize='11.5' fill={quiet}>Illustration, not to scale.</text>
  </svg>;
};
