import type { Metadata } from "next";
import GapTuberClient from "./GapTuberClient";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "GapTuber — YouTube Video Idea Generator AI & Content Gap Finder",
  description: "Stop guessing what to film. GapTuber is an AI YouTube video idea generator that finds high-demand, low-competition content gaps your competitors missed.",
  keywords: "YouTube content gap tool, AI video idea generator, find trending YouTube topics, YouTube keyword research, grow YouTube channel, GapTuber, youtube video idea generator ai, youtube video ideas ai",
  alternates: { canonical: "https://www.aurionstack.dev/gaptuber" },
  openGraph: {
    type: "website",
    url: "https://www.aurionstack.dev/gaptuber",
    title: "GapTuber — YouTube Video Idea Generator AI & Content Gap Finder",
    description: "Stop guessing what to film. GapTuber is an AI YouTube video idea generator that finds high-demand, low-competition content gaps your competitors missed.",
    siteName: "Aurion Stack",
    images: [{ url: "/aurionstack-logo.webp", width: 1200, height: 630, alt: "GapTuber by Aurion Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GapTuber — YouTube Video Idea Generator AI & Content Gap Finder",
    description: "Stop guessing what to film. GapTuber is an AI YouTube video idea generator that finds high-demand, low-competition content gaps your competitors missed.",
    images: ["/aurionstack-logo.webp"],
    site: "@aurionstack",
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
  provider: { "@id": "https://www.aurionstack.dev/#organization" },
  featureList: ["Content gap analysis", "Trend forecasting", "Keyword research", "Video briefs", "Competitor tracking"],
  screenshot: "https://www.aurionstack.dev/aurionstack-logo.webp",
};

export default function GapTuberPage() {
  return (
    <>
      <SchemaOrg schemas={[gaptuberSchema]} />
      <GapTuberClient />
    </>
  );
}
