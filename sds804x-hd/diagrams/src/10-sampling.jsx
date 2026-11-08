export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const x0 = 40, x1 = 720, W = x1 - x0;
  const cycles = 10;
  const f = x => Math.sin((2 * Math.PI * cycles * (x - x0)) / W);
  const curve = (y0, amp) => { let d = ''; for (let x = x0; x <= x1; x += 1) d += `${x === x0 ? 'M' : 'L'}${x} ${(y0 - amp * f(x)).toFixed(1)}`; return d; };
  const fast = [], slow = [];
  for (let x = x0; x <= x1; x += W / (cycles * 8)) fast.push(x);
  for (let x = x0; x <= x1 + 0.1; x += W / (cycles * 1.1)) slow.push(x);
  // samples at 1.1 x the signal frequency see 0.1 x the frequency: one slow cycle across the screen
  let alias = '';
  for (let x = x0; x <= x1; x += 2) alias += `${x === x0 ? 'M' : 'L'}${x} ${(330 + 50 * Math.sin((2 * Math.PI * (x - x0)) / W)).toFixed(1)}`;
  return <svg viewBox='0 0 760 440' role='img' aria-label='Sampling and aliasing' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Sampling and aliasing</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The same signal, sampled fast enough and too slowly</text>
    <text x='24' y='84' fontWeight='600' fill={ink}>8 samples per cycle: the dots trace the real signal</text>
    <path d={curve(150, 50)} fill='none' stroke={rule} strokeWidth='1.5'/>
    {fast.map(x => <circle key={x} cx={x} cy={150 - 50 * f(x)} r='3' fill={ink}/>)}
    <text x='24' y='244' fontWeight='600' fill={ink}>1.1 samples per cycle: the dots trace a slow wave that is not there</text>
    <path d={curve(330, 50)} fill='none' stroke={rule} strokeWidth='1.5'/>
    <path d={alias} fill='none' stroke={ink} strokeWidth='2' strokeDasharray='7 4'/>
    {slow.map(x => <circle key={x} cx={x} cy={330 - 50 * f(x)} r='4' fill={ink}/>)}
    <text x='620' y='270' fontSize='11.5' fill={ink}>alias (dashed)</text>
    <rect x='24' y='398' width='712' height='34' rx='6' fill={tint}/>
    <text x='380' y='420' textAnchor='middle' fill={ink}>Sample rate must exceed 2 × the signal frequency; use 5 to 10 × to see its shape.</text>
  </svg>;
};
