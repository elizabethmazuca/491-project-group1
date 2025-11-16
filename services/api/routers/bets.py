from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Literal

from .wallet import _get_balance, _add_balance  # wallet helpers

router = APIRouter(prefix="/bets", tags=["bets"])

_BETS: dict[int, dict] = {}
_NEXT_ID = 1

class BetCreate(BaseModel):
    match_id: int
    selection: Literal["home", "away"]
    stake: int = Field(ge=1)
    odds: float = Field(ge=1.01)

class Bet(BaseModel):
    id: int
    match_id: int
    selection: str
    stake: int
    odds: float
    status: Literal["open", "cancelled"]

@router.post("", response_model=Bet)
def create_bet(b: BetCreate):
    # 422 validations are handled by Pydantic constraints above (stake>=1, odds>=1.01)
    # Enforce insufficient funds (400) and reserve the stake
    if b.stake > _get_balance():
        raise HTTPException(status_code=400, detail="insufficient funds")

    _add_balance(-b.stake)  # reserve on create

    global _NEXT_ID
    bet = {
        "id": _NEXT_ID,
        "match_id": b.match_id,
        "selection": b.selection,
        "stake": b.stake,
        "odds": b.odds,
        "status": "open",
    }
    _BETS[_NEXT_ID] = bet
    _NEXT_ID += 1
    return bet  # type: ignore[return-value]

@router.get("", response_model=list[Bet])
def list_bets():
    return list(_BETS.values())  # type: ignore[return-value]

@router.post("/{bet_id}/cancel", response_model=Bet)
def cancel_bet(bet_id: int):
    bet = _BETS.get(bet_id)
    if not bet:
        raise HTTPException(status_code=404, detail="bet not found")
    if bet["status"] != "open":
        raise HTTPException(status_code=400, detail="bet not open")

    bet["status"] = "cancelled"
    _add_balance(+bet["stake"])  # refund reserved stake on cancel
    return bet  # type: ignore[return-value]
