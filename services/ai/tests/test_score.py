from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_score_happy_path():
    payload = {"home_win_pct": 0.62, "away_win_pct": 0.38}
    r = client.post("/score", json=payload)
    assert r.status_code == 200
    body = r.json()
    assert body["recommendation"] in {"home","away"}
    assert 0.0 <= body["confidence"] <= 1.0

def test_score_validation_error():
    r = client.post("/score", json={"home_win_pct": 0.5})
    assert r.status_code in (400, 422)
