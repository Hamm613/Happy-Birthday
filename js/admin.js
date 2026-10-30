const msgs = $("#msgs");
let since = 0, token = localStorage.getItem("hamzaTok"), timer, ac, first = true;
function beep() {            // soft two-note chime
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    [880, 1175].forEach((f, i) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.frequency.value = f; o.connect(g); g.connect(ac.destination);
      const t = ac.currentTime + i * .18;
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.25, t + .02);
      g.gain.exponentialRampToValueAtTime(.0001, t + .5); o.start(t); o.stop(t + .55);
    });
  } catch (e) {}
}
function alertMe(title, body) {
  beep();
  if ("Notification" in window && Notification.permission === "granted") new Notification(title, { body });
  if (document.hidden) document.title = "💌 " + title;
}
document.addEventListener("visibilitychange", () => { if (!document.hidden) document.title = "Hamza · Admin"; });
$("#notif").onclick = async () => { beep(); if ("Notification" in window) await Notification.requestPermission(); $("#notif").textContent = "Alerts on ✓"; };

async function api(a, body) {
  const r = await fetch(`${CONFIG.api}?a=${a}&since=${since}`, {
    method: body ? "POST" : "GET",
    headers: { "content-type": "application/json", authorization: "Bearer " + token },
    body: body && JSON.stringify(body)
  });
  if (r.status === 401) throw new Error("auth");
  return r.json();
}
async function poll() {
  try {
    const d = await api("list");
    d.messages.forEach(m => { msgs.append(bubble(m, "hamza")); if (m.from === "khansa" && !first) alertMe("Khansa sent a message", m.text); });
    d.events.forEach(e => { if (e.type === "opened" && !first) alertMe("Khansa just opened the site 💗", "She is there right now."); });
    if (d.messages.length) msgs.scrollTop = msgs.scrollHeight;
    since = d.last; first = false;
    $("#status").textContent = d.online ? "Khansa is online" : d.lastSeen ? "Last seen " + fmtTime(d.lastSeen) : "Offline";
    $("#dot").className = d.online ? "on" : "";
  } catch (e) { if (e.message === "auth") logout(); }
}
function show(on) { $("#login").hidden = on; $("#chat").hidden = !on; }
function start() { show(true); poll(); timer = setInterval(poll, 3000); }
function logout() { clearInterval(timer); localStorage.removeItem("hamzaTok"); token = null; show(false); }
$("#loginForm").onsubmit = async e => {
  e.preventDefault(); $("#err").textContent = "";
  try {
    const r = await fetch(`${CONFIG.api}?a=login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password: $("#pw").value }) });
    if (!r.ok) throw 0;
    token = (await r.json()).token; localStorage.setItem("hamzaTok", token); beep(); start();
  } catch (x) { $("#err").textContent = "Wrong password, or the server isn’t set up yet."; }
};
$("#send").onsubmit = async e => {
  e.preventDefault();
  const text = $("#txt").value.trim(); if (!text) return;
  $("#txt").value = "";
  try { await api("send", { text }); poll(); } catch (x) {}
};
if (token) start(); else show(false);
