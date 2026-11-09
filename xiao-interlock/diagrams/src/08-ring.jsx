export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gnd = (x, y) => <g stroke={ink} strokeWidth='1.5'><line x1={x - 12} x2={x + 12} y1={y} y2={y}/><line x1={x - 8} x2={x + 8} y1={y + 5} y2={y + 5}/><line x1={x - 4} x2={x + 4} y1={y + 10} y2={y + 10}/></g>;
  const rc = 600, ry = 180, rr = 60;
  return <svg viewBox='0 0 760 470' role='img' aria-label='Ring wiring through the 74AHCT125' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The status ring: 3.3 V data, 5 V pixels</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>One buffer of the 74AHCT125 accepts 3.3 V as HIGH and drives a full 5 V signal. Pin numbers for the DIP-14 part</text>
    <rect x='24' y='150' width='120' height='60' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <text x='84' y='176' textAnchor='middle' fontWeight='600' fill={ink}>XIAO</text>
    <text x='84' y='196' textAnchor='middle' fontSize='11' fill={ink}>D10 (GPIO 3)</text>
    <path d='M144 180H250' stroke={ink} strokeWidth='1.5'/>
    <text x='196' y='172' textAnchor='middle' fontSize='11' fill={quiet}>3.3 V data</text>
    <text x='244' y='198' textAnchor='end' fontSize='11' fontWeight='600' fill={ink}>pin 2 (1A)</text>
    <polygon points='250,130 250,230 340,180' fill={tint} stroke={ink} strokeWidth='2'/>
    <text x='278' y='186' fontSize='11' fontWeight='600' fill={ink}>AHCT</text>
    <path d='M296 106V155' stroke={ink} strokeWidth='1.5'/>
    <circle cx='296' cy='159' r='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='304' y='120' fontSize='11' fontWeight='600' fill={ink}>pin 1 (1OE): to GND</text>
    <text x='304' y='134' fontSize='10.5' fill={quiet}>low enables the buffer</text>
    <text x='296' y='100' textAnchor='middle' fontSize='11' fontWeight='600' fill={ink}>GND</text>
    <path d='M340 180H440' stroke={ink} strokeWidth='1.5'/>
    <text x='346' y='198' fontSize='11' fontWeight='600' fill={ink}>pin 3 (1Y)</text>
    <text x='390' y='172' textAnchor='middle' fontSize='11' fill={quiet}>5 V data</text>
    <rect x='440' y='172' width='44' height='16' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='462' y='166' textAnchor='middle' fontSize='11' fontWeight='600' fill={ink}>330 Ω</text>
    <path d={`M484 180H${rc - rr}`} stroke={ink} strokeWidth='1.5'/>
    <text x={rc - rr - 4} y='198' textAnchor='end' fontSize='11' fill={ink}>DIN</text>
    <circle cx={rc} cy={ry} r={rr} fill='none' stroke={ink} strokeWidth='2'/>
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * 2 * Math.PI;
      return <rect key={i} x={rc + rr * Math.cos(a) - 5} y={ry + rr * Math.sin(a) - 5} width='10' height='10' fill={tint} stroke={ink} strokeWidth='1'/>;
    })}
    <text x={rc} y={ry - 4} textAnchor='middle' fontSize='12' fontWeight='600' fill={ink}>WS2812</text>
    <text x={rc} y={ry + 12} textAnchor='middle' fontSize='11' fill={quiet}>ring</text>
    <path d={`M${rc + rr} ${ry - 30}H720V280`} fill='none' stroke={ink} strokeWidth='1.5'/>
    <path d={`M${rc + rr} ${ry + 30}H700V300`} fill='none' stroke={ink} strokeWidth='1.5'/>
    <text x='724' y='160' fontSize='11' fill={ink}>5V</text>
    <text x='696' y='250' textAnchor='end' fontSize='11' fill={ink}>GND</text>
    <rect x='560' y='280' width='176' height='46' rx='4' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <text x='648' y='299' textAnchor='middle' fontSize='11.5' fontWeight='600' fill={ink}>5 V buck, not the XIAO</text>
    <text x='648' y='316' textAnchor='middle' fontSize='11' fill={ink}>1000 µF across 5 V and GND</text>
    <rect x='24' y='262' width='500' height='120' rx='6' fill={tint}/>
    <text x='36' y='284' fontSize='12' fontWeight='600' fill={ink}>74AHCT125, DIP-14: every pin</text>
    <text x='36' y='304' fontSize='11.5' fill={ink}>14 VCC to 5 V, 7 GND to GND, 100 nF from 14 to 7 next to the chip</text>
    <text x='36' y='322' fontSize='11.5' fill={ink}>1 (1OE) to GND, 2 (1A) from D10, 3 (1Y) to the ring through 330 Ω</text>
    <text x='36' y='340' fontSize='11.5' fill={ink}>Unused inputs 5, 9, 12 to GND; unused enables 4, 10, 13 to 5 V</text>
    <text x='36' y='358' fontSize='11.5' fill={ink}>Unused outputs 6, 8, 11 left open</text>
    <text x='36' y='374' fontSize='10.5' fill={quiet}>Check against the pin configuration in your part's datasheet.</text>
    <text x='24' y='414' fontSize='11.5' fill={ink}>The 330 Ω goes at the ring's end of the data wire. One common ground for XIAO, chip, ring and 12 V.</text>
    <text x='24' y='434' fontSize='11.5' fill={ink}>WS2812 needs a HIGH of about 0.7 × 5 V = 3.5 V: the XIAO's 3.3 V alone is not enough.</text>
    <text x='24' y='454' fontSize='11.5' fill={quiet}>The ring is an indicator only. A dark ring proves nothing about the state of the fire rail.</text>
  </svg>;
};
