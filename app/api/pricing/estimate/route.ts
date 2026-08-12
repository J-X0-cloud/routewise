import { ok, readJson, validationError } from "@/lib/api";
import { estimateCost } from "@/lib/pricing";
import { estimateSchema } from "@/lib/validation";

/** Mirrors the pricing-page estimator so sales tooling and the site always agree. */
export async function POST(request: Request) {
  const parsed = estimateSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationError(parsed.error);

  return ok(estimateCost(parsed.data));
}
