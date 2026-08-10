"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Zap, Globe, Brain, Smartphone, BarChart3, ArrowRight, Clock, Sparkles, TrendingUp, Code2, Cpu } from "lucide-react";
import SchemaOrg, { organizationSchema } from "@/components/SchemaOrg";
import Link from "next/link";
import { BlogPost } from "@/lib/mdx";

// ─── Category color system ─────────────────────────────────────────────────
const categoryConfig: Record<string, { bg: string; text: string; border: string; glow: string; dot: string }> = {
  // Original dev categories (kept for backward compat)
  "AI & LLMs":        { bg: "bg-violet-500/10",   text: "text-violet-400",  border: "border-violet-500/30",  glow: "hover:shadow-violet-500/10",  dot: "bg-violet-400" },
  "Case Study":       { bg: "bg-emerald-500/10",  text: "text-emerald-400", border: "border-emerald-500/30", glow: "hover:shadow-emerald-500/10", dot: "bg-emerald-400" },
  "Enterprise Dev":   { bg: "bg-blue-500/10",     text: "text-blue-400",    border: "border-blue-500/30",    glow: "hover:shadow-blue-500/10",    dot: "bg-blue-400" },
  "DevOps":           { bg: "bg-orange-500/10",   text: "text-orange-400",  border: "border-orange-500/30",  glow: "hover:shadow-orange-500/10",  dot: "bg-orange-400" },
  "Deployment":       { bg: "bg-cyan-500/10",     text: "text-cyan-400",    border: "border-cyan-500/30",    glow: "hover:shadow-cyan-500/10",    dot: "bg-cyan-400" },
  "Performance":      { bg: "bg-yellow-500/10",   text: "text-yellow-400",  border: "border-yellow-500/30",  glow: "hover:shadow-yellow-500/10",  dot: "bg-yellow-400" },
  "Mobile":           { bg: "bg-pink-500/10",     text: "text-pink-400",    border: "border-pink-500/30",    glow: "hover:shadow-pink-500/10",    dot: "bg-pink-400" },
  "SEO & GEO":        { bg: "bg-teal-500/10",     text: "text-teal-400",    border: "border-teal-500/30",    glow: "hover:shadow-teal-500/10",    dot: "bg-teal-400" },
  "Web Development":  { bg: "bg-indigo-500/10",   text: "text-indigo-400",  border: "border-indigo-500/30",  glow: "hover:shadow-indigo-500/10",  dot: "bg-indigo-400" },
  // Business-owner categories (auto-generated posts)
  "Website Tips":     { bg: "bg-blue-500/10",     text: "text-blue-400",    border: "border-blue-500/30",    glow: "hover:shadow-blue-500/10",    dot: "bg-blue-400" },
  "Hiring Tips":      { bg: "bg-amber-500/10",    text: "text-amber-400",   border: "border-amber-500/30",   glow: "hover:shadow-amber-500/10",   dot: "bg-amber-400" },
  "AI for Business":  { bg: "bg-violet-500/10",   text: "text-violet-400",  border: "border-violet-500/30",  glow: "hover:shadow-violet-500/10",  dot: "bg-violet-400" },
  "Marketing":        { bg: "bg-rose-500/10",     text: "text-rose-400",    border: "border-rose-500/30",    glow: "hover:shadow-rose-500/10",    dot: "bg-rose-400" },
  "SEO Basics":       { bg: "bg-teal-500/10",     text: "text-teal-400",    border: "border-teal-500/30",    glow: "hover:shadow-teal-500/10",    dot: "bg-teal-400" },
  "SaaS Explained":   { bg: "bg-emerald-500/10",  text: "text-emerald-400", border: "border-emerald-500/30", glow: "hover:shadow-emerald-500/10", dot: "bg-emerald-400" },
  "default":          { bg: "bg-primary/10",       text: "text-primary",     border: "border-primary/30",     glow: "hover:shadow-primary/10",     dot: "bg-primary" },
};

const getCategoryStyle = (cat: string) => categoryConfig[cat] ?? categoryConfig["default"];

const IconMap: Record<string, React.ElementType> = { Brain, Globe, Zap, Smartphone, BarChart3, Code2, Cpu, TrendingUp };

// Article schema (www-fixed)
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Full-Stack AI Development — The Complete Guide for 2026",
  description: "A topic cluster pillar page covering full-stack AI development: LLM integration, React/Next.js deployment, mobile apps, SEO, and GEO strategies for global startups and engineering teams.",
  url: "https://www.aurionstack.dev/insights",
  datePublished: "2026-03-22",
  dateModified: "2026-03-25",
  author: { "@id": "https://www.aurionstack.dev/#organization" },
  publisher: { "@id": "https://www.aurionstack.dev/#organization" },
  inLanguage: "en-US",
  keywords: "Full-Stack Development, AI Development, React, Next.js, LLM, Groq, Vercel, GEO, SEO, Product Engineering",
};

