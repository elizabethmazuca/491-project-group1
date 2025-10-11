from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

router = APIRouter()

class MoneylineOdds(BaseModel):
    match_id: int
    league: str  # "ucl"
    market: str  # "moneyline"
    home_odds: float  # decimal odds >= 1.01
    away_odds: float

# Toy UCL odds table
_ODDS: dict[int, MoneylineOdds] = {
    101: MoneylineOdds(match_id=101, league="ucl", market="moneyline", home_odds=2.10, away_odds=1.85),
    102: MoneylineOdds(match_id=102, league="ucl", market="moneyline", home_odds=1.95, away_odds=2.00),
    103: MoneylineOdds(match_id=103, league="ucl", market="moneyline", home_odds=2.25, away_odds=1.75),
}

@router.get("", response_model=MoneylineOdds)
def get_odds(
    match_id: int = Query(..., ge=1),
    league: str = Query("ucl", description="Only 'ucl' supported")
):
    if league != "ucl":
        raise HTTPException(400, "only Champions League (ucl) supported in MVP")
    odds = _ODDS.get(match_id)
    if not odds:
        raise HTTPException(404, "odds not found for match")
    return odds
