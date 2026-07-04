"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CheckCircle2, ArrowRight, Zap, Briefcase,
  LayoutTemplate, Clock, RotateCcw, Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type Currency = "INR" | "USD";

// ─── PACKAGES DATA ───────────────────────────────────────────────────────────

export const PACKAGES = [
  {
    tier: 1,
    icon: LayoutTemplate,
    name: "Micro Presence",
    tagline: "A fast, professional web presence for your local business.",
    bestFor: "Local shops, cafes & independent service providers.",
    inrPrice: "₹6,999",
    usdPrice: "$149",
    popular: false,
    delivery: "3–5 Business Days",
    revisions: "1 round",
    bullets: [
      "1–2 page responsive landing page (Next.js + Tailwind)",
      "Local SEO — meta tags, OG, sitemap & Core Web Vitals pass",
      "Contact form → client email or Google Sheets routing",
      "Click-to-WhatsApp floating widget with custom pre-fill",
      "Google Analytics or Plausible setup & verification",
    ],
    outcomes: [
      {
        id: "speed",
        emoji: "⚡",
        title: "Online in Days",
        desc: "A fast, mobile-first landing page live within 3–5 business days — no delays, no bloat.",
      },
      {
        id: "whatsapp",
        emoji: "📲",
        title: "WhatsApp Lead Entry",
        desc: "Visitors tap the floating widget and land directly in your WhatsApp — pre-filled message, zero friction.",
      },
      {
        id: "seo",
        emoji: "🔍",
        title: "Found on Google",
        desc: "Core Web Vitals pass, meta tags, Open Graph, sitemap & robots.txt — everything search engines need to index you.",
      },
    ],
  },
  {
    tier: 2,
    icon: Briefcase,
    name: "Business Core",
    tagline: "A multi-page site with lead tracking, CMS control and local SEO.",
    bestFor: "Clinics, real estate agents & retail businesses.",
    inrPrice: "₹15,999",
    usdPrice: "$399",
    popular: false,
    delivery: "7–10 Business Days",
    revisions: "2 rounds",
    bullets: [
      "Everything in Micro Presence",
      "3–5 pages + headless CMS (Sanity) — edit without touching code",
      "Schema markup (LocalBusiness/Service) + Google Search Console",
      "Google Business Profile audit & optimization guidance",
      "Instant WhatsApp lead alert — new form submission → your phone",
    ],
    outcomes: [
      {
        id: "cms",
        emoji: "🗂️",
        title: "Edit Without a Developer",
        desc: "Update services, prices, or listings from a CMS dashboard — no code, no waiting.",
      },
      {
        id: "alert",
        emoji: "🔔",
        title: "Instant Lead Alerts",
        desc: "Every new inquiry fires a WhatsApp message to your phone — no dashboard login, no missed leads.",
      },
      {
        id: "local",
        emoji: "📍",
        title: "Local Search Dominance",
        desc: "Schema markup, Google Search Console, and Business Profile optimization built in from day one.",
      },
    ],
  },
  {
    tier: 3,
    icon: Zap,
    name: "Web App MVP",
    tagline: "A full-stack app with auth, dashboards and an installable PWA layer.",
    bestFor: "Startups, booking platforms & businesses automating customer ops.",
    inrPrice: "₹36,999",
    usdPrice: "$849",
    popular: true,
    delivery: "3–4 Weeks",
    revisions: "2 structural rounds",
    bullets: [
      "Everything in Business Core's design quality",
      "Full-stack: Next.js + Supabase (PostgreSQL, Auth, Storage)",
      "Email/magic-link login + role-based access (admin vs. customer)",
      "Admin dashboard: view, filter & manage all records",
      "Installable PWA — home screen, offline access & push notifications",
    ],
    outcomes: [
      {
        id: "auth",
        emoji: "🔐",
        title: "Secure User Accounts",
        desc: "Email/magic-link auth with admin vs. customer role separation — production-ready from launch.",
      },
      {
        id: "dashboard",
        emoji: "📊",
        title: "Real-Time Dashboards",
        desc: "Admins manage records. Customers track their own bookings. No spreadsheets, no back-and-forth.",
      },
      {
        id: "pwa",
        emoji: "📱",
        title: "App Without the App Store",
        desc: "Installs to home screen on Android & iOS. Works offline. Sends push notifications. No Play Store needed.",
      },
    ],
  },
];

// ─── AI ADD-ON DATA ──────────────────────────────────────────────────────────

