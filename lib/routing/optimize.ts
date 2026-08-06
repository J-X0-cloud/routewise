import type { LatLng, OptimizedRoute, PlannedStop, TimeWindow } from "@/types/domain";

import { distanceMatrix, driveMinutes } from "./geo";

export interface RoutableStop extends LatLng {
  id: string;
  serviceMins: number;
  window?: TimeWindow;
  weightLbs?: number;
}

export interface OptimizeOptions {
  depot: LatLng;
  vehicleId: string;
  startMinute: number;
  capacityLbs?: number;
  /** Cost of one minute of lateness, expressed in road miles. */
  latenessWeight?: number;
  maxImprovementPasses?: number;
}

interface Evaluation {
  cost: number;
  distanceMi: number;
  durationMin: number;
  planned: PlannedStop[];
}

/**
 * Walks a candidate sequence and simulates the day: drive, wait for the window to open,
 * serve, move on. Lateness is priced into the cost so the search prefers on-time plans.
 */
function evaluate(
  order: number[],
  stops: RoutableStop[],
  matrix: number[][],
  options: Required<Pick<OptimizeOptions, "startMinute" | "latenessWeight">>,
): Evaluation {
  let clock = options.startMinute;
  let previous = 0;
  let distanceMi = 0;
  let latenessMins = 0;
  const planned: PlannedStop[] = [];

  order.forEach((stopIndex, position) => {
    const stop = stops[stopIndex]!;
    const node = stopIndex + 1;
    const legMiles = matrix[previous]![node]!;
    distanceMi += legMiles;
    clock += driveMinutes(legMiles);

    if (stop.window && clock < stop.window.start) clock = stop.window.start;
    const arrivalMinute = clock;
    const lateByMins = stop.window ? Math.max(0, arrivalMinute - stop.window.end) : 0;
    latenessMins += lateByMins;
    clock += stop.serviceMins;

    planned.push({
      stopId: stop.id,
      sequence: position + 1,
      arrivalMinute: Math.round(arrivalMinute),
      departureMinute: Math.round(clock),
      legMiles: Math.round(legMiles * 10) / 10,
      lateByMins: Math.round(lateByMins),
    });
    previous = node;
  });

  const returnMiles = order.length > 0 ? matrix[previous]![0]! : 0;
  distanceMi += returnMiles;
  clock += driveMinutes(returnMiles);

  return {
    cost: distanceMi + latenessMins * options.latenessWeight,
    distanceMi,
    durationMin: clock - options.startMinute,
    planned,
  };
}

/** Greedy seed: always drive to the stop whose window closes soonest among the nearest few. */
function nearestNeighbour(stops: RoutableStop[], matrix: number[][]): number[] {
  const remaining = new Set(stops.map((_, i) => i));
  const order: number[] = [];
  let current = 0;

  while (remaining.size > 0) {
    const candidates = [...remaining]
      .map((i) => ({ i, miles: matrix[current]![i + 1]! }))
      .sort((a, b) => a.miles - b.miles)
      .slice(0, 3);
    const next = candidates.sort(
      (a, b) =>
        (stops[a.i]!.window?.end ?? Number.MAX_SAFE_INTEGER) -
          (stops[b.i]!.window?.end ?? Number.MAX_SAFE_INTEGER) || a.miles - b.miles,
    )[0]!.i;
    order.push(next);
    remaining.delete(next);
    current = next + 1;
  }
  return order;
}

/** Classic 2-opt: reverse any segment that lowers total cost, until no move helps. */
function twoOpt(seed: number[], score: (order: number[]) => number, maxPasses: number): number[] {
  let best = seed;
  let bestCost = score(best);

  for (let pass = 0; pass < maxPasses; pass++) {
    let improved = false;
    for (let i = 0; i < best.length - 1; i++) {
      for (let k = i + 1; k < best.length; k++) {
        const candidate = [
          ...best.slice(0, i),
          ...best.slice(i, k + 1).reverse(),
          ...best.slice(k + 1),
        ];
        const cost = score(candidate);
        if (cost + 1e-9 < bestCost) {
          best = candidate;
          bestCost = cost;
          improved = true;
        }
      }
    }
    if (!improved) break;
  }
  return best;
}

export class CapacityExceededError extends Error {
  constructor(
    readonly loadLbs: number,
    readonly capacityLbs: number,
  ) {
    super(`Route load of ${loadLbs} lbs exceeds vehicle capacity of ${capacityLbs} lbs`);
    this.name = "CapacityExceededError";
  }
}

export function optimizeRoute(stops: RoutableStop[], options: OptimizeOptions): OptimizedRoute {
  const loadLbs = stops.reduce((sum, stop) => sum + (stop.weightLbs ?? 0), 0);
  if (options.capacityLbs !== undefined && loadLbs > options.capacityLbs) {
    throw new CapacityExceededError(loadLbs, options.capacityLbs);
  }

  const settings = {
    startMinute: options.startMinute,
    latenessWeight: options.latenessWeight ?? 2,
  };
  const matrix = distanceMatrix([options.depot, ...stops]);
  const score = (order: number[]) => evaluate(order, stops, matrix, settings).cost;

  const seed = nearestNeighbour(stops, matrix);
  const order = twoOpt(seed, score, options.maxImprovementPasses ?? 8);
  const result = evaluate(order, stops, matrix, settings);

  return {
    vehicleId: options.vehicleId,
    stops: result.planned,
    distanceMi: Math.round(result.distanceMi * 10) / 10,
    durationMin: Math.round(result.durationMin),
    lateStops: result.planned.filter((stop) => stop.lateByMins > 0).length,
  };
}
