export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const earth = (x, y) => <g stroke={ink} strokeWidth='1.5'>
    <line x1={x} x2={x} y1={y} y2={y + 10}/>
    <line x1={x - 12} x2={x + 12} y1={y + 10} y2={y + 10}/>
    <line x1={x - 8} x2={x + 8} y1={y + 15} y2={y + 15}/>
    <line x1={x - 4} x2={x + 4} y1={y + 20} y2={y + 20}/>
  </g>;
  const panel = (ox, title, sub, good) => <g>
    <text x={ox} y='84' fontWeight='600' fill={ink}>{title}</text>
    <text x={ox} y='101' fontSize='11.5' fill={quiet}>{sub}</text>
    <rect x={ox} y='120' width='120' height='96' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x={ox + 60} y='146' textAnchor='middle' fontWeight='600' fill={ink}>Scope</text>
    <text x={ox + 60} y='163' textAnchor='middle' fontSize='11.5' fill={quiet}>probe ground</text>
    <text x={ox + 60} y='178' textAnchor='middle' fontSize='11.5' fill={quiet}>= BNC shell</text>
    <text x={ox + 60} y='193' textAnchor='middle' fontSize='11.5' fill={quiet}>= earth pin</text>
    <path d={`M${ox + 30} 216V246`} stroke={ink} strokeWidth='1.5'/>
    {earth(ox + 30, 246)}
    <rect x={ox + 200} y='120' width='140' height='130' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={ox + 270} y='140' textAnchor='middle' fontWeight='600' fill={ink}>Circuit</text>
    <circle cx={ox + 220} cy='166' r='4' fill={ink}/>
    <text x={ox + 230} y='170' fontSize='11.5' fill={ink}>+12 V</text>
    <circle cx={ox + 220} cy='226' r='4' fill={ink}/>
    <text x={ox + 230} y='230' fontSize='11.5' fill={ink}>GND</text>
    <rect x={ox + 200} y='290' width='140' height='54' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={ox + 270} y='312' textAnchor='middle' fontWeight='600' fill={ink}>Supply</text>
    <text x={ox + 270} y='330' textAnchor='middle' fontSize='11.5' fill={quiet}>minus may be earthed</text>
    <path d={`M${ox + 310} 250V290`} stroke={ink} strokeWidth='1.5'/>
    <path d={`M${ox + 230} 344V372`} stroke={ink} strokeWidth='1.5' strokeDasharray='4 3'/>
    {earth(ox + 230, 372)}
    <path d={`M${ox + 120} 150H${ox + 170}V${good ? 160 : 166}H${ox + 214}`} fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x={ox + 128} y='143' fontSize='11.5' fill={ink}>probe tip</text>
    <path d={`M${ox + 120} 196H${ox + 160}V${good ? 226 : 166}H${ox + 214}`} fill='none' stroke={ink} strokeWidth='2.5'/>
    <text x={ox + 126} y='246' fontSize='11.5' fill={ink}>ground clip</text>
    {good ? <text x={ox} y='420' fontSize='11.5' fill={ink}>Clip on GND: no current flows in the ground lead.</text>
      : <g>
        <path d={`M${ox + 30} 268C${ox + 30} 400 ${ox + 230} 410 ${ox + 230} 394`} fill='none' stroke={ink} strokeWidth='2' strokeDasharray='6 4'/>
        <text x={ox + 92} y='418' fontSize='11.5' fontWeight='600' fill={ink}>fault current through earth</text>
        <text x={ox} y='440' fontSize='11.5' fill={ink}>Clip on +12 V: +12 V is shorted to earth</text>
        <text x={ox} y='456' fontSize='11.5' fill={ink}>through the thin ground lead.</text>
      </g>}
  </g>;
  return <svg viewBox='0 0 760 470' role='img' aria-label='The probe ground clip is connected to mains earth' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The probe ground clip is mains earth</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>On a mains-powered scope every probe ground is wired to the earth pin of the power cord</text>
    <line x1='380' x2='380' y1='70' y2='460' stroke={rule} strokeWidth='1'/>
    {panel(24, 'Right', 'ground clip on circuit GND', true)}
    {panel(404, 'Wrong', 'ground clip on any other node', false)}
  </svg>;
};
