import { geocoder } from "@/lib/geocode";
import { roadMiles } from "@/lib/routing/geo";
import type { QuoteInput } from "@/lib/validation";

interface RateCard {
  base: number;
  perMile: number;
  includedMiles: number;
  minimum: number;
}

/** Rate cards in dollars. Customers are priced by service level, then zone mileage. */
export const rateCards: Record<QuoteInput["serviceLevel"], RateCard> = {
  standard: { base: 24, perMile: 1.35, includedMiles: 10, minimum: 28 },
  two_person: { base: 95, perMile: 1.9, includedMiles: 15, minimum: 110 },
  medical: { base: 38, perMile: 1.6, includedMiles: 10, minimum: 42 },
  grocery: { base: 18, perMile: 1.1, includedMiles: 12, minimum: 22 },
  heavy: { base: 140, perMile: 3.25, includedMiles: 20, minimum: 165 },
};

export const accessorialPrices: Record<QuoteInput["accessorials"][number], number> = {
  stairs: 25,
  haul_away: 35,
  wait_time: 18,
  liftgate: 45,
  return: 22,
};

export interface QuoteLine {
  label: string;
  amount: number;
}

export interface Quote {
  id: string;
  customerId: string;
  serviceLevel: QuoteInput["serviceLevel"];
  distanceMi: number;
  lines: QuoteLine[];
  total: number;
  expiresAt: string;
}

export class UnroutableAddressError extends Error {
  constructor(readonly address: string) {
    super(`Could not locate "${address}"`);
    this.name = "UnroutableAddressError";
  }
}

const round2 = (value: number) => Math.round(value * 100) / 100;

export async function createQuote(input: QuoteInput): Promise<Quote> {
  const [from, to] = await Promise.all([
    geocoder.geocode(input.pickup.address),
    geocoder.geocode(input.dropoff.address),
  ]);
  if (!from) throw new UnroutableAddressError(input.pickup.address);
  if (!to) throw new UnroutableAddressError(input.dropoff.address);

  const card = rateCards[input.serviceLevel];
  const distanceMi = round2(roadMiles(from, to));
  const mileage = round2(Math.max(0, distanceMi - card.includedMiles) * card.perMile);

  const lines: QuoteLine[] = [
    { label: `Base (${input.serviceLevel.replace("_", "-")})`, amount: card.base },
    { label: `Mileage beyond ${card.includedMiles} mi`, amount: mileage },
    ...input.accessorials.map((code) => ({
      label: code.replace("_", " "),
      amount: accessorialPrices[code],
    })),
  ];
  const subtotal = round2(lines.reduce((sum, line) => sum + line.amount, 0));
  if (subtotal < card.minimum) {
    lines.push({ label: "Minimum charge adjustment", amount: round2(card.minimum - subtotal) });
  }

  return {
    id: `quo_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`,
    customerId: input.customerId,
    serviceLevel: input.serviceLevel,
    distanceMi,
    lines,
    total: round2(Math.max(subtotal, card.minimum)),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}
