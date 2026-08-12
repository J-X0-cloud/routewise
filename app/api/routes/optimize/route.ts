import { apiError, ok, readJson, validationError } from "@/lib/api";
import { depots, vehicles } from "@/lib/data/fleet";
import { formatClock, parseClock } from "@/lib/format";
import { CapacityExceededError, optimizeRoute } from "@/lib/routing/optimize";
import { optimizeRouteSchema } from "@/lib/validation";
import { enqueueEvent } from "@/lib/webhooks";

/**
 * POST /api/routes/optimize
 * Sequences one vehicle's stops from its depot, honouring time windows and capacity.
 */
export async function POST(request: Request) {
  const parsed = optimizeRouteSchema.safeParse(await readJson(request));
  if (!parsed.success) return validationError(parsed.error);
  const input = parsed.data;

  const depot = depots.find((candidate) => candidate.id === input.depotId);
  if (!depot) return apiError(404, "unknown_depot", `Depot ${input.depotId} does not exist`);

  const vehicle = vehicles.find((candidate) => candidate.id === input.vehicleId);
  if (!vehicle)
    return apiError(404, "unknown_vehicle", `Vehicle ${input.vehicleId} does not exist`);

  try {
    const route = optimizeRoute(
      input.stops.map((stop) => ({
        ...stop,
        window: stop.window
          ? { start: parseClock(stop.window[0]), end: parseClock(stop.window[1]) }
          : undefined,
      })),
      {
        depot,
        vehicleId: vehicle.id,
        startMinute: parseClock(input.startTime),
        capacityLbs: vehicle.capacityLbs,
      },
    );

    const response = {
      ...route,
      depotId: depot.id,
      stops: route.stops.map((stop) => ({
        ...stop,
        arrival: formatClock(stop.arrivalMinute),
        departure: formatClock(stop.departureMinute),
      })),
    };
    enqueueEvent("route.optimized", response);
    return ok(response);
  } catch (error) {
    if (error instanceof CapacityExceededError) {
      return apiError(422, "capacity_exceeded", error.message, {
        loadLbs: error.loadLbs,
        capacityLbs: error.capacityLbs,
      });
    }
    throw error;
  }
}
