/* Shared helpers for portfolio demos: state, step path with locks, navigation. Yi Liu, 2026. */
const $ = id => document.getElementById(id);
const qa = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
function bump(el){ el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); }
const LOCK = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`;
async function copyText(t, statusEl){ try { await navigator.clipboard.writeText(t); statusEl.textContent = "Copied."; } catch { statusEl.textContent = "Copy isn’t available here. Select the text instead."; } }

/* makeDemo({key, steps:[{sub,nm}], fresh, done:(i,st)=>bool, render:[fn...], kpis:st=>[[k,v]]}) */
function makeDemo(cfg){
  const D = {cfg};
  D.st = cfg.fresh();
  try { const x = JSON.parse(localStorage.getItem(cfg.key)); if (x && typeof x.i === "number") D.st = Object.assign(cfg.fresh(), x); } catch {}
  D.save = () => { try { localStorage.setItem(cfg.key, JSON.stringify(D.st)); } catch {} };
  D.done = i => cfg.done(i, D.st);
  D.unlocked = i => { for (let j = 0; j < i; j++) if (!D.done(j)) return false; return true; };
  while (D.st.i > 0 && !D.unlocked(D.st.i)) D.st.i--;
  D.side = () => {
    $("path").innerHTML = cfg.steps.map((s, i) => {
      const done = D.done(i), open = D.unlocked(i);
      return `<button class="pd" data-i="${i}" aria-current="${D.st.i === i}" ${open ? "" : `disabled aria-disabled="true" title="Finish the step before to unlock this one"`}><span class="dot ${done ? "ok" : ""}">${done ? "✓" : open ? i + 1 : LOCK}</span><span><span class="sub">${esc(s.sub)}${open ? "" : " · Locked"}</span><span class="nm">${esc(s.nm)}</span></span></button>`;
    }).join("");
    qa(".pd").forEach(b => b.onclick = () => D.go(+b.dataset.i));
    if ($("kpis") && cfg.kpis) $("kpis").innerHTML = cfg.kpis(D.st).map(([k, v]) => `<div class="kpi"><span>${esc(k)}</span><b>${v}</b></div>`).join("");
    if ($("prog")) { const n = cfg.steps.filter((_, i) => D.done(i)).length; $("prog").style.width = Math.round(100 * n / cfg.steps.length) + "%"; }
  };
  D.go = i => { if (!D.unlocked(i)) return; D.st.i = i; D.save(); D.render(); window.scrollTo({top:0, behavior: RM ? "auto" : "smooth"}); };
  D.nav = nextLabel => {
    const i = D.st.i;
    const right = !nextLabel ? "" : D.done(i) ? `<button class="btn primary" id="next">${nextLabel}</button>` : `<span class="lockmsg">${LOCK} Finish this step to unlock the next one</span>`;
    return `<div class="navrow">${i > 0 ? `<button class="btn" id="back">Back</button>` : "<span></span>"}${right}</div>`;
  };
  D.wire = () => { if ($("back")) $("back").onclick = () => D.go(D.st.i - 1); if ($("next")) $("next").onclick = () => D.go(D.st.i + 1); };
  D.refresh = () => { D.save(); D.render(); };            // re-render current step after a state change
  D.render = () => { D.side(); cfg.render[D.st.i](D); D.wire(); };
  D.reset = () => { D.st = cfg.fresh(); D.save(); D.render(); window.scrollTo({top:0}); };
  return D;
}
