// How the Tools > USB Type menu changes what the Mac sees after an upload.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const step = (x, n, t1, t2) => <g>
    <rect x={x} y='76' width='164' height='62' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <circle cx={x + 18} cy='96' r='10' fill={ink}/><text x={x + 18} y='100' textAnchor='middle' fontSize='11.5' fontWeight='600' fill='#ffffff'>{n}</text>
    <text x={x + 34} y='100' fontWeight='600' fill={ink}>{t1}</text>
    <text x={x + 12} y='124' fontSize='11.5' fill={quiet}>{t2}</text>
  </g>;
  const rows = [
    ['Serial (default)', 'a serial port /dev/cu.usbmodem…', 'Arduino Serial Monitor, any terminal'],
    ['MIDI  /  Serial + MIDI', '"Teensy MIDI" MIDI device', 'Audio MIDI Setup, any DAW'],
    ['Keyboard (+ Mouse …)', 'a USB keyboard', 'Keyboard Setup Assistant may pop up'],
    ['Audio  /  Serial + MIDI + Audio', 'a 44.1 kHz sound card', 'System Settings ▸ Sound'],
    ['MTP Disk (Experimental)', 'a media device', 'needs an MTP app on macOS'],
  ];
  return <svg viewBox='0 0 760 430' role='img' aria-label='USB Type menu and what the Mac sees' fontSize='13'>
    <defs><marker id='ut-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>One board, many devices: the USB Type menu</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The choice is compiled into your sketch. After each upload the Teensy reconnects as the new kind of device</text>
    {step(24, 1, 'Tools ▸ USB Type', 'pick a device type')}
    {step(212, 2, 'Upload', 'Teensy restarts')}
    {step(400, 3, 'macOS enumerates', 'reads the new descriptors')}
    {step(588, 4, 'New device', 'ready in 1–2 seconds')}
    {[190, 378, 566].map(x => <path key={'a' + x} d={`M${x} 107H${x + 20}`} fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#ut-arrow)'/>)}
    <rect x='24' y='162' width='712' height='28' fill={ink}/>
    <text x='34' y='181' fontWeight='600' fill='#ffffff'>USB Type</text>
    <text x='284' y='181' fontWeight='600' fill='#ffffff'>The Mac sees</text>
    <text x='510' y='181' fontWeight='600' fill='#ffffff'>Where you find it</text>
    {rows.map((r, i) => <g key={'r' + i}>
      <rect x='24' y={190 + i * 36} width='712' height='36' fill={i % 2 ? tint : '#ffffff'} stroke={ink} strokeWidth='0.8'/>
      <text x='34' y={213 + i * 36} fontSize='11.5' fontWeight='600' fill={ink}>{r[0]}</text>
      <text x='284' y={213 + i * 36} fontSize='11.5' fill={ink}>{r[1]}</text>
      <text x='510' y={213 + i * 36} fontSize='11.5' fill={ink}>{r[2]}</text>
    </g>)}
    <path d='M274 190V370M500 190V370' stroke={ink} strokeWidth='0.8'/>
    <text x='24' y='396' fontSize='11.5' fill={ink}>Types without "Serial" still let Serial.print() reach the Arduino Serial Monitor through an emulated port.</text>
    <text x='24' y='414' fontSize='11.5' fill={ink}>If uploads stop working after a type change, press the Program button once: the bootloader is always reachable.</text>
  </svg>;
};
