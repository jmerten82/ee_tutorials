export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const gnd = (x, y) => <g stroke={ink} strokeWidth='1.5'><line x1={x - 12} x2={x + 12} y1={y} y2={y}/><line x1={x - 8} x2={x + 8} y1={y + 5} y2={y + 5}/><line x1={x - 4} x2={x + 4} y1={y + 10} y2={y + 10}/></g>;
  const probe = (x, y, label, left) => <g>
    <path d={`M${x} ${y}L${x + (left ? -22 : 22)} ${y - 8}L${x + (left ? -22 : 22)} ${y + 8}z`} fill={ink}/>
    <text x={x + (left ? -28 : 28)} y={y + 4} textAnchor={left ? 'end' : 'start'} fontSize='11.5' fontWeight='600' fill={ink}>{label}</text>
  </g>;
  // waveforms on the right
  const wx = 440;
  const wf = (oy, kind) => {
    if (kind === 'gate') return `M${wx} ${oy - 30}H${wx + 80}V${oy}H${wx + 280}`;
    if (kind === 'diode') return `M${wx} ${oy}H${wx + 82}L${wx + 86} ${oy - 34}H${wx + 280}`;
    return `M${wx} ${oy}H${wx + 82}L${wx + 86} ${oy - 70}H${wx + 120}L${wx + 128} ${oy - 34}H${wx + 280}`;
  };
  return <svg viewBox='0 0 760 470' role='img' aria-label='Where to probe the MOSFET driver' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Where to probe the MOSFET driver</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The ESP32 course circuit with a 0.1 Ω shunt added under the source. All ground clips on GND</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'>
      <path d='M200 90H320V130'/>
      <path d='M200 90V120'/>
      <path d='M200 170V220'/>
      <path d='M200 104H260V124'/>
      <path d='M260 144V196H200'/>
      <path d='M60 250H100'/>
      <path d='M140 250H178'/>
      <path d='M200 280V300'/>
      <path d='M200 340V380'/>
      <path d='M320 180V380H40'/>
    </g>
    <circle cx='200' cy='145' r='22' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='200' y='150' textAnchor='middle' fontWeight='600' fill={ink}>M</text>
    <polygon points='248,144 272,144 260,124' fill='none' stroke={ink} strokeWidth='1.5'/>
    <line x1='246' x2='274' y1='122' y2='122' stroke={ink} strokeWidth='2.5'/>
    <text x='280' y='118' fontSize='11.5' fill={ink}>D1</text>
    <rect x='290' y='130' width='60' height='50' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='320' y='160' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>12 V</text>
    <rect x='100' y='242' width='40' height='16' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='120' y='234' textAnchor='middle' fontSize='11.5' fill={ink}>R1 100 Ω</text>
    <text x='56' y='254' textAnchor='end' fontSize='11.5' fill={ink}>GPIO19</text>
    <g stroke={ink} fill='none'>
      <line x1='178' x2='178' y1='226' y2='274' strokeWidth='2'/>
      <line x1='188' x2='188' y1='222' y2='278' strokeWidth='2.5'/>
      <path d='M188 230H200V220M188 270H200V280' strokeWidth='1.5'/>
    </g>
    <text x='206' y='256' fontSize='11.5' fill={ink}>Q1</text>
    <rect x='192' y='300' width='16' height='40' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='214' y='324' fontSize='11.5' fill={ink}>0.1 Ω shunt</text>
    {gnd(180, 380)}
    {dot(160, 250)}{dot(200, 210)}{dot(200, 290)}
    {probe(160, 250, '', false)}
    <text x='150' y='286' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>CH1 gate</text>
    <path d='M160 250V272' stroke={ink} strokeWidth='1' strokeDasharray='3 2'/>
    {probe(200, 210, 'CH2 drain', true)}
    {probe(200, 290, 'CH3 current', false)}
    <text x={wx} y='92' fontWeight='600' fill={ink}>At turn-off</text>
    <text x={wx} y='126' fontSize='11.5' fill={ink}>CH1 gate</text>
    <path d={wf(170, 'gate')} fill='none' stroke={ink} strokeWidth='2'/>
    <text x={wx} y='206' fontSize='11.5' fill={ink}>CH2 drain, with D1: clamped near 12.5 V</text>
    <path d={wf(270, 'diode')} fill='none' stroke={ink} strokeWidth='2'/>
    <text x={wx} y='306' fontSize='11.5' fill={ink}>CH2 drain, without D1: a spike, flat-topped</text>
    <text x={wx} y='322' fontSize='11.5' fill={ink}>at the MOSFET's breakdown voltage</text>
    <path d={wf(410, 'none')} fill='none' stroke={ink} strokeWidth='2'/>
    <line x1={wx} x2={wx + 280} y1='376' y2='376' stroke={rule} strokeWidth='1' strokeDasharray='4 4'/>
    <text x={wx + 284} y='380' fontSize='11' fill={quiet}>12 V</text>
    <text x='24' y='452' fontSize='11.5' fill={ink}>CH3 shows the shunt voltage: 10 mA per mV. Remove D1 only for single switching events, and put it back at once.</text>
  </svg>;
};