// Static cluster articles (coming soon)
const clusterArticles = [
  { icon: Zap, category: "Case Study", title: "How to 10x YouTube Growth Using AI Content Gap Analysis", description: "A deep dive into how creators are using GapTuber to find high-demand, low-competition video topics before they trend.", keywords: ["GapTuber", "YouTube SEO", "Content Gap", "AI Ideas"], readTime: "6 min read" },
  { icon: Globe, category: "Enterprise Dev", title: "Modernising Legacy Java Monoliths with Next.js and Microservices", description: "A strategic playbook for migrating enterprise Java backends to a decoupled architecture using Next.js as the BFF.", keywords: ["Java", "Next.js", "Microservices", "Enterprise"], readTime: "14 min read" },
  { icon: Brain, category: "DevOps", title: "Zero-Downtime Deployments: Automating CI/CD with Jenkins and Vercel", description: "Step-by-step Jenkins pipeline configuration to automate testing, build steps, and zero-downtime production deployments.", keywords: ["Jenkins", "Vercel", "CI/CD", "DevOps"], readTime: "11 min read" },
  { icon: Brain, category: "AI & LLMs", title: "How to Integrate Groq LLaMA 3 into a React App", description: "A step-by-step guide to streaming LLaMA 3.1 responses from the Groq API into a React frontend using server-sent events.", keywords: ["Groq API", "LLaMA 3", "React", "AI Chatbot"], readTime: "12 min read" },
  { icon: Globe, category: "Deployment", title: "Vercel Deployment Architecture for Scaling SaaS", description: "Edge functions, ISR, image optimisation, and environment variable management on Vercel for global low-latency delivery.", keywords: ["Vercel", "Next.js", "Edge Functions", "SaaS"], readTime: "9 min read" },
  { icon: Zap, category: "Performance", title: "Achieving Sub-2s LCP on a React SPA Without SSR", description: "Lazy loading, code splitting, WebP images, fetchPriority, and resource hints that push a React app into green Core Web Vitals.", keywords: ["Core Web Vitals", "LCP", "React SPA", "SEO"], readTime: "10 min read" },
  { icon: Brain, category: "AI & LLMs", title: "Fine-Tuning Gemma 2 on Google Cloud for Domain-Specific Context", description: "Using Vertex AI and GCP's TPU infrastructure to fine-tune Google's Gemma 2 model on custom business data.", keywords: ["Gemma 2", "Fine-tuning", "GCP", "Vertex AI"], readTime: "15 min read" },
  { icon: Smartphone, category: "Mobile", title: "Building an Offline-First React Native App with Expo and SQLite", description: "Architecture patterns for apps that work without internet using expo-sqlite for local storage and optimistic UI updates.", keywords: ["React Native", "Expo", "SQLite", "Offline-first"], readTime: "11 min read" },
  { icon: BarChart3, category: "SEO & GEO", title: "GEO vs SEO: How to Optimise Your Platform for AI Overviews in 2026", description: "Traditional SEO gets you blue links. GEO gets you cited inside Gemini AI Overviews and ChatGPT answers.", keywords: ["GEO", "SEO", "AI Overview", "Schema", "Gemini"], readTime: "8 min read" },
  { icon: Globe, category: "Web Development", title: "Evaluating Next.js App Router for Enterprise Applications", description: "A frank comparison of Next.js Pages vs App Router for large-scale enterprise websites — hosting costs and maintainability.", keywords: ["Next.js", "Architecture", "Enterprise"], readTime: "7 min read" },
  { icon: Brain, category: "AI & LLMs", title: "Building a RAG Pipeline with LangChain, Pinecone, and OpenAI", description: "Retrieval-Augmented Generation step-by-step: ingest documents into Pinecone, retrieve chunks, and return grounded answers via GPT-4.", keywords: ["RAG", "LangChain", "Pinecone", "OpenAI"], readTime: "13 min read" },
];

const ALL_FILTER = "All";

