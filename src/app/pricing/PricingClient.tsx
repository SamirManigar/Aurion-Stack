"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Info,
  Globe,
  MessageSquare,
  Search,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Database,
  Building2,
  Package,
  Wrench,
} from "lucide-react";
import { PACKAGES, AI_ADDON, CurrencyToggle, type Currency } from "@/components/PricingSection";

// ─── DETAILED FEATURE GROUPS ─────────────────────────────────────────────────

const TIER_DETAILS = [
  {
    tier: 1,
    groups: [
      {
        icon: Globe,
        label: "Pages & Structure",
        items: [
          "1–2 pages: single scrolling page or Home + Contact split",
          "Sections: Hero, About, Services/Offerings, Testimonials, Contact",
          "Fully responsive — mobile-first, tested from 375 px to 1920 px",
        ],
      },
      {
        icon: Search,
        label: "SEO & Performance",
        items: [
          "Meta titles, descriptions & Open Graph tags for social sharing",
          "sitemap.xml and robots.txt auto-generated",
          "Image compression + lazy loading on all assets",
          "Core Web Vitals pass — LCP, CLS & INP optimised",
          "Alt-text on all images for accessibility & SEO",
        ],
      },
      {
        icon: MessageSquare,
        label: "Contact & Lead Capture",
        items: [
          "Contact form routed to client email or Google Sheets (client's choice)",
          "Basic spam protection via honeypot field",
        ],
      },
      {
        icon: Smartphone,
        label: "WhatsApp Automation",
        items: [
          "Floating click-to-WhatsApp widget on every page",
          "Pre-filled custom message (e.g. 'Hi, I'm interested in booking...')",
          "Deep-links directly to the business's WhatsApp — no app install required for the client",
        ],
      },
      {
        icon: BarChart3,
        label: "Analytics",
        items: [
          "Google Analytics or Plausible setup, connected & verified before handover",
        ],
      },
      {
        icon: ShieldCheck,
        label: "Scope Limits",
        items: [
          "1 revision round — content/design tweaks within original scope only",
          "Delivery: 3–5 business days",
          "Excludes: domain registration, hosting costs, ongoing content updates",
        ],
      },
    ],
  },
  {
    tier: 2,
    groups: [
      {
        icon: Globe,
        label: "Pages & Structure",
        items: [
          "Everything in Tier 1",
          "3–5 pages: Home, About, Services/Listings, Gallery (if relevant), Contact",
          "Dynamic listing templates — service cards, property listings, menu items — editable by client via CMS",
        ],
      },
      {
        icon: Database,
        label: "CMS Integration",
        items: [
          "Sanity headless CMS (or equivalent) — client edits content without touching code",
          "Structured content types matched to the client's actual business (services, listings, team, etc.)",
        ],
      },
      {
        icon: Search,
        label: "SEO — Expanded",
        items: [
          "Everything in Tier 1",
          "Schema markup — LocalBusiness or Service schema matched to industry",
          "Google Search Console setup + sitemap submission",
        ],
      },
      {
        icon: Building2,
        label: "Google Business Profile",
        items: [
          "NAP (Name / Address / Phone) consistency audit",
          "Category & photo optimisation guidance",
          "Review-request message template for the client to send customers",
        ],
      },
      {
        icon: MessageSquare,
        label: "WhatsApp Automation — Upgraded",
        items: [
          "One-way lead alert: webhook fires the instant a form is submitted",
          "Owner receives a WhatsApp message with the lead's details immediately",
          "No dashboard login required — it just arrives on WhatsApp",
        ],
      },
      {
        icon: ShieldCheck,
        label: "Scope Limits",
        items: [
          "2 revision rounds",
          "Delivery: 7–10 business days",
          "Excludes: domain, hosting, WhatsApp Business API conversation fees",
        ],
      },
    ],
  },
  {
    tier: 3,
    groups: [
      {
        icon: ShieldCheck,
        label: "Authentication & Access",
        items: [
          "Email/password or magic-link login",
          "Role-based access control — admin vs. customer views",
          "Password reset flow included",
        ],
      },
      {
        icon: Database,
        label: "Backend & Data",
        items: [
          "Structured PostgreSQL schema designed around the client's actual workflow",
          "Next.js / React frontend + Supabase (PostgreSQL, Auth, Storage)",
          "Admin dashboard: view/manage all records with filtering & search",
          "Customer portal: logged-in users see their own bookings / orders / history",
        ],
      },
      {
        icon: Smartphone,
        label: "Installable PWA Layer",
        items: [
          "Web app manifest — installs to home screen on Android & iOS without an app store",
          "Service worker for offline access to key pages (relevant for low-connectivity areas)",
          "Web push notifications — no Play Store or App Store dependency",
          "App-like navigation — no browser chrome once installed",
        ],
      },
      {
        icon: MessageSquare,
        label: "WhatsApp Automation",
        items: [
          "Optional AI WhatsApp Assistant add-on (see below) — not included by default",
        ],
      },
      {
        icon: ShieldCheck,
        label: "Scope Limits",
        items: [
          "2 structural revision rounds — schema or flow changes, not full rebuilds",
          "Delivery: 3–4 weeks",
          "Payment gateway (Razorpay / Stripe) scoped separately if needed — confirm before assuming it's included",
          "Excludes: domain, hosting, database hosting beyond Supabase free tier limits",
        ],
      },
    ],
  },
];

