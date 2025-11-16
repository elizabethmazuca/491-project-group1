# Operations (Sprint 3) — 491-project-group1

MVP scope: **UEFA Champions League (UCL) only**, no payments, no social features.  
Services:
- **Web (Next.js)** — `src/*`, local dev on `:3000`
- **Domain API (FastAPI)** — `services/api`, local on `:8000`
- **AI Service (FastAPI)** — `services/ai`, local on `:5055`

---

## 1 Local development

### 1.1 Start with Docker Compose
```bash
cd docker
make up           # or: docker compose up --build
make logs         # follow logs for all services
make down         # stop + remove containers
make rebuild      # rebuild images from scratch
