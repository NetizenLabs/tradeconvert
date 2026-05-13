/* ═══════════════════════════════════════
   JAVASCRIPT — ALL CONVERTERS
═══════════════════════════════════════ */

function fmt(n) {
  const abs = Math.abs(n);
  if (abs === 0) return '0';
  if (abs >= 100000) return n.toLocaleString('en-US', {maximumFractionDigits: 0});
  if (abs >= 10000)  return n.toLocaleString('en-US', {maximumFractionDigits: 1});
  if (abs >= 1000)   return n.toLocaleString('en-US', {maximumFractionDigits: 2});
  if (abs >= 100)    return parseFloat(n.toFixed(2)).toString();
  if (abs >= 10)     return parseFloat(n.toFixed(3)).toString();
  if (abs >= 1)      return parseFloat(n.toFixed(4)).toString();
  if (abs >= 0.01)   return parseFloat(n.toFixed(5)).toString();
  return n.toExponential(4);
}

/* ── PRESSURE CONVERTER ── */
const PTOPA = { psi: 6894.757, bar: 100000, kpa: 1000, mpa: 1e6, atm: 101325, mmhg: 133.322, pa: 1 };
const PNAMES = { psi:'PSI', bar:'bar', kpa:'kPa', mpa:'MPa', atm:'atm', mmhg:'mmHg', pa:'Pa' };

function calcPressure() {
  const elFrom = document.getElementById('p-from');
  if (!elFrom) return;
  const v = parseFloat(elFrom.value) || 0;
  const fu = document.getElementById('p-from-u').value;
  const tu = document.getElementById('p-to-u').value;
  const pa = v * PTOPA[fu];
  const res = pa / PTOPA[tu];
  const rf = fmt(res);
  
  const elTo = document.getElementById('p-to');
  if (elTo) elTo.value = rf;
  
  const elResN = document.getElementById('p-result-n');
  if (elResN) elResN.textContent = rf;
  
  const elResU = document.getElementById('p-result-u');
  if (elResU) elResU.textContent = PNAMES[tu];
  
  const elResEq = document.getElementById('p-result-eq');
  if (elResEq) elResEq.textContent = `${fmt(v)} ${PNAMES[fu]} = ${rf} ${PNAMES[tu]}`;
  
  const factor = PTOPA[fu] / PTOPA[tu];
  const elFormula = document.getElementById('p-formula');
  if (elFormula) elFormula.textContent = `${fmt(v)} × ${fmt(factor)} = ${rf} ${PNAMES[tu]}`;
  
  const container = document.getElementById('p-all-units');
  if (container) {
    container.innerHTML = Object.entries(PNAMES).map(([k, n]) => {
      const r = fmt(pa / PTOPA[k]);
      return `<div class="unit-result-item ${k===tu?'active-unit':''}"><div class="uri-label">${n}</div><div class="uri-val">${r}</div></div>`;
    }).join('');
  }
}

function swapP() {
  const a = document.getElementById('p-from-u'), b = document.getElementById('p-to-u');
  if (a && b) {
    [a.value, b.value] = [b.value, a.value];
    calcPressure();
  }
}

/* ── LENGTH CONVERTER ── */
const LTOM = { in: 0.0254, ft: 0.3048, yd: 0.9144, mm: 0.001, cm: 0.01, m: 1 };
const LNAMES = { in:'in', ft:'ft', yd:'yd', mm:'mm', cm:'cm', m:'m' };

function calcLength() {
  const elFrom = document.getElementById('l-from');
  if (!elFrom) return;
  const v = parseFloat(elFrom.value) || 0;
  const fu = document.getElementById('l-from-u').value;
  const tu = document.getElementById('l-to-u').value;
  const meters = v * LTOM[fu];
  const res = meters / LTOM[tu];
  const rf = fmt(res);
  
  const elTo = document.getElementById('l-to');
  if (elTo) elTo.value = rf;
  
  const elResN = document.getElementById('l-result-n');
  if (elResN) elResN.textContent = rf;
  
  const elResU = document.getElementById('l-result-u');
  if (elResU) elResU.textContent = LNAMES[tu];
  
  const elResEq = document.getElementById('l-result-eq');
  if (elResEq) elResEq.textContent = `${fmt(v)} ${LNAMES[fu]} = ${rf} ${LNAMES[tu]}`;
  
  const factor = LTOM[fu] / LTOM[tu];
  const elFormula = document.getElementById('l-formula');
  if (elFormula) elFormula.textContent = `${fmt(v)} × ${fmt(factor)} = ${rf} ${LNAMES[tu]}`;
  
  const container = document.getElementById('l-all-units');
  if (container) {
    container.innerHTML = Object.entries(LNAMES).map(([k,n]) => {
      return `<div class="unit-result-item ${k===tu?'active-unit':''}"><div class="uri-label">${n}</div><div class="uri-val">${fmt(meters/LTOM[k])}</div></div>`;
    }).join('');
  }
}

