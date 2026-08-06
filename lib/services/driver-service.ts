import { drivers, vehicles } from "@/lib/data/fleet";
import { haversineMiles } from "@/lib/routing/geo";
import type { Driver, DriverStatus, LatLng, Vehicle } from "@/types/domain";

export interface NearbyQuery extends LatLng {
  radiusMi: number;
  status?: DriverStatus;
  skills: string[];
  limit: number;
}

export interface NearbyDriver extends Driver {
  distanceMi: number;
  vehicle?: Vehicle;
}

export function findNearbyDrivers(query: NearbyQuery): NearbyDriver[] {
  return drivers
    .filter((driver) => !query.status || driver.status === query.status)
    .filter((driver) => query.skills.every((skill) => driver.skills.includes(skill)))
    .map((driver) => ({
      ...driver,
      distanceMi: Math.round(haversineMiles(query, driver.position) * 10) / 10,
      vehicle: vehicles.find((vehicle) => vehicle.id === driver.vehicleId),
    }))
    .filter((driver) => driver.distanceMi <= query.radiusMi)
    .sort((a, b) => a.distanceMi - b.distanceMi)
    .slice(0, query.limit);
}
