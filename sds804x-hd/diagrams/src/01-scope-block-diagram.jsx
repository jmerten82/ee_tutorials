export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const box = (x, y, w, ht, title, l1, l2, shaded) => <g>
    <rect x={x} y={y} width={w} height={ht} rx='6' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + w / 2} y={y + 24} textAnchor='middle' fontWeight='600' fill={ink}>{title}</text>
    {l1 ? <text x={x + w / 2} y={y + 42} textAnchor='middle' fontSize='11.5' fill={quiet}>{l1}</text> : null}
    {l2 ? <text x={x + w / 2} y={y + 57} textAnchor='middle' fontSize='11.5' fill={quiet}>{l2}</text> : null}
  </g>;
  const arrow = d => <path d={d} fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#blk-arrow)'/>;
  return <svg viewBox='0 0 760 420' role='img' aria-label='Inside a digital oscilloscope' fontSize='13'>
    <defs><marker id='blk-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Inside a digital oscilloscope</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The signal path, left to right; the trigger decides which part of the stream is shown</text>
    <rect x='120' y='72' width='200' height='130' rx='8' fill='none' stroke={rule} strokeWidth='1' strokeDasharray='5 4'/>
    <text x='220' y='88' textAnchor='middle' fontSize='11.5' fill={quiet}>vertical system</text>
    {box(20, 100, 84, 74, 'Probe', '10 : 1', 'divider')}
    {box(134, 100, 172, 74, 'Attenuator + amp', 'V/div, offset, coupling,', '20 MHz BW limit')}
    {box(340, 100, 120, 74, 'ADC', '12 bit', 'samples', true)}
    {box(494, 100, 120, 74, 'Memory', 'up to 50 Mpts', '(10 Mpts × 4 ch)')}
    {box(640, 100, 100, 74, 'Screen', 'grid, math,', 'measurements')}
    {arrow('M104 137H132')}
    {arrow('M306 137H338')}
    {arrow('M460 137H492')}
    {arrow('M614 137H638')}
    {box(340, 250, 120, 66, 'Sample clock', 'up to 2 GSa/s', null)}
    {arrow('M400 250V176')}
    <text x='392' y='226' textAnchor='end' fontSize='11.5' fill={quiet}>time/div sets</text>
    <text x='392' y='241' textAnchor='end' fontSize='11.5' fill={quiet}>the sample rate</text>
    {box(494, 250, 140, 66, 'Trigger', 'level, slope, type,', 'mode')}
    {arrow('M440 176C470 200 520 210 540 248')}
    <text x='500' y='238' textAnchor='end' fontSize='11.5' fill={quiet}>watches samples</text>
    {arrow('M580 250V176')}
    <text x='588' y='226' fontSize='11.5' fill={quiet}>"keep this part"</text>
    <rect x='120' y='340' width='520' height='58' rx='6' fill={tint}/>
    <text x='380' y='364' textAnchor='middle' fill={ink}>memory used = sample rate × time on screen (10 div × time/div)</text>
    <text x='380' y='384' textAnchor='middle' fontSize='11.5' fill={quiet}>Slow timebase + limited memory = lower sample rate. Check it in the timebase box.</text>
  </svg>;
};
