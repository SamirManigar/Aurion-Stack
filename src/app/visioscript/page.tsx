import type { Metadata } from "next";
import VisioscriptClient from "./VisioscriptClient";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "VisioScript — AI Video Script Generator & Auto-Editing Tool",
  description: "VisioScript turns a topic idea into a fully voiced, captioned, and edited video automatically. The fastest way to scale video content without a production team.",
  keywords: "AI video script generator, automated video production, AI voiceover tool, auto caption generator, faceless YouTube channel tool, VisioScript",
  alternates: { canonical: "https://aurionstack.dev/visioscript" },
  openGraph: {
    type: "website",
    url: "https://aurionstack.dev/visioscript",
    title: "VisioScript — Script to Screen, Automatically.",
    description: "Write a topic. Get a fully voiced, captioned, edited video. VisioScript handles the entire production pipeline — no editing suite required.",
    siteName: "Aurion Stack",
    images: [{ url: "/aurionstack-logo.webp", width: 512, height: 512, alt: "VisioScript by Aurion Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VisioScript — Script to Screen, Automatically.",
    description: "Write a topic. Get a fully produced video. AI scripting, voiceover, captions, and editing — all on autopilot.",
    images: ["/aurionstack-logo.webp"],
  },
};

const visioscriptSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VisioScript",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  url: "https://visioscript.aurionstack.dev",
  description: "AI video script generator and auto-editing studio. Turns any topic into a voiced, captioned, edited video automatically.",
  offers: [
    { "@type": "Offer", name: "Starter", price: "39", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
    { "@type": "Offer", name: "Pro", price: "99", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
  ],
  provider: { "@id": "https://aurionstack.dev/#organization" },
  featureList: ["AI scriptwriting", "AI voiceover", "Auto caption sync", "4K export", "B-roll matching", "Multi-platform export"],
  screenshot: "https://aurionstack.dev/aurionstack-logo.webp",
};

export default function VisioscriptPage() {
  return (
    <>
      <SchemaOrg schemas={[visioscriptSchema]} />
      <VisioscriptClient />
    </>
  );
}
