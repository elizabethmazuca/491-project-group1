import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
              <span className="text-accent-foreground font-bold">B</span>
            </div>
            <span className="text-white text-xl font-bold">Betz</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-accent transition-colors">Sports</a>
            <a href="#" className="text-white hover:text-accent transition-colors">Live</a>
            <a href="#" className="text-white hover:text-accent transition-colors">Casino</a>
            <a href="#" className="text-white hover:text-accent transition-colors">Promotions</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-accent">
              Login
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-sm py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-white hover:text-accent transition-colors px-4">Sports</a>
              <a href="#" className="text-white hover:text-accent transition-colors px-4">Live</a>
              <a href="#" className="text-white hover:text-accent transition-colors px-4">Casino</a>
              <a href="#" className="text-white hover:text-accent transition-colors px-4">Promotions</a>
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-700">
                <Button variant="ghost" className="text-white hover:text-accent justify-start">
                  Login
                </Button>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}