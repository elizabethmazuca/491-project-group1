import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TrendingUp, Zap, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="text-white font-bold text-xl">Betz</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/sports" className="text-white hover:text-orange-500 transition-colors">Sports</Link>
          <Link href="/live" className="text-white hover:text-orange-500 transition-colors">Live</Link>
          <Link href="/casino" className="text-white hover:text-orange-500 transition-colors">Casino</Link>
          <Link href="/promotions" className="text-white hover:text-orange-500 transition-colors">Promotions</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/auth/signin" className="text-white hover:text-orange-500 transition-colors">Login</Link>
          <Link href="/auth/signup">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background with stadium effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          </div>
        </div>
        
        {/* Stadium crowd effect with bokeh lights */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/60"></div>
        
        {/* Simulated bokeh lights */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400 rounded-full opacity-80"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-50"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-orange-300 rounded-full opacity-70"></div>
          <div className="absolute bottom-1/4 right-1/2 w-2 h-2 bg-white rounded-full opacity-40"></div>
          <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-orange-400 rounded-full opacity-60"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Win Big with</span>
            <br />
            <span className="text-orange-500">Every Bet</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the thrill of sports betting with live odds, instant payouts, and the most competitive lines in the game.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg">
                Start Betting Now
              </Button>
            </Link>
            <div className="w-full sm:w-64 h-12 bg-white rounded-lg flex items-center px-4">
              <input 
                type="text" 
                placeholder="Search games..." 
                className="flex-1 text-gray-900 placeholder-gray-500 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Live Odds Feature */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Live Odds</h3>
              <p className="text-gray-400">Real-time betting lines updated every second</p>
            </div>

            {/* Instant Payouts Feature */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Payouts</h3>
              <p className="text-gray-400">Get your winnings in minutes, not days</p>
            </div>

            {/* Secure & Licensed Feature */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure & Licensed</h3>
              <p className="text-gray-400">100% secure with full regulatory compliance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}