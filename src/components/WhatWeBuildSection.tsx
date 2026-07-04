"use client";

import { motion } from "framer-motion";
import {
  Globe, Database, Smartphone, MessageSquare,
  Search, LayoutTemplate, Zap, ShieldCheck,
} from "lucide-react";

const builds = [
  {
    icon: LayoutTemplate,
    label: "Landing Pages",
    detail: "Mobile-first, Next.js. Live in 3–5 days.",
  },
  {
    icon: Search,
    label: "Local SEO",
    detail: "Schema, Search Console, Core Web Vitals pass.",
  },
  {
    icon: Globe,
    label: "Multi-Page Websites",
    detail: "3–5 pages with a headless CMS you control.",
  },
  {
    icon: Database,
    label: "Web App MVPs",
    detail: "Auth, dashboards, Supabase — full-stack.",
  },
  {
    icon: Smartphone,
    label: "Installable PWAs",
    detail: "Home screen install. Offline. Push notifications.",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp Automation",
    detail: "Lead alerts, click-to-chat, and AI assistants.",
  },
  {
    icon: Zap,
    label: "AI Chatbots",
    detail: "Claude-powered, trained on your business data.",
  },
  {
    icon: ShieldCheck,
    label: "Admin Dashboards",
    detail: "Manage records, filter leads, track customers.",
  },
];

const WhatWeBuildSection = () => {
  return (
    <section className="bg-background py-10 sm:py-16 px-4 border-t border-white/5">
      <div className="container mx-auto max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Our Capability
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-tight text-foreground">
            What we actually build.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed">
            Every deliverable ships with full source code, a live walkthrough call, and 14 days of bug support.
          </p>
        </motion.div>

        {/* 2-column grid */}
        <div className="grid grid-cols-2 gap-px border border-white/5 rounded-2xl overflow-hidden bg-white/5">
          {builds.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="group flex flex-col items-start gap-4 sm:gap-5 bg-background p-6 sm:p-8 hover:bg-white/[0.03] transition-colors duration-300"
            >
              <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-lg border border-white/5 bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300">
                <item.icon size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-base font-semibold text-foreground leading-tight">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatWeBuildSection;