function swapL() {
  const a = document.getElementById('l-from-u'), b = document.getElementById('l-to-u');
  if (a && b) {
    [a.value, b.value] = [b.value, a.value];
    calcLength();
  }
}

/* ── WEIGHT CONVERTER ── */
const WTOK = { lb: 0.453592, kg: 1, ton_us: 907.185, ton_m: 1000, oz: 0.0283495 };
const WNAMES = { lb:'lb', kg:'kg', ton_us:'short tons', ton_m:'metric tons', oz:'oz' };

function calcWeight() {
  const elFrom = document.getElementById('w-from');
  if (!elFrom) return;
  const v = parseFloat(elFrom.value) || 0;
  const fu = document.getElementById('w-from-u').value;
  const tu = document.getElementById('w-to-u').value;
  const kg = v * WTOK[fu];
  const res = kg / WTOK[tu];
  const rf = fmt(res);
  
  const elTo = document.getElementById('w-to');
  if (elTo) elTo.value = rf;
  
  const elResN = document.getElementById('w-result-n');
  if (elResN) elResN.textContent = rf;
  
  const elResU = document.getElementById('w-result-u');
  if (elResU) elResU.textContent = WNAMES[tu];
  
  const elResEq = document.getElementById('w-result-eq');
  if (elResEq) elResEq.textContent = `${fmt(v)} ${WNAMES[fu]} = ${rf} ${WNAMES[tu]}`;
  
  const elFormula = document.getElementById('w-formula');
  if (elFormula) elFormula.textContent = `${fmt(v)} × ${fmt(WTOK[fu]/WTOK[tu])} = ${rf} ${WNAMES[tu]}`;
}

function swapW() {
  const a = document.getElementById('w-from-u'), b = document.getElementById('w-to-u');
  if (a && b) {
    [a.value, b.value] = [b.value, a.value];
    calcWeight();
  }
}

/* ── ELECTRICAL ── */
function calcElec() {
  const elWatts = document.getElementById('e-watts');
  if (!elWatts) return;
  const w = parseFloat(elWatts.value) || 0;
  const v = parseFloat(document.getElementById('e-volts').value);
  const a = w / v;
  const rf = a.toFixed(2);
  const breaker = Math.ceil((a / 0.8) / 5) * 5;
  
  const elAmps = document.getElementById('e-amps');
  if (elAmps) elAmps.value = rf;
  
  const elResN = document.getElementById('e-result-n');
  if (elResN) elResN.textContent = rf;
  
  const elResEq = document.getElementById('e-result-eq');
  if (elResEq) elResEq.textContent = `${w}W ÷ ${v}V = ${rf}A · Breaker: ${breaker}A (80% rule)`;
  
  const elFormula = document.getElementById('e-formula');
  if (elFormula) elFormula.textContent = `I = P ÷ V → ${w} ÷ ${v} = ${rf}A · NEC 80%: min ${(a/0.8).toFixed(1)}A → use ${breaker}A breaker`;
}

/* ── VOLTAGE DROP ── */
const WIRE_CM = {
  '14': 4110, '12': 6530, '10': 10380, '8': 16510, '6': 26240, '4': 41740, '3': 52620, '2': 66360, '1': 83690, '1/0': 105600, '2/0': 133100, '3/0': 167800, '4/0': 211600
};

function calcVD() {
  const elL = document.getElementById('vd-len');
  if (!elL) return;
  const l = parseFloat(elL.value) || 0;
  const i = parseFloat(document.getElementById('vd-amps').value) || 0;
  const v = parseFloat(document.getElementById('vd-volts').value) || 120;
  const awg = document.getElementById('vd-awg').value;
  const mat = document.getElementById('vd-mat').value;
  const k = (mat === 'cu') ? 12.9 : 21.2;
  const cm = WIRE_CM[awg];
  
  const vd = (2 * k * i * l) / cm;
  const vdp = (vd / v) * 100;
  
  const elResN = document.getElementById('vd-result-n');
  if (elResN) elResN.textContent = vd.toFixed(2);
  
  const elResP = document.getElementById('vd-result-p');
  if (elResP) elResP.textContent = vdp.toFixed(2) + '%';
  
  const elResEq = document.getElementById('vd-result-eq');
  if (elResEq) elResEq.textContent = `Drop: ${vd.toFixed(2)}V (${vdp.toFixed(2)}%) · NEC Recommendation: < 3%`;
  
  const elFormula = document.getElementById('vd-formula');
  if (elFormula) elFormula.textContent = `(2 × ${k} × ${i}A × ${l}ft) ÷ ${cm} CM = ${vd.toFixed(2)}V`;
}

