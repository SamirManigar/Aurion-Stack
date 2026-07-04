import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI & Automation Solutions by Niche | Aurion Stack",
  description: "Browse our targeted AI and automation solutions built for e-commerce brands, agencies, SaaS founders, and local businesses.",
};

const solutions = [
  {
    category: "E-Commerce",
    color: "hsl(221 83% 53%)",
    items: [
      { slug: "ai-chatbot-for-shopify", label: "AI Chatbot for Shopify Stores", desc: "Answer product Q&A, recover carts, capture leads 24/7." },
      { slug: "automate-customer-support-ecommerce", label: "Automate E-Commerce Support", desc: "Resolve 80% of tickets without a human replying." },
      { slug: "reduce-cart-abandonment-ai", label: "Reduce Cart Abandonment with AI", desc: "Recover 15–25% of lost revenue with behavioral nudges." },
      { slug: "ai-product-recommendation-engine", label: "AI Product Recommendation Engine", desc: "Increase AOV 12–30% with personalized suggestions." },
    ],
  },
  {
    category: "Agency & B2B",
    color: "hsl(154 84% 40%)",
    items: [
      { slug: "ai-lead-generation-for-agencies", label: "AI Lead Generation for Agencies", desc: "8–15 qualified calls/month on autopilot." },
      { slug: "automate-client-onboarding", label: "Automate Client Onboarding", desc: "Cut first-30-day churn by 40–60%." },
      { slug: "workflow-automation-for-service-businesses", label: "Workflow Automation for Services", desc: "Reclaim 15–25 hrs/week per team member." },
      { slug: "ai-content-automation-for-agencies", label: "AI Content Automation for Agencies", desc: "10x output without 10x headcount." },
    ],
  },
  {
    category: "SaaS & Startups",
    color: "hsl(270 70% 60%)",
    items: [
      { slug: "custom-saas-development-for-startups", label: "Custom SaaS Development", desc: "MVP to paying users in 6 weeks." },
      { slug: "ai-powered-dashboard-for-saas", label: "AI Analytics Dashboard", desc: "Surface insights users need — reduce churn 25–45%." },
      { slug: "saas-mvp-development-agency", label: "SaaS MVP Agency", desc: "Production-ready in 6 weeks. Auth + billing included." },
    ],
  },
  {
    category: "Local Business",
    color: "hsl(30 90% 55%)",
    items: [
      { slug: "ai-chatbot-for-local-business", label: "AI Receptionist for Local Business", desc: "Answer queries, book appointments 24/7." },
      { slug: "ai-appointment-booking-system", label: "AI Appointment Booking System", desc: "Save 8–12 hrs/week on scheduling coordination." },
    ],
  },
  {
    category: "Video & Creators",
    color: "hsl(350 80% 55%)",
    items: [
      { slug: "ai-youtube-script-generator", label: "AI YouTube Script Generator", desc: "Script a video in 10 minutes, not 4 hours." },
      { slug: "ai-video-idea-generator-for-youtube", label: "AI YouTube Idea Finder (GapTuber)", desc: "3–5x more views by targeting untapped search gaps." },
    ],
  },
];

export default function SolutionsDirectory() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Nav ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl px-6 py-4">
        <div className="container mx-auto flex items-center justify-between max-w-5xl">
          <Link href="/" className="text-sm font-bold tracking-tight text-foreground">Aurion Stack</Link>
          <a
            href="mailto:aurionstack@gmail.com"
            className="rounded-md bg-foreground px-5 py-2 text-xs font-semibold text-background hover:bg-foreground/90 transition-all"
          >
            Book a Call
          </a>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-12 px-4 border-b border-border bg-grid text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/8 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-widest uppercase text-primary rounded-full bg-primary/10 border border-primary/20">
            15 High-Intent Pages
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading tracking-tight text-foreground text-balance mb-4">
            AI & Automation Solutions Built for Your Niche.
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto text-balance">
            Every page below is a targeted playbook for a specific audience — not generic agency fluff.
          </p>
        </div>
      </section>

      {/* ── Solutions by Category ────────────────────────────────────── */}
      <div className="container mx-auto max-w-5xl px-4 py-16 space-y-16">
        {solutions.map((group) => (
          <div key={group.category}>
            <div className="flex items-center gap-3 mb-8">
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ background: group.color }}
              />
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {group.category}
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/solutions/${item.slug}`}
                  className="group p-5 rounded-xl border border-border bg-card/30 hover:border-white/15 hover:bg-card/60 backdrop-blur-sm transition-all flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-foreground leading-snug">{item.label}</h3>
                    <ArrowRight size={14} className="text-muted-foreground flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-muted/10 py-16 px-4 text-center">
        <h2 className="text-2xl font-heading tracking-tight text-foreground mb-4">
          Don't see your exact use case?
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
          We build custom AI systems for problems not listed here. Book a 30-min call and we'll scope it for you — free.
        </p>
        <a
          href="mailto:aurionstack@gmail.com"
          className="inline-flex items-center gap-2 rounded-md bg-foreground px-8 py-4 text-sm font-semibold text-background hover:bg-foreground/90 hover:scale-[1.02] transition-all shadow-md"
        >
          Book a Free Discovery Call
          <ArrowRight size={15} />
        </a>
      </section>

      <footer className="py-6 border-t border-border bg-background text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Aurion Stack ·{" "}
          <Link href="/" className="hover:text-foreground underline underline-offset-2">Back to Home</Link>
        </p>
      </footer>
    </div>
  );
}
