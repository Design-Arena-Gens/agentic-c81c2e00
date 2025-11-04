import type { Metadata } from "next";
import "./globals.css";
import { Rajdhani, Inter } from "next/font/google";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Valorant Dual Threats",
  description: "Showcase of Valorant pros with Tier 1 Counter-Strike pedigrees"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
