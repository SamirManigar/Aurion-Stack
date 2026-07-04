"use client";

import React from "react";
import ProductPageLayout from "@/components/ProductPageLayout";
import { TrendingUp, Search, Target } from "lucide-react";
import GapTuberIcon from "@/components/icons/GapTuberIcon";

const faqs = [
  {
    q: "How is GapTuber different from TubeBuddy or VidIQ?",
    a: "TubeBuddy and VidIQ show you what's already performing. GapTuber finds the gaps — topics with high search demand that no one has made a great video about yet. It's the difference between chasing trends and owning them.",
  },
  {
    q: "Do I need to connect my YouTube channel?",
    a: "Connecting your channel is optional but recommended. It lets GapTuber tailor gap analysis to your existing niche and avoid suggesting ideas you've already covered.",
  },
  {
    q: "How often are gap ideas refreshed?",
    a: "New gap reports are delivered every Monday. The Pro plan also includes early trend alerts when a gap starts showing rising search momentum.",
  },
  {
    q: "What kinds of channels does GapTuber work best for?",
    a: "GapTuber works for any content-driven niche: tech, finance, health, travel, gaming, business, education — any space where YouTube search is a primary discovery mechanism.",
  },
  {
    q: "Can I use GapTuber for multiple channels?",
    a: "Yes. The Pro plan supports multiple channel profiles so you can run gap analysis across different niches simultaneously.",
  },
  {
    q: "Do I get a full video brief or just a keyword?",
    a: "Every idea on the Pro plan includes a full brief: title options, suggested hook angles, thumbnail direction, and estimated search volume range.",
  },
];

const relatedSolutions = [
  { label: "AI YouTube Script Generator", href: "/solutions/ai-youtube-script-generator" },
  { label: "AI YouTube Idea Generator", href: "/solutions/ai-video-idea-generator-for-youtube" },
  { label: "AI Content Automation for Agencies", href: "/solutions/ai-content-automation-for-agencies" },
];

export default function GapTuberClient() {
  return (
    <ProductPageLayout
      productName="GapTuber"
      heroHeadline="Find Winning YouTube Video Ideas Before Your Competitors Do."
      heroSubheadline="Stop guessing what to film. AI-driven gap analysis surfaces high-demand, low-competition video ideas in your niche — delivered to your dashboard every week."
      ctaText="Try Now"
      ctaLink="https://gaptuber.aurionstack.dev"
      features={[
        { title: "Gap Analysis Engine", description: "Spots topics your audience is actively searching for that competitors have completely ignored.", icon: GapTuberIcon },
        { title: "Trend Forecasting", description: "Identifies rising search curves before they peak — publish while everyone else is still catching up.", icon: TrendingUp },
        { title: "Smart Keyword Search", description: "Surfaces exact phrases real people type into YouTube's search bar, ranked by volume and competition.", icon: Search },
        { title: "Actionable Briefs", description: "Not just keywords — structured video briefs with angles, hooks, and thumbnail direction.", icon: Target },
      ]}
      steps={[
        { title: "Connect your YouTube channel", description: "One-click OAuth. We read your existing content to understand your niche and what's already been covered." },
        { title: "AI scans your niche and competitors", description: "The engine maps demand vs. supply across your entire topic space and identifies the whitespace." },
        { title: "Get ranked content ideas weekly", description: "A curated list of high-confidence video briefs lands in your dashboard every Monday morning." },
      ]}
      testimonials={[
        { quote: "My last three videos all hit 50k+ views. Every single one started as a GapTuber idea. I don't make content any other way now.", author: "T. Nakamura", role: "Tech YouTuber, 120k subs" },
        { quote: "Finally a tool that tells you what to make, not just what's already performing. The gap framing is the whole insight.", author: "A. Williams", role: "Finance content creator" },
        { quote: "Paid for itself with one sponsored video. The brief quality is surprisingly thorough.", author: "M. Bautista", role: "Travel vlogger" },
      ]}
      pricing={[
        {
          tier: "Starter",
          price: "$19/mo",
          description: "For creators finding their footing.",
          features: [
            "Up to 50 gap analyses per month",
            "Basic keyword tracking",
            "Standard content ideas",
            "Email support",
          ],
        },
        {
          tier: "Pro",
          price: "$49/mo",
          description: "For serious creators scaling their channel.",
          isPopular: true,
          features: [
            "Unlimited gap analyses",
            "Advanced keyword & competitor tracking",
            "Full video briefs with hooks & angles",
            "Early trend alerts",
            "Priority support",
          ],
        },
      ]}
      faqs={faqs}
      relatedSolutions={relatedSolutions}
    />
  );
}
