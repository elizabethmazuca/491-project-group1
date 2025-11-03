'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, MessageCircle } from 'lucide-react'
import { getTeamInitials } from '@/lib/utils'
import Link from 'next/link'

interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeOdds: number
  awayOdds: number
  drawOdds?: number
  gameTime: string
  status: string
  league: string
  homeScore?: number
  awayScore?: number
}

export default function SportsPage() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [betAmount, setBetAmount] = useState('')
  const [betType, setBetType] = useState('home')

  // Mock data matching the design - matches shown in the image
  const getMockGames = (): Game[] => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    // Live game - Premier League
    const liveGameTime = new Date(today)
    liveGameTime.setHours(20, 0, 0, 0) // 8:00 PM today
    
    // Upcoming games
    const game2Time = new Date(today)
    game2Time.setHours(21, 0, 0, 0) // 9:00 PM today
    
    const game3Time = new Date(today)
    game3Time.setHours(18, 30, 0, 0) // 6:30 PM today
    
    return [
      {
        id: '1',
        homeTeam: 'Manchester United',
        awayTeam: 'Arsenal',
        homeOdds: 2.15,
        awayOdds: 3.2,
        drawOdds: 3.4,
        gameTime: liveGameTime.toISOString(),
        status: 'live',
        league: 'Premier League',
        homeScore: 1,
        awayScore: 1,
      },
      {
        id: '2',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        homeOdds: 1.95,
        awayOdds: 4.2,
        drawOdds: 3.6,
        gameTime: game2Time.toISOString(),
        status: 'upcoming',
        league: 'La Liga',
      },
      {
        id: '3',
        homeTeam: 'Bayern Munich',
        awayTeam: 'Borussia Dortmund',
        homeOdds: 1.75,
        awayOdds: 5.5,
        drawOdds: 3.8,
        gameTime: game3Time.toISOString(),
        status: 'upcoming',
        league: 'Bundesliga',
      },
    ]
  }

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games')
        if (response.ok) {
          const gamesData = await response.json()
          
          // Filter and sort games: today's matches, live first, then upcoming
          const now = new Date()
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
          
          const todayGames = gamesData
            .filter((game: Game) => {
              const gameDate = new Date(game.gameTime)
              // Include games from today or live games regardless of date
              return (
                (gameDate >= today && gameDate < tomorrow) ||
                game.status === 'live'
              )
            })
            .sort((a: Game, b: Game) => {
              // Live games first
              if (a.status === 'live' && b.status !== 'live') return -1
              if (a.status !== 'live' && b.status === 'live') return 1
              // Then sort by game time
              return new Date(a.gameTime).getTime() - new Date(b.gameTime).getTime()
            })
          
          // Use mock data if no games found, otherwise use real data
          setGames(todayGames.length > 0 ? todayGames : getMockGames())
        } else {
          // If API fails, use mock data
          setGames(getMockGames())
        }
      } catch (error) {
        console.error('Error fetching games:', error)
        // On error, use mock data so the page still displays
        setGames(getMockGames())
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  const handlePlaceBet = async () => {
    if (!selectedGame || !betAmount) return

    try {
      const response = await fetch('/api/bets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: selectedGame.id,
          amount: parseFloat(betAmount),
          odds: betType === 'home' ? selectedGame.homeOdds : 
                betType === 'away' ? selectedGame.awayOdds : 
                selectedGame.drawOdds || 0,
          type: betType,
          userId: 'user-id-here', // In real app, get from session
        }),
      })

      if (response.ok) {
        alert('Bet placed successfully!')
        setSelectedGame(null)
        setBetAmount('')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error placing bet:', error)
      alert('Failed to place bet')
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const isLive = (game: Game) => {
    return game.status === 'live'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading games...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header - Matching Homepage Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center space-x-2">
          <Link href="/">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
          </Link>
          <Link href="/">
              <span className="text-white font-bold text-xl">Betz</span>
          </Link>
            </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/sports" className="text-orange-500 transition-colors">
            Sports
          </Link>
          <Link href="/live" className="text-white hover:text-orange-500 transition-colors">
            Live
          </Link>
          <Link href="/casino" className="text-white hover:text-orange-500 transition-colors">
            Casino
          </Link>
          <Link href="/promotions" className="text-white hover:text-orange-500 transition-colors">
            Promotions
          </Link>
            </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/assistant">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Ask Rob</span>
            </Button>
          </Link>
          <Link href="/auth/signin" className="text-white hover:text-orange-500 transition-colors">
            Login
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Today's Matches Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Today&apos;s Matches</h1>
          <p className="text-gray-400 text-lg">
            Place your bets on the biggest soccer matches
          </p>
        </div>

        {/* Match Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {games.map((game) => {
            const gameDate = new Date(game.gameTime)
            const live = isLive(game)
            
            return (
              <Card 
                key={game.id} 
                className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors"
              >
                <CardContent className="p-6">
                  {/* League and Status */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {game.league}
                  </span>
                    {live ? (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        LIVE
                      </span>
                    ) : (
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatTime(gameDate)}</span>
                      </div>
                    )}
                  </div>

                  {/* Teams and Score */}
                  <div className="space-y-4 mb-6">
                    {/* Home Team */}
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {getTeamInitials(game.homeTeam)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{game.homeTeam}</div>
                      </div>
                      {live && (
                        <div className="text-white font-bold text-xl">
                          {game.homeScore ?? 0}
                        </div>
                      )}
                    </div>

                    {/* VS Separator */}
                    <div className="text-center text-gray-500 text-sm font-medium">
                      VS
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {getTeamInitials(game.awayTeam)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{game.awayTeam}</div>
                      </div>
                      {live && (
                        <div className="text-white font-bold text-xl">
                          {game.awayScore ?? 0}
                </div>
                      )}
                  </div>
                  </div>

                  {/* Odds Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setBetType('home')
                        setSelectedGame(game)
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Home {game.homeOdds.toFixed(2)}
                    </button>
                    <button
                      onClick={() => {
                        setBetType('draw')
                        setSelectedGame(game)
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Draw {game.drawOdds?.toFixed(2) || 'N/A'}
                    </button>
                    <button
                      onClick={() => {
                        setBetType('away')
                        setSelectedGame(game)
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Away {game.awayOdds.toFixed(2)}
                    </button>
                  </div>
              </CardContent>
            </Card>
            )
          })}
        </div>

        {games.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No matches scheduled for today</p>
          </div>
        )}

        {/* Betting Modal */}
        {selectedGame && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="bg-gray-800 border-gray-700 w-full max-w-md mx-4">
              <div className="p-6">
                <h2 className="text-white text-xl font-bold mb-2">
                  Place Bet: {selectedGame.homeTeam} vs {selectedGame.awayTeam}
                </h2>
                <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bet Type
                  </label>
                  <select
                    value={betType}
                    onChange={(e) => setBetType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="home">{selectedGame.homeTeam} Win</option>
                    <option value="draw">Draw</option>
                    <option value="away">{selectedGame.awayTeam} Win</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bet Amount ($)
                  </label>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {betAmount && (
                  <div className="bg-gray-700 p-3 rounded-md">
                    <p className="text-gray-300 text-sm">
                      Potential Payout: ${(parseFloat(betAmount) * (betType === 'home' ? selectedGame.homeOdds : 
                        betType === 'away' ? selectedGame.awayOdds : 
                        selectedGame.drawOdds || 0)).toFixed(2)}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    onClick={handlePlaceBet}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={!betAmount}
                  >
                    Place Bet
                  </Button>
                  <Button
                    onClick={() => setSelectedGame(null)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
