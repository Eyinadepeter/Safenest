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
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-[360px] flex flex-col items-center text-center">

        {/* Illustration */}
        <div className="relative w-[300px] h-[230px] mb-8">
          <Image
            src={achievementImage}
            alt="Account successfully created"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="font-rounded text-[15px] leading-tight text-slate-800">
          Account Successfully Created, {name}
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-[330px] font-sans text-[11px] leading-[1.45] text-slate-500">
          Big goals are not reached in one leap, they are reached one
          consistent step at a time. You just took yours.
        </p>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="mt-7 w-full rounded-[6px] bg-[#173F68] py-3 text-center font-rounded text-[10px] text-white transition hover:bg-[#123555]"
        >
          Let&apos;s Get Started
        </Link>

      </div>
    </main>
  );
}   