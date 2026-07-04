"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  const suggestions = [
    { label: "Homepage", href: "/", desc: "Back to the main site" },
    { label: "Our Services", href: "/services", desc: "Explore what we build" },
    { label: "Solutions Hub", href: "/solutions", desc: "Browse targeted use-case pages" },
    { label: "Pricing", href: "/pricing", desc: "See our packages" },
    { label: "Contact Us", href: "/#contact", desc: "Talk to the team" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24 text-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-xl">
        {/* 404 number */}
        <p className="text-[120px] sm:text-[160px] font-heading font-normal leading-none text-foreground/5 select-none mb-0 -mb-6">
          404
        </p>

        {/* Label */}
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
          Page Not Found
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-heading font-normal tracking-tight text-foreground mb-4 text-balance">
          This page doesn't exist.
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
          The URL <code className="text-xs bg-muted px-2 py-0.5 rounded text-primary">{pathname}</code> wasn't found.
          Here are some pages that might help:
        </p>

        {/* Suggestions grid */}
        <div className="grid sm:grid-cols-2 gap-3 mb-10 text-left">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card/40 px-4 py-3.5 hover:border-primary/40 hover:bg-card/70 transition-all"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <ArrowRight size={14} className="text-muted-foreground group-hover:translate-x-0.5 group-hover:text-primary transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>

        {/* Primary CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-foreground px-8 py-3.5 text-sm font-semibold text-background hover:bg-foreground/90 hover:scale-[1.02] transition-all shadow-md"
        >
          <Home size={15} />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
