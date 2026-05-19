import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { PricingSection } from "@/components/home/pricing-section";
import { BeyondBasics } from "@/components/home/beyond-basics";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <PricingSection />
      <BeyondBasics />
      <CtaBanner />
    </>
  );
}
