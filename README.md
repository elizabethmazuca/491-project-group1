# PayDay — Sports Betting Simulator (Monorepo)

This repo holds the **frontend (React + Vite + TS)** in `apps/web` and the **backend (FastAPI)** in `apps/api`.  
Local DB is Postgres via Docker. Virtual currency only.

## Quick Start
### DB
docker compose -f docker/docker-compose.yml up -d

cd apps/api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 4000

### Frontend
cd apps/web
npm install
cp .env.example .env
npm run dev
