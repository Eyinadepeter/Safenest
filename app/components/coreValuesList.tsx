import { coreValues } from "./coreValuesData";

export default function CoreValuesList() {
  return (
    <section className="bg-[#fcfcfc] py-16 md:py-20">
      <div className="mx-auto max-w-[1000px] px-6 md:px-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-navy md:text-4xl">
            Our Core <span className="text-teal-dark">Values</span>
          </h2>
          <p className="mt-3 text-[15px] text-navy/70">
            The principles that shape every experience we create and every
            financial journey we support.
          </p>
        </div>

        <div className="mt-12 flex flex-col">
          {coreValues.map((value, i) => (
            <div
              key={value.number}
              className={`flex gap-6 py-6 md:gap-8 ${
                i !== coreValues.length - 1 ? "border-b border-navy/10" : ""
              }`}
            >
              <span className="w-10 shrink-0 text-2xl font-extrabold text-navy/40 md:text-3xl">
                {value.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-navy md:text-lg">
                  {value.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy/70">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
