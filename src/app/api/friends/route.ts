import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const addFriendSchema = z.object({
  userId: z.string().min(1),
  friendId: z.string().min(1),
})

// GET /api/friends - Get user's friends
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status') || 'accepted'

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const friends = await prisma.friend.findMany({
      where: {
        OR: [
          { userId, status },
          { friendId: userId, status },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            totalWins: true,
            totalLosses: true,
          },
        },
        friend: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            totalWins: true,
            totalLosses: true,
          },
        },
      },
    })

    // Transform the data to return the friend user object
    const transformedFriends = friends.map((friendship) => ({
      id: friendship.id,
      status: friendship.status,
      createdAt: friendship.createdAt,
      friend: friendship.userId === userId ? friendship.friend : friendship.user,
    }))

    return NextResponse.json(transformedFriends)
  } catch (error) {
    console.error('Error fetching friends:', error)
    return NextResponse.json(
      { error: 'Failed to fetch friends' },
      { status: 500 }
    )
  }
}

// POST /api/friends - Add a friend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, friendId } = addFriendSchema.parse(body)

    if (userId === friendId) {
      return NextResponse.json(
        { error: 'Cannot add yourself as a friend' },
        { status: 400 }
      )
    }

    // Check if friendship already exists
    const existingFriendship = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    })

    if (existingFriendship) {
      return NextResponse.json(
        { error: 'Friendship already exists' },
        { status: 400 }
      )
    }

    // Check if both users exist
    const [user, friend] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.user.findUnique({ where: { id: friendId } }),
    ])

    if (!user || !friend) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create friendship
    const friendship = await prisma.friend.create({
      data: {
        userId,
        friendId,
        status: 'pending',
      },
      include: {
        friend: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json(friendship, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error adding friend:', error)
    return NextResponse.json(
      { error: 'Failed to add friend' },
      { status: 500 }
    )
  }
}

