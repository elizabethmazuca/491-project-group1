import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createGameSchema = z.object({
  homeTeam: z.string().min(1),
  awayTeam: z.string().min(1),
  homeOdds: z.number().positive(),
  awayOdds: z.number().positive(),
  drawOdds: z.number().positive().optional(),
  gameTime: z.string().datetime(),
  league: z.string().min(1),
})

// GET /api/games - Get all games
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const league = searchParams.get('league')

    const where: any = {}
    if (status) where.status = status
    if (league) where.league = league

    const games = await prisma.game.findMany({
      where,
      include: {
        bets: {
          select: {
            id: true,
            amount: true,
            type: true,
            status: true,
          },
        },
      },
      orderBy: {
        gameTime: 'asc',
      },
    })

    return NextResponse.json(games)
  } catch (error) {
    console.error('Error fetching games:', error)
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    )
  }
}

// POST /api/games - Create a new game
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { homeTeam, awayTeam, homeOdds, awayOdds, drawOdds, gameTime, league } = createGameSchema.parse(body)

    const game = await prisma.game.create({
      data: {
        homeTeam,
        awayTeam,
        homeOdds,
        awayOdds,
        drawOdds,
        gameTime: new Date(gameTime),
        league,
      },
    })

    return NextResponse.json(game, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating game:', error)
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    )
  }
}

