from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_wallet_deposit_and_balance():
    r0 = client.get("/wallet/me")
    assert r0.status_code == 200
    b0 = r0.json()["balance"]

    r = client.post("/wallet/deposit", json={"amount": 50})
    assert r.status_code == 200
    r2 = client.get("/wallet/me")
    assert r2.status_code == 200
    assert r2.json()["balance"] == b0 + 50

def test_wallet_deposit_reject_non_positive():
    for amt in (0, -10):
        r = client.post("/wallet/deposit", json={"amount": amt})
        assert r.status_code == 400

def test_bets_create_list_cancel():
    # create
    r = client.post("/bets", json={"match_id": 101, "selection": "home", "stake": 25, "odds": 1.9})
    assert r.status_code == 200
    bet = r.json()
    assert bet["status"] == "open"

    # list
    r2 = client.get("/bets")
    assert r2.status_code == 200
    assert any(b["id"] == bet["id"] for b in r2.json())

    # cancel
    r3 = client.post(f"/bets/{bet['id']}/cancel")
    assert r3.status_code == 200
    assert r3.json()["status"] == "cancelled"

def test_bet_double_cancel_rejected():
    r = client.post("/bets", json={"match_id": 101, "selection": "home", "stake": 10, "odds": 2.0})
    bet_id = r.json()["id"]
    client.post(f"/bets/{bet_id}/cancel")
    r2 = client.post(f"/bets/{bet_id}/cancel")
    assert r2.status_code == 400
