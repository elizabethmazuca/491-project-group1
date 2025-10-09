// src/app/api/ai/recommendations/route.ts
import { NextResponse } from "next/server";

/**
 * Proxies to the Python AI service:
 * POST /api/ai/recommendations -> POST { ...features } http://AI_BASE/score
 *
 * Body shape expected by Python:
 * {
 *   moneyline_home_dec: number (>1),
 *   moneyline_away_dec: number (>1),
 *   home_winrate?: number (0..1),
 *   away_winrate?: number (0..1)
 * }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const aiBase =
      process.env.NEXT_PUBLIC_AI_BASE?.replace(/\/+$/, "") || "http://localhost:5055";

    const res = await fetch(`${aiBase}/score`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    // pass through status and content-type from Python service
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") ?? "application/json",
        "cache-control": "no-store",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "AI service proxy error" },
      { status: 500 }
    );
  }
}