/* ── TEMPERATURE ── */
function calcTemp() {
  const elFrom = document.getElementById('t-from');
  if (!elFrom) return;
  const v = parseFloat(elFrom.value);
  if (isNaN(v)) return;
  const fu = document.getElementById('t-from-u').value;
  const tu = document.getElementById('t-to-u').value;
  let celsius;
  if (fu==='f') celsius=(v-32)*5/9;
  else if (fu==='k') celsius=v-273.15;
  else celsius=v;
  let res;
  if (tu==='f') res=celsius*9/5+32;
  else if (tu==='k') res=celsius+273.15;
  else res=celsius;
  const rf = res.toFixed(2);
  
  const elTo = document.getElementById('t-to');
  if (elTo) elTo.value = rf;
  
  const elResN = document.getElementById('t-result-n');
  if (elResN) elResN.textContent = rf;
  
  const unames={f:'°F',c:'°C',k:'K'};
  const elResU = document.getElementById('t-result-u');
  if (elResU) elResU.textContent = unames[tu];
  
  const elResEq = document.getElementById('t-result-eq');
  if (elResEq) elResEq.textContent = `${v}${unames[fu]} = ${rf}${unames[tu]}`;
  
  const formulas={
    'f-c':`(${v} − 32) × 5/9 = ${rf}°C`,
    'f-k':`(${v} − 32) × 5/9 + 273.15 = ${rf}K`,
    'c-f':`${v} × 9/5 + 32 = ${rf}°F`,
    'c-k':`${v} + 273.15 = ${rf}K`,
    'k-c':`${v} − 273.15 = ${rf}°C`,
    'k-f':`(${v} − 273.15) × 9/5 + 32 = ${rf}°F`
  };
  const elFormula = document.getElementById('t-formula');
  if (elFormula) elFormula.textContent = formulas[fu+'-'+tu] || `${v} = ${rf}`;
}

/* ── TORQUE CONVERTER ── */
const TTORNM = { nm: 1, lbft: 1.355818, lbin: 0.112985, kgm: 9.80665, ozin: 0.00706155 };
const TNAMES = { nm:'Nm', lbft:'lb-ft', lbin:'lb-in', kgm:'kg-m', ozin:'oz-in' };

function calcTorque() {
  const elFrom = document.getElementById('tr-from');
  if (!elFrom) return;
  const v = parseFloat(elFrom.value) || 0;
  const fu = document.getElementById('tr-from-u').value;
  const tu = document.getElementById('tr-to-u').value;
  const nm = v * TTORNM[fu];
  const res = nm / TTORNM[tu];
  const rf = fmt(res);
  
  const elTo = document.getElementById('tr-to');
  if (elTo) elTo.value = rf;
  
  const elResN = document.getElementById('tr-result-n');
  if (elResN) elResN.textContent = rf;
  
  const elResU = document.getElementById('tr-result-u');
  if (elResU) elResU.textContent = TNAMES[tu];
  
  const elResEq = document.getElementById('tr-result-eq');
  if (elResEq) elResEq.textContent = `${fmt(v)} ${TNAMES[fu]} = ${rf} ${TNAMES[tu]}`;
  
  const elFormula = document.getElementById('tr-formula');
  if (elFormula) elFormula.textContent = `${fmt(v)} × ${fmt(TTORNM[fu]/TTORNM[tu])} = ${rf} ${TNAMES[tu]}`;
}

function swapTr() {
  const a = document.getElementById('tr-from-u'), b = document.getElementById('tr-to-u');
  if (a && b) {
    [a.value, b.value] = [b.value, a.value];
    calcTorque();
  }
}

/* ── VOLUME ── */
const VTOM3 = { yd3: 0.764555, ft3: 0.0283168, in3: 1.6387e-5, m3: 1, l: 0.001, gal: 0.00378541 };
const VNAMES = { yd3:'yd³', ft3:'ft³', in3:'in³', m3:'m³', l:'L', gal:'gal' };

