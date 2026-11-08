export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)', tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  const gx = 70, gy = 120, dw = 46, dh = 36; // 10 x 8 grid
  const lines = [];
  for (let i = 0; i <= 10; i++) lines.push(<line key={'v' + i} x1={gx + i * dw} x2={gx + i * dw} y1={gy} y2={gy + 8 * dh} stroke={rule} strokeWidth={i === 5 ? 1.2 : 0.6} strokeDasharray={i === 0 || i === 10 ? '' : '2 3'}/>);
  for (let j = 0; j <= 8; j++) lines.push(<line key={'h' + j} x1={gx} x2={gx + 10 * dw} y1={gy + j * dh} y2={gy + j * dh} stroke={rule} strokeWidth={j === 4 ? 1.2 : 0.6} strokeDasharray={j === 0 || j === 8 ? '' : '2 3'}/>);
  const lo = gy + 6 * dh, hi = gy + 3 * dh, mid = gy + 4.5 * dh, right = gx + 10 * dw;
  let d = `M${gx} ${lo}`;
  for (let c = 0; c < 4; c++) { const x0 = gx + c * 115; d += `H${x0 + 30}V${hi}H${x0 + 30 + 29}V${lo}`; }
  d += `H${right}`;
  const box = (x, w, l1, l2, label) => <g>
    <rect x={x} y='420' width={w} height='36' rx='3' fill='#ffffff' stroke={ink} strokeWidth='1.2'/>
    <text x={x + 8} y={l2 ? 435 : 443} fontSize='11' fill={ink}>{l1}</text>
    {l2 ? <text x={x + 8} y='450' fontSize='11' fill={ink}>{l2}</text> : null}
    {label ? <text x={x + w / 2} y='476' textAnchor='middle' fontSize='11.5' fill={quiet}>{label}</text> : null}
  </g>;
  return <svg viewBox='0 0 760 490' role='img' aria-label='The screen of the SDS804X HD' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>The screen</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>10 divisions across, 8 down. Touch any box to change its settings</text>
    <rect x='24' y='62' width='712' height='26' fill={tint} stroke={ink} strokeWidth='1'/>
    <text x='34' y='80' fontSize='11.5' fill={ink}>menu bar: touch it to open the main menus</text>
    {lines}
    <path d={d} fill='none' stroke={ink} strokeWidth='2'/>
    <path d={`M${gx - 12} ${lo - 7}L${gx - 2} ${lo}L${gx - 12} ${lo + 7}z`} fill={ink}/>
    <text x={gx - 16} y={lo - 10} textAnchor='end' fontSize='11' fontWeight='600' fill={ink}>C1</text>
    <text x={gx - 16} y={lo + 4} textAnchor='end' fontSize='11' fill={ink}>0 V</text>
    <path d={`M${right + 12} ${mid - 7}L${right + 2} ${mid}L${right + 12} ${mid + 7}z`} fill={ink}/>
    <text x={right + 16} y={mid + 22} textAnchor='start' fontSize='10.5' fill={ink}>trigger</text>
    <text x={right + 16} y={mid + 35} textAnchor='start' fontSize='10.5' fill={ink}>level</text>
    <path d={`M${gx + 5 * dw - 7} ${gy - 12}L${gx + 5 * dw} ${gy - 2}L${gx + 5 * dw + 7} ${gy - 12}z`} fill={ink}/>
    <text x={gx + 5 * dw + 12} y={gy - 5} fontSize='11.5' fill={ink}>trigger point</text>
    <rect x='588' y='120' width='148' height='288' fill='#ffffff' stroke={ink} strokeWidth='1.5'/>
    <rect x='588' y='120' width='148' height='24' fill={tint} stroke={ink} strokeWidth='1'/>
    <text x='596' y='137' fontSize='11.5' fontWeight='600' fill={ink}>dialog box: C1</text>
    {['Coupling  DC', 'BW limit  Full', 'Probe  10X', 'Invert  off', 'Label', 'Deskew  0 s'].map((t, i) => <text key={t} x='598' y={166 + i * 22} fontSize='11.5' fill={ink}>{t}</text>)}
    <text x='662' y='330' textAnchor='middle' fontSize='11.5' fill={quiet}>settings of what</text>
    <text x='662' y='345' textAnchor='middle' fontSize='11.5' fill={quiet}>you opened last</text>
    {box(24, 124, 'C1 DC1M 1.00V/div', null, null)}
    {box(154, 124, 'C2 DC1M 1.00V/div', null, null)}
    <text x='151' y='476' textAnchor='middle' fontSize='11.5' fill={quiet}>channel descriptor boxes</text>
    {box(300, 200, 'Timebase 200 µs/div', '500 MSa/s  1 Mpts', 'timebase: sample rate, memory')}
    {box(520, 216, 'Trigger C1 DC Auto', 'Edge ↑ 1.65 V', 'trigger settings')}
  </svg>;
};
