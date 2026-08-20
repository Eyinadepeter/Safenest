import PageHeroBanner from "../components/pageHeroBanner";
import ProblemSection from "../components/problemSection";
import WhyChoose from "../components/whyChoose";
import Footer from "../components/foter";
import Header from "../components/Header";
import WhatWeStandFor from "../components/whatWeStandFor";

export default function WhySafeNestPage() {
  return (
    <>
      <Header />
      <PageHeroBanner
        eyebrow="Why SafeNest"
        heading="Banks store money. Apps track spending. We help you actually get there"
        description="Most tools stop at giving you a place to put your money. SafeNest is built around one job: helping you reach the goal you set, on time, without the stress."
      />

      <ProblemSection />
      <WhyChoose />
      <WhatWeStandFor />

      <Footer />
    </>
  );
}
