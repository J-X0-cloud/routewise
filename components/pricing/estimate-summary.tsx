import { Info } from "lucide-react";

import { formatCurrency } from "@/lib/format";
import type { Estimate, EstimateLine } from "@/lib/pricing";
import { cn } from "@/lib/utils";

function LineList({
  lines,
  muted = false,
  className,
}: {
  lines: EstimateLine[];
  muted?: boolean;
  className?: string;
}) {
  return (
    <dl className={cn("space-y-3", className)}>
      {lines.map((line) => (
        <div key={line.label} className="flex items-baseline justify-between gap-3 text-sm">
          <dt className="min-w-0">
            <span className={muted ? "text-muted-foreground" : "font-medium"}>{line.label}</span>
            <span className="block text-xs text-muted-foreground">{line.detail}</span>
          </dt>
          <dd className={cn("shrink-0 tabular-nums", muted && "text-muted-foreground")}>
            {formatCurrency(line.amount)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Subtotal({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="mt-3 flex items-baseline justify-between gap-3 border-t pt-3 text-sm">
      <span className="font-medium">{label}</span>
      <span className="font-medium tabular-nums">{formatCurrency(amount)}</span>
    </div>
  );
}

export function EstimateSummary({ estimate }: { estimate: Estimate }) {
  return (
    <div className="rounded-xl border bg-muted/20 p-5" aria-live="polite">
      <div className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Your estimate
      </div>
      <LineList lines={estimate.recurring} />
      <Subtotal label="Recurring" amount={estimate.recurringTotal} />

      <LineList lines={estimate.usage} muted className="mt-5" />
      <Subtotal label="Usage" amount={estimate.usageTotal} />

      <div className="mt-4 flex items-baseline justify-between gap-3 border-t-2 pt-4">
        <span className="font-semibold">Estimated total</span>
        <span className="text-right">
          <span className="text-2xl font-bold tabular-nums">{formatCurrency(estimate.total)}</span>
          <span className="block text-xs text-muted-foreground">
            {estimate.period === "annual" ? "per month, billed annually" : "per month"}
          </span>
        </span>
      </div>

      <p className="mt-4 flex items-start gap-1.5 text-xs text-muted-foreground">
        <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
        <span>
          An estimate. Vehicles and depots are counted from your live records, so the recurring
          lines move when you add or park one.
        </span>
      </p>
    </div>
  );
}
