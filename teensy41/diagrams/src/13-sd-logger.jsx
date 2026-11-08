// SD data logger: from sensor reading to a CSV line on the card, and where data can be lost.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const box = (x, y, w, t1, t2, t3, fill) => <g>
    <rect x={x} y={y} width={w} height='74' rx='6' fill={fill || '#ffffff'} stroke={ink} strokeWidth='1.5'/>
    <text x={x + w / 2} y={y + 22} textAnchor='middle' fontWeight='600' fill={ink}>{t1}</text>
    <text x={x + w / 2} y={y + 42} textAnchor='middle' fontSize='11.5' fill={quiet}>{t2}</text>
    <text x={x + w / 2} y={y + 58} textAnchor='middle' fontSize='11.5' fill={quiet}>{t3}</text>
  </g>;
  const mono = 'Menlo, Consolas, monospace';
  return <svg viewBox='0 0 760 520' role='img' aria-label='SD card data logger data flow and file layout' fontSize='13'>
    <defs><marker id='sd-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Data logger: from a reading to a line on the card</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Once a second; the library collects lines in RAM and writes the card in 512-byte blocks</text>
    {box(24, 76, 132, 'Read', 'A0 pot, A1 battery,', 'CPU temperature')}
    {box(176, 76, 132, 'Timestamp', 'RTC via TimeLib', 'now(), year() …')}
    {box(328, 76, 132, 'Format', 'one CSV line,', 'snprintf()')}
    {box(480, 76, 120, 'RAM buffer', 'file.println()', 'not on card yet!', tint)}
    {box(620, 76, 116, 'microSD', 'file.flush() or', 'file.close()')}
    {[[156, 174], [308, 326], [460, 478], [600, 618]].map(p => <path key={'a' + p[0]} d={`M${p[0]} 113H${p[1]}`} fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#sd-arrow)'/>)}
    <path d='M540 150V176H678V152' fill='none' stroke={ink} strokeWidth='1.3' strokeDasharray='5 4' markerEnd='url(#sd-arrow)'/>
    <text x='609' y='194' textAnchor='middle' fontSize='11.5' fill={ink}>flush every 10 lines</text>
    <text x='24' y='194' fontSize='11.5' fill={ink}>elapsedMillis tick ≥ 1000 → read, stamp, format, println</text>
    <path d='M24 214H736' stroke={rule} strokeWidth='1'/>
    <text x='24' y='242' fontWeight='600' fill={ink}>On the card (FAT32 or exFAT)</text>
    <rect x='24' y='256' width='200' height='176' rx='8' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <path d='M196 256H224V284' fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='40' y='282' fontSize='11.5' fontWeight='600' fill={ink}>/ (root)</text>
    <path d='M48 290V372M48 314H62M48 342H62M48 370H62' fill='none' stroke={ink} strokeWidth='1.2'/>
    <text x='68' y='318' fontFamily={mono} fontSize='11.5' fill={ink}>LOG001.CSV</text>
    <text x='68' y='346' fontFamily={mono} fontSize='11.5' fill={ink}>LOG002.CSV</text>
    <text x='68' y='374' fontFamily={mono} fontSize='11.5' fill={ink}>LOG003.CSV ←</text>
    <text x='40' y='404' fontSize='11.5' fill={quiet}>a new file each power-up:</text>
    <text x='40' y='420' fontSize='11.5' fill={quiet}>first unused number</text>
    <rect x='250' y='256' width='486' height='176' rx='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <rect x='250' y='256' width='486' height='24' fill={ink}/>
    <text x='262' y='273' fontFamily={mono} fontSize='11.5' fontWeight='600' fill='#ffffff'>LOG003.CSV</text>
    <text x='262' y='304' fontFamily={mono} fontSize='11.5' fontWeight='600' fill={ink}>time,pot,battery_V,cpu_C</text>
    <text x='262' y='326' fontFamily={mono} fontSize='11.5' fill={ink}>2026-11-07 14:03:01,512,12.61,41.2</text>
    <text x='262' y='346' fontFamily={mono} fontSize='11.5' fill={ink}>2026-11-07 14:03:02,515,12.61,41.3</text>
    <text x='262' y='366' fontFamily={mono} fontSize='11.5' fill={ink}>2026-11-07 14:03:03,790,12.60,41.3</text>
    <text x='262' y='386' fontFamily={mono} fontSize='11.5' fill={ink}>…</text>
    <text x='262' y='418' fontSize='11.5' fill={quiet}>header once, then one line per second; opens in Numbers or Excel</text>
    <text x='24' y='462' fontWeight='600' fill={ink}>Safe removal</text>
    <text x='24' y='484' fontSize='11.5' fill={ink}>Press the stop button (pin 2): the sketch calls close(), the LED on pin 13 goes out, then pull the card.</text>
    <text x='24' y='502' fontSize='11.5' fill={ink}>Power lost without a flush loses at most the lines still in RAM; the file itself stays readable.</text>
  </svg>;
};
