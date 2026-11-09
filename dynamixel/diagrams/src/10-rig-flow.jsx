export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const box = (x, y, t, lines, shaded) => <g>
    <rect x={x} y={y} width='160' height='120' rx='6' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + 80} y={y + 24} textAnchor='middle' fontWeight='600' fill={ink}>{t}</text>
    {lines.map((l, i) => <text key={l} x={x + 80} y={y + 46 + i * 16} textAnchor='middle' fontSize='11' fill={ink}>{l}</text>)}
  </g>;
  const arrow = d => <path d={d} fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#dx-rf-arrow)'/>;
  return <svg viewBox='0 0 760 360' role='img' aria-label='The rig script: calibrate, home, run, report' fontSize='13'>
    <defs><marker id='dx-rf-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The rig script: calibrate, home, run, report</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>python rig.py calibrate | home | run | status, all driven by rig.json</text>
    {box(24, 90, 'calibrate', ['torque off', 'move each joint by hand', 'record min, max, home', 'save rig.json'], false)}
    {box(206, 90, 'home', ['check errors, temperature', 'store limits if changed', 'gentle profile', 'go to home'], true)}
    {box(388, 90, 'run', ['home first', 'check every goal', 'against the limits', 'step through poses'], true)}
    {box(570, 90, 'status', ['ping, position', 'voltage, temperature', 'errors, torque', 'append status.csv'], false)}
    {arrow('M184 150H204')}{arrow('M366 150H386')}{arrow('M548 150H568')}
    <rect x='206' y='250' width='342' height='50' rx='6' fill='none' stroke={rule} strokeDasharray='5 4'/>
    <text x='377' y='272' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>finally: torque off for every servo, close the port</text>
    <text x='377' y='289' textAnchor='middle' fontSize='11' fill={quiet}>on success, on errors and on Ctrl-C</text>
    <path d='M286 210V248M468 210V248' stroke={ink} strokeWidth='1' strokeDasharray='3 3'/>
    <text x='24' y='336' fontSize='11.5' fill={ink}>rig.json holds names, IDs, limits, home positions, profile and the motion sequence.</text>
  </svg>;
};
