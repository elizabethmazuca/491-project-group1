'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Clock, Users, Trophy } from 'lucide-react'

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
}

export default function SportsPage() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [betAmount, setBetAmount] = useState('')
  const [betType, setBetType] = useState('home')

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games')
        if (response.ok) {
          const gamesData = await response.json()
          setGames(gamesData)
        }
      } catch (error) {
        console.error('Error fetching games:', error)
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
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-white font-bold text-xl">Betz</span>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="/" className="text-gray-300 hover:text-orange-500">Home</a>
              <a href="/sports" className="text-orange-500">Sports</a>
              <a href="/live" className="text-gray-300 hover:text-orange-500">Live</a>
              <a href="/casino" className="text-gray-300 hover:text-orange-500">Casino</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Soccer Betting</h1>
          <p className="text-xl text-gray-300">
            Place your bets on today&apos;s biggest soccer matches
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {games.map((game) => (
            <Card key={game.id} className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                    {game.league}
                  </span>
                  <div className="flex items-center text-green-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">{game.status}</span>
                  </div>
                </div>
                <CardTitle className="text-white text-lg">
                  {game.homeTeam} vs {game.awayTeam}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {new Date(game.gameTime).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center bg-gray-700 rounded px-3 py-2">
                    <span className="text-white">{game.homeTeam}</span>
                    <span className="text-orange-500 font-bold">{game.homeOdds}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-700 rounded px-3 py-2">
                    <span className="text-white">Draw</span>
                    <span className="text-orange-500 font-bold">{game.drawOdds || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-700 rounded px-3 py-2">
                    <span className="text-white">{game.awayTeam}</span>
                    <span className="text-orange-500 font-bold">{game.awayOdds}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setSelectedGame(game)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Place Bet
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Betting Modal */}
        {selectedGame && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="bg-gray-800 border-gray-700 w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="text-white">
                  Place Bet: {selectedGame.homeTeam} vs {selectedGame.awayTeam}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-white mb-1">Live Games</h3>
              <p className="text-gray-400">{games.filter(g => g.status === 'live').length} active</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-white mb-1">Upcoming</h3>
              <p className="text-gray-400">{games.filter(g => g.status === 'upcoming').length} games</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-white mb-1">Leagues</h3>
              <p className="text-gray-400">{new Set(games.map(g => g.league)).size} leagues</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

