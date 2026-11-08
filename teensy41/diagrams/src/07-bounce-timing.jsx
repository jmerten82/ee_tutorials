// Contact bounce versus the debounced output of the Bounce library (default mode: wait until the input is stable).
export default () => {
  const edge = 'var(--cds-text-secondary)', ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const X = t => 200 + t * 11.5;
  const trace = (edges, startHigh, yH, yL) => {
    let lvl = startHigh, d = `M${X(0)} ${startHigh ? yH : yL}`;
    edges.forEach(t => { d += `H${X(t)}V${lvl ? yL : yH}`; lvl = !lvl; });
    return d + `H${X(45)}`;
  };
  const contact = [3, 4, 5.4, 6, 7.4, 8, 9.6, 27, 27.6, 28.6, 29.2, 30];
  const falls = [3, 5.4, 7.4, 9.6];
  return <svg viewBox='0 0 760 430' role='img' aria-label='Switch bounce and the debounced signal' fontSize='13'>
    <defs><marker id='bt-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill={ink}/></marker></defs>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>One press, four presses: why buttons need debouncing</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>Pin 2 with INPUT_PULLUP: HIGH = released, LOW = pressed. Times in milliseconds; the bounce is drawn stretched</text>
    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45].map(t => <g key={'g' + t}><path d={`M${X(t)} 340V348`} stroke={ink} strokeWidth='1'/><text x={X(t)} y='364' textAnchor='middle' fontSize='11.5' fill={quiet}>{t}</text></g>)}
    <path d={`M${X(0)} 344H${X(45)}`} stroke={ink} strokeWidth='1'/><text x={X(45)} y='382' textAnchor='end' fontSize='11.5' fill={quiet}>time (ms)</text>
    <text x='24' y='100' fontWeight='600' fill={ink}>Switch contact</text>
    <text x='24' y='118' fontSize='11.5' fill={quiet}>what digitalRead() sees</text>
    <text x='184' y='94' textAnchor='end' fontSize='11.5' fill={ink}>HIGH</text>
    <text x='184' y='140' textAnchor='end' fontSize='11.5' fill={ink}>LOW</text>
    <path d={trace(contact, true, 90, 136)} fill='none' stroke={ink} strokeWidth='2'/>
    {falls.map((t, i) => <g key={'f' + i}><circle cx={X(t)} cy='160' r='9' fill='#ffffff' stroke={ink} strokeWidth='1.3'/><text x={X(t)} y='164' textAnchor='middle' fontSize='11.5' fill={ink}>{i + 1}</text></g>)}
    <text x={X(11.5)} y='164' fontSize='11.5' fill={ink}>4 falling edges = 4 "presses" counted by naive code</text>
    <text x={X(31.5)} y='120' fontSize='11.5' fill={quiet}>release bounces too</text>
    <path d={`M${X(3)} 196H${X(9.6)}`} stroke={ink} strokeWidth='1.2' markerStart='url(#bt-arrow)' markerEnd='url(#bt-arrow)'/>
    <text x={X(3)} y='214' fontSize='11.5' fill={ink}>bounce: typically 1–5 ms (drawn wider here)</text>
    <path d='M24 236H736' stroke={rule} strokeWidth='1'/>
    <text x='24' y='266' fontWeight='600' fill={ink}>Bounce output</text>
    <text x='24' y='284' fontSize='11.5' fill={quiet}>interval(10)</text>
    <text x='184' y='262' textAnchor='end' fontSize='11.5' fill={ink}>HIGH</text>
    <text x='184' y='308' textAnchor='end' fontSize='11.5' fill={ink}>LOW</text>
    <path d={trace([19.6, 40], true, 258, 304)} fill='none' stroke={ink} strokeWidth='2.6'/>
    <rect x={X(9.6)} y='266' width={X(19.6) - X(9.6)} height='30' fill={tint} stroke='none'/>
    <path d={`M${X(9.6)} 281H${X(19.6)}`} stroke={ink} strokeWidth='1.2' markerStart='url(#bt-arrow)' markerEnd='url(#bt-arrow)'/>
    <text x={X(14.6)} y='252' textAnchor='middle' fontSize='11.5' fill={ink}>10 ms steady</text>
    <rect x={X(30)} y='266' width={X(40) - X(30)} height='30' fill={tint} stroke='none'/>
    <path d={`M${X(30)} 281H${X(40)}`} stroke={ink} strokeWidth='1.2' markerStart='url(#bt-arrow)' markerEnd='url(#bt-arrow)'/>
    <text x={X(35)} y='252' textAnchor='middle' fontSize='11.5' fill={ink}>10 ms steady</text>
    <text x={X(19.6) + 6} y='328' fontSize='11.5' fontWeight='600' fill={ink}>fell() true once</text>
    <text x={X(40) - 6} y='328' textAnchor='end' fontSize='11.5' fontWeight='600' fill={ink}>rose() true once</text>
    <text x='24' y='408' fontSize='11.5' fill={quiet}>The library only reports a change after the pin has stopped changing for the whole interval: one press, one event, about 10 ms late.</text>
  </svg>;
};
