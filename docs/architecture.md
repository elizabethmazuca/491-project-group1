System Overview 
The system is a modular web application with next.js react front end, a python has FastAPI AI service, and a lightweight API service. Front end and services are contained and used with Docker Compose. Data models are defined in prisma and for a PostgreSQL database. 

Main Flow: 
User UI to Next.js API routes: users interact with pages under srr/app/. Actions such as AskRob place bets and calls app API routes. 
Next.js to AP services: the app proxy is bad recommendation request to python service at service/AI (FastAPI). The AI service receives a score request, returns a recommendation and confidence. 
CI: GitHub actions run tests on push for AI/API services to keep the main branch isolated for stability. 
OPS: Dockerfiles per component and docker/docker-compose.yml provide a reproducible dev run time. 

Code Locations: 
Front end : Src/apps (ages , api routes), src/lib (auth,db util).
AP Service: services/ai (FastAPI app, tests, Dockerfile).
API Service : services/api (Python app, routers, tests).
Data : prisma/schema.prisma
CI : github/workflows/*.yml.
OPS:  docker/Makefile, docker/docker-compose.yml

Code Traceability 
Requirement R1: The system must generate betting recommendations automatically.
→  Implemented by services/ai/main.py → tested in services/ai/tests/test_score.py.
Requirement R3: Users can request a health check to verify API uptime.
 → Implemented by GET /health in services/ai/main.py → tested in services/ai/tests/test_health.py.

 flowchart LR
  User[Browser / PayDay UI] --> NextJS[Next.js App\n(src/app)]
  NextJS -->|/api/recommendations| AI[FastAPI AI Service\n(services/ai)]
  NextJS -->|/api/*| API[Python API Service\n(services/api)]
  API --> DB[(PostgreSQL\nPrisma schema.prisma)]
  subgraph CI/CD
    GH[GitHub Actions\n(ai-tests.yml, api-tests.yml)]
  end
  GH --> NextJS
  GH --> AI
  GH --> API

