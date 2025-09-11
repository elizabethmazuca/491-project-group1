import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Shield,
  Award,
  Users
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="mb-4">Stay in the Game</h3>
            <p className="text-gray-400 mb-6">
              Get exclusive betting tips, early access to promotions, and the latest sports insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                <span className="text-accent-foreground font-bold">B</span>
              </div>
              <span className="text-xl font-bold">Betz</span>
            </div>
            <p className="text-gray-400 mb-4">
              The most trusted sports betting platform with over 2 million active users worldwide.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-accent p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-accent p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-accent p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-accent p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Sports */}
          <div>
            <h4 className="mb-4">Sports</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors">Football (NFL)</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Basketball (NBA)</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Baseball (MLB)</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Hockey (NHL)</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Soccer</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Tennis</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Affiliate Program</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Responsible Gaming</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Live Chat</a></li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-gray-800">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="flex items-center text-sm text-gray-400">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              SSL Secured
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Award className="w-4 h-4 mr-2 text-accent" />
              Licensed & Regulated
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              2M+ Users
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            © 2025 Betz. All rights reserved. | 21+ Only | Gamble Responsibly
          </div>
        </div>
      </div>
    </footer>
  );
}