function calcVol() {
  const elFrom = document.getElementById('v-from');
  if (!elFrom) return;
  const v = parseFloat(elFrom.value) || 0;
  const fu = document.getElementById('v-from-u').value;
  const tu = document.getElementById('v-to-u').value;
  const m3 = v * VTOM3[fu];
  const res = m3 / VTOM3[tu];
  const rf = fmt(res);
  
  const elTo = document.getElementById('v-to');
  if (elTo) elTo.value = rf;
  
  const elResN = document.getElementById('v-result-n');
  if (elResN) elResN.textContent = rf;
  
  const elResU = document.getElementById('v-result-u');
  if (elResU) elResU.textContent = VNAMES[tu];
  
  const elResEq = document.getElementById('v-result-eq');
  if (elResEq) elResEq.textContent = `${fmt(v)} ${VNAMES[fu]} = ${rf} ${VNAMES[tu]}`;
  
  const elFormula = document.getElementById('v-formula');
  if (elFormula) elFormula.textContent = `${fmt(v)} × ${fmt(VTOM3[fu]/VTOM3[tu])} = ${rf} ${VNAMES[tu]}`;
}

function swapV() {
  const a = document.getElementById('v-from-u'), b = document.getElementById('v-to-u');
  if (a && b) {
    [a.value, b.value] = [b.value, a.value];
    calcVol();
  }
}

/* ── CONCRETE CALCULATOR ── */
function calcConcrete() {
  const elL = document.getElementById('con-l');
  if (!elL) return;
  const l = parseFloat(elL.value) || 0;
  const w = parseFloat(document.getElementById('con-w').value) || 0;
  const d = parseFloat(document.getElementById('con-d').value) || 0;
  const ft3 = l * w * (d / 12);
  const yd3 = ft3 / 27;
  const m3 = ft3 * 0.0283168;
  const bags60 = Math.ceil(ft3 / 0.45);
  const bags80 = Math.ceil(ft3 / 0.60);
  
  const elYd3 = document.getElementById('con-yd3');
  if (elYd3) elYd3.textContent = yd3.toFixed(2);
  
  const elM3 = document.getElementById('con-m3');
  if (elM3) elM3.textContent = m3.toFixed(3);
  
  const elB60 = document.getElementById('con-bags60');
  if (elB60) elB60.textContent = bags60;
  
  const elB80 = document.getElementById('con-bags80');
  if (elB80) elB80.textContent = bags80;
}

/* ── LUMBER CALCULATOR ── */
function calcLumber() {
  const elT = document.getElementById('lum-t');
  if (!elT) return;
  const t = parseFloat(elT.value) || 0;
  const w = parseFloat(document.getElementById('lum-w').value) || 0;
  const l = parseFloat(document.getElementById('lum-l').value) || 0;
  const bf = (t * w * l) / 12;
  
  const elBf = document.getElementById('lum-bf');
  if (elBf) elBf.textContent = bf.toFixed(2);
  
  const elFormula = document.getElementById('lum-formula');
  if (elFormula) elFormula.textContent = `(${t} × ${w} × ${l}) ÷ 12 = ${bf.toFixed(2)} BF`;
}

/* ── FAQ TOGGLE ── */
function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  // Close all in same container
  el.closest('.faq-item').parentNode.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  el.closest('.faq-item').parentNode.querySelectorAll('.faq-q').forEach(q => { q.classList.remove('open'); q.setAttribute('aria-expanded','false'); });
  if (!isOpen) {
    answer.classList.add('open');
    el.classList.add('open');
    el.setAttribute('aria-expanded','true');
  }
}

/* ── KEYBOARD NAV for FAQ ── */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') { e.preventDefault(); toggleFaq(q); } });
});

/* ── AUTO-INIT BASED ON PAGE CONTENT ── */
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('p-from')) calcPressure();
  if (document.getElementById('l-from')) calcLength();
  if (document.getElementById('w-from')) calcWeight();
  if (document.getElementById('e-watts')) calcElec();
  if (document.getElementById('vd-len')) calcVD();
  if (document.getElementById('t-from')) calcTemp();
  if (document.getElementById('tr-from')) calcTorque();
  if (document.getElementById('v-from')) calcVol();
  if (document.getElementById('con-l')) calcConcrete();
  if (document.getElementById('lum-t')) calcLumber();
});
