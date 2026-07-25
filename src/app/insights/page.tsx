import { Metadata } from "next";
import InsightsClient from "./InsightsClient";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Insights — Aurion Stack | AI Automation & Web Architecture Strategy",
  description: "Read our technical breakdowns and business strategy on how custom software and AI workflows are scaling operations for global businesses.",
};

export default function InsightsPage() {
  const posts = getAllPosts();
  return <InsightsClient dynamicPosts={posts} />;
}
