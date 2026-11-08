// Lesson 1 circuits: LED with series resistor on GPIO25, pushbutton on GPIO33 with the internal pull-up.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gnd = (x, y) => <g><line x1={x} x2={x} y1={y - 12} y2={y} stroke={ink} strokeWidth='1.5'/><line x1={x - 12} x2={x + 12} y1={y} y2={y} stroke={ink} strokeWidth='2'/><line x1={x - 8} x2={x + 8} y1={y + 5} y2={y + 5} stroke={ink} strokeWidth='2'/><line x1={x - 4} x2={x + 4} y1={y + 10} y2={y + 10} stroke={ink} strokeWidth='2'/></g>;
  const net = (x, y, t) => <g><path d={`M${x - 34} ${y - 11}H${x + 22}L${x + 32} ${y}L${x + 22} ${y + 11}H${x - 34}Z`} fill='#ffffff' stroke={ink} strokeWidth='1.5'/><text x={x - 4} y={y + 4.5} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{t}</text></g>;
  const line = d => <path d={d} fill='none' stroke={ink} strokeWidth='1.5'/>;
  return <svg viewBox='0 0 760 420' role='img' aria-label='LED and pushbutton schematics with the resistor calculation' fontSize='13'>
    <defs><marker id='led-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='5' markerHeight='5' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>An output and an input: LED on GPIO25, button on GPIO33</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Schematics for Lesson 1. The LED needs a resistor; the button uses the pull-up inside the chip.</text>
    <line x1='380' x2='380' y1='70' y2='404' stroke={rule} strokeWidth='1' strokeDasharray='4 4'/>

    {net(90, 90, 'GPIO25')}
    {line('M122 90H140V128')}
    <rect x='132' y='128' width='16' height='40' fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='122' y='144' textAnchor='end' fontWeight='600' fill={ink}>R1</text>
    <text x='122' y='160' textAnchor='end' fontSize='11.5' fill={quiet}>330 Ω</text>
    {line('M140 168V200')}
    <polygon points='126,200 154,200 140,226' fill='none' stroke={ink} strokeWidth='1.5'/>
    <line x1='126' x2='154' y1='226' y2='226' stroke={ink} strokeWidth='2'/>
    <path d='M158 206l14 -10' fill='none' stroke={ink} strokeWidth='1.25' markerEnd='url(#led-arrow)'/>
    <path d='M158 218l14 -10' fill='none' stroke={ink} strokeWidth='1.25' markerEnd='url(#led-arrow)'/>
    <text x='118' y='206' textAnchor='end' fontWeight='600' fill={ink}>LED1</text>
    <text x='118' y='222' textAnchor='end' fontSize='11.5' fill={quiet}>red</text>
    <text x='160' y='242' fontSize='11.5' fill={quiet}>flat side, short leg</text>
    {line('M140 226V262')}
    {gnd(140, 274)}
    <text x='162' y='279' fontSize='11.5' fill={ink}>GND</text>

    <text x='200' y='96' fontWeight='600' fill={ink}>Choose R1</text>
    <text x='200' y='118' fontSize='11.5' fill={ink}>R = (V_pin − V_f) / I</text>
    <text x='200' y='138' fontSize='11.5' fill={ink}>I = (3.3 − 2.0) V / 330 Ω</text>
    <text x='200' y='158' fontSize='11.5' fill={ink}>   ≈ 3.9 mA</text>
    <text x='200' y='182' fontSize='11.5' fill={quiet}>R1 power: 1.3 V × 3.9 mA</text>
    <text x='200' y='198' fontSize='11.5' fill={quiet}>   ≈ 5 mW, any resistor</text>

    <rect x='24' y='306' width='340' height='96' rx='4' fill={tint} stroke={edge} strokeWidth='1'/>
    <text x='36' y='328' fontWeight='600' fill={ink}>Quick picks at 3.3 V</text>
    <text x='36' y='348' fontSize='11.5' fill={ink}>red, yellow, orange (V_f ≈ 2.0 V): 330 Ω → 4 mA</text>
    <text x='36' y='366' fontSize='11.5' fill={ink}>green, blue, white (V_f ≈ 2.9 V): 100 Ω → 4 mA</text>
    <text x='36' y='386' fontSize='11.5' fill={quiet}>Never 0 Ω: the LED then takes all the pin can give.</text>

    <rect x='400' y='74' width='176' height='206' rx='6' fill='none' stroke={edge} strokeWidth='1.25' strokeDasharray='6 4'/>
    <text x='410' y='94' fontSize='11.5' fill={quiet}>inside the ESP32</text>
    <text x='488' y='118' textAnchor='middle' fontWeight='600' fill={ink}>3.3 V</text>
    <line x1='474' x2='502' y1='124' y2='124' stroke={ink} strokeWidth='2'/>
    {line('M488 124V140')}
    <rect x='480' y='140' width='16' height='40' fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='470' y='156' textAnchor='end' fontSize='11.5' fill={ink}>pull-up</text>
    <text x='470' y='172' textAnchor='end' fontSize='11.5' fill={quiet}>≈ 45 kΩ</text>
    {line('M488 180V220H660V246')}
    <circle cx='488' cy='220' r='3.5' fill={ink}/>
    {line('M488 220V250')}
    <polygon points='478,250 498,250 488,264' fill='none' stroke={ink} strokeWidth='1.25'/>
    <text x='506' y='262' fontSize='11.5' fill={quiet}>input</text>
    <circle cx='576' cy='220' r='5' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='590' y='210' fontWeight='600' fill={ink}>GPIO33</text>

    <circle cx='660' cy='250' r='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <circle cx='660' cy='290' r='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <line x1='646' x2='646' y1='242' y2='298' stroke={ink} strokeWidth='2'/>
    {line('M646 270H628M628 262V278')}
    <text x='676' y='266' fontWeight='600' fill={ink}>S1</text>
    <text x='676' y='282' fontSize='11.5' fill={quiet}>button</text>
    {line('M660 294V318')}
    {gnd(660, 330)}

    <text x='400' y='318' fontSize='11.5' fill={ink}>pinMode(33, INPUT_PULLUP);</text>
    <text x='400' y='350' fontSize='11.5' fill={ink}>released → pin reads HIGH (1)</text>
    <text x='400' y='368' fontSize='11.5' fill={ink}>pressed → pin reads LOW (0)</text>
    <text x='400' y='392' fontSize='11.5' fill={quiet}>The logic is inverted: LOW means pressed.</text>
  </svg>;
};
