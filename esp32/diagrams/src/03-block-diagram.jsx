// Functional blocks of the DevKitC V4 and the ESP32-WROOM-32E module.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const box = (x, y, w, hh, title, lines, fill) => <g>
    <rect x={x} y={y} width={w} height={hh} rx='4' fill={fill || '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + 10} y={y + 20} fontWeight='600' fill={ink}>{title}</text>
    {lines.map((t, i) => <text key={i} x={x + 10} y={y + 38 + i * 16} fontSize='11.5' fill={quiet}>{t}</text>)}
  </g>;
  const arrow = (d, label, lx, ly, anchor) => <g><path d={d} fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#blk-arrow)'/>{label ? <text x={lx} y={ly} textAnchor={anchor || 'start'} fontSize='11.5' fill={ink}>{label}</text> : null}</g>;
  return <svg viewBox='0 0 760 470' role='img' aria-label='Block diagram of the ESP32 development board' fontSize='13'>
    <defs><marker id='blk-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>What is on the board, and how the parts talk</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The module (right) is the computer; the rest of the board only powers it and connects it to your Mac</text>

    {box(24, 80, 104, 62, 'micro-USB', ['from your Mac'], tint)}
    {box(168, 80, 140, 78, 'USB-UART', ['bridge (CP2102N)', 'USB ⇄ serial'])}
    {box(168, 196, 140, 78, 'Auto-reset', ['2 transistors:', 'DTR/RTS → EN, IO0'])}
    {box(168, 312, 140, 62, 'Buttons', ['EN, BOOT (IO0)'])}
    {box(24, 312, 104, 78, 'LDO', ['5 V → 3.3 V', 'AMS1117-class'], tint)}

    {arrow('M128 111H166', null)}
    {arrow('M238 158V194', 'DTR, RTS', 246, 182)}
    {arrow('M76 142V310', '5 V', 84, 230)}
    <text x='84' y='246' fontSize='11.5' fill={quiet}>(VBUS)</text>

    <rect x='400' y='72' width='336' height='318' rx='6' fill='none' stroke={ink} strokeWidth='2' strokeDasharray='7 4'/>
    <text x='412' y='92' fontWeight='600' fill={ink}>ESP32-WROOM-32E module</text>
    <rect x='410' y='104' width='186' height='196' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='420' y='126' fontWeight='600' fill={ink}>ESP32 chip</text>
    {['2 cores (LX6), 240 MHz', '520 KB SRAM', 'GPIO, ADC, DAC, touch', 'LEDC PWM, timers', 'UART ×3, I2C ×2, SPI', 'RTC + ULP (deep sleep)', 'Wi-Fi 2.4 GHz, Bluetooth'].map((t, i) =>
      <text key={i} x='420' y={146 + i * 20} fontSize='11.5' fill={ink}>{t}</text>)}
    {box(610, 104, 116, 62, 'SPI flash', ['4 MB, IO6–11'])}
    {box(610, 176, 116, 52, '40 MHz', ['crystal'])}
    {box(610, 238, 116, 62, 'Antenna', ['PCB trace'])}
    {arrow('M596 135H608', null)}
    {arrow('M596 202H608', null)}
    {arrow('M596 269H608', null)}

    {arrow('M308 120H408', 'TX/RX', 354, 112, 'middle')}
    <text x='354' y='138' textAnchor='middle' fontSize='11.5' fill={quiet}>IO1/3</text>
    {arrow('M308 235H408', 'EN, IO0', 354, 226, 'middle')}
    <path d='M308 343H354V235' fill='none' stroke={ink} strokeWidth='1.5'/><circle cx='354' cy='235' r='3.5' fill={ink}/>

    <rect x='410' y='318' width='316' height='60' rx='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='420' y='340' fontWeight='600' fill={ink}>34 GPIOs → headers J2 and J3</text>
    <text x='420' y='358' fontSize='11.5' fill={quiet}>24 free for your circuits (see the pinout)</text>

    <path d='M76 390V430H568V380' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#blk-arrow)'/>
    <text x='150' y='424' fontSize='11.5' fill={ink}>3.3 V rail: powers the module, and the 3V3 header pin</text>
    <text x='24' y='456' fontSize='11.5' fill={quiet}>Arrows show the direction of power or of the main signal. IO = GPIO.</text>
  </svg>;
};
