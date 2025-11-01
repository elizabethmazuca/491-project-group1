# services/api/routers/matches.py
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Literal, Optional

# Prefix avoids FastAPIError: path cannot be empty when included with no prefix
router = APIRouter(prefix="/matches", tags=["matches"])

League = Literal["ucl"]  # UEFA Champions League only for this MVP
Stage = Literal["group", "round_of_16", "quarterfinal", "semifinal", "final"]
Status = Literal["scheduled", "finished"]

class Match(BaseModel):
    id: int = Field(..., ge=1)
    league: League
    stage: Stage
    home: str
    away: str
    kickoff_iso: str  # ISO 8601 timestamp
    status: Status
    home_score: Optional[int] = None
    away_score: Optional[int] = None

# Minimal in-memory UCL slate (fake dates for demo)
_SEED: list[Match] = [
    Match(
        id=101, league="ucl", stage="group",
        home="Real Madrid", away="Manchester City",
        kickoff_iso="2025-10-20T19:00:00Z", status="scheduled"
    ),
    Match(
        id=102, league="ucl", stage="group",
        home="Bayern Munich", away="Inter Milan",
        kickoff_iso="2025-10-21T19:00:00Z", status="scheduled"
    ),
    Match(
        id=103, league="ucl", stage="group",
        home="Paris Saint-Germain", away="Barcelona",
        kickoff_iso="2025-10-22T19:00:00Z", status="scheduled"
    ),
]

@router.get("", response_model=List[Match])
def list_matches(
    league: League = Query(default="ucl", description="Only 'ucl' supported"),
    stage: Optional[Stage] = Query(default=None),
):
    # explicit: we only support UCL right now
    if league != "ucl":
        return []
    data = [m for m in _SEED if m.league == "ucl"]
    if stage:
        data = [m for m in data if m.stage == stage]
    return data

@router.get("/{match_id}", response_model=Match)
def get_match(match_id: int):
    for m in _SEED:
        if m.id == match_id:
            return m
    raise HTTPException(status_code=404, detail="match not found")
