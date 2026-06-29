import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import { Great_Vibes } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const aquarelle = localFont({
  src: "../public/fonts/Aquarelle.woff2",
  variable: "--font-aquarelle",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Love Letter For You",
  description: "A private, handcrafted love story made with endless affection.",
  openGraph: {
    title: "A Love Letter For You",
    description: "Something special awaits...",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${aquarelle.variable} h-full`}
    >
      <body className="h-full overflow-hidden antialiased font-sans text-rose-900 bg-cream">
        {children}
      </body>
    </html>
  );
}
