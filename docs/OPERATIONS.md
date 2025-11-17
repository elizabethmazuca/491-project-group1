# Operations Guide

## Local Development Environment

### Prerequisites
- Node.js and npm installed in WSL  
- Python 3.10+ installed in WSL  
- PostgreSQL 14+ installed in WSL (`sudo apt install postgresql postgresql-contrib`)  
- Git and VS Code  

### Environment Variables

Create `.env.local` and `.env` in the project root with:

```env
DATABASE_URL="postgresql://app:appdb@localhost:5432/appdb"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-123456789"
NEXT_PUBLIC_AI_BASE="http://localhost:5055"

## Local DB & Prisma Verification

Goal: Verify that the backend can connect to the local PostgreSQL instance and that Prisma can generate the client from `prisma/schema.prisma`.

Commands run:

```bash
# 1. Start PostgreSQL shell
sudo -u postgres psql

# 2. From repo root, generate Prisma client
npx prisma generate

# 3. Push schema to local development database
npx prisma db push
