export const runtime = "nodejs";
const AI_BASE = process.env.AI_BASE_URL ?? "http://localhost:8000";
export async function POST(req: Request) {
  const body = await req.json();
  const r = await fetch(`${AI_BASE}/score`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body) });
  const data = await r.json();
  return new Response(JSON.stringify(data), { status: r.status, headers:{ "Content-Type":"application/json" }});
}
