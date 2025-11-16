# Operations
## Start
```bash
cd docker
make up

## Troubleshooting
- **PEP 668 / pip blocked**: use per-service venvs:
- **Port in use**: stop old processes or change compose ports.
- **AI/API health**: AI → GET /health on :5055; API → GET /health on :8000.

## Compose lifecycle
```bash
cd docker
docker compose up -d api ai          # or: make up
docker compose ps
docker compose logs -f api
docker compose logs -f ai
# health checks
curl -s http://localhost:8000/health
curl -s "http://localhost:8000/odds?match_id=101&league=ucl"
curl -s http://localhost:5055/health
# tear down
docker compose down -v               # or: make down / make clean
