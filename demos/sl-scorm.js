/* Minimal SCORM 2004 runtime wrapper. Finds the LMS API (API_1484_11) in a parent or opener window.
   Outside an LMS every call is a harmless no-op, so the same file runs on the portfolio site. Yi Liu, 2026. */
const SCORM = (() => {
  let api = null, live = false, done = false, finished = false;
  function find(w){ let n = 0; while (w && n++ < 10) { if (w.API_1484_11) return w.API_1484_11; if (w.parent === w) break; w = w.parent; } return null; }
  try { api = find(window) || (window.opener && find(window.opener)); } catch { api = null; }
  function call(fn, ...a){ if (!live) return ""; try { return api[fn](...a); } catch { return ""; } }
  function init(){
    if (!api) return false;
    live = String(api.Initialize("")) === "true";
    if (live && call("GetValue", "cmi.completion_status") === "unknown") { call("SetValue", "cmi.completion_status", "incomplete"); call("Commit", ""); }
    return live;
  }
  const get = k => call("GetValue", k);
  const set = (k, v) => call("SetValue", k, String(v));
  function bookmark(slide, data){ set("cmi.location", slide); if (data) set("cmi.suspend_data", JSON.stringify(data).slice(0, 64000)); if (!finished) set("cmi.exit", "suspend"); call("Commit", ""); }
  function resume(){ const l = get("cmi.location"); let d = null; try { d = JSON.parse(get("cmi.suspend_data") || "null"); } catch {} return {slide: l === "" ? null : +l, data: d}; }
  function interaction(id, type, response, correct){   // records one learner response
    const n = +(get("cmi.interactions._count") || 0), p = `cmi.interactions.${n}.`;
    set(p + "id", id); set(p + "type", type); set(p + "learner_response", response); set(p + "result", correct ? "correct" : "incorrect"); set(p + "timestamp", new Date().toISOString().slice(0, 19));
    call("Commit", "");
  }
  function finish(raw, max, passMark){
    const scaled = max ? raw / max : 0;
    set("cmi.score.raw", raw); set("cmi.score.min", 0); set("cmi.score.max", max); set("cmi.score.scaled", scaled.toFixed(2));
    set("cmi.success_status", scaled >= passMark ? "passed" : "failed");
    set("cmi.completion_status", "completed"); set("cmi.exit", "normal"); finished = true;
    call("Commit", "");
  }
  function end(){ if (live && !done) { done = true; call("Commit", ""); call("Terminate", ""); } }
  addEventListener("pagehide", end); addEventListener("beforeunload", end);
  return {init, bookmark, resume, interaction, finish, end, get live(){ return live; }};
})();
