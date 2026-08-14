interface PageHeroBannerProps {
  eyebrow: string;
  heading: React.ReactNode;
  description: string;
}

/**
 * Simplified teal rounded hero banner used by interior marketing pages
 * (How it works, Why SafeNest). The landing page keeps its own richer
 * Hero (buttons + photos + calendar widget) in app/hero.tsx — this is a
 * lighter variant for pages that only need eyebrow + heading + copy.
 */
export default function PageHeroBanner({
  eyebrow,
  heading,
  description,
}: PageHeroBannerProps) {
  return (
    <section className="mx-auto max-w-[1320px] px-6 pb-0 md:px-10">
      <div className="relative overflow-hidden rounded-[32px] bg-teal px-6 py-14 text-center md:px-16 md:py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
          <div className="absolute right-0 top-0 h-64 w-40 rounded-bl-[60px] bg-white/10" />
          <div className="absolute right-24 top-10 h-80 w-24 rounded-[40px] bg-white/10" />
        </div>

        <div className="relative">
          <p className="text-sm font-bold uppercase tracking-wide text-navy/80">
            {eyebrow}
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-navy md:text-5xl">
            {heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] font-medium leading-relaxed text-navy/90 md:text-base">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
