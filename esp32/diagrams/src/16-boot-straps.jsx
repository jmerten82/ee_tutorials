// What the ESP32 samples at reset: the strapping pins and the two boot modes.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const trace = (d, k) => <path key={k} d={d} fill='none' stroke={ink} strokeWidth='2.5'/>;
  const rows = [
    ['GPIO0', 'pull-up', 'high: run sketch; low: download', 'stuck in download mode, sketch never starts'],
    ['GPIO2', 'pull-down', 'low or open to upload', '"Failed to connect" during upload'],
    ['GPIO5', 'pull-up', 'high (leave it)', 'rarely matters (SDIO timing)'],
    ['GPIO12', 'pull-down', 'LOW, always', 'flash runs at 1.8 V: boot loop, flash errors'],
    ['GPIO15', 'pull-up', 'high (leave it)', 'low only silences the boot log'],
  ];
  const cx = [24, 104, 194, 404], ty = 262, rh = 30;
  return <svg viewBox='0 0 760 478' role='img' aria-label='Strapping pins and boot modes of the ESP32' fontSize='13'>
    <defs><marker id='strap-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Boot modes: the chip reads five pins the moment EN goes high</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The upload tool, the BOOT button and anything you wire to these pins all act through this one instant</text>

    <text x='24' y='92' fontWeight='600' fill={ink}>EN</text>
    {trace('M80 80H170V104H260V80H460', 'en')}
    <text x='215' y='120' textAnchor='middle' fontSize='11.5' fill={quiet}>reset</text>
    <text x='24' y='150' fontWeight='600' fill={ink}>GPIO0</text>
    <text x='24' y='166' fontSize='11.5' fill={quiet}>upload</text>
    {trace('M80 140H200V164H310V140H460', 'g0a')}
    <text x='24' y='206' fontWeight='600' fill={ink}>GPIO0</text>
    <text x='24' y='222' fontSize='11.5' fill={quiet}>normal</text>
    {trace('M80 196H460', 'g0b')}
    <line x1='260' x2='260' y1='70' y2='236' stroke={ink} strokeWidth='1.25' strokeDasharray='4 3'/>
    <text x='266' y='240' fontSize='11.5' fontWeight='600' fill={ink}>straps latched</text>
    <path d='M470 152H500' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#strap-arrow)'/>
    <rect x='504' y='130' width='232' height='44' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='516' y='150' fontWeight='600' fill={ink}>Download mode</text>
    <text x='516' y='166' fontSize='11.5' fill={ink}>waits for the uploader</text>
    <path d='M470 202H500' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#strap-arrow)'/>
    <rect x='504' y='184' width='232' height='44' rx='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='516' y='204' fontWeight='600' fill={ink}>Normal boot</text>
    <text x='516' y='220' fontSize='11.5' fill={ink}>loads your sketch from flash</text>
    <text x='504' y='86' fontSize='11.5' fill={quiet}>The bridge does this for you:</text>
    <text x='504' y='102' fontSize='11.5' fill={quiet}>DTR/RTS pull EN and GPIO0 low.</text>
    <text x='504' y='118' fontSize='11.5' fill={quiet}>By hand: hold BOOT, tap EN.</text>

    <rect x='24' y={ty} width='712' height={rh} fill={ink}/>
    {['Pin', 'Pull at reset', 'Level it needs at reset', 'If it is wrong'].map((t, i) => <text key={i} x={cx[i] + 8} y={ty + 20} fontWeight='600' fill='#ffffff'>{t}</text>)}
    {rows.map((r, j) => <g key={j}>
      <rect x='24' y={ty + rh * (j + 1)} width='712' height={rh} fill={j === 3 ? tint : '#ffffff'} stroke={ink} strokeWidth='1'/>
      {r.map((t, i) => <text key={i} x={cx[i] + 8} y={ty + rh * (j + 1) + 20} fontSize={i === 0 ? '13' : '11.5'} fontWeight={i === 0 || (j === 3 && i === 2) ? '600' : '400'} fill={ink}>{t}</text>)}
    </g>)}
    {cx.slice(1).map((x, i) => <line key={i} x1={x} x2={x} y1={ty} y2={ty + rh * 6} stroke={ink} strokeWidth='1'/>)}
    <text x='24' y='466' fontSize='11.5' fill={quiet}>GPIO12 is the dangerous one: a pull-up, or a sensor that drives it high, makes a WROOM board reboot forever.</text>
  </svg>;
};
