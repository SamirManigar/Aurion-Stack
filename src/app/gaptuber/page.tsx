import type { Metadata } from "next";
import GapTuberClient from "./GapTuberClient";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "GapTuber — AI YouTube Content Gap Finder for Creators",
  description: "GapTuber finds high-demand, low-competition YouTube video ideas your competitors haven't made yet. Grow your channel faster with data-driven content gap reports.",
  keywords: "YouTube content gap tool, AI video idea generator, find trending YouTube topics, YouTube keyword research, grow YouTube channel, GapTuber",
  alternates: { canonical: "https://aurionstack.dev/gaptuber" },
  openGraph: {
    type: "website",
    url: "https://aurionstack.dev/gaptuber",
    title: "GapTuber — Find YouTube Video Ideas Your Competitors Missed",
    description: "Stop guessing what to film next. GapTuber's AI surfaces high-demand, low-competition video gaps before your competitors find them.",
    siteName: "Aurion Stack",
    images: [{ url: "/aurionstack-logo.webp", width: 512, height: 512, alt: "GapTuber by Aurion Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GapTuber — Find YouTube Video Ideas Your Competitors Missed",
    description: "Stop guessing what to film next. GapTuber's AI surfaces high-demand, low-competition video gaps weekly.",
    images: ["/aurionstack-logo.webp"],
  },
};

const gaptuberSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GapTuber",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://gaptuber.aurionstack.dev",
  description: "AI-powered YouTube content gap finder. Surfaces high-demand, low-competition video ideas in your niche weekly.",
  offers: [
    { "@type": "Offer", name: "Starter", price: "19", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
    { "@type": "Offer", name: "Pro", price: "49", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
  ],
  provider: { "@id": "https://aurionstack.dev/#organization" },
  featureList: ["Content gap analysis", "Trend forecasting", "Keyword research", "Video briefs", "Competitor tracking"],
  screenshot: "https://aurionstack.dev/aurionstack-logo.webp",
};

export default function GapTuberPage() {
  return (
    <>
      <SchemaOrg schemas={[gaptuberSchema]} />
      <GapTuberClient />
    </>
  );
}
