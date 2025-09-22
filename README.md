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
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

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
   DATABASE_URL="postgresql://username:password@localhost:5432/fullstack_nextjs_app"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
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

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── users/         # User management endpoints
│   │   ├── posts/         # Post management endpoints
│   │   └── auth/          # Authentication endpoints
│   ├── dashboard/         # Dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   └── ui/               # UI components (Button, Card, etc.)
├── lib/                  # Utility functions
│   ├── db.ts            # Database connection
│   └── utils.ts         # Helper functions
└── types/               # TypeScript type definitions

prisma/
└── schema.prisma        # Database schema
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

### Posts & Comments
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a specific post
- `PUT /api/posts/[id]` - Update a specific post
- `DELETE /api/posts/[id]` - Delete a specific post
- `GET /api/comments` - Get comments for a post
- `POST /api/comments` - Create a new comment

### Sports Betting
- `GET /api/games` - Get all games (with filters for status/league)
- `POST /api/games` - Create a new game
- `GET /api/bets` - Get user's bets
- `POST /api/bets` - Place a new bet

### Social Features
- `GET /api/friends` - Get user's friends
- `POST /api/friends` - Add a friend

### AI Assistant
- `GET /api/assistant` - Get user's previous questions
- `POST /api/assistant` - Ask the betting assistant a question

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

## License

This project is open source and available under the [MIT License](LICENSE).
