import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { priceBook } from "@/lib/data/pricing";
import { links } from "@/lib/site";

export function PricingCta() {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border bg-card p-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          <div className="relative">
            <h2 className="mb-4 text-4xl font-bold">Ready to see it on your routes?</h2>
            <p className="mb-2 text-muted-foreground">
              ${priceBook.platformFee} a month, plus ${priceBook.perActiveVehicle} per active
              vehicle. Orders are always included.
            </p>
            <p className="mb-8 text-xs text-muted-foreground">
              Pilot the full platform for 14 days. No long-term contract.
            </p>
            <div className="flex flex-col items-center gap-3">
              <ButtonLink href={links.demo} size="xl">
                Book a demo <ArrowRight aria-hidden="true" className="ml-2 size-4" />
              </ButtonLink>
              <a
                href={links.contact}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Or talk to our team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
