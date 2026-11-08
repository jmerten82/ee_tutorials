// CAN bus on one Teensy: CAN1 and CAN2 each through an SN65HVD230 3.3 V transceiver, a terminated two-wire bus between them.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const xcvr = (x, name, leftPins, rightPins) => <g>
    <rect x={x} y='180' width='100' height='120' rx='6' fill={tint} stroke={ink} strokeWidth='1.8'/>
    <text x={x + 50} y='200' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>{name}</text>
    <text x={x + 50} y='292' textAnchor='middle' fontSize='11.5' fill={quiet}>SN65HVD230</text>
    {leftPins.map(p => <text key={name + p[0]} x={x + 6} y={p[1] + 4} fontSize='11.5' fill={ink}>{p[0]}</text>)}
    {rightPins.map(p => <text key={name + p[0]} x={x + 94} y={p[1] + 4} textAnchor='end' fontSize='11.5' fill={ink}>{p[0]}</text>)}
    <path d={`M${x + 50} 180V162`} stroke={ink} strokeWidth='1.5'/><text x={x + 50} y='156' textAnchor='middle' fontSize='11.5' fill={ink}>3.3V</text>
  </g>;
  const term = x => <g><rect x={x - 7} y='233' width='14' height='24' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>{dot(x, 230)}{dot(x, 260)}<path d={`M${x} 230V233M${x} 257V260`} stroke={ink} strokeWidth='1.5'/><text x={x} y='284' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>120 Ω</text></g>;
  return <svg viewBox='0 0 760 560' role='img' aria-label='CAN bus between CAN1 and CAN2 with two transceivers' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>CAN bus on one board: CAN1 talks to CAN2</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Each CAN port needs a transceiver; the bus is two wires (CANH, CANL) with a 120 Ω resistor at each end</text>
    <rect x='24' y='170' width='110' height='160' rx='6' fill={tint} stroke={ink} strokeWidth='2'/>
    <text x='34' y='190' fontSize='11.5' fontWeight='600' fill={ink}>Teensy 4.1</text>
    <text x='126' y='214' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>22 CTX1</text>
    <text x='126' y='244' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>23 CRX1</text>
    <text x='126' y='294' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>0 CRX2</text>
    <text x='126' y='314' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>1 CTX2</text>
    {xcvr(190, 'node A', [['D', 210], ['R', 240]], [['CANH', 230], ['CANL', 260]])}
    {xcvr(560, 'node B', [['CANH', 230], ['CANL', 260]], [['D', 210], ['R', 240]])}
    <g fill='none' stroke={ink} strokeWidth='1.5'>
      <path d='M134 210H190M134 240H190'/>
      <path d='M660 210H710V430H160V310H134'/>
      <path d='M660 240H690V410H176V290H134'/>
    </g>
    <path d='M290 230H560' stroke={ink} strokeWidth='2.4'/>
    <path d='M290 260H560' stroke={ink} strokeWidth='2.4' strokeDasharray='10 4'/>
    {term(320)}{term(530)}
    <text x='425' y='222' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>CANH</text>
    <text x='425' y='280' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>CANL</text>
    <text x='425' y='300' textAnchor='middle' fontSize='11.5' fill={quiet}>twisted pair</text>
    <text x='240' y='326' textAnchor='middle' fontSize='11.5' fill={ink}>GND to Teensy GND</text>
    <text x='610' y='326' textAnchor='middle' fontSize='11.5' fill={ink}>GND to Teensy GND</text>
    <text x='290' y='402' fontSize='11.5' fill={quiet}>CTX2 → D of node B</text>
    <text x='290' y='424' fontSize='11.5' fill={quiet}>R of node B → CRX2</text>
    <path d='M24 452H736' stroke={rule} strokeWidth='1'/>
    <text x='24' y='476' fontSize='11.5' fill={ink}>Teensy CTX goes to the transceiver D (TX) input, CRX to its R (RX) output. Breakouts often label these CTX/CRX or TX/RX.</text>
    <text x='24' y='496' fontSize='11.5' fill={ink}>SN65HVD230 runs on 3.3 V. Do not use a 5 V-only transceiver (TJA1050, MCP2551): its RX output would put 5 V on a pin.</text>
    <text x='24' y='516' fontSize='11.5' fill={ink}>Exactly two terminators: power off and measure about 60 Ω between CANH and CANL. Many breakouts carry one already.</text>
    <text x='24' y='536' fontSize='11.5' fill={quiet}>The Rs pin (8) must be low for full speed; breakout boards tie it to GND for you.</text>
  </svg>;
};
