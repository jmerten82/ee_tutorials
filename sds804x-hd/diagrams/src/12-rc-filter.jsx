export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gnd = (x, y) => <g stroke={ink} strokeWidth='1.5'><line x1={x - 12} x2={x + 12} y1={y} y2={y}/><line x1={x - 8} x2={x + 8} y1={y + 5} y2={y + 5}/><line x1={x - 4} x2={x + 4} y1={y + 10} y2={y + 10}/></g>;
  const probe = (x, y, label) => <g>
    <path d={`M${x} ${y}L${x - 8} ${y - 22}L${x + 8} ${y - 22}z`} fill={ink}/>
    <text x={x} y={y - 28} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{label}</text>
  </g>;
  // waveforms
  let sq = 'M60 330';
  for (let x = 60; x < 340; x += 40) sq += `H${x}V270H${x + 20}V330`;
  sq += 'H340';
  let rip = 'M420 300';
  for (let x = 420; x < 700; x += 40) rip += `L${x + 20} 292L${x + 40} 300`;
  return <svg viewBox='0 0 760 420' role='img' aria-label='An RC low-pass filter turns PWM into a DC level' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>RC low-pass filter: from PWM to DC</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Corner frequency f = 1 / (2π × R × C) = 1 / (2π × 10 kΩ × 1 µF) ≈ 16 Hz</text>
    <rect x='40' y='96' width='110' height='70' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='95' y='124' textAnchor='middle' fontWeight='600' fill={ink}>ESP32</text>
    <text x='142' y='150' textAnchor='end' fontSize='11.5' fill={ink}>GPIO25</text>
    <path d='M150 146H300' stroke={ink} strokeWidth='1.5'/>
    <circle cx='220' cy='146' r='3.5' fill={ink}/>
    {probe(220, 142, 'CH1')}
    <rect x='300' y='138' width='60' height='16' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='330' y='176' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>R 10 kΩ</text>
    <path d='M360 146H520' stroke={ink} strokeWidth='1.5'/>
    <circle cx='440' cy='146' r='3.5' fill={ink}/>
    <text x='452' y='166' fontSize='11.5' fill={ink}>node A</text>
    {probe(500, 142, 'CH2')}
    <circle cx='500' cy='146' r='3.5' fill={ink}/>
    <path d='M440 146V186' stroke={ink} strokeWidth='1.5'/>
    <g stroke={ink} strokeWidth='2'><line x1='428' x2='452' y1='186' y2='186'/><line x1='428' x2='452' y1='194' y2='194'/></g>
    <text x='460' y='194' fontSize='11.5' fontWeight='600' fill={ink}>C 1 µF</text>
    <path d='M440 194V214' stroke={ink} strokeWidth='1.5'/>
    {gnd(440, 214)}
    <path d='M95 166V214' stroke={ink} strokeWidth='1.5'/>
    {gnd(95, 214)}
    <text x='106' y='206' fontSize='11.5' fill={ink}>GND</text>
    <text x='60' y='258' fontWeight='600' fill={ink}>CH1: PWM, 50 %, 1 kHz</text>
    <path d={sq} fill='none' stroke={ink} strokeWidth='2'/>
    <line x1='60' x2='340' y1='300' y2='300' stroke={rule} strokeWidth='1' strokeDasharray='4 4'/>
    <text x='60' y='352' fontSize='11.5' fill={quiet}>0 V to 3.3 V</text>
    <text x='420' y='258' fontWeight='600' fill={ink}>CH2: DC with a small ripple</text>
    <line x1='420' x2='700' y1='330' y2='330' stroke={rule} strokeWidth='1' strokeDasharray='4 4'/>
    <path d={rip} fill='none' stroke={ink} strokeWidth='2'/>
    <text x='420' y='352' fontSize='11.5' fill={quiet}>about 1.65 V = duty × 3.3 V; ripple shown much enlarged</text>
    <text x='24' y='396' fontSize='11.5' fill={ink}>Higher PWM frequency or larger R × C: less ripple, but a slower response when the duty changes.</text>
  </svg>;
};
