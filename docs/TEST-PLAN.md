# Test Plan — Sprint 2 (MVP: UEFA Champions League)

**Repo:** 491-project-group1  
**Services under test (SUT):**
- **AI service (FastAPI)** — `/health`, `/score` (heuristic tip)
- **Domain API (FastAPI)** — UCL-only `/health`, `/matches`, `/matches/{id}`, `/odds`
- **Web (Next.js)** — pages calling API + proxying to AI (`/api/ai/recommendations`)
- **DevOps/CI** — GitHub Actions (AI and API workflows), Vercel preview for web, Docker Compose for local

---

## 1) Goals & Scope

**Objectives**
- Verify that core UCL betting loop pieces are reliable: list matches, read odds, get AI tip.
- Prove correctness of wallet/bets flow (added in Sprint 2) via unit/API tests.
- Establish a repeatable test process in local, CI, and preview environments.

**In Scope (Sprint 2)**
- Unit & API tests for AI and Domain API routes.
- Minimal component test / smoke check for web.
- CI automation for tests on PRs; Vercel preview green.
- Test documentation & results tracking.

**Out of Scope (deferred)**
- Payments, social features, real data integrations, load/perf, full E2E browser automation (Playwright moves to Sprint 3).

---

## 2) Architecture Under Test (summary)

- **Web (Next.js)** ⇄ **Domain API (FastAPI)** ⇄ (in-memory seed data)
- **Web** ⇄ **Next.js API proxy** ⇄ **AI service (FastAPI)**  
- **Local orchestration:** Docker Compose (web + api + ai + db stub)  
- **CI:** GitHub Actions per service  
- **Preview:** Vercel (web)

---

## 3) Test Methodologies & Rationale

| Layer        | Methodology                            | Why now |
|--------------|----------------------------------------|--------|
| Unit/API (AI)  | `pytest` with `TestClient`            | Fast feedback for `/health`, `/score` incl. validation errors |
| Unit/API (API) | `pytest` with `TestClient`            | Verify contracts for `/matches`, `/odds` (UCL), `/wallet`, `/bets` |
| Component/Web  | `vitest` (light)                      | Smoke sanity on key UI logic (Assistant panel interactions) |
| Smoke (Preview)| Manual click-through on Vercel        | Confirms deploy + basic path works; screenshot kept in PR |
| Non-functional | (defer to Sprint 3: Playwright, k6)   | Add E2E + perf after MVP endpoints stabilize |

**Test Data Strategy**
- In-memory seed for UCL (3 fixtures) + toy odds table (decimal ≥ 1.01).  
- Wallet/bets: in-memory balance for `user_id=1`.

---

## 4) Test Artifacts

- **Test cases:** `docs/TEST-CASES.md` (IDs → steps, inputs, expected)
- **Test runs:** `docs/TEST-RUNS.md` (date, build/PR, env, IDs, pass/fail, notes)
- **Bug tracking:** GitHub Issues using `.github/ISSUE_TEMPLATE/bug_report.md`  
- **CI configs:** `.github/workflows/ai-tests.yml`, `.github/workflows/api-tests.yml`  
- **Ops guide:** `docs/OPERATIONS.md` (compose cmds, health checks, troubleshooting)

---

## 5) Environments

| Env     | Purpose                                  | How to run |
|---------|------------------------------------------|------------|
| Local (venv) | Fast iteration on service tests       | `python -m venv .venv && .venv/bin/python -m pip install -r requirements*.txt && .venv/bin/python -m pytest` |
| Local (compose) | Cross-service smoke (web+api+ai)  | `cd docker && make up` (then curl endpoints) |
| CI (GH Actions) | Repeatable, isolated test runs     | Auto on PRs touching `services/*/**` |
| Preview (Vercel)| Validate web build + UI smoke      | PR comment link; click-through & log in `TEST-RUNS.md` |

---

## 6) Coverage Targets (Sprint 2)

- **AI service:** ≥ 80% lines over `/health` and `/score`
- **Domain API:** ≥ 80% lines over `/matches`, `/odds`, `/wallet`, `/bets`
- **Web:** at least 1 component test or smoke check for Assistant panel; Vercel preview green on PR

(Exact coverage % reporting can be added in Sprint 3; for Sprint 2 we focus on presence and breadth of tests.)

---

## 7) Test Case Index (IDs & mapping)

