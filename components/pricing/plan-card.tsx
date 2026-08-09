"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { planInclusions, unlimitedAllowances } from "@/lib/data/pricing";
import { formatCurrency } from "@/lib/format";
import { unitPrices, type BillingPeriod } from "@/lib/pricing";
import { links } from "@/lib/site";

import { BillingPeriodToggle } from "./billing-period-toggle";

export function PlanCard() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const prices = unitPrices(period);
  const cadence = period === "monthly" ? "monthly" : "annually";

  return (
    <>
      <div className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-2 rounded-full border bg-primary/5 px-4 py-2 text-center text-sm font-medium">
        <Sparkles aria-hidden="true" className="size-4 shrink-0 text-primary" />
        Every customer gets the entire platform — dispatch, tracking, driver app, billing and the
        merchant portal.
      </div>

      <div className="mb-10 flex justify-center">
        <BillingPeriodToggle value={period} onChange={setPeriod} showSavings />
      </div>

      <Card className="mx-auto max-w-3xl border-primary shadow-xl shadow-primary/10">
        <CardHeader>
          <CardTitle className="text-base font-medium text-muted-foreground">
            Routewise — billed {cadence}
          </CardTitle>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-5xl font-bold tracking-tight">
              {formatCurrency(prices.platformFee)}
            </span>
            <span className="text-lg text-muted-foreground">per month</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            plus{" "}
            <span className="font-semibold text-foreground">
              {formatCurrency(prices.perActiveVehicle)} per month
            </span>{" "}
            for each active vehicle, and ${prices.perAdditionalDepot} for each depot beyond the
            first.
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <ul className="space-y-3">
            {planInclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border bg-muted/20 p-4">
            <div className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Unlimited, at no cost
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {unlimitedAllowances.map((allowance) => (
                <li
                  key={allowance}
                  className="rounded-full border bg-background px-2.5 py-1 text-xs"
                >
                  {allowance}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-2">
          <ButtonLink href={links.demo} size="xl">
            Book a demo <ArrowRight aria-hidden="true" className="ml-2 size-4" />
          </ButtonLink>
          <p className="text-center text-xs text-muted-foreground">
            14-day pilot. No feature restrictions.
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
