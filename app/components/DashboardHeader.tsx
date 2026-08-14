"use client";
import homeIcon from "../assets/images/home.png";
import target from "../assets/images/target.png";
import savings from "../assets/images/savings.png";
import payments from "../assets/images/payments.png";
import insights from "../assets/images/insights.png";
import Settings from "../assets/images/setting-2.png";
import LifeBuoy from "../assets/images/lifebour.png";

import {
  
  LogOut,
  Menu,
  X,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import logo from "../assets/images/logo.png";

const mainMenu = [
  {
    name: "Home",
    href: "/dashboard",
    icon: homeIcon,
  },
  {
    name: "My Goals",
    href: "/goals",
    icon: target,
  },
  {
    name: "Savings",
    href: "/savings",
    icon: savings,
  },
  {
    name: "Payment",
    href: "/payment",
    icon: payments,
  },
  {
    name: "Insights",
    href: "/insights",
    icon: insights,
  },
];

const bottomMenu = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Support",
    href: "/support",
    icon: LifeBuoy,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="SafeNest logo"
            className="h-8 w-8 object-contain"
            priority
          />

          <span className="text-sm font-bold tracking-tight text-[#123b65]">
            Safe<span className="text-[#22a7a4]">Nest</span>
          </span>
        </Link>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#123b65] transition hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {isOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[270px] flex-col overflow-y-auto
          bg-[#f4f6f8]
          px-7 py-7
          text-[#123b65]
          shadow-xl
          transition-transform duration-300 ease-in-out

          lg:w-[250px]
          lg:translate-x-0
          lg:px-8
          lg:py-7
          lg:shadow-none

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ================= LOGO ================= */}
        <div className="relative">
          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={closeSidebar}
            className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-lg text-[#123b65] hover:bg-slate-200 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          <Link
            href="/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-2"
          >
            <Image
              src={logo}
              alt="SafeNest logo"
              className="h-13 w-13 object-contain"
              priority
            />

            <span className="text-[20px] font-bold tracking-tight text-[#123b65]">
              Safe<span className="text-[#22a7a4]">Nest</span>
            </span>
          </Link>

          <p className="mt-3 text-[18px] font-medium text-[#1E293B]">
            Financial Serenity
          </p>
        </div>

        {/* ================= NEW GOAL ================= */}
        <button
  type="button"
  className="
    mt-8 h-[50px] w-full rounded-lg
    bg-[#173f6b]
    text-[11px] font-medium text-white
    transition
    hover:bg-[#16466f]
    shrink-0
    cursor-pointer
  "
>
  New Goal
</button>

        {/* ================= MAIN NAVIGATION ================= */}
        <nav className="mt-8 flex flex-col gap-2 ">
          {mainMenu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex h-11 items-center gap-3
                  rounded-lg px-4
                  text-[17px] font-medium
                  transition-all duration-200

                  ${
                    active
                      ? "bg-[#b5e7e2] text-[#0b3156]"
                      : "text-[#0b3156] hover:bg-slate-200"
                  }
                `}
              >
                <Image
  src={item.icon}
  alt=""
  width={18}
  height={18}
  className="h-[18px] w-[18px] object-contain"
/>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* ================= BOTTOM NAVIGATION ================= */}
        <div className="mt-auto pt-12">
          <nav className="flex flex-col gap-2">
            {bottomMenu.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`
                    flex h-11 items-center gap-3
                    rounded-lg px-4
                    text-[18px] font-medium
                    transition-all duration-200

                    ${
                      active
                        ? "bg-[#b5e7e2] text-[#0b3156]"
                        : "text-[#0b3156] hover:bg-slate-200"
                    }
                  `}
                >
                  <Image
  src={item.icon}
  alt=""
  width={18}
  height={18}
  className="h-[18px] w-[18px] object-contain"
/>

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-5 border-t border-[#7894b3]" />

          {/* Logout */}
          <button
            type="button"
            className="
              flex h-11 w-full
              items-center gap-3
              rounded-lg px-4
              text-[18px] font-medium
              text-[#123b65]
              transition
              hover:bg-slate-200
            "
          >
            <LogOut
              className="h-[17px] w-[17px]"
              strokeWidth={2.4}
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
