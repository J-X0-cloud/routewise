import { ArrowRight, Key } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckItem } from "@/components/ui/check-item";
import { supportPlans } from "@/lib/data/pricing";
import { links } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SupportPlans() {
  return (
    <section id="enterprise" className="section-padding scroll-mt-24">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold">Support plans</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Every account includes chat and email support. Add faster response times and a named
            contact as your operation grows.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {supportPlans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(plan.highlighted && "border-primary shadow-lg shadow-primary/10")}
            >
              <CardHeader className="pb-3">
                <div className="mb-1 flex items-center gap-2">
                  <div aria-hidden="true" className={cn("h-3 w-3 rounded-full", plan.dot)} />
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                </div>
                <div className="text-2xl font-bold">{plan.price}</div>
                <div className="text-xs text-muted-foreground">Support: {plan.response}</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <CheckItem key={feature.label} included={feature.included}>
                      {feature.label}
                    </CheckItem>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <ButtonLink
                  href={plan.href}
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </ButtonLink>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 rounded-xl border bg-muted/20 p-6 text-center sm:flex-row sm:text-left">
          <Key aria-hidden="true" className="size-6 shrink-0 text-primary" />
          <div className="flex-1">
            <h3 className="font-semibold">Running more than 150 vehicles?</h3>
            <p className="text-sm text-muted-foreground">
              We offer volume pricing, annual invoicing and a security review package for larger
              fleets.
            </p>
          </div>
          <ButtonLink href={links.contact} variant="outline">
            Talk to our team <ArrowRight aria-hidden="true" className="ml-2 size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
