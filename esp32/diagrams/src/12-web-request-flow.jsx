export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const B = 130, R = 370, E = 600;
  const rows = [
    [140, 'msg', E, R, 'WiFi.begin(ssid, password)'],
    [178, 'msg', R, E, 'DHCP: your IP is 192.168.1.42'],
    [216, 'self', E, E, 'MDNS.begin("esp32");  server.begin();'],
    [254, 'msg', B, E, 'mDNS: who is esp32.local?'],
    [292, 'msg', E, B, 'esp32.local = 192.168.1.42'],
    [330, 'msg', B, E, 'GET /'],
    [368, 'self', E, E, 'handleRoot(): read BME280, build HTML'],
    [406, 'msg', E, B, '200 OK, text/html'],
    [444, 'self', B, B, 'user taps “Toggle LED”'],
    [482, 'msg', B, E, 'POST /toggle  (form button)'],
    [520, 'self', E, E, 'handleToggle(): flip GPIO25'],
    [558, 'msg', E, B, '303 See Other, Location: /'],
    [596, 'msg', B, E, 'GET /  (follows the redirect)'],
    [634, 'msg', E, B, '200 OK, updated page'],
  ];
  const heads = [[B, 'Phone or laptop', 'web browser'], [R, 'Wi-Fi router', 'access point + DHCP'], [E, 'ESP32', 'WebServer on port 80']];
  return <svg viewBox='0 0 760 740' role='img' aria-label='One page view, step by step' fontSize='13'>
    <defs><marker id='web-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='7' markerHeight='7' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>One page view, step by step</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Lesson 5. Browser and ESP32 talk through the router; time runs downwards</text>
    {heads.map(([x, a, b]) => <g key={a}>
      <line x1={x} x2={x} y1='110' y2='656' stroke={edge} strokeWidth='1.5' strokeDasharray='5 5'/>
      <rect x={x - 82} y='66' width='164' height='44' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
      <text x={x} y='85' textAnchor='middle' fontWeight='600' fill={ink}>{a}</text>
      <text x={x} y='101' textAnchor='middle' fontSize='11.5' fill={quiet}>{b}</text>
    </g>)}
    {rows.map(([y, kind, from, to, label], i) => <g key={y}>
      <circle cx='24' cy={y} r='10' fill={ink}/>
      <text x='24' y={y + 4} textAnchor='middle' fontSize='11.5' fontWeight='600' fill='#ffffff'>{i + 1}</text>
      {kind === 'msg'
        ? <g>
          <line x1={from} x2={to + (to > from ? -2 : 2)} y1={y} y2={y} stroke={ink} strokeWidth='1.5' markerEnd='url(#web-arrow)'/>
          <text x={Math.min(from, to) + 24} y={y - 7} fill={ink}>{label}</text>
        </g>
        : <g>
          <rect x={from === E ? 456 : 44} y={y - 18} width={from === E ? 290 : 172} height='26' rx='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
          <text x={from === E ? 601 : 130} y={y - 1} textAnchor='middle' fontSize='11.5' fill={ink}>{label}</text>
        </g>}
    </g>)}
    <rect x='24' y='672' width='712' height='52' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='38' y='693' fontWeight='600' fill={ink}>loop() keeps calling server.handleClient()</text>
    <text x='38' y='712' fontSize='11.5' fill={ink}>Steps 6–14 only happen inside that call. A long delay() in loop() makes every page load wait.</text>
  </svg>;
};
