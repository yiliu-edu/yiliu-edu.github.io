/* Slide player modeled on a Storyline 360 project: menu, seekbar, timed entrances, layers, variables and next-gating.
   Yi Liu, 2026. Each course defines SL.start({...}) with its slides. */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const SL = (() => {
  let cfg, timers = [], raf = 0, nextOk = false;
  const V = {slide:0, far:0};              // player variables; courses add their own to SL.vars
  function fit(){ const w = $("sw").clientWidth, s = w / 960; $("stage").style.transform = `scale(${s})`; $("sw").style.height = (540 * s) + "px"; }
  function timeline(len, cues){
    timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf);
    const t0 = performance.now(), L = RM ? 1 : len;
    const tick = () => { const p = Math.min(1, (performance.now() - t0) / L); $("seek").style.width = (p * 100) + "%"; if (p < 1) raf = requestAnimationFrame(tick); };
    tick();
    cues.forEach(([ms, fn]) => timers.push(setTimeout(fn, RM ? 0 : ms)));
  }
  function show(el, cls){ if (!el) return; el.classList.remove("hide"); el.classList.add(cls || "in-fade"); }
  function chrome(){
    const done = i => cfg.done ? cfg.done(i) : i < V.far;
    $("mlist").innerHTML = cfg.slides.map((s, i) => `<button data-i="${i}" ${i > V.far ? "disabled" : ""} aria-current="${V.slide === i}"><span class="n ${i !== V.slide && done(i) ? "ok" : ""}">${i !== V.slide && done(i) ? "✓" : i + 1}</span>${esc(s.nm)}</button>`).join("");
    $("mlist").querySelectorAll("button").forEach(b => b.onclick = () => go(+b.dataset.i));
    $("cnt").textContent = `${V.slide + 1} / ${cfg.slides.length}`;
    $("prev").disabled = V.slide === 0;
    $("next").disabled = !nextOk || V.slide === cfg.slides.length - 1;
  }
  function unlockNext(){ nextOk = true; $("next").disabled = V.slide === cfg.slides.length - 1; }
  function go(i){ if (i < 0 || i >= cfg.slides.length) return; if (cfg.onLeave) cfg.onLeave(); V.slide = i; V.far = Math.max(V.far, i); render(); if (cfg.onSlide) cfg.onSlide(i); }
  function render(){
    $("res").hidden = true; $("rtog").setAttribute("aria-expanded", "false");
    const s = cfg.slides[V.slide];
    nextOk = !!s.free || V.slide < V.far && !s.gate;     // revisited slides stay open unless gated
    $("stage").innerHTML = `<div class="slide" id="sl">${s.html()}</div><div id="lay"></div>`;
    chrome();
    s.run && s.run();
    fit();
  }
  function layer(html){ $("lay").innerHTML = html; }
  function start(c){
    cfg = c;
    $("prev").onclick = () => go(V.slide - 1);
    $("next").onclick = () => go(V.slide + 1);
    $("replay").onclick = () => render();
    $("mtog").onclick = () => { const p = $("player"), narrow = innerWidth <= 820; if (narrow) p.classList.toggle("showmenu"); else p.classList.toggle("nomenu"); $("mtog").setAttribute("aria-expanded", narrow ? p.classList.contains("showmenu") : !p.classList.contains("nomenu")); setTimeout(fit, 0); };
    $("rtog").onclick = () => { const r = $("res"); r.hidden = !r.hidden; $("rtog").setAttribute("aria-expanded", !r.hidden); };
    addEventListener("resize", fit); try { new ResizeObserver(fit).observe($("sw")); } catch {}
    if (c.resume != null && c.resume > 0) { V.far = c.resume; V.slide = c.resume; }
    render(); fit();
  }
  return {start, go, render, timeline, show, layer, unlockNext, V, fit, get slide(){ return V.slide; }};
})();
