# Simple Python AI service placeholder
FROM python:3.11-slim

WORKDIR /app

# Copy any AI code (if present)
COPY . .

# Install dependencies if file exists
RUN if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

# Expose port for AI service (adjust if different)
EXPOSE 5055

# Run simple health check app
CMD ["python3", "main.py"]

