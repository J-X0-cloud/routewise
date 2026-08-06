import { priceBook } from "@/lib/data/pricing";

export type BillingPeriod = "monthly" | "annual";

export interface EstimateInput {
  activeVehicles: number;
  drivers: number;
  depots: number;
  stopsPerMonth: number;
  smsPerMonth: number;
  apiCallsPerMonth: number;
  webhooksPerMonth: number;
  period: BillingPeriod;
}

export interface EstimateLine {
  label: string;
  detail: string;
  amount: number;
}

/** All amounts are per month; annual billing applies the discount to recurring lines only. */
export interface Estimate {
  period: BillingPeriod;
  recurring: EstimateLine[];
  usage: EstimateLine[];
  recurringTotal: number;
  usageTotal: number;
  total: number;
}

export const defaultEstimateInput: EstimateInput = {
  activeVehicles: 12,
  drivers: 14,
  depots: 1,
  stopsPerMonth: 3000,
  smsPerMonth: 0,
  apiCallsPerMonth: 0,
  webhooksPerMonth: 0,
  period: "monthly",
};

const round2 = (value: number) => Math.round(value * 100) / 100;
const clampCount = (value: number) => (Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0);

/** Recurring prices for one month, with the annual discount applied when billed yearly. */
export function unitPrices(period: BillingPeriod) {
  const factor = period === "annual" ? 1 - priceBook.annualDiscount : 1;
  return {
    platformFee: round2(priceBook.platformFee * factor),
    perActiveVehicle: round2(priceBook.perActiveVehicle * factor),
    perAdditionalDepot: round2(priceBook.perAdditionalDepot * factor),
  };
}

/** SMS is billed per message after a monthly free allowance. */
export function smsCharge(messages: number): number {
  const { unitPrice, freeUnits } = priceBook.meters.sms;
  return round2(Math.max(0, clampCount(messages) - freeUnits) * unitPrice);
}

/** API calls and webhook sends are billed in whole blocks, rounded down, after the free allowance. */
export function blockCharge(
  units: number,
  meter: { blockPrice: number; blockSize: number; freeUnits: number },
): number {
  const billable = Math.max(0, clampCount(units) - meter.freeUnits);
  return round2(Math.floor(billable / meter.blockSize) * meter.blockPrice);
}

export function estimateCost(raw: EstimateInput): Estimate {
  const input = {
    ...raw,
    activeVehicles: clampCount(raw.activeVehicles),
    drivers: clampCount(raw.drivers),
    depots: Math.max(1, clampCount(raw.depots)),
    smsPerMonth: clampCount(raw.smsPerMonth),
    apiCallsPerMonth: clampCount(raw.apiCallsPerMonth),
    webhooksPerMonth: clampCount(raw.webhooksPerMonth),
  };
  const prices = unitPrices(input.period);
  const extraDepots = Math.max(0, input.depots - priceBook.includedDepots);

  const recurring: EstimateLine[] = [
    {
      label: "Platform fee",
      detail: "Every feature, unlimited seats and orders",
      amount: prices.platformFee,
    },
    {
      label: "Active vehicles",
      detail: `${input.activeVehicles} vehicles · ${input.drivers} drivers · ${input.activeVehicles} × $${prices.perActiveVehicle.toFixed(2)}`,
      amount: round2(input.activeVehicles * prices.perActiveVehicle),
    },
  ];

  if (extraDepots > 0) {
    recurring.push({
      label: "Additional depots",
      detail: `${extraDepots} × $${prices.perAdditionalDepot.toFixed(2)}`,
      amount: round2(extraDepots * prices.perAdditionalDepot),
    });
  }

  const { apiCalls, webhooks } = priceBook.meters;
  const usage: EstimateLine[] = [
    {
      label: "Customer SMS",
      detail: `${input.smsPerMonth.toLocaleString("en-US")} · $${priceBook.meters.sms.unitPrice.toFixed(2)}`,
      amount: smsCharge(input.smsPerMonth),
    },
    {
      label: "API calls",
      detail: `${input.apiCallsPerMonth.toLocaleString("en-US")} · $${apiCalls.blockPrice.toFixed(2)} per 100,000`,
      amount: blockCharge(input.apiCallsPerMonth, apiCalls),
    },
    {
      label: "Webhook sends",
      detail: `${input.webhooksPerMonth.toLocaleString("en-US")} · $${webhooks.blockPrice.toFixed(2)} per 100,000`,
      amount: blockCharge(input.webhooksPerMonth, webhooks),
    },
  ];

  const recurringTotal = round2(recurring.reduce((sum, line) => sum + line.amount, 0));
  const usageTotal = round2(usage.reduce((sum, line) => sum + line.amount, 0));

  return {
    period: input.period,
    recurring,
    usage,
    recurringTotal,
    usageTotal,
    total: round2(recurringTotal + usageTotal),
  };
}
