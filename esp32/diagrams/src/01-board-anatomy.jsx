// ESP32-DevKitC V4, top view turned on its side: antenna left, USB right, J3 along the top, J2 along the bottom.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const pins = Array.from({ length: 19 }, (_, i) => 164 + i * 24);
  const lead = (x1, y1, x2, y2) => <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth='1'/><circle cx={x2} cy={y2} r='2.5' fill={ink}/></g>;
  return <svg viewBox='0 0 760 420' role='img' aria-label='Tour of the ESP32-DevKitC V4 board' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>A tour of the ESP32-DevKitC V4</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Top view, turned on its side: antenna on the left, USB on the right</text>
    <rect x='140' y='150' width='480' height='160' rx='8' fill='#ffffff' stroke={ink} strokeWidth='2'/>
    {pins.map(x => <g key={'t' + x}><rect x={x - 8} y={158} width='16' height='16' fill={tint} stroke={edge} strokeWidth='1'/><circle cx={x} cy={166} r='3' fill={ink}/></g>)}
    {pins.map(x => <g key={'b' + x}><rect x={x - 8} y={286} width='16' height='16' fill={tint} stroke={edge} strokeWidth='1'/><circle cx={x} cy={294} r='3' fill={ink}/></g>)}
    <rect x='146' y='196' width='206' height='70' rx='3' fill={tint} stroke={edge} strokeWidth='1.25'/>
    <path d='M156 258v-52h12v42h12v-42h12v42h12v-42h12v52' fill='none' stroke={edge} strokeWidth='1.5'/>
    <rect x='232' y='201' width='114' height='60' rx='2' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='289' y='227' textAnchor='middle' fontWeight='600' fill={ink}>ESP32-</text>
    <text x='289' y='244' textAnchor='middle' fontWeight='600' fill={ink}>WROOM-32E</text>
    <rect x='414' y='206' width='44' height='44' rx='2' fill={tint} stroke={ink} strokeWidth='1.25'/>
    <text x='436' y='232' textAnchor='middle' fontSize='10' fill={ink}>UART</text>
    <rect x='492' y='244' width='40' height='22' rx='2' fill={tint} stroke={ink} strokeWidth='1.25'/>
    <text x='512' y='259' textAnchor='middle' fontSize='10' fill={ink}>LDO</text>
    <rect x='556' y='186' width='24' height='24' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/><circle cx='568' cy='198' r='6' fill={tint} stroke={ink} strokeWidth='1.25'/>
    <rect x='556' y='250' width='24' height='24' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/><circle cx='568' cy='262' r='6' fill={tint} stroke={ink} strokeWidth='1.25'/>
    <rect x='598' y='208' width='40' height='44' rx='3' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='164' y='190' textAnchor='middle' fontSize='10' fill={quiet}>GND</text>
    <text x='164' y='282' textAnchor='middle' fontSize='10' fill={quiet}>3V3</text>
    
    

    {lead(180, 104, 180, 218)}
    <text x='24' y='80' fontWeight='600' fill={ink}>PCB antenna</text>
    <text x='24' y='96' fontSize='11.5' fill={quiet}>keep metal and wires 1 cm away</text>
    {lead(260, 104, 260, 160)}
    <text x='250' y='80' fontWeight='600' fill={ink}>Header J3 (19 pins)</text>
    <text x='250' y='96' fontSize='11.5' fill={quiet}>right side when USB is down</text>
    {lead(648, 198, 576, 198)}
    <text x='652' y='160' fontWeight='600' fill={ink}>BOOT</text>
    <text x='652' y='176' fontSize='11.5' fill={quiet}>pulls GPIO0 low</text>
    {lead(436, 104, 436, 210)}
    <text x='430' y='80' fontWeight='600' fill={ink}>USB-UART bridge</text>
    <text x='430' y='96' fontSize='11.5' fill={quiet}>CP2102N: USB to serial</text>

    {lead(289, 352, 289, 266)}
    <text x='190' y='368' fontWeight='600' fill={ink}>ESP32-WROOM-32E module</text>
    <text x='190' y='384' fontSize='11.5' fill={quiet}>2 cores at 240 MHz, 520 KB RAM,</text>
    <text x='190' y='400' fontSize='11.5' fill={quiet}>4 MB flash, Wi-Fi and Bluetooth</text>
    {lead(90, 352, 158, 302)}
    <text x='24' y='368' fontWeight='600' fill={ink}>Header J2</text>
    <text x='24' y='384' fontSize='11.5' fill={quiet}>left side, 19 pins</text>
    {lead(512, 340, 512, 262)}
    <text x='504' y='350' textAnchor='end' fontSize='11.5' fill={ink}>3.3 V regulator (LDO)</text>
    {lead(568, 362, 568, 270)}
    <text x='580' y='378' fontWeight='600' fill={ink}>EN button</text>
    <text x='580' y='394' fontSize='11.5' fill={quiet}>reset</text>
    {lead(700, 238, 636, 238)}
    <text x='652' y='270' fontWeight='600' fill={ink}>micro-USB</text>
    <text x='652' y='286' fontSize='11.5' fill={quiet}>5 V + serial</text>
  </svg>;
};