// ─── Page Component ────────────────────────────────────────────────────────
const InsightsPage = ({ dynamicPosts = [] }: { dynamicPosts?: BlogPost[] }) => {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const formattedDynamicPosts = dynamicPosts.map(post => ({
    icon: IconMap[post.icon] || Globe,
    category: post.category,
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    readTime: post.readTime,
    slug: post.slug,
    isLive: true,
  }));

  const staticArticles = clusterArticles.map(a => ({ ...a, isLive: false }));
  const allArticles = [...formattedDynamicPosts, ...staticArticles];

  // Unique categories for filter tabs
  const categories = [ALL_FILTER, ...Array.from(new Set(allArticles.map(a => a.category)))];

  const filtered = activeFilter === ALL_FILTER
    ? allArticles
    : allArticles.filter(a => a.category === activeFilter);

  const liveCount = formattedDynamicPosts.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SchemaOrg schemas={[organizationSchema, articleSchema]} />

      {/* ── Sticky Topbar with proper navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 max-w-6xl">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-0.5 transition-transform">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <BookOpen size={12} />
              Aurion Stack Insights
            </span>
          </div>
          <Link
            href="mailto:aurionstack@gmail.com"
            className="rounded-md bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
          >
            Work With Us
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background to-muted/20">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-0 h-[300px] w-[500px] -translate-y-1/2 rounded-full bg-violet-500/6 blur-[100px]" />
          <div className="absolute right-1/4 top-0 h-[300px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
        </div>

        <div className="relative container mx-auto px-4 py-20 sm:py-28 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-400 mb-6">
              <Sparkles size={11} />
              Technical Deep Dives & Growth Playbooks
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-5 leading-[1.1]">
              Ideas that{" "}
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Scale Businesses
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Real-world guides on AI automation, SaaS architecture, and product engineering —
              written for founders and engineering teams who build to ship, not just to learn.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {liveCount} Live Articles
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <TrendingUp size={12} />
                {allArticles.length} Guides Total
              </span>
              <span className="text-border">·</span>
              <span>AI · SaaS · DevOps · Mobile</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 max-w-6xl">

        {/* ── Category Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            const style = cat === ALL_FILTER ? null : getCategoryStyle(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 border ${
                  isActive
                    ? cat === ALL_FILTER
                      ? "bg-foreground text-background border-foreground"
                      : `${style!.bg} ${style!.text} ${style!.border}`
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {cat === ALL_FILTER ? `All (${allArticles.length})` : cat}
              </button>
            );
          })}
        </motion.div>

        {/* ── Article Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((article, i) => {
              const Icon = article.icon;
              const style = getCategoryStyle(article.category);

              const cardInner = (
                <>
                  {/* Top row: category badge + read time */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border ${style.bg} ${style.text} ${style.border}`}>
                      <Icon size={10} />
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                      <Clock size={10} />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[15px] font-bold tracking-tight text-foreground leading-snug mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-muted-foreground flex-1 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {article.keywords.slice(0, 3).map((kw) => (
                      <span key={kw} className="rounded-md bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
                    "isLive" in article && article.isLive
                      ? `${style.text} opacity-80 group-hover:opacity-100`
                      : "text-muted-foreground/50"
                  }`}>
                    {"isLive" in article && article.isLive ? (
                      <>
                        <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${style.dot}`} />
                        Read Article
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </>
                    ) : (
                      <span>Coming Soon</span>
                    )}
                  </div>
                </>
              );

              const baseCardClass = `group relative flex flex-col rounded-2xl border bg-card/40 backdrop-blur-sm p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${style.border} hover:${style.border} ${style.glow}`;

              return "isLive" in article && article.isLive && "slug" in article ? (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <Link href={`/insights/${(article as { slug: string }).slug}`} className={baseCardClass}>
                    {/* Top-right glow dot for live articles */}
                    <div className={`absolute top-3 right-3 h-1.5 w-1.5 rounded-full ${style.dot} opacity-60`} />
                    {cardInner}
                  </Link>
                </motion.div>
              ) : (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={`${baseCardClass} opacity-60 cursor-default`}
                >
                  {cardInner}
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Newsletter CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 relative rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-violet-500/5 via-card to-cyan-500/5 px-6 py-12 text-center sm:px-12"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-violet-500/5 to-transparent" />
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-cyan-500/5 to-transparent" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-4 py-1.5 text-xs font-bold text-violet-400 mb-4">
              <Sparkles size={11} />
              Ready to build?
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Turn Insights into Revenue
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-8">
              Aurion Stack ships AI-powered SaaS products, automation systems, and custom web apps for global businesses.
              Remote-first. Delivery-obsessed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="mailto:aurionstack@gmail.com"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-foreground px-8 py-3.5 text-sm font-semibold text-background shadow-lg hover:bg-foreground/90 hover:scale-[1.02] transition-all"
              >
                Start a Project
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-transparent px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default InsightsPage;
