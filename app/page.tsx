import { DeveloperSection } from "@/components/home/developer-section";
import { DispatchShowcase } from "@/components/home/dispatch-showcase";
import { Hero } from "@/components/home/hero";
import { HomeCta } from "@/components/home/home-cta";
import { Industries } from "@/components/home/industries";
import { PlatformModules } from "@/components/home/platform-modules";
import { StatStrip } from "@/components/home/stat-strip";
import { heroStats } from "@/lib/data/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatStrip stats={heroStats} />
      <PlatformModules />
      <DispatchShowcase />
      <DeveloperSection />
      <Industries />
      <HomeCta />
    </>
  );
}