const UNIVERSAL_DELIVERABLES = [
  { emoji: "📦", label: "Full source code handover" },
  { emoji: "📋", label: "Setup & handover documentation" },
  { emoji: "📞", label: "One live walkthrough call before final delivery" },
  { emoji: "🛡️", label: "14 days complimentary post-launch bug support" },
  { emoji: "🔧", label: "Optional ongoing maintenance retainer available" },
];

const CRITICAL_TERMS = [
  {
    icon: AlertTriangle,
    title: "Infrastructure & Hosting Costs",
    body: "The listed prices cover development and engineering only. Third-party recurring fees — such as domain registration, production cloud hosting, and Meta WhatsApp Business API conversation costs — must be billed directly to the client's own payment card. These are never absorbed into the project fee.",
    severity: "warning" as const,
  },
  {
    icon: Smartphone,
    title: "Android Play Store Policy",
    body: "Due to strict Google Developer requirements, the client is 100% responsible for sourcing the 20 real human testers required for the mandatory 14-day closed beta test, and for paying the one-time Google Play Console fee. Aurion Stack will manage the technical upload and compliance paperwork. Native Android apps are available under the Custom / Enterprise tier only.",
    severity: "info" as const,
  },
  {
    icon: ShieldCheck,
    title: "Post-Launch Support",
    body: "Every package includes 14 days of complimentary post-launch bug support. After this window, ongoing maintenance, server monitoring, and layout adjustments are available via an optional monthly maintenance retainer.",
    severity: "neutral" as const,
  },
];

// ─── MAINTENANCE PLANS ───────────────────────────────────────────────────────

