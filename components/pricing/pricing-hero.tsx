import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { priceBook, pricingProofPoints } from "@/lib/data/pricing";
import { links } from "@/lib/site";

export function PricingHero() {
  return (
    <>
      <section className="section-padding pb-10 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
            <span aria-hidden="true" className="text-primary">
              ●
            </span>
            <span>One plan. Every feature. No per-stop fees.</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance md:text-6xl">
            ${priceBook.platformFee} a month, plus{" "}
            <span className="text-primary">${priceBook.perActiveVehicle} per active vehicle.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            That’s the whole price list. Unlimited orders, unlimited dispatcher and driver seats —
            you only pay for the vehicles you actually put on the road.
          </p>
          <div className="flex flex-col items-center gap-2">
            <ButtonLink href={links.demo} size="xl">
              Book a demo <ArrowRight aria-hidden="true" className="ml-2 size-4" />
            </ButtonLink>
            <p className="text-sm font-medium">
              Pilot the full platform on your routes for 14 days.
            </p>
            <p className="text-xs text-muted-foreground">
              Onboarding included. No long-term contract.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/20">
        <div className="container mx-auto max-w-4xl py-8">
          <dl className="grid grid-cols-3 gap-4 text-center">
            {pricingProofPoints.map((point) => (
              <div key={point.label} className="flex flex-col">
                <dt className="order-2 mt-0.5 text-xs text-muted-foreground md:text-sm">
                  {point.label}
                </dt>
                <dd className="order-1 text-2xl font-bold tracking-tight md:text-3xl">
                  {point.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
