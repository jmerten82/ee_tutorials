export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const Y = mA => 390 - (Math.log10(mA) + 3) * 50;
  const X = t => 140 + t * 75;
  const spikes = (x0, scale, ts, xEnd) => ts.map(t => x0 + t * scale).filter(x => x + 4 < xEnd)
    .map(x => `H${x.toFixed(1)}V${Y(240).toFixed(1)}H${(x + 4).toFixed(1)}V${Y(120).toFixed(1)}`).join('');
  const ts = [0.6, 1.1, 1.5, 1.9, 2.4, 2.8];
  const active = `M120 ${Y(0.01)}H${X(0)}V${Y(45)}H${X(0.3)}V${Y(120)}${spikes(140, 75, ts, X(3))}H${X(3)}V${Y(0.01)}H530`;
  const next = `M550 ${Y(0.01)}H610V${Y(45)}H632.5V${Y(120)}${spikes(610, 75, ts, 720)}H720`;
  const decades = [0.001, 0.01, 0.1, 1, 10, 100, 1000];
  return <svg viewBox='0 0 760 540' role='img' aria-label='Deep sleep: short bursts of current, long quiet gaps' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Deep sleep: short bursts of current, long quiet gaps</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Lesson 6. Typical wake, measure, send, sleep cycle; current on a log scale, values approximate</text>
    {decades.map(d => <g key={d}>
      <line x1='120' x2='720' y1={Y(d)} y2={Y(d)} stroke={rule} strokeWidth='1' strokeDasharray={d === 0.001 ? '' : '2 4'}/>
      <text x='112' y={Y(d) + 4} textAnchor='end' fontSize='11.5' fill={ink}>{String(d)}</text>
    </g>)}
    <text transform='translate(40 240) rotate(-90)' textAnchor='middle' fontSize='11.5' fill={quiet}>current (mA), log scale</text>
    <rect x='120' y={Y(15)} width='20' height={Y(5) - Y(15)} fill={tint}/>
    <rect x={X(3)} y={Y(15)} width={530 - X(3)} height={Y(5) - Y(15)} fill={tint}/>
    <rect x='550' y={Y(15)} width='60' height={Y(5) - Y(15)} fill={tint}/>
    <g fill='none' stroke={ink} strokeWidth='1.5' strokeDasharray='6 4'>
      <path d={`M120 ${Y(10)}H${X(0)}`}/>
      <path d={`M${X(3)} ${Y(10)}H530`}/>
      <path d={`M550 ${Y(10)}H610`}/>
    </g>
    <path d={active} fill='none' stroke={ink} strokeWidth='2'/>
    <path d={next} fill='none' stroke={ink} strokeWidth='2'/>
    <text x='150' y='108' fontSize='11.5' fill={ink}>Wi-Fi on: ≈ 2.7 s at ≈ 120 mA, TX peaks ≈ 240 mA</text>
    <text x='612' y='108' fontSize='11.5' fill={ink}>next wake</text>
    <text x='170' y='176' fontSize='11.5' fill={ink}>← boot: 0.3 s at ≈ 45 mA</text>
    <text x='380' y='174' fontWeight='600' fill={ink}>DevKitC board asleep: ≈ 5–15 mA</text>
    <text x='380' y='222' fontSize='11.5' fill={quiet}>LDO + USB-UART bridge + power LED</text>
    <text x='380' y='330' fontWeight='600' fill={ink}>bare module asleep: ≈ 0.01 mA</text>
    <text x='380' y='366' fontSize='11.5' fill={quiet}>10 µA, RTC timer running</text>
    <line x1='120' x2='720' y1='390' y2='390' stroke={ink} strokeWidth='1.5'/>
    <rect x='532' y='380' width='16' height='20' fill='#ffffff'/>
    <line x1='528' x2='538' y1='398' y2='382' stroke={ink} strokeWidth='1.5'/>
    <line x1='542' x2='552' y1='398' y2='382' stroke={ink} strokeWidth='1.5'/>
    {[0, 1, 2, 3].map(t => <g key={t}>
      <line x1={X(t)} x2={X(t)} y1='390' y2='396' stroke={ink} strokeWidth='1.5'/>
      <text x={X(t)} y='410' textAnchor='middle' fontSize='11.5' fill={ink}>{`${t} s`}</text>
    </g>)}
    <line x1='610' x2='610' y1='390' y2='396' stroke={ink} strokeWidth='1.5'/>
    <text x='610' y='410' textAnchor='middle' fontSize='11.5' fill={ink}>600 s</text>
    <text x='540' y='424' textAnchor='middle' fontSize='11.5' fill={quiet}>(10 min gap cut)</text>
    <text x='24' y='452' fontWeight='600' fill={ink}>I_avg = (I_active × t_active + I_sleep × t_sleep) / T</text>
    <text x='24' y='474' fontSize='11.5' fill={ink}>Example: wake every 10 min (T = 600 s); one wake ≈ 0.3 s × 45 mA + 2.7 s × 120 mA ≈ 340 mA·s.</text>
    <text x='24' y='492' fontSize='11.5' fill={ink}>Bare module: (340 + 0.01 × 597) / 600 ≈ 0.58 mA, so a 2000 mAh cell lasts ≈ 140 days.</text>
    <text x='24' y='510' fontSize='11.5' fill={ink}>DevKitC: (340 + 10 × 597) / 600 ≈ 10.5 mA, so the same cell lasts ≈ 8 days.</text>
    <text x='24' y='528' fontSize='11.5' fill={quiet}>Ideal cell, no regulator losses: real life is shorter. Measure your own board in Lesson 6.</text>
  </svg>;
};
