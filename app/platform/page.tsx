import type { Metadata } from "next";

import { FeatureGrid } from "@/components/platform/feature-grid";
import { OrderFlow } from "@/components/platform/order-flow";
import { PlatformCta } from "@/components/platform/platform-cta";
import { PlatformHero } from "@/components/platform/platform-hero";
import { Principles } from "@/components/platform/principles";

export const metadata: Metadata = {
  title: "Platform Overview",
  description:
    "Dispatch board, route planner, live tracking, driver app, customer notifications and billing — one connected platform for regional delivery operations.",
};

export default function PlatformPage() {
  return (
    <div className="flex flex-col">
      <PlatformHero />
      <Principles />
      <FeatureGrid />
      <OrderFlow />
      <PlatformCta />
    </div>
  );
}
