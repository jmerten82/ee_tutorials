export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const key = (x, y, label, w) => <g>
    <rect x={x} y={y} width={w || 52} height='20' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.2'/>
    <text x={x + (w || 52) / 2} y={y + 14} textAnchor='middle' fontSize='10.5' fill={ink}>{label}</text>
  </g>;
  const knob = (x, y, label, note) => <g>
    <circle cx={x} cy={y} r='15' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <line x1={x} x2={x} y1={y - 15} y2={y - 6} stroke={ink} strokeWidth='1.5'/>
    <text x={x} y={y + 30} textAnchor='middle' fontSize='10.5' fontWeight='600' fill={ink}>{label}</text>
    {note ? <text x={x} y={y + 43} textAnchor='middle' fontSize='10' fill={quiet}>{note}</text> : null}
  </g>;
  const group = (x, y, w, ht, title) => <g>
    <rect x={x} y={y} width={w} height={ht} rx='6' fill='none' stroke={rule} strokeWidth='1' strokeDasharray='5 4'/>
    <text x={x + 8} y={y + 15} fontSize='11.5' fontWeight='600' fill={ink}>{title}</text>
  </g>;
  return <svg viewBox='0 0 760 560' role='img' aria-label='The SDS804X HD front panel, grouped by function' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The SDS804X HD front panel, by function</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Groups of controls, not exact positions or a complete list: use the labels printed on your panel</text>
    <rect x='20' y='64' width='720' height='470' rx='10' fill='none' stroke={ink} strokeWidth='2'/>
    <rect x='36' y='80' width='330' height='220' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='201' y='180' textAnchor='middle' fontWeight='600' fill={ink}>7-inch touch screen</text>
    <text x='201' y='198' textAnchor='middle' fontSize='11.5' fill={quiet}>drag, pinch, tap the descriptor boxes</text>
    {group(380, 80, 344, 72, 'Shortcut keys')}
    {key(390, 100, 'Auto Setup', 74)}{key(470, 100, 'Default')}{key(528, 100, 'Touch')}{key(586, 100, 'Acquire')}{key(644, 100, 'Cursors', 70)}
    {key(390, 124, 'Measure', 74)}{key(470, 124, 'quick save', 70)}{key(546, 124, 'Run/Stop', 70)}
    <text x='626' y='138' fontSize='10.5' fill={quiet}>and others</text>
    {group(380, 160, 120, 140, 'Universal knob')}
    {knob(440, 218, 'turn: set value', 'push: select')}
    {group(510, 160, 214, 140, 'Trigger')}
    {key(520, 182, 'Setup')}{key(576, 182, 'Auto')}{key(520, 206, 'Normal')}{key(576, 206, 'Single')}
    {knob(670, 210, 'Level', 'push: 50 %')}
    {group(36, 312, 330, 140, 'Vertical')}
    {key(46, 334, '1', 34)}{key(84, 334, '2', 34)}{key(122, 334, '3', 34)}{key(160, 334, '4', 34)}
    {key(46, 358, 'Math', 50)}{key(100, 358, 'Ref', 44)}{key(148, 358, 'Digital', 52)}
    {knob(256, 350, 'Scale (V/div)', 'push: fine')}
    {knob(332, 350, 'Position', 'push: zero')}
    <text x='46' y='406' fontSize='10.5' fill={quiet}>A channel key turns the channel on</text>
    <text x='46' y='420' fontSize='10.5' fill={quiet}>and selects it for the knobs;</text>
    <text x='46' y='434' fontSize='10.5' fill={quiet}>press it again to turn it off.</text>
    {group(380, 312, 344, 140, 'Horizontal')}
    {key(390, 334, 'Roll')}{key(390, 358, 'Zoom')}
    {knob(510, 362, 'Scale (time/div)', 'push: zoom window')}
    {knob(640, 362, 'Position (delay)', 'push: zero')}
    {group(36, 462, 688, 62, 'Inputs and connectors')}
    {[0, 1, 2, 3].map(i => <g key={i}>
      <circle cx={70 + i * 70} cy={500} r='13' fill='#ffffff' stroke={ink} strokeWidth='2'/>
      <circle cx={70 + i * 70} cy={500} r='4' fill={ink}/>
      <text x={92 + i * 70} y={504} fontSize='10.5' fill={ink}>{'CH' + (i + 1)}</text>
    </g>)}
    <rect x='350' y='486' width='26' height='14' fill='#ffffff' stroke={ink} strokeWidth='1.2'/>
    <circle cx='363' cy='512' r='4' fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='384' y='498' fontSize='10.5' fill={ink}>probe compensation 1 kHz, 3 V</text>
    <text x='384' y='515' fontSize='10.5' fill={ink}>and ground terminal</text>
    <text x='600' y='498' fontSize='10.5' fill={ink}>USB host, SBUS,</text>
    <text x='600' y='515' fontSize='10.5' fill={ink}>power switch</text>
  </svg>;
};
