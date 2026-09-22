import type { Metadata } from "next";
import RevQRClient from "./RevQRClient";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "RevQR — Smart QR Code Reviews & Feedback Management",
  description: "Boost your reviews with a single scan. RevQR directs happy customers to leave public reviews and captures negative feedback before it goes public.",
  keywords: "QR code reviews, review management, google reviews qr code, get more reviews, capture negative feedback, RevQR",
  alternates: { canonical: "https://www.aurionstack.dev/revqr" },
};

const revqrSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RevQR",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://revqr.tech",
  description: "A smart QR code system that directs happy customers to leave reviews and captures negative feedback before it goes public.",
  provider: { "@id": "https://www.aurionstack.dev/#organization" },
  screenshot: "https://www.aurionstack.dev/aurionstack-logo.webp",
};

export default function RevQRPage() {
  return (
    <>
      <SchemaOrg schemas={[revqrSchema]} />
      <RevQRClient />
    </>
  );
}
