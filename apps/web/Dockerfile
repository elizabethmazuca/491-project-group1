# Simple placeholder for the web frontend
FROM node:18-slim

WORKDIR /app

# Copy everything into the container
COPY . .

# Install dependencies if a package.json exists
RUN if [ -f package.json ]; then npm install; fi

# Expose the web port
EXPOSE 3000

# Default command: run a simple static server if no app yet
CMD [ "npx", "serve", "-s", "." ]
