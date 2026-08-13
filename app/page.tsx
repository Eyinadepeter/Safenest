import Navbar from "./navbar";
import Hero from "./hero";
import ProblemSection from "./problemSection";
import WhyChoose from "./whyChoose";
import StatsSection from "./statsSection";
import HowItWorks from "./howItWorks";
import Footer from "./foter";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemSection />
      <WhyChoose />
      <StatsSection />
      <HowItWorks />
      <Footer />
    </>
  );
}
