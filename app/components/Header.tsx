
import logo from "../assets/images/logo.png";
import Image from "next/image";
import Link from "next/link"


function Header() {
  return (
    <div>
       {/* ---------------- Header ---------------- */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="SafeNest logo"
            className="h-10 w-10 object-contain"
            priority
          />

          <span className="text-2xl font-bold tracking-tight text-[#123b65]">
            Safe<span className="text-[#22a7a4]">Nest</span>
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="#" className="hover:text-teal-700 text-[#123b65]">How it works</Link>
          <Link href="#why" className="hover:text-teal-700 text-[#123b65]">Why SafeNest</Link>
          <Link href="#" className="hover:text-teal-700 text-[#123b65]">Our Values</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className="rounded-lg bg-[#123b65] px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Get Started
          </Link>
          <Link
            href="/signin"
            className="text-sm font-medium text-slate-600 hover:text-teal-700"
          >
            Log In
          </Link>
          
        </div>
      </header></div>
  )
}

export default Header
