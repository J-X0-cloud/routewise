import { apiError, ok, readJson, validationError } from "@/lib/api";
import { DomainError, OrderNotFoundError, orderRepository } from "@/lib/services/order-service";
import { updateOrderSchema } from "@/lib/validation";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const order = await orderRepository.get(id);
  if (!order) return apiError(404, "not_found", `Order ${id} was not found`);
  return ok(order);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const parsed = updateOrderSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationError(parsed.error);

  try {
    return ok(await orderRepository.update(id, parsed.data));
  } catch (error) {
    if (error instanceof OrderNotFoundError) return apiError(404, "not_found", error.message);
    if (error instanceof DomainError) {
      const status = error.code === "invalid_transition" ? 409 : 422;
      return apiError(status, error.code, error.message);
    }
    throw error;
  }
}
