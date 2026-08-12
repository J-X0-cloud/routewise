import type { Metadata } from "next";

import { OnboardingOffers } from "@/components/pricing/onboarding-offers";
import { PathPicker } from "@/components/pricing/path-picker";
import { PlanSection } from "@/components/pricing/plan-section";
import { PricingCta } from "@/components/pricing/pricing-cta";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { SupportPlans } from "@/components/pricing/support-plans";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "$149 a month plus $18 per active vehicle. Unlimited orders, stops and seats. Every feature included, with a 14-day pilot on your real routes.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <PricingHero />
      <PathPicker />
      <PlanSection />
      <OnboardingOffers />
      <SupportPlans />
      <PricingFaq />
      <PricingCta />
    </div>
  );
}
