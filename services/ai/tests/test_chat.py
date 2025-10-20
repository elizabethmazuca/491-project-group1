from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_chat_reply():
    r = client.post("/chat", json={"home_win_pct": 0.7, "away_win_pct": 0.3})
    assert r.status_code == 200
    assert "lean" in r.json()["reply"].lower()
