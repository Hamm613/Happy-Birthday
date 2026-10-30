import { getStore } from "@netlify/blobs";
import { createHmac, timingSafeEqual } from "node:crypto";

const PW = () => Netlify.env.get("ADMIN_PASSWORD") || "";
const TOKEN = () => createHmac("sha256", PW()).update("hamza-admin").digest("hex");
const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });
function isAdmin(req) {
  const t = (req.headers.get("authorization") || "").replace("Bearer ", ""), k = TOKEN();
  return !!PW() && t.length === k.length && timingSafeEqual(Buffer.from(t), Buffer.from(k));
}

export default async (req) => {
  const url = new URL(req.url), a = url.searchParams.get("a");
  const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
  if (a === "login") {
    return body.password && PW() && body.password === PW() ? json({ token: TOKEN() }) : json({ error: "Wrong password" }, 401);
  }
  const admin = isAdmin(req), me = admin ? "hamza" : "khansa", other = admin ? "khansa" : "hamza";
  if (req.headers.get("authorization") && !admin) return json({ error: "auth" }, 401);

  const store = getStore("chat");
  const st = (await store.get("state", { type: "json" })) || { n: 0, messages: [], events: [], presence: {} };
  const now = Date.now(); let dirty = false;

  if (a === "send") {
    const text = String(body.text || "").trim().slice(0, 800);
    if (!text) return json({ error: "empty" }, 400);
    st.messages.push({ n: ++st.n, from: me, text, ts: now });
    if (!admin) st.events.push({ n: ++st.n, type: "message", ts: now });
    st.messages = st.messages.slice(-500); st.events = st.events.slice(-50); dirty = true;
  }
  if (a === "list") {
    if (!admin && url.searchParams.get("opened") === "1") { st.events.push({ n: ++st.n, type: "opened", ts: now }); dirty = true; }
    if (now - (st.presence[me] || 0) > 8000) { st.presence[me] = now; dirty = true; }
  }
  if (dirty) await store.setJSON("state", st);

  const since = Number(url.searchParams.get("since")) || 0;
  const seen = st.presence[other] || 0;
  return json({
    messages: st.messages.filter(m => m.n > since),
    events: admin ? st.events.filter(e => e.n > since) : [],
    last: st.n, online: now - seen < 12000, lastSeen: seen || null
  });
};
export const config = { path: "/api" };
