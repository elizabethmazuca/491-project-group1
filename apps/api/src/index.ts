import express from "express";
import cors from "cors";
import { z } from "zod";
import dayjs from "dayjs";

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // allow frontend
app.use(express.json());

/**trying to setup bet,can be changed*/
type Wallet = { balance: number; lastClaimAt?: number };
type Match = {
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
type Bet = {
  id: string;
  userId: string;
  matchId: string;
  selection: "home" | "draw" | "away";
  stake: number;
  odds: number;
  status: "PENDING" | "WON" | "LOST";
  payout: number;
};

const wallets: Record<string, Wallet> = {};
const matches: Match[] = [
  {
    id: "m1",
    league: "PL",
    home: "Arsenal",
    away: "Chelsea",
    utcDate: new Date().toISOString(),
    status: "SCHEDULED",
    odds: { home: 2.2, draw: 3.1, away: 2.8 }
  },
  {
    id: "m2",
    league: "NHL",
    home: "NY Rangers",
    away: "Boston Bruins",
    utcDate: new Date().toISOString(),
    status: "SCHEDULED",
    odds: { home: 2.0, draw: 3.4, away: 3.0 }
  }
];
const bets: Bet[] = [];

function getWallet(userId: string): Wallet {
  if (!wallets[userId]) wallets[userId] = { balance: 1000 };
  return wallets[userId];
}

// Health
app.get("/health", (_req, res) => res.json({ ok: true }));

// Wallet
app.get("/wallet/:userId", (req, res) => {
  res.json(getWallet(req.params.userId));
});


// Matches
app.get("/matches", (_req, res) => {
  res.json({ items: matches });
});

// Place bet
app.post("/bets", (req, res) => {
  const Body = z.object({
    userId: z.string(),
    matchId: z.string(),
    selection: z.enum(["home", "draw", "away"]),
    amount: z.number().int().positive()
  });
  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { userId, matchId, selection, amount } = parsed.data;
  const w = getWallet(userId);
  if (w.balance < amount) return res.status(400).json({ error: "Insufficient balance" });

  const m = matches.find(m => m.id === matchId);
  if (!m) return res.status(404).json({ error: "Match not found" });
  if (m.status !== "SCHEDULED") return res.status(400).json({ error: "Betting closed" });

  w.balance -= amount;
  const odds = m.odds[selection];
  const bet: Bet = {
    id: `b${bets.length + 1}`,
    userId,
    matchId,
    selection,
    stake: amount,
    odds,
    status: "PENDING",
    payout: 0
  };
  bets.push(bet);
  res.json(bet);
});
app.get("/", (_req, res) => res.send( "hello im is running,bet?!"));

// My bets
app.get("/bets/:userId", (req, res) => {
  res.json({ items: bets.filter(b => b.userId === req.params.userId) });
});

// Leaderboard
app.get("/leaderboard", (_req, res) => {
  const rows = Object.entries(wallets)
    .map(([userId, w]) => ({ userId, balance: w.balance }))
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 10);
  res.json({ items: rows });
});

// Admin: settle a match (simulate result)
app.post("/admin/settle", (req, res) => {
  const Body = z.object({
    matchId: z.string(),
    homeScore: z.number().int().nonnegative(),
    awayScore: z.number().int().nonnegative()
  });
  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const m = matches.find(x => x.id === parsed.data.matchId);
  if (!m) return res.status(404).json({ error: "Match not found" });

  m.status = "FINISHED";
  m.homeScore = parsed.data.homeScore;
  m.awayScore = parsed.data.awayScore;

  const result =
    m.homeScore > m.awayScore ? "home" :
    m.homeScore < m.awayScore ? "away" : "draw";

  for (const b of bets.filter(b => b.matchId === m.id && b.status === "PENDING")) {
    if (b.selection === result) {
      b.status = "WON";
      b.payout = Math.floor(b.stake * b.odds);
      wallets[b.userId].balance += b.payout;
    } else {
      b.status = "LOST";
    }
  }

  res.json({ ok: true, result, score: `${m.homeScore}-${m.awayScore}` });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
