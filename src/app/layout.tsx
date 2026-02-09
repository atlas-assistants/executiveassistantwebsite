import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono, Playfair_Display, Cormorant_Garamond, Space_Grotesk, Outfit, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const fontDisplay = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Concept-2: Light Editorial
const fontEditorial = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Concept-3: Bold Geometric
const fontGeometric = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geometric",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Concept-4: Soft Organic
const fontOrganic = Outfit({
  subsets: ["latin"],
  variable: "--font-organic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Concept-5: Minimalist Luxury
const fontLuxury = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-luxury",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Join Atlas | Where A-Players Become Legendary EAs",
  description: "Not just another EA job. Atlas transforms ambitious professionals into the executive assistants that visionary leaders can't live without. 1% acceptance rate. Unlimited growth.",
  keywords: "executive assistant jobs, remote EA jobs, elite virtual assistant career, Atlas careers, top EA talent",
  openGraph: {
    title: "Join Atlas | Where A-Players Become Legendary EAs",
    description: "Not just another EA job. Atlas transforms ambitious professionals into the executive assistants that visionary leaders can't live without.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} ${fontSerif.variable} ${fontEditorial.variable} ${fontGeometric.variable} ${fontOrganic.variable} ${fontLuxury.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
        <Script src="https://fast.wistia.com/embed/666u8lgta6.js" strategy="lazyOnload" />
        <Script src="https://fast.wistia.com/embed/k5xthojbj8.js" strategy="lazyOnload" />
        <Script src="https://fast.wistia.com/embed/x7n6yvu16s.js" strategy="lazyOnload" />
        <Script src="https://fast.wistia.com/embed/c76asxsg6y.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
