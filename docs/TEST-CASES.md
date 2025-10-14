# Test Cases — Sprint 2 (MVP: UEFA Champions League)

> Each test case lists: **Method**, **Preconditions/Config**, **Steps**, **Inputs**, **Expected Result**.

---

## AI Service (FastAPI)

### TC-API-AI-001 — Health endpoint
- **Method:** Unit/API (pytest + TestClient)
- **Preconditions:** `services/ai` venv; deps installed
- **Steps:**
  1. `GET /health`
- **Inputs:** none
- **Expected:** `200` with body `{"status":"ok"}`

### TC-API-AI-002 — Score (happy path)
- **Method:** Unit/API (pytest + TestClient)
- **Preconditions:** `services/ai` venv; deps installed
- **Steps:**
  1. `POST /score` with valid payload
- **Inputs:**
  ```json
  { "home_win_pct": 0.62, "away_win_pct": 0.38 }
