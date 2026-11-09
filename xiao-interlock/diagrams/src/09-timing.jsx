export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const X = ms => 160 + ms * 14;   // 0 to 40 ms
  const H = 34;
  const lanes = [
    [90, 'CH1 coil feed', 'E-stop opens', 0],
    [160, 'CH2 fire rail', 'relay releases', 9],
    [230, 'CH4 CHAIN at D7', 'divider, same edge', 0.2],
    [300, 'CH3 module input', 'firmware turns off', 21],
  ];
  return <svg viewBox='0 0 760 460' role='img' aria-label='Timing to measure when the E-stop is pressed during a pulse' fontSize='13'>
    <defs><marker id='xi-tm-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>E-stop during a pulse: what to measure</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Single trigger on CH1 falling. Times are examples; your measurement becomes the reference value</text>
    <line x1={X(0)} x2={X(0)} y1='70' y2='350' stroke={ink} strokeWidth='1' strokeDasharray='6 4'/>
    <text x={X(0)} y='66' textAnchor='middle' fontSize='11' fontWeight='600' fill={ink}>trigger</text>
    {lanes.map(([y, name, note, t]) => <g key={name}>
      <text x='24' y={y + 12} fontSize='12' fontWeight='600' fill={ink}>{name}</text>
      <text x='24' y={y + 28} fontSize='11' fill={quiet}>{note}</text>
      <path d={`M${X(-2)} ${y}H${X(t)}${t > 1 ? `L${X(t) + 14} ${y + H}` : `V${y + H}`}H${X(40)}`} fill='none' stroke={ink} strokeWidth='2'/>
    </g>)}
    <path d={`M${X(0)} 210H${X(9)}`} stroke={ink} strokeWidth='1.2' markerStart='url(#xi-tm-arrow)' markerEnd='url(#xi-tm-arrow)'/>
    <text x={X(4.5)} y='226' textAnchor='middle' fontSize='11' fill={ink}>rail-off time</text>
    <path d={`M${X(0)} 350H${X(21)}`} stroke={ink} strokeWidth='1.2' markerStart='url(#xi-tm-arrow)' markerEnd='url(#xi-tm-arrow)'/>
    <text x={X(10.5)} y='366' textAnchor='middle' fontSize='11' fill={ink}>output-off time: debounce 20 ms + one loop</text>
    {[0, 10, 20, 30, 40].map(t => <text key={t} x={X(t)} y='390' textAnchor='middle' fontSize='11' fill={ink}>{t}</text>)}
    <text x={X(40)} y='406' textAnchor='end' fontSize='11' fill={quiet}>time after the E-stop (ms)</text>
    <text x='24' y='430' fontSize='11.5' fill={ink}>The rail is off before the firmware even notices: the hardware stops the actuator, the firmware only follows.</text>
    <text x='24' y='448' fontSize='11.5' fill={quiet}>The flyback diode makes the relay release more slowly than its 5 ms datasheet value.</text>
  </svg>;
};
