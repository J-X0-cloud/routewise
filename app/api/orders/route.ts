import type { NextRequest } from "next/server";

import { apiError, ok, readJson, validationError } from "@/lib/api";
import { DomainError, orderRepository } from "@/lib/services/order-service";
import { createOrderSchema, listOrdersSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const parsed = listOrdersSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return validationError(parsed.error);

  const page = await orderRepository.list(parsed.data);
  return ok(page);
}

export async function POST(request: Request) {
  const parsed = createOrderSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationError(parsed.error);

  try {
    const order = await orderRepository.create(parsed.data);
    return ok(order, { status: 201, headers: { Location: `/api/orders/${order.id}` } });
  } catch (error) {
    if (error instanceof DomainError) {
      const status = error.code === "duplicate_reference" ? 409 : 422;
      return apiError(status, error.code, error.message);
    }
    throw error;
  }
}
