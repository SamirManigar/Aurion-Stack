import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Transparent Pricing for AI & SaaS Development | Aurion Stack",
  description: "From $149 quick-start to custom AI builds. No bloated retainers. See exactly what you get for MVP development, AI automation, and web app packages.",
  alternates: { canonical: "https://www.aurionstack.dev/pricing" },
  openGraph: {
    type: "website",
    url: "https://www.aurionstack.dev/pricing",
    title: "Transparent Pricing for AI & SaaS Development | Aurion Stack",
    description: "From $149 quick-start to custom AI builds. No bloated retainers. See exactly what you get for MVP development, AI automation, and web app packages.",
    siteName: "Aurion Stack",
    images: [{ url: "/aurionstack-logo.webp", width: 1200, height: 630, alt: "Aurion Stack Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparent Pricing for AI & SaaS Development | Aurion Stack",
    description: "From $149 quick-start to custom AI builds. No bloated retainers.",
    images: ["/aurionstack-logo.webp"],
    site: "@aurionstack",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
