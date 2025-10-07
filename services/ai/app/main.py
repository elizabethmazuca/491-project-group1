from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import os

app = FastAPI(title="Betz AI Service", version="0.1.0")

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Features(BaseModel):
    # minimal inputs for v0 (extend later)
    moneyline_home_dec: float = Field(gt=1.0)
    moneyline_away_dec: float = Field(gt=1.0)
    home_winrate: float | None = Field(default=None, ge=0, le=1)
    away_winrate: float | None = Field(default=None, ge=0, le=1)

class Recommendation(BaseModel):
    pick: str                  # "HOME" | "AWAY"
    confidence: float          # 0..1
    reasons: list[str]

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/score", response_model=Recommendation)
def score(feats: Features):
    # implied probabilities from decimal odds
    p_home = 1.0 / feats.moneyline_home_dec
    p_away = 1.0 / feats.moneyline_away_dec

    # optional light nudges with winrates (defaults to 0.5 if not provided)
    hwr = feats.home_winrate if feats.home_winrate is not None else 0.5
    awr = feats.away_winrate if feats.away_winrate is not None else 0.5
    p_home = 0.8 * p_home + 0.2 * hwr
    p_away = 0.8 * p_away + 0.2 * awr

    pick = "HOME" if p_home >= p_away else "AWAY"
    conf = max(p_home, p_away) / (p_home + p_away)

    return Recommendation(
        pick=pick,
        confidence=round(float(conf), 3),
        reasons=[
            "Based on implied probabilities from odds",
            "Adjusted with recent win rates (light weight)",
        ],
    )
