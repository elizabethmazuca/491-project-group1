## `docs/TEST-RUNS.md`
```md
# Test Runs — Sprint 2

Track executions across builds/dates/environments. Link PRs and test case IDs:

| Date (PT)  | Build/PR                         | Env     | Test IDs                                         | Result | Notes |
|------------|----------------------------------|---------|--------------------------------------------------|--------|-------|
| 2025-10-10 | PR1: AI tests + CI               | CI      | AI-001, AI-002, AI-003                           | Pass   | GH Actions green (services/ai) |
| 2025-10-10 | PR2: Compose + Ops                | Local   | UCL-001 (via curl after compose up)              | Pass   | Smoke check only; API health reachable |
| 2025-10-11 | PR3: UCL matches + odds + tests  | Local   | UCL-001, UCL-002, UCL-003, UCL-004               | Pass   | venv & httpx installed; pytest green |
| 2025-10-11 | PR3: UCL matches + odds + tests  | CI      | UCL-001, UCL-003                                 | Pass   | Actions: api-tests.yml (added later) |
| 2025-10-11 | PR3 (preview)                    | Preview | WEB-ASSIST-001                                   | Pass   | Manual click-through on Vercel (screenshot in PR) |
| 2025-10-11 | PR4: Wallet + Bets + tests       | Local   | WAL-001, BET-001                                 | Pass   | Deposit → bet → cancel → balance restored |
| 2025-10-11 | PR4: Wallet + Bets + tests       | CI      | WAL-001, BET-001                                 | Pass   | Actions: api-tests.yml green |

## Known Bugs & Fixes (linked)
- **BUG-001:** PEP 668 — system installs blocked → **Fix:** use venv; documented in OPERATIONS.md.  
  - **Found by:** Local setup prior to AI tests  
  - **Related Test IDs:** UCL-001 (setup), AI-001  
  - **Evidence:** issue link, PR1 logs
- **BUG-002:** `ModuleNotFoundError: main` in AI tests → **Fix:** add `main.py`, pytest path config.  
  - **Found by:** PR1 local run  
  - **Related Test IDs:** AI-001/002  
  - **Evidence:** issue link, PR1 commit
- **BUG-003:** `httpx` missing for API tests → **Fix:** add dev dep.  
  - **Found by:** PR3 local run  
  - **Related Test IDs:** UCL-003  
  - **Evidence:** issue link, PR3 commit

> When you run more tests, add a new table row with: date, PR/commit, env (Local/CI/Preview), IDs, Pass/Fail, notes (links/screenshots).
