import { Eye } from "lucide-react";
import Image from "next/image";
import Header from "../components/Header";
import PageHeroBanner from "../components/pageHeroBanner";
import CoreValuesList from "../components/coreValuesList";
import Footer from "../components/foter";
import missionIcon from "../assets/images/mission-icon.png";

const personalityTraits = [
  "Calm",
  "Smart",
  "Supportive",
  "Friendly",
  "Professional",
  "Trustworthy",
];

export default function OurValuesPage() {
  return (
    <>
      <Header />

      <PageHeroBanner
        eyebrow="Our Values"
        heading="The principles behind every plan we help you build"
        description="SafeNest exists to bridge the gap between financial goals and financial discipline. Here's what guides how we do that."
      />

      <section className="mx-auto max-w-[1320px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-teal-dark">
              Our Story
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-navy md:text-3xl">
              Helping people plan today for the life they want tomorrow
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-navy/70">
              Many people earn a steady monthly income but still struggle to
              meet major financial commitments like annual rent, school fees,
              travel, or emergency expenses. The challenge isn&apos;t always
              income it&apos;s having a clear plan and staying consistent.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-navy/70">
              SafeNest was created to bridge that gap. Rather than holding
              users&apos; money, we provide personalized savings plans,
              intelligent reminders, and progress tracking that keep people
              accountable every step of the way.
            </p>
          </div>

          <div className="rounded-3xl bg-navy p-8 text-center md:p-10">
            <p className="text-lg font-medium leading-relaxed text-white md:text-xl">
              We believe financial confidence begins with a{" "}
              <span className="text-teal">plan</span>, grows through{" "}
              <span className="text-teal">consistency</span>, and is achieved
              through <span className="text-teal">accountability</span>.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pb-16 md:px-10 md:pb-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-mint p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <Eye className="h-6 w-6 text-teal-dark" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-navy">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy/70">
              To become Africa&apos;s most trusted goal-based financial
              planning platform, helping millions build financial confidence
              through smarter planning and disciplined saving.
            </p>
          </div>

          <div className="rounded-2xl bg-mint p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <Image
                src={missionIcon}
                alt=""
                className="h-6 w-6 object-contain"
              />
            </div>
            <h3 className="mt-5 text-lg font-bold text-navy">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy/70">
              To empower people to achieve their financial goals with
              confidence through personalized planning, consistent progress
              tracking, and trusted financial guidance.
            </p>
          </div>
        </div>
      </section>

      <CoreValuesList />

      <section className="mx-auto max-w-[1320px] px-6 pb-20 pt-16 md:px-10">
        <div className="rounded-3xl bg-navy px-6 py-14 text-center md:px-16">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            Our Brand <span className="text-teal">Personality</span>
          </h2>
          <p className="mt-3 text-sm text-white/70">
            If SafeNest were a person, here&apos;s who we&apos;d be.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {personalityTraits.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-white/25 px-5 py-2 text-sm font-medium text-white"
              >
                · {trait}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
