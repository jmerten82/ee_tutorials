// Lesson 2 analog inputs: potentiometer on GPIO34, 12 V divider on GPIO35, and the ADC transfer curve.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gnd = (x, y) => <g><line x1={x} x2={x} y1={y - 12} y2={y} stroke={ink} strokeWidth='1.5'/><line x1={x - 12} x2={x + 12} y1={y} y2={y} stroke={ink} strokeWidth='2'/><line x1={x - 8} x2={x + 8} y1={y + 5} y2={y + 5} stroke={ink} strokeWidth='2'/><line x1={x - 4} x2={x + 4} y1={y + 10} y2={y + 10} stroke={ink} strokeWidth='2'/></g>;
  const net = (x, y, t) => <g><path d={`M${x - 32} ${y}L${x - 22} ${y - 11}H${x + 34}V${y + 11}H${x - 22}Z`} fill='#ffffff' stroke={ink} strokeWidth='1.5'/><text x={x + 6} y={y + 4.5} textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{t}</text></g>;
  const line = d => <path d={d} fill='none' stroke={ink} strokeWidth='1.5'/>;
  const res = (x, y) => <rect x={x - 8} y={y} width='16' height='40' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>;
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  // ADC curve panel: input 0 to 3.3 V on x (60 to 400), raw 0 to 4095 on y (460 to 330)
  const gx = v => 70 + v / 3.3 * 330, gy = r => 460 - r / 4095 * 94;
  const real = [[0, 0], [0.12, 0], [0.5, 500], [1.0, 1160], [1.5, 1820], [2.0, 2470], [2.5, 3100], [2.8, 3460], [3.0, 3740], [3.1, 3930], [3.17, 4095], [3.3, 4095]];
  return <svg viewBox='0 0 760 500' role='img' aria-label='Potentiometer, voltage divider and the ADC transfer curve' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Analog inputs: a knob, a 12 V divider, and what the ADC really does</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Both inputs are ADC1 pins (input only), so they keep working when Wi-Fi is on</text>

    <text x='24' y='80' fontWeight='600' fill={ink}>A. Potentiometer</text>
    <text x='60' y='106' textAnchor='middle' fontWeight='600' fill={ink}>3V3</text>
    <line x1='46' x2='74' y1='112' y2='112' stroke={ink} strokeWidth='2'/>
    {line('M60 112V140')}<rect x='52' y='140' width='16' height='96' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>{line('M60 236V262')}{gnd(60, 274)}
    <path d='M98 188H72' fill='none' stroke={ink} strokeWidth='1.5' markerEnd='url(#adc-arrow)'/>
    {line('M98 188H128')}{net(160, 188, 'GPIO34')}
    <text x='40' y='170' textAnchor='end' fontSize='11.5' fill={ink}>10</text>
    <text x='40' y='186' textAnchor='end' fontSize='11.5' fill={ink}>kΩ</text>
    <text x='96' y='176' fontSize='11.5' fill={quiet}>wiper</text>
    <text x='24' y='306' fontSize='11.5' fill={quiet}>Turning the knob moves the</text>
    <text x='24' y='322' fontSize='11.5' fill={quiet}>wiper from 0 V to 3.3 V.</text>

    <line x1='224' x2='224' y1='66' y2='326' stroke={rule} strokeWidth='1' strokeDasharray='4 4'/>
    <text x='240' y='80' fontWeight='600' fill={ink}>B. Measuring up to 17 V with a divider</text>
    <text x='290' y='106' textAnchor='middle' fontWeight='600' fill={ink}>V_in (12 V)</text>
    <circle cx='290' cy='116' r='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    {line('M290 120V132')}{res(290, 132)}{line('M290 172V196')}{res(290, 196)}{line('M290 236V262')}{gnd(290, 274)}
    <text x='278' y='150' textAnchor='end' fontWeight='600' fill={ink}>R1</text>
    <text x='278' y='166' textAnchor='end' fontSize='11.5' fill={quiet}>100 kΩ</text>
    <text x='278' y='214' textAnchor='end' fontWeight='600' fill={ink}>R2</text>
    <text x='278' y='230' textAnchor='end' fontSize='11.5' fill={quiet}>22 kΩ</text>
    {dot(290, 184)}{line('M290 184H350')}{dot(350, 184)}{line('M350 184V210')}
    <line x1='338' x2='362' y1='210' y2='210' stroke={ink} strokeWidth='2.5'/><line x1='338' x2='362' y1='218' y2='218' stroke={ink} strokeWidth='2.5'/>
    {line('M350 218V250H290')}{dot(290, 250)}
    <text x='370' y='222' fontSize='11.5' fill={quiet}>C1 100 nF</text>
    {line('M350 184H392')}{net(424, 184, 'GPIO35')}
    <text x='492' y='106' fontSize='11.5' fill={ink}>V_out = V_in × R2 / (R1 + R2)</text>
    <text x='492' y='124' fontSize='11.5' fill={ink}>12 V × 22 / 122 = 2.16 V</text>
    <text x='492' y='148' fontSize='11.5' fill={ink}>Full scale 3.1 V ↔ V_in ≈ 17.2 V</text>
    <text x='492' y='234' fontSize='11.5' fill={quiet}>If R2 falls out, R1 limits the</text>
    <text x='492' y='250' fontSize='11.5' fill={quiet}>fault current to (12 − 3.3) V /</text>
    <text x='492' y='266' fontSize='11.5' fill={quiet}>100 kΩ ≈ 0.09 mA.</text>
    <text x='492' y='290' fontSize='11.5' fill={quiet}>C1 steadies the reading: the</text>
    <text x='492' y='306' fontSize='11.5' fill={quiet}>ADC samples a tiny capacitor.</text>

    <line x1='24' x2='736' y1='338' y2='338' stroke={rule} strokeWidth='1' strokeDasharray='4 4'/>
    <text x='24' y='358' fontWeight='600' fill={ink}>C. Raw analogRead(): a dead zone at the bottom, saturation at the top (11 dB)</text>
    <rect x={gx(0.15)} y='366' width={gx(2.5) - gx(0.15)} height='94' fill={tint}/>
    <line x1='70' x2='400' y1='460' y2='460' stroke={ink} strokeWidth='1.25'/>
    <line x1='70' x2='70' y1='366' y2='460' stroke={ink} strokeWidth='1.25'/>
    <line x1={gx(0)} y1={gy(0)} x2={gx(3.3)} y2={gy(4095)} stroke={ink} strokeWidth='1.25' strokeDasharray='5 4'/>
    <path d={'M' + real.map(([v, r]) => `${gx(v).toFixed(1)} ${gy(r).toFixed(1)}`).join('L')} fill='none' stroke={ink} strokeWidth='2.5'/>
    {[0, 1, 2, 3].map(v => <g key={v}><line x1={gx(v)} x2={gx(v)} y1='460' y2='465' stroke={ink} strokeWidth='1'/><text x={gx(v)} y='480' textAnchor='middle' fontSize='11.5' fill={ink}>{`${v} V`}</text></g>)}
    <text x='62' y='372' textAnchor='end' fontSize='11.5' fill={ink}>4095</text>
    <text x='62' y='464' textAnchor='end' fontSize='11.5' fill={ink}>0</text>
    <text x='236' y='496' textAnchor='middle' fontSize='11.5' fill={quiet}>pin voltage</text>
    <text x='420' y='384' fontSize='11.5' fill={ink}>━ typical raw reading   ╍ ideal straight line</text>
    <text x='420' y='406' fontSize='11.5' fill={ink}>Dead zone below ≈ 0.1 V; bends and</text>
    <text x='420' y='422' fontSize='11.5' fill={ink}>saturates near 3.1 V.</text>
    <text x='420' y='444' fontSize='11.5' fill={ink}>Shaded: the accurate window. Keep</text>
    <text x='420' y='460' fontSize='11.5' fill={ink}>signals in it and use analogReadMilliVolts().</text>
    <defs><marker id='adc-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
  </svg>;
};
