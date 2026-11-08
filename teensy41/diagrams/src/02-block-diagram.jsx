// What is on a Teensy 4.1: the processor in the middle and everything wired to it.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const box = (x, y, w, bh, title, l1, l2, dashed) => <g>
    <rect x={x} y={y} width={w} height={bh} rx='6' fill='#ffffff' stroke={ink} strokeWidth='1.4' strokeDasharray={dashed ? '6 4' : 'none'}/>
    <text x={x + w / 2} y={y + 22} textAnchor='middle' fontWeight='600' fill={ink}>{title}</text>
    {l1 ? <text x={x + w / 2} y={y + 40} textAnchor='middle' fontSize='11.5' fill={quiet}>{l1}</text> : null}
    {l2 ? <text x={x + w / 2} y={y + 55} textAnchor='middle' fontSize='11.5' fill={quiet}>{l2}</text> : null}
  </g>;
  const link = (d, dashed) => <path d={d} fill='none' stroke={ink} strokeWidth='1.5' strokeDasharray={dashed ? '5 4' : 'none'} markerEnd='url(#blk-arrow)' markerStart='url(#blk-arrow)'/>;
  return <svg viewBox='0 0 760 520' role='img' aria-label='Teensy 4.1 block diagram' fontSize='13'>
    <defs><marker id='blk-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Inside the Teensy 4.1: one fast processor and a lot of plumbing</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Solid boxes are on every board; dashed boxes need parts you add (PSRAM chip, MagJack kit, host cable, coin cell)</text>
    <rect x='270' y='170' width='220' height='170' rx='8' fill={tint} stroke={ink} strokeWidth='2.5'/>
    <text x='380' y='202' textAnchor='middle' fontSize='15' fontWeight='600' fill={ink}>NXP i.MX RT1062</text>
    <text x='380' y='224' textAnchor='middle' fill={ink}>ARM Cortex-M7, 600 MHz</text>
    <text x='380' y='246' textAnchor='middle' fontSize='11.5' fill={quiet}>double-precision FPU</text>
    <text x='380' y='272' textAnchor='middle' fill={ink}>1 MB RAM</text>
    <text x='380' y='290' textAnchor='middle' fontSize='11.5' fill={quiet}>512 KB fast (RAM1, TCM)</text>
    <text x='380' y='306' textAnchor='middle' fontSize='11.5' fill={quiet}>+ 512 KB (RAM2, DMA)</text>
    <text x='380' y='326' textAnchor='middle' fontSize='11.5' fill={quiet}>runs on 3.3 V I/O</text>
    {box(24, 80, 200, 66, 'USB device port', 'micro-B to your Mac', 'Serial, MIDI, Keyboard, Audio…')}
    {box(24, 170, 200, 66, 'USB host port', '5 pads: +5V D− D+ GND GND', 'keyboards, MIDI, drives', true)}
    {box(24, 260, 200, 66, 'Ethernet PHY', 'DP83825, 10/100 Mbit/s', '6 pads → MagJack kit', true)}
    {box(24, 350, 200, 66, 'microSD socket', '4-bit SDIO, fast', 'SD.begin(BUILTIN_SDCARD)')}
    {box(536, 80, 200, 66, '8 MB QSPI flash', 'your program (7936 KB)', 'EEPROM emulation, LittleFS')}
    {box(536, 170, 200, 66, 'PSRAM pads', 'two 8-pin footprints', 'up to 2 × 8 MB, "EXTMEM"', true)}
    {box(536, 260, 200, 66, 'Real-time clock', '32.768 kHz crystal on board', 'VBAT pad: CR2032 keeps time')}
    {box(536, 350, 200, 66, 'Power', '5 V (USB or VIN) → 3.3 V', 'regulator; 250 mA spare')}
    <rect x='24' y='446' width='712' height='58' rx='6' fill='#ffffff' stroke={ink} strokeWidth='2'/>
    <text x='380' y='468' textAnchor='middle' fontWeight='600' fill={ink}>55 I/O pins (42 on the breadboard rows): all digital, all with interrupts</text>
    <text x='380' y='488' textAnchor='middle' fontSize='11.5' fill={quiet}>18 analog in · 35 PWM · 8 serial · 3 I2C · 3 SPI · 3 CAN · I2S, S/PDIF and MQS audio · 4 mA per pin, 3.3 V only</text>
    {link('M226 113H300V168')}
    {link('M226 203H268')}
    {link('M226 293H268')}
    {link('M226 383H300V342')}
    {link('M534 113H460V168')}
    {link('M534 203H492')}
    {link('M534 293H492')}
    <path d='M534 383H460V342' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#blk-arrow)'/>
    {link('M380 342V444')}
  </svg>;
};
