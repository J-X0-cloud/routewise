"use client";

import { Calculator, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { formatCurrency } from "@/lib/format";
import { defaultEstimateInput, estimateCost, type EstimateInput } from "@/lib/pricing";
import { cn } from "@/lib/utils";

import { BillingPeriodToggle } from "./billing-period-toggle";
import { EstimateSummary } from "./estimate-summary";
import { NumberField } from "./number-field";

export function CostEstimator() {
  const [input, setInput] = useState<EstimateInput>(defaultEstimateInput);
  const [usageOpen, setUsageOpen] = useState(false);
  const estimate = useMemo(() => estimateCost(input), [input]);

  const set =
    <K extends keyof EstimateInput>(key: K) =>
    (value: EstimateInput[K]) =>
      setInput((current) => ({ ...current, [key]: value }));

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Calculator aria-hidden="true" className="size-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Work out your price</h3>
            <p className="text-sm text-muted-foreground">
              Count the vehicles you run today. Everything else is included.
            </p>
          </div>
        </div>
        <BillingPeriodToggle
          value={input.period}
          onChange={set("period")}
          size="sm"
          className="shrink-0 self-start sm:self-auto"
        />
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              id="calc-vehicles-active"
              label="Active vehicles"
              value={input.activeVehicles}
              onChange={set("activeVehicles")}
              max={500}
              withSlider
            />
            <NumberField
              id="calc-drivers"
              label="Drivers (free)"
              value={input.drivers}
              onChange={set("drivers")}
              max={500}
              withSlider
            />
          </div>

          <NumberField
            id="calc-depots"
            label={
              <>
                Depots
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                  first one included
                </span>
              </>
            }
            value={input.depots}
            onChange={set("depots")}
            min={1}
            max={50}
          />

          <div>
            <NumberField
              id="calc-stops"
              label="Stops per month"
              value={input.stopsPerMonth}
              onChange={set("stopsPerMonth")}
            />
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
              <span>{formatCurrency(0)}</span>
              <span className="font-normal text-muted-foreground">
                — stops are always included, however many you run
              </span>
            </p>
          </div>

          <div className="rounded-xl border bg-muted/20">
            <button
              type="button"
              aria-expanded={usageOpen}
              aria-controls="calc-usage"
              onClick={() => setUsageOpen((open) => !open)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
            >
              Estimate usage fees
              <ChevronDown
                aria-hidden="true"
                className={cn("size-4 transition-transform", usageOpen && "rotate-180")}
              />
            </button>
            {usageOpen ? (
              <div id="calc-usage" className="space-y-4 border-t px-4 py-4">
                <NumberField
                  id="calc-sms"
                  label="Customer SMS per month"
                  value={input.smsPerMonth}
                  onChange={set("smsPerMonth")}
                />
                <NumberField
                  id="calc-api"
                  label="API calls per month"
                  value={input.apiCallsPerMonth}
                  onChange={set("apiCallsPerMonth")}
                />
                <NumberField
                  id="calc-webhooks"
                  label="Webhook sends per month"
                  value={input.webhooksPerMonth}
                  onChange={set("webhooksPerMonth")}
                />
              </div>
            ) : null}
          </div>
        </div>

        <EstimateSummary estimate={estimate} />
      </div>
    </div>
  );
}
