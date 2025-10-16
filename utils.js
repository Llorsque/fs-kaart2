// Mode helpers
const MODE_KEY = 'ss_mode_v1';
function applyMode(mode){ if(mode==='mobile'){ document.body.classList.add('mobile'); } else { document.body.classList.remove('mobile'); } localStorage.setItem(MODE_KEY, mode); }
function toggleMode(){ const m = document.body.classList.contains('mobile')?'mobile':'desktop'; applyMode(m==='mobile'?'desktop':'mobile'); }
function loadMode(){ const m = localStorage.getItem(MODE_KEY)||'desktop'; applyMode(m); }

// CSV export
function toCSV(rows){
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
  const unique = Array.from(new Set(values.filter(v=>v!==''))).sort((a,b)=>a.localeCompare(b,'nl'));
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

  unique.forEach(v=>{
    const opt = document.createElement('div'); opt.className='opt';
    const cb = document.createElement('input'); cb.type='checkbox'; cb.value=v;
    const sp = document.createElement('span'); sp.textContent=v;
    opt.appendChild(cb); opt.appendChild(sp); menu.appendChild(opt);
    cb.addEventListener('change', ()=>{ if(cb.checked) state.add(v); else state.delete(v); refreshText(); });
  });

  control.addEventListener('click', ()=> wrap.classList.toggle('open'));
  document.addEventListener('click', (e)=>{ if(!wrap.contains(e.target)) wrap.classList.remove('open'); });

  return ()=> state; // getter
}

function extractSeasonKey(text){
  const s = (text??'').toString();
  const m = s.match(/(\d{4})\s*[,\/-]\s*(\d{4})/);
  if(m){ return `${m[1]}/${m[2]}`; }
  return null;
}
