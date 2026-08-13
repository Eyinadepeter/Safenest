import { Trophy } from "lucide-react";
import Navbar from "../navbar";
import PageHeroBanner from "../pageHeroBanner";
import ProblemSection from "../problemSection";
import WhyChoose from "../whyChoose";
import StepBlock from "../stepBlock";
import HighlightCard from "../highlightCard";
import InfoCard from "../infoCard";
import StatsSection from "../statsSection";
import Footer from "../foter";

const faqs = [
  {
    title: "What is Safe Nest?",
    description:
      "Safe Nest is a goal-based financial planning platform that helps users create, manage, and stay on track with their personal financial goals through structured planning and progress tracking.",
  },
  {
    title: "What types of goals can I create on Safe Nest?",
    description:
      "Safe Nest is a goal-based financial planning platform that helps users create, manage, and stay on track with their personal financial goals through structured planning and progress tracking.",
  },
  {
    title: "Does Safe Nest provide loans?",
    description:
      "No. Safe Nest does not offer loans, credit facilities, or any borrowing services.",
  },
];

export default function WhySafeNestPage() {
  return (
    <>
      <Navbar />

      <PageHeroBanner
        eyebrow="Why SafeNest"
        heading="Banks store money. Apps track spending. We help you actually get there"
        description="Most tools stop at giving you a place to put your money. SafeNest is built around one job: helping you reach the goal you set, on time, without the stress."
      />

      <ProblemSection />
      <WhyChoose />

      {/*
        TODO(design asset): the Figma export shows a wide photo here (a
        couple holding house keys) between "Why Choose SafeNest?" and the
        "Pay directly, then celebrate" block. Left as an empty placeholder,
        same approach as the blank hero card on the landing page — drop the
        real image in public/images/ and swap this div for an <Image />.
      */}
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="h-72 w-full rounded-3xl bg-mint md:h-96" />
      </div>

      <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <HighlightCard
            icon={Trophy}
            iconTone="amber"
            title="Goal Achieved!"
            description="You saved ₦700,000 in 11 months. That's real discipline."
          />
          <StepBlock
            badge="Step 04: Hit Your Goal"
            title="Pay directly, then celebrate"
            description="When you have hit 100%, we prep you with a checklist and payment details then you pay your landlord (or whoever) straight from your own bank. No middleman, no delay."
            checklist={[
              <>
                <strong>Preparation checklist</strong>, lease details, payment
                template, everything ready to go.
              </>,
              <>
                <strong>You pay directly</strong> from your own bank. SafeNest
                never touches the transaction.
              </>,
              <>
                <strong>Celebrate the milestone</strong>, then set your next
                goal school fees, travel, whatever&apos;s next.
              </>,
            ]}
          />
        </div>
      </section>

      <section className="bg-[#fcfcfc] py-20">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-navy">
              Common questions
            </h2>
            <p className="mt-3 text-blue-accent">
              A few things people usually want to know before getting
              started.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {faqs.map((faq) => (
              <InfoCard key={faq.title} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <Footer />
    </>
  );
}
