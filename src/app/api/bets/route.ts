import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'



const createBetSchema = z.object({
  amount: z.number().positive(),
  odds: z.number().positive(),
  type: z.string().min(1),
  gameId: z.string().min(1),
  userId: z.string().min(1),
})

// GET /api/bets - Get all bets for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const bets = await prisma.bet.findMany({
      where: { userId },
      include: {
        game: {
          select: {
            id: true,
            homeTeam: true,
            awayTeam: true,
            gameTime: true,
            league: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(bets)
  } catch (error) {
    console.error('Error fetching bets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bets' },
      { status: 500 }
    )
  }
}

// POST /api/bets - Place a new bet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, odds, type, gameId, userId } = createBetSchema.parse(body)

    // Check if user has sufficient balance
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      )
    }

    // Check if game exists and is still available for betting
    const game = await prisma.game.findUnique({
      where: { id: gameId },
    })

    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      )
    }

    if (game.status !== 'upcoming' && game.status !== 'live') {
      return NextResponse.json(
        { error: 'Game is no longer available for betting' },
        { status: 400 }
      )
    }

    // Create bet and update user balance in a transaction
    const result = await prisma.$transaction(async (tx: any) => {
      // Create the bet
      const bet = await tx.bet.create({
        data: {
          amount,
          odds,
          type,
          gameId,
          userId,
        },
        include: {
          game: {
            select: {
              id: true,
              homeTeam: true,
              awayTeam: true,
              gameTime: true,
              league: true,
            },
          },
        },
      })

      // Update user balance
      await tx.user.update({
        where: { id: userId },
        data: {
          balance: {
            decrement: amount,
          },
        },
      })

      // ✅ Record wallet transaction (ledger entry)
      await tx.transaction.create({
        data: {
        userId,
        amount: -amount,          // debit: stake goes out
        reason: 'bet_stake',
        refId: bet.id,
        },
      })

      return bet
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating bet:', error)
    return NextResponse.json(
      { error: 'Failed to place bet' },
      { status: 500 }
    )
  }
}

