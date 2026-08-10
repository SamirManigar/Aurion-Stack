import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import { ReviewsProvider } from "@/context/ReviewsContext";
import "@/index.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aurionstack.dev"),
  title: {
    default: "Aurion Stack | SaaS MVP Development Agency & Custom AI Solutions",
    template: "%s | Aurion Stack",
  },
  description: "We are a premier SaaS MVP development agency and AI web design team. We build custom AI systems, web apps, and automation tools to scale your business fast.",
  keywords: "SaaS startup MVP agency, AI web designers, custom web app development, mobile app development, AI automation agency, custom AI agents, SaaS development, AI customer support, business automation, AI chatbot, workflow automation",
  authors: [{ name: "Aurion Stack", url: "https://www.aurionstack.dev" }],
  creator: "Aurion Stack",
  publisher: "Aurion Stack",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: "https://www.aurionstack.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.aurionstack.dev/",
    title: "Aurion Stack | SaaS MVP Development Agency & Custom AI Solutions",
    description: "We are a premier SaaS MVP development agency and AI web design team. We build custom AI systems, web apps, and automation tools to scale your business fast.",
    siteName: "Aurion Stack",
    images: [{ url: "/aurionstack-logo.webp", width: 1200, height: 630, alt: "Aurion Stack — AI-Powered SaaS & Automation Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aurionstack",
    creator: "@aurionstack",
    title: "Aurion Stack | SaaS MVP Development Agency & Custom AI Solutions",
    description: "We are a premier SaaS MVP development agency and AI web design team. We build custom AI systems, web apps, and automation tools to scale your business fast.",
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
