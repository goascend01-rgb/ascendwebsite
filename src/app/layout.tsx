import type { Metadata } from "next";
import { Sora, Space_Mono } from "next/font/google";
import "./globals.css";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { SITE } from "@/lib/site";

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

const TAGLINE = "The AI operator for independent practices";

const DESCRIPTION =
  "Ascend answers every enquiry across chat, SMS, WhatsApp, Instagram and Messenger, refills the chair a cancellation empties, and brings back the patients who quietly stopped coming. Assisted by default: nothing reaches a patient until you approve it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${TAGLINE}`,
    template: `%s · ${SITE.name}`,
  },
  description: DESCRIPTION,
  /* Target the buyer's problem, never a vertical. A vertical may appear only
     inside an inclusive enumeration in body copy. */
  keywords: [
    "AI operator for independent practices",
    "patient reactivation software",
    "practice front desk automation",
    "fill cancelled appointments automatically",
    "AI receptionist for web chat and WhatsApp",
    "patient recall and win back",
    "practice management operating system",
    "review requests and reputation for practices",
  ],
  authors: [{ name: SITE.name }],
  /* Defaults only. Every route overrides these through `pageMetadata`, which
     derives the social card and og:url from that route's own canonical, so a
     link preview can no longer show the homepage for every page. */
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} · ${TAGLINE}`,
    description: DESCRIPTION,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · ${TAGLINE}`,
    description: DESCRIPTION,
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
        {/* Scroll reveals are rendered hidden and animated in by script, so
            without script the page would be a blank canvas below the fold.
            The same class of failure as a metric that renders zero: the
            honest content has to be the fallback. */}
        <noscript>
          <style>{`
            [style*="opacity:0"],
            [style*="opacity: 0"] {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[70] focus-visible:rounded-sm focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2 focus-visible:font-mono focus-visible:text-sm focus-visible:text-on-accent"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Atmosphere />
          <ScrollProgress />
          <Navbar />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
