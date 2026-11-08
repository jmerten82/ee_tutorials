// LED with series resistor on pin 11, pushbutton to GND on pin 2 using the internal pull-up.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const gnd = (x, y) => <path d={`M${x} ${y}V${y + 8}M${x - 11} ${y + 8}H${x + 11}M${x - 7} ${y + 13}H${x + 7}M${x - 3} ${y + 18}H${x + 3}`} fill='none' stroke={ink} strokeWidth='1.5'/>;
  const pad = (x, y) => <rect x={x - 7} y={y - 7} width='14' height='14' fill='#ffffff' stroke={ink} strokeWidth='1.6'/>;
  return <svg viewBox='0 0 760 400' role='img' aria-label='LED and pushbutton schematic' fontSize='13'>
    <defs><marker id='lb-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='5' markerHeight='5' orient='auto'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>An LED out, a button in: the two circuits behind every project</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Schematic for Lesson 1; the dashed box is what happens inside the Teensy</text>
    <rect x='24' y='76' width='176' height='290' rx='6' fill='none' stroke={ink} strokeWidth='1.4' strokeDasharray='6 4'/>
    <text x='36' y='98' fontWeight='600' fill={ink}>Teensy 4.1</text>
    <polygon points='130,136 130,164 156,150' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <path d='M96 150H130M156 150H200' fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='36' y='130' fontSize='11.5' fill={quiet}>digitalWrite()</text>
    <text x='36' y='154' fontSize='11.5' fill={ink}>3.3 V / 0 V</text>
    <path d='M150 206V220M150 256V270H200' fill='none' stroke={ink} strokeWidth='1.5'/>
    <path d='M138 206H162' stroke={ink} strokeWidth='1.5'/>
    <text x='150' y='198' textAnchor='middle' fontSize='11.5' fill={ink}>3.3 V</text>
    <rect x='142' y='220' width='16' height='36' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='134' y='236' textAnchor='end' fontSize='11.5' fill={ink}>pull-up</text>
    <text x='134' y='252' textAnchor='end' fontSize='11.5' fill={quiet}>INPUT_PULLUP</text>
    {dot(150, 270)}
    <path d='M150 270V292' stroke={ink} strokeWidth='1.5'/>
    <polygon points='138,292 162,292 150,312' fill='#ffffff' stroke={ink} strokeWidth='1.5' transform='rotate(180 150 302)'/>
    <text x='136' y='306' textAnchor='end' fontSize='11.5' fill={quiet}>digitalRead()</text>
    <path d='M170 340H200' stroke={ink} strokeWidth='1.5'/>
    <text x='164' y='344' textAnchor='end' fontSize='11.5' fill={ink}>GND</text>
    {pad(200, 150)}{pad(200, 270)}{pad(200, 340)}
    <text x='212' y='142' fontSize='11.5' fontWeight='600' fill={ink}>11</text>
    <text x='212' y='262' fontSize='11.5' fontWeight='600' fill={ink}>2</text>
    <text x='212' y='332' fontSize='11.5' fontWeight='600' fill={ink}>G</text>
    <path d='M207 150H252M312 150H352M392 150H430V170' fill='none' stroke={ink} strokeWidth='1.5'/>
    <rect x='252' y='142' width='60' height='16' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='282' y='132' textAnchor='middle' fontWeight='600' fill={ink}>R1 470 Ω</text>
    <text x='282' y='178' textAnchor='middle' fontSize='11.5' fill={quiet}>yellow violet brown</text>
    <polygon points='352,136 352,164 378,150' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <path d='M379 134V166' stroke={ink} strokeWidth='2.4'/>
    <path d='M362 128l10 -14M372 132l10 -14' fill='none' stroke={ink} strokeWidth='1.2' markerEnd='url(#lb-arrow)'/>
    <text x='365' y='196' textAnchor='middle' fontWeight='600' fill={ink}>LED</text>
    <text x='340' y='212' textAnchor='middle' fontSize='11.5' fill={quiet}>long leg</text>
    <text x='398' y='212' textAnchor='middle' fontSize='11.5' fill={quiet}>flat side</text>
    {gnd(430, 170)}
    <path d='M207 270H292M332 270H372V290' fill='none' stroke={ink} strokeWidth='1.5'/>
    <circle cx='292' cy='270' r='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <circle cx='332' cy='270' r='3' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <path d='M288 258H336M312 258V244M302 244H322' fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='312' y='236' textAnchor='middle' fontWeight='600' fill={ink}>S1</text>
    <text x='312' y='298' textAnchor='middle' fontSize='11.5' fill={quiet}>pushbutton</text>
    {gnd(372, 290)}
    <path d='M207 340H250' stroke={ink} strokeWidth='1.5'/>{gnd(250, 340)}
    <path d='M470 76V366' stroke={rule} strokeWidth='1'/>
    <text x='490' y='98' fontWeight='600' fill={ink}>LED current</text>
    <text x='490' y='120' fontSize='11.5' fill={ink}>I = (3.3 V − V_LED) / R</text>
    <text x='490' y='140' fontSize='11.5' fill={ink}>red: (3.3 − 2.0) / 470 ≈ 2.8 mA</text>
    <text x='490' y='160' fontSize='11.5' fill={ink}>keep each pin under 4 mA</text>
    <text x='490' y='180' fontSize='11.5' fill={quiet}>blue, white (≈ 3 V): 100 Ω, still dim;</text>
    <text x='490' y='196' fontSize='11.5' fill={quiet}>for real brightness use a transistor</text>
    <text x='490' y='240' fontWeight='600' fill={ink}>Button logic</text>
    <text x='490' y='262' fontSize='11.5' fill={ink}>released: pull-up holds pin HIGH → 1</text>
    <text x='490' y='282' fontSize='11.5' fill={ink}>pressed: S1 shorts pin to GND → 0</text>
    <text x='490' y='302' fontSize='11.5' fill={ink}>so "pressed" means LOW</text>
    <text x='490' y='326' fontSize='11.5' fill={quiet}>no external resistor needed, and no</text>
    <text x='490' y='342' fontSize='11.5' fill={quiet}>wire ever carries more than 3.3 V</text>
  </svg>;
};
