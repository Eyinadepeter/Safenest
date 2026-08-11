import Hero from "./hero";
import ProblemSection from "./problemSection";
import StatsSection from "./statsSection";
import HowItWorks from "./howItWorks";
import WhyChoose from "./whyChoose";
import Footer from "./foter";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <StatsSection />
      <HowItWorks />
      <WhyChoose />
      <Footer />
    </>
  );
}
