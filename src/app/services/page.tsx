import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services — Aurion Stack | Custom Product Engineering Agency",
  description: "We handle Full-Stack Web Apps, Native Mobile Apps, and LLM-powered business automation for agencies and startups avoiding bloated tech teams.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
