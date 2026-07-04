import type { Metadata } from "next";
import BusinessZipClient from "./BusinessZipClient";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "BusinessZip — Business Admin Automation for Freelancers & Agencies",
  description: "BusinessZip automates invoicing, contracts, expense tracking, and client management in one clean dashboard. Reclaim hours every week and get paid faster.",
  keywords: "invoice automation software, freelancer billing tool, contract automation, expense tracker for freelancers, business admin software, BusinessZip",
  alternates: { canonical: "https://aurionstack.dev/businesszip" },
  openGraph: {
    type: "website",
    url: "https://aurionstack.dev/businesszip",
    title: "BusinessZip — Stop Doing Admin. Start Running Your Business.",
    description: "Invoices, contracts, and expenses — automated in one clean dashboard. BusinessZip handles your entire operations stack.",
    siteName: "Aurion Stack",
    images: [{ url: "/aurionstack-logo.webp", width: 512, height: 512, alt: "BusinessZip by Aurion Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BusinessZip — Stop Doing Admin. Start Running Your Business.",
    description: "Automate invoicing, contracts, and expenses in one dashboard. Built for freelancers and small agencies.",
    images: ["/aurionstack-logo.webp"],
  },
};

const businesszipSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BusinessZip",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://businesszip.aurionstack.dev",
  description: "Business admin automation for freelancers and agencies. Invoicing, contracts, expenses, and client management in one dashboard.",
  offers: [
    { "@type": "Offer", name: "Starter", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "Pro", price: "29", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
  ],
  provider: { "@id": "https://aurionstack.dev/#organization" },
  featureList: ["Invoice generation", "Document automation", "E-signatures", "Expense tracking", "Client dashboard"],
  screenshot: "https://aurionstack.dev/aurionstack-logo.webp",
};

export default function BusinessZipPage() {
  return (
    <>
      <SchemaOrg schemas={[businesszipSchema]} />
      <BusinessZipClient />
    </>
  );
}
