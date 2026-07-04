import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ReviewsSection from "@/components/ReviewsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import BackToTop from "@/components/BackToTop";
import WhatWeBuildSection from "@/components/WhatWeBuildSection";
import SchemaOrg, {
  organizationSchema,
  websiteSchema,
} from "@/components/SchemaOrg";

export default function Home() {
  return (
    <>
      <SchemaOrg schemas={[organizationSchema, websiteSchema]} />
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <WhatWeBuildSection />
        <ProductsSection />
        <PortfolioSection />
        <ReviewsSection />
        <PricingSection />
        <ContactSection />
        <BackToTop />
      </div>
    </>
  );
}
