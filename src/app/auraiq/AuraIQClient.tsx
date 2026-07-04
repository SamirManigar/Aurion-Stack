"use client";

import React from "react";
import ProductPageLayout from "@/components/ProductPageLayout";
import { Bot, BrainCircuit, Zap, Users } from "lucide-react";

const faqs = [
  {
    q: "How long does AuraIQ take to set up?",
    a: "Most businesses are live within 48 hours. You share your FAQs, SOPs, or website URL and we handle the entire configuration, branding, and deployment.",
  },
  {
    q: "Does AuraIQ work on WhatsApp?",
    a: "Yes. AuraIQ integrates with your website chat widget AND WhatsApp Business — wherever your customers are already messaging.",
  },
  {
    q: "What happens if a customer asks something AuraIQ doesn't know?",
    a: "The agent automatically escalates to a human and forwards the full conversation with context, so your team always has the full picture.",
  },
  {
    q: "Do I need technical knowledge to use AuraIQ?",
    a: "Zero. We handle the entire setup, deployment, and ongoing tuning. Your job is to share your business data — we handle everything else.",
  },
  {
    q: "Can AuraIQ capture leads and send them to my CRM?",
    a: "Yes. AuraIQ captures contact details and buying intent automatically and can push them to your CRM, Google Sheets, or email list in real time.",
  },
  {
    q: "Is there a free trial?",
    a: "We offer a free 30-minute discovery call where we'll show you a live demo of AuraIQ configured for a business similar to yours.",
  },
];

const relatedSolutions = [
  { label: "AI Chatbot for Local Businesses", href: "/solutions/ai-chatbot-for-local-business" },
  { label: "AI Appointment Booking System", href: "/solutions/ai-appointment-booking-system" },
  { label: "Automate Customer Support for E-Commerce", href: "/solutions/automate-customer-support-ecommerce" },
];

export default function AuraIQClient() {
  return (
    <ProductPageLayout
      productName="AuraIQ"
      heroHeadline="24/7 AI Customer Support Agent for Local Businesses."
      heroSubheadline="Handle customer queries, capture leads, and book appointments automatically — trained on your exact business data, deployed in under 48 hours."
      ctaText="Try Demo"
      ctaLink="https://auraiq.aurionstack.dev"
      features={[
        { title: "24/7 Support Agent", description: "Never miss a customer inquiry — day, night, or public holiday. The agent handles it all.", icon: Bot },
        { title: "Custom Knowledge Base", description: "Trained on your specific SOPs, FAQs, product docs, and brand voice. Not a generic bot.", icon: BrainCircuit },
        { title: "Instant Responses", description: "Sub-second replies. No loading spinner. No 'Thanks for your patience' delays.", icon: Zap },
        { title: "Automated Lead Gen", description: "Captures contact details and buying intent automatically — passed straight to your CRM.", icon: Users },
      ]}
      steps={[
        { title: "Upload your business data", description: "Share your FAQs, SOPs, product docs, or website URL. Takes under 10 minutes." },
        { title: "We train and brand your agent", description: "Our team configures the agent's voice, tone, and knowledge base to match your business exactly." },
        { title: "Deploy to your site in 30 minutes", description: "One script tag. Works on any website, WhatsApp, or social inbox. Live within the hour." },
      ]}
      testimonials={[
        { quote: "It handled 300 customer messages in the first week without me touching a single one. Honestly felt like hiring a full-time person.", author: "D. Okafor", role: "Local restaurant owner" },
        { quote: "The setup was shockingly fast. I expected weeks. It was up and running the same afternoon.", author: "R. Mehta", role: "Clinic manager" },
        { quote: "Leads stopped falling through the cracks the moment we turned it on. The ROI was immediate.", author: "L. Santos", role: "Real estate agent" },
      ]}
      pricing={[
        {
          tier: "Starter",
          price: "$149",
          description: "One-time setup for single-location businesses.",
          features: [
            "Custom AI Agent setup",
            "Website chat integration",
            "Core knowledge base (up to 50 FAQs)",
            "Up to 1,000 messages/month",
          ],
        },
        {
          tier: "Premium",
          price: "$249",
          description: "+ $29/month maintenance & tuning",
          isPopular: true,
          features: [
            "Everything in Starter",
            "Advanced knowledge base (docs + URLs + PDFs)",
            "WhatsApp & social media integration",
            "Unlimited messages",
            "Monthly performance tuning session",
            "Priority support",
          ],
        },
      ]}
      faqs={faqs}
      relatedSolutions={relatedSolutions}
    />
  );
}