(Details live in `docs/TEST-CASES.md`; index here for traceability.)

**AI**
- **TC-API-AI-001** — GET `/health` → 200 `{status:"ok"}`
- **TC-API-AI-002** — POST `/score` valid payload → 200 `{recommendation, confidence}`
- **TC-API-AI-003** — POST `/score` missing/invalid fields → 422/400

**UCL Domain API**
- **TC-API-UCL-001** — GET `/matches` (default league=ucl) → list (len≥3)
- **TC-API-UCL-002** — GET `/matches/{id}` (101) → 200 with correct teams
- **TC-API-UCL-003** — GET `/odds?match_id=101&league=ucl` → 200 with moneyline odds
- **TC-API-UCL-004** — GET `/odds` non-ucl league → 400

**Wallet & Bets (MVP)**
- **TC-API-WAL-001** — POST `/wallet/deposit 50` then GET `/wallet/me` → +50
- **TC-API-BET-001** — POST `/bets` (stake 25) reserves funds; GET `/wallet/me` reflects
- **TC-API-BET-002** — POST `/bets/{id}/cancel` refunds stake
- *Edge (peer follow-ups):* stake≤0 → 422; insufficient funds → 400; cancel twice → 400

**Web**
- **TC-WEB-ASSIST-001** — Click “Get Tip” on match page → shows recommendation & confidence (via proxy)

---

## 8) Entry / Exit Criteria

**Per PR (entry)**
- Feature/bug branch rebased; small, scoped diff.
- Tests added/updated for changed code.
- CI config present if new service/area.

**Per PR (exit)**
- Unit/API tests **pass** in CI.
- If web touched: Vercel preview **green**; smoke click-through done.
- `docs/TEST-RUNS.md` updated with this PR’s run.

**Sprint Exit**
- All **must-have** test cases (IDs above) executed with **Pass** on latest build.
- Open bugs triaged; criticals closed or deferred with justification.
- CI consistently green across AI and API workflows.

---

## 9) Execution Schedule

- **Daily (dev):** run local unit/API tests before pushing.
- **On every PR:** CI runs pytest for changed service(s).
- **When web changes:** validate Vercel preview and log result.
- **End of week:** update `TEST-RUNS.md` summary row; review flaky tests, open bug issues as needed.

---

## 10) Tooling & Conventions

- **Python:** `pytest`, `httpx`, FastAPI `TestClient`; use venv per service.
- **Node/Web:** `vitest` for component smoke.
- **CI:** GitHub Actions (matrix later), artifacts (logs, reports).
- **Ops:** Docker Compose; health checks: AI `/health`, API `/health`, DB `pg_isready`.
- **Naming:** endpoints use `ucl`, `matches`, `odds`, `wallet`, `bets`.
- **IDs:** keep test IDs stable and reference them in bug issues & PRs.

---

## 11) Defect Tracking Workflow

1. Create **Bug** issue using template. Include: build/commit, env, steps, expected vs. actual, logs, **linked Test Case ID(s)**.
2. Assign & prioritize (P1/P2/P3).
3. Fix in a small PR with a test that reproduces/prevents regression.
4. Close bug with references to PR and updated `TEST-RUNS.md`.

---

## 12) Risks & Mitigations

- **Env drift / PEP 668 issues** → Always use venvs or Compose; document in OPERATIONS.
- **Flaky preview** → Keep web diffs small; retry preview; capture screenshot proof.
- **Scope creep** → UCL-only; no payments/social in Sprint 2.

---

## 13) Ownership (RACI)

| Area            | R (Do)            | A (Approve)      | C (Consult)       | I (Inform) |
|-----------------|-------------------|------------------|-------------------|------------|
| AI tests/CI     | Jesus             | Elzie          | Teammates         | Everyone   |
| API tests/CI    | Jesus             | Jessika        | Teammates         | Everyone   |
| Web smoke       | Anyone            | Jesus          | Teammates         | Everyone   |
| Docs (Plan/Cases/Runs) | Jesus      | Prof/Team lead  | Team             | Everyone   |
| Bug triage      | Jesus + Jessika  | Team lead        | Team             | Everyone   |

---

## 14) Maintenance

- Update test cases when endpoints or payloads change.
- Add Playwright E2E + coverage reports in Sprint 3.
- Revisit coverage targets as features grow.
