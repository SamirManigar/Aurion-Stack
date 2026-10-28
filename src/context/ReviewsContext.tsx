"use client";

import { createContext, useContext, useState, ReactNode } from "react";
export interface Review {
  text: string;
  author: string;
  role: string;
  company: string;
  projectTag: string;
  projectUrl?: string;
  rating: number;
}

const defaultReviews: Review[] = [
  {
    text: "Aurion Stack architected and launched our full coaching platform and checkout flow from scratch. We achieved a 3x surge in paid member signups within the first 30 days.",
    author: "Kashyap N.",
    role: "Founder",
    company: "Thick to Ripped",
    projectTag: "Fitness SaaS",
    projectUrl: "https://thick-to-ripped.vercel.app",
    rating: 5,
  },
  {
    text: "Their WhatsApp automated booking workflow eliminated our peak-season phone bottlenecks completely. Rental reservation turnover doubled with zero manual dispatch overhead.",
    author: "Vikram S.",
    role: "Managing Director",
    company: "Madara's Rental Goa",
    projectTag: "Fleet Booking Engine",
    projectUrl: "https://www.madarasrentalgoa.app/",
    rating: 5,
  },
  {
    text: "Delivered our multi-tenant booking marketplace with real-time slot scheduling ahead of our deadline. Clean Next.js code, zero production downtime since launch.",
    author: "Pooja M.",
    role: "Operations Head",
    company: "KleanBee",
    projectTag: "Marketplace Platform",
    projectUrl: "https://kleanbee-goa.vercel.app/",
    rating: 5,
  },
  {
    text: "From headless CMS integration to high-converting Stripe checkout, their attention to Core Web Vitals brought our mobile bounce rate down by over 40%.",
    author: "Siddharth R.",
    role: "Founder",
    company: "HHS Bloom",
    projectTag: "E-Commerce & Subscriptions",
    projectUrl: "https://hhs-flower.vercel.app",
    rating: 5,
  },
  {
    text: "Aurion Stack delivered our custom AI video research pipelines with Groq and OpenAI integrations in under 3 weeks. Fast, communicative, and truly production-focused.",
    author: "Elena V.",
    role: "Product Lead",
    company: "CreatorOps AI",
    projectTag: "AI Automation",
    rating: 5,
  },
  {
    text: "They operate like an in-house engineering squad. Clear architecture roadmaps, direct founder communication, and reliable delivery without scope creep.",
    author: "Arjun K.",
    role: "CTO",
    company: "Nexus Logistics",
    projectTag: "Internal Tooling",
    rating: 5,
  },
];

interface ReviewsContextType {
  reviews: Review[];
  addReview: (r: Review) => void;
  avgRating: number;
}

const ReviewsContext = createContext<ReviewsContextType>({
  reviews: defaultReviews,
  addReview: () => {},
  avgRating: 5.0,
});

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);

  const addReview = (r: Review) => setReviews((prev) => [...prev, r]);

  const avgRating =
    reviews.length === 0
      ? 5.0
      : Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, avgRating }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewsContext);
