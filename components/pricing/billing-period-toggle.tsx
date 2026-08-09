"use client";

import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { priceBook } from "@/lib/data/pricing";
import type { BillingPeriod } from "@/lib/pricing";

interface BillingPeriodToggleProps {
  value: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
  size?: "sm" | "md";
  showSavings?: boolean;
  className?: string;
}

export function BillingPeriodToggle({
  value,
  onChange,
  size = "md",
  showSavings = false,
  className,
}: BillingPeriodToggleProps) {
  return (
    <SegmentedToggle<BillingPeriod>
      label="Billing period"
      value={value}
      onChange={onChange}
      size={size}
      className={className}
      options={[
        { value: "monthly", label: "Monthly" },
        {
          value: "annual",
          label: showSavings ? (
            <>
              Annual
              <span className="ml-2 rounded-full bg-green-500/20 px-1.5 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400">
                Save {Math.round(priceBook.annualDiscount * 100)}%
              </span>
            </>
          ) : (
            "Annual"
          ),
        },
      ]}
    />
  );
}
