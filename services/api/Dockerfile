# API Service Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy everything into the container
COPY . .

# Install dependencies if available
RUN if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

# Expose the API port
EXPOSE 8000

# Start the API (FastAPI + Uvicorn)
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
