import Navbar from "./navbar";
import Hero from "./hero";
import ProblemSection from "./components/problemSection";
import StatsSection from "./components/statsSection";
import HowItWorks from "./components/howItWorks";
import WhyChoose from "./components/whyChoose";
import Footer from "./components/foter";
import Headers from "./components/Header";

export default function Home() {
  return (
    <>
      <Headers />
      <Hero />
      <ProblemSection />
      <WhyChoose />
      <StatsSection />
      <HowItWorks />
      <Footer />
    </>
  );
}
