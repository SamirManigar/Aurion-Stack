import React from "react";
import { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

// ─── HIGH-INTENT SEO HUBS ───────────────────────────────────────────────────
// Every slug maps to a real search query a buyer types into Google.
// Audience: E-commerce founders, agency owners, SaaS operators, service businesses.
const seoHubs = {

  // ── E-COMMERCE NICHE ────────────────────────────────────────────────────
  "ai-chatbot-for-shopify": {
    title: "AI Chatbot for Shopify Stores | Aurion Stack",
    metaDescription: "Add a custom AI chatbot to your Shopify store that answers product questions, recovers carts, and captures leads 24/7 — without extra staff.",
    badge: "E-commerce AI",
    audience: "Shopify Store Owners",
    problem: "Losing sales because customers can't get instant answers after hours?",
    h1: "AI Chatbot for Shopify Stores That Actually Sells.",
    subtitle: "We build a custom AI agent trained on your product catalog, FAQs, and brand voice — deployed to your Shopify store in under 48 hours.",
    outcome: "Stores using our AI chatbot see 20–40% fewer abandoned conversations and consistent lead capture at 3am.",
    features: [
      { title: "Instant Product Q&A", desc: "Answers \"does this come in XL?\", shipping questions, and returns policy — instantly, 24/7." },
      { title: "Cart Recovery Sequences", desc: "AI detects hesitation signals and proactively offers discounts or social proof at the right moment." },
      { title: "Lead Capture on Autopilot", desc: "Captures emails and phone numbers from every visitor — even those who don't buy yet." },
    ],
    cta: "Get Your Shopify Chatbot Built",
  },

  "automate-customer-support-ecommerce": {
    title: "Automate Customer Support for E-Commerce | Aurion Stack",
    metaDescription: "Replace your Zendesk ticket backlog with an AI support system that resolves 80% of inbound queries automatically. Built for DTC brands.",
    badge: "Support Automation",
    audience: "DTC Brand Operators",
    problem: "Spending thousands monthly on support staff just to answer the same 20 questions?",
    h1: "Automate 80% of Your E-Commerce Support Queries.",
    subtitle: "We build AI systems trained on your SOPs and product data that resolve order status queries, returns requests, and FAQs — without a human replying.",
    outcome: "Our clients cut support ticket volume by 70-80% within 30 days of deployment.",
    features: [
      { title: "Order Status Automation", desc: "Integrates with your fulfilment platform to give live shipping updates to customers instantly." },
      { title: "Returns & Refund Handling", desc: "Automatically processes return requests based on your exact policy — no human required." },
      { title: "Escalation Intelligence", desc: "Complex or emotional queries are automatically forwarded to your team with full context logs." },
    ],
    cta: "Automate My Support Stack",
  },

  "reduce-cart-abandonment-ai": {
    title: "Reduce Cart Abandonment with AI | Aurion Stack",
    metaDescription: "Our AI-powered cart recovery system identifies high-intent shoppers and triggers personalised re-engagement before they leave — built for Shopify & WooCommerce.",
    badge: "Revenue Recovery",
    audience: "E-commerce Revenue Teams",
    problem: "The average store loses 70% of shoppers at checkout. Are you recovering any of them?",
    h1: "Stop Losing 70% of Your Shoppers at Checkout.",
    subtitle: "We build intelligent cart abandonment systems that identify hesitation in real-time and trigger personalised actions — a discount, a review, a chatbot nudge — before the user exits.",
    outcome: "Average recovered revenue uplift of 15–25% for stores within the first 60-day window.",
    features: [
      { title: "Behavioural Exit Detection", desc: "Tracks mouse movement and scroll patterns to identify abandonment 3–5 seconds before it happens." },
      { title: "Personalised Nudges", desc: "Triggers context-aware messages: social proof, urgency cues, or a direct offer — based on cart value." },
      { title: "Email & WhatsApp Recovery", desc: "Follows up abandoned carts via email and WhatsApp automatically for 72 hours post-exit." },
    ],
    cta: "Recover My Abandoned Revenue",
  },

  "ai-product-recommendation-engine": {
    title: "AI Product Recommendation Engine for E-Commerce | Aurion Stack",
    metaDescription: "We build custom AI recommendation engines that increase average order value and repeat purchases for e-commerce brands — better than Shopify's native suggestions.",
    badge: "Revenue Intelligence",
    audience: "E-commerce Brand Founders",
    problem: "Shopify's built-in 'you may also like' is leaving AOV money on the table.",
    h1: "An AI Engine That Recommends Exactly What Your Customers Want to Buy Next.",
    subtitle: "We build a custom recommendation layer trained on your actual purchase history, browse behaviour, and inventory — increasing AOV without a single extra ad dollar spent.",
    outcome: "Clients report 12–30% AOV increase within 90 days of deployment.",
    features: [
      { title: "Purchase History Analysis", desc: "Deep learning trained on your real data — not a generic algorithm." },
      { title: "Real-Time Inventory Sync", desc: "Only recommends products that are live, in-stock, and relevant to the buyer." },
      { title: "Upsell Placement Engine", desc: "Strategically injects recommendations at product page, cart, and post-purchase points." },
    ],
    cta: "Build My Recommendation Engine",
  },

  // ── AI AUTOMATION NICHE ────────────────────────────────────────────────
  "ai-lead-generation-for-agencies": {
    title: "AI Lead Generation System for Agencies | Aurion Stack",
    metaDescription: "We build AI-powered lead generation and qualification systems for digital agencies — replacing manual cold outreach with a smart, automated pipeline.",
    badge: "Agency Growth",
    audience: "Digital Agency Owners",
    problem: "Spending 10+ hours a week manually finding, qualifying, and following up with cold leads?",
    h1: "An AI System That Finds, Qualifies, and Books Your Agency Leads.",
    subtitle: "We build automated lead engines that scrape high-intent prospects, qualify them against your ICP, and trigger personalised outreach — on autopilot, 24/7.",
    outcome: "Agency owners using this system add 8–15 qualified discovery calls to their calendar per month without manual prospecting.",
    features: [
      { title: "ICP-Matched Lead Scraping", desc: "Automatically finds businesses matching your exact client profile across LinkedIn and directories." },
      { title: "AI Qualification Engine", desc: "Scores each lead against your criteria and filters out time-wasters before they reach your inbox." },
      { title: "Personalised Outreach Sequences", desc: "Triggers a multi-touch cold email or DM sequence tailored to each prospect's industry and pain." },
    ],
    cta: "Build My Lead Engine",
  },

  "automate-client-onboarding": {
    title: "Automate Client Onboarding for Agencies & SaaS | Aurion Stack",
    metaDescription: "Stop losing clients in the first 30 days. We build automated onboarding systems that deliver a 5-star first impression without burning your team's time.",
    badge: "Retention Systems",
    audience: "SaaS & Agency Operators",
    problem: "Clients churn in the first 30 days because onboarding is slow, manual, and inconsistent.",
    h1: "Automate Your Client Onboarding. Cut First-30-Day Churn.",
    subtitle: "We build a fully automated onboarding pipeline — from welcome sequences to document collection, kickoff scheduling, and progress tracking — without your team lifting a finger.",
    outcome: "Clients report a 40–60% reduction in first-month churn after deploying our onboarding systems.",
    features: [
      { title: "Automated Welcome Sequences", desc: "Personalised email + Slack messages triggered the moment a client signs — no manual work." },
      { title: "Smart Document Collection", desc: "AI-powered intake forms that know when data is missing and follow-up until complete." },
      { title: "Kickoff Scheduler", desc: "Automatically books the kickoff call based on team availability — no Calendly ping-pong." },
    ],
    cta: "Automate My Onboarding",
  },

  "workflow-automation-for-service-businesses": {
    title: "Workflow Automation for Service Businesses | Aurion Stack",
    metaDescription: "We eliminate your team's most repetitive tasks with intelligent automation. Custom-built for consultants, agencies, clinics, and service firms.",
    badge: "Operations",
    audience: "Service Business Owners",
    problem: "Your team spends 30% of their week on tasks a well-configured system could handle in seconds.",
    h1: "Automate the Work That's Burning Your Team's Time.",
    subtitle: "We map your most painful manual processes and build AI-powered workflows to handle them — data entry, reporting, client communications, scheduling, invoicing.",
    outcome: "Our clients reclaim an average of 15–25 hours per week per team member within the first month.",
    features: [
      { title: "Process Audit & Mapping", desc: "We identify and rank your highest-ROI automation opportunities before writing a single line of code." },
      { title: "Custom Integrations", desc: "Connect your CRM, project tools, email, and calendar into a single intelligent system." },
      { title: "AI-Powered Reporting", desc: "Automated weekly insights delivered to your inbox without pulling a single spreadsheet." },
    ],
    cta: "Automate My Operations",
  },

  "ai-content-automation-for-agencies": {
    title: "AI Content Automation for Marketing Agencies | Aurion Stack",
    metaDescription: "We build AI pipelines that generate, format, and publish content at scale — helping agencies deliver faster without expanding headcount.",
    badge: "Content Operations",
    audience: "Marketing Agency Founders",
    problem: "Producing quality content at scale without hiring a team of writers is a bottleneck most agencies never solve.",
    h1: "10x Your Content Output Without 10x'ing Your Team.",
    subtitle: "We build GPT-powered content pipelines that draft, format, and publish blog posts, social content, and email campaigns — trained on your brand voice and client briefs.",
    outcome: "Agencies using our content system go from 4 to 40+ pieces of content per week without adding a single hire.",
    features: [
      { title: "Brand Voice Training", desc: "Fine-tuned on your existing content — outputs feel like humans wrote them." },
      { title: "Brief-to-Publish Pipeline", desc: "Drop in a brief, get a formatted, SEO-optimised article ready for review in minutes." },
      { title: "Multi-Channel Distribution", desc: "One piece of content automatically re-formatted for blog, LinkedIn, email, and short-form." },
    ],
    cta: "Scale My Content Engine",
  },

  // ── SAAS NICHE ─────────────────────────────────────────────────────────
  "custom-saas-development-for-startups": {
    title: "Custom SaaS Development for Startups | Aurion Stack",
    metaDescription: "We build revenue-generating SaaS products from scratch — full-stack architecture, auth, billing, and AI integration — ready to acquire users.",
    badge: "SaaS Build",
    audience: "Startup Founders & Entrepreneurs",
    problem: "You have a SaaS idea but no technical co-founder, and dev agencies are quoting you $150k+.",
    h1: "Your Revenue-Ready SaaS Product. Built in Weeks, Not Years.",
    subtitle: "We engineer full-stack SaaS products from the ground up — auth, subscriptions, AI features, dashboards — for early-stage founders who need to move fast without burning funding.",
    outcome: "We've shipped 24+ production SaaS applications. Our average MVP-to-live timeline is 6–10 weeks.",
    features: [
      { title: "Full-Stack Engineering", desc: "React, Node, and PostgreSQL — scalable from day one, not rebuilt when you hit traction." },
      { title: "Auth & Subscriptions Built-In", desc: "Stripe billing, user management, and role-based access included in every build." },
      { title: "AI Feature Integration", desc: "LLM-powered features — chatbots, recommendations, summaries — baked into your product from launch." },
    ],
    cta: "Build My SaaS",
  },

  "ai-powered-dashboard-for-saas": {
    title: "AI-Powered Analytics Dashboard for SaaS Products | Aurion Stack",
    metaDescription: "We build intelligent analytics dashboards that surface the right insights at the right time — helping your users get value faster and reduce churn.",
    badge: "Product Intelligence",
    audience: "SaaS Product Teams",
    problem: "Your users log in, see a wall of raw data, get confused, and churn before they find their 'aha moment'.",
    h1: "An Analytics Dashboard That Tells Users What to Do Next.",
    subtitle: "We build AI-powered dashboards that surface personalized insights, flag anomalies, and guide users to value — reducing time-to-aha and improving retention.",
    outcome: "SaaS products with guided AI dashboards see 25–45% lower 30-day churn vs. raw-data interfaces.",
    features: [
      { title: "Insight Surfacing Engine", desc: "AI highlights the 3 most important metrics for each user based on their goal — not everything at once." },
      { title: "Anomaly Detection", desc: "Automatically flags unusual drops or spikes before users even notice them." },
      { title: "Natural Language Queries", desc: "Users type questions like 'what drove revenue last week?' and get instant, chart-backed answers." },
    ],
    cta: "Build My AI Dashboard",
  },

  // ── LOCAL BUSINESS & B2B NICHE ─────────────────────────────────────────
  "ai-chatbot-for-local-business": {
    title: "AI Chatbot for Local Businesses | Aurion Stack",
    metaDescription: "We build AI chatbots for local businesses — restaurants, clinics, salons, and agencies — that answer customer queries and book appointments without a receptionist.",
    badge: "Local Business AI",
    audience: "Local Business Owners",
    problem: "Missing customer calls and messages after hours means lost bookings, and your team is handling it manually during the day.",
    h1: "A 24/7 AI Receptionist for Your Local Business.",
    subtitle: "We build a custom AI chatbot for your website that answers questions, books appointments, and captures contact details — around the clock, without staff costs.",
    outcome: "Local businesses using AuraIQ capture 3–5x more after-hours leads compared to relying on voicemail or contact forms.",
    features: [
      { title: "Appointment Booking", desc: "Connects to your calendar and books slots automatically — no back-and-forth." },
      { title: "FAQs on Autopilot", desc: "Trained on your exact services, prices, hours, and location — answers instantly." },
      { title: "WhatsApp & Web Widget", desc: "Lives on your website AND WhatsApp — wherever your customers already message." },
    ],
    cta: "Get My AI Receptionist",
  },

  "ai-appointment-booking-system": {
    title: "AI Appointment Booking System for Service Businesses | Aurion Stack",
    metaDescription: "We build automated appointment booking systems powered by AI — eliminating scheduling back-and-forth for clinics, consultants, and service businesses.",
    badge: "Booking Automation",
    audience: "Clinics, Consultants & Service Firms",
    problem: "Your team wastes hours weekly just coordinating meeting times over email.",
    h1: "Never Waste Time Scheduling a Meeting Again.",
    subtitle: "Our AI booking system qualifies the prospect, checks availability, sends reminders, and reschedules no-shows — fully automated from first contact to confirmed appointment.",
    outcome: "Businesses report saving 8–12 hours per week on scheduling coordination after deployment.",
    features: [
      { title: "AI-Powered Pre-Qualification", desc: "Asks the right questions before booking — so every call is with the right person." },
      { title: "Smart Reminder Sequences", desc: "Automated SMS and email reminders that dramatically reduce no-show rates." },
      { title: "CRM Sync", desc: "Every booking logs automatically to your CRM with notes from the pre-qualification conversation." },
    ],
    cta: "Automate My Bookings",
  },

  // ── VIDEO & CONTENT CREATOR NICHE ─────────────────────────────────────
  "ai-youtube-script-generator": {
    title: "AI YouTube Script Generator for Creators | Aurion Stack",
    metaDescription: "Generate high-retention YouTube scripts from a single topic idea — trained on your niche, your tone, and proven video structures.",
    badge: "Creator Tools",
    audience: "YouTube Creators & Video Agencies",
    problem: "Spending 4+ hours per video script is the hidden bottleneck killing your upload consistency.",
    h1: "Go from Idea to YouTube Script in Under 10 Minutes.",
    subtitle: "Our AI scripting tool (VisioScript) generates structured, retention-optimised YouTube scripts from a single brief — in your voice, for your niche, every time.",
    outcome: "Creators using VisioScript go from 1 video/week to 4 videos/week without burning out.",
    features: [
      { title: "Hook Generator", desc: "Creates 5 hook variations for every topic — tested to maximise click-through rates." },
      { title: "Retention-Paced Structure", desc: "Scripts follow the proven open loop → value → CTA format that keeps viewers to the end." },
      { title: "Niche Training", desc: "Learns your terminology, audience tone, and channel personality over time." },
    ],
    cta: "Try VisioScript Free",
  },

  "ai-video-idea-generator-for-youtube": {
    title: "AI YouTube Video Idea Generator | GapTuber | Aurion Stack",
    metaDescription: "GapTuber finds proven YouTube video ideas your competitors haven't made yet — by analysing real search gap data across your niche.",
    badge: "Content Intelligence",
    audience: "YouTube Creators & Channel Managers",
    problem: "Running out of video ideas (or making videos nobody searches for) is the #1 reason channels plateau.",
    h1: "Find Winning YouTube Video Ideas Your Competitors Missed.",
    subtitle: "GapTuber analyses your niche's search gap — videos people are searching for but no one has made well yet — and delivers ready-to-film ideas directly to your dashboard.",
    outcome: "Channels using GapTuber ideas average 3–5x more views than their baseline content within 30 days.",
    features: [
      { title: "Search Gap Analysis", desc: "Identifies high-volume, low-competition video ideas across your exact niche." },
      { title: "Competitor Intelligence", desc: "Tracks what's performing best across your top 10 competitors — so you can outdo them." },
      { title: "Title & Thumbnail Prompts", desc: "Every idea comes with 3 title options and a thumbnail concept, ready to brief your designer." },
    ],
    cta: "Discover My Gap Ideas",
  },

  "saas-mvp-development-agency": {
    title: "SaaS MVP Development Agency | Launch in 6 Weeks | Aurion Stack",
    metaDescription: "We build production-ready SaaS MVPs fast. From idea to live product in 6 weeks — full auth, billing, and AI integrations included.",
    badge: "Fast Launch",
    audience: "Founders & Entrepreneurs",
    problem: "You've been 'building' for 6 months and still don't have something users can pay for.",
    h1: "From Idea to Paying Customers in 6 Weeks.",
    subtitle: "We've shipped 24+ production SaaS products. We cut scope ruthlessly, build fast, and deploy what actually drives revenue — so you start learning from real users, not specs.",
    outcome: "Our fastest client went from signed contract to first paying user in 5 weeks and 3 days.",
    features: [
      { title: "Ruthless Scope Management", desc: "We challenge every feature — if it doesn't drive revenue, it's cut from v1." },
      { title: "Daily Progress Updates", desc: "Async Loom updates every day so you're never in the dark." },
      { title: "Launch + Iterate Support", desc: "We stay on for 30 days post-launch to fix feedback fast — no disappearing after handoff." },
    ],
    cta: "Start My MVP",
  },
};

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = seoHubs[slug as keyof typeof seoHubs];

  if (!data) {
    return { title: "Solution Not Found | Aurion Stack" };
  }

  return {
    title: data.title,
    description: data.metaDescription,
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url: `https://aurionstack.dev/solutions/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(seoHubs).map((slug) => ({ slug }));
}

export default async function SeoSolutionPage({ params }: Params) {
  const { slug } = await params;
  const data = seoHubs[slug as keyof typeof seoHubs];

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Solution Not Found</h1>
        <p className="text-muted-foreground mb-8">We don't have a page for that slug yet.</p>
        <Link href="/solutions" className="underline text-primary">Browse All Solutions →</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Nav Bar ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl px-6 py-4">
        <div className="container mx-auto flex items-center justify-between max-w-5xl">
          <Link href="/" className="text-sm font-bold tracking-tight text-foreground">
            Aurion Stack
          </Link>
          <a
            href="mailto:aurionstack@gmail.com"
            className="rounded-md bg-foreground px-5 py-2 text-xs font-semibold text-background transition-all hover:bg-foreground/90"
          >
            {data.cta}
          </a>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 px-4 text-center overflow-hidden border-b border-border bg-grid">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/8 blur-[120px]" />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Audience + badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-primary uppercase rounded-full bg-primary/10 border border-primary/20">
              {data.badge}
            </span>
            <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase rounded-full border border-border">
              Built for: {data.audience}
            </span>
          </div>

          {/* Problem hook */}
          <p className="text-sm text-muted-foreground italic mb-5 max-w-lg mx-auto">
            "{data.problem}"
          </p>

          {/* H1 */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-normal tracking-tight text-foreground text-balance mb-6 leading-[1.08]">
            {data.h1}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed mb-10">
            {data.subtitle}
          </p>

          {/* Primary CTA */}
          <a
            href="mailto:aurionstack@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-semibold rounded-md hover:bg-foreground/90 hover:scale-[1.02] transition-all shadow-lg text-sm"
          >
            {data.cta}
            <ArrowRight size={16} />
          </a>

          {/* Trust line */}
          <p className="mt-4 text-xs text-muted-foreground/60">
            Free discovery call · No commitment · Response within 24h
          </p>
        </div>
      </section>

      {/* ── Outcome band ──────────────────────────────────────────────── */}
      <div className="border-b border-border bg-muted/10 py-6 px-4">
        <p className="text-center text-sm font-medium text-foreground max-w-2xl mx-auto">
          📈 {data.outcome}
        </p>
      </div>

      {/* ── Features ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-heading font-normal tracking-tight text-foreground text-center mb-12">
            What's included.
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {data.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border bg-card/40 backdrop-blur-sm hover:border-white/15 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Check size={15} className="text-primary flex-shrink-0" />
                  <h3 className="text-sm font-bold text-foreground">{feat.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hard CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-heading font-normal tracking-tight text-foreground mb-4">
            Ready to build this for your business?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-balance text-sm leading-relaxed">
            Book a free 30-minute discovery call. We'll map the exact solution to your workflow and give you a fixed quote — no hourly surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:aurionstack@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-8 py-4 text-sm font-semibold text-background transition-all hover:bg-foreground/90 hover:scale-[1.02] shadow-md"
            >
              {data.cta}
              <ArrowRight size={16} />
            </a>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center rounded-md border border-border px-8 py-4 text-sm font-medium text-foreground hover:bg-muted transition-all"
            >
              Browse All Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="py-6 border-t border-border bg-background text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Aurion Stack · Remote-first · Shipping globally ·{" "}
          <Link href="/" className="hover:text-foreground transition-colors underline underline-offset-2">
            Back to Home
          </Link>
        </p>
      </footer>
    </div>
  );
}
