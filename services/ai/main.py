from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="AI Assistant Service", version="0.1.0")

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


from pydantic import BaseModel

class ChatIn(BaseModel):
    home_win_pct: float | None = None
    away_win_pct: float | None = None
    message: str | None = None

@app.post("/chat")
def chat(in_: ChatIn):
    if in_.home_win_pct is not None and in_.away_win_pct is not None:
        rec = "home" if in_.home_win_pct >= in_.away_win_pct else "away"
        conf = max(in_.home_win_pct, in_.away_win_pct)
        reply = f"I’d lean {rec}. Confidence ≈ {conf:.2f}. Reason: higher win%."
    else:
        reply = "Send home_win_pct and away_win_pct to get a quick recommendation."
    return {"reply": reply}
