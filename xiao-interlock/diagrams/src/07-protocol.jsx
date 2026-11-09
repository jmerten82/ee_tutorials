export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const L = 150, R = 610;
  const msg = (y, toRight, text, note) => <g>
    <path d={toRight ? `M${L} ${y}H${R - 2}` : `M${R} ${y}H${L + 2}`} stroke={ink} strokeWidth='1.5' markerEnd='url(#xi-pr-arrow)'/>
    <text x={(L + R) / 2} y={y - 6} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{text}</text>
    {note ? <text x={toRight ? R + 10 : L - 10} y={y + 4} textAnchor={toRight ? 'start' : 'end'} fontSize='10.5' fill={quiet}>{note}</text> : null}
  </g>;
  return <svg viewBox='0 0 760 500' role='img' aria-label='Commands, replies and the heartbeat' fontSize='13'>
    <defs><marker id='xi-pr-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Commands, replies and the heartbeat</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>One line per message, ASCII, newline at the end. Time runs downwards</text>
    <rect x={L - 60} y='64' width='120' height='30' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x={L} y='84' textAnchor='middle' fontWeight='600' fill={ink}>Mac host</text>
    <rect x={R - 60} y='64' width='120' height='30' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x={R} y='84' textAnchor='middle' fontWeight='600' fill={ink}>XIAO</text>
    <line x1={L} x2={L} y1='94' y2='470' stroke={ink} strokeWidth='1' strokeDasharray='4 3'/>
    <line x1={R} x2={R} y1='94' y2='470' stroke={ink} strokeWidth='1' strokeDasharray='4 3'/>
    {msg(122, true, 'PING', 'every 200 ms')}
    {msg(146, false, 'OK PONG SAFE', '')}
    {msg(176, false, 'EVT STATE ARMED ready', 'key turned')}
    {msg(206, true, 'FIRE 150', '')}
    {msg(230, false, 'OK FIRE 150', '')}
    {msg(254, false, 'EVT STATE FIRING command', '')}
    {msg(284, false, 'EVT STATE ARMED pulse_done', '150 ms later')}
    {msg(314, true, 'FIRE 150', '')}
    {msg(338, false, 'ERR REARM', 'within 2 s')}
    {msg(368, true, 'PING', 'last one')}
    <rect x={L + 40} y='384' width={R - L - 80} height='40' fill={tint}/>
    <text x={(L + R) / 2} y='408' textAnchor='middle' fontSize='11.5' fill={ink}>host silent for 1 s: crash, unplugged cable, Mac asleep</text>
    {msg(452, false, 'EVT STATE SAFE host_lost', 'output off')}
    <text x='24' y='490' fontSize='11.5' fill={ink}>The controller never needs the host to be safe; it needs the host only to fire.</text>
  </svg>;
};
