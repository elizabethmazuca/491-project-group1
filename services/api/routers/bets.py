from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal

router = APIRouter()
_BETS: dict[int, dict] = {}   # id -> bet
_NEXT_ID = 1

class BetCreate(BaseModel):
    match_id: int
    selection: Literal["home", "away"]
    stake: int
    odds: float

class Bet(BaseModel):
    id: int
    match_id: int
    selection: str
    stake: int
    odds: float
    status: Literal["open", "cancelled"]

@router.post("/bets", response_model=Bet)
def create_bet(b: BetCreate):
    if b.stake <= 0 or b.odds < 1.01:
        raise HTTPException(422, "invalid bet")
    global _NEXT_ID
    bet = {"id": _NEXT_ID, "match_id": b.match_id, "selection": b.selection,
           "stake": b.stake, "odds": b.odds, "status": "open"}
    _BETS[_NEXT_ID] = bet
    _NEXT_ID += 1
    return bet  # type: ignore[return-value]

@router.get("/bets", response_model=list[Bet])
def list_bets():
    return list(_BETS.values())  # type: ignore[return-value]

@router.post("/bets/{bet_id}/cancel", response_model=Bet)
def cancel_bet(bet_id: int):
    bet = _BETS.get(bet_id)
    if not bet:
        raise HTTPException(404, "bet not found")
    if bet["status"] != "open":
        raise HTTPException(400, "bet not open")
    bet["status"] = "cancelled"
    return bet  # type: ignore[return-value]
