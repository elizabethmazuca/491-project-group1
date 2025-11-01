from fastapi import FastAPI
from routers import matches, odds, wallet, bets

app = FastAPI(title="Sports API (UCL)", version="0.1.0")
app.include_router(matches.router)
app.include_router(odds.router)
app.include_router(wallet.router)
app.include_router(bets.router)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/games")
def get_games():
    """Return a sample list of upcoming games."""
    games = [
        {"id": 1, "teams": "Manchester City vs Real Madrid", "time": "12:00 PM"},
        {"id": 2, "teams": "Paris Saint-German vs Bayern Munich", "time": "12:00 PM"},
    ]
    return {"games": games}


# Champions League–only routers
app.include_router(matches.router, prefix="/matches", tags=["matches"])
app.include_router(odds.router, prefix="/odds", tags=["odds"])
