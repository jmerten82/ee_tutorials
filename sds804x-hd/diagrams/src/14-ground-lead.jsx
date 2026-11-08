export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const edge = (ox, oy, ringAmp) => {
    let d = `M${ox} ${oy}H${ox + 60}`;
    for (let i = 0; i <= 10; i++) d += `L${(ox + 60 + i * 1.2).toFixed(1)} ${(oy - (70 * i) / 10).toFixed(1)}`;
    for (let i = 1; i <= 120; i++) { const t = i / 120; d += `L${(ox + 72 + t * 200).toFixed(1)} ${(oy - 70 - ringAmp * Math.exp(-t * 5) * Math.cos(t * 40)).toFixed(1)}`; }
    return d;
  };
  const board = (ox, spring) => <g>
    <rect x={ox} y='96' width='300' height='120' rx='6' fill={tint} stroke={ink} strokeWidth='1.5'/>
    <circle cx={ox + 150} cy='130' r='5' fill={ink}/>
    <text x={ox + 160} y='126' fontSize='11.5' fill={ink}>signal pin</text>
    <circle cx={spring ? ox + 170 : ox + 40} cy={spring ? 150 : 196} r='5' fill={ink}/>
    <text x={spring ? ox + 180 : ox + 50} y={spring ? 160 : 200} fontSize='11.5' fill={ink}>GND</text>
    <path d={`M${ox + 150} 130L${ox + 150} 74`} stroke={ink} strokeWidth='6'/>
    <text x={ox + 160} y='80' fontSize='11.5' fontWeight='600' fill={ink}>probe tip</text>
    {spring
      ? <path d={`M${ox + 150} 100C${ox + 160} 100 ${ox + 170} 110 ${ox + 170} 150`} fill='none' stroke={ink} strokeWidth='2'/>
      : <g>
        <path d={`M${ox + 150} 100C${ox + 60} 70 ${ox - 20} 120 ${ox + 40} 196`} fill={'#ffffff'} fillOpacity='0.0' stroke={ink} strokeWidth='2'/>
        <path d={`M${ox + 150} 100C${ox + 60} 70 ${ox - 20} 120 ${ox + 40} 196L${ox + 150} 130z`} fill={rule} fillOpacity='0.35' stroke='none'/>
        <text x={ox + 74} y='150' fontSize='11.5' fontWeight='600' fill={ink}>loop area</text>
      </g>}
  </g>;
  return <svg viewBox='0 0 760 440' role='img' aria-label='A long ground lead adds ringing to fast edges' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The ground lead is part of the circuit</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Its loop has inductance; with the probe's capacitance it rings on every fast edge</text>
    {board(30, false)}
    {board(420, true)}
    <text x='30' y='244' fontWeight='600' fill={ink}>15 cm ground lead: big loop</text>
    <text x='420' y='244' fontWeight='600' fill={ink}>Ground spring: tiny loop</text>
    <path d={edge(30, 380, 26)} fill='none' stroke={ink} strokeWidth='2'/>
    <path d={edge(420, 380, 4)} fill='none' stroke={ink} strokeWidth='2'/>
    <text x='30' y='410' fontSize='11.5' fill={ink}>overshoot and ringing that are not in the circuit</text>
    <text x='420' y='410' fontSize='11.5' fill={ink}>the edge as it really is (within 70 MHz)</text>
    <text x='24' y='432' fontSize='11.5' fill={quiet}>Use the spring for any edge faster than about 20 ns, and for spikes on switching nodes.</text>
  </svg>;
};
