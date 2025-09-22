import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const askQuestionSchema = z.object({
  question: z.string().min(1),
  userId: z.string().min(1),
})

// GET /api/assistant - Get user's previous questions
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

    const questions = await prisma.bettingAssistant.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20, // Limit to last 20 questions
    })

    return NextResponse.json(questions)
  } catch (error) {
    console.error('Error fetching assistant questions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}

// POST /api/assistant - Ask a question to the betting assistant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question, userId } = askQuestionSchema.parse(body)

    // Simple AI response logic (in a real app, you'd integrate with OpenAI or similar)
    const response = generateBettingResponse(question)

    // Save the question and response
    const assistantResponse = await prisma.bettingAssistant.create({
      data: {
        question,
        response,
        userId,
      },
    })

    return NextResponse.json(assistantResponse, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error asking assistant:', error)
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    )
  }
}

// Simple betting assistant response generator
function generateBettingResponse(question: string): string {
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes('odds') || lowerQuestion.includes('betting')) {
    return "I can help you understand betting odds! In soccer betting, you'll typically see odds like -150 (favorite) or +130 (underdog). Negative odds show how much you need to bet to win $100, while positive odds show how much you'll win on a $100 bet. Always bet responsibly and never bet more than you can afford to lose."
  }

  if (lowerQuestion.includes('soccer') || lowerQuestion.includes('football')) {
    return "Soccer betting offers many options: match winner, over/under goals, both teams to score, and more. Consider factors like team form, head-to-head records, injuries, and home advantage. Remember, even the best teams can have off days, so always do your research before placing bets."
  }

  if (lowerQuestion.includes('strategy') || lowerQuestion.includes('tips')) {
    return "Here are some betting strategies: 1) Bankroll management - never bet more than 5% of your total bankroll on a single bet. 2) Research teams and players thoroughly. 3) Look for value in odds. 4) Keep records of your bets. 5) Don't chase losses. Remember, there's no guaranteed way to win, so bet responsibly."
  }

  if (lowerQuestion.includes('live') || lowerQuestion.includes('in-play')) {
    return "Live betting allows you to place bets during the game. This can be exciting but also risky since odds change rapidly. Watch the game closely, look for momentum shifts, and be quick to act if you see value. However, don't let emotions drive your decisions - stick to your strategy."
  }

  if (lowerQuestion.includes('bankroll') || lowerQuestion.includes('money')) {
    return "Bankroll management is crucial for long-term success. Set aside a specific amount for betting that you can afford to lose. Never bet with money you need for essentials. A common rule is to risk no more than 1-5% of your bankroll per bet. This helps you stay in the game even during losing streaks."
  }

  // Default response
  return "I'm your betting assistant! I can help you with betting strategies, understanding odds, soccer analysis, bankroll management, and general betting advice. Feel free to ask me about specific teams, betting types, or any other betting-related questions. Remember to always bet responsibly!"
}

