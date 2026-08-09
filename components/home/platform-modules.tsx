import { ArrowRight } from "lucide-react";

import { SectionIntro } from "@/components/shared/section-intro";
import { ButtonLink } from "@/components/ui/button";
import { platformModules } from "@/lib/data/home";
import { links } from "@/lib/site";

import { ModuleCard } from "./module-card";

export function PlatformModules() {
  return (
    <section className="section-padding">
      <div className="container space-y-10">
        <SectionIntro
          eyebrow="The Platform"
          title={
            <>
              From First Order <span className="text-gradient">to Final Signature.</span>
            </>
          }
          description="Routewise replaces the whiteboard, the group text and the three spreadsheets. Orders, routes, drivers, customer updates and billing live in one system, so dispatch always knows what is happening on the road — and the office knows what to invoice."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {platformModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        <div className="flex justify-center">
          <ButtonLink
            href={links.platform}
            variant="ghost"
            className="group text-muted-foreground hover:text-foreground"
          >
            Explore the full platform
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
