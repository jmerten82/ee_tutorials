export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const gnd = (x, y) => <g stroke={ink} strokeWidth='1.5'>
    <line x1={x} x2={x} y1={y} y2={y + 10}/>
    <line x1={x - 12} x2={x + 12} y1={y + 10} y2={y + 10}/>
    <line x1={x - 8} x2={x + 8} y1={y + 15} y2={y + 15}/>
    <line x1={x - 4} x2={x + 4} y1={y + 20} y2={y + 20}/>
  </g>;
  return <svg viewBox='0 0 760 600' role='img' aria-label='Low-side MOSFET switch: 3.3 V logic switches a 12 V motor' fontSize='13'>
    <defs><marker id='mos-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Low-side MOSFET switch: 3.3 V logic switches a 12 V motor</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Lesson 3. The MOSFET sits between the load and ground; the load always connects to +12 V</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'>
      <path d='M400 90H650V180'/>
      <path d='M650 260V400'/>
      <path d='M400 90V128'/>
      <path d='M400 172V237H362'/>
      <path d='M400 106H480V140'/>
      <path d='M480 166V196H400'/>
      <path d='M170 260H210'/>
      <path d='M250 260H352'/>
      <path d='M300 260V300'/>
      <path d='M300 340V400'/>
      <path d='M362 283H400V400'/>
      <path d='M400 260V283'/>
      <path d='M105 330V400H650'/>
    </g>
    <g>{dot(400, 106)}{dot(400, 196)}{dot(300, 260)}{dot(400, 283)}{dot(300, 400)}{dot(400, 400)}{dot(220, 400)}</g>
    {gnd(220, 400)}
    <text x='520' y='82' fontWeight='600' fill={ink}>+12 V</text>
    <g>
      <rect x='40' y='200' width='130' height='130' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
      <text x='105' y='226' textAnchor='middle' fontWeight='600' fill={ink}>ESP32</text>
      <text x='105' y='242' textAnchor='middle' fontSize='11.5' fill={quiet}>3.3 V logic</text>
      <text x='162' y='264' textAnchor='end' fontSize='11.5' fill={ink}>GPIO19</text>
      <text x='105' y='322' textAnchor='middle' fontSize='11.5' fill={ink}>GND</text>
    </g>
    <g>
      <rect x='210' y='252' width='40' height='16' fill='none' stroke={ink} strokeWidth='1.5'/>
      <text x='230' y='242' textAnchor='middle' fontWeight='600' fill={ink}>R1 100 Ω</text>
    </g>
    <g>
      <rect x='292' y='300' width='16' height='40' fill='none' stroke={ink} strokeWidth='1.5'/>
      <text x='286' y='316' textAnchor='end' fontWeight='600' fill={ink}>R2</text>
      <text x='286' y='332' textAnchor='end' fontSize='11.5' fill={quiet}>10 kΩ</text>
    </g>
    <g stroke={ink} fill='none'>
      <line x1='352' x2='352' y1='232' y2='288' strokeWidth='2'/>
      <line x1='362' x2='362' y1='228' y2='246' strokeWidth='2.5'/>
      <line x1='362' x2='362' y1='251' y2='269' strokeWidth='2.5'/>
      <line x1='362' x2='362' y1='274' y2='292' strokeWidth='2.5'/>
      <path d='M400 260H366' strokeWidth='1.5' markerEnd='url(#mos-arrow)'/>
    </g>
    <text x='336' y='252' textAnchor='middle' fontWeight='600' fill={ink}>G</text>
    <text x='408' y='228' fontWeight='600' fill={ink}>D</text>
    <text x='408' y='302' fontWeight='600' fill={ink}>S</text>
    <text x='424' y='254' fontWeight='600' fill={ink}>Q1 IRLB8721</text>
    <text x='424' y='270' fontSize='11.5' fill={quiet}>N-channel, logic-level</text>
    <g>
      <circle cx='400' cy='150' r='22' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
      <text x='400' y='155' textAnchor='middle' fontWeight='600' fill={ink}>M</text>
      <text x='392' y='120' textAnchor='end' fontSize='11.5' fill={ink}>+</text>
      <text x='392' y='190' textAnchor='end' fontSize='11.5' fill={ink}>−</text>
    </g>
    <path d='M356 116V186' fill='none' stroke={ink} strokeWidth='1.5' strokeDasharray='5 3' markerEnd='url(#mos-arrow)'/>
    <text x='348' y='146' textAnchor='end' fontSize='11.5' fill={ink}>load current</text>
    <text x='348' y='161' textAnchor='end' fontSize='11.5' fill={quiet}>when Q1 is on</text>
    <g>
      <polygon points='468,166 492,166 480,142' fill='none' stroke={ink} strokeWidth='1.5'/>
      <line x1='466' x2='494' y1='140' y2='140' stroke={ink} strokeWidth='2.5'/>
      <text x='502' y='150' fontWeight='600' fill={ink}>D1 1N5819</text>
      <text x='502' y='166' fontSize='11.5' fill={quiet}>band to +12 V</text>
    </g>
    <g>
      <rect x='600' y='180' width='100' height='80' rx='4' fill={tint} stroke={ink} strokeWidth='1.5'/>
      <text x='650' y='212' textAnchor='middle' fontWeight='600' fill={ink}>12 V</text>
      <text x='650' y='228' textAnchor='middle' fontSize='11.5' fill={quiet}>adapter</text>
      <text x='610' y='196' fontSize='11.5' fill={ink}>+</text>
      <text x='610' y='252' fontSize='11.5' fill={ink}>−</text>
    </g>
    <text x='412' y='390' fontWeight='600' fill={ink}>common ground: essential</text>
    <text x='412' y='420' fontSize='11.5' fill={quiet}>adapter − joined to ESP32 GND</text>
    <text x='24' y='452' fontWeight='600' fill={ink}>Why each part is there</text>
    <text x='24' y='474' fill={ink}>R1 100 Ω: limits the gate charging current and damps ringing.</text>
    <text x='24' y='494' fill={ink}>R2 10 kΩ: holds Q1 off while the ESP32 boots, resets or is unplugged.</text>
    <text x='24' y='514' fill={ink}>D1: catches the motor turn-off spike. LED strips need none (harmless).</text>
    <text x='24' y='540' fontWeight='600' fill={ink}>V_GS is only 3.3 V:</text>
    <text x='24' y='560' fill={ink}>pick a MOSFET whose R_DS(on) is specified</text>
    <text x='24' y='580' fill={ink}>at V_GS = 4.5 V or lower (IRLB8721: yes).</text>
    <g transform='translate(-30,0)'>
      <text x='640' y='446' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>IRLB8721, TO-220</text>
      <rect x='612' y='456' width='56' height='30' fill={tint} stroke={ink} strokeWidth='1.5'/>
      <circle cx='640' cy='471' r='6' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
      <rect x='608' y='486' width='64' height='40' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
      <line x1='622' x2='622' y1='526' y2='556' stroke={ink} strokeWidth='3'/>
      <line x1='640' x2='640' y1='526' y2='556' stroke={ink} strokeWidth='3'/>
      <line x1='658' x2='658' y1='526' y2='556' stroke={ink} strokeWidth='3'/>
      <text x='622' y='574' textAnchor='middle' fontWeight='600' fill={ink}>G</text>
      <text x='640' y='574' textAnchor='middle' fontWeight='600' fill={ink}>D</text>
      <text x='658' y='574' textAnchor='middle' fontWeight='600' fill={ink}>S</text>
            <text x='684' y='471' fontSize='11.5' fill={quiet}>tab = D</text>
      <text x='684' y='502' fontSize='11.5' fill={quiet}>printed side</text>
      <text x='684' y='517' fontSize='11.5' fill={quiet}>facing you</text>
    </g>
  </svg>;
};
