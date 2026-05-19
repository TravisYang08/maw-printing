import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { MaterialsShowcase } from "@/components/home/materials-showcase";
import { CatalogGallery } from "@/components/home/catalog-gallery";
import { PricingSection } from "@/components/home/pricing-section";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <MaterialsShowcase />
      <CatalogGallery />
      <PricingSection />
      <AboutSection />
      <ContactSection />
      <CtaBanner />
    </>
  );
}
