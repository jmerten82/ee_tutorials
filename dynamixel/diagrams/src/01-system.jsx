export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const box = (x, y, w, ht, t, l1, l2, shaded) => <g>
    <rect x={x} y={y} width={w} height={ht} rx='6' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + w / 2} y={y + 22} textAnchor='middle' fontWeight='600' fill={ink}>{t}</text>
    {l1 ? <text x={x + w / 2} y={y + 39} textAnchor='middle' fontSize='11' fill={quiet}>{l1}</text> : null}
    {l2 ? <text x={x + w / 2} y={y + 53} textAnchor='middle' fontSize='11' fill={quiet}>{l2}</text> : null}
  </g>;
  const servo = (x, id) => <g>
    <rect x={x} y='250' width='92' height='70' rx='8' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <circle cx={x + 46} cy='272' r='12' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={x + 46} y='306' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{'ID ' + id}</text>
    <rect x={x - 6} y='290' width='10' height='14' fill={ink}/>
    <rect x={x + 88} y='290' width='10' height='14' fill={ink}/>
  </g>;
  return <svg viewBox='0 0 760 400' role='img' aria-label='The rig: Mac, hub, U2D2, power hub and a chain of servos' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The rig: a Mac, a U2D2 and a chain of servos</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Data comes from the Mac; power comes from the supply. They meet on the bus at the power hub</text>
    {box(24, 80, 120, 64, 'Mac', 'Wizard 2.0', 'Python scripts')}
    {box(184, 80, 120, 64, 'USB hub', 'CH334F (REASON)', null)}
    {box(344, 80, 120, 64, 'U2D2', 'USB to TTL bus', 'data only', true)}
    {box(344, 168, 120, 54, 'Power hub', 'one input only', null, true)}
    {box(560, 168, 160, 54, 'Supply', '12 V (5 V for XL330)', null)}
    <g fill='none' stroke={ink} strokeWidth='1.5'>
      <path d='M144 112H184'/><path d='M304 112H344'/>
      <path d='M404 144V168'/>
      <path d='M560 195H464' strokeDasharray='6 3'/>
    </g>
    <text x='512' y='188' textAnchor='middle' fontSize='11' fill={ink}>power</text>
    <text x='164' y='104' textAnchor='middle' fontSize='11' fill={quiet}>USB</text>
    <text x='324' y='104' textAnchor='middle' fontSize='11' fill={quiet}>USB</text>
    <path d='M404 222V240H130V290H136' fill='none' stroke={ink} strokeWidth='2.5'/>
    {servo(140, 1)}
    {servo(290, 2)}
    {servo(440, 3)}
    <path d='M238 297H284' stroke={ink} strokeWidth='2.5'/>
    <path d='M388 297H434' stroke={ink} strokeWidth='2.5'/>
    <text x='261' y='340' textAnchor='middle' fontSize='11' fill={ink}>X3P cable</text>
    <text x='411' y='340' textAnchor='middle' fontSize='11' fill={ink}>X3P cable</text>
    <text x='600' y='270' fontSize='11.5' fontWeight='600' fill={ink}>Every cable carries</text>
    <text x='600' y='288' fontSize='11.5' fill={ink}>GND, supply and DATA</text>
    <text x='600' y='306' fontSize='11.5' fill={ink}>(daisy chain)</text>
    <text x='24' y='380' fontSize='11.5' fill={ink}>Each servo has a unique ID and listens at the bus baud rate. Never plug or unplug while the bus is powered.</text>
  </svg>;
};
