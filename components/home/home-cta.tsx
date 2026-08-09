import { ArrowRight, Calendar } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { links } from "@/lib/site";

export function HomeCta() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border bg-card px-8 py-16 text-center md:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute right-1/4 -bottom-1/4 h-64 w-64 rounded-full bg-chart-1/10 blur-3xl" />
          </div>
          <div className="mx-auto max-w-3xl">
            <Eyebrow className="mb-6">See It on Your Routes</Eyebrow>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              Stop Dispatching From <span className="text-gradient">a Whiteboard.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Bring a week of real orders and we’ll plan it with you in Routewise on a 30-minute
              call. Pilots run on your live routes for 14 days, with onboarding included.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
              <ButtonLink href={links.demo} size="xl">
                Book a demo <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <ButtonLink href={links.pricing} variant="outline" size="xl">
                See pricing
              </ButtonLink>
              <ButtonLink href={links.contact} variant="outline" size="xl">
                <Calendar aria-hidden="true" className="size-4" /> Talk to our team
              </ButtonLink>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Full platform during the pilot · No long-term contract · US-based support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
