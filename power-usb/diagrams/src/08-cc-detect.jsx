export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gnd = (x, y) => <g stroke={ink} strokeWidth='1.5'><line x1={x - 10} x2={x + 10} y1={y} y2={y}/><line x1={x - 6} x2={x + 6} y1={y + 5} y2={y + 5}/><line x1={x - 2} x2={x + 2} y1={y + 10} y2={y + 10}/></g>;
  const res = (x, y, label, sub) => <g>
    <rect x={x - 8} y={y} width='16' height='44' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={x + 16} y={y + 20} fontSize='12' fontWeight='600' fill={ink}>{label}</text>
    {sub ? <text x={x + 16} y={y + 36} fontSize='11' fill={quiet}>{sub}</text> : null}
  </g>;
  return <svg viewBox='0 0 760 400' role='img' aria-label='USB-C attach detection on the CC wire' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>USB-C: how the Mac knows something is plugged in</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The host pulls CC up (Rp); a device pulls it down (Rd). The host reads the divider voltage</text>
    <rect x='24' y='80' width='250' height='230' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='149' y='104' textAnchor='middle' fontWeight='600' fill={ink}>Mac (source, host)</text>
    <text x='60' y='138' fontSize='11.5' fill={ink}>pull-up</text>
    <path d='M120 126H180V140' fill='none' stroke={ink} strokeWidth='1.5'/>
    {res(180, 140, 'Rp', null)}
    <path d='M180 184V220H274' fill='none' stroke={ink} strokeWidth='1.5'/>
    <circle cx='180' cy='220' r='3.5' fill={ink}/>
    <rect x='60' y='240' width='170' height='50' rx='5' fill='#ffffff' stroke={ink} strokeWidth='1.2'/>
    <text x='145' y='262' textAnchor='middle' fontSize='11.5' fill={ink}>sees Rd: turn on VBUS</text>
    <text x='145' y='278' textAnchor='middle' fontSize='11.5' fill={ink}>and use the data lines</text>
    <path d='M180 220V240' stroke={ink} strokeWidth='1' strokeDasharray='3 3'/>
    <path d='M274 220H486' stroke={ink} strokeWidth='2'/>
    <text x='380' y='212' textAnchor='middle' fontSize='12' fontWeight='600' fill={ink}>CC wire in the cable</text>
    <rect x='486' y='80' width='250' height='230' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='611' y='104' textAnchor='middle' fontWeight='600' fill={ink}>Hub end of the lead (sink)</text>
    <path d='M486 220H580V230' fill='none' stroke={ink} strokeWidth='1.5'/>
    {res(580, 230, 'Rd', '4.7 kΩ in REASON')}
    <path d='M580 274V286' stroke={ink} strokeWidth='1.5'/>{gnd(580, 286)}
    <text x='500' y='140' fontSize='11.5' fill={ink}>Specified: 5.1 kΩ</text>
    <text x='500' y='158' fontSize='11.5' fill={ink}>±10 % (4.59 to 5.61 kΩ)</text>
    <text x='500' y='176' fontSize='11.5' fill={ink}>or ±20 % to signal a sink</text>
    <text x='24' y='344' fontSize='11.5' fill={ink}>No Rd: the Mac sees nothing and never enables the port. 4.7 kΩ is 8 % low: inside both tolerances.</text>
    <text x='24' y='362' fontSize='11.5' fill={ink}>VBUS stays cut in REASON's upstream leads; the hub runs from its buck.</text>
    <text x='24' y='388' fontSize='11.5' fill={quiet}>Simplified: a real Rp is a resistor or current source to a supply, and USB-C ports have two CC pins.</text>
  </svg>;
};
