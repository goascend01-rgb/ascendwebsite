import type { Metadata } from "next";
import { Sora, Space_Mono } from "next/font/google";
import "./globals.css";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE = {
  name: "Ascend",
  url: "https://goascend.co",
  tagline: "Remote healthcare staffing & practice automation",
  description:
    "Ascend places pre-trained, bilingual remote talent in dental & medical practices — reception, billing, insurance, coding and scribes — and automates the rest with AI. Cut staffing costs up to 50%. Pay only after you hire.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "remote dental staff",
    "medical virtual assistant",
    "dental receptionist outsourcing",
    "medical billing outsourcing",
    "insurance claims processing",
    "medical scribe",
    "AI receptionist",
    "practice automation",
    "healthcare staffing",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-fg">
        <Atmosphere />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
