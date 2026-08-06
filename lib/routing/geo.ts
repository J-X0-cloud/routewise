import type { LatLng } from "@/types/domain";

const EARTH_RADIUS_MI = 3958.8;

/** Straight-line road networks are rare; this factor turns crow-flies miles into road miles. */
export const ROAD_FACTOR = 1.25;

/** Blended urban/highway speed for a regional delivery van. */
export const AVERAGE_SPEED_MPH = 32;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export function haversineMiles(a: LatLng, b: LatLng): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.sqrt(h));
}

export function roadMiles(a: LatLng, b: LatLng): number {
  return haversineMiles(a, b) * ROAD_FACTOR;
}

export function driveMinutes(miles: number, speedMph = AVERAGE_SPEED_MPH): number {
  return (miles / speedMph) * 60;
}

/** Symmetric road-mile matrix; index 0 is the depot. */
export function distanceMatrix(points: LatLng[]): number[][] {
  return points.map((from, i) => points.map((to, j) => (i === j ? 0 : roadMiles(from, to))));
}
