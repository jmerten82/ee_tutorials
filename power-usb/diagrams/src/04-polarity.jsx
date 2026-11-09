export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const supply = (x) => <g>
    <rect x={x} y='100' width='50' height='90' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x={x + 25} y='150' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>12 V</text>
    <text x={x + 44} y='116' textAnchor='end' fontSize='11' fill={ink}>+</text>
    <text x={x + 44} y='184' textAnchor='end' fontSize='11' fill={ink}>−</text>
  </g>;
  const load = (x) => <g>
    <rect x={x} y='112' width='44' height='66' rx='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={x + 22} y='149' textAnchor='middle' fontSize='11.5' fill={ink}>load</text>
  </g>;
  const diode = (x, y, dir) => <g>
    <polygon points={dir === 'down' ? `${x - 10},${y - 8} ${x + 10},${y - 8} ${x},${y + 8}` : `${x - 8},${y - 10} ${x - 8},${y + 10} ${x + 8},${y}`} fill='none' stroke={ink} strokeWidth='1.5'/>
    {dir === 'down' ? <line x1={x - 11} x2={x + 11} y1={y + 8} y2={y + 8} stroke={ink} strokeWidth='2.5'/> : <line x1={x + 8} x2={x + 8} y1={y - 11} y2={y + 11} stroke={ink} strokeWidth='2.5'/>}
  </g>;
  return <svg viewBox='0 0 760 340' role='img' aria-label='Three ways to protect against reversed polarity' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Three ways to protect against reversed polarity</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The D36V28F5 has its own reverse protection up to 40 V; most servos, modules and hubs do not</text>
    <line x1='253' x2='253' y1='70' y2='290' stroke={rule}/>
    <line x1='506' x2='506' y1='70' y2='290' stroke={rule}/>
    <text x='24' y='86' fontWeight='600' fill={ink}>Series Schottky diode</text>
    {supply(24)}
    <path d='M74 116H124M140 116H180V120M180 170V176H74' fill='none' stroke={ink} strokeWidth='1.5'/>
    {diode(132, 116, 'right')}
    {load(170)}
    <text x='24' y='224' fontSize='11.5' fill={ink}>Drops about 0.4 V; heat</text>
    <text x='24' y='240' fontSize='11.5' fill={ink}>= 0.4 V × I: 2 W at 5 A.</text>
    <text x='24' y='256' fontSize='11.5' fill={quiet}>Simple and certain.</text>
    <text x='277' y='86' fontWeight='600' fill={ink}>P-channel MOSFET</text>
    {supply(277)}
    <path d='M327 116H360M396 116H433V120M433 170V176H327' fill='none' stroke={ink} strokeWidth='1.5'/>
    <rect x='360' y='104' width='36' height='24' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='378' y='120' textAnchor='middle' fontSize='10' fontWeight='600' fill={ink}>P-FET</text>
    <path d='M378 128V176' fill='none' stroke={ink} strokeWidth='1.2' strokeDasharray='3 2'/>
    <text x='384' y='158' fontSize='10.5' fill={quiet}>gate</text>
    {load(423)}
    <text x='277' y='224' fontSize='11.5' fill={ink}>Correct polarity: gate low,</text>
    <text x='277' y='240' fontSize='11.5' fill={ink}>the MOSFET conducts with a</text>
    <text x='277' y='256' fontSize='11.5' fill={ink}>drop of tens of mV. Reversed: off.</text>
    <text x='277' y='272' fontSize='11.5' fill={quiet}>Add a Zener gate clamp above 12 V.</text>
    <text x='530' y='86' fontWeight='600' fill={ink}>Fuse + crowbar diode</text>
    {supply(530)}
    <rect x='588' y='108' width='30' height='16' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='603' y='138' textAnchor='middle' fontSize='10.5' fill={ink}>fuse</text>
    <path d='M580 116H588M618 116H690V120M690 170V176H580' fill='none' stroke={ink} strokeWidth='1.5'/>
    <path d='M640 116V137M640 155V176' stroke={ink} strokeWidth='1.5'/>
    <polygon points='630,155 650,155 640,139' fill='none' stroke={ink} strokeWidth='1.5'/>
    <line x1='629' x2='651' y1='138' y2='138' stroke={ink} strokeWidth='2.5'/>
    {load(680)}
    <text x='530' y='224' fontSize='11.5' fill={ink}>Reversed: the diode conducts</text>
    <text x='530' y='240' fontSize='11.5' fill={ink}>and the fuse blows. No loss</text>
    <text x='530' y='256' fontSize='11.5' fill={ink}>in normal use; costs a fuse.</text>
    <text x='24' y='316' fontSize='11.5' fill={ink}>Best of all: keyed connectors and a meter check before every first connection.</text>
  </svg>;
};
