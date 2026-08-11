import Image from "next/image";

const features = [
  {
    icon: "/images/icon-shield.png",
    title: "Bank-Level Security",
    description:
      "Your money and personal information are protected with advanced encryption and industry-leading security standards.",
  },
  {
    icon: "/images/icon-target.png",
    title: "Goal-Based Saving",
    description:
      "Create personalized savings goals, monitor your progress in real time, and stay motivated every step of the way.",
  },
  {
    icon: "/images/icon-shield.png",
    title: "Smart Financial Insights",
    description:
      "Track spending habits, monitor savings growth, and make informed financial decisions with easy-to-understand analytics.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#fcfcfc] py-20">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-navy md:text-5xl">
            Why Choose Safe<span className="text-teal-dark">Nest</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-navy/70">
            SafeNest empowers you to save smarter, manage your finances with
            confidence, and achieve every financial goal through a secure and
            intuitive platform.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl bg-mint p-8">
              <Image
                src={feature.icon}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <h3 className="mt-5 text-lg font-bold text-navy">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
