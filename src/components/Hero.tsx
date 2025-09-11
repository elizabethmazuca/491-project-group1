import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TrendingUp, Shield, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1556816213-431b32a38191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMHNwb3J0cyUyMGJldHRpbmd8ZW58MXx8fHwxNzU3NDUzOTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Sports stadium with cheering crowd"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-6xl md:text-7xl font-bold leading-tight">
            Win Big with 
            <span className="text-accent"> Every Bet</span>
          </h1>
          
          <p className="mb-8 text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Experience the thrill of sports betting with live odds, instant payouts, and the most competitive lines in the game.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg">
              Start Betting Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              Download App
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <div className="bg-accent/20 p-4 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="mb-2">Live Odds</h3>
              <p className="text-gray-300">Real-time betting lines updated every second</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-accent/20 p-4 rounded-full mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="mb-2">Instant Payouts</h3>
              <p className="text-gray-300">Get your winnings in minutes, not days</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-accent/20 p-4 rounded-full mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="mb-2">Secure & Licensed</h3>
              <p className="text-gray-300">100% secure with full regulatory compliance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}