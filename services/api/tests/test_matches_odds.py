from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}

def test_list_matches_default_ucl():
    r = client.get("/matches")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list) and len(data) >= 3
    assert all(m["league"] == "ucl" for m in data)

def test_get_match_detail():
    r = client.get("/matches/101")
    assert r.status_code == 200
    m = r.json()
    assert m["league"] == "ucl"
    assert m["home"] and m["away"]

def test_get_odds_for_ucl_match():
    r = client.get("/odds", params={"match_id": 101, "league": "ucl"})
    assert r.status_code == 200
    body = r.json()
    assert body["match_id"] == 101
    assert body["league"] == "ucl"
    assert body["market"] == "moneyline"
    assert body["home_odds"] >= 1.01 and body["away_odds"] >= 1.01

def test_odds_rejects_non_ucl():
    r = client.get("/odds", params={"match_id": 101, "league": "prem"})
    assert r.status_code == 400

def test_odds_missing_match_id_returns_422():
    r = client.get("/odds", params={"league": "ucl"})
    assert r.status_code == 422

def test_odds_league_must_be_ucl_400():
    r = client.get("/odds", params={"match_id": 101, "league": "prem"})
    assert r.status_code == 400
