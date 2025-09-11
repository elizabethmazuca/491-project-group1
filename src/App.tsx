import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LiveOdds } from "./components/LiveOdds";
import { SportsLogos } from "./components/SportsLogos";
import { Features } from "./components/Features";
import { AppDownload } from "./components/AppDownload";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LiveOdds />
      <SportsLogos />
      <Features />
      <AppDownload />
      <Footer />
    </div>
  );
}