"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Why SafeNest", href: "/why-safenest" },
  { label: "Our Values", href: "/our-values" },
];

/**
 * Marketing site navbar used by the landing page, "How it works", and
 * "Why SafeNest" pages. This is intentionally separate from
 * `app/components/Header.tsx`, which belongs to the dashboard/auth flow —
 * do not merge the two; they serve different parts of the app.
 */
export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white">
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-icon.png"
            alt="SafeNest"
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="text-lg font-bold text-navy">
            Safe<span className="text-teal-dark">Nest</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-[15px] font-medium text-navy/90 hover:text-navy ${
                    isActive ? "border-b-2 border-teal-dark pb-1" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-6">
          <Link
            href="/get-started"
            className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy/90"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-navy hover:text-navy/80"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
