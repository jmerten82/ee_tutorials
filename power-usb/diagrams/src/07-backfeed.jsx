export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const wireRow = (y, label, cut) => <g>
    <text x='214' y={y - 6} fontSize='11' fill={ink}>{label}</text>
    {cut
      ? <g><path d={`M200 ${y}H360`} stroke={ink} strokeWidth='1.8'/><path d={`M400 ${y}H${y > 0 ? 560 : 560}`} stroke={ink} strokeWidth='1.8' strokeDasharray='2 4'/>
        <rect x='360' y={y - 7} width='40' height='14' rx='3' fill={tint} stroke={ink} strokeWidth='1.2'/></g>
      : <path d={`M200 ${y}H560`} stroke={ink} strokeWidth='1.8'/>}
  </g>;
  const panel = (oy, title, cut) => <g>
    <text x='24' y={oy} fontWeight='600' fill={ink}>{title}</text>
    <rect x='24' y={oy + 14} width='176' height='110' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='112' y={oy + 38} textAnchor='middle' fontWeight='600' fill={ink}>Mac USB port</text>
    <text x='112' y={oy + 56} textAnchor='middle' fontSize='11' fill={quiet}>its own 5 V on VBUS</text>
    {wireRow(oy + 40, 'VBUS', cut)}
    {wireRow(oy + 66, 'D+ / D−', false)}
    {wireRow(oy + 92, 'GND', false)}
    <rect x='560' y={oy + 14} width='176' height='110' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='648' y={oy + 38} textAnchor='middle' fontWeight='600' fill={ink}>Hub, self-powered</text>
    <text x='648' y={oy + 56} textAnchor='middle' fontSize='11' fill={quiet}>5 V from the buck</text>
  </g>;
  return <svg viewBox='0 0 760 420' role='img' aria-label='Backfeed: two 5 V sources on one wire' fontSize='13'>
    <defs><marker id='pu-bf-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Backfeed: two 5 V sources on one wire</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The upstream lead between the Mac and a self-powered hub</text>
    {panel(84, 'Wrong: VBUS connected', false)}
    <path d='M520 112H300' fill='none' stroke={ink} strokeWidth='2' strokeDasharray='6 4' markerEnd='url(#pu-bf-arrow)'/>
    <text x='410' y='106' textAnchor='middle' fontSize='11' fontWeight='600' fill={ink}>current pushed into the Mac</text>
    {panel(250, 'Right: VBUS cut and insulated at the hub end', true)}
    <text x='380' y='280' textAnchor='middle' fontSize='11' fill={ink}>cut back 5 mm, heat shrink</text>
    <text x='24' y='404' fontSize='11.5' fill={ink}>Test: tower on, lead out of the Mac, VBUS to GND at the Mac's end reads 0 V (Exercise 5.1).</text>
  </svg>;
};
