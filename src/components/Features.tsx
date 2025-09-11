import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Smartphone, 
  CreditCard, 
  BarChart3, 
  Users, 
  Clock, 
  Trophy,
  Shield,
  Headphones
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Bet anywhere, anytime with our lightning-fast mobile app optimized for iOS and Android."
  },
  {
    icon: CreditCard,
    title: "Instant Deposits",
    description: "Fund your account instantly with credit cards, PayPal, or crypto. Zero fees on deposits."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Make informed bets with detailed stats, trends, and predictive insights for every game."
  },
  {
    icon: Users,
    title: "Social Betting",
    description: "Follow expert bettors, share your picks, and compete on leaderboards with friends."
  },
  {
    icon: Clock,
    title: "Live Betting",
    description: "Bet on games as they happen with constantly updating odds and instant bet placement."
  },
  {
    icon: Trophy,
    title: "VIP Rewards",
    description: "Earn points on every bet and unlock exclusive bonuses, cashback, and VIP perks."
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your funds and data are protected with 256-bit encryption and cold storage security."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Get help anytime with our round-the-clock customer support via chat, phone, or email."
  }
];

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Experience the future of sports betting with cutting-edge features designed to maximize your winning potential and enhance your betting experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}