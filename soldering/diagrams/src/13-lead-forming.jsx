// Lesson 2, Exercise 2.1: bend, splay and clip through-hole leads.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)';
  const cs = [136, 380, 624];
  const frame = (cx, strong) => <rect x={cx - 112} y='66' width='224' height='290' rx='8' fill='none' stroke={edge} strokeWidth={strong ? 2.5 : 1}/>;
  const body = (cx, y) => <g><rect x={cx - 38} y={y - 13} width='76' height='26' rx='12' fill={tint} stroke={edge} strokeWidth='1.25'/><g stroke={edge} strokeWidth='3'><line x1={cx - 18} y1={y - 12} x2={cx - 18} y2={y + 12}/><line x1={cx - 6} y1={y - 12} x2={cx - 6} y2={y + 12}/><line x1={cx + 6} y1={y - 12} x2={cx + 6} y2={y + 12}/></g></g>;
  const caption = (cx, a, b, c) => <g><text x={cx} y='298' textAnchor='middle' fontWeight='600' fill={ink}>{a}</text><text x={cx} y='318' textAnchor='middle' fontSize='11.5' fill={quiet}>{b}</text><text x={cx} y='334' textAnchor='middle' fontSize='11.5' fill={quiet}>{c}</text></g>;
  const c0 = cs[0], c1 = cs[1], c2 = cs[2];
  return <svg viewBox='0 0 760 370' role='img' aria-label='Bend leads away from the body, splay them, clip above the fillet' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Bend away from the body, splay the leads, clip above the fillet</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Axial resistor on single-sided perfboard, side views</text>
    <g>{frame(c0, false)}
      <path d={`M${c0 - 58} 230 V140 H${c0 + 58} V230`} fill='none' stroke={edge} strokeWidth='2.5' strokeLinejoin='round'/>
      {body(c0, 140)}
      <path d={`M${c0 + 38} 116 V108 M${c0 + 58} 116 V108 M${c0 + 38} 112 H${c0 + 58}`} fill='none' stroke={edge} strokeWidth='1'/>
      <text x={c0 + 48} y='100' textAnchor='middle' fontSize='11.5' fill={quiet}>1.5 mm or more</text>
      <text x={c0} y='190' textAnchor='middle' fontSize='11.5' fill={quiet}>never bend</text><text x={c0} y='206' textAnchor='middle' fontSize='11.5' fill={quiet}>at the body seal</text>
      {caption(c0, '1 Bend the leads 90°', 'Use pliers as a former,', 'not your fingers')}</g>
    <g>{frame(c1, false)}
      <rect x={c1 - 100} y='150' width='200' height='20' fill={tint} stroke={edge} strokeWidth='1.25'/>
      <rect x={c1 - 70} y='146' width='24' height='4' fill={edge}/><rect x={c1 + 46} y='146' width='24' height='4' fill={edge}/>
      <path d={`M${c1 - 38} 196 H${c1 - 58} V146 L${c1 - 86} 106`} fill='none' stroke={edge} strokeWidth='2.5' strokeLinejoin='round'/>
      <path d={`M${c1 + 38} 196 H${c1 + 58} V146 L${c1 + 86} 106`} fill='none' stroke={edge} strokeWidth='2.5' strokeLinejoin='round'/>
      {body(c1, 196)}
      <line x1={c1 + 58} y1='146' x2={c1 + 58} y2='96' stroke={edge} strokeWidth='1' strokeDasharray='4 3'/>
      <path d={`M${c1 + 58} 116 A30 30 0 0 1 ${c1 + 75} 121`} fill='none' stroke={edge} strokeWidth='1'/>
      <text x={c1 + 50} y='104' textAnchor='end' fontSize='11.5' fill={quiet}>30 to 45°</text>
      <text x={c1} y='140' textAnchor='middle' fontSize='11.5' fill={quiet}>copper pads</text>
      <text x={c1} y='240' textAnchor='middle' fontSize='11.5' fill={quiet}>part underneath, flat</text><text x={c1} y='256' textAnchor='middle' fontSize='11.5' fill={quiet}>against the board</text>
      {caption(c1, '2 Insert, flip, splay', 'Splay each lead 30 to 45°', 'outward, never bend it flat')}</g>
    <g>{frame(c2, true)}
      <rect x={c2 - 90} y='200' width='180' height='22' fill={tint} stroke={edge} strokeWidth='1.25'/>
      <rect x={c2 - 36} y='196' width='72' height='4' fill={edge}/>
      <rect x={c2 - 4} y='92' width='8' height='48' fill='none' stroke={edge} strokeWidth='1' strokeDasharray='3 3'/>
      <path d={`M${c2 - 35} 196 Q${c2 - 8} 194 ${c2 - 4} 152 L${c2 + 4} 152 Q${c2 + 8} 194 ${c2 + 35} 196 Z`} fill={edge} fillOpacity='0.3' stroke={edge} strokeWidth='1.25'/>
      <rect x={c2 - 4} y='140' width='8' height='120' fill='none' stroke={edge} strokeWidth='1.25'/>
      <polygon points={`${c2 + 7},140 ${c2 + 100},140 ${c2 + 100},114`} fill={edge} fillOpacity='0.55' stroke={edge} strokeWidth='1.25'/>
      <text x={c2 + 100} y='104' textAnchor='end' fontSize='11.5' fill={quiet}>cutter</text>
      <line x1={c2 - 60} y1='140' x2={c2 - 8} y2='140' stroke={edge} strokeWidth='1' strokeDasharray='4 3'/>
      <text x={c2 - 100} y='132' fontSize='11.5' fill={quiet}>cut here</text>
      <text x={c2 - 100} y='170' fontSize='11.5' fill={quiet}>fillet</text>
      <text x={c2 + 40} y='170' fontSize='11.5' fill={quiet}>flat face</text><text x={c2 + 40} y='186' fontSize='11.5' fill={quiet}>down</text>
      {caption(c2, '3 Solder, then clip', 'Clip just above the fillet,', 'finger over the lead end')}</g>
  </svg>;
};
