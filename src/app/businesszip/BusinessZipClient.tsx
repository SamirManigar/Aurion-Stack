"use client";

import React from "react";
import ProductPageLayout from "@/components/ProductPageLayout";
import { BriefcaseBusiness, FileText, Receipt, PieChart } from "lucide-react";

const faqs = [
  {
    q: "Is BusinessZip really free to start?",
    a: "Yes. The Starter plan is permanently free — no credit card required. You get up to 5 invoices per month, 3 document templates, and basic expense logging.",
  },
  {
    q: "Can I send invoices in my own branding?",
    a: "On the Pro plan, yes. Every invoice, proposal, and contract is fully branded with your logo, colours, and business name.",
  },
  {
    q: "Does BusinessZip integrate with accounting software?",
    a: "We support CSV export compatible with QuickBooks and Xero. Native integrations are on the roadmap for Q3 2025.",
  },
  {
    q: "Can clients e-sign documents from BusinessZip?",
    a: "Yes. Send any document for e-signature directly from the dashboard. Clients receive an email and can sign from any device.",
  },
  {
    q: "What happens when a client misses a payment?",
    a: "BusinessZip automatically sends reminders at intervals you configure — 3 days, 7 days, and 14 days overdue. You never have to chase manually.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted at rest and in transit. We use industry-standard security practices and never share your data with third parties.",
  },
];

const relatedSolutions = [
  { label: "Workflow Automation for Service Businesses", href: "/solutions/workflow-automation-for-service-businesses" },
  { label: "Automate Client Onboarding", href: "/solutions/automate-client-onboarding" },
  { label: "SaaS MVP Development Agency", href: "/solutions/saas-mvp-development-agency" },
];

export default function BusinessZipClient() {
  return (
    <ProductPageLayout
      productName="BusinessZip"
      heroHeadline="Stop Doing Admin. Start Running Your Business."
      heroSubheadline="Invoices, contracts, expense tracking — all of it automated in one clean dashboard. BusinessZip handles your entire operations stack so your time goes to work that actually matters."
      ctaText="Open Tool"
      ctaLink="https://businesszip.aurionstack.dev"
      features={[
        { title: "Invoice Generation", description: "Create professional, branded invoices in 30 seconds. Automated reminders chase late payments so you don't have to.", icon: Receipt },
        { title: "Document Automation", description: "Auto-populate proposals, contracts, NDAs, and quotes from a template library. Send for e-signatures in two clicks.", icon: FileText },
        { title: "Central Dashboard", description: "Every client, every project, every outstanding payment — visible from one screen. No spreadsheets involved.", icon: BriefcaseBusiness },
        { title: "Expense Tracking", description: "Log expenses, assign to projects, and categorise automatically. End-of-year accounting becomes a five-minute task.", icon: PieChart },
      ]}
      steps={[
        { title: "Create a free account", description: "No credit card. No commitment. Onboarding takes three minutes and you'll have your first invoice ready in five." },
        { title: "Add your clients and projects", description: "Import from a CSV, connect your calendar, or add manually. The dashboard structures itself around your workflow." },
        { title: "Automate the rest", description: "Set up recurring invoices, payment reminders, and approval workflows once. They run themselves from that point." },
      ]}
      testimonials={[
        { quote: "I used to spend Sunday evenings doing invoices. Now I spend them with my family. BusinessZip is genuinely life-improving.", author: "C. Andersen", role: "Freelance designer" },
        { quote: "The document automation alone is worth the subscription. I generate proposals in under a minute that used to take an hour.", author: "B. Tremblay", role: "Consulting firm owner" },
        { quote: "Clean, fast, and it just works. I recommended it to every freelancer I know.", author: "N. Gupta", role: "Independent developer" },
      ]}
      pricing={[
        {
          tier: "Starter",
          price: "Free",
          description: "Essential tools for freelancers and solo founders.",
          features: [
            "Up to 5 invoices per month",
            "3 document templates",
            "Basic expense logging",
            "Community support",
          ],
        },
        {
          tier: "Pro",
          price: "$29/mo",
          description: "A complete operations suite for growing teams.",
          isPopular: true,
          features: [
            "Unlimited invoices & clients",
            "Custom branding on all documents",
            "Full template library + custom templates",
            "Advanced analytics & reporting",
            "Automated payment reminders",
            "Priority email support",
          ],
        },
      ]}
      faqs={faqs}
      relatedSolutions={relatedSolutions}
    />
  );
}
