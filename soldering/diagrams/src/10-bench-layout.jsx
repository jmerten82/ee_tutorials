// Lesson 0: bench layout, top view, right-handed.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)';
  const label = (x, y, bold, sub, anchor) => <g><text x={x} y={y} textAnchor={anchor || 'middle'} fontWeight='600' fill={ink}>{bold}</text>{sub ? <text x={x} y={y + 16} textAnchor={anchor || 'middle'} fontSize='11.5' fill={quiet}>{sub}</text> : null}</g>;
  return <svg viewBox='0 0 760 470' role='img' aria-label='Bench layout seen from above, for a right-handed person' fontSize='13'>
    <defs><marker id='bench-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={edge}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Set the bench up the same way every time</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Top view for a right-handed person; left-handers mirror it</text>
    <rect x='40' y='70' width='540' height='300' rx='10' fill='none' stroke={edge} strokeWidth='1.5' strokeDasharray='8 5'/>
    <text x='52' y='88' fontSize='11.5' fill={quiet}>silicone mat</text>
    <rect x='350' y='84' width='120' height='50' rx='6' fill={tint} stroke={edge} strokeWidth='1.25'/>
    {label(410, 105, 'Extractor', 'behind, to the side')}
    <path d='M330 194 Q340 160 368 140' fill='none' stroke={edge} strokeWidth='1.25' strokeDasharray='4 4' markerEnd='url(#bench-arrow)'/>
    <text x='326' y='160' textAnchor='end' fontSize='11.5' fill={quiet}>smoke pulled away</text>
    <rect x='240' y='196' width='140' height='66' rx='4' fill={tint} stroke={edge} strokeWidth='2'/>
    <rect x='270' y='214' width='80' height='30' fill='none' stroke={edge} strokeWidth='1.25'/>
    {label(310, 286, 'Holder', 'work in the centre')}
    <circle cx='120' cy='220' r='34' fill={tint} stroke={edge} strokeWidth='1.25'/>
    <circle cx='120' cy='220' r='12' fill='none' stroke={edge} strokeWidth='1.25'/>
    {label(120, 274, 'Solder', 'spool')}
    <rect x='160' y='308' width='70' height='14' rx='5' fill={tint} stroke={edge} strokeWidth='1.25'/>
    {label(196, 344, 'Flux')}
    <rect x='60' y='96' width='70' height='56' rx='6' fill='none' stroke={edge} strokeWidth='1.25'/>
    {label(95, 120, 'Waste', 'jar')}
    <rect x='470' y='214' width='80' height='86' rx='8' fill={tint} stroke={edge} strokeWidth='1.25'/>
    <line x1='490' y1='286' x2='536' y2='226' stroke={edge} strokeWidth='6' strokeLinecap='round'/>
    {label(510, 320, 'Iron stand', 'iron lives here')}
    <circle cx='530' cy='140' r='22' fill='none' stroke={edge} strokeWidth='1.25'/>
    <path d='M516 136 q7 -8 14 0 t14 0 M516 146 q7 -8 14 0 t14 0' fill='none' stroke={edge} strokeWidth='1'/>
    {label(530, 186, 'Brass wool')}
    <rect x='226' y='330' width='54' height='130' rx='26' fill='none' stroke={edge} strokeWidth='1.5'/>
    <rect x='340' y='330' width='54' height='130' rx='26' fill='none' stroke={edge} strokeWidth='1.5'/>
    <text x='408' y='420' fontWeight='600' fill={ink}>Forearms</text>
    <text x='408' y='436' fontSize='11.5' fill={quiet}>rest on the bench edge</text>
    <text x='604' y='96' fontWeight='600' fill={ink}>Why</text>
    <text x='604' y='118' fontSize='11.5' fill={quiet}>Iron on the side</text>
    <text x='604' y='134' fontSize='11.5' fill={quiet}>of the hand that</text>
    <text x='604' y='150' fontSize='11.5' fill={quiet}>holds it, so the</text>
    <text x='604' y='166' fontSize='11.5' fill={quiet}>hot tip never</text>
    <text x='604' y='182' fontSize='11.5' fill={quiet}>crosses your arm.</text>
    <text x='604' y='214' fontSize='11.5' fill={quiet}>Solder and flux</text>
    <text x='604' y='230' fontSize='11.5' fill={quiet}>on the other side,</text>
    <text x='604' y='246' fontSize='11.5' fill={quiet}>for the free hand.</text>
    <text x='604' y='278' fontSize='11.5' fill={quiet}>Anchored wrists</text>
    <text x='604' y='294' fontSize='11.5' fill={quiet}>give precision;</text>
    <text x='604' y='310' fontSize='11.5' fill={quiet}>hovering hands</text>
    <text x='604' y='326' fontSize='11.5' fill={quiet}>shake.</text>
  </svg>;
};
