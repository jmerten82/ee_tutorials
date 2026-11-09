export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const x0 = 70, X = t => x0 + t * 3, W = 200;
  const loadI = oy => `M${X(0)} ${oy}H${X(40)}V${oy - 50}H${X(110)}V${oy}H${X(W)}`;
  const rail = (oy, depth, rec) => {
    let d = `M${X(0)} ${oy}H${X(40)}`;
    for (let i = 0; i <= 30; i++) { const t = i / 30; d += `L${X(40 + t * rec).toFixed(1)} ${(oy + depth * Math.exp(-t * 3) * (t < 0.08 ? t / 0.08 : 1)).toFixed(1)}`; }
    d += `H${X(110)}`;
    for (let i = 0; i <= 20; i++) { const t = i / 20; d += `L${X(110 + t * rec * 0.6).toFixed(1)} ${(oy - depth * 0.5 * Math.exp(-t * 3) * (t < 0.1 ? t / 0.1 : 1)).toFixed(1)}`; }
    return d + `H${X(W)}`;
  };
  return <svg viewBox='0 0 760 440' role='img' aria-label='A bulk capacitor supplies the peak current' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>A bulk capacitor supplies the peak</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>A load step (a servo starting, the ring going white) and the 5 V rail at the hub; illustrative</text>
    <text x={x0} y='86' fontWeight='600' fill={ink}>Load current</text>
    <path d={loadI(150)} fill='none' stroke={ink} strokeWidth='2'/>
    <text x={X(W) + 8} y='104' fontSize='11.5' fill={ink}>step</text>
    <line x1={x0} x2={X(W)} y1='220' y2='220' stroke={rule} strokeDasharray='4 4'/>
    <line x1={x0} x2={X(W)} y1='290' y2='290' stroke={rule} strokeDasharray='4 4'/>
    <text x={x0 - 6} y='224' textAnchor='end' fontSize='11' fill={ink}>5.0 V</text>
    <text x={x0 - 6} y='294' textAnchor='end' fontSize='11' fill={ink}>4.75</text>
    <text x={x0} y='196' fontWeight='600' fill={ink}>5 V rail, no bulk capacitor</text>
    <path d={rail(220, 90, 50)} fill='none' stroke={ink} strokeWidth='2' strokeDasharray='7 4'/>
    <text x={X(64)} y='318' fontSize='11.5' fontWeight='600' fill={ink}>dips below 4.75 V: the hub drops off USB</text>
    <text x={x0} y='354' fontWeight='600' fill={ink}>5 V rail, 1000 µF at the load</text>
    <path d={rail(378, 22, 40)} fill='none' stroke={ink} strokeWidth='2'/>
    <line x1={x0} x2={X(W)} y1='378' y2='378' stroke={rule} strokeDasharray='4 4'/>
    <text x={X(W) + 8} y='382' fontSize='11.5' fill={ink}>small dip</text>
    <text x='24' y='428' fontSize='11.5' fill={ink}>The capacitor delivers the first milliseconds of the step; the regulator catches up after it. Put it at the load, not at the supply.</text>
  </svg>;
};
