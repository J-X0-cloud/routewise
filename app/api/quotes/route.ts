import { apiError, ok, readJson, validationError } from "@/lib/api";
import { createQuote, UnroutableAddressError } from "@/lib/services/quote-service";
import { quoteSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = quoteSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationError(parsed.error);

  try {
    return ok(await createQuote(parsed.data), { status: 201 });
  } catch (error) {
    if (error instanceof UnroutableAddressError) {
      return apiError(422, "unroutable_address", error.message);
    }
    throw error;
  }
}
