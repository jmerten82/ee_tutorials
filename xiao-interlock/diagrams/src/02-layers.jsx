export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const layer = (y, n, title, does, cannot, shaded) => <g>
    <rect x='24' y={y} width='712' height='96' rx='8' fill={shaded ? tint : '#ffffff'} stroke={ink} strokeWidth={shaded ? 2.5 : 1.5}/>
    <circle cx='60' cy={y + 48} r='18' fill={ink}/>
    <text x='60' y={y + 54} textAnchor='middle' fontSize='16' fontWeight='600' fill='#ffffff'>{n}</text>
    <text x='96' y={y + 28} fontSize='14' fontWeight='600' fill={ink}>{title}</text>
    <text x='96' y={y + 52} fontSize='12' fill={ink}>{does}</text>
    <text x='96' y={y + 74} fontSize='12' fill={quiet}>{cannot}</text>
  </g>;
  return <svg viewBox='0 0 760 430' role='img' aria-label='Three layers of protection' fontSize='13'>
    <defs><marker id='xi-lay-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Three layers of protection</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Each layer may refuse what the layer above asks. Only layer 1 can guarantee that nothing fires</text>
    {layer(70, '3', 'Host software on the Mac', 'Decides when to ask for a pulse: FIRE <ms>.', 'Can crash, hang, lose USB or send nonsense. Trusted least.', false)}
    {layer(182, '2', 'Controller firmware on the XIAO', 'Fires only when ARM and CHAIN agree, for a bounded time, with a live host. Watchdog.', 'Cannot cut the rail. A bug can set the output high, which is harmless only because of layer 1.', false)}
    {layer(294, '1', 'Hardware interlock: key, E-stop, relay', 'No key or E-stop pressed: no coil current, no rail, no energy at the actuator.', 'Fails only through a welded contact or a defeated switch: test it every session.', true)}
    <path d='M700 166V182' stroke={ink} strokeWidth='1.5' markerEnd='url(#xi-lay-arrow)'/>
    <path d='M700 278V294' stroke={ink} strokeWidth='1.5' markerEnd='url(#xi-lay-arrow)'/>
    <text x='24' y='418' fontSize='11.5' fill={ink}>Never let a higher layer bypass a lower one: no jumper across the key, no "test mode" that ignores ARM and CHAIN.</text>
  </svg>;
};
