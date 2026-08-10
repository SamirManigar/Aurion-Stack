import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "AI Web App & Automation Services | Aurion Stack",
  description: "Custom web apps, AI automation, and SaaS MVPs shipped in 6 weeks. We replace bloated tech teams with lean, AI-powered systems that reduce costs and scale revenue.",
  alternates: { canonical: "https://www.aurionstack.dev/services" },
  openGraph: {
    type: "website",
    url: "https://www.aurionstack.dev/services",
    title: "AI Web App & Automation Services | Aurion Stack",
    description: "Custom web apps, AI automation, and SaaS MVPs shipped in 6 weeks. We replace bloated tech teams with lean, AI-powered systems that reduce costs and scale revenue.",
    siteName: "Aurion Stack",
    images: [{ url: "/aurionstack-logo.webp", width: 1200, height: 630, alt: "Aurion Stack Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Web App & Automation Services | Aurion Stack",
    description: "Custom web apps, AI automation, and SaaS MVPs shipped in 6 weeks.",
    images: ["/aurionstack-logo.webp"],
    site: "@aurionstack",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
