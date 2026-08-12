import type { NextRequest } from "next/server";

import { ok, validationError } from "@/lib/api";
import { findNearbyDrivers } from "@/lib/services/driver-service";
import { nearbyDriversSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const parsed = nearbyDriversSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return validationError(parsed.error);

  return ok({ data: findNearbyDrivers(parsed.data) });
}
