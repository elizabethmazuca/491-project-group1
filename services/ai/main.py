from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="AI Assistant Service", version="0.1.0")

# ----- Models -----
class ScoreRequest(BaseModel):
    home_win_pct: float = Field(..., ge=0.0, le=1.0)
    away_win_pct: float = Field(..., ge=0.0, le=1.0)

class ScoreResponse(BaseModel):
    recommendation: str  # "home" | "away"
    confidence: float    # 0..1

# ----- Routes -----
@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/score", response_model=ScoreResponse)
def score(req: ScoreRequest):
    # simple heuristic: pick the higher win% with confidence = |diff|
    diff = req.home_win_pct - req.away_win_pct
    if diff >= 0:
        rec = "home"
        conf = min(max(diff, 0.0), 1.0)
    else:
        rec = "away"
        conf = min(max(-diff, 0.0), 1.0)
    return ScoreResponse(recommendation=rec, confidence=conf)
