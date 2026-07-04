import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing — Aurion Stack | Strategic Growth Packages for Indian & Global Clients",
  description: "Strategic web development packages starting at ₹6,999 for local Indian businesses and $149 for international clients. Micro Presence, Business Core, Web App MVP.",
};

export default function PricingPage() {
  return <PricingClient />;
}
