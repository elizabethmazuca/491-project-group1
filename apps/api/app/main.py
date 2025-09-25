from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
app = FastAPI(title="PayDay API", version="0.1.0")

from app.api.routes import games as games_router
app.include_router(games_router.router)

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}
