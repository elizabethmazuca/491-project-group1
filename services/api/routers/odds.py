from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

router = APIRouter(prefix="/odds", tags=["odds"])

class MoneylineOdds(BaseModel):
    match_id: int
    league: str          # "ucl"
    market: str          # "moneyline"
    home_odds: float     # >= 1.01
    away_odds: float

_ODDS: dict[int, MoneylineOdds] = {
    101: MoneylineOdds(match_id=101, league="ucl", market="moneyline", home_odds=2.10, away_odds=1.85),
    102: MoneylineOdds(match_id=102, league="ucl", market="moneyline", home_odds=1.95, away_odds=2.00),
    103: MoneylineOdds(match_id=103, league="ucl", market="moneyline", home_odds=2.25, away_odds=1.75),
}

@router.get("", response_model=MoneylineOdds)  # GET /odds?match_id=101&league=ucl
def get_odds(
    match_id: int = Query(..., ge=1),
    league: str = Query("ucl", description="Only 'ucl' supported"),
):
    if league.lower() != "ucl":
        raise HTTPException(status_code=400, detail="league must be 'ucl'")
    odds = _ODDS.get(match_id)
    if not odds:
        raise HTTPException(status_code=404, detail="odds not found for match")
    return odds
