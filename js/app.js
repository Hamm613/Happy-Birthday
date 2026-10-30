const C = CONFIG;
const get = (o, p) => p.split(".").reduce((a, k) => a && a[k], o);
const sub = s => s.replace("{name}", C.name).replace("{date}",
  new Date(2000, C.birthday.month - 1, C.birthday.day).toLocaleDateString("en-GB", { day: "numeric", month: "long" }));

/* ---------- fill text from config ---------- */
$$("[data-t]").forEach(el => {
  const v = get(C, el.dataset.t);
  if (Array.isArray(v)) v.forEach(t => { const p = document.createElement("p"); p.textContent = sub(t); el.append(p); });
  else el.textContent = sub(v);
});
$("#introName").textContent = C.name;
$("#txt").placeholder = C.chat.placeholder;
document.title = `For ${C.name} 💗`;

/* animated title: letters bounce in one by one */
const wt = $("#wishTitle");
sub(C.wish.title).split("").forEach((ch, i) => {
  const s = document.createElement("span"); s.textContent = ch === " " ? "\u00A0" : ch;
  s.style.animationDelay = `${i * 60}ms`; wt.append(s);
});

/* countdown */
(function () {
  const n = new Date(), today = new Date(n.getFullYear(), n.getMonth(), n.getDate());
  const t = new Date(n.getFullYear(), C.birthday.month - 1, C.birthday.day);
  if (t < today) t.setFullYear(t.getFullYear() + 1);
  const d = Math.round((t - today) / 864e5), cd = C.wish.countdown;
  $("#count").textContent = d === 0 ? cd.today : d === 1 ? cd.tomorrow : cd.days.replace("{n}", d);
})();

/* ---------- visual effects ---------- */
const state = { page: -1 };
const fx = $("#fx");
const rnd = (a, b) => a + Math.random() * (b - a);
function petal() {
  const e = document.createElement("i"), calm = state.page === 1;
  e.className = "petal";
  e.style.cssText = `left:${rnd(0, 100)}vw;--s:${rnd(10, 20)}px;--d:${calm ? rnd(14, 20) : rnd(7, 12)}s;--x:${rnd(-120, 120)}px;--r:${rnd(200, 700)}deg`;
  fx.append(e); setTimeout(() => e.remove(), 21000);
}
function floatHeart() {
  const e = document.createElement("i");
  e.className = "heart"; e.textContent = "♥";
  e.style.cssText = `left:${rnd(0, 100)}vw;font-size:${rnd(12, 26)}px;--d:${rnd(8, 13)}s;--x:${rnd(-40, 40)}px`;
  fx.append(e); setTimeout(() => e.remove(), 14000);
}
for (let i = 0; i < 26; i++) {
  const s = document.createElement("i"); s.className = "spark";
  s.style.cssText = `left:${rnd(0, 100)}%;top:${rnd(0, 100)}%;animation-delay:${rnd(0, 4)}s;--z:${rnd(2, 5)}px`;
  fx.append(s);
}
setInterval(() => { if (!document.hidden) { petal(); if (state.page !== 1 && Math.random() < .35) floatHeart(); } }, 700);

