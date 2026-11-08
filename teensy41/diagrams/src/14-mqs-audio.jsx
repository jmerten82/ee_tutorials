// MQS audio out on pins 12 (left) and 10 (right): the software graph and the RC filter to a line input.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const gnd = (x, y) => <path d={`M${x} ${y}V${y + 8}M${x - 11} ${y + 8}H${x + 11}M${x - 7} ${y + 13}H${x + 7}M${x - 3} ${y + 18}H${x + 3}`} fill='none' stroke={ink} strokeWidth='1.5'/>;
  const node = (x, y, w, t1, t2) => <g><rect x={x} y={y} width={w} height='48' rx='5' fill={tint} stroke={ink} strokeWidth='1.5'/><text x={x + w / 2} y={y + 20} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{t1}</text><text x={x + w / 2} y={y + 37} textAnchor='middle' fontSize='11.5' fill={ink}>{t2}</text></g>;
  const chan = (y, pin, side) => <g>
    <rect x='110' y={y - 7} width='14' height='14' fill='#ffffff' stroke={ink} strokeWidth='1.6'/>
    <text x='100' y={y + 4} textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>{'pin ' + pin + ' ' + side}</text>
    <path d={`M124 ${y}H170M230 ${y}H330M370 ${y}H520`} fill='none' stroke={ink} strokeWidth='1.5'/>
    <rect x='170' y={y - 8} width='60' height='16' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='200' y={y - 14} textAnchor='middle' fontSize='11.5' fill={ink}>2.2 kΩ</text>
    {dot(270, y)}
    <path d={`M270 ${y}V${y + 22}M270 ${y + 30}V${y + 44}`} fill='none' stroke={ink} strokeWidth='1.5'/>
    <path d={`M258 ${y + 22}H282M258 ${y + 30}H282`} stroke={ink} strokeWidth='2.4'/>
    <text x='288' y={y + 30} fontSize='11.5' fill={ink}>4.7 nF</text>
    {gnd(270, y + 44)}
    <path d={`M346 ${y - 12}V${y + 12}`} stroke={ink} strokeWidth='2.4'/>
    <path d={`M354 ${y - 12}V${y + 12}`} stroke={ink} strokeWidth='2.4'/>
    <path d={`M330 ${y}H346M354 ${y}H370`} stroke={ink} strokeWidth='1.5'/>
    <text x='336' y={y - 16} fontSize='11.5' fill={ink}>+</text>
    <text x='350' y={y + 30} textAnchor='middle' fontSize='11.5' fill={ink}>10 µF</text>
  </g>;
  return <svg viewBox='0 0 760 470' role='img' aria-label='MQS audio output with RC filter' fontSize='13'>
    <defs><marker id='mq-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Sound without a shield: MQS on pins 12 and 10</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>MQS is a fast pulse stream; a simple RC filter smooths it into an audio signal for an amplifier or powered speakers</text>
    <text x='24' y='82' fontWeight='600' fill={ink}>In the sketch (Audio library)</text>
    {node(24, 96, 150, 'AudioSynthWaveform', 'osc')}
    {node(214, 96, 150, 'AudioEffectEnvelope', 'env')}
    {node(404, 96, 150, 'AudioOutputMQS', 'mqs: in 0 = L, in 1 = R')}
    {['M174 120H212', 'M364 112H402', 'M364 128H402'].map(d => <path key={d} d={d} fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#mq-arrow)'/>)}
    <text x='584' y='112' fontSize='11.5' fill={ink}>AudioMemory(20);</text>
    <text x='584' y='130' fontSize='11.5' fill={quiet}>one AudioConnection</text>
    <text x='584' y='146' fontSize='11.5' fill={quiet}>per arrow</text>
    <path d='M24 172H736' stroke={rule} strokeWidth='1'/>
    <text x='24' y='200' fontWeight='600' fill={ink}>On the breadboard (same for both channels)</text>
    {chan(246, 12, 'L')}
    {chan(356, 10, 'R')}
    <rect x='520' y='220' width='92' height='160' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='566' y='214' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>3.5 mm jack</text>
    <text x='530' y='250' fontSize='11.5' fill={ink}>T</text>
    <text x='530' y='360' fontSize='11.5' fill={ink}>R</text>
    <text x='530' y='310' fontSize='11.5' fill={ink}>S</text>
    <path d='M612 300H640V316' fill='none' stroke={ink} strokeWidth='1.5'/>{gnd(640, 316)}
    <text x='520' y='400' fontSize='11.5' fill={quiet}>tip = left, ring = right,</text>
    <text x='520' y='416' fontSize='11.5' fill={quiet}>sleeve = GND</text>
    <text x='650' y='236' fontSize='11.5' fontWeight='600' fill={ink}>to</text>
    <text x='650' y='252' fontSize='11.5' fill={ink}>powered</text>
    <text x='650' y='268' fontSize='11.5' fill={ink}>speakers</text>
    <text x='650' y='284' fontSize='11.5' fill={ink}>(line in)</text>
    <text x='24' y='444' fontSize='11.5' fill={ink}>2.2 kΩ with 4.7 nF rolls off above ≈ 15 kHz and keeps the pin current under 1.5 mA. 10 µF blocks the 1.65 V DC offset.</text>
    <text x='24' y='462' fontSize='11.5' fill={quiet}>Not for headphones directly: they need more current than a pin can give, and full-scale output is loud. Start with the volume low.</text>
  </svg>;
};
