// Why 5 V kills a Teensy 4.1 pin, and three safe ways to cross between 5 V and 3.3 V logic.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const gnd = (x, y) => <path d={`M${x} ${y}V${y + 8}M${x - 11} ${y + 8}H${x + 11}M${x - 7} ${y + 13}H${x + 7}M${x - 3} ${y + 18}H${x + 3}`} fill='none' stroke={ink} strokeWidth='1.5'/>;
  const resV = (x, y, hh) => <rect x={x - 8} y={y} width='16' height={hh} fill='#ffffff' stroke={ink} strokeWidth='1.5'/>;
  return <svg viewBox='0 0 760 600' role='img' aria-label='5 V kills Teensy pins; three level-shifting fixes' fontSize='13'>
    <defs><marker id='fv-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>No pin is 5 V tolerant: what goes wrong, and three fixes</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Any voltage above 3.3 V (or below 0 V) on any pin, digital or analog, forces current through the protection diodes</text>
    <rect x='24' y='108' width='130' height='54' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='89' y='131' textAnchor='middle' fontWeight='600' fill={ink}>5 V device</text>
    <text x='89' y='149' textAnchor='middle' fontSize='11.5' fill={quiet}>output HIGH = 5 V</text>
    <rect x='250' y='70' width='220' height='170' rx='6' fill='none' stroke={ink} strokeWidth='1.3' strokeDasharray='6 4'/>
    <text x='460' y='232' textAnchor='end' fontSize='11.5' fill={quiet}>inside the chip</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'><path d='M154 135H330'/><path d='M330 135V122'/><path d='M330 100V88H450'/><path d='M330 135H380'/><path d='M330 135V150'/><path d='M330 172V186'/></g>
    <rect x='243' y='128' width='14' height='14' fill='#ffffff' stroke={ink} strokeWidth='1.6'/>
    <text x='238' y='124' textAnchor='end' fontSize='11.5' fill={ink}>pin</text>
    {dot(330, 135)}
    <polygon points='320,122 340,122 330,102' fill={ink} stroke={ink} strokeWidth='1.5'/><path d='M318 100H342' stroke={ink} strokeWidth='2.5'/>
    <polygon points='320,172 340,172 330,152' fill='#ffffff' stroke={ink} strokeWidth='1.5'/><path d='M318 150H342' stroke={ink} strokeWidth='2.5'/>
    {gnd(330, 186)}
    <text x='394' y='82' fontSize='11.5' fontWeight='600' fill={ink}>3.3 V rail</text>
    <polygon points='380,123 380,147 404,135' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='410' y='139' fontSize='11.5' fill={quiet}>input</text>
    <path d='M306 128V96' fill='none' stroke={ink} strokeWidth='2.4' markerEnd='url(#fv-arrow)'/>
    <text x='300' y='100' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>current</text>
    <text x='494' y='96' fontWeight='600' fill={ink}>What happens</text>
    <text x='494' y='118' fontSize='11.5' fill={ink}>1. 5 V is 1.7 V above the 3.3 V rail.</text>
    <text x='494' y='136' fontSize='11.5' fill={ink}>2. The upper clamp diode conducts.</text>
    <text x='494' y='154' fontSize='11.5' fill={ink}>3. Current pours into the pin and</text>
    <text x='494' y='170' fontSize='11.5' fill={ink}>   lifts the whole 3.3 V rail.</text>
    <text x='494' y='188' fontSize='11.5' fill={ink}>4. The pin, or the chip, dies; often</text>
    <text x='494' y='204' fontSize='11.5' fill={ink}>   silently, with no smoke.</text>
    <path d='M24 262H736' stroke={rule} strokeWidth='1'/>
    <text x='24' y='290' fontWeight='600' fill={ink}>A. 5 V signal into Teensy</text>
    <text x='24' y='306' fontSize='11.5' fill={quiet}>resistor divider, slow signals</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'><path d='M110 334V350'/><path d='M110 390V420H180'/><path d='M110 420V440'/><path d='M110 480V500'/></g>
    <text x='118' y='338' fontSize='11.5' fill={ink}>5 V signal</text>
    {resV(110, 350, 40)}{resV(110, 440, 40)}
    <text x='96' y='374' textAnchor='end' fontSize='11.5' fill={ink}>10 kΩ</text>
    <text x='96' y='464' textAnchor='end' fontSize='11.5' fill={ink}>15 kΩ</text>
    {dot(110, 420)}{gnd(110, 500)}
    <text x='132' y='412' fontSize='11.5' fontWeight='600' fill={ink}>to pin</text>
    <text x='132' y='446' fontSize='11.5' fill={quiet}>5 × 15/25 = 3.0 V</text>
    <text x='24' y='550' fontSize='11.5' fill={quiet}>fine for buttons, sensors,</text>
    <text x='24' y='566' fontSize='11.5' fill={quiet}>serial up to ~115 200 baud</text>
    <text x='268' y='290' fontWeight='600' fill={ink}>B. Teensy out to 5 V logic</text>
    <text x='268' y='306' fontSize='11.5' fill={quiet}>74AHCT125 buffer, powered at 5 V</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'><path d='M282 410H330'/><path d='M386 410H470'/><path d='M354 392V360'/><path d='M354 428V470'/><path d='M340 436V456H354'/></g>
    <polygon points='330,378 330,442 386,410' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='282' y='400' fontSize='11.5' fill={ink}>pin 11</text>
    <text x='470' y='400' textAnchor='end' fontSize='11.5' fill={ink}>to 5 V</text>
    <text x='470' y='428' textAnchor='end' fontSize='11.5' fill={quiet}>e.g. WS2812</text>
    <text x='360' y='354' fontSize='11.5' fill={ink}>VCC = 5 V</text>
    <text x='334' y='466' textAnchor='end' fontSize='11.5' fill={ink}>OE</text>{dot(354, 456)}
    {gnd(354, 470)}
    <text x='268' y='520' fontSize='11.5' fill={quiet}>reads 3.3 V as HIGH (TTL input,</text>
    <text x='268' y='536' fontSize='11.5' fill={quiet}>2.0 V threshold); drives a full 5 V.</text>
    <text x='268' y='552' fontSize='11.5' fill={quiet}>Tie OE (pin 1) low, unused inputs</text>
    <text x='268' y='568' fontSize='11.5' fill={quiet}>to GND.</text>
    <text x='512' y='290' fontWeight='600' fill={ink}>C. Both ways (I2C)</text>
    <text x='512' y='306' fontSize='11.5' fill={quiet}>BSS138 MOSFET per line</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'><path d='M520 440H592V420H600'/><path d='M632 420H640V440H728'/><path d='M600 410H632'/><path d='M616 410V362'/><path d='M560 440V420'/><path d='M560 380V362'/><path d='M696 440V420'/><path d='M696 380V362'/><path d='M560 362H616'/></g>
    <path d='M600 420H632' stroke={ink} strokeWidth='2.5'/>
    {resV(560, 380, 40)}{resV(696, 380, 40)}
    {dot(560, 440)}{dot(696, 440)}{dot(616, 362)}
    <text x='620' y='398' fontSize='11.5' fill={ink}>G</text>
    <text x='592' y='456' textAnchor='middle' fontSize='11.5' fill={ink}>S</text>
    <text x='640' y='456' textAnchor='middle' fontSize='11.5' fill={ink}>D</text>
    <text x='560' y='354' textAnchor='middle' fontSize='11.5' fill={ink}>3.3 V</text>
    <text x='696' y='354' textAnchor='middle' fontSize='11.5' fill={ink}>5 V</text>
    <text x='540' y='404' textAnchor='end' fontSize='11.5' fill={ink}>10k</text>
    <text x='716' y='404' fontSize='11.5' fill={ink}>10k</text>
    <text x='520' y='478' fontSize='11.5' fill={ink}>Teensy SDA</text>
    <text x='728' y='478' textAnchor='end' fontSize='11.5' fill={ink}>5 V SDA</text>
    <text x='512' y='520' fontSize='11.5' fill={quiet}>sold as 4-channel "logic level</text>
    <text x='512' y='536' fontSize='11.5' fill={quiet}>converter" boards; one MOSFET</text>
    <text x='512' y='552' fontSize='11.5' fill={quiet}>each for SDA and SCL</text>
  </svg>;
};
