# Operations
## Start
```bash
cd docker
make up

## Troubleshooting
- **PEP 668 / pip blocked**: use per-service venvs:
- **Port in use**: stop old processes or change compose ports.
- **AI/API health**: AI → GET /health on :5055; API → GET /health on :8000.
