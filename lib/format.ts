const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatCurrency(amount: number): string {
  return usd.format(amount);
}

export function formatNumber(value: number): string {
  return integer.format(value);
}

/** Minutes after midnight → "14:00". */
export function formatClock(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = Math.round(minutes % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** "14:30" → 870. */
export function parseClock(value: string): number {
  const [h = "0", m = "0"] = value.split(":");
  return Number(h) * 60 + Number(m);
}
