export const metadata = { title: "Live Odds (Mock) • Betz" };

type Match = { id: string; home: string; away: string; homeOdds: number; awayOdds: number; start: string; };

const MOCK: Match[] = [
  { id: "1", home: "LA Galaxy",  away: "Seattle",  homeOdds: -120, awayOdds: +105, start: "2025-10-14T18:00:00Z" },
  { id: "2", home: "Arsenal",    away: "Chelsea",  homeOdds: +110, awayOdds: -102, start: "2025-10-14T20:00:00Z" },
  { id: "3", home: "Barcelona",  away: "Madrid",   homeOdds: -135, awayOdds: +115, start: "2025-10-15T01:00:00Z" },
];

function formatOdds(n: number) { return n > 0 ? `+${n}` : `${n}`; }

export default function OddsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Live Odds (Mock)</h1>
      <p className="text-sm text-neutral-400 mb-8">
        Demo-only data for Sprint 2. No database required.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {MOCK.map(m => (
          <div key={m.id} className="rounded-2xl border border-neutral-800 p-4 hover:bg-neutral-900 transition">
            <div className="text-sm text-neutral-400">{new Date(m.start).toLocaleString()}</div>
            <div className="mt-2 text-lg">
              <span className="font-medium">{m.home}</span> vs <span className="font-medium">{m.away}</span>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <span className="rounded-md bg-neutral-800 px-3 py-1">Home {formatOdds(m.homeOdds)}</span>
              <span className="rounded-md bg-neutral-800 px-3 py-1">Away {formatOdds(m.awayOdds)}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
