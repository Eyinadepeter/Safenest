import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SafeNest",
  description:
    "Safenest is a savings goal management application that helps users track and achieve their financial objectives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
