"use client";

import React from "react";
import ProductPageLayout from "@/components/ProductPageLayout";
import { Bot, Zap, MailOpen } from "lucide-react";

const faqs = [
  {
    q: "How does Lead Auto find new leads?",
    a: "Lead Auto connects with multiple data providers to scrape, verify, and enrich prospect data based on your ideal customer profile (ICP). It then funnels them into your outreach sequence automatically.",
  },
  {
    q: "Does it integrate with my existing CRM?",
    a: "Yes, Lead Auto pushes qualified leads directly to HubSpot, Salesforce, GoHighLevel, and other major CRMs through native integrations or webhooks.",
  },
  {
    q: "Will my emails go to spam?",
    a: "Lead Auto utilizes intelligent inbox rotation, domain warming, and guarded delivery infrastructure to ensure maximum deliverability and protect your primary domain reputation.",
  },
];

export default function LeadAutoClient() {
  return (
    <ProductPageLayout
      productName="Lead Auto"
      heroHeadline="Put your lead generation on autopilot."
      heroSubheadline="Streamline your sales pipeline with automated lead capture, intelligent qualification, and personalized multi-channel follow-ups."
      ctaText="Visit Lead Auto"
      ctaLink="https://lead-auto.vercel.app/"
      features={[
        { title: "Smart Discovery", description: "Automatically scrape, enrich, and verify leads matching your exact target criteria.", icon: Zap },
        { title: "AI Qualification", description: "Use AI to qualify leads based on intent signals before they ever reach your sales team.", icon: Bot },
        { title: "Guarded Outreach", description: "Automated sequences with built-in spam protection, inbox rotation, and reply tracking.", icon: MailOpen },
      ]}
      steps={[
        { title: "Define your ICP", description: "Tell Lead Auto who you are looking for by industry, size, or role." },
        { title: "Set your sequence", description: "Create personalized email and message templates for your outreach." },
        { title: "Watch the calendar fill", description: "The system runs 24/7, booking meetings and pushing warm leads to your CRM." },
      ]}
      testimonials={[
        { quote: "It replaced our entire SDR function. We just wake up to 3-5 new booked meetings on our calendar every morning.", author: "K. Reynolds", role: "Agency Founder" },
        { quote: "The domain protection alone is worth it. We used to burn through sending domains, but Lead Auto keeps our deliverability at 95%+.", author: "D. Chang", role: "Sales Director" },
      ]}
      pricing={[
        {
          tier: "Growth",
          price: "$99/mo",
          description: "For small teams scaling up.",
          features: [
            "2,500 Leads/mo",
            "3 Email Accounts",
            "Basic Sequences",
            "CRM Integration",
          ],
        },
        {
          tier: "Scale",
          price: "$249/mo",
          description: "For established sales teams.",
          isPopular: true,
          features: [
            "10,000 Leads/mo",
            "Unlimited Email Accounts",
            "AI Personalization",
            "Advanced Analytics",
          ],
        },
      ]}
      faqs={faqs}
      relatedSolutions={[]}
    />
  );
}
