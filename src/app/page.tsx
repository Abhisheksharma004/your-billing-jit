import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import FeaturesGrid from "@/components/FeaturesGrid";
import InteractiveDemoWidget from "@/components/InteractiveDemoWidget";
import ComparisonSection from "@/components/ComparisonSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-red-500 selection:text-white">
      {/* Top sticky navigation */}
      <Navbar />

      {/* Main landing content */}
      <main className="flex-1">
        {/* Hero with interactive ERP dashboard preview */}
        <HeroSection />

        {/* Client trust marquee & stats */}
        <ClientLogos />

        {/* ERP Features & Modules */}
        <FeaturesGrid />

        {/* Live Interactive Invoice & Tax Calculator */}
        <InteractiveDemoWidget />

        {/* Legacy vs Your Billing Software comparison */}
        <ComparisonSection />

        {/* Enterprise Testimonials & Case Studies */}
        <TestimonialsSection />

        {/* Pricing Tiers with Monthly/Annual switch */}
        <PricingSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Final Conversion Call To Action */}
        <CallToAction />
      </main>

      {/* Comprehensive Enterprise Footer */}
      <Footer />
    </div>
  );
}
