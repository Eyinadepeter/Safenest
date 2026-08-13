import { ShieldCheck, Bell, Trophy } from "lucide-react";
import Navbar from "../navbar";
import PageHeroBanner from "../pageHeroBanner";
import StepBlock from "../stepBlock";
import HighlightCard from "../highlightCard";
import GoalCalculatorForm from "../goalCalculatorForm";
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

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />

      <PageHeroBanner
        eyebrow="How it works"
        heading="From a scary lump sum to a plan you can actually stick to"
        description="No jargon, no guesswork. Here's exactly what happens from the moment you set a goal to the moment you achieve it."
      />

      <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          <StepBlock
            badge="Step 01: Set Your Goal"
            title="Tell us what you're saving for"
            description="Whether it's annual rent, school fees, or an emergency fund give us the amount and the deadline. That's all we need to get started."
            checklist={[
              "Name your goal: rent, school fees, travel, whatever matters to you.",
              "Set the target amount and deadline and we handle the math from here.",
              "Choose how often you want to contribute, weekly or monthly, your call.",
            ]}
          />
          <GoalCalculatorForm />
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <HighlightCard
            icon={ShieldCheck}
            title="Connect via Read-Only API"
            description="We calculate your plan from real income and expenses securely, without ever touching your money."
            footnote="Read-only · No debit access"
          />
          <StepBlock
            badge="Step 02: Connect Your Bank"
            title="We calculate your real monthly number"
            description="Link your bank with read-only access or skip and enter your income and expenses manually. Either way, we use your actual financial picture to build a plan that fits, not a generic estimate."
            checklist={[
              "Read-only access, always. We can see your transactions but we can never move or spend your money.",
              "No bank? No problem. Enter your income and expenses manually instead.",
              "We build your budget plan from your real numbers, and suggest where you can find room to save.",
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <StepBlock
            badge="Step 03: Stay On Track"
            title="Gentle nudges, never guilt trips"
            description="Every month, we track your progress against your target and let you know exactly where you stand with honest updates and smart suggestions, not judgment."
            checklist={[
              <>
                <strong>Real-time progress tracking</strong>, always know how
                close you are to your goal.
              </>,
              <>
                <strong>Smart insights</strong> flag where you could redirect
                spending toward your goal.
              </>,
              <>
                <strong>Fall behind?</strong> We help you recover with a
                re-adjusted plan, not a scolding notification.
              </>,
            ]}
          />

          <div className="rounded-3xl bg-mint p-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-navy">Rent</span>
              <span className="rounded-full bg-teal-dark px-3 py-1 text-xs font-bold text-white">
                On Track
              </span>
            </div>
            <p className="mt-4 text-2xl font-extrabold text-navy">
              ₦450,000{" "}
              <span className="text-sm font-medium text-navy/50">
                of ₦700,000
              </span>
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs font-semibold text-navy/60">
              <span>64%</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-navy-track/20">
                <div className="h-full rounded-full bg-teal-dark" style={{ width: "64%" }} />
              </div>
              <span>₦700,000 left</span>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-white p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/40">
                <Bell className="h-4 w-4 text-teal-dark" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy">Goal Alert</p>
                <p className="mt-1 text-sm text-navy/70">
                  You spent ₦8,000 less on groceries this month. Move it to
                  your rent goal?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pb-20 md:px-10">
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
