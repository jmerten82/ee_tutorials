export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  // one square-wave cycle and a half, drawn with a corner shape: k < 0 rounded, k = 0 square, k > 0 overshoot
  const wave = (ox, k) => {
    const top = 110, bot = 200, w = 70;
    let d = `M${ox} ${bot}`;
    for (let c = 0; c < 3; c++) {
      const x = ox + c * w;
      const up = c % 2 === 0;
      const lvl = up ? top : bot, from = up ? bot : top;
      d += `L${x} ${lvl + (up ? 1 : -1) * (k < 0 ? 40 : 0) - (up ? 1 : -1) * (k > 0 ? 16 : 0)}`;
      for (let i = 1; i <= 12; i++) {
        const t = i / 12, e = Math.exp(-t * 5);
        const off = k < 0 ? 40 * e : k > 0 ? -16 * e : 0;
        d += `L${(x + t * w * 0.5).toFixed(1)} ${(lvl + (up ? 1 : -1) * off).toFixed(1)}`;
      }
      d += `L${x + w} ${lvl}`;
      void from;
    }
    return d;
  };
  const panel = (ox, title, sub, k) => <g>
    <rect x={ox - 14} y='86' width='236' height='140' rx='6' fill={k === 0 ? tint : 'none'} stroke={rule} strokeWidth='1'/>
    <path d={wave(ox, k)} fill='none' stroke={ink} strokeWidth='2'/>
    <text x={ox + 104} y='254' textAnchor='middle' fontWeight='600' fill={ink}>{title}</text>
    <text x={ox + 104} y='272' textAnchor='middle' fontSize='11.5' fill={quiet}>{sub}</text>
  </g>;
  return <svg viewBox='0 0 760 310' role='img' aria-label='Probe compensation: under, correct and over' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Probe compensation on the 1 kHz calibration signal</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Turn the probe's trimmer with a non-metallic screwdriver until the corners are square</text>
    {panel(38, 'Under-compensated', 'rounded, creeping corners', -1)}
    {panel(288, 'Correct', 'flat tops, square corners', 0)}
    {panel(538, 'Over-compensated', 'spikes at every corner', 1)}
    <text x='24' y='298' fontSize='11.5' fill={ink}>Compensate each probe on the channel it will be used with, and keep it there.</text>
  </svg>;
};
