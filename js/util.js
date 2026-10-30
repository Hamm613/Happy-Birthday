const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmtTime = ts => new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
function bubble(m, viewer) {
  const d = document.createElement("div");
  d.className = "b " + (m.from === viewer ? "me" : "them");
  const t = document.createElement("span"); t.textContent = m.text;
  const s = document.createElement("time"); s.textContent = m.ts ? fmtTime(m.ts) : "";
  d.append(t, s);
  return d;
}
