import Image from "next/image";
import Link from "next/link";
import achievementImage from "../assets/images/Achievement-amico(3) 1.png";

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const params = await searchParams;
  const name = params.name?.trim() || "there";

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center text-center">

        {/* Illustration */}
        <div className="relative mb-8 h-[260px] w-[340px] sm:mb-10 sm:h-[300px] sm:w-[400px] lg:h-[340px] lg:w-[460px]">
          <Image
            src={achievementImage}
            alt="Account successfully created"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="font-rounded text-base font-bold leading-tight text-slate-800 sm:text-lg lg:text-xl">
          Account Successfully Created, {name}
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-[420px] px-2 font-sans text-xs leading-relaxed text-slate-500 sm:text-sm lg:text-sm">
          Big goals are not reached in one leap, they are reached one
          consistent step at a time. You just took yours.
        </p>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="mt-8 w-full max-w-[380px] rounded-lg bg-[#173F68] py-3.5 text-center font-rounded text-xs font-bold text-white transition duration-200 hover:bg-[#123555] focus:outline-none focus:ring-2 focus:ring-[#173F68] focus:ring-offset-2 sm:mt-10 sm:py-4 sm:text-sm"
        >
          Let&apos;s Get Started
        </Link>

      </div>
    </main>
  );
}