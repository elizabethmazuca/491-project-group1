from fastapi import FastAPI
from routers import matches, odds

app = FastAPI(title="Sports API (UCL)", version="0.1.0")

@app.get("/health")
def health():
    return {"status": "ok"}

# Champions League–only routers
app.include_router(matches.router, prefix="/matches", tags=["matches"])
app.include_router(odds.router, prefix="/odds", tags=["odds"])
