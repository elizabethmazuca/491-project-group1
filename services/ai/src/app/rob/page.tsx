"use client";
import { useState } from "react";
export default function RobPage() {
  const [home, setHome] = useState(0.62);
  const [away, setAway] = useState(0.38);
  const [resp, setResp] = useState("");
  async function ask() {
    const r = await fetch("/api/ai/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({home_win_pct:home,away_win_pct:away})});
    const data = await r.json(); setResp(data.reply ?? JSON.stringify(data));
  }
  return (<main className="max-w-xl mx-auto p-6 space-y-4">
    <h1 className="text-2xl font-semibold">ROB — Quick Recommendation</h1>
    <label className="block">Home Win %:
      <input type="number" step="0.01" value={home} onChange={e=>setHome(parseFloat(e.target.value))} className="border rounded p-2 w-full"/>
    </label>
    <label className="block">Away Win %:
      <input type="number" step="0.01" value={away} onChange={e=>setAway(parseFloat(e.target.value))} className="border rounded p-2 w-full"/>
    </label>
    <button onClick={ask} className="rounded-xl px-4 py-2 border">Ask ROB</button>
    {resp && <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{resp}</pre>}
  </main>);
}
