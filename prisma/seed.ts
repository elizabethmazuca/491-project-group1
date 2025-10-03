import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      username: 'johndoe',
      password: hashedPassword,
      balance: 1000.0,
      totalWins: 5,
      totalLosses: 3,
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      username: 'janesmith',
      password: hashedPassword,
      balance: 750.0,
      totalWins: 8,
      totalLosses: 2,
    },
  })

  console.log('✅ Created users')

  // Create sample soccer games
  const games = [
    {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeOdds: 1.85,
      awayOdds: 2.10,
      drawOdds: 3.20,
      gameTime: new Date('2024-01-15T20:00:00Z'),
      league: 'La Liga',
      status: 'upcoming',
    },
    {
      homeTeam: 'Manchester City',
      awayTeam: 'Liverpool',
      homeOdds: 1.95,
      awayOdds: 1.90,
      drawOdds: 3.40,
      gameTime: new Date('2024-01-16T17:30:00Z'),
      league: 'Premier League',
      status: 'upcoming',
    },
    {
      homeTeam: 'PSG',
      awayTeam: 'Bayern Munich',
      homeOdds: 2.20,
      awayOdds: 1.75,
      drawOdds: 3.10,
      gameTime: new Date('2024-01-17T19:45:00Z'),
      league: 'Champions League',
      status: 'live',
    },
    {
      homeTeam: 'Chelsea',
      awayTeam: 'Arsenal',
      homeOdds: 1.80,
      awayOdds: 2.15,
      drawOdds: 3.30,
      gameTime: new Date('2024-01-18T16:00:00Z'),
      league: 'Premier League',
      status: 'upcoming',
    },
    {
      homeTeam: 'AC Milan',
      awayTeam: 'Inter Milan',
      homeOdds: 2.05,
      awayOdds: 1.85,
      drawOdds: 3.25,
      gameTime: new Date('2024-01-19T20:30:00Z'),
      league: 'Serie A',
      status: 'upcoming',
    },
  ]

  for (const gameData of games) {
    await prisma.game.upsert({
      where: {
        homeTeam_awayTeam_gameTime: {
          homeTeam: gameData.homeTeam,
          awayTeam: gameData.awayTeam,
          gameTime: gameData.gameTime,
        },
      },
      update: {},
      create: gameData,
    })
  }

  console.log('✅ Created soccer games')

  // Create sample posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Real Madrid vs Barcelona Prediction',
      content: 'I think Real Madrid will win this El Clasico. Their home form has been excellent this season.',
      published: true,
      authorId: user1.id,
      likes: 12,
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'Manchester City vs Liverpool Analysis',
      content: 'This is going to be a close game. Both teams are in great form. I\'m leaning towards a draw.',
      published: true,
      authorId: user2.id,
      likes: 8,
    },
  })

  console.log('✅ Created posts')

  // Create sample comments
  await prisma.comment.create({
    data: {
      content: 'I agree! Real Madrid has been unstoppable at home.',
      postId: post1.id,
      authorId: user2.id,
      likes: 3,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Liverpool\'s defense has been shaky lately. City might edge this one.',
      postId: post2.id,
      authorId: user1.id,
      likes: 2,
    },
  })

  console.log('✅ Created comments')

  // Create sample friendship
  await prisma.friend.create({
    data: {
      userId: user1.id,
      friendId: user2.id,
      status: 'accepted',
    },
  })

  console.log('✅ Created friendship')

  // Create sample bets
  await prisma.bet.create({
    data: {
      amount: 50.0,
      odds: 1.85,
      type: 'home',
      status: 'pending',
      userId: user1.id,
      gameId: (await prisma.game.findFirst({ where: { homeTeam: 'Real Madrid' } }))!.id,
    },
  })

  await prisma.bet.create({
    data: {
      amount: 25.0,
      odds: 3.40,
      type: 'draw',
      status: 'pending',
      userId: user2.id,
      gameId: (await prisma.game.findFirst({ where: { homeTeam: 'Manchester City' } }))!.id,
    },
  })

  console.log('✅ Created sample bets')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

