import type { Metadata } from "next";
import AuraIQClient from "./AuraIQClient";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "AuraIQ — AI Customer Support Agent for Local Businesses",
  description: "AuraIQ is a 24/7 AI support agent trained on your business data. Handle customer queries, capture leads, and book appointments automatically — without extra staff.",
  keywords: "AI chatbot for small business, automated customer support, AI agent for local business, 24/7 AI receptionist, lead capture bot, AuraIQ",
  alternates: { canonical: "https://aurionstack.dev/auraiq" },
  openGraph: {
    type: "website",
    url: "https://aurionstack.dev/auraiq",
    title: "AuraIQ — 24/7 AI Customer Support for Local Businesses",
    description: "Stop missing customer queries. AuraIQ answers questions, captures leads, and books appointments around the clock — trained on your exact business data.",
    siteName: "Aurion Stack",
    images: [{ url: "/aurionstack-logo.webp", width: 512, height: 512, alt: "AuraIQ by Aurion Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraIQ — 24/7 AI Customer Support for Local Businesses",
    description: "Stop missing customer queries. AuraIQ answers questions and captures leads 24/7.",
    images: ["/aurionstack-logo.webp"],
  },
};

const auraiqSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AuraIQ",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, WhatsApp, iOS, Android",
  url: "https://auraiq.aurionstack.dev",
  description: "24/7 AI customer support agent trained on your business data. Handle queries, capture leads, and book appointments automatically.",
  offers: [
    { "@type": "Offer", name: "Starter", price: "149", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/OneTimePurchase" } },
    { "@type": "Offer", name: "Premium", price: "249", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/OneTimePurchase" } },
  ],
  provider: { "@id": "https://aurionstack.dev/#organization" },
  featureList: ["24/7 AI support", "Custom knowledge base", "WhatsApp integration", "Lead capture", "CRM integration"],
  screenshot: "https://aurionstack.dev/aurionstack-logo.webp",
};

export default function AuraIQPage() {
  return (
    <>
      <SchemaOrg schemas={[auraiqSchema]} />
      <AuraIQClient />
    </>
  );
}
