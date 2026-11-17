import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { isLive, siteUrl } from "@/lib/business";
import "./globals.css";

// Google Fonts files (OFL), served through next/font so the build needs no network.
const fraunces = localFont({
  src: "./fonts/Fraunces-opsz-wght.woff2",
  variable: "--font-fraunces",
  weight: "300 700",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
});

const figtree = localFont({
  src: "./fonts/Figtree-wght.woff2",
  variable: "--font-figtree",
  weight: "300 900",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const title = "Pilates Classes in Gambrills, MD | Ischyra Soma Fitness";
const description =
  "See this week's Pilates, GYROTONIC and GYROKINESIS class times at Ischyra Soma Fitness in Gambrills, MD. Three people per class. Book your spot online.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Ischyra Soma Fitness",
  alternates: { canonical: "/" },
  robots: isLive
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ischyra Soma Fitness",
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body className="min-h-dvh">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
