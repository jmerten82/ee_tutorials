// Analog inputs: a potentiometer on A0 and a protected divider that lets A1 measure a 12 V battery.
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const dot = (x, y) => <circle cx={x} cy={y} r='3.5' fill={ink}/>;
  const gnd = (x, y) => <path d={`M${x} ${y}V${y + 8}M${x - 11} ${y + 8}H${x + 11}M${x - 7} ${y + 13}H${x + 7}M${x - 3} ${y + 18}H${x + 3}`} fill='none' stroke={ink} strokeWidth='1.5'/>;
  const resV = (x, y, hh) => <rect x={x - 8} y={y} width='16' height={hh} fill='#ffffff' stroke={ink} strokeWidth='1.5'/>;
  const pin = (x, y, label) => <g><rect x={x - 7} y={y - 7} width='14' height='14' fill='#ffffff' stroke={ink} strokeWidth='1.6'/><text x={x + 12} y={y + 4} fontSize='11.5' fontWeight='600' fill={ink}>{label}</text></g>;
  return <svg viewBox='0 0 760 470' role='img' aria-label='Potentiometer and battery divider on analog inputs' fontSize='13'>
    <defs><marker id='an-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Analog in: a knob on A0, a 12 V battery on A1</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>The ADC measures 0–3.3 V only. Anything bigger is scaled down first, with resistors that also limit fault current</text>
    <text x='24' y='86' fontWeight='600' fill={ink}>A. Potentiometer (10 kΩ linear)</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'><path d='M100 112V140'/><path d='M100 220V250'/><path d='M120 180H180'/></g>
    <text x='108' y='110' fontSize='11.5' fill={ink}>3.3V pin</text>
    {resV(100, 140, 80)}
    <path d='M134 180H112' stroke={ink} strokeWidth='1.5' markerEnd='url(#an-arrow)'/>
    <text x='74' y='176' textAnchor='end' fontSize='11.5' fill={ink}>10 kΩ</text>
    <text x='74' y='192' textAnchor='end' fontSize='11.5' fill={quiet}>wiper</text>
    {gnd(100, 250)}
    {pin(186, 180, 'A0 (pin 14)')}
    <text x='24' y='300' fontSize='11.5' fill={ink}>reads 0 … 1023 as you turn it</text>
    <text x='24' y='318' fontSize='11.5' fill={quiet}>outer legs to 3.3V and GND,</text>
    <text x='24' y='334' fontSize='11.5' fill={quiet}>never to VIN or 5 V</text>
    <path d='M290 70V450' stroke={rule} strokeWidth='1'/>
    <text x='310' y='86' fontWeight='600' fill={ink}>B. 12 V battery divider</text>
    <g fill='none' stroke={ink} strokeWidth='1.5'><path d='M380 112V130'/><path d='M380 190V280'/><path d='M380 230H470'/><path d='M380 240H430V262'/><path d='M380 340V360'/><path d='M430 270V360H380'/></g>
    <text x='388' y='110' fontSize='11.5' fontWeight='600' fill={ink}>+12 V battery</text>
    {resV(380, 130, 60)}{resV(380, 280, 60)}
    <text x='366' y='158' textAnchor='end' fontWeight='600' fill={ink}>R1</text>
    <text x='366' y='174' textAnchor='end' fontSize='11.5' fill={ink}>47 kΩ</text>
    <text x='366' y='308' textAnchor='end' fontWeight='600' fill={ink}>R2</text>
    <text x='366' y='324' textAnchor='end' fontSize='11.5' fill={ink}>10 kΩ</text>
    <path d='M418 262H442M418 270H442' stroke={ink} strokeWidth='2.4'/>
    <text x='448' y='274' fontSize='11.5' fill={ink}>100 nF</text>
    {dot(380, 230)}{dot(380, 240)}{dot(380, 360)}
    {pin(476, 230, 'A1 (pin 15)')}
    {gnd(380, 360)}
    <text x='394' y='396' fontSize='11.5' fill={ink}>battery − and Teensy GND joined</text>
    <text x='560' y='112' fontWeight='600' fill={ink}>The numbers</text>
    <text x='560' y='134' fontSize='11.5' fill={ink}>ratio = (R1 + R2) / R2 = 5.7</text>
    <text x='560' y='154' fontSize='11.5' fill={ink}>12.6 V in → 2.21 V at A1</text>
    <text x='560' y='174' fontSize='11.5' fill={ink}>full scale: 3.3 × 5.7 = 18.8 V</text>
    <text x='560' y='194' fontSize='11.5' fill={ink}>one step: 18.8 V / 1024 ≈ 18 mV</text>
    <text x='560' y='224' fontWeight='600' fill={ink}>Protection</text>
    <text x='560' y='246' fontSize='11.5' fill={ink}>24 V by mistake: 4.2 V at A1,</text>
    <text x='560' y='264' fontSize='11.5' fill={ink}>but R1 limits the clamp current</text>
    <text x='560' y='282' fontSize='11.5' fill={ink}>to well under 0.5 mA</text>
    <text x='560' y='312' fontWeight='600' fill={ink}>Why the 100 nF</text>
    <text x='560' y='334' fontSize='11.5' fill={ink}>feeds the ADC a quick charge</text>
    <text x='560' y='352' fontSize='11.5' fill={ink}>from a high-resistance source</text>
    <text x='560' y='370' fontSize='11.5' fill={ink}>and filters noise</text>
    <text x='310' y='432' fontSize='11.5' fill={quiet}>volts = raw × (3.3 / 1023) × 5.7; calibrate with your meter.</text>
  </svg>;
};
