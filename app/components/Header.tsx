
import logo from "../assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";


function Header() {
  return (
    <div>{/* ---------------- Header ---------------- */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
         <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50">
                          <Image src={logo} alt="SafeNest logo" width={50} height={50} className="h-10 w-10" />
                        </div>
                        <div className="flex items-center">
          <span className="text-[18px] font-bold tracking-[-0.4px] text-[#12355B]">
            Safe
          </span>
          <span className="text-[18px] font-bold tracking-[-0.4px] text-[#42a7b3]">
            Nest
          </span>
        </div>
                      </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#" className="hover:text-teal-700 text-[#12355B]">How it works</a>
          <a href="#why" className="hover:text-teal-700 text-[#12355B]">Why SafeNest</a>
          <a href="#" className="hover:text-teal-700 text-[#12355B]">Our Values</a>
        </nav>

        <div className="flex items-center gap-3">
          
          <Link
            href="/signup"
            className="rounded-lg bg-[#12355B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Get Started
          </Link>
          <Link
            href="/signin"
            className="text-sm font-medium px-4 text-[#12355B] hover:text-teal-700"
          >
            Login
          </Link>
        </div>
      </header></div>
  )
}

export default Header