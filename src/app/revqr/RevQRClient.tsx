"use client";

import React from "react";
import ProductPageLayout from "@/components/ProductPageLayout";
import { Star, MessageSquareWarning, BarChart } from "lucide-react";
import RevQRIcon from "@/components/icons/RevQRIcon";

const faqs = [
  {
    q: "How does the negative feedback filter work?",
    a: "When a customer scans your RevQR code, they are asked to rate their experience. If they select 4 or 5 stars, they are routed directly to your Google/Yelp review page. If they select 1-3 stars, they are routed to a private feedback form that emails you directly, giving you a chance to make it right before they post publicly.",
  },
  {
    q: "Do I need technical skills to set this up?",
    a: "Not at all. You simply enter your Google Business link, and we generate the smart QR code. You can print it on receipts, tables, or business cards immediately.",
  },
  {
    q: "Can I customize the QR code?",
    a: "Yes, you can add your logo, brand colors, and choose different call-to-action designs for the physical printouts.",
  },
];

export default function RevQRClient() {
  return (
    <ProductPageLayout
      productName="RevQR"
      heroHeadline="Boost your reviews with a single scan."
      heroSubheadline="A smart QR code system that directs happy customers to leave 5-star reviews and captures negative feedback privately before it hurts your reputation."
      ctaText="Visit RevQR.tech"
      ctaLink="https://revqr.tech"
      features={[
        { title: "Smart Routing", description: "Happy customers go to Google. Unhappy customers go to a private feedback form.", icon: Star },
        { title: "Damage Control", description: "Catch service issues and disgruntled customers before they leave a permanent mark on your public profile.", icon: MessageSquareWarning },
        { title: "Analytics Dashboard", description: "Track how many scans you get, your conversion rate to reviews, and read private feedback in one place.", icon: BarChart },
      ]}
      steps={[
        { title: "Create your code", description: "Enter your Google Business profile link and customize your QR design." },
        { title: "Print and display", description: "Put the QR code on receipts, menus, front desks, or business cards." },
        { title: "Watch reviews grow", description: "Customers scan, rate, and review in seconds directly from their smartphones." },
      ]}
      testimonials={[
        { quote: "We doubled our Google reviews in 3 months just by putting these on our tables. The negative feedback filter is a lifesaver.", author: "S. Martinez", role: "Restaurant Owner" },
        { quote: "Such a simple concept but executed perfectly. We catch at least 2 bad reviews a week and turn them into happy returning customers.", author: "J. Davies", role: "Clinic Manager" },
      ]}
      pricing={[
        {
          tier: "Starter",
          price: "$15/mo",
          description: "Perfect for single locations.",
          features: [
            "1 Active QR Code",
            "Smart Review Routing",
            "Basic Analytics",
            "Email Support",
          ],
        },
        {
          tier: "Multi-Location",
          price: "$49/mo",
          description: "For franchises and chains.",
          isPopular: true,
          features: [
            "Up to 10 Active QR Codes",
            "Location-based Analytics",
            "Custom Branding",
            "Priority Support",
          ],
        },
      ]}
      faqs={faqs}
      relatedSolutions={[]}
    />
  );
}
