export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const probe = (x, y, label) => <g>
    <path d={`M${x} ${y}L${x - 8} ${y - 22}L${x + 8} ${y - 22}z`} fill={ink}/>
    <text x={x} y={y - 28} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{label}</text>
  </g>;
  const clip = (x, y) => <g><path d={`M${x - 6} ${y}h12v10h-12z`} fill={ink}/></g>;
  const shunt = (x, y, vertical) => vertical
    ? <rect x={x - 8} y={y} width='16' height='40' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    : <rect x={x} y={y - 8} width='50' height='16' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>;
  return <svg viewBox='0 0 760 470' role='img' aria-label='Low-side and high-side current shunts' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Measuring current with a shunt</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>I = V / R. With 1 Ω, 1 mV = 1 mA. The scope's probe grounds are all earth, which decides where the shunt goes</text>
    <line x1='380' x2='380' y1='70' y2='420' stroke={rule} strokeWidth='1'/>
    <text x='24' y='90' fontWeight='600' fill={ink}>Low side: one probe</text>
    <rect x='40' y='120' width='90' height='170' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='85' y='206' textAnchor='middle' fontWeight='600' fill={ink}>Supply</text>
    <text x='122' y='140' textAnchor='end' fontSize='11.5' fill={ink}>+</text>
    <text x='122' y='282' textAnchor='end' fontSize='11.5' fill={ink}>−</text>
    <rect x='230' y='120' width='110' height='170' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='285' y='206' textAnchor='middle' fontWeight='600' fill={ink}>Circuit</text>
    <text x='238' y='282' fontSize='11.5' fill={ink}>GND</text>
    <path d='M130 136H230' stroke={ink} strokeWidth='1.5'/>
    <path d='M130 276H150' stroke={ink} strokeWidth='1.5'/>
    {shunt(150, 276, false)}
    <path d='M200 276H230' stroke={ink} strokeWidth='1.5'/>
    <text x='175' y='304' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>R shunt</text>
    <circle cx='215' cy='276' r='3.5' fill={ink}/>
    {probe(215, 272, 'CH1')}
    <circle cx='140' cy='276' r='3.5' fill={ink}/>
    <path d='M140 276V330' stroke={ink} strokeWidth='1.5' strokeDasharray='4 3'/>
    {clip(140, 330)}
    <text x='156' y='340' fontSize='11.5' fill={ink}>ground clip: supply side</text>
    <text x='24' y='376' fontSize='11.5' fill={ink}>CH1 reads −I × R (invert it). Simple, but any other</text>
    <text x='24' y='392' fontSize='11.5' fill={ink}>ground clip on the circuit's GND shorts the shunt</text>
    <text x='24' y='408' fontSize='11.5' fill={ink}>through earth.</text>
    <text x='404' y='90' fontWeight='600' fill={ink}>High side: two probes and math</text>
    <rect x='420' y='120' width='90' height='170' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='465' y='206' textAnchor='middle' fontWeight='600' fill={ink}>Supply</text>
    <text x='502' y='140' textAnchor='end' fontSize='11.5' fill={ink}>+</text>
    <text x='502' y='282' textAnchor='end' fontSize='11.5' fill={ink}>−</text>
    <rect x='620' y='120' width='110' height='170' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='675' y='206' textAnchor='middle' fontWeight='600' fill={ink}>Circuit</text>
    <text x='628' y='282' fontSize='11.5' fill={ink}>GND</text>
    <path d='M510 136H540' stroke={ink} strokeWidth='1.5'/>
    {shunt(540, 136, false)}
    <path d='M590 136H620' stroke={ink} strokeWidth='1.5'/>
    <circle cx='528' cy='136' r='3.5' fill={ink}/>
    <circle cx='604' cy='136' r='3.5' fill={ink}/>
    {probe(528, 132, 'CH1')}
    {probe(604, 132, 'CH2')}
    <text x='565' y='164' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>R shunt</text>
    <path d='M510 276H620' stroke={ink} strokeWidth='1.5'/>
    <circle cx='565' cy='276' r='3.5' fill={ink}/>
    <path d='M565 276V330' stroke={ink} strokeWidth='1.5' strokeDasharray='4 3'/>
    {clip(565, 330)}
    <text x='581' y='340' fontSize='11.5' fill={ink}>both ground clips on GND</text>
    <text x='404' y='376' fontSize='11.5' fill={ink}>Math F1 = C1 − C2 = I × R. Ground stays ground for</text>
    <text x='404' y='392' fontSize='11.5' fill={ink}>every probe. Zero F1 with the load unplugged; set both</text>
    <text x='404' y='408' fontSize='11.5' fill={ink}>channels to the same small V/div with offset −5 V.</text>
    <rect x='24' y='428' width='712' height='30' rx='6' fill={tint}/>
    <text x='380' y='448' textAnchor='middle' fontSize='11.5' fill={ink}>Lesson 6 uses the high side: a 1 Ω shunt in the VBUS wire of a USB lead.</text>
  </svg>;
};
