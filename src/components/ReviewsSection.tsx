"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { useReviews, Review } from "@/context/ReviewsContext";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-primary text-primary" : "fill-transparent text-primary/30"}
      />
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="flex-shrink-0 w-80 sm:w-96 rounded-xl border border-border bg-card/90 backdrop-blur-sm p-6 mx-3 shadow-sm hover:border-primary/40 transition-colors flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between gap-2 mb-3">
        <StarRating rating={review.rating} />
        {review.projectTag && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {review.projectTag}
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground italic sm:text-[15px]">
        "{review.text}"
      </p>
    </div>

    <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
      <div>
        <p className="text-sm font-bold tracking-tight text-foreground">{review.author}</p>
        <p className="text-xs text-muted-foreground">
          {review.role}, <span className="text-foreground/90 font-medium">{review.company}</span>
        </p>
      </div>
      {review.projectUrl && (
        <a
          href={review.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
          aria-label={`View ${review.company} project`}
        >
          <span>Live Build</span>
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  </div>
);

const ReviewsSection = () => {
  const { reviews } = useReviews();

  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef<number>(0);

  const doubled = [...reviews, ...reviews];
  const isPaused = useRef<boolean>(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let lastTime = 0;
    const speed = 0.45;
    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      if (!isPaused.current) {
        posRef.current -= speed * (delta / 16.67);
        const halfWidth = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= halfWidth) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [reviews]);

  return (
    <section id="reviews" className="relative border-t border-border bg-background py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Client Proof
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Client <span className="text-muted-foreground">Endorsements</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto">
            Direct feedback from founders and operators who trusted Aurion Stack to engineer, scale, and automate their platforms.
          </p>
        </div>
      </div>

      {/* Infinite scrolling ticker */}
      <div className="relative mb-20">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-background to-transparent sm:w-32" />
        <div
          className="overflow-hidden cursor-pointer"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
          onTouchStart={() => { isPaused.current = true; }}
          onTouchEnd={() => { isPaused.current = false; }}
          aria-label="Client reviews — hover to pause"
        >
          <div ref={trackRef} className="flex" style={{ willChange: "transform" }}>
            {doubled.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-2xl border border-border bg-muted/20 p-8 sm:p-10 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck size={14} />
                <span>Verified Production Deployments</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Ready to ship your product with senior engineers?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Every project comes with 100% IP ownership, founder-led architecture reviews, and a 14-day post-launch bug warranty.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5 text-foreground">
                  <CheckCircle2 size={14} className="text-primary" /> 100% Code & Asset Ownership
                </span>
                <span className="flex items-center gap-1.5 text-foreground">
                  <CheckCircle2 size={14} className="text-primary" /> Production SLA Guarantee
                </span>
                <span className="flex items-center gap-1.5 text-foreground">
                  <CheckCircle2 size={14} className="text-primary" /> Direct Senior Slack/WhatsApp
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-all hover:bg-foreground/90 shadow-sm text-center"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="https://wa.me/919322974288"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-muted text-center"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
