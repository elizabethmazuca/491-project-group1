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

def test_score_rejects_missing_field():
    r = client.post("/score", json={"home_win_pct": 0.7})  # away_win_pct missing
    assert r.status_code in (400, 422)
feat/add-ai-endpoint-tests

def test_score_rejects_non_json():
    r = client.post(
        "/score",
        content=b"not-json",                     # <— use content, not data
        headers={"Content-Type": "text/plain"},
    )
    assert r.status_code in (400, 415, 422)

def test_score_boundary_values():
    # home at lower bound, away at upper bound (or vice versa)
    payload = {"home_win_pct": 0.0, "away_win_pct": 1.0}
    r = client.post("/score", json=payload)
    # Either valid 200 with a recommendation, or validation error if your schema forbids bounds
    assert r.status_code in (200, 422)
    if r.status_code == 200:
        body = r.json()
        assert "recommendation" in body and body["recommendation"] in {"home","away"}
        assert 0.0 <= body["confidence"] <= 1.0