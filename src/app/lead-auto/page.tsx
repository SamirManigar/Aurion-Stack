import type { Metadata } from "next";
import LeadAutoClient from "./LeadAutoClient";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Lead Auto — Automated Lead Generation & Follow-ups",
  description: "Streamline your sales pipeline with automated lead capture, qualification, and multi-channel follow-ups.",
  keywords: "lead automation, automated lead gen, sales pipeline automation, automated follow-ups, Lead Auto",
  alternates: { canonical: "https://www.aurionstack.dev/lead-auto" },
};

const leadautoSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lead Auto",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://lead-auto.vercel.app/",
  description: "Automated lead generation and follow-ups. Streamline your sales pipeline with automated lead capture, qualification, and multi-channel follow-ups.",
  provider: { "@id": "https://www.aurionstack.dev/#organization" },
  screenshot: "https://www.aurionstack.dev/aurionstack-logo.webp",
};

export default function LeadAutoPage() {
  return (
    <>
      <SchemaOrg schemas={[leadautoSchema]} />
      <LeadAutoClient />
    </>
  );
}
