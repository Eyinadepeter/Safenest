import Link from "next/link";
import Image from "next/image";
import logo from "../assets/images/logo.png";

/**
 * "Funds remain with licensed financial institutions..." bar, used at the
 * bottom of dashboard pages. Extracted here since app/create-goal/page.tsx
 * had its own inline copy of this same markup — new pages should import
 * this instead of re-writing it.
 */
export default function DashboardFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 py-6">
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          alt="SafeNest logo"
          className="h-6 w-6 object-contain"
        />
        <span className="text-base font-bold tracking-tight text-[#123b65]">
          Safe<span className="text-[#22a7a4]">Nest</span>
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Funds remain with licensed financial institutions. SafeNest does
          not hold user funds.
        </p>

        <nav className="flex items-center gap-6 text-xs font-medium text-[#12355B]">
          <Link href="/security" className="transition hover:text-teal-700">
            Security
          </Link>
          <Link href="/privacy" className="transition hover:text-teal-700">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-teal-700">
            Terms of service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
