from fastapi import APIRouter
from sqlalchemy import select
from datetime import datetime
from ...db.base import SessionLocal
from ...db.models import Game, Odds

router = APIRouter()

@router.get("/games")
def list_games(date: str | None = None):
    with SessionLocal() as s:
        if date:
            start = datetime.fromisoformat(date + "T00:00:00")
            end = datetime.fromisoformat(date + "T23:59:59")
            games = s.execute(
                select(Game).where(Game.start_time >= start, Game.start_time <= end)
            ).scalars().all()
        else:
            games = s.execute(select(Game)).scalars().all()
        out = []
        for g in games:
            odds = s.execute(select(Odds).where(Odds.game_id == g.id)).scalars().all()
            out.append({
                "id": g.id,
                "league": g.league,
                "start_time": g.start_time.isoformat(),
                "status": g.status,
                "home_team": g.home_team,
                "away_team": g.away_team,
                "odds": [{"market": o.market, "side": o.side, "price_dec": o.price_dec} for o in odds]
            })
        return out
