import type { Metadata, Viewport } from "next";
import { Anton, JetBrains_Mono, Plus_Jakarta_Sans, Yellowtail } from "next/font/google";
import "./globals.css";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const script = Yellowtail({ weight: "400", subsets: ["latin"], variable: "--font-script", display: "swap" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Vishal Fulsundar | Portfolio VI",
  description:
    "A sunset-and-neon portfolio for Vishal Fulsundar, AI Systems & Data Science Engineer. Every project is a mission. A fan-made homage, not affiliated with Rockstar Games or Take-Two.",
  openGraph: {
    title: "Vishal Fulsundar | Portfolio VI",
    description: "Forward Deployed & ML Engineer. 35 projects, each one a mission.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0718",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-night font-sans text-white antialiased">{children}</body>
    </html>
  );
}
