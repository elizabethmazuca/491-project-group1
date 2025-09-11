import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Apple, Smartphone } from "lucide-react";

export function AppDownload() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">Take Your Bets Mobile</h2>
            <p className="text-xl text-gray-300 mb-8">
              Download our award-winning mobile app and never miss a betting opportunity. Available on iOS and Android with exclusive mobile bonuses.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <span>Push notifications for your favorite teams</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <span>Face ID and Touch ID login</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <span>Exclusive mobile-only promotions</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <span>Offline bet tracking and history</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-black hover:bg-gray-200 flex items-center gap-2">
                <Apple className="w-5 h-5" />
                Download for iOS
              </Button>
              <Button className="bg-white text-black hover:bg-gray-200 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Download for Android
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1710993011836-108ba89ebe51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwYXBwJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc1NzQ4MjU0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Mobile app interface on smartphone"
                className="rounded-2xl shadow-2xl max-w-md w-full"
              />
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full shadow-lg">
                <span className="font-medium">4.9★ Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}