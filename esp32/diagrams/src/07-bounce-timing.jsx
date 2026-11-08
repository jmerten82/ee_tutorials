export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const X = t => 170 + t * 8;
  const H = 34;
  const wave = (top, edges) => {
    let lv = 1;
    let d = `M${X(0)} ${top}`;
    edges.forEach(t => { lv = 1 - lv; d += `H${X(t)}V${lv ? top : top + H}`; });
    return d + `H${X(65)}`;
  };
  const real = [4, 5.2, 6.2, 7.4, 8.2, 9, 9.8, 38, 38.8, 39.8, 40.4, 41.2];
  const falls = [4, 6.2, 8.2, 9.8, 38.8, 40.4];
  const lanes = [
    [96, 'Ideal contact', 'what the switch should do'],
    [176, 'Real pin', 'GPIO33, what it sees'],
    [256, 'Naive counter', 'every falling edge'],
    [336, 'Debounced state', 'stable for 20 ms first'],
  ];
  return <svg viewBox='0 0 760 476' role='img' aria-label='Contact bounce: one press looks like several' fontSize='13'>
    <defs><marker id='bnc-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Contact bounce: one press looks like several</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Button from GPIO33 to GND with INPUT_PULLUP: released reads HIGH (3.3 V), pressed reads LOW (0 V)</text>
    <g stroke={rule} strokeWidth='1' strokeDasharray='4 4'>
      <line x1={X(4)} x2={X(4)} y1='88' y2='400'/>
      <line x1={X(38)} x2={X(38)} y1='88' y2='400'/>
    </g>
    <text x={X(4)} y='70' textAnchor='middle' fontWeight='600' fill={ink}>press</text>
    <path d={`M${X(4)} 74V86`} stroke={ink} strokeWidth='1.5' markerEnd='url(#bnc-arrow)'/>
    <text x={X(38)} y='70' textAnchor='middle' fontWeight='600' fill={ink}>release</text>
    <path d={`M${X(38)} 74V86`} stroke={ink} strokeWidth='1.5' markerEnd='url(#bnc-arrow)'/>
    {lanes.map(([top, a, b]) => <g key={a}>
      <text x='24' y={top + 14} fontWeight='600' fill={ink}>{a}</text>
      <text x='24' y={top + 31} fontSize='11.5' fill={quiet}>{b}</text>
    </g>)}
    <rect x={X(9.8)} y='332' width={X(29.8) - X(9.8)} height='42' fill={tint}/>
    <rect x={X(41.2)} y='332' width={X(61.2) - X(41.2)} height='42' fill={tint}/>
    <text x={(X(9.8) + X(29.8)) / 2} y='358' textAnchor='middle' fontSize='11.5' fill={ink}>stable 20 ms</text>
    <text x={(X(41.2) + X(61.2)) / 2} y='358' textAnchor='middle' fontSize='11.5' fill={ink}>stable 20 ms</text>
    <g fill='none' stroke={ink} strokeWidth='2'>
      <path d={wave(96, [4, 38])}/>
      <path d={wave(176, real)}/>
      <path d={wave(336, [29.8, 61.2])}/>
    </g>
    <text x={X(65) + 6} y='100' fontSize='11.5' fill={quiet}>3.3 V</text>
    <text x={X(65) + 6} y='134' fontSize='11.5' fill={quiet}>0 V</text>
    <text x={X(11)} y='168' fontSize='11.5' fill={quiet}>bounce ≈ 6 ms</text>
    <text x={X(42.5)} y='168' fontSize='11.5' fill={quiet}>≈ 3 ms</text>
    <line x1={X(0)} x2={X(65)} y1='290' y2='290' stroke={rule} strokeWidth='1'/>
    {falls.map(t => <line key={t} x1={X(t)} x2={X(t)} y1='290' y2='262' stroke={ink} strokeWidth='2'/>)}
    <text x={X(11)} y='282' fontSize='11.5' fill={ink}>4 edges</text>
    <text x={X(42.5)} y='282' fontSize='11.5' fill={ink}>2 edges</text>
    <text x={X(50)} y='270' fontWeight='600' fill={ink}>Total: 6 presses</text>
    <text x={X(50)} y='287' fontSize='11.5' fill={quiet}>for one real press</text>
    <text x={X(29.8) - 6} y='326' textAnchor='end' fontSize='11.5' fill={ink}>falls at 30 ms</text>
    <line x1={X(0)} x2={X(65)} y1='400' y2='400' stroke={ink} strokeWidth='1.5'/>
    {[0, 10, 20, 30, 40, 50, 60].map(t => <g key={t}>
      <line x1={X(t)} x2={X(t)} y1='400' y2='406' stroke={ink} strokeWidth='1.5'/>
      <text x={X(t)} y='421' textAnchor='middle' fontSize='11.5' fill={ink}>{t}</text>
    </g>)}
    <text x={X(65)} y='440' textAnchor='end' fontSize='11.5' fill={quiet}>time (ms)</text>
    <text x='24' y='462' fontSize='11.5' fill={quiet}>Debounce rule: accept a new level only after it has stayed the same for 20 ms.</text>
  </svg>;
};
