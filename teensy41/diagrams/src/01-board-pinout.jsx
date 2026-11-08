// Teensy 4.1 pinout, top view with USB at the top. Checked against the PJRC pinout card (card11a rev 3/4, card11b rev 4).
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const y0 = 150, dy = 34, xl = 278, xr = 482;
  const py = i => y0 + i * dy;
  const left = [
    { n: 'GND', pw: 1 },
    { n: '0', p: 1, t: [['RX1', 's'], ['CRX2', 'b'], ['CS1', 'b']] },
    { n: '1', p: 1, t: [['TX1', 's'], ['CTX2', 'b'], ['MISO1', 'b']] },
    { n: '2', p: 1, t: [] },
    { n: '3', p: 1, t: [] },
    { n: '4', p: 1, t: [] },
    { n: '5', p: 1, t: [] },
    { n: '6', p: 1, t: [] },
    { n: '7', p: 1, t: [['RX2', 's']] },
    { n: '8', p: 1, t: [['TX2', 's']] },
    { n: '9', p: 1, t: [] },
    { n: '10', p: 1, t: [['MQSR', 'm'], ['CS', 'b']] },
    { n: '11', p: 1, t: [['MOSI', 'b']] },
    { n: '12', p: 1, t: [['MQSL', 'm'], ['MISO', 'b']] },
    { n: '3.3V', pw: 1, d: '3.3 V out' },
    { n: '24', p: 1, t: [['A10', 'a'], ['TX6', 's'], ['SCL2', 'b']] },
    { n: '25', p: 1, t: [['A11', 'a'], ['RX6', 's'], ['SDA2', 'b']] },
    { n: '26', t: [['A12', 'a'], ['MOSI1', 'b']] },
    { n: '27', t: [['A13', 'a'], ['SCK1', 'b']] },
    { n: '28', p: 1, t: [['RX7', 's']] },
    { n: '29', p: 1, t: [['TX7', 's']] },
    { n: '30', t: [['CRX3', 'b']] },
    { n: '31', t: [['CTX3', 'b']] },
    { n: '32', t: [] },
  ];
  const right = [
    { n: 'VIN', pw: 1, d: '3.6–5.5 V in' },
    { n: 'GND', pw: 1 },
    { n: '3.3V', pw: 1, d: '250 mA max out' },
    { n: '23', p: 1, t: [['A9', 'a'], ['CRX1', 'b']] },
    { n: '22', p: 1, t: [['A8', 'a'], ['CTX1', 'b']] },
    { n: '21', t: [['A7', 'a'], ['RX5', 's']] },
    { n: '20', t: [['A6', 'a'], ['TX5', 's']] },
    { n: '19', p: 1, t: [['A5', 'a'], ['SCL', 'b']] },
    { n: '18', p: 1, t: [['A4', 'a'], ['SDA', 'b']] },
    { n: '17', t: [['A3', 'a'], ['TX4', 's'], ['SDA1', 'b']] },
    { n: '16', t: [['A2', 'a'], ['RX4', 's'], ['SCL1', 'b']] },
    { n: '15', p: 1, t: [['A1', 'a'], ['RX3', 's']] },
    { n: '14', p: 1, t: [['A0', 'a'], ['TX3', 's']] },
    { n: '13', p: 1, t: [['LED', 'l'], ['SCK', 'b']] },
    { n: 'GND', pw: 1 },
    { n: '41', t: [['A17', 'a']] },
    { n: '40', t: [['A16', 'a']] },
    { n: '39', t: [['A15', 'a'], ['MISO1', 'b']] },
    { n: '38', t: [['A14', 'a'], ['CS1', 'b']] },
    { n: '37', p: 1, t: [['CS', 'b']] },
    { n: '36', p: 1, t: [['CS', 'b']] },
    { n: '35', t: [['TX8', 's']] },
    { n: '34', t: [['RX8', 's']] },
    { n: '33', p: 1, t: [] },
  ];
  const tagShape = (x, y, w, kind) => {
    if (kind === 'a') return <rect x={x} y={y - 11} width={w} height='22' rx='11' fill='#ffffff' stroke={ink} strokeWidth='1.2'/>;
    if (kind === 's') return <rect x={x} y={y - 11} width={w} height='22' rx='2' fill={tint} stroke={ink} strokeWidth='1'/>;
    if (kind === 'b') return <rect x={x} y={y - 11} width={w} height='22' rx='2' fill='#ffffff' stroke={ink} strokeWidth='1' strokeDasharray='3 2'/>;
    if (kind === 'm') return <rect x={x + 1} y={y - 10} width={w - 2} height='20' rx='2' fill='#ffffff' stroke={ink} strokeWidth='2.6'/>;
    return <rect x={x} y={y - 11} width={w} height='22' rx='2' fill='#ffffff' stroke={ink} strokeWidth='1'/>;
  };
  const tag = (x, y, w, text, kind) => <g key={text + x}>{tagShape(x, y, w, kind)}<text x={x + w / 2} y={y + 4} textAnchor='middle' fontSize='11.5' fill={ink} fontWeight={kind === 'm' ? '600' : '400'}>{text}</text></g>;
  const pwm = (x, y) => <path d={`M${x} ${y + 5}h3v-10h4v10h4v-10h3`} fill='none' stroke={ink} strokeWidth='1.3'/>;
  const side = (list, isLeft) => list.map((p, i) => {
    const y = py(i);
    const px = isLeft ? xl : xr;
    const bx = isLeft ? 212 : 514;
    const lead = <path d={isLeft ? `M${px - 9} ${y}H${bx + 34}` : `M${px + 9} ${y}H${bx}`} stroke={ink} strokeWidth='1'/>;
    const box = p.pw
      ? <g><rect x={bx} y={y - 11} width='34' height='22' rx='2' fill={ink}/><text x={bx + 17} y={y + 4} textAnchor='middle' fontSize='11.5' fontWeight='600' fill='#ffffff'>{p.n === '3.3V' ? '3V3' : p.n}</text></g>
      : <g><rect x={bx} y={y - 11} width='34' height='22' rx='2' fill='#ffffff' stroke={ink} strokeWidth='1.6'/><text x={bx + 17} y={y + 4.5} textAnchor='middle' fontWeight='600' fill={ink}>{p.n}</text></g>;
    const glyph = p.p ? pwm(isLeft ? 192 : 554, y) : null;
    const tags = (p.t || []).map((t, k) => tag(isLeft ? 138 - k * 54 : 572 + k * 54, y, 50, t[0], t[1]));
    const desc = p.d ? <text x={isLeft ? 188 : 572} y={y + 4} textAnchor={isLeft ? 'end' : 'start'} fontSize='11.5' fill={quiet}>{p.d}</text> : null;
    return <g key={(isLeft ? 'L' : 'R') + i}>{lead}{box}{glyph}{tags}{desc}</g>;
  });
  const pads = (list, x) => list.map((p, i) => <circle key={x + '-' + i} cx={x} cy={py(i)} r='8' fill={p.pw ? ink : '#ffffff'} stroke={ink} strokeWidth='1.6'/>);
  const inner = ['On/Off', 'Program', 'GND', '3.3V', 'VBAT'];
  return <svg viewBox='0 0 760 1110' role='img' aria-label='Teensy 4.1 pinout, top view' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Teensy 4.1 pinout: top view, USB at the top</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>48 outer pins on a 0.6 in (15.24 mm) row spacing; every I/O pin is 3.3 V only and has interrupts</text>
    <rect x='350' y='86' width='60' height='40' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='380' y='78' textAnchor='middle' fontWeight='600' fill={ink}>USB micro-B</text>
    <rect x='252' y='112' width='256' height='846' rx='8' fill='#ffffff' stroke={ink} strokeWidth='2'/>
    {pads(left, xl)}{pads(right, xr)}
    {side(left, true)}{side(right, false)}
    <g>
      {[0, 1, 2, 3, 4].map(k => <rect key={'h' + k} x='300' y={py(3) - 7 + k * dy} width='14' height='14' fill='#ffffff' stroke={ink} strokeWidth='1.3'/>)}
      {['+5V', 'D−', 'D+', 'GND', 'GND'].map((s, k) => <text key={'hl' + k} x='320' y={py(3) + 4 + k * dy} fontSize='11.5' fill={ink}>{s}</text>)}
      <text x='300' y={py(2) + 18} fontSize='11.5' fontWeight='600' fill={ink}>USB host</text>
    </g>
    <g>
      {[0, 1, 2].map(r => [0, 1].map(c => <circle key={'e' + r + c} cx={418 + c * 24} cy={py(5) + r * 24} r='6' fill='#ffffff' stroke={ink} strokeWidth='1.3'/>))}
      <text x='430' y={py(4) + 14} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>Ethernet</text>
      <text x='430' y={py(5) + 66} textAnchor='middle' fontSize='11.5' fill={quiet}>6 pads</text>
    </g>
    <rect x='322' y='420' width='116' height='112' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='380' y='468' textAnchor='middle' fontWeight='600' fill={ink}>i.MX RT1062</text>
    <text x='380' y='486' textAnchor='middle' fontSize='11.5' fill={quiet}>600 MHz M7</text>
    <rect x='350' y='560' width='38' height='30' rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <circle cx='369' cy='575' r='8' fill={tint} stroke={ink} strokeWidth='1.2'/>
    <text x='369' y='608' textAnchor='middle' fontSize='11.5' fill={ink}>Program</text>
    <text x='369' y='622' textAnchor='middle' fontSize='11.5' fill={ink}>button</text>
    <rect x='446' y={py(13) - 6} width='12' height='12' fill={ink}/>
    <text x='442' y={py(13) + 4} textAnchor='end' fontSize='11.5' fill={ink}>LED</text>
    <g>
      {inner.map((s, k) => <g key={'in' + k}><rect x={306 + k * 34 - 7} y={py(18) - 7} width='14' height='14' fill={s === 'GND' ? ink : '#ffffff'} stroke={ink} strokeWidth='1.3'/><text transform={`rotate(-90 ${306 + k * 34 + 4} ${py(18) - 14})`} x={306 + k * 34 + 4} y={py(18) - 14} fontSize='11.5' fill={ink}>{s}</text></g>)}
    </g>
    <rect x='318' y='808' width='124' height='166' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='380' y='880' textAnchor='middle' fontWeight='600' fill={ink}>microSD</text>
    <text x='380' y='898' textAnchor='middle' fontSize='11.5' fill={quiet}>BUILTIN_SDCARD</text>
    <text x='380' y='1000' textAnchor='middle' fontSize='11.5' fill={quiet}>Underside: VIN–VUSB cut pads, two PSRAM/flash footprints, pads 42–54 (SD and memory signals)</text>
    <g>
      <text x='24' y='1034' fontWeight='600' fill={ink}>Key</text>
      <rect x='64' y='1022' width='34' height='22' rx='2' fill='#ffffff' stroke={ink} strokeWidth='1.6'/><text x='81' y='1037' textAnchor='middle' fontWeight='600' fill={ink}>7</text><text x='104' y='1037' fontSize='11.5' fill={ink}>pin number</text>
      <rect x='190' y='1022' width='34' height='22' rx='2' fill={ink}/><text x='230' y='1037' fontSize='11.5' fill={ink}>power / ground</text>
      {pwm(334, 1033)}<text x='354' y='1037' fontSize='11.5' fill={ink}>PWM (analogWrite)</text>
      {tag(486, 1033, 50, 'A0', 'a')}<text x='542' y='1037' fontSize='11.5' fill={ink}>analog input</text>
      {tag(64, 1073, 50, 'RX1', 's')}<text x='120' y='1077' fontSize='11.5' fill={ink}>serial port</text>
      {tag(214, 1073, 50, 'SDA', 'b')}<text x='270' y='1077' fontSize='11.5' fill={ink}>I2C / SPI / CAN bus</text>
      {tag(410, 1073, 50, 'MQSL', 'm')}<text x='466' y='1077' fontSize='11.5' fill={ink}>MQS audio out</text>
      <text x='586' y='1077' fontSize='11.5' fill={quiet}>max 4 mA per pin</text>
    </g>
  </svg>;
};
