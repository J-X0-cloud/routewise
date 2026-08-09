import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckItem } from "@/components/ui/check-item";
import { onboardingOffers } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

export function OnboardingOffers() {
  return (
    <section id="onboarding" className="section-padding scroll-mt-24 border-y bg-muted/20">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold">Want a hand getting started?</h2>
          <p className="text-muted-foreground">
            Most single-depot fleets are live within a week on their own. For bigger rollouts, our
            team does the heavy lifting.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {onboardingOffers.map((offer) => {
            const Icon = offer.icon;
            return (
              <Card key={offer.title} className={cn(offer.dashed && "border-dashed")}>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon aria-hidden="true" className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{offer.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{offer.subtitle}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-3xl font-bold">
                    {offer.price}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      {offer.priceNote}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {offer.features.map((feature) => (
                      <CheckItem key={feature}>{feature}</CheckItem>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <ButtonLink href={offer.href} variant="outline">
                    {offer.cta} <ArrowRight aria-hidden="true" className="ml-2 size-4" />
                  </ButtonLink>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
