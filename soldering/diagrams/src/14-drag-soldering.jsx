// Lesson 4, Exercise 4.3: drag soldering a fine-pitch row, top view.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)';
  const pins = Array.from({ length: 12 }, (_, i) => 92 + i * 32);
  const bw = 128, by = 352, bh = 64; const bx = i => 24 + i * 146;
  const steps = [['1 Tack corners', 'Alignment perfect', 'before you go on'], ['2 Flood flux', 'Whole pin row,', 'be generous'], ['3 Load the tip', 'Hoof or bevel,', 'moderate bead'], ['4 Drag slowly', 'Along the pad tips,', 'about 1 mm/s'], ['5 Check', 'Loupe, then meter', 'every pin pair']];
  return <svg viewBox='0 0 760 430' role='img' aria-label='Drag a loaded hoof tip slowly along the pad tips through plenty of flux' fontSize='13'>
    <defs><marker id='drag-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={edge}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Drag a loaded tip slowly along the pad tips, through plenty of flux</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>TSSOP, 0.65 mm pitch, top view of one pin row</text>
    <rect x='76' y='70' width='388' height='92' rx='4' fill={tint} stroke={edge} strokeWidth='1.25'/>
    <circle cx='96' cy='90' r='6' fill='none' stroke={edge} strokeWidth='1.25'/>
    <text x='180' y='126' textAnchor='middle' fontWeight='600' fill={ink}>IC body</text>
    <text x='110' y='94' fontSize='11.5' fill={quiet}>pin 1</text>
    <g>{pins.map(x => <rect key={x} x={x - 3} y='172' width='18' height='46' fill='none' stroke={edge} strokeWidth='1.25'/>)}</g>
    <g>{pins.map((x, i) => <path key={'p' + x} d={`M${x} 162 V200 H${x + 12} V162`} fill={edge} fillOpacity={i < 6 ? 0.6 : 0.25} stroke={edge} strokeWidth='1.25'/>)}</g>
    <g>{pins.slice(0, 6).map(x => <path key={'f' + x} d={`M${x - 2} 200 Q${x + 6} 214 ${x + 14} 200 Z`} fill={edge} fillOpacity='0.6' stroke={edge} strokeWidth='1'/>)}</g>
    <rect x='70' y='166' width='400' height='60' rx='8' fill='none' stroke={edge} strokeWidth='1.25' strokeDasharray='6 4'/>
    <text x='70' y='244' fontSize='11.5' fill={quiet}>dashed: flood with gel flux</text>
    <text x='70' y='260' fontSize='11.5' fill={quiet}>left half done: a fillet on every pin</text>
    <polygon points='278,204 312,198 322,222 296,232' fill={edge} fillOpacity='0.18' stroke={edge} strokeWidth='1.5'/>
    <polygon points='312,198 322,222 420,316 432,300' fill={edge} fillOpacity='0.18' stroke={edge} strokeWidth='1.25'/>
    <text x='440' y='300' fontWeight='600' fill={ink}>Hoof tip</text>
    <text x='440' y='316' fontSize='11.5' fill={quiet}>touches pin feet at the pad tips</text>
    <path d='M296 148 H420' fill='none' stroke={edge} strokeWidth='2' markerEnd='url(#drag-arrow)'/>
    <text x='296' y='136' fontSize='11.5' fill={quiet}>drag, about 1 mm/s</text>
    <rect x='510' y='70' width='226' height='190' rx='8' fill='none' stroke={edge} strokeWidth='1'/>
    <text x='524' y='92' fontWeight='600' fill={ink}>Bridge? Normal at first</text>
    <path d='M556 110 V176 H568 V110 M596 110 V176 H608 V110' fill={edge} fillOpacity='0.25' stroke={edge} strokeWidth='1.25'/>
    <ellipse cx='582' cy='160' rx='22' ry='9' fill={edge} fillOpacity='0.6' stroke={edge} strokeWidth='1.25'/>
    <path d='M640 160 H700' fill='none' stroke={edge} strokeWidth='1.5' markerEnd='url(#drag-arrow)'/><text x='640' y='148' fontSize='11.5' fill={quiet}>clean tip</text>
    <text x='524' y='208' fontSize='11.5' fill={quiet}>Add flux, then drag a clean</text>
    <text x='524' y='224' fontSize='11.5' fill={quiet}>tip off the end of the row,</text>
    <text x='524' y='240' fontSize='11.5' fill={quiet}>or lay braid over it.</text>
    <g fill='none' stroke={edge} strokeWidth='1.25'>{[0, 1, 2, 3].map(i => <path key={i} d={`M${bx(i) + bw} ${by + 32}H${bx(i + 1)}`} markerEnd='url(#drag-arrow)'/>)}</g>
    <g>{steps.map((s, i) => <g key={i}><rect x={bx(i)} y={by} width={bw} height={bh} rx='8' fill='none' stroke={edge} strokeWidth='1.25'/><text x={bx(i) + 64} y={by + 22} textAnchor='middle' fontWeight='600' fill={ink}>{s[0]}</text><text x={bx(i) + 64} y={by + 40} textAnchor='middle' fontSize='11.5' fill={quiet}>{s[1]}</text><text x={bx(i) + 64} y={by + 56} textAnchor='middle' fontSize='11.5' fill={quiet}>{s[2]}</text></g>)}</g>
  </svg>;
};
