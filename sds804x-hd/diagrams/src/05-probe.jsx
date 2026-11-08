export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const res = (x, y, label, sub) => <g>
    <rect x={x} y={y - 8} width='44' height='16' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={x + 22} y={y + 24} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{label}</text>
    {sub ? <text x={x + 22} y={y + 26} textAnchor='middle' fontSize='11' fill={quiet}>{sub}</text> : null}
  </g>;
  const cap = (x, y, label, vertical) => vertical
    ? <g stroke={ink} strokeWidth='2'><line x1={x - 12} x2={x + 12} y1={y - 4} y2={y - 4}/><line x1={x - 12} x2={x + 12} y1={y + 4} y2={y + 4}/></g>
    : <g stroke={ink} strokeWidth='2'><line x1={x - 4} x2={x - 4} y1={y - 12} y2={y + 12}/><line x1={x + 4} x2={x + 4} y1={y - 12} y2={y + 12}/></g>;
  const gnd = (x, y) => <g stroke={ink} strokeWidth='1.5'><line x1={x - 10} x2={x + 10} y1={y} y2={y}/><line x1={x - 6} x2={x + 6} y1={y + 5} y2={y + 5}/><line x1={x - 2} x2={x + 2} y1={y + 10} y2={y + 10}/></g>;
  return <svg viewBox='0 0 760 470' role='img' aria-label='The 10x passive probe and its equivalent circuit' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The 10× passive probe</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>A 9 MΩ tip resistor and the scope's 1 MΩ input form a 10 : 1 divider; a trimmer matches the capacitances</text>
    <path d='M40 130L70 124L70 136z' fill={ink}/>
    <rect x='70' y='116' width='40' height='28' rx='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='90' y='108' textAnchor='middle' fontSize='11' fill={ink}>hook tip</text>
    <rect x='110' y='112' width='170' height='36' rx='10' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <rect x='164' y='120' width='52' height='16' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.2'/>
    <text x='190' y='132' textAnchor='middle' fontSize='10' fill={ink}>1× 10×</text>
    <text x='195' y='104' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>switch: keep on 10×</text>
    <path d='M130 148C130 190 100 196 70 200' fill='none' stroke={ink} strokeWidth='2'/>
    <path d='M58 194L74 194L74 208L58 208z' fill={ink}/>
    <text x='54' y='226' fontSize='11.5' fill={ink}>ground lead + clip (about 15 cm)</text>
    <path d='M280 130H560' fill='none' stroke={ink} strokeWidth='3'/>
    <text x='420' y='120' textAnchor='middle' fontSize='11.5' fill={quiet}>coaxial cable, about 1.2 m</text>
    <rect x='560' y='114' width='60' height='32' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <circle cx='590' cy='130' r='5' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <line x1='587' x2='593' y1='130' y2='130' stroke={ink} strokeWidth='1.5'/>
    <text x='590' y='164' textAnchor='middle' fontSize='11' fill={ink}>trimmer (here or in the</text>
    <text x='590' y='178' textAnchor='middle' fontSize='11' fill={ink}>probe body)</text>
    <rect x='620' y='118' width='34' height='24' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='637' y='108' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>BNC</text>
    <g>
      <circle cx='330' cy='210' r='10' fill='none' stroke={ink} strokeWidth='1.5'/>
      <path d='M322 204C326 200 334 200 338 204M322 210C326 206 334 206 338 210M322 216C326 212 334 212 338 216' fill='none' stroke={ink} strokeWidth='1.2'/>
      <text x='348' y='206' fontSize='11.5' fontWeight='600' fill={ink}>ground spring</text>
      <text x='348' y='221' fontSize='11.5' fill={quiet}>replaces the lead for fast edges (Lesson 5)</text>
    </g>
    <rect x='24' y='252' width='712' height='1' fill={rule}/>
    <text x='24' y='282' fontWeight='600' fill={ink}>Equivalent circuit at 10×</text>
    <path d='M60 350H120' stroke={ink} strokeWidth='1.5'/>
    <circle cx='60' cy='350' r='4' fill={ink}/>
    <text x='60' y='336' textAnchor='middle' fontSize='11.5' fill={ink}>tip</text>
    {res(120, 350, '9 MΩ', null)}
    <path d='M110 350V316H142' stroke={ink} strokeWidth='1.5' fill='none'/>
    <path d='M150 316H176V350' stroke={ink} strokeWidth='1.5' fill='none'/>
    {cap(146, 316, '', false)}
    <text x='146' y='300' textAnchor='middle' fontSize='11' fill={quiet}>tip C</text>
    <path d='M164 350H420' stroke={ink} strokeWidth='1.5'/>
    <text x='300' y='340' textAnchor='middle' fontSize='11.5' fill={quiet}>cable capacitance</text>
    <path d='M300 350V372' stroke={ink} strokeWidth='1.5'/>
    {cap(300, 376, '', true)}
    <path d='M300 380V400' stroke={ink} strokeWidth='1.5'/>
    {gnd(300, 400)}
    <path d='M380 350V372' stroke={ink} strokeWidth='1.5'/>
    {cap(380, 376, '', true)}
    <path d='M380 380V400' stroke={ink} strokeWidth='1.5'/>
    {gnd(380, 400)}
    <text x='394' y='380' fontSize='11.5' fill={ink}>trimmer</text>
    <rect x='440' y='300' width='190' height='120' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='535' y='320' textAnchor='middle' fontWeight='600' fill={ink}>Scope input</text>
    <path d='M420 350H480' stroke={ink} strokeWidth='1.5'/>
    <path d='M480 350V362' stroke={ink} strokeWidth='1.5'/>
    <rect x='472' y='362' width='16' height='34' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <path d='M480 396V404' stroke={ink} strokeWidth='1.5'/>
    {gnd(480, 404)}
    <text x='496' y='378' fontSize='11.5' fill={ink}>1 MΩ</text>
    <path d='M480 350H560V372' stroke={ink} strokeWidth='1.5' fill='none'/>
    {cap(560, 376, '', true)}
    <path d='M560 380V404' stroke={ink} strokeWidth='1.5'/>
    {gnd(560, 404)}
    <text x='576' y='378' fontSize='11.5' fill={ink}>17 pF</text>
    <text x='24' y='452' fontSize='11.5' fill={ink}>9 MΩ + 1 MΩ = 10 : 1. Correctly compensated, the divider is 10 : 1 at every frequency, and the circuit sees about 10 MΩ.</text>
  </svg>;
};