const MAINTENANCE_PLANS = [
  {
    name: "Essential Maintenance",
    inrPrice: "₹2,500",
    usdPrice: "$49",
    period: "/month",
    items: [
      "Dependency & security patch monitoring",
      "Monthly uptime & performance check",
      "SSL certificate renewal management",
      "Up to 1 hour of content or copy updates",
    ],
  },
  {
    name: "Growth Retainer",
    inrPrice: "₹7,500",
    usdPrice: "$149",
    period: "/month",
    items: [
      "Everything in Essential Maintenance",
      "Up to 4 hours of feature additions or layout changes",
      "Monthly analytics review & recommendations",
      "Priority response within 24 hours",
    ],
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const PricingDashboard = () => {
  const router = useRouter();
  const [currency, setCurrency] = useState<Currency>("INR");

  const tierColors: Record<number, string> = {
    1: "hsl(221 83% 53%)",
    2: "hsl(262 80% 60%)",
    3: "hsl(154 84% 40%)",
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4 sm:px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex-1" />
          <span className="text-sm font-bold tracking-tight text-foreground hidden sm:block">
            Strategic Growth Packages
          </span>
          <CurrencyToggle currency={currency} onChange={setCurrency} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 max-w-5xl">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Aurion Stack
          </span>
          <h1 className="text-4xl font-heading font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl mb-4">
            Transparent pricing.{" "}
            <span className="text-muted-foreground italic">Full specification.</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto sm:text-lg text-balance">
            Clear, strategic packages for the Indian market and international clients. Everything below is development and engineering only — final pricing may vary based on custom requirements and integrations.
          </p>
        </motion.div>

        {/* ── Tier Summary Cards ── */}
        <section className="mb-6" aria-label="Pricing tier overview">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-xl border p-6 flex flex-col shadow-sm ${
                  pkg.popular
                    ? "border-primary/50 bg-card/60"
                    : "border-white/5 bg-card/40"
                }`}
              >
                {pkg.popular && (
                  <span className="inline-block self-start text-[10px] font-bold uppercase tracking-widest text-primary mb-3">
                    ★ Most Selected
                  </span>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-2 rounded-lg border flex-shrink-0"
                    style={{
                      background: (tierColors[pkg.tier] ?? tierColors[1]) + "20",
                      borderColor: (tierColors[pkg.tier] ?? tierColors[1]) + "40",
                      color: tierColors[pkg.tier] ?? tierColors[1],
                    }}
                  >
                    <pkg.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Tier {pkg.tier}
                    </p>
                    <span className="font-bold text-base text-foreground block">
                      {pkg.name}
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={currency}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="text-3xl font-bold tracking-tight text-foreground mb-1 tabular-nums"
                  >
                    {currency === "INR" ? pkg.inrPrice : pkg.usdPrice}
                  </motion.p>
                </AnimatePresence>

                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-4">
                  <Clock size={11} />
                  {pkg.delivery}
                </p>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                  {pkg.tagline}
                </p>

                <p className="text-[10px] text-muted-foreground">
                  <span className="font-bold text-foreground/40 uppercase tracking-widest">
                    Best for:{" "}
                  </span>
                  {pkg.bestFor}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Scroll hint ── */}
        <p className="text-center text-xs text-muted-foreground mb-20 flex items-center justify-center gap-1.5">
          <Info size={12} />
          Full feature specification for each tier is detailed below.
        </p>

        {/* ── Detailed Tier Breakdowns ── */}
        <section className="mb-24 space-y-16" aria-label="Detailed feature breakdowns">
          {TIER_DETAILS.map((tier, ti) => {
            const pkg = PACKAGES[ti];
            const color = tierColors[tier.tier] ?? tierColors[1];
            return (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Tier header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-5 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: color + "15", color }}
                    >
                      <pkg.icon size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Tier {tier.tier}
                      </p>
                      <h2 className="text-2xl font-heading font-normal tracking-tight text-foreground">
                        {pkg.name}
                      </h2>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={currency + tier.tier}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="text-2xl font-bold tracking-tight text-foreground tabular-nums"
                      >
                        {currency === "INR" ? pkg.inrPrice : pkg.usdPrice}
                      </motion.p>
                    </AnimatePresence>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5 sm:justify-end">
                      <RotateCcw size={11} />
                      {pkg.revisions} of revisions
                    </p>
                  </div>
                </div>

                {/* Feature groups */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tier.groups.map((group) => (
                    <div
                      key={group.label}
                      className="rounded-xl border border-white/5 bg-card/40 p-5"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <group.icon size={14} className="text-muted-foreground flex-shrink-0" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {group.label}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {group.items.map((item, ii) => (
                          <li
                            key={ii}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <CheckCircle2
                              size={13}
                              className="mt-0.5 flex-shrink-0"
                              style={{ color }}
                            />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* ── AI WhatsApp Add-on ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-7 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="h-12 w-12 rounded-xl border border-primary/20 bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                    Optional Add-on — Stacks on Tier 3
                  </p>
                  <h2 className="text-2xl font-heading font-normal tracking-tight text-foreground mb-1">
                    {AI_ADDON.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {AI_ADDON.tagline}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {AI_ADDON.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 flex-shrink-0 text-primary"
                        />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Dependency note */}
                  <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                    <AlertTriangle
                      size={15}
                      className="text-amber-400 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">Important dependency: </span>
                      {AI_ADDON.note}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right flex-shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currency + "-addon-detail"}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="text-3xl font-bold tracking-tight text-foreground tabular-nums"
                    >
                      {currency === "INR" ? AI_ADDON.inrPrice : AI_ADDON.usdPrice}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-xs text-muted-foreground mt-1">one-time setup</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Custom / Enterprise ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-white/5 bg-card/40 p-7 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg border border-white/10 bg-muted/50 text-foreground flex items-center justify-center">
                <Building2 size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Custom / Enterprise
                </p>
                <h2 className="text-xl font-heading font-normal tracking-tight text-foreground">
                  Quote on request
                </h2>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5 max-w-2xl leading-relaxed">
              For projects that don't fit a fixed-scope package, we scope bespoke engagements with full transparency.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {[
                "Native mobile apps (React Native / Flutter) for Play Store or App Store",
                "Multi-vendor or marketplace-style platforms",
                "ERP / CRM integrations, payment orchestration, multi-location support",
                "Retainer-based dedicated engineering time",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Wrench
                    size={13}
                    className="mt-0.5 flex-shrink-0 text-foreground/40"
                  />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="mailto:aurionstack@gmail.com"
              id="pricing-enterprise-contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Mail size={14} />
              Discuss your project
            </a>
          </motion.div>
        </section>

        {/* ── Universal Deliverables ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 pb-4 border-b border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                Included in every package
              </p>
              <h2 className="text-2xl font-heading font-normal tracking-tight text-foreground">
                Universal deliverables
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {UNIVERSAL_DELIVERABLES.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-card/40 px-4 py-3.5"
                >
                  <span className="text-lg flex-shrink-0">{item.emoji}</span>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Maintenance Retainer ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 pb-4 border-b border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                After the 14-day free support window
              </p>
              <h2 className="text-2xl font-heading font-normal tracking-tight text-foreground">
                Optional maintenance retainer
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Keep your product running clean. No ad-hoc hourly surprises.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {MAINTENANCE_PLANS.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  className="rounded-xl border border-white/5 bg-card/40 p-6"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    {plan.name}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currency + i}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="text-3xl font-bold tracking-tight text-foreground tabular-nums mb-1"
                    >
                      {currency === "INR" ? plan.inrPrice : plan.usdPrice}
                      <span className="text-sm font-medium text-muted-foreground">
                        {plan.period}
                      </span>
                    </motion.p>
                  </AnimatePresence>
                  <ul className="mt-4 space-y-2.5">
                    {plan.items.map((item, ii) => (
                      <li
                        key={ii}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <CheckCircle2
                          size={13}
                          className="mt-0.5 flex-shrink-0 text-foreground/40"
                        />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Critical Terms ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 pb-4 border-b border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                Read before you sign
              </p>
              <h2 className="text-2xl font-heading font-normal tracking-tight text-foreground">
                Critical terms & service notes
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                These are the details that matter most to avoid any surprises post-launch.
              </p>
            </div>
            <div className="space-y-4">
              {CRITICAL_TERMS.map((term, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  className={`rounded-xl border p-6 ${
                    term.severity === "warning"
                      ? "border-amber-500/20 bg-amber-500/5"
                      : term.severity === "info"
                      ? "border-primary/20 bg-primary/5"
                      : "border-white/5 bg-card/40"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 mt-0.5 ${
                        term.severity === "warning"
                          ? "text-amber-400"
                          : term.severity === "info"
                          ? "text-primary"
                          : "text-foreground/50"
                      }`}
                    >
                      <term.icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm mb-2">
                        {term.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {term.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Contact CTA ── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-white/5 bg-surface-gradient p-10 sm:p-14 text-center shadow-lg backdrop-blur-sm"
          >
            <h2 className="text-2xl font-heading font-normal tracking-tight text-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-base text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
              Drop us a message and we&apos;ll reply with a scope confirmation within 24 hours. No discovery call required for Tiers 1 and 2.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                id="pricing-cta-email"
                href="mailto:aurionstack@gmail.com"
                className="flex items-center justify-center gap-2 rounded-md bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 shadow-md"
              >
                <Mail size={16} />
                Email Us
              </a>
              <a
                id="pricing-cta-whatsapp"
                href="https://wa.me/919322720861"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-md border border-white/10 bg-transparent px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Phone size={16} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default PricingDashboard;