function confetti(n = 90) {
  const cols = ["#d4af6a", "#f7d6dd", "#e8587f", "#fff6e9", "#c9a24b"];
  for (let i = 0; i < n; i++) {
    const e = document.createElement("i"); e.className = "conf";
    e.style.cssText = `left:${rnd(0, 100)}vw;background:${cols[i % 5]};--d:${rnd(3, 6)}s;--x:${rnd(-150, 150)}px;--r:${rnd(300, 900)}deg;animation-delay:${rnd(0, 1.2)}s`;
    fx.append(e); setTimeout(() => e.remove(), 8000);
  }
}
function burst(x, y) {
  for (let i = 0; i < 46; i++) {
    const e = document.createElement("i"), a = rnd(0, 6.28), r = rnd(90, 260);
    e.className = "burst"; e.textContent = ["♥", "💗", "💕", "✦"][i % 4];
    e.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(a) * r}px;--dy:${Math.sin(a) * r}px;font-size:${rnd(14, 30)}px`;
    document.body.append(e); setTimeout(() => e.remove(), 1600);
  }
}

/* ---------- music: one song per page, fades between ---------- */
const audio = new Audio(); audio.loop = true; audio.volume = 0;
let wantMusic = false, fadeT;
function fade(to, done) {
  clearInterval(fadeT);
  fadeT = setInterval(() => {
    audio.volume = Math.max(0, Math.min(1, audio.volume + (to > audio.volume ? .05 : -.05)));
    if (Math.abs(audio.volume - to) < .06) { audio.volume = to; clearInterval(fadeT); done && done(); }
  }, 80);
}
function playSong(i) {
  const src = C.songs[i]; if (!src) return;
  const start = () => { audio.src = src; if (wantMusic) audio.play().then(() => fade(.7)).catch(() => {}); };
  audio.paused ? start() : fade(0, () => { audio.pause(); start(); });
}
$("#music").onclick = () => {
  wantMusic = !wantMusic; $("#music").classList.toggle("off", !wantMusic);
  if (wantMusic) audio.play().then(() => fade(.7)).catch(() => {}); else fade(0, () => audio.pause());
};

/* ---------- page flow ---------- */
const pages = $$(".page");
function go(n) {            // intro = -1, then 0..3
  const from = pages[state.page + 1], to = pages[n + 1];
  from.classList.remove("active"); from.classList.add("out");
  setTimeout(() => from.classList.remove("out"), 750);
  to.classList.add("active"); to.scrollTop = 0;
  state.page = n; document.body.dataset.page = "p" + n;
  $$("#dots i").forEach((d, i) => d.classList.toggle("on", i <= n));
  playSong(n);
  if (n === 0) setTimeout(() => confetti(), 500);
  if (n === 3) confetti(120);
}
$("#begin").onclick = () => { wantMusic = true; $("#bar").hidden = false; go(0); initChat(); };
$$(".next").forEach(b => b.onclick = () => go(state.page + 1));

/* "Let me think" runs away and shrinks; "Yes" grows */
let tries = 0, last = 0;
const maybe = $("#maybe"), yes = $("#yes");
function dodge(e) {
  if (Date.now() - last < 350) return; last = Date.now();
  if (e.type === "click") e.preventDefault();
  tries++;
  maybe.style.transform = `translate(${rnd(-110, 110)}px,${rnd(-60, 90)}px) scale(${Math.max(.3, 1 - tries * .12)})`;
  yes.style.transform = `scale(${Math.min(1.35, 1 + tries * .06)})`;
  $("#reply").textContent = C.chance.maybeReplies[(tries - 1) % C.chance.maybeReplies.length];
}
maybe.addEventListener("pointerenter", dodge);
maybe.addEventListener("click", dodge);
yes.onclick = () => {
  const r = yes.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2);
  yes.disabled = true; maybe.style.opacity = 0;
  setTimeout(() => go(3), 1700);
};

/* ---------- live chat (visitor side, polls the Netlify Function) ---------- */
const chat = $("#chat"), msgs = $("#msgs");
$("#openChat").onclick = () => { chat.classList.add("open"); setTimeout(() => $("#txt").focus(), 400); };
$("#closeChat").onclick = () => chat.classList.remove("open");
function note(t) { const p = document.createElement("p"); p.className = "note"; p.textContent = t; msgs.append(p); }

let since = 0, opened = false;
async function api(a, body) {
  const q = `${C.api}?a=${a}&since=${since}` + (a === "list" && !opened ? "&opened=1" : "");
  const r = await fetch(q, { method: body ? "POST" : "GET", headers: { "content-type": "application/json" }, body: body && JSON.stringify(body) });
  if (!r.ok) throw new Error(r.status);
  if (a === "list") opened = true;
  return r.json();
}
async function poll() {
  try {
    const d = await api("list");
    d.messages.forEach(m => msgs.append(bubble(m, "khansa")));
    if (d.messages.length) msgs.scrollTop = msgs.scrollHeight;
    since = d.last;
    $("#status").textContent = d.online ? "Hamza is online" : "Hamza is offline";
    $("#dot").className = d.online ? "on" : "";
  } catch (e) { $("#status").textContent = "Not connected"; }
}
function initChat() {
  note(C.chat.welcome);
  poll(); setInterval(() => { if (!document.hidden) poll(); }, 3000);
}
$("#send").onsubmit = async e => {
  e.preventDefault();
  const text = $("#txt").value.trim(); if (!text) return;
  $("#txt").value = "";
  try { await api("send", { text }); poll(); } catch (x) { note(C.chat.notConnected); }
};
