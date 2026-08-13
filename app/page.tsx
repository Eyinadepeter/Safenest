import Hero from "./hero";
import ProblemSection from "./problemSection";
import StatsSection from "./statsSection";
import HowItWorks from "./howItWorks";
import WhyChoose from "./whyChoose";
import Footer from "./foter";
import Headers from "./components/Header";

export default function Home() {
  return (
    <>
      <Headers/>
      <Hero />
      <ProblemSection />
      <StatsSection />
      <HowItWorks />
      <WhyChoose />
      <Footer />
    </>
  );
}
