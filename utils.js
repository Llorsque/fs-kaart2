// Mode helpers
const MODE_KEY = 'ss_mode_v1';
function applyMode(mode){ if(mode==='mobile'){ document.body.classList.add('mobile'); } else { document.body.classList.remove('mobile'); } localStorage.setItem(MODE_KEY, mode); }
function toggleMode(){ const m = document.body.classList.contains('mobile')?'mobile':'desktop'; applyMode(m==='mobile?' 'desktop':'mobile'); }
function loadMode(){ const m = localStorage.getItem(MODE_KEY)||'desktop'; applyMode(m); }

// CSV export
function toCSV(rows){
  if(!rows.length) return '';
  const headers = Object.keys(rows[0]||{});
  const lines = [headers.join(',')];
  for(const r of rows){
    const vals = headers.map(h=>{
      const s = String(r[h]??'');
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
    });
    lines.push(vals.join(','));
  }
  return lines.join('\n');
}
function exportCSV(rows, filename='export.csv'){
  const csv = toCSV(rows);
  const blob = new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
}

// Multi-select dropdowns
function buildMultiSelect(container, label, values){
  const unique = Array.from(new Set(values.map(v => (v??'').toString().trim())));
  unique.sort((a,b)=>a.localeCompare(b,'nl'));
  if(unique.length===0) return null;
  const wrap = document.createElement('div'); wrap.className='filter';
  const lab = document.createElement('div'); lab.className='label'; lab.textContent = label;
  const control = document.createElement('div'); control.className='control';
  const text = document.createElement('span'); text.textContent = 'Alles';
  const caret = document.createElement('span'); caret.textContent = '▾';
  const menu = document.createElement('div'); menu.className='menu';
  control.appendChild(text); control.appendChild(caret);
  wrap.appendChild(lab); wrap.appendChild(control); wrap.appendChild(menu);
  container.appendChild(wrap);

  const state = new Set();
  function refreshText(){ text.textContent = state.size ? Array.from(state).slice(0,3).join(', ') + (state.size>3?'…':'') : 'Alles'; }

  unique.slice(0,200).forEach(v=>{
    const opt = document.createElement('div'); opt.className='opt';
    const cb = document.createElement('input'); cb.type='checkbox'; cb.value=v;
    const sp = document.createElement('span'); sp.textContent=v || '(leeg)';
    opt.appendChild(cb); opt.appendChild(sp); menu.appendChild(opt);
    cb.addEventListener('change', ()=>{ if(cb.checked) state.add(v); else state.delete(v); refreshText(); });
  });

  control.addEventListener('click', ()=> wrap.classList.toggle('open'));
  document.addEventListener('click', (e)=>{ if(!wrap.contains(e.target)) wrap.classList.remove('open'); });

  return ()=> state; // getter
}

// Range slider builder
function buildRange(container, label, minValue, maxValue){
  const wrap = document.createElement('div'); wrap.className='filter';
  const lab = document.createElement('div'); lab.className='label'; lab.textContent = label;
  const g = document.createElement('div'); g.className='range';
  const row1 = document.createElement('div'); row1.className='row';
  const row2 = document.createElement('div'); row2.className='row';
  const outMin = document.createElement('span'); outMin.className='badge'; const outMax = document.createElement('span'); outMax.className='badge';
  const sMin = document.createElement('input'); sMin.type='range'; sMin.min=minValue; sMin.max=maxValue; sMin.value=minValue;
  const sMax = document.createElement('input'); sMax.type='range'; sMax.min=minValue; sMax.max=maxValue; sMax.value=maxValue;
  function sync(){ const a = Math.min(parseInt(sMin.value), parseInt(sMax.value)); const b = Math.max(parseInt(sMin.value), parseInt(sMax.value)); outMin.textContent = a; outMax.textContent = b; }
  sMin.addEventListener('input', sync); sMax.addEventListener('input', sync); sync();
  row1.appendChild(document.createTextNode('Min')); row1.appendChild(sMin); row1.appendChild(outMin);
  row2.appendChild(document.createTextNode('Max')); row2.appendChild(sMax); row2.appendChild(outMax);
  g.appendChild(row1); g.appendChild(row2);
  wrap.appendChild(lab); wrap.appendChild(g); container.appendChild(wrap);
  return () => [Math.min(parseInt(sMin.value), parseInt(sMax.value)), Math.max(parseInt(sMin.value), parseInt(sMax.value))];
}

// Helpers
function isTrue(val){
  const s = String(val??'').trim().toLowerCase();
  return ['ja','waar','true','1','x','y'].includes(s);
}
function toInt(val){
  const s = String(val??'').replace(/[^0-9-]/g,'').trim();
  if(s==='') return null; const n = parseInt(s,10); return isFinite(n)? n : null;
}
