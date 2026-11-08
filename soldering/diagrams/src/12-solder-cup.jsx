// Lesson 1, Exercise 1.3: wire into a solder cup, cross-section.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)';
  const cs = [136, 380, 624];
  const frame = (cx, strong) => <rect x={cx - 112} y='66' width='224' height='290' rx='8' fill='none' stroke={edge} strokeWidth={strong ? 2.5 : 1}/>;
  const cup = cx => <g fill={tint} stroke={edge} strokeWidth='1.25'><path d={`M${cx - 34} 120 V240 H${cx + 34} V120 H${cx + 24} V232 H${cx - 24} V120 Z`}/><rect x={cx - 8} y='240' width='16' height='26'/></g>;
  const fill = cx => <rect x={cx - 24} y='164' width='48' height='68' fill={edge} fillOpacity='0.35' stroke={edge} strokeWidth='1'/>;
  const iron = cx => <polygon points={`${cx + 104},96 ${cx + 92},84 ${cx + 33},186 ${cx + 38},196`} fill={edge} fillOpacity='0.18' stroke={edge} strokeWidth='1.25'/>;
  const caption = (cx, a, b, c) => <g><text x={cx} y='298' textAnchor='middle' fontWeight='600' fill={ink}>{a}</text><text x={cx} y='318' textAnchor='middle' fontSize='11.5' fill={quiet}>{b}</text><text x={cx} y='334' textAnchor='middle' fontSize='11.5' fill={quiet}>{c}</text></g>;
  return <svg viewBox='0 0 760 370' role='img' aria-label='Fill the cup two-thirds, push the tinned wire in, hold still' fontSize='13'>
    <defs><marker id='cup-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={edge}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Fill the cup two-thirds, push the wire in, hold still</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Solder cup cut open, cup opening facing up</text>
    <g>{frame(cs[0], false)}{cup(cs[0])}{fill(cs[0])}{iron(cs[0])}
      <line x1={cs[0] - 76} y1='90' x2={cs[0] - 14} y2='150' stroke={edge} strokeWidth='5' strokeLinecap='round'/>
      <text x={cs[0] - 100} y='84' fontSize='11.5' fill={quiet}>solder</text>
      <text x={cs[0] + 44} y='226' fontSize='11.5' fill={quiet}>iron on</text><text x={cs[0] + 44} y='242' fontSize='11.5' fill={quiet}>the side</text>
      <path d={`M${cs[0] - 46} 164 H${cs[0] - 54} V232 H${cs[0] - 46}`} fill='none' stroke={edge} strokeWidth='1'/><text x={cs[0] - 60} y='202' textAnchor='end' fontSize='11.5' fill={quiet}>2/3</text>
      {caption(cs[0], '1 Fill the cup', 'Heat the cup from the side,', 'feed solder into it')}</g>
    <g>{frame(cs[1], false)}{cup(cs[1])}{fill(cs[1])}{iron(cs[1])}
      <rect x={cs[1] - 6} y='96' width='12' height='56' fill={edge} fillOpacity='0.3' stroke={edge} strokeWidth='1.25'/>
      <rect x={cs[1] - 9} y='76' width='18' height='20' fill={tint} stroke={edge} strokeWidth='1.25'/>
      <path d={`M${cs[1] - 40} 92 V146`} fill='none' stroke={edge} strokeWidth='1.5' markerEnd='url(#cup-arrow)'/>
      <text x={cs[1] - 48} y='110' textAnchor='end' fontSize='11.5' fill={quiet}>tinned</text><text x={cs[1] - 48} y='126' textAnchor='end' fontSize='11.5' fill={quiet}>wire in</text>
      <text x={cs[1] + 40} y='226' fontSize='11.5' fill={quiet}>molten</text>
      {caption(cs[1], '2 Melt, slide in', 'Wire straight down, iron off,', 'hold still for 3 seconds')}</g>
    <g>{frame(cs[2], true)}{cup(cs[2])}
      <path d={`M${cs[2] - 24} 128 Q${cs[2] - 22} 152 ${cs[2] - 15} 152 Q${cs[2] - 8} 152 ${cs[2] - 6} 134 L${cs[2] + 6} 134 Q${cs[2] + 8} 152 ${cs[2] + 15} 152 Q${cs[2] + 22} 152 ${cs[2] + 24} 128 V232 H${cs[2] - 24} Z`} fill={edge} fillOpacity='0.35' stroke={edge} strokeWidth='1.25'/>
      <rect x={cs[2] - 6} y='108' width='12' height='116' fill='none' stroke={edge} strokeWidth='1.25'/>
      <rect x={cs[2] - 9} y='76' width='18' height='32' fill={tint} stroke={edge} strokeWidth='1.25'/>
      <path d={`M${cs[2] + 16} 108 H${cs[2] + 46} M${cs[2] + 38} 120 H${cs[2] + 46}`} fill='none' stroke={edge} strokeWidth='1'/>
      <text x={cs[2] + 52} y='112' fontSize='11.5' fill={quiet}>1 mm gap</text><text x={cs[2] + 52} y='128' fontSize='11.5' fill={quiet}>to the rim</text>
      <text x={cs[2] + 42} y='176' fontSize='11.5' fill={quiet}>concave</text><text x={cs[2] + 42} y='192' fontSize='11.5' fill={quiet}>meniscus</text>
      {caption(cs[2], '3 Pass look', 'Cup full, solder hugs the wire,', 'nothing on the outside')}</g>
  </svg>;
};
