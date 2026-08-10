import { Metadata } from "next";
import InsightsClient from "./InsightsClient";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "AI & SaaS Growth Insights for Founders | Aurion Stack Blog",
  description: "Practical guides on AI automation, SaaS architecture, and product engineering. Learn how to build, scale, and automate your business with real technical depth.",
  alternates: { canonical: "https://www.aurionstack.dev/insights" },
  openGraph: {
    type: "website",
    url: "https://www.aurionstack.dev/insights",
    title: "AI & SaaS Growth Insights for Founders | Aurion Stack Blog",
    description: "Practical guides on AI automation, SaaS architecture, and product engineering. Learn how to build, scale, and automate your business with real technical depth.",
    siteName: "Aurion Stack",
    images: [{ url: "/aurionstack-logo.webp", width: 1200, height: 630, alt: "Aurion Stack Insights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & SaaS Growth Insights for Founders | Aurion Stack Blog",
    description: "Practical guides on AI automation, SaaS architecture, and product engineering.",
    images: ["/aurionstack-logo.webp"],
    site: "@aurionstack",
  },
};

export default function InsightsPage() {
  const posts = getAllPosts();
  return <InsightsClient dynamicPosts={posts} />;
}
