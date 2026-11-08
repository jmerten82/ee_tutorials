export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  // A long signal at the top; three captures below, each aligned on a rising crossing of the level.
  const sig = t => 40 * Math.sin(t / 22) + 12 * Math.sin(t / 7.3);
  let long = '';
  for (let t = 0; t <= 700; t += 2) long += `${t ? 'L' : 'M'}${30 + t} ${(130 - sig(t)).toFixed(1)}`;
  const level = 10;
  const crossings = [];
  for (let t = 60; t <= 640; t += 1) if (sig(t - 1) < level && sig(t) >= level && crossings.every(c => t - c > 120)) crossings.push(t);
  const picks = crossings.slice(0, 3);
  const cap = (t0) => { let d = ''; for (let u = -120; u <= 120; u += 2) d += `${u === -120 ? 'M' : 'L'}${380 + u} ${(320 - sig(t0 + u)).toFixed(1)}`; return d; };
  return <svg viewBox='0 0 760 470' role='img' aria-label='How the trigger builds a stable picture' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>How the trigger builds a stable picture</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Edge trigger, rising slope: every time the signal rises through the level, a picture is taken around that moment</text>
    <line x1='30' x2='730' y1={130 - level} y2={130 - level} stroke={ink} strokeWidth='1' strokeDasharray='6 4'/>
    <text x='734' y={134 - level} fontSize='11.5' fill={ink}>level</text>
    <path d={long} fill='none' stroke={ink} strokeWidth='2'/>
    {picks.map((t, i) => <g key={t}>
      <circle cx={30 + t} cy={130 - level} r='5' fill='none' stroke={ink} strokeWidth='2'/>
      <text x={30 + t} y='196' textAnchor='middle' fontSize='11.5' fill={ink}>{'trigger ' + (i + 1)}</text>
    </g>)}
    <text x='30' y='78' fontSize='11.5' fill={quiet}>the signal, continuously</text>
    <rect x='260' y='240' width='240' height='160' fill={tint} stroke={ink} strokeWidth='1.5'/>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <line key={i} x1={260 + i * 24} x2={260 + i * 24} y1='240' y2='400' stroke={rule} strokeWidth='0.6' strokeDasharray='2 3'/>)}
    {picks.map(t => <path key={t} d={cap(t)} fill='none' stroke={ink} strokeWidth='1.6' opacity='0.8'/>)}
    <line x1='380' x2='380' y1='232' y2='408' stroke={ink} strokeWidth='1'/>
    <path d='M373 228L380 238L387 228z' fill={ink}/>
    <line x1='260' x2='500' y1={320 - level} y2={320 - level} stroke={ink} strokeWidth='1' strokeDasharray='6 4'/>
    <text x='320' y='420' textAnchor='middle' fontSize='11.5' fill={ink}>before the trigger</text>
    <text x='440' y='420' textAnchor='middle' fontSize='11.5' fill={ink}>after the trigger</text>
    <text x='380' y='222' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>trigger point</text>
    <text x='24' y='262' fontWeight='600' fill={ink}>The screen</text>
    <text x='24' y='280' fontSize='11.5' fill={quiet}>All captures line up at the</text>
    <text x='24' y='295' fontSize='11.5' fill={quiet}>trigger point, so a repeating</text>
    <text x='24' y='310' fontSize='11.5' fill={quiet}>signal stands still.</text>
    <text x='520' y='262' fontWeight='600' fill={ink}>Trigger modes</text>
    <text x='520' y='282' fontSize='11.5' fill={ink}>Auto: draws anyway if no trigger</text>
    <text x='520' y='300' fontSize='11.5' fill={ink}>Normal: draws only on a trigger</text>
    <text x='520' y='318' fontSize='11.5' fill={ink}>Single: one trigger, then stops</text>
    <text x='24' y='456' fontSize='11.5' fill={ink}>Push the trigger level knob to set the level to 50 % of the signal.</text>
  </svg>;
};
