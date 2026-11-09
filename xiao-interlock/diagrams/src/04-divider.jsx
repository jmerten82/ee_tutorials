export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const res = (x, y, label) => <g>
    <rect x={x - 8} y={y} width='16' height='40' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={x + 16} y={y + 24} fontSize='12' fontWeight='600' fill={ink}>{label}</text>
  </g>;
  const gnd = (x, y) => <g stroke={ink} strokeWidth='1.5'><line x1={x - 12} x2={x + 12} y1={y} y2={y}/><line x1={x - 8} x2={x + 8} y1={y + 5} y2={y + 5}/><line x1={x - 4} x2={x + 4} y1={y + 10} y2={y + 10}/></g>;
  // bar chart of pin voltage against input voltage
  const vin = [9, 11, 12, 13.8, 15];
  const X = v => 380 + (v - 8) * 45;
  const Y = v => 360 - v * 70;
  return <svg viewBox='0 0 760 440' role='img' aria-label='The 12 V divider for ARM and CHAIN' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The divider: 12 V in, under 3.3 V out</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>22 kΩ + 10 kΩ on top, 10 kΩ to GND: the pin sees 10 / 42 of the input. Same circuit for ARM and CHAIN</text>
    <circle cx='120' cy='90' r='4' fill={ink}/>
    <text x='132' y='94' fontSize='12' fontWeight='600' fill={ink}>12 V rail or coil feed</text>
    <path d='M120 94V110' stroke={ink} strokeWidth='1.5'/>
    {res(120, 110, '22 kΩ')}
    <path d='M120 150V160' stroke={ink} strokeWidth='1.5'/>
    {res(120, 160, '10 kΩ')}
    <path d='M120 200V230' stroke={ink} strokeWidth='1.5'/>
    <circle cx='120' cy='215' r='3.5' fill={ink}/>
    <path d='M120 215H230' stroke={ink} strokeWidth='1.5'/>
    <rect x='230' y='203' width='90' height='24' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='275' y='219' textAnchor='middle' fontSize='12' fontWeight='600' fill={ink}>XIAO pin</text>
    <text x='175' y='207' textAnchor='middle' fontSize='11' fill={ink}>2.86 V</text>
    {res(120, 230, '10 kΩ')}
    <path d='M120 270V290' stroke={ink} strokeWidth='1.5'/>
    {gnd(120, 290)}
    <text x='24' y='336' fontSize='11.5' fill={ink}>Current: 12 V / 42 kΩ = 0.29 mA</text>
    <text x='24' y='354' fontSize='11.5' fill={ink}>Two resistors on top: one shorted still</text>
    <text x='24' y='370' fontSize='11.5' fill={ink}>leaves 10 kΩ to limit the current.</text>
    <rect x={X(8)} y={Y(3.3)} width={X(15.6) - X(8)} height={Y(2.0) - Y(3.3)} fill={tint}/>
    <line x1={X(8)} x2={X(15.6)} y1={Y(3.3)} y2={Y(3.3)} stroke={ink} strokeWidth='1.2' strokeDasharray='6 4'/>
    <text x={X(15.6) + 4} y={Y(3.3) + 4} fontSize='11' fill={ink}>3.3 V</text>
    <line x1={X(8)} x2={X(15.6)} y1={Y(2.0)} y2={Y(2.0)} stroke={ink} strokeWidth='1' strokeDasharray='2 3'/>
    <text x={X(15.6) + 4} y={Y(2.0) + 4} fontSize='11' fill={ink}>2 V</text>
    <text x={X(8) + 6} y={Y(3.3) + 16} fontSize='11' fill={quiet}>reads HIGH safely</text>
    <line x1={X(8)} x2={X(8)} y1={Y(3.8)} y2={Y(0)} stroke={ink} strokeWidth='1.2'/>
    <line x1={X(8)} x2={X(15.6)} y1={Y(0)} y2={Y(0)} stroke={ink} strokeWidth='1.2'/>
    {vin.map(v => {
      const p = v * 10 / 42;
      return <g key={v}>
        <rect x={X(v) - 12} y={Y(p)} width='24' height={Y(0) - Y(p)} fill={p > 3.3 ? '#ffffff' : ink} stroke={ink} strokeWidth='1.5'/>
        <text x={X(v)} y={Y(p) - 6} textAnchor='middle' fontSize='11' fontWeight='600' fill={ink}>{p.toFixed(2)}</text>
        <text x={X(v)} y={Y(0) + 16} textAnchor='middle' fontSize='11' fill={ink}>{v + ' V'}</text>
      </g>;
    })}
    <text x={X(11.5)} y={Y(0) + 34} textAnchor='middle' fontSize='11' fill={quiet}>input voltage → pin voltage</text>
    <text x='24' y='410' fontSize='11.5' fill={ink}>Above 13.8 V the pin exceeds 3.3 V (open bar): if your supply can run that high, use 8.2 kΩ at the bottom.</text>
    <text x='24' y='428' fontSize='11.5' fill={quiet}>Measure every divider output with the meter before connecting it to the XIAO.</text>
  </svg>;
};