export const AI_ADDON = {
  inrPrice: "+₹13,999",
  usdPrice: "+$299",
  name: "AI WhatsApp Assistant",
  tagline: "2-way AI support on your business WhatsApp line. Stacks on top of Tier 3.",
  bullets: [
    "WhatsApp Business API via Meta Cloud API or BSP (Interakt / Gupshup)",
    "Claude-powered engine trained on your FAQs, services & pricing",
    "Lead-qualification flow: collects name, need & timeline automatically",
    "Conversation logs stored & visible inside the Tier 3 admin dashboard",
  ],
  note: "Requires Meta Business verification & WhatsApp template approval — Meta's process, not yours. Meta charges per-conversation once live, billed directly to the client.",
};


// ─── CURRENCY TOGGLE ─────────────────────────────────────────────────────────

export const CurrencyToggle = ({
  currency,
  onChange,
}: {
  currency: Currency;
  onChange: (c: Currency) => void;
}) => (
  <div
    className="inline-flex items-center rounded-full border border-white/10 bg-muted/30 p-1 gap-1"
    role="group"
    aria-label="Select pricing currency"
  >
    {(["INR", "USD"] as Currency[]).map((c) => (
      <button
        key={c}
        id={`currency-toggle-${c.toLowerCase()}`}
        onClick={() => onChange(c)}
        aria-pressed={currency === c}
        className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200 ${
          currency === c
            ? "text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {currency === c && (
          <motion.span
            layoutId="pricing-currency-pill"
            className="absolute inset-0 rounded-full bg-foreground"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">{c === "INR" ? "₹ INR" : "$ USD"}</span>
      </button>
    ))}
  </div>
);

// ─── PACKAGE MODAL ───────────────────────────────────────────────────────────

const PackageModal = ({
  pkg,
  currency,
  onClose,
}: {
  pkg: (typeof PACKAGES)[0];
  currency: Currency;
  onClose: () => void;
}) => {
  const headingId = `modal-title-${pkg.name.replace(/\s+/g, "-")}`;
  const price = currency === "INR" ? pkg.inrPrice : pkg.usdPrice;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-background shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
        >
          {/* Modal header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-background/90 backdrop-blur-md px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-muted/50 text-foreground">
                <pkg.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Tier {pkg.tier}
                </p>
                <h3
                  id={headingId}
                  className="text-xl font-bold tracking-tight text-foreground"
                >
                  {pkg.name}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Best for */}
          <div className="px-6 pt-5 pb-1">
            <p className="text-xs text-muted-foreground">
              <span className="font-bold text-foreground/60 uppercase tracking-widest text-[10px]">
                Best for:{" "}
              </span>
              {pkg.bestFor}
            </p>
          </div>

          {/* Outcomes */}
          <div className="px-6 py-4">
            <h4 className="text-[10px] font-bold text-muted-foreground mb-4 uppercase tracking-[0.15em]">
              What You're Buying
            </h4>
            <div className="space-y-3">
              {pkg.outcomes.map((fb) => (
                <div
                  key={fb.id}
                  className="flex items-start gap-4 rounded-lg border border-white/5 bg-card p-4"
                >
                  <span className="text-2xl mt-0.5 flex-shrink-0">{fb.emoji}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{fb.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {fb.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery & Revisions */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/5 bg-card p-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Delivery
                </p>
                <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Clock size={13} className="text-primary flex-shrink-0" />
                  {pkg.delivery}
                </p>
              </div>
              <div className="rounded-lg border border-white/5 bg-card p-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Revisions
                </p>
                <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <RotateCcw size={13} className="text-primary flex-shrink-0" />
                  {pkg.revisions}
                </p>
              </div>
            </div>
          </div>

          {/* Modal footer */}
          <div className="sticky bottom-0 z-10 border-t border-white/5 bg-background/95 backdrop-blur-md px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currency + pkg.tier}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="text-3xl font-bold tracking-tight text-foreground"
                >
                  {price}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs text-muted-foreground mt-0.5">
                Development & engineering only
              </p>
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="rounded-md bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-all hover:bg-foreground/90 hover:scale-[1.02]"
            >
              Start Conversation
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── PRICING SECTION ─────────────────────────────────────────────────────────

const PricingSection = () => {
  const [selectedPkg, setSelectedPkg] = useState<(typeof PACKAGES)[0] | null>(
    null
  );
  const [currency, setCurrency] = useState<Currency>("INR");
  const router = useRouter();

  return (
    <>
      {selectedPkg && (
        <PackageModal
          pkg={selectedPkg}
          currency={currency}
          onClose={() => setSelectedPkg(null)}
        />
      )}

      <section
        id="packages"
        className="relative py-12 sm:py-16 bg-background border-t border-white/5"
      >
        <div className="container relative mx-auto px-4 sm:px-6 z-10">


          {/* ── STRATEGIC PACKAGES ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div className="max-w-2xl">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Strategic Growth Packages
                </span>
                <h2 className="text-3xl font-heading font-normal tracking-tight text-foreground sm:text-4xl">
                  Clear, upfront pricing.
                  <br />
                  <span className="text-muted-foreground italic">
                    Tailored to your business.
                  </span>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-lg">
                  Development & engineering only. Final project charges may vary depending on custom scope, domain/hosting, and third-party integrations.
                </p>
              </div>
              {/* Currency Toggle */}
              <CurrencyToggle currency={currency} onChange={setCurrency} />
            </div>
          </motion.div>

          {/* Tier cards */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className={`min-w-[85vw] snap-center sm:min-w-0 flex-shrink-0 relative flex flex-col rounded-xl border p-6 sm:p-7 transition-all duration-300 bg-card ${
                  pkg.popular
                    ? "border-primary/50 shadow-2xl shadow-primary/5 md:-translate-y-2"
                    : "border-white/5 hover:border-white/10 hover:shadow-lg"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span className="animate-shimmer rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm bg-primary">
                      Most Selected
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-5 flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg border flex-shrink-0 ${
                      pkg.popular
                        ? "border-primary/20 bg-primary/10 text-primary"
                        : "border-white/5 bg-muted/50 text-foreground"
                    }`}
                  >
                    <pkg.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Tier {pkg.tier}
                    </p>
                    <span className="text-base font-bold text-foreground">
                      {pkg.name}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-medium text-muted-foreground mb-5 min-h-[32px] leading-relaxed">
                  {pkg.tagline}
                </p>

                {/* Price */}
                <div className="mb-5 pb-5 border-b border-white/5">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currency}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="text-2xl font-bold tracking-tight text-foreground tabular-nums"
                    >
                      {currency === "INR" ? pkg.inrPrice : pkg.usdPrice}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
                    <Clock size={11} className="flex-shrink-0" />
                    {pkg.delivery}
                  </p>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-5">
                  {pkg.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="flex items-start gap-2.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle2
                        size={14}
                        className={`mt-0.5 flex-shrink-0 ${
                          pkg.popular ? "text-primary" : "text-foreground/50"
                        }`}
                      />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Best for */}
                <p className="text-[10px] text-muted-foreground mb-5 leading-relaxed">
                  <span className="font-bold text-foreground/40 uppercase tracking-widest">
                    Best for:{" "}
                  </span>
                  {pkg.bestFor}
                </p>

                <button
                  id={`view-outcomes-tier-${pkg.tier}`}
                  onClick={() => setSelectedPkg(pkg)}
                  className={`w-full rounded-md px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02]"
                      : "border border-white/10 bg-transparent text-foreground hover:bg-muted"
                  }`}
                >
                  View Outcomes
                </button>
              </motion.div>
            ))}
          </div>

          {/* ── AI WhatsApp Add-on ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-5 sm:p-7"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              {/* Icon + name */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="h-10 w-10 rounded-lg border border-primary/20 bg-primary/10 text-primary flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-0.5">
                    Optional Add-on
                  </p>
                  <p className="font-bold text-foreground text-base">
                    {AI_ADDON.name}
                  </p>
                </div>
              </div>

              {/* Bullets */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-3">
                  {AI_ADDON.tagline}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {AI_ADDON.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <CheckCircle2
                        size={13}
                        className="mt-0.5 flex-shrink-0 text-primary"
                      />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="sm:text-right flex-shrink-0 sm:min-w-[90px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currency + "-addon"}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    className="text-2xl font-bold tracking-tight text-foreground tabular-nums"
                  >
                    {currency === "INR" ? AI_ADDON.inrPrice : AI_ADDON.usdPrice}
                  </motion.p>
                </AnimatePresence>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Stacks on Tier 3
                </p>
              </div>
            </div>
          </motion.div>

          {/* See full breakdown link */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex justify-center"
          >
            <button
              id="pricing-see-full-breakdown"
              onClick={() => router.push("/pricing")}
              className="group flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              See full package breakdown
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default PricingSection;
