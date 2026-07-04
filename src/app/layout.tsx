import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import { ReviewsProvider } from "@/context/ReviewsContext";
import "@/index.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aurionstack.dev"),
  title: {
    default: "AI-Powered SaaS & Automation | Aurion Stack",
    template: "%s | Aurion Stack",
  },
  description: "We build custom AI systems and SaaS products that automate manual work and scale your business.",
  keywords: "AI automation agency, custom AI agents, SaaS development, AI customer support, business automation, AI chatbot, workflow automation",
  authors: [{ name: "Aurion Stack", url: "https://aurionstack.dev" }],
  creator: "Aurion Stack",
  publisher: "Aurion Stack",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: "https://aurionstack.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aurionstack.dev/",
    title: "AI-Powered SaaS & Automation | Aurion Stack",
    description: "We build custom AI systems and SaaS products that automate manual work and scale your business.",
    siteName: "Aurion Stack",
    images: [{ url: "/aurionstack-logo.webp", width: 512, height: 512, alt: "Aurion Stack — AI-Powered SaaS & Automation Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aurionstack",
    creator: "@aurionstack",
    title: "AI-Powered SaaS & Automation | Aurion Stack",
    description: "We build custom AI systems and SaaS products that automate manual work and scale your business.",
    images: ["/aurionstack-logo.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e7490",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/webp" href="/favicon.webp" />
        <link rel="apple-touch-icon" href="/favicon.webp" />
        {/* Font performance */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <ReviewsProvider>{children}</ReviewsProvider>
      </body>
    </html>
  );
}
