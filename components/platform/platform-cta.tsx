import { ArrowRight } from "lucide-react";

import { GlowBackdrop } from "@/components/shared/glow-backdrop";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { links } from "@/lib/site";

export function PlatformCta() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border bg-card px-8 py-16 text-center md:px-16">
          <GlowBackdrop variant="panel" />
          <div className="mx-auto max-w-3xl space-y-6">
            <Eyebrow>Get Started</Eyebrow>
            <h2 className="text-4xxl leading-none tracking-tight text-balance md:text-5xl lg:text-6xl">
              Run Tomorrow’s Routes <span className="text-gradient">in Routewise.</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
              Start with a 14-day pilot on your real orders. We’ll import your customers and
              addresses, set up your job types and get drivers on the app in the first week.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href={links.demo} size="xl">
                Book a demo <ArrowRight aria-hidden="true" className="ml-2 size-4" />
              </ButtonLink>
              <ButtonLink href={links.contact} variant="outline" size="xl">
                Talk to our team
              </ButtonLink>
              <ButtonLink href={links.pricing} variant="ghost" size="xl">
                See pricing
              </ButtonLink>
            </div>
            <p className="text-xs text-muted-foreground">
              14-day pilot · Onboarding included · No long-term contract
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
