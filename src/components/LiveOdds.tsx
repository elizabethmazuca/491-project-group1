import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

const mockGames = [
  {
    id: 1,
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    homeOdds: "+150",
    awayOdds: "-180",
    sport: "NBA",
    time: "8:00 PM ET",
    trending: "up"
  },
  {
    id: 2,
    homeTeam: "Chiefs",
    awayTeam: "Bills",
    homeOdds: "-120",
    awayOdds: "+100",
    sport: "NFL",
    time: "1:00 PM ET",
    trending: "down"
  },
  {
    id: 3,
    homeTeam: "Dodgers",
    awayTeam: "Yankees",
    homeOdds: "+110",
    awayOdds: "-130",
    sport: "MLB",
    time: "7:30 PM ET",
    trending: "up"
  },
  {
    id: 4,
    homeTeam: "Bruins",
    awayTeam: "Rangers",
    homeOdds: "+140",
    awayOdds: "-160",
    sport: "NHL",
    time: "7:00 PM ET",
    trending: "up"
  }
];

export function LiveOdds() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Live Betting Lines</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get the best odds on today's biggest games. Lines update in real-time to give you the edge you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockGames.map((game) => (
            <Card key={game.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{game.sport}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    {game.trending === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    Live
                  </div>
                </div>
                <CardTitle className="text-lg">{game.awayTeam} @ {game.homeTeam}</CardTitle>
                <p className="text-sm text-gray-500">{game.time}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{game.awayTeam}</span>
                    <Button variant="outline" size="sm" className="hover:bg-accent hover:text-accent-foreground">
                      {game.awayOdds}
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{game.homeTeam}</span>
                    <Button variant="outline" size="sm" className="hover:bg-accent hover:text-accent-foreground">
                      {game.homeOdds}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            View All Games
          </Button>
        </div>
      </div>
    </section>
  );
}