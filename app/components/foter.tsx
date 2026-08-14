import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Why SafeNest", href: "/why-safenest" },
      { label: "Our Values", href: "/our-values" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-footer-teal">
      <div className="mx-auto max-w-[1320px] px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo-icon.png"
                alt="SafeNest"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-navy">
                Safe<span className="text-teal-dark">Nest</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/90">
              Your financial accountability partner. We help you plan, track,
              and achieve your biggest goals without ever holding your money.
            </p>
            <Link
              href="/get-started"
              className="mt-6 inline-block rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy/90"
            >
              Start Planning
            </Link>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-base font-bold text-teal">{column.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/90 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
