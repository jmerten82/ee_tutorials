export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const part = (x, y, w, t, drop) => <g>
    <rect x={x} y={y - 12} width={w} height='24' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x={x + w / 2} y={y + 4} textAnchor='middle' fontSize='11.5' fill={ink}>{t}</text>
    <text x={x + w / 2} y={y - 20} textAnchor='middle' fontSize='11' fontWeight='600' fill={ink}>{drop}</text>
  </g>;
  // voltage staircase along the path
  const steps = [[60, 12.0], [150, 12.0], [190, 11.97], [280, 11.94], [330, 11.92], [430, 11.86], [520, 11.86]];
  const X = x => x, Y = v => 470 - (v - 11.6) * 400;
  let d = `M${X(60)} ${Y(12.0)}`;
  const seg = [[60, 12.0], [130, 12.0], [150, 11.99], [190, 11.99], [210, 11.96], [280, 11.96], [300, 11.93], [380, 11.93], [400, 11.88], [470, 11.88], [490, 11.84], [560, 11.84], [580, 11.80], [690, 11.80]];
  seg.forEach(([x, v], i) => { if (i) d += `L${X(x)} ${Y(v).toFixed(1)}`; });
  void steps;
  return <svg viewBox='0 0 760 480' role='img' aria-label='Where the voltage goes between supply and load' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Where the voltage goes</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Every wire, contact and the fuse takes a share. Example: 4 A, 1 m of 18 AWG each way; values illustrative</text>
    <rect x='24' y='90' width='70' height='130' rx='5' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='59' y='150' textAnchor='middle' fontWeight='600' fill={ink}>12 V</text>
    <text x='59' y='166' textAnchor='middle' fontSize='11' fill={quiet}>supply</text>
    <path d='M94 110H130' stroke={ink} strokeWidth='2.5'/>
    {part(130, 110, 60, 'jack', '20 mV')}
    <path d='M190 110H210' stroke={ink} strokeWidth='2.5'/>
    {part(210, 110, 70, 'rocker', '30 mV')}
    <path d='M280 110H300' stroke={ink} strokeWidth='2.5'/>
    {part(300, 110, 80, 'fuse', '30 mV')}
    <path d='M380 110H400' stroke={ink} strokeWidth='2.5'/>
    {part(400, 110, 90, '1 m 18 AWG +', '84 mV')}
    <path d='M490 110H600V140' stroke={ink} strokeWidth='2.5' fill='none'/>
    <rect x='600' y='140' width='110' height='60' rx='5' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='655' y='168' textAnchor='middle' fontWeight='600' fill={ink}>Load</text>
    <text x='655' y='184' textAnchor='middle' fontSize='11' fill={quiet}>4 A</text>
    <path d='M655 200V220H490' stroke={ink} strokeWidth='2.5' fill='none'/>
    {part(400, 220, 90, '1 m 18 AWG −', '84 mV')}
    <path d='M400 220H94' stroke={ink} strokeWidth='2.5'/>
    <text x='60' y='290' fontWeight='600' fill={ink}>Voltage seen along the path, plus minus return (12 V scale enlarged)</text>
    <line x1='60' x2='690' y1={Y(12.0)} y2={Y(12.0)} stroke={rule} strokeWidth='1' strokeDasharray='4 4'/>
    <path d={d} fill='none' stroke={ink} strokeWidth='2'/>
    <text x='56' y={Y(12.0) + 4} textAnchor='end' fontSize='11' fill={ink}>12.00</text>
    <text x='694' y={Y(11.80) + 4} fontSize='11' fill={ink}>11.80 V</text>
    <text x='60' y='434' fontSize='11.5' fill={ink}>Total here about 0.25 V: harmless at 12 V. The same 0.25 V on a 5 V USB rail leaves 4.75 V, the edge of the USB limit.</text>
    <text x='60' y='454' fontSize='11.5' fill={ink}>So: carry power at 12 V, make 5 V close to the hub, keep 5 V wires short and thick.</text>
  </svg>;
};
