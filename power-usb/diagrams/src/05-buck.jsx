export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gnd = (x, y) => <g stroke={ink} strokeWidth='1.5'><line x1={x - 10} x2={x + 10} y1={y} y2={y}/><line x1={x - 6} x2={x + 6} y1={y + 5} y2={y + 5}/><line x1={x - 2} x2={x + 2} y1={y + 10} y2={y + 10}/></g>;
  const cap = (x, y) => <g stroke={ink} strokeWidth='2'><line x1={x - 12} x2={x + 12} y1={y - 4} y2={y - 4}/><line x1={x - 12} x2={x + 12} y1={y + 4} y2={y + 4}/></g>;
  // waveforms
  const wx = 210, per = 78, duty = 0.42;
  let sw = `M${wx} 380`;
  for (let i = 0; i < 6; i++) { const x = wx + i * per; sw += `H${x}V330H${x + per * duty}V380`; }
  sw += `H${wx + 6 * per}`;
  let il = `M${wx} 440`;
  for (let i = 0; i < 6; i++) { const x = wx + i * per; il += `L${x + per * duty} 418L${x + per} 440`; }
  return <svg viewBox='0 0 760 500' role='img' aria-label='How a buck regulator works' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>A buck regulator: switch, inductor, capacitors</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Synchronous type, as in the D36V28F5: two switches take turns; simplified</text>
    <rect x='24' y='96' width='70' height='110' rx='5' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='59' y='150' textAnchor='middle' fontWeight='600' fill={ink}>12 V</text>
    <path d='M94 110H250' stroke={ink} strokeWidth='1.5'/>
    <path d='M150 110V140' stroke={ink} strokeWidth='1.5'/>{cap(150, 144)}<path d='M150 148V176' stroke={ink} strokeWidth='1.5'/>{gnd(150, 176)}
    <text x='164' y='148' fontSize='11.5' fill={ink}>C in</text>
    <rect x='250' y='96' width='56' height='28' rx='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='278' y='115' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>S1</text>
    <path d='M306 110H360' stroke={ink} strokeWidth='1.5'/>
    <circle cx='340' cy='110' r='3.5' fill={ink}/>
    <text x='340' y='92' textAnchor='middle' fontSize='11' fill={quiet}>switch node</text>
    <path d='M340 110V140' stroke={ink} strokeWidth='1.5'/>
    <rect x='326' y='140' width='28' height='40' rx='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='340' y='165' textAnchor='middle' fontSize='11' fontWeight='600' fill={ink}>S2</text>
    <path d='M340 180V196' stroke={ink} strokeWidth='1.5'/>{gnd(340, 196)}
    <path d='M360 110C366 98 374 98 380 110C386 98 394 98 400 110C406 98 414 98 420 110C426 98 434 98 440 110' fill='none' stroke={ink} strokeWidth='2'/>
    <text x='400' y='86' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>L</text>
    <path d='M440 110H640' stroke={ink} strokeWidth='1.5'/>
    <path d='M500 110V140' stroke={ink} strokeWidth='1.5'/>{cap(500, 144)}<path d='M500 148V176' stroke={ink} strokeWidth='1.5'/>{gnd(500, 176)}
    <text x='514' y='148' fontSize='11.5' fill={ink}>C out</text>
    <rect x='600' y='96' width='110' height='110' rx='5' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='655' y='146' textAnchor='middle' fontWeight='600' fill={ink}>5 V load</text>
    <text x='655' y='162' textAnchor='middle' fontSize='11' fill={quiet}>hub, ring</text>
    <rect x='250' y='220' width='200' height='34' rx='5' fill={tint}/>
    <text x='350' y='242' textAnchor='middle' fontSize='11.5' fill={ink}>controller sets the on-time</text>
    <path d='M278 220V126' fill='none' stroke={ink} strokeWidth='1' strokeDasharray='3 3'/>
    <path d='M560 110V237H452' fill='none' stroke={ink} strokeWidth='1' strokeDasharray='3 3'/>
    <text x='566' y='232' fontSize='11' fill={quiet}>feedback</text>
    <text x='24' y='316' fontWeight='600' fill={ink}>Switch node</text>
    <text x='24' y='332' fontSize='11' fill={quiet}>12 V for about 42 %</text>
    <path d={sw} fill='none' stroke={ink} strokeWidth='2'/>
    <text x='24' y='412' fontWeight='600' fill={ink}>Inductor current</text>
    <text x='24' y='428' fontSize='11' fill={quiet}>rises, falls, averages to I out</text>
    <path d={il} fill='none' stroke={ink} strokeWidth='2'/>
    <text x='680' y='350' fontSize='11.5' fill={ink}>12 V</text>
    <text x='680' y='384' fontSize='11.5' fill={ink}>0 V</text>
    <text x='24' y='478' fontSize='11.5' fill={ink}>Input current flows in pulses (C in supplies them); output ripple is the small sawtooth that C out leaves.</text>
  </svg>;
};
