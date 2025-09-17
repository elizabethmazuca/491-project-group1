export type Match = {
  id: string;
  league: string;
  home: string;
  away: string;
  utcDate: string;
  status: "SCHEDULED" | "FINISHED";
  odds: { home: number; draw: number; away: number };
  homeScore?: number;
  awayScore?: number;
};

export type Bet = {
  id: string;
  userId: string;
  matchId: string;
  selection: "home" | "draw" | "away";
  stake: number;
  odds: number;
  status: "PENDING" | "WON" | "LOST";
  payout: number;
};

const API = "http://localhost:5050";

// Wallet
export async function fetchWallet(userId: string) {
  const r = await fetch(`${API}/wallet/${userId}`);
  return r.json();
}

// Daily claim
export async function claimDaily(userId: string) {
  const r = await fetch(`${API}/daily/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  });
  return r.json().then(d => ({ ok: r.ok, data: d }));
}

// Matches
export async function fetchMatches() {
  const r = await fetch(`${API}/matches`);
  const d = await r.json();
  return d.items as Match[];
}

// Place bet
export async function placeBet(input: {
  userId: string;
  matchId: string;
  selection: "home" | "draw" | "away";
  amount: number;
}) {
  const r = await fetch(`${API}/bets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  return r.json().then(d => ({ ok: r.ok, data: d }));
}

// My bets
export async function fetchMyBets(userId: string) {
  const r = await fetch(`${API}/bets/${userId}`);
  const d = await r.json();
  return d.items as Bet[];
}

// Leaderboard
export async function fetchLeaderboard() {
  const r = await fetch(`${API}/leaderboard`);
  const d = await r.json();
  return d.items as { userId: string; balance: number }[];
}
