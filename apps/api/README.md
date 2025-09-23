# PayDay API (FastAPI)

## Setup
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
cp .env.example .env

## Run
uvicorn app.main:app --reload --port 4000
# Docs: http://localhost:4000/docs
