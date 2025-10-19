# Betz - Sports Betting Platform

A modern, full-featured sports betting application built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and PostgreSQL. Focus on soccer betting with social features and AI-powered betting assistance.

## Features

- ⚡ **Next.js 14** with App Router and Server Components
- 🎨 **Tailwind CSS** with dark theme and orange accents
- 🔒 **Authentication** ready (NextAuth.js)
- 🗄️ **PostgreSQL** database with Prisma ORM
- ⚽ **Soccer Betting** with live odds and game management
- 👥 **Social Features** - Add friends, post predictions, comment
- 🤖 **AI Betting Assistant** for tips and strategies
- 💰 **Betting System** with balance management and bet tracking
- 🎯 **TypeScript** for type safety
- 📱 **Responsive Design** with modern UI components

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **AI Service**: Python 3 + FastAPI + Uvicorn (microservice at services/ai)
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or newer
- Python 3.10 or newer
- PostgreSQL database
-(Optional) Docker for local database setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fullstack-nextjs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the `.env.local` file with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/betz_app"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   NEXT_PUBLIC_AI_BASE="http://localhost:5055"   # Python AI service URL
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push the schema to your database
   npx prisma db push
   
   # (Optional) Open Prisma Studio to view your data
   npx prisma studio
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Python AI Service (FastAPI)
Located in services/ai. Provides basic betting recommendations used by the Next.js app.

### Endpoints
Route	  Method	Description
/health	GET	Health check
/score	POST	Returns AI recommendation JSON { pick, confidence, reasons }

### Next.js AI Proxy
The web app calls **`POST /api/ai/recommendations`**, which forwards to the Python AI service (`POST {AI_BASE}/score`).  
Set `NEXT_PUBLIC_AI_BASE` in `.env.local` (defaults to `http://localhost:5055` for local dev).

## Run Locally
cd services/ai
python -m venv .venv
### Windows: .venv\Scripts\activate
### macOS/Linux:
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 5055


## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── games/               # Game endpoints
│   │   ├── bets/                # Betting endpoints
│   │   ├── users/               # User management
│   │   ├── friends/             # Social endpoints
│   │   └── ai/                  # AI proxy (to FastAPI)
│   ├── dashboard/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
│   ├── db.ts
│   └── utils.ts
└── types/

prisma/
└── schema.prisma

services/
└── ai/
    ├── app/main.py
    ├── requirements.txt
    └── .env.example

```

## API Endpoints

### Users
- GET /api/users – Get all users
- POST /api/users – Create a new user

### Bets and Games
- GET /api/games – List games
- POST /api/bets – Place bet
- GET /api/me/bets – View user bets
- POST /api/admin/settle/[gameId] – Settle bets (dev use)

### AI Assistant
- POST /api/ai/recommendations – Proxy → Python /score

## Database Schema

The application includes the following models:

- **User**: User accounts with betting balance, win/loss stats, and social features
- **Post**: Social posts with predictions and community interaction
- **Comment**: Comments on posts with likes and author information
- **Friend**: Friend relationships with status tracking
- **Game**: Soccer games with teams, odds, and timing
- **Bet**: User bets with amounts, odds, and outcomes
- **BettingAssistant**: AI assistant questions and responses
- **Account**: OAuth account information (for NextAuth.js)
- **Session**: User session data (for NextAuth.js)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio

## Next Steps

1. **Set up authentication** - Configure NextAuth.js with your preferred providers
2. **Add more features** - Implement user profiles, comments, categories, etc.
3. **Deploy** - Deploy to Vercel, Netlify, or your preferred platform
4. **Add tests** - Implement unit and integration tests
5. **Add monitoring** - Set up error tracking and analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Documentation
- [Architecture Overview](docs/architecture.md)
- [Test Plan](docs/TEST-PLAN.md)
- [Operations Runbook](docs/OPERATIONS.md)

## License

This project is open source and available under the [MIT License](LICENSE).
