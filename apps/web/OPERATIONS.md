# Operations Guide

## How to Run
1. `nvm use` (uses `.nvmrc` Node LTS)
2. `cd apps/web && npm ci && npm run dev`
3. Open the localhost link shown in the terminal.

## If Something Breaks
- App won’t start: delete `node_modules`, run `npm ci` again.
- Build fails: check the last PR; undo or fix.
- Blank page: check terminal errors; ask team for help.

## Releases
- No direct pushes to `main`.
- All changes via PR; at least 1 teammate review.
- CI must pass before merge.

## Threat Model (Draft)
- Protect: source code, future user data.
- Risks: vulnerable deps, mistakes in code.
- Mitigation: PR reviews, CI on every PR.

## Network Model (Draft)
Browser → Vite Dev Server  
(future: Frontend ↔ Backend API ↔ DB)
