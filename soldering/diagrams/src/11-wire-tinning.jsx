// Lesson 1, Exercise 1.1: what a tinned wire end should and should not look like.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const rows = [104, 184, 264, 344];
  const ins = cy => <rect x='250' y={cy - 11} width='220' height='22' rx='4' fill={tint} stroke={edge} strokeWidth='1.25'/>;
  const strands = (x0, x1, cy) => <g stroke={edge} strokeWidth='1'>{Array.from({ length: Math.floor((x1 - x0) / 9) }, (_, i) => <line key={i} x1={x0 + i * 9} y1={cy - 7} x2={x0 + i * 9 + 8} y2={cy + 7}/>)}</g>;
  const core = (x0, x1, cy, tinned) => <g><rect x={x0} y={cy - 7} width={x1 - x0} height='14' fill={edge} fillOpacity={tinned ? 0.3 : 0} stroke={edge} strokeWidth='1.25'/>{strands(x0 + 2, x1 - 6, cy)}</g>;
  const verdict = (cy, ok) => <g><rect x='672' y={cy - 15} width='64' height='28' rx='4' fill={ok ? 'none' : edge} fillOpacity={ok ? 1 : 0.85} stroke={edge} strokeWidth={ok ? 2.5 : 1.25}/><text x='704' y={cy + 4} textAnchor='middle' fontWeight='600' fill={ok ? ink : '#ffffff'}>{ok ? 'PASS' : 'FAIL'}</text></g>;
  const title = (cy, a, b, c) => <g><text x='24' y={cy - 6} fontWeight='600' fill={ink}>{a}</text><text x='24' y={cy + 12} fontSize='11.5' fill={quiet}>{b}</text>{c ? <text x='24' y={cy + 28} fontSize='11.5' fill={quiet}>{c}</text> : null}</g>;
  return <svg viewBox='0 0 760 390' role='img' aria-label='A good tinned wire shows its strands and stops short of the insulation' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>A tinned end shows its strands and stops short of the insulation</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Stranded wire after tinning, side view, 5 mm stripped</text>
    <g stroke={rule} strokeWidth='1'><line x1='24' x2='736' y1='144' y2='144'/><line x1='24' x2='736' y1='224' y2='224'/><line x1='24' x2='736' y1='304' y2='304'/></g>
    <g>{ins(rows[0])}<rect x='470' y={rows[0] - 7} width='8' height='14' fill='none' stroke={edge} strokeWidth='1.25'/>{core(478, 590, rows[0], true)}
      <path d={`M470 ${rows[0] - 16}v-6h8v6`} fill='none' stroke={edge} strokeWidth='1'/><text x='474' y={rows[0] - 28} textAnchor='middle' fontSize='11.5' fill={quiet}>0.5 to 1 mm bare</text>
      {title(rows[0], 'Good', 'Thin silver skin, strand', 'outline still visible')}{verdict(rows[0], true)}</g>
    <g>{ins(rows[1])}{core(470, 580, rows[1], true)}<ellipse cx='590' cy={rows[1]} rx='22' ry='17' fill={edge} fillOpacity='0.45' stroke={edge} strokeWidth='1.25'/>
      <text x='590' y={rows[1] - 24} textAnchor='middle' fontSize='11.5' fill={quiet}>blob</text>
      {title(rows[1], 'Blob on the end', 'Too much solder: re-flux,', 'let the tip draw it off')}{verdict(rows[1], false)}</g>
    <g>{ins(rows[2])}<rect x='400' y={rows[2] - 7} width='70' height='14' fill={edge} fillOpacity='0.6' stroke={edge} strokeWidth='1' strokeDasharray='4 3'/>{core(470, 590, rows[2], true)}
      <text x='435' y={rows[2] - 18} textAnchor='middle' fontSize='11.5' fill={quiet}>solder under the insulation</text>
      {title(rows[2], 'Wicked under insulation', 'Wire goes stiff and', 'later breaks right there')}{verdict(rows[2], false)}</g>
    <g>{ins(rows[3])}<g stroke={edge} strokeWidth='1.5' fill='none'><path d={`M470 ${rows[3] - 4} L590 ${rows[3] - 30}`}/><path d={`M470 ${rows[3] - 2} L596 ${rows[3] - 10}`}/><path d={`M470 ${rows[3]} L600 ${rows[3] + 2}`}/><path d={`M470 ${rows[3] + 2} L594 ${rows[3] + 14}`}/><path d={`M470 ${rows[3] + 4} L584 ${rows[3] + 30}`}/></g>
      <text x='610' y={rows[3] - 26} fontSize='11.5' fill={quiet}>loose strands</text>
      {title(rows[3], 'Splayed strands', 'Retwist before tinning,', 'or cut off and restart')}{verdict(rows[3], false)}</g>
  </svg>;
};
