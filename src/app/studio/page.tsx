import type { Metadata } from "next";
import StudioClient from "./StudioClient";

export const metadata: Metadata = {
  title: "Creator Studio | Aurion Stack",
  description:
    "Explore Historicalwallaby’s creator edits, motion design, and documentary-style visual storytelling at Aurion Stack Studio.",
  alternates: { canonical: "https://www.aurionstack.dev/studio" },
  openGraph: {
    title: "Creator Studio | Aurion Stack",
    description:
      "Creator edits, motion design, and visual storytelling by Historicalwallaby. Watch the selected work.",
    url: "https://www.aurionstack.dev/studio",
    siteName: "Aurion Stack Studio",
    images: [
      {
        url: "/studio-logo.png",
        width: 1024,
        height: 1024,
        alt: "Aurion Stack Studio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Studio | Aurion Stack",
    description:
      "Creator edits, motion design, and visual storytelling by Historicalwallaby. Watch the selected work.",
    images: ["/studio-logo.png"],
    site: "@aurionstack",
  },
};

export default function StudioPage() {
  return <StudioClient />;
}
