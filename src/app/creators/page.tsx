import type { Metadata } from "next";
import CreatorStudio from "./CreatorStudio";

export const metadata: Metadata = {
  title: "Creator Studio",
  description: "Explore Historicalwallaby’s creator edits, motion design, and documentary-style videos at Aurion Stack’s Creator Studio.",
  alternates: { canonical: "/creators" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Creator Studio | Aurion Stack",
    description: "Creator edits, motion design, and visual storytelling by Historicalwallaby. Watch the selected work.",
    url: "/creators",
  },
  twitter: {
    title: "Creator Studio | Aurion Stack",
    description: "Creator edits, motion design, and visual storytelling by Historicalwallaby. Watch the selected work.",
  },
};

export default function CreatorsPage() {
  return <CreatorStudio />;
}
