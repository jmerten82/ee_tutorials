// Power paths on the DevKitC: three ways in, one regulator, two rails, and the current budget.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const box = (x, y, w, hh, title, lines, fill) => <g>
    <rect x={x} y={y} width={w} height={hh} rx='4' fill={fill || '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + 10} y={y + 20} fontWeight='600' fill={ink}>{title}</text>
    {lines.map((t, i) => <text key={i} x={x + 10} y={y + 38 + i * 16} fontSize='11.5' fill={quiet}>{t}</text>)}
  </g>;
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  return <svg viewBox='0 0 760 474' role='img' aria-label='Power paths and current budget of the DevKitC' fontSize='13'>
    <defs><marker id='pwr-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Power: three ways in, use exactly one</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Two rails, one regulator. Plan with the numbers on the right, not with what the chip survives.</text>

    {box(24, 76, 160, 62, 'USB from the Mac', ['5 V, plan for 500 mA'], tint)}
    {box(24, 152, 160, 62, '5V pin', ['external 4.8–5.5 V only'])}
    {box(24, 300, 160, 62, '3V3 pin as input', ['regulated 3.3 V only'])}

    <path d='M184 107H500' fill='none' stroke={ink} strokeWidth='3'/>
    <path d='M184 183H230V107' fill='none' stroke={ink} strokeWidth='1.5'/>
    {dot(230, 107)}
    <text x='300' y='98' fontWeight='600' fill={ink}>5 V rail</text>
    <path d='M300 107V146' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#pwr-arrow)'/>
    {dot(300, 107)}
    <rect x='252' y='148' width='96' height='66' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='300' y='172' textAnchor='middle' fontWeight='600' fill={ink}>LDO</text>
    <text x='300' y='190' textAnchor='middle' fontSize='11.5' fill={ink}>5 V → 3.3 V</text>
    <text x='300' y='206' textAnchor='middle' fontSize='11.5' fill={quiet}>1117 type</text>
    <path d='M300 214V262' fill='none' stroke={ink} strokeWidth='1.5'/>
    <path d='M184 331H230V262H500' fill='none' stroke={ink} strokeWidth='1.5'/>
    <path d='M230 262H500' fill='none' stroke={ink} strokeWidth='3'/>
    {dot(300, 262)}{dot(230, 262)}
    <text x='316' y='254' fontWeight='600' fill={ink}>3.3 V rail</text>
    <text x='360' y='180' fontSize='11.5' fill={quiet}>heat = (5 − 3.3) V × I</text>
    <text x='360' y='196' fontSize='11.5' fill={quiet}>0.85 W at 500 mA: hot</text>

    <path d='M500 107H518' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#pwr-arrow)'/>
    {box(520, 76, 216, 62, '5 V loads (5V pin)', ['one micro servo: 100–700 mA', 'bigger loads: own supply'])}
    <path d='M500 262H518' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#pwr-arrow)'/>
    {box(520, 160, 216, 146, '3.3 V loads (3V3 pin)', ['ESP32 with Wi-Fi: 80–130 mA avg', 'Wi-Fi transmit peaks: ≈ 240 mA', 'BME280 + OLED: ≈ 20 mA', 'your 3V3 extras: ≤ 200 mA', 'each GPIO: plan ≤ 12 mA', '(absolute limit 40 mA)'])}

    <rect x='24' y='394' width='712' height='62' rx='4' fill='#ffffff' stroke={ink} strokeWidth='2.5'/>
    <circle cx='48' cy='425' r='12' fill={ink}/><text x='48' y='430' textAnchor='middle' fontWeight='600' fill='#ffffff'>!</text>
    <text x='70' y='418' fontWeight='600' fill={ink}>Never connect two sources at once, and never feed 5 V into a GPIO.</text>
    <text x='70' y='438' fontSize='11.5' fill={ink}>The 5V pin is the USB supply: an external 5 V plus USB fights the Mac. The pins are 3.3 V logic and not 5 V tolerant.</text>
    <text x='24' y='382' fontSize='11.5' fill={quiet}>All GND pins are the same net. Every external supply shares GND with the board.</text>
  </svg>;
};
